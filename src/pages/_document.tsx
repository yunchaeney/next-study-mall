import { Html, Head, Main, NextScript } from "next/document";

// Server rendering 에서 수행됨
// 일반적인 컴포넌트처럼 동작하지 않기 때문에 useState 등 훅을 사용할 수 없음

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body className="dark">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
