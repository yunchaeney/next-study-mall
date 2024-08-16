import { ThemeProvider } from "@/lib/ThemeContext";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Noto_Sans_KR } from "next/font/google";
import "@/styles/globals.scss";
import Header from "@/components/Header/Header";

const notoSansKR = Noto_Sans_KR({
  weight: ["400", "700"],
  subsets: [],
});
// app route의 layout 같은 것

// Component -> Children (Page)
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Codeitmall</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider>
        <div className={`${notoSansKR.className} container`}>
          <Header />
          <section>
            <Component {...pageProps} />
          </section>
        </div>
      </ThemeProvider>
    </>
  );
}
