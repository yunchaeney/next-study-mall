import { ThemeProvider } from "@/lib/ThemeContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { Noto_Sans_KR } from "next/font/google";

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
        <header className={notoSansKR.className}>
          <Link href={"/"}>홈으로</Link>
          <Link href={"/search"}>써치로</Link>
          <Link href={"/setting"}>설정으로</Link>
        </header>
        <div className={`${notoSansKR.className} container`}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>
  );
}
