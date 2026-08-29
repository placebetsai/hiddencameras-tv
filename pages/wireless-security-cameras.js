import Layout from "../components/Layout";
import AdUnit from "../components/AdUnit";
import HomeSecurityCTA from "../components/HomeSecurityCTA";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import { EditorPickGrid } from "../components/EditorPickCard";
import { ROUNDUPS } from "../lib/fashionistasProducts";
import Link from "next/link";

const PICKS = ROUNDUPS["wireless-security-cameras"];

export default function Page() {
  return (
    <Layout
      title="Best Wireless Security Cameras 2026 — HiddenCameras.tv"
      description="WiFi and battery-powered cameras with no wires. Easy install, smart alerts, and cloud or local storage."
      canonical="https://hiddencameras.tv/wireless-security-cameras"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{"@type":"Question","name":"How long do wireless camera batteries last?","acceptedAnswer":{"@type":"Answer","text":"Blink cameras last up to 2 years on AA batteries. Arlo and Ring cameras last 3-6 months on a charge depending on activity. Solar panels can keep cameras charged indefinitely."}},{"@type":"Question","name":"Do wireless cameras work without internet?","acceptedAnswer":{"@type":"Answer","text":"Most wireless cameras require WiFi for remote viewing. Some can record locally to SD cards without internet, but you won't get alerts or live streaming."}}] }) }} />

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">WIRE-FREE</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Best Wireless Security Cameras</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">WiFi and battery-powered cameras with no wires. Easy install, smart alerts, and cloud or local storage. Every pick below ships from a US warehouse with fast delivery.</p>

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
