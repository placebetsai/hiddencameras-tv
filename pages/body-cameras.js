import Layout from "../components/Layout";
import ComparisonTable from "../components/ComparisonTable";
import HomeSecurityCTA from "../components/HomeSecurityCTA";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import AdUnit from "../components/AdUnit";
import Link from "next/link";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

const PICKS = [{"r":1,"n":"Boblov A22 Body Camera","p":"$49.99","a":"B07CT63W45","w":"1296p HD, 10-hour battery, one-touch recording. Best budget body cam."},{"r":2,"n":"MIUFLY 1296P Body Cam","p":"$59.99","a":"B0BWGXNTN8","w":"Night vision, 2\" display screen, 64GB storage, waterproof IP67."},{"r":3,"n":"CammPro I826","p":"$89.99","a":"B0BXJ8V1QV","w":"Pre-record buffer captures 30s before you press record. GPS logging."},{"r":4,"n":"Spy Pen Camera","p":"$39.99","a":"B0D1J9P9GS","w":"Discreet alternative. Clip to pocket, records 1080p. Good for delivery drivers."},{"r":5,"n":"GoPro Hero 12 Mini","p":"$199.99","a":"B0C1JB8ZHP","w":"Premium option. 5.3K video, waterproof, voice control. Best video quality."}];

export default function Page() {
  return (
    <Layout
      title="Best Body Cameras 2026 — Personal Safety — HiddenCameras.tv"
      description="Body worn cameras for personal safety, delivery drivers, security guards, and ride-share drivers."
      canonical="https://hiddencameras.tv/body-cameras"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{"@type":"Question","name":"Is it legal to wear a body camera?","acceptedAnswer":{"@type":"Answer","text":"In most US states, you can legally wear a body camera in public spaces. Recording in private spaces requires consent. Two-party consent states require you to inform others about audio recording."}},{"@type":"Question","name":"What body camera do security guards use?","acceptedAnswer":{"@type":"Answer","text":"Most security companies use the Boblov A22 or MIUFLY 1296P for their balance of price, battery life, and durability. Axon (used by police) is professional-grade but expensive."}}] }) }} />

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">BODY CAMS</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Best Body Cameras 2026</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">Body worn cameras for personal safety, delivery drivers, security guards, and ride-share drivers.</p>

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
