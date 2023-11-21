
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#fff" />
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />

      </Head>
      <body
        style={{
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          margin: "0",
          padding: "0",
          display: "flex",
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
