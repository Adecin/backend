import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";
import Layout from "../layouts/layout";
import Auth from "@/autrh/auth";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <Auth>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Auth>
    </ReduxProvider>
  );
}
