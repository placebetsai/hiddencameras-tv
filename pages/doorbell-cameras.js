import Layout from "../components/Layout";
import AdUnit from "../components/AdUnit";
import HomeSecurityCTA from "../components/HomeSecurityCTA";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import { EditorPickGrid } from "../components/EditorPickCard";
import { ROUNDUPS } from "../lib/fashionistasProducts";
import Link from "next/link";
import Editorial from "../components/Editorial";

const PICKS = ROUNDUPS["doorbell-cameras"];

export default function Page() {
  return (
    <Layout
      title="Best Video Doorbell Cameras 2026 — HiddenCameras.tv"
      description="See who's at your door from anywhere. Top video doorbells with motion detection, two-way talk, and package alerts."
      canonical="https://hiddencameras.tv/doorbell-cameras"
    >

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">DOORBELL CAMS</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Best Video Doorbell Cameras</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">See who&apos;s at your door from anywhere. Top video doorbells with motion detection, two-way talk, and package alerts. Every pick below ships from a US warehouse with fast delivery.</p>

      <AffiliateDisclosure />

      <AdUnit />

      <h2 className="text-xl font-bold text-white mb-5">Our Editor Picks</h2>
      <EditorPickGrid picks={PICKS} />

      <AdUnit />

      <Editorial slug="doorbell-cameras" />

      <HomeSecurityCTA />

      <p className="text-xs text-gray-600 mt-8">Product cards open in a new tab. <Link href="/privacy" className="underline">Privacy Policy</Link></p>
    </Layout>
  );
}
