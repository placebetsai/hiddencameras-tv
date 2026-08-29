import Layout from "../components/Layout";
import AdUnit from "../components/AdUnit";
import HomeSecurityCTA from "../components/HomeSecurityCTA";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import { EditorPickGrid } from "../components/EditorPickCard";
import { ROUNDUPS } from "../lib/fashionistasProducts";
import Link from "next/link";

const PICKS = ROUNDUPS["nanny-cam"];

export default function Page() {
  return (
    <Layout
      title="Best Nanny Cams 2026 — Monitor Your Childcare — HiddenCameras.tv"
      description="Top-rated nanny cameras with live streaming, two-way audio, and motion alerts. Keep your kids safe when you're not home."
      canonical="https://hiddencameras.tv/nanny-cam"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{"@type":"Question","name":"Is it legal to have a <a href="https://www.amazon.com/s?k=nanny+cam&tag=YOUR_AMAZON_TAG-20" target="_blank" rel="noopener sponsored">nanny cam</a>?","acceptedAnswer":{"@type":"Answer","text":"Yes, nanny cams are legal in all 50 US states. However, cameras in bathrooms or areas where the nanny changes are illegal. Some states require you to inform the nanny about recording — check your state laws."}},{"@type":"Question","name":"What's the best <a href="https://www.amazon.com/s?k=nanny+cam&tag=YOUR_AMAZON_TAG-20" target="_blank" rel="noopener sponsored">nanny cam</a> without WiFi?","acceptedAnswer":{"@type":"Answer","text":"Models with local SD-card storage can record without WiFi, but you will not be able to stream remotely. Most modern nanny cams use WiFi for app alerts."}}] }) }} />

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">CHILDCARE SAFETY</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Best Nanny Cams 2026</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">Top-rated nanny cameras with live streaming, two-way audio, and motion alerts. Keep your kids safe when you&apos;re not home — every pick below ships from a US warehouse with fast delivery.</p>

      <AffiliateDisclosure />

      <AdUnit />

      <h2 className="text-xl font-bold text-white mb-5">Our Editor Picks</h2>
      <EditorPickGrid picks={PICKS} />

      <AdUnit />

      <HomeSecurityCTA />

      <p className="text-xs text-gray-600 mt-8">Product cards open in a new tab. <Link href="/privacy" className="underline">Privacy Policy</Link></p>
    </Layout>
  );
}
