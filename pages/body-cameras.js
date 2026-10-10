import Layout from "../components/Layout";
import AdUnit from "../components/AdUnit";
import HomeSecurityCTA from "../components/HomeSecurityCTA";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import { EditorPickGrid } from "../components/EditorPickCard";
import { ROUNDUPS } from "../lib/fashionistasProducts";
import Link from "next/link";
import Editorial from "../components/Editorial";

const PICKS = ROUNDUPS["body-cameras"];

export default function Page() {
  return (
    <Layout
      title="Best Body Cameras 2026 — Personal Safety — HiddenCameras.tv"
      description="Body worn cameras for personal safety, delivery drivers, security guards, and ride-share drivers."
      canonical="https://hiddencameras.tv/body-cameras"
    >

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">BODY CAMS</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Best Body Cameras 2026</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">Body worn cameras for personal safety, delivery drivers, security guards, and ride-share drivers. Every pick below ships from a US warehouse with fast delivery.</p>

      <AffiliateDisclosure />

      <AdUnit />

      <h2 className="text-xl font-bold text-white mb-5">Our Editor Picks</h2>
      <EditorPickGrid picks={PICKS} />

      <AdUnit />

      <Editorial slug="body-cameras" />

      <HomeSecurityCTA />

      <p className="text-xs text-gray-600 mt-8">Product cards open in a new tab. <Link href="/privacy" className="underline">Privacy Policy</Link></p>
    </Layout>
  );
}
