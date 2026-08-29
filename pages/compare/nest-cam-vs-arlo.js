import Layout from "../../components/Layout";
import ComparisonTable from "../../components/ComparisonTable";
import HomeSecurityCTA from "../../components/HomeSecurityCTA";
import AffiliateDisclosure from "../../components/AffiliateDisclosure";
import AdUnit from "../../components/AdUnit";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

const PICKS = [
  {"r":1,"n":"Google Nest Cam (Indoor, Wired)","p":"$99.99","a":"B09FCLPLWX","w":"Best Nest cam. On-device AI, familiar face detection, 24/7 recording with Nest Aware, Google Home native."},
  {"r":2,"n":"Arlo Pro 5S 2K Spotlight","p":"$199.99","a":"B0BXQMZ3KJ","w":"Best Arlo camera. 2K HDR, color night vision, wire-free, 6-month battery, HomeKit compatible."},
  {"r":3,"n":"Google Nest Doorbell (Wired)","p":"$179.99","a":"B09D3GYSQH","w":"Best Nest doorbell. 24/7 recording, on-device AI, HDR, package and familiar face detection."},
  {"r":4,"n":"Arlo Essential Video Doorbell","p":"$129.99","a":"B08LB5L5RJ","w":"Budget Arlo doorbell. 1080p HDR, night vision, two-way audio, works with Alexa and Google."}
];

