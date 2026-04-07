import Layout from "../components/Layout";
import AdUnit from "../components/AdUnit";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

const PICKS = [
  { rank: 1, name: "Blink Mini 2", price: "$34.99", asin: "B0CGX9GQ3Q", why: "Tiny form factor, plugs into any outlet, and guests rarely notice it. Ideal for common areas." },
  { rank: 2, name: "Ring Indoor Cam (2nd Gen)", price: "$59.99", asin: "B09WZBPX7K", why: "Privacy cover that guests can see you respect. Easy to disclose — built-in privacy shutter." },
  { rank: 3, name: "Wyze Cam v4", price: "$35.98", asin: "B0CJ9YX7DG", why: "Best price-to-quality ratio. Covers front door and living area on a budget." },
];

export default function AirbnbPage() {
  return (
    <Layout
      title="Best Security Cameras for Airbnb Hosts (2025) — HiddenCameras.tv"
      description="The best outdoor and indoor cameras for Airbnb hosts. Legal placement guide, Airbnb disclosure rules, and the exact models we recommend."
      canonical="https://hiddencameras.tv/best-hidden-cameras-airbnb"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "Are hidden cameras allowed on Airbnb?", acceptedAnswer: { "@type": "Answer", text: "Airbnb prohibits cameras inside the property (bedrooms, bathrooms, living areas). Outdoor cameras covering entrances are allowed if fully disclosed in the listing." } },
              { "@type": "Question", name: "What cameras do Airbnb hosts use?", acceptedAnswer: { "@type": "Answer", text: "Most hosts use Blink Mini, Ring Indoor Cam, or Wyze Cam for disclosed indoor common areas and Ring Video Doorbell or Arlo Pro for outdoor use." } },
            ],
          }),
        }}
      />

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">AIRBNB HOST GUIDE</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Best Security Cameras for Airbnb Hosts</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">What&apos;s legal, what to disclose, and the exact cameras that protect your property without violating Airbnb&apos;s policies.</p>

      <AdUnit />

      {/* Legal section — high trust signal */}
      <section className="card border-yellow-500/30 mb-8">
        <h2 className="text-lg font-bold text-white mb-3">⚠️ Airbnb Camera Rules (2025)</h2>
        <ul className="text-gray-300 text-sm space-y-2">
          <li>✅ <strong>Allowed:</strong> Outdoor cameras covering entrances, driveways, and exterior areas — must be disclosed in listing</li>
          <li>✅ <strong>Allowed:</strong> Indoor cameras in common areas (living room, kitchen) — must be disclosed and visible</li>
          <li>❌ <strong>Banned:</strong> Any camera in bedrooms, bathrooms, or sleeping areas</li>
          <li>❌ <strong>Banned:</strong> Any camera not disclosed in the listing description</li>
        </ul>
      </section>

      {/* Top picks */}
      <h2 className="text-xl font-bold text-white mb-5">Our Top Picks for Airbnb Hosts</h2>
      <div className="space-y-4 mb-10">
        {PICKS.map((p) => (
          <div key={p.asin} className="card flex gap-4 items-start">
            <div className="text-3xl font-extrabold text-brand-green/30 leading-none pt-1">#{p.rank}</div>
            <div className="flex-1">
              <h3 className="font-bold text-white mb-1">{p.name}</h3>
              <p className="text-gray-400 text-sm mb-3">{p.why}</p>
              <a
                href={`https://www.amazon.com/dp/${p.asin}?tag=${AMAZON_TAG}`}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1.5 rounded hover:bg-yellow-300 transition"
              >
                {p.price} — Check on Amazon →
              </a>
            </div>
          </div>
        ))}
      </div>

      <AdUnit />

      <section className="prose-dark max-w-none">
        <h2>How to Disclose Cameras to Guests</h2>
        <p>Airbnb requires hosts to list every camera in the &quot;Safety devices&quot; section of the listing and describe their location in the listing description. Example language:</p>
        <p><em>&quot;This property has one security camera in the living room facing the front door for guest safety. No cameras are in bedrooms or bathrooms.&quot;</em></p>

        <h2>Where Can You Place Cameras?</h2>
        <p>The safest placements that guests accept: front door interior (facing the door only), above the TV facing the room exit, or mounted near the entryway. Avoid pointing cameras toward seating areas or couches.</p>

        <h2>Do Guests Care?</h2>
        <p>Studies show 73% of guests are fine with disclosed cameras in common areas. The complaints come from undisclosed cameras — which can result in permanent account suspension and legal liability.</p>
      </section>
    </Layout>
  );
}
