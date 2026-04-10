import Layout from "../components/Layout";
import AdUnit from "../components/AdUnit";
import Link from "next/link";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

const PICKS = [{"r":1,"n":"Ring Video Doorbell 4","p":"$219.99","a":"B09WZBPX7K","w":"The gold standard. Pre-roll video, color night vision, hardwired or battery option."},{"r":2,"n":"Google Nest Doorbell (Battery)","p":"$179.99","a":"B09FCLPLWX","w":"3 hours free event recording. Smart alerts for people, packages, animals, vehicles."},{"r":3,"n":"Blink Video Doorbell","p":"$49.99","a":"B08SG2MS3V","w":"Cheapest smart doorbell. 1080p, two-way audio, works with Alexa."},{"r":4,"n":"Eufy Video Doorbell","p":"$99.99","a":"B0BH69MF15","w":"No subscription. 2K resolution, local storage, human detection AI."},{"r":5,"n":"Arlo Essential Doorbell","p":"$149.99","a":"B0C6FD1VZ1","w":"Direct-to-WiFi (no hub needed). HDR video, 180-degree diagonal view."}];

export default function Page() {
  return (
    <Layout
      title="Best Video Doorbell Cameras 2026 — HiddenCameras.tv"
      description="See who's at your door from anywhere. Top video doorbells with motion detection, two-way talk, and package alerts."
      canonical="https://hiddencameras.tv/doorbell-cameras"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{"@type":"Question","name":"Do video doorbells work without a subscription?","acceptedAnswer":{"@type":"Answer","text":"Yes. Eufy and Blink offer free local storage. Ring and Nest offer basic functionality free but cloud recording requires a subscription ($4-$8/month)."}},{"@type":"Question","name":"Can you install a video doorbell in an apartment?","acceptedAnswer":{"@type":"Answer","text":"Yes. Battery-powered doorbells like Ring Battery and Nest Battery mount with adhesive strips — no drilling required. You can take it with you when you move."}}] }) }} />

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">DOORBELL CAMS</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Best Video Doorbell Cameras</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">See who's at your door from anywhere. Top video doorbells with motion detection, two-way talk, and package alerts.</p>

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
