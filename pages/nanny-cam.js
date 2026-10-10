import Layout from "../components/Layout";
import AdUnit from "../components/AdUnit";
import HomeSecurityCTA from "../components/HomeSecurityCTA";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import { EditorPickGrid } from "../components/EditorPickCard";
import { ROUNDUPS } from "../lib/fashionistasProducts";
import Link from "next/link";
import Editorial from "../components/Editorial";

const PICKS = ROUNDUPS["nanny-cam"];

export default function Page() {
  return (
    <Layout
      title="Best Nanny Cams 2026 — Monitor Your Childcare — HiddenCameras.tv"
      description="Top-rated nanny cameras with live streaming, two-way audio, and motion alerts. Keep your kids safe when you're not home."
      canonical="https://hiddencameras.tv/nanny-cam"
    >

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">CHILDCARE SAFETY</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Best Nanny Cams 2026</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">Top-rated nanny cameras with live streaming, two-way audio, and motion alerts. Keep your kids safe when you&apos;re not home — every pick below ships from a US warehouse with fast delivery.</p>

      <AffiliateDisclosure />

      <AdUnit />

      <h2 className="text-xl font-bold text-white mb-5">Our Editor Picks</h2>
      <EditorPickGrid picks={PICKS} />

      <AdUnit />

      <Editorial slug="nanny-cam" />

      <HomeSecurityCTA />

      <p className="text-xs text-gray-600 mt-8">Product cards open in a new tab. <Link href="/privacy" className="underline">Privacy Policy</Link></p>
    </Layout>
  );
}
