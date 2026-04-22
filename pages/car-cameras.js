import Layout from "../components/Layout";
import AdUnit from "../components/AdUnit";
import HomeSecurityCTA from "../components/HomeSecurityCTA";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import { EditorPickGrid } from "../components/EditorPickCard";
import { ROUNDUPS } from "../lib/fashionistasProducts";
import Link from "next/link";

const PICKS = ROUNDUPS["car-cameras"];

export default function Page() {
  return (
    <Layout
      title="Best Car Cameras & Dash Cams 2026 — HiddenCameras.tv"
      description="Protect yourself on the road. Top dash cams with accident recording, parking mode, and GPS tracking."
      canonical="https://hiddencameras.tv/car-cameras"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{"@type":"Question","name":"Are dash cams legal?","acceptedAnswer":{"@type":"Answer","text":"Dash cams are legal in all 50 US states. Some states restrict windshield mounting position. Recording audio may require consent in two-party consent states."}},{"@type":"Question","name":"Do dash cams record when the car is off?","acceptedAnswer":{"@type":"Answer","text":"Dash cams with parking mode (like Viofo and Nextbase) can record motion events when parked, powered by a hardwire kit connected to the car battery."}}] }) }} />

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">DASH CAMS</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Best Car Cameras & Dash Cams</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">Protect yourself on the road. Top dash cams with accident recording, parking mode, and GPS tracking. Every pick below ships from our partner store Fashionistas.ai.</p>

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
