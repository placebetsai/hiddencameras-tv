import Layout from "../../components/Layout";
import AffiliateDisclosure from "../../components/AffiliateDisclosure";
import AdUnit from "../../components/AdUnit";
import EmailCapture from "../../components/EmailCapture";
import HomeSecurityCTA from "../../components/HomeSecurityCTA";
import { COMPARISONS, PRODUCTS, NETWORKS, getAllLinks } from "../../lib/affiliateLinks";
import { useRouter } from "next/router";

function ScoreBar({ label, score1, score2, max = 5 }) {
  const pct1 = (score1 / max) * 100;
  const pct2 = (score2 / max) * 100;
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400">{label}</span>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 h-2.5 bg-brand-bg rounded-full overflow-hidden">
          <div className="h-full bg-brand-green rounded-full" style={{ width: `${pct1}%` }} />
        </div>
        <div className="flex-1 h-2.5 bg-brand-bg rounded-full overflow-hidden">
          <div className="h-full bg-purple-500 rounded-full" style={{ width: `${pct2}%` }} />
        </div>
      </div>
      <div className="flex justify-between text-[10px] mt-1">
        <span className="text-brand-green font-bold">{score1}/5</span>
        <span className="text-purple-400 font-bold">{score2}/5</span>
      </div>
    </div>
  );
}

