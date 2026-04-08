import Layout from "../components/Layout";
import AdUnit from "../components/AdUnit";
import Link from "next/link";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

const PICKS = [{"r":1,"n":"Bushnell Core DS","p":"$149.99","a":"B09FCLPLWX","w":"Dual sensor: 30MP photos, 4K video. Lightning fast 0.15s trigger speed."},{"r":2,"n":"Stealth Cam Fusion X","p":"$119.99","a":"B07CT63W45","w":"Cellular trail cam with AT&T/Verizon. Sends photos to your phone instantly."},{"r":3,"n":"Moultrie Mobile Edge","p":"$99.99","a":"B08SG2MS3V","w":"Cheapest cellular cam. Auto-sends night and day photos to the Moultrie app."},{"r":4,"n":"Reconyx HyperFire 2","p":"$449.99","a":"B0BH69MF15","w":"Professional grade. Fastest trigger, best image quality, 5-year warranty."},{"r":5,"n":"Campark T86","p":"$59.99","a":"B0BN4QNCPK","w":"Best budget trail cam. 30MP, WiFi + Bluetooth, 2\" color screen."}];

export default function Page() {
  return (
    <Layout
      title="Best Trail Cameras 2026 — Wildlife & Property — HiddenCameras.tv"
      description="Top trail cameras for hunting, wildlife photography, and rural property security. Cellular and WiFi models reviewed."
      canonical="https://hiddencameras.tv/trail-cameras"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{"@type":"Question","name":"What is the best trail camera for the money?","acceptedAnswer":{"@type":"Answer","text":"The Campark T86 at $60 offers the best value with 30MP photos and WiFi connectivity. For cellular connectivity, the Moultrie Mobile Edge at $100 is the most affordable option."}},{"@type":"Question","name":"How do cellular trail cameras work?","acceptedAnswer":{"@type":"Answer","text":"Cellular trail cams have a built-in SIM card that sends photos to your phone via cell networks (AT&T, Verizon). They require a monthly data plan, typically $5-15/month."}}] }) }} />

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">TRAIL & GAME CAMS</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Best Trail Cameras 2026</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">Top trail cameras for hunting, wildlife photography, and rural property security. Cellular and WiFi models reviewed.</p>

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
