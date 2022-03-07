import { BaseRequest } from "./base-request";

export interface ILogin {
  username: string;
  password: string;
  campusId: number;
  rememberToken: boolean;
}

export const AuthRequest = (token: null | string = "") => {
  const request = BaseRequest(process.env.NEXT_PUBLIC_AUTH_URL || "", token);

  const signIn = (input: ILogin): Promise<any> => {
    return request.post("login", input);
  };

  const profile = (): Promise<any> => {
    return request.get(`auth/profile`);
  };

  const authorize = (code: string) => {
    return request.get(`clients/${code}/authorize`);
  };

  return {
    signIn,
    profile,
    authorize,
    request,
  };
};
