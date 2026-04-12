import Layout from "../components/Layout";
import ComparisonTable from "../components/ComparisonTable";
import HomeSecurityCTA from "../components/HomeSecurityCTA";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import AdUnit from "../components/AdUnit";
import Link from "next/link";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

const PICKS = [{"r":1,"n":"Furbo 360 Dog Camera","p":"$179.99","a":"B08LV5HLLF","w":"Treat tossing, 360-degree rotation, bark and activity alerts. The #1 pet camera."},{"r":2,"n":"Wyze Cam v4","p":"$35.98","a":"B0CJ9YX7DG","w":"Budget pet cam. Sound detection catches barking, two-way audio to calm your pet."},{"r":3,"n":"Petcube Bites 2 Lite","p":"$99.00","a":"B07R96V5VV","w":"Treat dispenser + 1080p camera. 160-degree wide-angle to see the whole room."},{"r":4,"n":"Blink Mini 2","p":"$34.99","a":"B0CGX9GQ3Q","w":"Cheapest way to watch your pet. Motion zones to focus on their bed or crate area."},{"r":5,"n":"Eufy IndoorCam C24","p":"$27.99","a":"B0CP6HKRZ3","w":"No subscription pet monitoring. AI distinguishes pets from people in alerts."}];

export default function Page() {
  return (
    <Layout
      title="Best Pet Cameras 2026 — Watch Your Pets Anytime — HiddenCameras.tv"
      description="Monitor and interact with your pets from work. Pet cameras with treat dispensers, two-way audio, and bark alerts."
      canonical="https://hiddencameras.tv/pet-cameras"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{"@type":"Question","name":"What camera is best for watching dogs?","acceptedAnswer":{"@type":"Answer","text":"The Furbo 360 is the top dog camera with treat tossing and bark detection. For budget monitoring, the Wyze Cam v4 at $36 does an excellent job with sound alerts and two-way audio."}},{"@type":"Question","name":"Can pet cameras detect barking?","acceptedAnswer":{"@type":"Answer","text":"Yes. Furbo, Wyze, Ring, and Blink cameras all offer sound detection that alerts you when your dog barks or makes noise while you're away."}}] }) }} />

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">PET MONITORING</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Best Pet Cameras 2026</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">Monitor and interact with your pets from work. Pet cameras with treat dispensers, two-way audio, and bark alerts.</p>

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
