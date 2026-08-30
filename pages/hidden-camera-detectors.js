import AdUnit from "../components/AdUnit";
import Link from "next/link";
import Layout from "../components/Layout";

export default function HiddenCameraDetectorsPage() {
  return (
    <Layout
      title="Hidden Camera Detectors: Best Detector Guides & Room Checks | HiddenCameras.tv"
      description="Hidden camera detector guide for finding camera lenses, RF signals, WiFi cameras, and suspicious devices in hotels, rentals, offices, and homes."
      canonical="https://hiddencameras.tv/hidden-camera-detectors"
    >
      <section className="max-w-5xl mx-auto px-4 py-14">
        <p className="text-brand-green text-xs font-black tracking-[0.24em] uppercase mb-4">Detector Guide</p>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-5">Hidden Camera Detectors</h1>
        <p className="text-brand-muted text-lg leading-relaxed max-w-3xl mb-8">
          A focused landing page for people searching for hidden camera detectors, RF detectors,
          camera-lens finders, and Airbnb room-check tools.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/best-hidden-camera-detector" className="card block hover:border-brand-green/50 transition">
            <h2 className="text-white font-black mb-2">Best Hidden Camera Detector</h2>
            <p className="text-brand-muted text-sm">Detector picks and what the devices can actually find.</p>
          </Link>
          <Link href="/how-to-detect-hidden-cameras-airbnb" className="card block hover:border-brand-green/50 transition">
            <h2 className="text-white font-black mb-2">Airbnb Room Checks</h2>
            <p className="text-brand-muted text-sm">A practical inspection path for rentals and hotel rooms.</p>
          </Link>
        </div>

        <AdUnit slot="inContent" />
>
      </section>
    </Layout>
  );
}
