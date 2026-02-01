import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../config/redux/store.js";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return <>
  <Provider store={store}>
    <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </Head>
    <Component {...pageProps} />
  </Provider>
  </>
};