import Layout from "../components/Layout";
import AdUnit from "../components/AdUnit";
import HomeSecurityCTA from "../components/HomeSecurityCTA";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import { EditorPickGrid } from "../components/EditorPickCard";
import { ROUNDUPS } from "../lib/fashionistasProducts";
import Link from "next/link";

const PICKS = ROUNDUPS["pet-cameras"];

export default function Page() {
  return (
    <Layout
      title="Best Pet Cameras 2026 — Watch Your Pets Anytime — HiddenCameras.tv"
      description="Monitor and interact with your pets from work. Pet cameras with treat dispensers, two-way audio, and bark alerts."
      canonical="https://hiddencameras.tv/pet-cameras"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{"@type":"Question","name":"What camera is best for watching dogs?","acceptedAnswer":{"@type":"Answer","text":"The Furbo 360 is the top dog camera with treat tossing and bark detection. For budget monitoring, the <a href="https://www.amazon.com/dp/B0BJLXMVMV?tag=YOUR_AMAZON_TAG-20" target="_blank" rel="noopener sponsored">Wyze</a> v4 at $36 does an excellent job with sound alerts and two-way audio."}},{"@type":"Question","name":"Can pet cameras detect barking?","acceptedAnswer":{"@type":"Answer","text":"Yes. Furbo, Wyze, Ring, and Blink cameras all offer sound detection that alerts you when your dog barks or makes noise while you're away."}}] }) }} />

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">PET MONITORING</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Best Pet Cameras 2026</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">Monitor and interact with your pets from work. Pet cameras with treat dispensers, two-way audio, and bark alerts. Every pick below ships from a US warehouse with fast delivery.</p>

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