function ProductRow({ productKey, brand, rank }) {
  const product = PRODUCTS[productKey];
  if (!product) return null;
  const links = getAllLinks(product);
  const bestLink = links[0];

  return (
    <div className="hc-card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 group hover:border-brand-green/30 transition-all">
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-2xl font-black text-gray-600">#{rank}</span>
        <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover bg-brand-bg" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold tracking-widest text-brand-green uppercase">{brand}</p>
        <h4 className="font-black text-white text-sm group-hover:text-brand-green transition-colors">{product.name}</h4>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {product.features.slice(0, 4).map((f) => (
            <span key={f} className="text-[10px] text-gray-400 bg-brand-bg border border-brand-border rounded-full px-2 py-0.5">{f}</span>
          ))}
        </div>
      </div>
      <div className="shrink-0 text-right">
        <div className="text-yellow-400 text-xs font-black mb-1">{"★".repeat(Math.floor(product.ratings.overall))} {product.ratings.overall}</div>
        <div className="text-brand-green font-black text-lg">{bestLink?.price || product.msrp}</div>
        <div className="flex flex-col gap-1 mt-2">
          {links.slice(0, 2).map((link) => (
            <a
              key={link.network}
              href={link.url}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="text-[10px] font-bold px-3 py-1.5 rounded-lg bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all text-center"
            >
              Buy at {link.networkName} — {link.price}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ComparisonPage() {
  const router = useRouter();
  const { slug } = router.query;
  const key = Array.isArray(slug) ? slug.join("/") : slug;
  const comparison = COMPARISONS[key];

  if (!comparison) {
    return (
      <Layout title="Comparison Not Found — HiddenCameras.tv">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-black text-white mb-4">Comparison Not Found</h1>
          <p className="text-gray-400 mb-6">This comparison page doesn&apos;t exist yet. Check back soon!</p>
          <a href="/reviews" className="btn-primary px-6 py-3">Browse All Reviews →</a>
        </div>
      </Layout>
    );
  }

  const { title, description, brand1, brand2, verdict, winner, products, scores } = comparison;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    name: title,
    description,
    url: `https://hiddencameras.tv/${key}`,
    reviewBody: verdict,
    itemReviewed: {
      "@type": "Product",
      name: `${brand1} vs ${brand2}`,
    },
    author: { "@type": "Organization", name: "HiddenCameras.tv" },
    publisher: { "@type": "Organization", name: "HiddenCameras.tv" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Which is better, ${brand1} or ${brand2}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: verdict,
        },
      },
      {
        "@type": "Question",
        name: `Is ${brand1} cheaper than ${brand2}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${brand1} starts at lower prices for entry-level cameras, but ${brand2} offers better long-term value with local storage options that eliminate subscription fees.`,
        },
      },
    ],
  };

  return (
    <Layout
      title={title}
      description={description}
      canonical={`https://hiddencameras.tv/${key}`}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="hc-alert hc-alert-new">HEAD TO HEAD</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4">{title}</h1>
          <p className="text-gray-400 text-lg max-w-3xl">{description}</p>
        </div>

        <AffiliateDisclosure />

        <AdUnit />

        {/* Score Comparison */}
        <section className="mb-14">
          <div className="hc-card p-8">
            <h2 className="text-xl font-black text-white mb-6">Head-to-Head Scores</h2>
            <div className="grid grid-cols-[1fr_100px_1fr] gap-4 mb-6">
              <div className="text-center">
                <span className="text-2xl">{brand1 === "Ring" ? "🔔" : brand1 === "Arlo" ? "📡" : brand1 === "Wyze" ? "👁" : brand1 === "Blink" ? "⚡" : brand1 === "Google Nest" ? "🏠" : brand1 === "Reolink" ? "📷" : brand1 === "Eufy" ? "🛡" : "🔒"}</span>
                <p className="font-black text-white text-lg mt-2">{brand1}</p>
              </div>
              <div className="text-center flex items-center justify-center">
                <span className="text-gray-600 text-3xl font-black">VS</span>
              </div>
              <div className="text-center">
                <span className="text-2xl">{brand2 === "Ring" ? "🔔" : brand2 === "Arlo" ? "📡" : brand2 === "Wyze" ? "👁" : brand2 === "Blink" ? "⚡" : brand2 === "Google Nest" ? "🏠" : brand2 === "Reolink" ? "📷" : brand2 === "Eufy" ? "🛡" : "🔒"}</span>
                <p className="font-black text-white text-lg mt-2">{brand2}</p>
              </div>
            </div>

            {Object.keys(scores[brand1] || scores.ring).map((key) => (
              <ScoreBar
                key={key}
                label={key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                score1={scores[brand1]?.[key] || scores.ring?.[key] || 0}
                score2={scores[brand2]?.[key] || scores.arlo?.[key] || 0}
              />
            ))}

            <div className="mt-6 p-4 rounded-xl bg-brand-bg border border-brand-border text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-green mb-2">Our Verdict</p>
              <p className="text-white font-bold text-base">{verdict}</p>
            </div>
          </div>
        </section>

        <AdUnit />

        {/* Product Lineups */}
        <section className="mb-14">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Brand 1 Products */}
            <div>
              <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-brand-green inline-block" />
                {brand1} Lineup
              </h2>
              <div className="space-y-3">
                {(products[brand1] || []).map((pk, i) => (
                  <ProductRow key={pk} productKey={pk} brand={brand1} rank={i + 1} />
                ))}
              </div>
            </div>

            {/* Brand 2 Products */}
            <div>
              <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />
                {brand2} Lineup
              </h2>
              <div className="space-y-3">
                {(products[brand2] || []).map((pk, i) => (
                  <ProductRow key={pk} productKey={pk} brand={brand2} rank={i + 1} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Deep Dive Content */}
        <section className="mb-14 prose-dark max-w-none">
          <h2>Video Quality</h2>
          <p>
            {brand1} cameras consistently deliver {scores[brand1]?.video >= 4.5 ? "excellent" : scores[brand1]?.video >= 4.0 ? "strong" : "decent"} video quality,
            while {brand2} {scores[brand2]?.video >= 4.5 ? "leads with premium optics" : scores[brand2]?.video >= 4.0 ? "holds its own" : "focuses on affordability over resolution"}.
            For most homeowners, either brand provides more than enough detail to identify faces and license plates.
          </p>

          <h2>Subscription Costs</h2>
          <p>
            One of the biggest differences between these brands is ongoing cost. {brand1} {brand1 === "Wyze" || brand1 === "Eufy" || brand1 === "Reolink" ? "offers full functionality without a subscription" : "requires a subscription plan for cloud recording and advanced features"}.
            {brand2} {brand2 === "Wyze" || brand2 === "Eufy" || brand2 === "Reolink" ? "also offers no-subscription options with local storage" : "requires a paid plan for most features"}.
            Over 3 years, the subscription difference alone can exceed $300 — making no-fee cameras significantly cheaper in the long run.
          </p>

          <h2>Smart Home Integration</h2>
          <p>
            {brand1 === "Ring" || brand1 === "Blink" || brand1 === "Google Nest" ? `${brand1} wins here with deep integration into the ${brand1 === "Ring" || brand1 === "Blink" ? "Amazon Alexa" : "Google Home"} ecosystem.` :
            `${brand1} integrates well but doesn't match the ecosystem depth of ${brand2}.`}
            {brand2 === "Ring" || brand2 === "Blink" || brand2 === "Google Nest" ? ` ${brand2} shines with ${brand2 === "Ring" || brand2 === "Blink" ? "Amazon" : "Google"} ecosystem support.` :
            ` ${brand2} focuses more on its own app experience.`}
          </p>

          <h2>Privacy</h2>
          <p>
            Privacy is increasingly important for security camera buyers. {brand1} {brand1 === "Eufy" ? "excels with local-only storage and no cloud requirement" : brand1 === "Reolink" ? "offers NVR-based local storage with no cloud dependency" : "stores footage in the cloud with standard encryption"}.
            {brand2} {brand2 === "Eufy" ? "excels with local-only storage" : brand2 === "Reolink" ? "excels with NVR local storage" : "relies on cloud storage"}.
            If data privacy is your top priority, choose the brand that offers local storage without cloud dependency.
          </p>
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
        <HomeSecurityCTA />
      </div>
    </Layout>
  );
}
