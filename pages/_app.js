import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", weight: ["400", "600"] });

export default function App({ Component, pageProps }) {
  const enableAdUnits = process.env.NEXT_PUBLIC_ENABLE_AD_UNITS === "true";

  return (
    <>
      <Script id="adsense-npa" strategy="beforeInteractive">
        {`window.adsbygoogle = window.adsbygoogle || []; window.adsbygoogle.requestNonPersonalizedAds = 1;`}
      </Script>

      {/* Keep the publisher tag detectable, but only request ad slots when explicitly enabled. */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7215975042937417"
        crossOrigin="anonymous"
        strategy={enableAdUnits ? "afterInteractive" : "lazyOnload"}
      />

      {/*
        Google Analytics (GA4) — uncomment and replace G-XXXXXXXXXX with your Measurement ID
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      */}

      <main className={`${inter.className}`}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
