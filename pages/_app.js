import Script from "next/script";
import Head from "next/head";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";
import ChatBot from "../components/ChatBot";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", weight: ["400", "600"] });

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HiddenCameras.tv",
  url: "https://hiddencameras.tv",
  logo: "https://hiddencameras.tv/og-default.png",
  description: "Security camera reviews, hidden camera guides, and home surveillance tips."
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </Head>
      <Script id="adsense-npa" strategy="beforeInteractive">
        {`window.adsbygoogle = window.adsbygoogle || []; window.adsbygoogle.requestNonPersonalizedAds = 1;`}
      </Script>

      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7215975042937417"
        crossOrigin="anonymous"
        strategy="afterInteractive"
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
      <ChatBot />
    </>
  );
}
