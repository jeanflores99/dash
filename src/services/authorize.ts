import wrapper from "@store/index";
import nookies from "nookies";
import { setLogged, setToken, setUser } from "@common/store/auth.thunk";
import { setTitle } from "@common/store/screen.thunk";
import { AuthRequest } from "./auth.request";
import { authorize as ClientAuth } from "../modules/auth/clients/apis";
import { clientActions } from "@modules/auth/clients/store";

const dispatchClient = async (ctx: any, store: any) => {
  const code = ctx?.req?.headers?.host || "";
  await ClientAuth(code)
    .then((data) => store.dispatch(clientActions.setClient(data)))
    .catch(() => store.dispatch(clientActions.setClient({} as any)));
};

export const authorize = (title = "", callback?: Function | null) =>
  wrapper.getServerSideProps((store) => async (ctx: any) => {
    // config client
    await dispatchClient(ctx, store);
    // config auth
    const { AccessToken } = nookies.get(ctx);
    const token = AccessToken || "";
    const isLogged = token ? true : false;

    store.dispatch(setLogged(isLogged));

    const authRequest = AuthRequest(token);

    // validar token
    if (isLogged) {
      // obtener auth
      await authRequest
        .profile()
        .then((res) => {
          store.dispatch(setUser(res.data));
        })
        .catch((err) => {
          const unauthorized = err?.response?.data?.statusCode == 401;
          if (unauthorized) {
            nookies.destroy(ctx, "AccessToken");
            store.dispatch(setLogged(false));
          }
        });
    }

    // add title
    store.dispatch(setToken(token));
    store.dispatch(setTitle(title));

    const { auth } = store.getState();
    // response error
    if (!auth.logged) {
      store.dispatch(setUser(null));
      store.dispatch(setToken(null));

      return {
        redirect: {
          destination: "/sign-in",
          permanent: false,
        },
      };
    }

    if (typeof callback == "function") {
      const result = await callback(ctx, store);
      const obj = Object.assign({}, result || {});
      return {
        props: {},
        ...obj,
      };
    }

    return {
      props: {},
    };
  });

export const guest = (title = "") =>
  wrapper.getServerSideProps((store) => async (ctx) => {
    // config client
    await dispatchClient(ctx, store);
    // config guest
    const { AccessToken } = nookies.get(ctx);
    const isLogged = AccessToken ? true : false;

    store.dispatch(setLogged(isLogged));

    const { auth } = store.getState();

    // response error
    if (auth.logged) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    // add title
    store.dispatch(setUser(null));
    store.dispatch(setToken(null));
    store.dispatch(setTitle(title));

    return {
      props: {},
    };
  });
