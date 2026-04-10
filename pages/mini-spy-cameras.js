import Layout from "../components/Layout";
import AdUnit from "../components/AdUnit";
import Link from "next/link";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

const PICKS = [{"r":1,"n":"Mini WiFi Spy Camera 1\"","p":"$29.99","a":"B0BWGXNTN8","w":"Just 1 inch square. WiFi live streaming, motion detection, magnetic mount."},{"r":2,"n":"USB Charger Spy Camera","p":"$39.99","a":"B0C1JB8ZHP","w":"Looks like a normal phone charger. 1080p recording while actually charging your phone."},{"r":3,"n":"Spy Pen Camera","p":"$39.99","a":"B0D1J9P9GS","w":"Working ballpoint pen with hidden 1080p camera. 2 hours recording per charge."},{"r":4,"n":"Button Camera","p":"$34.99","a":"B0BXJ8V1QV","w":"Wearable button-size camera. Clips to shirt, records 1080p with one-touch start."},{"r":5,"n":"Blink Mini 2","p":"$34.99","a":"B0CGX9GQ3Q","w":"Not a spy cam but at 2 inches tall, it disappears on any shelf. WiFi with Alexa."}];

export default function Page() {
  return (
    <Layout
      title="Best Mini Spy Cameras 2026 — Ultra Small & Hidden — HiddenCameras.tv"
      description="The smallest hidden cameras you can buy. Mini WiFi spy cams, button cameras, USB charger cams and more."
      canonical="https://hiddencameras.tv/mini-spy-cameras"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{"@type":"Question","name":"What is the smallest camera you can buy?","acceptedAnswer":{"@type":"Answer","text":"The smallest consumer cameras are approximately 0.8 to 1 inch square. Mini WiFi spy cameras at this size can record 1080p video and stream live to your phone."}},{"@type":"Question","name":"How long can a mini spy camera record?","acceptedAnswer":{"@type":"Answer","text":"Battery-powered mini cams typically record 1-4 hours continuously. With motion-only recording, they can last days. USB charger cameras record indefinitely while plugged in."}}] }) }} />

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">ULTRA COMPACT</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Best Mini Spy Cameras</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">The smallest hidden cameras you can buy. Mini WiFi spy cams, button cameras, USB charger cams and more.</p>

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
