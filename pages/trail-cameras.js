import Layout from "../components/Layout";
import AdUnit from "../components/AdUnit";
import HomeSecurityCTA from "../components/HomeSecurityCTA";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import { EditorPickGrid } from "../components/EditorPickCard";
import { ROUNDUPS } from "../lib/fashionistasProducts";
import Link from "next/link";

const PICKS = ROUNDUPS["trail-cameras"];

export default function Page() {
  return (
    <Layout
      title="Best Trail Cameras 2026 — Wildlife & Property — HiddenCameras.tv"
      description="Top trail cameras for hunting, wildlife photography, and rural property security. Cellular and WiFi models reviewed."
      canonical="https://hiddencameras.tv/trail-cameras"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{"@type":"Question","name":"What is the best trail camera for the money?","acceptedAnswer":{"@type":"Answer","text":"The Campark T86 at $60 offers the best value with 30MP photos and WiFi connectivity. For cellular connectivity, the Moultrie Mobile Edge at $100 is the most affordable option."}},{"@type":"Question","name":"How do cellular trail cameras work?","acceptedAnswer":{"@type":"Answer","text":"Cellular trail cams have a built-in SIM card that sends photos to your phone via cell networks (AT&T, Verizon). They require a monthly data plan, typically $5-15/month."}}] }) }} />

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">TRAIL & GAME CAMS</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Best Trail Cameras 2026</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">Top trail cameras for hunting, wildlife photography, and rural property security. Cellular and WiFi models reviewed. Every pick below ships from our partner store Fashionistas.ai.</p>

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
