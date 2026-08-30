import AdUnit from "../components/AdUnit";
import Link from "next/link";
import Layout from "../components/Layout";

const guides = [
  ["Best Hidden Cameras 2026", "/best-hidden-cameras-2026"],
  ["Hidden Cameras for Airbnb", "/best-hidden-cameras-airbnb"],
  ["How to Detect Hidden Cameras", "/detect-hidden-cameras"],
  ["Hidden Camera Laws", "/hidden-camera-laws"],
  ["Spy Cameras", "/spy-cameras"],
  ["Mini Spy Cameras", "/mini-spy-cameras"],
];

export default function HiddenCamerasPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Hidden Cameras",
    url: "https://hiddencameras.tv/hidden-cameras",
    description:
      "Hidden camera buying guides, detection guides, privacy rules, and discreet security camera reviews.",
  };

  return (
    <Layout
      title="Hidden Cameras: Reviews, Laws, Detectors & Buying Guides | HiddenCameras.tv"
      description="Hidden camera guides for buyers and renters: best hidden cameras, spy cameras, mini cameras, detection tips, Airbnb safety, and hidden camera laws."
      canonical="https://hiddencameras.tv/hidden-cameras"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="max-w-5xl mx-auto px-4 py-14">
        <p className="text-brand-green text-xs font-black tracking-[0.24em] uppercase mb-4">Hidden Camera Hub</p>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-5">Hidden Cameras</h1>
        <p className="text-brand-muted text-lg leading-relaxed max-w-3xl mb-8">
          Reviews, buying guides, detection checklists, and privacy rules for hidden cameras, spy cameras,
          mini WiFi cameras, nanny cams, and disguised security cameras.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {guides.map(([title, href]) => (
            <Link key={href} href={href} className="card block hover:border-brand-green/50 transition">
              <h2 className="text-white text-lg font-black mb-2">{title}</h2>
              <p className="text-brand-muted text-sm leading-relaxed">
                Read the focused guide for this hidden-camera search intent.
              </p>
            </Link>
          ))}
        </div>

        <AdUnit slot="inContent" />
>
      </section>
    </Layout>
  );
}
