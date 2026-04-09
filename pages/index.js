import Layout from "../components/Layout";
import HeroCarousel from "../components/HeroCarousel";
import ArticleCard from "../components/ArticleCard";
import AdUnit from "../components/AdUnit";
import Link from "next/link";
import path from "path";
import fs from "fs";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

// ── Live cam grid (12 cameras with verified Unsplash images) ─────────────────
const LIVE_GRID = [
  { city: "New York", label: "Times Square", flag: "🇺🇸", slug: "new-york-city", img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80&auto=format&fit=crop", ytId: "kPnlOuCO3rA", featured: true },
  { city: "Tokyo", label: "Shibuya Crossing", flag: "🇯🇵", slug: "tokyo", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=75&auto=format&fit=crop" },
  { city: "London", label: "Big Ben", flag: "🇬🇧", slug: "london", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=75&auto=format&fit=crop" },
  { city: "Paris", label: "Eiffel Tower", flag: "🇫🇷", slug: "paris", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=75&auto=format&fit=crop" },
  { city: "Dubai", label: "Burj Khalifa", flag: "🇦🇪", slug: "dubai", img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=75&auto=format&fit=crop" },
  { city: "Sydney", label: "Opera House", flag: "🇦🇺", slug: "sydney", img: "https://images.unsplash.com/photo-1523428096881-5bd79d043006?w=600&q=75&auto=format&fit=crop" },
  { city: "Rome", label: "Colosseum", flag: "🇮🇹", slug: "rome", img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=75&auto=format&fit=crop" },
  { city: "Singapore", label: "Marina Bay", flag: "🇸🇬", slug: "singapore", img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=75&auto=format&fit=crop" },
  { city: "Amsterdam", label: "Canal District", flag: "🇳🇱", slug: null, img: "https://images.unsplash.com/photo-1534351590666-13e3e96b5702?w=600&q=75&auto=format&fit=crop" },
  { city: "Istanbul", label: "Hagia Sophia", flag: "🇹🇷", slug: null, img: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&q=75&auto=format&fit=crop" },
  { city: "Rio de Janeiro", label: "Christ the Redeemer", flag: "🇧🇷", slug: null, img: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=75&auto=format&fit=crop" },
  { city: "Bangkok", label: "City Center", flag: "🇹🇭", slug: null, img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=75&auto=format&fit=crop" },
];

// ── Camera picks ─────────────────────────────────────────────────────────────
const TOP_PICKS = [
  { name: "Blink Mini 2", tag: "EDITOR'S CHOICE", category: "Best Budget", price: "$34.99", rating: "4.4/5", asin: "B0CGX9GQ3Q", accent: "#1a73e8", pro: "No subscription needed" },
  { name: "Ring Indoor Cam 2nd Gen", tag: "BEST OVERALL", category: "Top Rated", price: "$59.99", rating: "4.5/5", asin: "B09WZBPX7K", accent: "#e87722", pro: "Color night vision" },
  { name: "Wyze Cam v4", tag: "BEST VALUE", category: "Great Value", price: "$35.98", rating: "4.4/5", asin: "B0CJ9YX7DG", accent: "#0078d7", pro: "14 days free cloud" },
  { name: "Arlo Pro 5S", tag: "BEST PREMIUM", category: "Premium Pick", price: "$199.99", rating: "4.3/5", asin: "B0B8QYZRSC", accent: "#7c3aed", pro: "4K HDR outdoor" },
  { name: "Google Nest Cam", tag: "SMART HOME", category: "Best AI", price: "$99.99", rating: "4.4/5", asin: "B09NYZGGJD", accent: "#4285f4", pro: "On-device AI detection" },
  { name: "Eufy S350", tag: "NO FEES", category: "No Subscription", price: "$79.99", rating: "4.5/5", asin: "B0C7VN19YS", accent: "#0d9488", pro: "Local storage, no monthly cost" },
];

// ── Security news ─────────────────────────────────────────────────────────────
const NEWS_ITEMS = [
  {
    badge: "BREAKING",
    badgeColor: "#ef4444",
    headline: "Airbnb Bans All Indoor Hidden Cameras Worldwide",
    summary: "Effective April 30, 2026, Airbnb prohibits hidden cameras in all rental properties including outdoors near private spaces. Hosts must disclose all cameras before guests book.",
    date: "Apr 2, 2026",
    icon: "🏠",
  },
  {
    badge: "PRODUCT",
    badgeColor: "#f59e0b",
    headline: "Ring Pro 4 Doorbell Gets AI Facial Recognition",
    summary: "Ring's flagship doorbell now uses on-device AI to identify faces without cloud processing, addressing major privacy concerns while improving response speed.",
    date: "Mar 28, 2026",
    icon: "🔔",
  },
  {
    badge: "PRIVACY",
    badgeColor: "#3b82f6",
    headline: "EU Surveillance Camera Act Now in Full Effect",
    summary: "New EU regulations require GDPR-compliant camera signage, data minimization, and a 30-day maximum footage retention period for all public surveillance systems.",
    date: "Mar 15, 2026",
    icon: "🇪🇺",
  },
  {
    badge: "SECURITY",
    badgeColor: "#10b981",
    headline: "Hidden Camera Detector Sales Up 340% in 2026",
    summary: "Consumer demand for hidden camera detectors has surged following a series of hotel and short-term rental incidents reported across the United States and Europe.",
    date: "Mar 10, 2026",
    icon: "🔍",
  },
  {
    badge: "TECH",
    badgeColor: "#8b5cf6",
    headline: "Wyze Cam v5 Leak: 4K, Local AI, No Subscription",
    summary: "Leaked specs for Wyze's next camera suggest 4K resolution, on-device person detection, and a commitment to keeping all core features free without a monthly plan.",
    date: "Mar 5, 2026",
    icon: "📷",
  },
  {
    badge: "POLICY",
    badgeColor: "#f97316",
    headline: "FTC Fines Spy Cam Seller $2.1M for Deceptive Practices",
    summary: "The FTC issued its largest hidden camera enforcement action, fining an online retailer that marketed covert recording devices as everyday household objects.",
    date: "Feb 28, 2026",
    icon: "⚖️",
  },
];

function LiveCamCard({ cam, featured }) {
  const href = cam.slug ? `/live/${cam.slug}/` : "/live/";
  if (featured) {
    return (
      <Link href={href}
        className="relative overflow-hidden rounded-xl border border-brand-border group col-span-2 row-span-2 block"
        style={{ minHeight: "260px" }}>
        <img src={cam.img} alt={`${cam.label} ${cam.city} live camera`}
          className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        {/* CCTV corners */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-brand-green/70" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-brand-green/70" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-brand-green/70" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-brand-green/70" />
        <div className="absolute top-3 left-3 z-10">
          <span className="flex items-center gap-1 bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
            <span className="live-dot w-1.5 h-1.5 rounded-full bg-white inline-block" />LIVE
          </span>
        </div>
        <div className="absolute top-3 right-3 z-10 text-xs font-mono text-brand-green/60">FEATURED</div>
        <div className="absolute bottom-4 left-4 z-10">
          <div className="text-3xl mb-1">{cam.flag}</div>
          <p className="text-white font-black text-xl leading-tight">{cam.city}</p>
          <p className="text-gray-300 text-sm">{cam.label}</p>
          <div className="mt-3 inline-flex items-center gap-1.5 bg-brand-green text-black text-xs font-bold px-3 py-1.5 rounded-lg">
            ▶ Watch Live
          </div>
        </div>
      </Link>
    );
  }
  return (
    <Link href={href}
      className="relative overflow-hidden rounded-xl border border-brand-border group block aspect-video sm:aspect-auto sm:h-32">
      <img src={cam.img} alt={`${cam.label} ${cam.city} live camera`}
        className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-brand-green/60" />
      <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-brand-green/60" />
      <div className="absolute top-2 right-2 z-10">
        <span className="flex items-center gap-0.5 bg-red-600 text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded-full">
          <span className="live-dot w-1 h-1 rounded-full bg-white inline-block" />LIVE
        </span>
      </div>
      <div className="absolute bottom-2 left-2 z-10">
        <p className="text-white text-xs font-bold leading-tight drop-shadow">{cam.city}</p>
        <p className="text-gray-300 text-[10px] drop-shadow">{cam.label}</p>
      </div>
      <div className="absolute bottom-2 right-2 z-10 text-base">{cam.flag}</div>
    </Link>
  );
}

function ProductCard({ cam }) {
  return (
    <a href={`https://www.amazon.com/dp/${cam.asin}?tag=${AMAZON_TAG}`}
      target="_blank" rel="nofollow sponsored noopener noreferrer"
      className="card group relative overflow-hidden hover:border-brand-green/40 transition-all flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-extrabold tracking-widest px-2 py-0.5 rounded text-black inline-block"
            style={{ background: cam.accent }}>{cam.tag}</span>
          <span className="text-[10px] text-brand-muted">{cam.category}</span>
        </div>
        <span className="text-yellow-400 text-xs font-bold">★ {cam.rating}</span>
      </div>
      <h3 className="font-bold text-white text-sm group-hover:text-brand-green transition mb-1 leading-snug">{cam.name}</h3>
      <p className="text-brand-muted text-xs mb-3 leading-relaxed">✓ {cam.pro}</p>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-brand-green font-black text-lg">{cam.price}</span>
        <span className="text-[10px] font-bold bg-yellow-400 text-black px-2.5 py-1 rounded-lg group-hover:bg-yellow-300 transition">Amazon →</span>
      </div>
    </a>
  );
}

function NewsCard({ item }) {
  return (
    <Link href="/news" className="card hover:border-brand-borderHover transition-all block group">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{item.icon}</span>
        <span className="text-[10px] font-extrabold tracking-widest px-2 py-0.5 rounded text-white"
          style={{ background: item.badgeColor }}>{item.badge}</span>
        <span className="text-brand-muted text-[10px] ml-auto">{item.date}</span>
      </div>
      <h3 className="font-bold text-white text-sm leading-snug mb-2 group-hover:text-brand-green transition-colors">{item.headline}</h3>
      <p className="text-brand-muted text-xs leading-relaxed line-clamp-3">{item.summary}</p>
    </Link>
  );
}

function SectionHead({ title, sub, href, linkText }) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">{title}</h2>
        {sub && <p className="text-brand-muted text-xs mt-0.5">{sub}</p>}
      </div>
      {href && (
        <Link href={href} className="text-brand-green text-xs font-semibold hover:underline shrink-0 ml-4">{linkText || "View all →"}</Link>
      )}
    </div>
  );
}

export default function Home({ articles }) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "HiddenCameras.tv",
    url: "https://hiddencameras.tv",
    description: "Expert reviews, buying guides, and live camera feeds for security cameras, hidden cameras, and surveillance equipment.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://hiddencameras.tv/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top Camera Picks 2026",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: TOP_PICKS.length,
    itemListElement: TOP_PICKS.map((cam, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: cam.name,
        description: cam.pro,
        url: `https://www.amazon.com/dp/${cam.asin}?tag=${AMAZON_TAG}`,
        offers: {
          "@type": "Offer",
          price: cam.price.replace("$", ""),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">

        {/* ── Hero Carousel ── */}
        <section className="mb-4 sm:mb-6">
          <HeroCarousel />
        </section>

        {/* ── Stats ── */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
          {[
            { n: "500+", label: "Live Cameras" },
            { n: "80+", label: "Countries" },
            { n: "300+", label: "Cameras Reviewed" },
            { n: "24/7", label: "Streaming Live" },
          ].map(s => (
            <div key={s.label} className="card text-center py-3 px-2">
              <div className="text-xl sm:text-2xl font-extrabold text-brand-green">{s.n}</div>
              <div className="text-gray-500 text-[10px] sm:text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </section>

        {/* ── LIVE NOW — Bento grid ── */}
        <section className="mb-8 sm:mb-10">
          <SectionHead
            title="🔴 Live Now — World Cameras"
            sub="Public live streams updated 24/7"
            href="/live"
            linkText="All 500+ cameras →"
          />
          {/* Bento: featured (col-span-2 row-span-2) + 10 small */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3"
            style={{ gridAutoRows: "130px" }}>
            {LIVE_GRID.slice(0, 1).map(cam => (
              <LiveCamCard key={cam.city} cam={cam} featured />
            ))}
            {LIVE_GRID.slice(1).map(cam => (
              <LiveCamCard key={cam.city} cam={cam} />
            ))}
          </div>
          <div className="mt-3 text-center">
            <Link href="/live" className="btn-outline text-sm px-6 py-2.5">
              Explore All 500+ Cameras →
            </Link>
          </div>
        </section>

        {/* ── Top Camera Picks ── */}
        <section className="mb-8 sm:mb-10">
          <SectionHead
            title="Top Camera Picks 2026"
            sub="Independent reviews — updated monthly"
            href="/reviews"
            linkText="Full reviews →"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {TOP_PICKS.map(cam => <ProductCard key={cam.asin} cam={cam} />)}
          </div>
        </section>

        <AdUnit />

        {/* ── Security News ── */}
        <section className="mb-8 sm:mb-10">
          <SectionHead
            title="📡 Security & Surveillance News"
            sub="Latest in cameras, privacy law, and tech"
            href="/news"
            linkText="All news →"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {NEWS_ITEMS.map(item => <NewsCard key={item.headline} item={item} />)}
          </div>
        </section>

        {/* ── Latest Guides ── */}
        {articles.length > 0 && (
          <section className="mb-8 sm:mb-10">
            <SectionHead title="Latest Guides & Reviews" href="/blog" linkText="View all →" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {articles.slice(0, 3).map(a => <ArticleCard key={a.slug} article={a} />)}
            </div>
          </section>
        )}

        {/* ── Upload Feed CTA ── */}
        <section className="mb-8 sm:mb-10">
          <div className="relative overflow-hidden rounded-2xl border border-brand-green/30 bg-brand-surface">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/8 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative p-6 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">

              {/* Left: copy */}
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/20 rounded-full px-3 py-1 mb-4">
                  <span className="live-dot w-1.5 h-1.5 rounded-full bg-brand-green inline-block" />
                  <span className="text-brand-green text-xs font-bold tracking-wider">FREE — NO CREDIT CARD</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 leading-tight">
                  Have a Live Camera Feed?<br className="hidden sm:block" /> Share It With the World.
                </h2>
                <p className="text-gray-400 text-sm sm:text-base mb-5 max-w-md leading-relaxed">
                  Add your home security, baby monitor, nanny cam, or pet cam. Keep it private or publish it to our global live directory — your choice.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["🏠 Home Cam", "👶 Baby Monitor", "👀 Nanny Cam", "🐾 Pet Cam", "🏢 Business"].map(f => (
                    <span key={f} className="text-xs text-gray-300 bg-brand-bg border border-brand-border rounded-full px-3 py-1.5 font-medium">{f}</span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <Link href="/my-cams" className="btn-primary px-7 py-3">Upload Your Feed →</Link>
                  <Link href="/my-cams" className="text-sm text-gray-500 hover:text-white transition">Already have an account? Sign in →</Link>
                </div>
              </div>

              {/* Right: stats */}
              <div className="grid grid-cols-2 gap-3 w-full lg:w-auto shrink-0">
                {[
                  { n: "60+", label: "Countries" },
                  { n: "500+", label: "Live Feeds" },
                  { n: "24/7", label: "Always On" },
                  { n: "Free", label: "Forever" },
                ].map(s => (
                  <div key={s.label} className="bg-brand-bg border border-brand-border rounded-xl p-4 text-center lg:min-w-[110px]">
                    <div className="text-2xl font-black text-brand-green">{s.n}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ── Airbnb CTA ── */}
        <section className="relative overflow-hidden card border-brand-green/20 mb-6 sm:mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-green/5 to-transparent pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🏠</span>
                <span className="pill-green text-xs">AIRBNB HOSTS</span>
              </div>
              <h2 className="text-lg font-black text-white mb-1">Are Your Cameras Legal on Airbnb?</h2>
              <p className="text-brand-muted text-sm max-w-md">
                New 2026 rules ban ALL indoor cameras. Get the legal placement guide, required disclosures, and the exact models that pass inspection.
              </p>
            </div>
            <Link href="/best-hidden-cameras-airbnb" className="btn-primary shrink-0">Read the Guide →</Link>
          </div>
        </section>

      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const articlesDir = path.join(process.cwd(), "data", "articles");
  let articles = [];
  try {
    const files = fs.readdirSync(articlesDir).filter(f => f.endsWith(".json"));
    articles = files
      .map(f => JSON.parse(fs.readFileSync(path.join(articlesDir, f), "utf8")))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch {}
  return { props: { articles } };
}
