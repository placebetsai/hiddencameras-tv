import Layout from "../components/Layout";
import AdUnit from "../components/AdUnit";
import HomeSecurityCTA from "../components/HomeSecurityCTA";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import { EditorPickGrid } from "../components/EditorPickCard";
import { ROUNDUPS } from "../lib/fashionistasProducts";
import Link from "next/link";

const PICKS = ROUNDUPS["mini-spy-cameras"];

export default function Page() {
  return (
    <Layout
      title="Best Mini Spy Cameras 2026 — Ultra Small & Hidden — HiddenCameras.tv"
      description="The smallest hidden cameras you can buy. Mini WiFi spy cams, button cameras, USB charger cams and more."
      canonical="https://hiddencameras.tv/mini-spy-cameras"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{"@type":"Question","name":"What is the smallest camera you can buy?","acceptedAnswer":{"@type":"Answer","text":"The smallest consumer cameras are approximately 0.8 to 1 inch square. Mini WiFi spy cameras at this size can record 1080p video and stream live to your phone."}},{"@type":"Question","name":"How long can a mini spy camera record?","acceptedAnswer":{"@type":"Answer","text":"Battery-powered mini cams typically record 1-4 hours continuously. With motion-only recording, they can last days. USB charger cameras record indefinitely while plugged in."}}] }) }} />

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">ULTRA COMPACT</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Best Mini Spy Cameras</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">The smallest hidden cameras you can buy. Mini WiFi spy cams, button cameras, USB charger cams and more. Every pick below ships from our partner store Fashionistas.ai.</p>

      <AffiliateDisclosure />

      <AdUnit />

      <h2 className="text-xl font-bold text-white mb-5">Our Editor Picks</h2>
      <EditorPickGrid picks={PICKS} />

      <AdUnit />

      <HomeSecurityCTA />

      <p className="text-xs text-gray-600 mt-8">Product cards link to Fashionistas.ai (our partner store) and open in a new tab. <Link href="/privacy" className="underline">Privacy Policy</Link></p>
    </Layout>
  );
}
