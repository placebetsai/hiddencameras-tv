import Layout from "../components/Layout";
import ComparisonTable from "../components/ComparisonTable";
import HomeSecurityCTA from "../components/HomeSecurityCTA";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import AdUnit from "../components/AdUnit";
import Link from "next/link";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

const PICKS = [{"r":1,"n":"Ring Floodlight Cam Wired Pro","p":"$249.99","a":"B09WZBPX7K","w":"Floodlight + camera combo. 3D motion detection, bird's eye view, siren alarm."},{"r":2,"n":"Arlo Pro 5S","p":"$249.99","a":"B0C6FD1VZ1","w":"Wire-free, 2K HDR, color night vision. 160-degree field of view with smart alerts."},{"r":3,"n":"Blink Outdoor 4","p":"$99.99","a":"B0B1N5HW22","w":"2 year battery life, weatherproof, affordable. Best budget outdoor camera."},{"r":4,"n":"Wyze Cam v4","p":"$35.98","a":"B0CJ9YX7DG","w":"IP65 weatherproof at an unbeatable price. Color night vision even outdoors."},{"r":5,"n":"Reolink Argus 4 Pro","p":"$129.99","a":"B0BN4QNCPK","w":"4K UHD, solar panel option, dual-band WiFi 6, color night vision. No subscription."}];

export default function Page() {
  return (
    <Layout
      title="Best Outdoor Security Cameras 2026 — HiddenCameras.tv"
      description="Weatherproof outdoor cameras with night vision, motion zones, and smart alerts. Protect your home exterior."
      canonical="https://hiddencameras.tv/outdoor-security-cameras"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{"@type":"Question","name":"What outdoor camera has the best night vision?","acceptedAnswer":{"@type":"Answer","text":"The Reolink Argus 4 Pro and Arlo Pro 5S both have excellent color night vision. For budget options, the Wyze Cam v4 delivers surprisingly good color night vision at just $36."}},{"@type":"Question","name":"Do outdoor cameras work in winter?","acceptedAnswer":{"@type":"Answer","text":"Yes, most outdoor cameras are rated for -4°F to 113°F. Battery cameras may need more frequent charging in extreme cold. Wired cameras are unaffected by temperature."}}] }) }} />

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">OUTDOOR SECURITY</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Best Outdoor Security Cameras</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">Weatherproof outdoor cameras with night vision, motion zones, and smart alerts. Protect your home exterior.</p>

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
