import Layout from "../components/Layout";
import AdUnit from "../components/AdUnit";
import HomeSecurityCTA from "../components/HomeSecurityCTA";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import { EditorPickGrid } from "../components/EditorPickCard";
import { ROUNDUPS } from "../lib/fashionistasProducts";
import Link from "next/link";

const PICKS = ROUNDUPS["spy-cameras"];

export default function Page() {
  return (
    <Layout
      title="Best Spy Cameras for Home 2026 — HiddenCameras.tv"
      description="Covert spy cameras disguised as everyday objects. Mini cameras, pen cams, and hidden WiFi cameras reviewed."
      canonical="https://hiddencameras.tv/spy-cameras"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{"@type":"Question","name":"What is the smallest spy camera available?","acceptedAnswer":{"@type":"Answer","text":"The smallest consumer spy cameras are about 1 inch square. Mini WiFi spy cams can be hidden in clocks, pens, USB chargers, and smoke detectors while recording in 1080p HD."}},{"@type":"Question","name":"Can spy cameras work without WiFi?","acceptedAnswer":{"@type":"Answer","text":"Yes. Many spy cameras record to micro SD cards locally without any internet connection. WiFi is only needed for live streaming and remote viewing."}}] }) }} />

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">COVERT CAMERAS</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Best Spy Cameras for Home</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">Covert spy cameras disguised as everyday objects. Mini cameras, pen cams, and hidden WiFi cameras reviewed. Every pick below ships from a US warehouse with fast delivery.</p>

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
