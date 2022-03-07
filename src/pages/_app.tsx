import type { AppProps, AppContext } from 'next/app'
import store from "@store/index";
import '../assets/scss/app.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// import { CSSTransition, TransitionGroup } from 'react-transition-group'

const MyDashboard = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  )
}

MyDashboard.getInitialProps = async ({ Component, ctx }: AppContext) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  return { pageProps };
};

export default store.withRedux(MyDashboard);
