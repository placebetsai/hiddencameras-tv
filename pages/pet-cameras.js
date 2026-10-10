import Layout from "../components/Layout";
import AdUnit from "../components/AdUnit";
import HomeSecurityCTA from "../components/HomeSecurityCTA";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import { EditorPickGrid } from "../components/EditorPickCard";
import { ROUNDUPS } from "../lib/fashionistasProducts";
import Link from "next/link";
import Editorial from "../components/Editorial";

const PICKS = ROUNDUPS["pet-cameras"];

export default function Page() {
  return (
    <Layout
      title="Best Pet Cameras 2026 — Watch Your Pets Anytime — HiddenCameras.tv"
      description="Monitor and interact with your pets from work. Pet cameras with treat dispensers, two-way audio, and bark alerts."
      canonical="https://hiddencameras.tv/pet-cameras"
    >

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">PET MONITORING</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Best Pet Cameras 2026</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">Monitor and interact with your pets from work. Pet cameras with treat dispensers, two-way audio, and bark alerts. Every pick below ships from a US warehouse with fast delivery.</p>

      <AffiliateDisclosure />

      <AdUnit />

      <h2 className="text-xl font-bold text-white mb-5">Our Editor Picks</h2>
      <EditorPickGrid picks={PICKS} />

      <AdUnit />

      <Editorial slug="pet-cameras" />

      <HomeSecurityCTA />

      <p className="text-xs text-gray-600 mt-8">Product cards open in a new tab. <Link href="/privacy" className="underline">Privacy Policy</Link></p>
    </Layout>
  );
}