export default function Page() {
  return (
    <Layout
      title="Google Nest Cam vs Arlo 2026: Premium Camera Battle — HiddenCameras.tv"
      description="Nest Cam vs Arlo comparison for 2026. Two premium ecosystems go head-to-head. AI features, video quality, smart home integration, and subscription costs compared."
      canonical="https://hiddencameras.tv/compare/nest-cam-vs-arlo"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Which has better AI features?","acceptedAnswer":{"@type":"Answer","text":"Google Nest Cam leads with on-device AI processing for familiar face detection, package detection, and activity zones without sending data to the cloud. Arlo offers person/vehicle/animal/package detection but relies more on cloud processing."}},{"@type":"Question","name":"Which offers better video quality?","acceptedAnswer":{"@type":"Answer","text":"Arlo wins with 2K HDR on the Pro 5S vs Nest Cam's 1080p HDR. Arlo also offers wider field of view (160°) and superior color night vision. For pure image clarity, Arlo has the edge."}},{"@type":"Question","name":"Do both work with Google Home?","acceptedAnswer":{"@type":"Answer","text":"Nest Cam is a native Google Home device with seamless integration, Chromecast support, and Google Assistant commands. Arlo works with Google Assistant for live view but doesn't have the same depth of integration as Nest."}},{"@type":"Question","name":"Which subscription is cheaper?","acceptedAnswer":{"@type":"Answer","text":"Google Nest Aware starts at $8/month for 30-day event history on one camera. Arlo Secure starts at $4.99/month per camera. Arlo is cheaper for single cameras, but Nest Aware Plus at $15/month for unlimited cameras offers better multi-camera value."}}]},
              {"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@type":"Product","name":"Google Nest Cam (Indoor, Wired)","offers":{"@type":"Offer","price":"99.99","priceCurrency":"USD","availability":"https://schema.org/InStock","url":"https://www.amazon.com/dp/B09FCLPLWX?tag=hiddencamerastv-20"}}},{"@type":"ListItem","position":2,"item":{"@type":"Product","name":"Arlo Pro 5S 2K Spotlight","offers":{"@type":"Offer","price":"199.99","priceCurrency":"USD","availability":"https://schema.org/InStock","url":"https://www.amazon.com/dp/B0BXQMZ3KJ?tag=hiddencamerastv-20"}}},{"@type":"ListItem","position":3,"item":{"@type":"Product","name":"Google Nest Doorbell (Wired)","offers":{"@type":"Offer","price":"179.99","priceCurrency":"USD","availability":"https://schema.org/InStock","url":"https://www.amazon.com/dp/B09D3GYSQH?tag=hiddencamerastv-20"}}},{"@type":"ListItem","position":4,"item":{"@type":"Product","name":"Arlo Essential Video Doorbell","offers":{"@type":"Offer","price":"129.99","priceCurrency":"USD","availability":"https://schema.org/InStock","url":"https://www.amazon.com/dp/B08LB5L5RJ?tag=hiddencamerastv-20"}}}]}
            ]
          }),
        }}
      />

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">COMPARISON</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Google Nest Cam vs Arlo: Premium Camera Battle</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">Two premium ecosystems go head-to-head. Nest Cam offers Google integration and on-device AI. Arlo offers wire-free flexibility and better video quality.</p>

      <AffiliateDisclosure />
      <AdUnit />

      <ComparisonTable
        title="Quick Comparison"
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
              <a
                href={`https://www.amazon.com/dp/${p.a}?tag=${AMAZON_TAG}`}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="block w-full text-center bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm py-3 px-4 rounded-lg transition shadow-sm hover:shadow-lg hover:shadow-yellow-400/20"
              >
                Buy on Amazon — {p.p} &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>

      <AdUnit />

      <section className="prose-dark max-w-none">
        <h2>Quick Verdict</h2>
        <p><strong>Arlo</strong> wins for video quality and wire-free flexibility. <strong>Nest Cam</strong> wins for Google Home users and on-device AI. Arlo offers 2K HDR resolution, longer battery life, and broader smart home compatibility. Nest provides superior AI processing, seamless Google integration, and a polished app experience.</p>

        <h2>Video Quality</h2>
        <p><strong>Arlo Pro 5S</strong> delivers 2K HDR with a 160° field of view and color night vision. The higher resolution enables clear digital zooming for identifying faces and details at distance.</p>
        <p><strong>Google Nest Cam</strong> offers 1080p HDR with excellent image processing. While lower resolution than Arlo, Google&apos;s computational photography expertise produces well-balanced, detailed footage. Night vision uses infrared for clear black-and-white images.</p>

        <h2>AI &amp; Smart Features</h2>
        <p><strong>Nest Cam</strong> leads with on-device AI processing. Familiar face detection identifies known individuals. Package detection, activity zones, and intelligent alerts all process locally — faster and more private than cloud-based alternatives.</p>
        <p><strong>Arlo</strong> offers person, vehicle, animal, and package detection via Arlo Secure subscription. Processing is cloud-based. Arlo also includes a built-in spotlight and siren for active deterrence.</p>

        <h2>Smart Home Integration</h2>
        <p><strong>Nest Cam</strong> is a native Google Home device. Seamless Chromecast support, Google Assistant voice commands, and deep integration with Nest Hub displays. Works with Google Home Routines.</p>
        <p><strong>Arlo</strong> supports Google Assistant for live view and basic commands. Also works with Alexa, Apple HomeKit (Pro series), and IFTTT. Broader compatibility but less depth with any single ecosystem.</p>

        <h2>Subscription Costs</h2>
        <p><strong>Google Nest Aware:</strong> $8/month for 30-day event history on one camera. $15/month for unlimited cameras with 60-day history and 24/7 recording.</p>
        <p><strong>Arlo Secure:</strong> $4.99/month per camera for 30-day history. $12.99/month for up to 5 cameras. $17.99/month for unlimited cameras with Emergency Response.</p>
        <p>Arlo is cheaper for 1-2 cameras. Nest Aware Plus offers better value for 3+ unlimited cameras.</p>

        <h2>Wire-Free &amp; Battery</h2>
        <p><strong>Arlo</strong> excels with truly wire-free cameras. The Pro 5S lasts up to 6 months on a single charge. Solar panel accessories extend battery life indefinitely.</p>
        <p><strong>Nest Cam</strong> indoor models are wired-only. The outdoor Nest Cam offers battery power but with shorter battery life than Arlo. Google&apos;s wire-free options are more limited.</p>

        <h2>Price Comparison</h2>
        <p><strong>Indoor:</strong> Nest Cam at $99.99 vs Arlo Essential Indoor at $49.99 (but Arlo is 2K). Nest wins on AI, Arlo on price and resolution.</p>
        <p><strong>Outdoor:</strong> Arlo Pro 5S at $199.99 (2K, wire-free) vs Nest Cam Outdoor at $179.99 (1080p, wired/battery). Arlo offers better specs for $20 more.</p>
        <p><strong>Doorbells:</strong> Nest Doorbell at $179.99 (24/7 recording) vs Arlo Essential Doorbell at $129.99 (1080p). Nest offers continuous recording; Arlo is cheaper.</p>

        <h2>FAQ</h2>
        <p><strong>Which is better for Google Home users?</strong> Nest Cam. Native integration, Chromecast support, and Google Assistant commands make it the natural choice for Google ecosystems.</p>
        <p><strong>Which has better video quality?</strong> Arlo. 2K HDR and wider field of view provide noticeably clearer footage, especially for zooming and identification.</p>
        <p><strong>Which is more private?</strong> Nest Cam processes AI on-device. Arlo offers local storage via SmartHub. Both are strong on privacy, but through different approaches.</p>
        <p><strong>Which is better for Apple users?</strong> Arlo. HomeKit support on Pro series cameras integrates with the Apple Home app and HomeKit Secure Video.</p>
      </section>

      <HomeSecurityCTA />
    </Layout>
  );
}
