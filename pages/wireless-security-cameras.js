import Layout from "../components/Layout";
import AdUnit from "../components/AdUnit";
import Link from "next/link";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

const PICKS = [{"r":1,"n":"Blink Outdoor 4","p":"$99.99","a":"B0B1N5HW22","w":"2 year battery on 2 AA lithium batteries. Truly wireless with no charging needed."},{"r":2,"n":"Arlo Essential","p":"$49.99","a":"B0C6FD1VZ1","w":"Rechargeable battery, 2K video, built-in spotlight and siren."},{"r":3,"n":"Ring Stick Up Cam Battery","p":"$99.99","a":"B09WZBPX7K","w":"Versatile — works indoor or outdoor. Quick-release rechargeable battery."},{"r":4,"n":"Reolink Argus 4 Pro","p":"$129.99","a":"B0BN4QNCPK","w":"4K solar-powered option. Dual-band WiFi 6 for reliable connection."},{"r":5,"n":"Wyze Cam v4","p":"$35.98","a":"B0CJ9YX7DG","w":"Not battery-powered but truly wireless with USB-C. Cheapest quality wireless cam."}];

export default function Page() {
  return (
    <Layout
      title="Best Wireless Security Cameras 2026 — HiddenCameras.tv"
      description="WiFi and battery-powered cameras with no wires. Easy install, smart alerts, and cloud or local storage."
      canonical="https://hiddencameras.tv/wireless-security-cameras"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{"@type":"Question","name":"How long do wireless camera batteries last?","acceptedAnswer":{"@type":"Answer","text":"Blink cameras last up to 2 years on AA batteries. Arlo and Ring cameras last 3-6 months on a charge depending on activity. Solar panels can keep cameras charged indefinitely."}},{"@type":"Question","name":"Do wireless cameras work without internet?","acceptedAnswer":{"@type":"Answer","text":"Most wireless cameras require WiFi for remote viewing. Some can record locally to SD cards without internet, but you won't get alerts or live streaming."}}] }) }} />

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">WIRE-FREE</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Best Wireless Security Cameras</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">WiFi and battery-powered cameras with no wires. Easy install, smart alerts, and cloud or local storage.</p>

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
