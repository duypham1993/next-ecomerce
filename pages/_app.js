import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import "@fontsource/faustina";
import { store } from "@/store/store";
import Loading from "@/components/Loading/Loading";

export default function App({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(
      <Provider store={store}>
        <Layout>
          <Loading />
          <Component {...pageProps} />
        </Layout>
      </Provider>
    );
  }
  return (
    <Provider store={store}>
      <Layout>
        <Loading />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
