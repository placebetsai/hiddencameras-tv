import Layout from "../components/Layout";
import AdUnit from "../components/AdUnit";
import Link from "next/link";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

const PICKS = [{"r":1,"n":"Wyze Cam v4","p":"$35.98","a":"B0CJ9YX7DG","w":"Best nanny cam for the price. Color night vision, sound detection, two-way audio to talk to your nanny."},{"r":2,"n":"Blink Mini 2","p":"$34.99","a":"B0CGX9GQ3Q","w":"Tiny and affordable. Set up in the nursery in minutes, watch from your phone at work."},{"r":3,"n":"Infant Optics DXR-8 PRO","p":"$179.99","a":"B00ECHYTBI","w":"Dedicated baby monitor with 5\" HD display. No WiFi needed — fully encrypted, hack-proof signal."},{"r":4,"n":"Eufy Baby Monitor","p":"$159.99","a":"B0CHVFG8B2","w":"5\" display, cry detection AI, sleep tracking. No subscription fees ever."},{"r":5,"n":"Nanit Pro","p":"$299.99","a":"B07XRTGL4R","w":"Premium choice. Breathing monitoring with Nanit band, sleep analytics, HD streaming."}];

export default function Page() {
  return (
    <Layout
      title="Best Nanny Cams 2026 — Monitor Your Childcare — HiddenCameras.tv"
      description="Top-rated nanny cameras with live streaming, two-way audio, and motion alerts. Keep your kids safe when you're not home."
      canonical="https://hiddencameras.tv/nanny-cam"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{"@type":"Question","name":"Is it legal to have a nanny cam?","acceptedAnswer":{"@type":"Answer","text":"Yes, nanny cams are legal in all 50 US states. However, cameras in bathrooms or areas where the nanny changes are illegal. Some states require you to inform the nanny about recording — check your state laws."}},{"@type":"Question","name":"What's the best nanny cam without WiFi?","acceptedAnswer":{"@type":"Answer","text":"The Infant Optics DXR-8 PRO uses a dedicated encrypted FHSS signal with no WiFi required, making it impossible to hack remotely."}}] }) }} />

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">CHILDCARE SAFETY</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Best Nanny Cams 2026</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">Top-rated nanny cameras with live streaming, two-way audio, and motion alerts. Keep your kids safe when you're not home.</p>

      <AdUnit />
      <h2 className="text-xl font-bold text-white mb-5">Our Top Picks</h2>
      <div className="space-y-4 mb-10">
        {PICKS.map((p) => (
          <div key={p.a} className="card flex gap-4 items-start">
            <div className="text-3xl font-extrabold text-brand-green/30 leading-none pt-1">#{p.r}</div>
            <div className="flex-1">
              <h3 className="font-bold text-white mb-1">{p.n} <span className="text-gray-500 text-sm font-normal">{p.p}</span></h3>
              <p className="text-gray-400 text-sm mb-3">{p.w}</p>
              <a href={`https://www.amazon.com/dp/${p.a}?tag=${AMAZON_TAG}`} target="_blank" rel="nofollow sponsored noopener noreferrer" className="inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1.5 rounded hover:bg-yellow-300 transition">{p.p} on Amazon</a>
            </div>
          </div>
        ))}
      </div>

      <AdUnit />

      <p className="text-xs text-gray-600 mt-8">As an Amazon Associate, HiddenCameras.tv earns from qualifying purchases. <Link href="/privacy" className="underline">Privacy Policy</Link></p>
    </Layout>
  );
}
