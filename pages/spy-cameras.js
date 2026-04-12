import Layout from "../components/Layout";
import ComparisonTable from "../components/ComparisonTable";
import HomeSecurityCTA from "../components/HomeSecurityCTA";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import AdUnit from "../components/AdUnit";
import Link from "next/link";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

const PICKS = [{"r":1,"n":"Mini WiFi Spy Camera","p":"$29.99","a":"B0BWGXNTN8","w":"Tiny 1-inch cube. WiFi enabled, motion detection, records to micro SD or cloud."},{"r":2,"n":"Blink Mini 2","p":"$34.99","a":"B0CGX9GQ3Q","w":"Looks like a regular smart cam but tiny enough to hide on any shelf or desk."},{"r":3,"n":"Hidden Pen Camera","p":"$39.99","a":"B0D1J9P9GS","w":"Working pen with 1080p camera. Perfect for meetings and office use."},{"r":4,"n":"Clock Hidden Camera","p":"$45.99","a":"B0C1JB8ZHP","w":"Functional desk clock with built-in 1080p camera and night vision."},{"r":5,"n":"Smoke Detector Camera","p":"$49.99","a":"B0BXJ8V1QV","w":"Looks exactly like a smoke detector. Wide angle, motion activated, WiFi streaming."}];

export default function Page() {
  return (
    <Layout
      title="Best Spy Cameras for Home 2026 — HiddenCameras.tv"
      description="Covert spy cameras disguised as everyday objects. Mini cameras, pen cams, and hidden WiFi cameras reviewed."
      canonical="https://hiddencameras.tv/spy-cameras"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{"@type":"Question","name":"What is the smallest spy camera available?","acceptedAnswer":{"@type":"Answer","text":"The smallest consumer spy cameras are about 1 inch square. Mini WiFi spy cams can be hidden in clocks, pens, USB chargers, and smoke detectors while recording in 1080p HD."}},{"@type":"Question","name":"Can spy cameras work without WiFi?","acceptedAnswer":{"@type":"Answer","text":"Yes. Many spy cameras record to micro SD cards locally without any internet connection. WiFi is only needed for live streaming and remote viewing."}}] }) }} />

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">COVERT CAMERAS</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Best Spy Cameras for Home</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">Covert spy cameras disguised as everyday objects. Mini cameras, pen cams, and hidden WiFi cameras reviewed.</p>

      <AffiliateDisclosure />

      <AdUnit />

      <ComparisonTable
        title="Quick Comparison"
        products={PICKS.map(p => ({
          name: p.n,
          rating: 4.4,
          feature: p.w.split('.')[0] + '.',
          price: p.p,
          asin: p.a,
        }))}
      />

      <h2 className="text-xl font-bold text-white mb-5">Our Top Picks</h2>
      <div className="space-y-4 mb-10">
        {PICKS.map((p) => (
          <div key={p.a} className="card flex gap-4 items-start">
            <div className="text-3xl font-extrabold text-brand-green/30 leading-none pt-1">#{p.r}</div>
            <div className="flex-1">
              <h3 className="font-bold text-white mb-1">{p.n} <span className="text-gray-500 text-sm font-normal">{p.p}</span></h3>
              <p className="text-gray-400 text-sm mb-3">{p.w}</p>
              <a href={`https://www.amazon.com/dp/${p.a}?tag=${AMAZON_TAG}`} target="_blank" rel="nofollow sponsored noopener noreferrer" className="block w-full text-center bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm py-3 px-4 rounded-lg transition shadow-sm hover:shadow-lg hover:shadow-yellow-400/20">Buy on Amazon — {p.p} →</a>
            </div>
          </div>
        ))}
      </div>

      <AdUnit />

      <HomeSecurityCTA />

      <p className="text-xs text-gray-600 mt-8">As an Amazon Associate, HiddenCameras.tv earns from qualifying purchases. <Link href="/privacy" className="underline">Privacy Policy</Link></p>
    </Layout>
  );
}
