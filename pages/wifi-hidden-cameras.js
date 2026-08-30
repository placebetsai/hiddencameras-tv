import AdUnit from "../components/AdUnit";
import Link from "next/link";
import Layout from "../components/Layout";

export default function WifiHiddenCamerasPage() {
  return (
    <Layout
      title="WiFi Hidden Cameras: What to Buy, Avoid & Check | HiddenCameras.tv"
      description="Guide to WiFi hidden cameras, mini wireless cameras, nanny cams, app-connected cameras, and privacy checks before buying or using one."
      canonical="https://hiddencameras.tv/wifi-hidden-cameras"
    >
      <section className="max-w-5xl mx-auto px-4 py-14">
        <p className="text-brand-green text-xs font-black tracking-[0.24em] uppercase mb-4">Wireless Camera Guide</p>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-5">WiFi Hidden Cameras</h1>
        <p className="text-brand-muted text-lg leading-relaxed max-w-3xl mb-8">
          WiFi hidden cameras are searched differently from standard security cameras. This page targets
          wireless, app-connected, mini, nanny, and disguised camera searches directly.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/mini-spy-cameras" className="card block hover:border-brand-green/50 transition">
            <h2 className="text-white font-black mb-2">Mini WiFi Cameras</h2>
            <p className="text-brand-muted text-sm">Small wireless cameras, setup tradeoffs, and buyer warnings.</p>
          </Link>
          <Link href="/nanny-cam" className="card block hover:border-brand-green/50 transition">
            <h2 className="text-white font-black mb-2">Nanny Cams</h2>
            <p className="text-brand-muted text-sm">Home monitoring cameras for caregivers, pets, and rooms.</p>
          </Link>
          <Link href="/detect-hidden-cameras" className="card block hover:border-brand-green/50 transition">
            <h2 className="text-white font-black mb-2">Detection</h2>
            <p className="text-brand-muted text-sm">How to inspect rentals, hotels, and unfamiliar rooms.</p>
          </Link>
        </div

        <AdUnit slot="inContent" />
>
      </section>
    </Layout>
  );
}
