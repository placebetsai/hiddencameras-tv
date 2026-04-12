import Layout from "../components/Layout";
import ComparisonTable from "../components/ComparisonTable";
import HomeSecurityCTA from "../components/HomeSecurityCTA";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import AdUnit from "../components/AdUnit";
import Link from "next/link";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

const PICKS = [{"r":1,"n":"Viofo A129 Pro Duo","p":"$199.99","a":"B07CT63W45","w":"Front + rear 4K recording, GPS, parking mode, capacitor-based (no battery to swell)."},{"r":2,"n":"Garmin Dash Cam 67W","p":"$229.99","a":"B0CY44K84G","w":"Extra-wide 180-degree lens, voice control, incident detection with cloud backup."},{"r":3,"n":"Rexing V1","p":"$49.99","a":"B00X528FNE","w":"Best budget dash cam. 1080p, loop recording, G-sensor for accident protection."},{"r":4,"n":"Nextbase 622GW","p":"$399.99","a":"B08LV5HLLF","w":"Premium: 4K, what3words location, Alexa built-in, emergency SOS feature."},{"r":5,"n":"Blink Mini 2 (interior)","p":"$34.99","a":"B0CGX9GQ3Q","w":"Affordable interior car cam. USB powered, baby/backseat monitor while driving."}];

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
      <p className="text-gray-400 mb-8 max-w-2xl">Protect yourself on the road. Top dash cams with accident recording, parking mode, and GPS tracking.</p>

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
