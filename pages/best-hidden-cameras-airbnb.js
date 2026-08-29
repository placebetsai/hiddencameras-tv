import Layout from "../components/Layout";
import HomeSecurityCTA from "../components/HomeSecurityCTA";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import AdUnit from "../components/AdUnit";
import { EditorPickGrid } from "../components/EditorPickCard";
import { ROUNDUPS } from "../lib/fashionistasProducts";

const PICKS = ROUNDUPS["best-hidden-cameras-airbnb"];

export default function AirbnbPage() {
  return (
    <Layout
      title="Best Security Cameras for Airbnb Hosts (2026) — HiddenCameras.tv"
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
              { "@type": "Question", name: "What cameras do Airbnb hosts use?", acceptedAnswer: { "@type": "Answer", text: "Most hosts use Blink Mini, Ring Indoor Cam, or <a href="https://www.amazon.com/dp/B0BJLXMVMV?tag=YOUR_AMAZON_TAG-20" target="_blank" rel="noopener sponsored">Wyze</a> for disclosed indoor common areas and Ring Video Doorbell or <a href="https://www.amazon.com/dp/B0B8GVC8QH?tag=YOUR_AMAZON_TAG-20" target="_blank" rel="noopener sponsored">Arlo</a> for outdoor use." } },
            ],
          }),
        }}
      />

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">AIRBNB HOST GUIDE</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Best Security Cameras for Airbnb Hosts</h1>
      <p className="text-gray-400 mb-8 max-w-2xl">What&apos;s legal, what to disclose, and the exact cameras that protect your property without violating Airbnb&apos;s policies.</p>

      <AffiliateDisclosure />

      <AdUnit />

      {/* Legal section — high trust signal */}
      <section className="card border-yellow-500/30 mb-8">
        <h2 className="text-lg font-bold text-white mb-3">⚠️ Airbnb Camera Rules (2026)</h2>
        <ul className="text-gray-300 text-sm space-y-2">
          <li>✅ <strong>Allowed:</strong> Outdoor cameras covering entrances, driveways, and exterior areas — must be disclosed in listing</li>
          <li>✅ <strong>Allowed:</strong> Indoor cameras in common areas (living room, kitchen) — must be disclosed and visible</li>
          <li>❌ <strong>Banned:</strong> Any camera in bedrooms, bathrooms, or sleeping areas</li>
          <li>❌ <strong>Banned:</strong> Any camera not disclosed in the listing description</li>
        </ul>
      </section>

      {/* Top picks */}
      <h2 className="text-xl font-bold text-white mb-5">Our Editor Picks</h2>
      <EditorPickGrid picks={PICKS} />

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

      <HomeSecurityCTA />
    </Layout>
  );
}
