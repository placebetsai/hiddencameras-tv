import Layout from "../components/Layout";
import AdUnit from "../components/AdUnit";
import ComparisonTable from "../components/ComparisonTable";
import HomeSecurityCTA from "../components/HomeSecurityCTA";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import Link from "next/link";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

const PICKS = [{"r":1,"n":"Blink Mini 2","p":"$34.99","a":"B0CGX9GQ3Q","w":"Best overall. Tiny, affordable, 1080p HD with night vision and motion alerts."},{"r":2,"n":"Wyze Cam v4","p":"$35.98","a":"B0CJ9YX7DG","w":"Incredible value. Color night vision, IP65 weatherproof, works indoor/outdoor."},{"r":3,"n":"Ring Indoor Cam","p":"$59.99","a":"B09WZBPX7K","w":"Alexa integration, privacy shutter, two-way talk. Great for smart home setups."},{"r":4,"n":"Arlo Essential Indoor","p":"$49.99","a":"B0C6FD1VZ1","w":"Wire-free, automated privacy shield, 130-degree field of view."},{"r":5,"n":"Eufy Solo IndoorCam C24","p":"$27.99","a":"B0CP6HKRZ3","w":"No monthly fees. Local storage, AI person detection, 2K resolution."}];

export default function Page() {
  return (
    <Layout
      title="Best Hidden Cameras 2026 — HiddenCameras.tv"
      description="Expert-tested ranking of the best hidden cameras and spy cameras for home, office, and travel in 2026."
      canonical="https://hiddencameras.tv/best-hidden-cameras"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{"@type":"Question","name":"What is the best hidden camera for home use?","acceptedAnswer":{"@type":"Answer","text":"The Blink Mini 2 is the best overall for most homes — tiny, affordable at $35, with 1080p video, night vision, and motion alerts. For no monthly fees, the Eufy Solo C24 is the top pick."}},{"@type":"Question","name":"Are hidden cameras legal?","acceptedAnswer":{"@type":"Answer","text":"In most US states, hidden cameras are legal in your own home. You cannot place them in bathrooms, bedrooms of guests, or anywhere with an expectation of privacy. Audio recording laws vary by state."}}] }) }} />

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">TOP PICKS 2026</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Best Hidden Cameras 2026</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">Expert-tested ranking of the best hidden cameras and spy cameras for home, office, and travel in 2026.</p>

      <AffiliateDisclosure />

      <AdUnit />

      <ComparisonTable
        title="Best Hidden Cameras Comparison"
        products={PICKS.map(p => ({
          name: p.n,
          rating: 4.4,
          feature: p.w.split(".")[0] + ".",
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
