import Layout from "../components/Layout";
import AdUnit from "../components/AdUnit";
import Link from "next/link";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

const PICKS = [{"r":1,"n":"Blink Mini 2","p":"$34.99","a":"B0CGX9GQ3Q","w":"Best seller for a reason. Small, cheap, reliable. 1080p with built-in spotlight."},{"r":2,"n":"Eufy Solo IndoorCam C24","p":"$27.99","a":"B0CP6HKRZ3","w":"Best no-subscription camera. 2K resolution, person detection AI, local storage only."},{"r":3,"n":"Ring Indoor Cam (2nd Gen)","p":"$59.99","a":"B09WZBPX7K","w":"Manual privacy shutter, Alexa built-in, color pre-roll previews."},{"r":4,"n":"Wyze Cam v4","p":"$35.98","a":"B0CJ9YX7DG","w":"Works indoor and outdoor. Best bang for buck with color night vision."},{"r":5,"n":"TP-Link Tapo C120","p":"$32.99","a":"B0CH45HPZT","w":"Starlight sensor for bright night footage. Physical privacy mode, microSD slot."}];

export default function Page() {
  return (
    <Layout
      title="Best Indoor Security Cameras 2026 — HiddenCameras.tv"
      description="Top indoor cameras for home security with person detection, two-way audio, and privacy shutters."
      canonical="https://hiddencameras.tv/indoor-security-cameras"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{"@type":"Question","name":"Do I need a subscription for indoor cameras?","acceptedAnswer":{"@type":"Answer","text":"No. Eufy, Wyze, TP-Link Tapo, and Reolink all offer local storage via microSD card with no monthly fees. Cloud storage is optional."}},{"@type":"Question","name":"Where should I place indoor cameras?","acceptedAnswer":{"@type":"Answer","text":"Best spots: main entrances (front/back doors), living room, hallways, and stairways. Never in bathrooms or bedrooms of guests."}}] }) }} />

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">INDOOR SECURITY</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Best Indoor Security Cameras</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">Top indoor cameras for home security with person detection, two-way audio, and privacy shutters.</p>

      <AdUnit />
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

      <p className="text-xs text-gray-600 mt-8">As an Amazon Associate, HiddenCameras.tv earns from qualifying purchases. <Link href="/privacy" className="underline">Privacy Policy</Link></p>
    </Layout>
  );
}
