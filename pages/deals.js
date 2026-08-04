import Layout from "../components/Layout";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import AdUnit from "../components/AdUnit";
import EmailCapture from "../components/EmailCapture";
import { DEALS, NETWORKS } from "../lib/affiliateLinks";

function DealCard({ deal }) {
  const daysLeft = Math.max(0, Math.ceil((new Date(deal.expires) - new Date()) / 86400000));
  const urgency = daysLeft <= 7 ? "text-red-400" : daysLeft <= 14 ? "text-yellow-400" : "text-green-400";
  const networkInfo = NETWORKS[deal.network];

  return (
    <div className="hc-card p-6 flex flex-col group hover:border-brand-green/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{deal.brand === "Ring" ? "🔔" : deal.brand === "Arlo" ? "📡" : deal.brand === "Wyze" ? "👁" : deal.brand === "Reolink" ? "📷" : deal.brand === "Blink" ? "⚡" : deal.brand === "Eufy" ? "🛡" : "🔒"}</span>
          <span className="text-[10px] font-black tracking-widest px-2.5 py-1 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20">
            {deal.brand}
          </span>
        </div>
        <span className={`text-[10px] font-bold ${urgency}`}>
          {daysLeft > 0 ? `${daysLeft} days left` : "Expiring soon"}
        </span>
      </div>

      <h3 className="font-black text-white text-base leading-snug mb-3 group-hover:text-brand-green transition-colors">
        {deal.title}
      </h3>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-gray-500 text-sm line-through">{deal.originalPrice}</span>
        <span className="text-brand-green font-black text-xl">{deal.salePrice}</span>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/15 text-red-400">
          SAVE {deal.savings}
        </span>
      </div>

      {deal.code && (
        <div className="flex items-center gap-2 mb-4 p-2.5 rounded-lg bg-brand-bg border border-brand-border border-dashed">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Code:</span>
          <span className="text-white font-black text-sm tracking-wider">{deal.code}</span>
          <button
            onClick={() => navigator.clipboard?.writeText(deal.code)}
            className="ml-auto text-brand-green text-[10px] font-bold hover:underline"
          >
            Copy
          </button>
        </div>
      )}

      <div className="mt-auto">
        <a
          href={deal.url}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="block w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm py-3 px-4 rounded-xl text-center transition-all group-hover:shadow-lg group-hover:shadow-yellow-400/20"
        >
          {deal.code ? "Get This Deal →" : "Buy Now →"}
        </a>
        {networkInfo && (
          <p className="text-center text-[10px] text-gray-600 mt-2">
            via {networkInfo.name} · {networkInfo.commission} commission
          </p>
        )}
      </div>
    </div>
  );
}

export default function DealsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Security Camera Deals & Promo Codes 2026",
    description: "Latest deals, discounts, and promo codes for Ring, Arlo, Wyze, Reolink, and Blink security cameras. Updated daily.",
    url: "https://hiddencameras.tv/deals",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Where can I find the best security camera deals?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This page is updated daily with the latest deals from Amazon, Ring, Arlo, Wyze, Reolink, and other brands. We also have exclusive promo codes that aren't available elsewhere.",
        },
      },
      {
        "@type": "Question",
        name: "Do security cameras go on sale often?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Security cameras typically see their biggest discounts during Amazon Prime Day (July), Black Friday (November), and holiday sales. However, brands like Wyze and Reolink offer competitive pricing year-round, and we track all price drops.",
        },
      },
      {
        "@type": "Question",
        name: "Are promo codes for security cameras legit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All promo codes on this page are verified by our team. We only list codes from official brand websites, authorized retailers, or affiliate networks like CJ and Impact. Expired codes are removed within 24 hours.",
        },
      },
    ],
  };

  return (
    <Layout
      title="Security Camera Deals & Promo Codes 2026 — HiddenCameras.tv"
      description="Latest deals, discounts, and promo codes for Ring, Arlo, Wyze, Reolink, and Blink security cameras. Updated daily with verified codes."
      canonical="https://hiddencameras.tv/deals"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="hc-alert hc-alert-new">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green inline-block" />
              UPDATED DAILY
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            Security Camera Deals & Promo Codes
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            We track every price drop, promo code, and bundle deal across Ring, Arlo, Wyze, Reolink, Blink, and Eufy. Updated daily — never miss a sale.
          </p>
        </div>

        <AffiliateDisclosure />

        <AdUnit />

        {/* Active Deals Grid */}
        <section className="mb-14">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.22em] text-brand-green mb-1">Live Now</p>
              <h2 className="text-2xl font-black text-white">Active Deals</h2>
            </div>
            <span className="text-sm text-gray-500">{DEALS.length} deals</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {DEALS.map((deal, i) => (
              <DealCard key={deal.title} deal={deal} />
            ))}
          </div>
        </section>

        <div className="hc-divider" />

        {/* Brand Quick Links */}
        <section className="mb-14">
          <h2 className="text-2xl font-black text-white mb-6">Shop by Brand</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { brand: "Ring", icon: "🔔", color: "#1a73e8" },
              { brand: "Arlo", icon: "📡", color: "#7c3aed" },
              { brand: "Wyze", icon: "👁", color: "#0d9488" },
              { brand: "Blink", icon: "⚡", color: "#d97706" },
              { brand: "Reolink", icon: "📷", color: "#dc2626" },
              { brand: "Eufy", icon: "🛡", color: "#16a34a" },
            ].map((b) => (
              <a
                key={b.brand}
                href={`#${b.brand.toLowerCase()}`}
                className="hc-card p-4 flex items-center gap-3 group hover:border-brand-green/30 transition-all"
              >
                <span className="text-2xl">{b.icon}</span>
                <span className="font-black text-white text-sm group-hover:text-brand-green transition-colors">{b.brand}</span>
              </a>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="text-2xl font-black text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((q, i) => (
              <div key={i} className="hc-card p-6">
                <h3 className="font-bold text-white text-base mb-2">{q.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{q.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        <EmailCapture />

        <section className="mt-14">
          <div className="hc-card p-8 text-center">
            <h2 className="text-2xl font-black text-white mb-3">Want Instant Deal Alerts?</h2>
            <p className="text-gray-400 mb-5 max-w-md mx-auto">
              Get notified the moment a new security camera deal goes live. No spam — just the best prices, straight to your inbox.
            </p>
            <EmailCapture />
          </div>
        </section>
      </div>
    </Layout>
  );
}
