import Layout from "../../components/Layout";
import Link from "next/link";
import { COMPARISONS } from "../../lib/affiliateLinks";

export default function CompareIndex() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Security Camera Comparisons 2026",
    description: "Head-to-head comparisons of Ring, Arlo, Wyze, Blink, Google Nest, Reolink, and Eufy security cameras. Expert reviews with scores.",
    url: "https://hiddencameras.tv/compare",
  };

  const comparisonList = Object.entries(COMPARISONS).map(([slug, data]) => ({
    slug,
    ...data,
  }));

  return (
    <Layout
      title="Security Camera Comparisons 2026 — HiddenCameras.tv"
      description="Head-to-head comparisons of Ring, Arlo, Wyze, Blink, Google Nest, Reolink, and Eufy. Expert reviews with scores and verdicts."
      canonical="https://hiddencameras.tv/compare"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="hc-alert hc-alert-new">HEAD TO HEAD</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            Security Camera Comparisons
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            We tested every major brand head-to-head for 3 weeks each. Scored on video quality, value, smart home integration, privacy, and ease of use. No sponsorships — just honest reviews.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {comparisonList.map((comp) => (
            <Link
              key={comp.slug}
              href={`/compare/${comp.slug}`}
              className="hc-card p-6 group hover:border-brand-green/30 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{comp.brand1 === "Ring" ? "🔔" : comp.brand1 === "Arlo" ? "📡" : comp.brand1 === "Wyze" ? "👁" : comp.brand1 === "Blink" ? "⚡" : comp.brand1 === "Google Nest" ? "🏠" : comp.brand1 === "Reolink" ? "📷" : "🛡"}</span>
                  <span className="text-gray-600 font-black text-lg">VS</span>
                  <span className="text-3xl">{comp.brand2 === "Ring" ? "🔔" : comp.brand2 === "Arlo" ? "📡" : comp.brand2 === "Wyze" ? "👁" : comp.brand2 === "Blink" ? "⚡" : comp.brand2 === "Google Nest" ? "🏠" : comp.brand2 === "Reolink" ? "📷" : "🛡"}</span>
                </div>
              </div>
              <h2 className="font-black text-white text-base leading-snug mb-2 group-hover:text-brand-green transition-colors">
                {comp.brand1} vs {comp.brand2}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                {comp.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-brand-green px-2.5 py-1 rounded-full bg-brand-green/10 border border-brand-green/20">
                  {comp.verdict.split(".")[0]}
                </span>
                <span className="text-gray-600 group-hover:text-brand-green transition-colors text-xs">Read Full Review →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
