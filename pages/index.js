import Layout from "../components/Layout";
import ArticleCard from "../components/ArticleCard";
import AdUnit from "../components/AdUnit";
import Link from "next/link";
import path from "path";
import fs from "fs";

// ── Live cam grid ─────────────────────────────────────────────────────────────
const LIVE_GRID = [
  { city: "New York", label: "Times Square", flag: "🇺🇸", slug: "new-york-city", img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80&auto=format&fit=crop", featured: true },
  { city: "Tokyo", label: "Shibuya Crossing", flag: "🇯🇵", slug: "tokyo", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=75&auto=format&fit=crop" },
  { city: "London", label: "Big Ben", flag: "🇬🇧", slug: "london", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=75&auto=format&fit=crop" },
  { city: "Paris", label: "Eiffel Tower", flag: "🇫🇷", slug: "paris", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=75&auto=format&fit=crop" },
  { city: "Dubai", label: "Burj Khalifa", flag: "🇦🇪", slug: "dubai", img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=75&auto=format&fit=crop" },
  { city: "Sydney", label: "Opera House", flag: "🇦🇺", slug: "sydney", img: "https://images.unsplash.com/photo-1523428096881-5bd79d043006?w=600&q=75&auto=format&fit=crop" },
  { city: "Rome", label: "Colosseum", flag: "🇮🇹", slug: "rome", img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=75&auto=format&fit=crop" },
  { city: "Singapore", label: "Marina Bay", flag: "🇸🇬", slug: "singapore", img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=75&auto=format&fit=crop" },
  { city: "Amsterdam", label: "Canal District", flag: "🇳🇱", slug: null, img: "https://images.unsplash.com/photo-1534351590666-13e3e96b5702?w=600&q=75&auto=format&fit=crop" },
  { city: "Istanbul", label: "Hagia Sophia", flag: "🇹🇷", slug: null, img: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&q=75&auto=format&fit=crop" },
  { city: "Rio", label: "Christ the Redeemer", flag: "🇧🇷", slug: null, img: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=75&auto=format&fit=crop" },
  { city: "Bangkok", label: "City Center", flag: "🇹🇭", slug: null, img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=75&auto=format&fit=crop" },
];

// ── Camera brand logos ────────────────────────────────────────────────────────
const BRANDS = [
  { name: "Ring", icon: "🔔", color: "#1a73e8", desc: "Smart doorbells & security" },
  { name: "Arlo", icon: "📡", color: "#7c3aed", desc: "Wire-free cameras" },
  { name: "Wyze", icon: "👁", color: "#0d9488", desc: "Budget-friendly smart cams" },
  { name: "Blink", icon: "⚡", color: "#d97706", desc: "Amazon-powered security" },
  { name: "Nest", icon: "🏠", color: "#4285f4", desc: "Google smart home cams" },
  { name: "Eufy", icon: "🛡", color: "#16a34a", desc: "Local storage, no fees" },
  { name: "Reolink", icon: "📷", color: "#dc2626", desc: "Professional NVR systems" },
  { name: "Hikvision", icon: "🎥", color: "#9333ea", desc: "Enterprise surveillance" },
];

// ── Top picks ─────────────────────────────────────────────────────────────────
const AMAZON_TAG = "hiddencamerastv-20";

const TOP_PICKS = [
  { name: "Smart Wireless Video Doorbell", tag: "EDITOR'S PICK", category: "Best Doorbell", price: "$59.99", rating: "4.5", asin: "B0B8QYZRSC", accent: "#1a73e8", pro: "Night vision, wireless chime included", icon: "🔔" },
  { name: "Amcrest 1080p Nanny Cam", tag: "BEST OVERALL", category: "Top Rated", price: "$69.99", rating: "4.5", asin: "B0C7VN19YS", accent: "#e87722", pro: "Two-way audio, baby & pet monitor", icon: "👶" },
  { name: "Dice-Style Covert Nanny Cam", tag: "BEST HIDDEN", category: "Covert Pick", price: "$44.99", rating: "4.4", asin: "B01A7MACL2", accent: "#0078d7", pro: "Disguised design, 1080p, no subscription", icon: "🎲" },
  { name: "1080p Dashcam with CarPlay", tag: "BEST DASHCAM", category: "Dash Pick", price: "$64.99", rating: "4.3", asin: "B0CGX9GQ3Q", accent: "#7c3aed", pro: "CarPlay, G-sensor, loop recording", icon: "🚗" },
  { name: "Mini Palm-Size WiFi Nanny Cam", tag: "SMALLEST", category: "Portable", price: "$34.99", rating: "4.4", asin: "B0CJ9YX7DG", accent: "#4285f4", pro: "Palm-size, WiFi, two-way audio", icon: "📦" },
  { name: "Smart WiFi Doorbell M7", tag: "BEST VALUE", category: "Budget Pick", price: "$44.99", rating: "4.5", asin: "B09NYZGGJD", accent: "#0d9488", pro: "Remote monitoring, instant alerts", icon: "🔐" },
];

// ── News ─────────────────────────────────────────────────────────────────────
const NEWS_ITEMS = [
  { badge: "BREAKING", badgeColor: "#ef4444", headline: "Airbnb Bans All Indoor Hidden Cameras Worldwide", summary: "Effective April 30, 2026, Airbnb prohibits all hidden cameras in rental properties. Hosts must disclose every camera before guests book.", date: "Apr 2, 2026", icon: "🏠" },
  { badge: "PRODUCT", badgeColor: "#f59e0b", headline: "Ring Pro 4 Gets AI Facial Recognition On-Device", summary: "Ring's flagship doorbell now uses on-device AI to identify faces without cloud processing, addressing major privacy concerns.", date: "Mar 28, 2026", icon: "🔔" },
  { badge: "PRIVACY", badgeColor: "#8b5cf6", headline: "EU Surveillance Camera Act Now in Full Effect", summary: "New EU regulations require GDPR-compliant camera signage and a 30-day maximum footage retention period for all public systems.", date: "Mar 15, 2026", icon: "🇪🇺" },
  { badge: "SECURITY", badgeColor: "#10b981", headline: "Hidden Camera Detector Sales Up 340% in 2026", summary: "Consumer demand surged following a series of hotel and short-term rental incidents reported across the US and Europe.", date: "Mar 10, 2026", icon: "🔍" },
  { badge: "TECH", badgeColor: "#6366f1", headline: "Wyze Cam v5 Leak: 4K, Local AI, No Subscription", summary: "Leaked specs suggest 4K resolution, on-device person detection, and a commitment to keeping all core features permanently free.", date: "Mar 5, 2026", icon: "📷" },
  { badge: "POLICY", badgeColor: "#f97316", headline: "FTC Fines Spy Cam Seller $2.1M for Deception", summary: "The FTC issued its largest hidden camera enforcement action against a retailer that marketed covert devices as household objects.", date: "Feb 28, 2026", icon: "⚖️" },
];

// ── Category guide cards ──────────────────────────────────────────────────────
const CATEGORIES = [
  { href: "/nanny-cam", label: "Nanny Cams", icon: "👶", desc: "Keep your family safe" },
  { href: "/doorbell-cameras", label: "Doorbell Cams", icon: "🔔", desc: "See who's at your door" },
  { href: "/outdoor-security-cameras", label: "Outdoor Security", icon: "🌿", desc: "Perimeter protection" },
  { href: "/spy-cameras", label: "Spy Cameras", icon: "🕵️", desc: "Covert monitoring" },
  { href: "/hidden-camera-detectors", label: "Detectors", icon: "🔍", desc: "Find hidden cameras" },
  { href: "/pet-cameras", label: "Pet Cams", icon: "🐾", desc: "Watch your pets" },
  { href: "/car-cameras", label: "Dash Cams", icon: "🚗", desc: "Drive with evidence" },
  { href: "/body-cameras", label: "Body Cameras", icon: "👮", desc: "Personal accountability" },
];

function LiveCamCard({ cam, featured }) {
  const href = cam.slug ? `/live/${cam.slug}/` : "/live/";
  if (featured) {
    return (
      <Link href={href} className="relative overflow-hidden rounded-2xl border border-brand-border hc-card hc-corners col-span-2 row-span-2 block" style={{ minHeight: "260px" }}>
        <img src={cam.img} alt={`${cam.label} ${cam.city} live camera`}
          className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />
        {/* Scanlines */}
        <div className="absolute inset-0 hc-hero-scanlines opacity-30 pointer-events-none" />
        {/* CCTV corners */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-brand-green/80" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-brand-green/80" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-brand-green/80" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-brand-green/80" />
        {/* LIVE badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <span className="hc-alert hc-alert-live text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />LIVE
          </span>
          <span className="text-[10px] font-mono text-brand-green/60 tracking-widest">CAM-001</span>
        </div>
        {/* Signal bars top right */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <div className="hc-signal-bars">
            <span /><span /><span /><span />
          </div>
          <span className="text-[9px] font-mono text-brand-green/70 tracking-widest">HD</span>
        </div>
        <div className="absolute bottom-5 left-5 z-10">
          <div className="text-4xl mb-2">{cam.flag}</div>
          <p className="text-white font-black text-2xl leading-tight tracking-tight">{cam.city}</p>
          <p className="text-gray-300 text-sm">{cam.label}</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-brand-green text-black text-xs font-black px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors">
            ▶ Watch Live
          </div>
        </div>
      </Link>
    );
  }
  return (
    <Link href={href} className="relative overflow-hidden rounded-xl border border-brand-border hc-card block aspect-video sm:aspect-auto sm:h-32 group">
      <img src={cam.img} alt={`${cam.label} ${cam.city}`}
        className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-brand-green/60" />
      <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-brand-green/60" />
      <div className="absolute top-2 right-2 z-10">
        <span className="flex items-center gap-0.5 bg-red-600 text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded-full">
          <span className="w-1 h-1 rounded-full bg-white inline-block" />LIVE
        </span>
      </div>
      <div className="absolute bottom-2 left-2 z-10">
        <p className="text-white text-xs font-bold leading-tight drop-shadow">{cam.city}</p>
        <p className="text-gray-300 text-[10px] drop-shadow">{cam.label}</p>
      </div>
      <div className="absolute bottom-2 right-2 z-10 text-sm">{cam.flag}</div>
    </Link>
  );
}

function ProductCard({ cam }) {
  const href = `https://www.amazon.com/dp/${cam.asin}?tag=${AMAZON_TAG}`;
  return (
    <a href={href}
      target="_blank" rel="nofollow sponsored noopener noreferrer"
      className="hc-card p-5 flex flex-col group">
      {/* Icon + tag */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col gap-1.5">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: cam.accent + "22", border: `1px solid ${cam.accent}44` }}>
            {cam.icon}
          </div>
          <span className="text-[10px] font-extrabold tracking-widest px-2.5 py-1 rounded-full text-black inline-block"
            style={{ background: cam.accent }}>{cam.tag}</span>
        </div>
        <div className="text-right">
          <div className="text-yellow-400 text-xs font-black">{"★".repeat(Math.floor(parseFloat(cam.rating)))}</div>
          <div className="text-gray-500 text-[10px]">{cam.rating}/5</div>
        </div>
      </div>
      <p className="text-[10px] font-bold tracking-[.14em] uppercase text-gray-500 mb-1">{cam.category}</p>
      <h3 className="font-black text-white text-base leading-snug mb-2 group-hover:text-brand-green transition-colors">{cam.name}</h3>
      <p className="text-gray-400 text-xs mb-4 leading-relaxed flex items-start gap-1.5">
        <span className="text-brand-green mt-0.5 flex-shrink-0">✓</span> {cam.pro}
      </p>
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-brand-green font-black text-2xl">{cam.price}</span>
          <span className="text-[10px] text-gray-600 font-mono">Free shipping</span>
        </div>
        <div className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm py-3 px-4 rounded-xl text-center transition-all group-hover:shadow-lg group-hover:shadow-yellow-400/20 group-hover:-translate-y-0.5">
          Buy on Amazon →
        </div>
      </div>
    </a>
  );
}

function NewsCard({ item }) {
  return (
    <Link href="/news" className="hc-card p-5 block group">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{item.icon}</span>
        <span className="text-[10px] font-extrabold tracking-widest px-2.5 py-0.5 rounded-full text-white"
          style={{ background: item.badgeColor }}>{item.badge}</span>
        <span className="text-gray-600 text-[10px] ml-auto font-mono">{item.date}</span>
      </div>
      <h3 className="font-black text-white text-sm leading-snug mb-2 group-hover:text-brand-green transition-colors">{item.headline}</h3>
      <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">{item.summary}</p>
      <div className="mt-3 text-[10px] font-bold text-brand-green opacity-0 group-hover:opacity-100 transition-opacity">Read more →</div>
    </Link>
  );
}

export default function Home({ articles }) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "HiddenCameras.tv",
    url: "https://hiddencameras.tv",
    description: "Expert reviews, live feeds, and buying guides for security cameras, hidden cameras, and surveillance equipment.",
    potentialAction: { "@type": "SearchAction", target: "https://hiddencameras.tv/blog?q={search_term_string}", "query-input": "required name=search_term_string" },
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />

      {/* ANIMATED SITE BACKGROUND */}
      <div className="hc-site-bg" aria-hidden="true">
        <div className="hc-site-orb-1" />
        <div className="hc-site-orb-2" />
        <div className="hc-site-grid" />
      </div>

      {/* ===== HERO ===== */}
      <section className="hc-hero relative min-h-[90vh] flex flex-col justify-center"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1600&q=80&auto=format&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}>
        <div className="hc-hero-overlay" />
        <div className="hc-hero-scanlines" />
        <div className="hc-hero-grid" />

        {/* CCTV frame on full hero */}
        <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-brand-green/60 z-10" />
        <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-brand-green/60 z-10" />
        <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-brand-green/60 z-10" />
        <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-brand-green/60 z-10" />

        {/* Status bar top */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4 font-mono text-[10px] text-brand-green/60 tracking-widest">
          <span>CAM-SYSTEM</span>
          <span className="w-1 h-1 rounded-full bg-brand-green/40" />
          <span>HIDDENCAMERAS.TV</span>
          <span className="w-1 h-1 rounded-full bg-brand-green/40" />
          <span>2026</span>
        </div>

        <div className="hc-hero-content max-w-6xl mx-auto px-6 py-24 md:py-32">
          {/* Live badge + signal */}
          <div className="flex items-center gap-4 mb-6">
            <span className="hc-alert hc-alert-live">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
              LIVE MONITORING
            </span>
            <div className="hc-signal-bars">
              <span /><span /><span /><span />
            </div>
            <span className="text-brand-green/60 font-mono text-[10px] tracking-widest">60+ STREAMS ACTIVE</span>
          </div>

          {/* H1 */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6 max-w-4xl">
            <span className="hc-gradient-text">The World&apos;s</span>
            <br />Hidden Camera &
            <br /><span className="hc-amber-text">Surveillance Hub</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            60+ live public cameras streaming 24/7. Expert reviews of Ring, Arlo, Wyze, Blink & Nest.
            Find, detect, and protect — all in one place.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <Link href="/live"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-base tracking-wide transition-all shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:shadow-[0_0_50px_rgba(239,68,68,0.6)] hover:-translate-y-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              Watch Live Cameras
            </Link>
            <Link href="/best-hidden-cameras-2026"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-brand-green/40 text-brand-green font-black text-base hover:bg-brand-green/10 hover:border-brand-green transition-all">
              Best Cameras 2026 →
            </Link>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
            {[
              { n: "60+", label: "Live Cameras" },
              { n: "30+", label: "Countries" },
              { n: "300+", label: "Reviews" },
              { n: "24/7", label: "Streaming" },
            ].map((s, i) => (
              <div key={s.label} className="hc-stat hc-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="hc-stat-value">{s.n}</div>
                <div className="hc-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUSTED BRANDS ===== */}
      <section className="relative py-10 border-y border-brand-border overflow-hidden" style={{ background: "rgba(11,18,32,.95)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-[10px] font-black uppercase tracking-[.28em] text-gray-600 mb-6">
            Expert reviews covering all major brands
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {BRANDS.map((brand) => (
              <div key={brand.name} className="hc-brand-pill">
                <span className="text-xl">{brand.icon}</span>
                <span style={{ color: brand.color }} className="font-black">{brand.name}</span>
                <span className="text-gray-600 hidden md:inline">— {brand.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">

        {/* ===== CATEGORY QUICK-FINDER ===== */}
        <section className="mb-14">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.22em] text-brand-green mb-1">Browse by Type</p>
              <h2 className="text-2xl md:text-3xl font-black text-white">Find Your Camera</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CATEGORIES.map((cat, i) => (
              <Link key={cat.href} href={cat.href}
                className="hc-card p-5 flex items-center gap-4 group hc-fade-up"
                style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <div>
                  <p className="font-black text-white text-sm group-hover:text-brand-green transition-colors">{cat.label}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== LIVE NOW SECTION ===== */}
        <section className="mb-14">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="hc-alert hc-alert-live">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />LIVE NOW
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white">World Live Cameras</h2>
              <p className="text-gray-500 text-sm mt-1">Public live streams updated 24/7 — no login required</p>
            </div>
            <Link href="/live" className="text-brand-green text-sm font-bold hover:underline whitespace-nowrap">All 60+ cameras →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3" style={{ gridAutoRows: "130px" }}>
            {LIVE_GRID.slice(0, 1).map(cam => <LiveCamCard key={cam.city} cam={cam} featured />)}
            {LIVE_GRID.slice(1).map(cam => <LiveCamCard key={cam.city} cam={cam} />)}
          </div>
          <div className="mt-5 text-center">
            <Link href="/live" className="btn-outline text-sm px-8 py-3">
              Explore All Cameras — 30+ Countries →
            </Link>
          </div>
        </section>

        <div className="hc-divider" />

        {/* ===== TOP CAMERA PICKS ===== */}
        <section className="mb-14">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.22em] text-brand-green mb-1">Independent Reviews</p>
              <h2 className="text-2xl md:text-3xl font-black text-white">Top Camera Picks 2026</h2>
              <p className="text-gray-500 text-sm mt-1">Tested and ranked by our editorial team — updated monthly</p>
            </div>
            <Link href="/reviews" className="text-brand-green text-sm font-bold hover:underline whitespace-nowrap">Full reviews →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOP_PICKS.map((cam, i) => (
              <div key={cam.handle} className="hc-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <ProductCard cam={cam} />
              </div>
            ))}
          </div>
        </section>

        <AdUnit />

        {/* ===== DETECTION GUIDE BANNER ===== */}
        <section className="mb-14">
          <div className="relative overflow-hidden rounded-2xl border border-red-500/20 hc-card p-0">
            {/* Scanline background */}
            <div className="absolute inset-0 hc-hero-scanlines opacity-10 pointer-events-none" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(239,68,68,.08) 0%, transparent 60%, rgba(0,232,122,.05) 100%)" }} />
            <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-3xl">🔍</div>
                  <span className="hc-alert hc-alert-live">NEW 2026 GUIDE</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Think You&apos;re Being Watched?</h2>
                <p className="text-gray-400 text-base leading-relaxed mb-5 max-w-lg">
                  Our step-by-step guide covers every method to detect hidden cameras in hotel rooms, Airbnbs, and rentals — using your phone, a detector, or just your eyes.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["📱 Smartphone method", "🔦 RF detector", "🏨 Hotel rooms", "🏠 Airbnb", "✅ Legal tips"].map(f => (
                    <span key={f} className="text-xs text-gray-300 bg-brand-bg border border-brand-border rounded-full px-3 py-1.5 font-medium">{f}</span>
                  ))}
                </div>
                <Link href="/detect-hidden-cameras" className="btn-primary px-8 py-3">Free Detection Guide →</Link>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0">
                {[
                  { icon: "📡", label: "RF Detection", desc: "Find wireless cameras" },
                  { icon: "💡", label: "Lens Reflection", desc: "Spot camera glass" },
                  { icon: "📱", label: "Network Scan", desc: "Check WiFi devices" },
                  { icon: "🌙", label: "IR Light Method", desc: "Night vision cameras" },
                ].map(m => (
                  <div key={m.label} className="bg-brand-bg border border-brand-border rounded-xl p-4 text-center">
                    <div className="text-2xl mb-1">{m.icon}</div>
                    <div className="text-xs font-black text-white">{m.label}</div>
                    <div className="text-[10px] text-gray-600 mt-0.5">{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== NEWS SECTION ===== */}
        <section className="mb-14">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.22em] text-brand-green mb-1">Breaking News</p>
              <h2 className="text-2xl md:text-3xl font-black text-white">📡 Security & Surveillance News</h2>
              <p className="text-gray-500 text-sm mt-1">Latest in cameras, privacy law, and tech</p>
            </div>
            <Link href="/news" className="text-brand-green text-sm font-bold hover:underline whitespace-nowrap">All news →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {NEWS_ITEMS.map((item, i) => (
              <div key={item.headline} className="hc-fade-up" style={{ animationDelay: `${i * 0.07}s` }}>
                <NewsCard item={item} />
              </div>
            ))}
          </div>
        </section>

        {/* ===== AIRBNB GUIDE ===== */}
        <section className="mb-14">
          <div className="hc-card p-7 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-brand-green/20">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center text-3xl flex-shrink-0">🏠</div>
              <div>
                <span className="hc-alert hc-alert-new text-[9px] mb-2 inline-flex">AIRBNB HOSTS 2026</span>
                <h2 className="text-xl font-black text-white mb-1">Are Your Cameras Legal on Airbnb?</h2>
                <p className="text-gray-400 text-sm max-w-md">
                  New 2026 rules ban ALL indoor cameras. Get the legal placement guide, required disclosures, and the exact models that pass inspection.
                </p>
              </div>
            </div>
            <Link href="/best-hidden-cameras-airbnb" className="btn-primary shrink-0 px-7 py-3 whitespace-nowrap">
              Read the Guide →
            </Link>
          </div>
        </section>

        {/* ===== DEALS SECTION ===== */}
        <section className="mb-14">
          <div className="relative overflow-hidden rounded-2xl border border-yellow-500/20 hc-card p-0">
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(245,158,11,.06) 0%, transparent 60%, rgba(239,68,68,.04) 100%)" }} />
            <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center text-3xl">🏷</div>
                  <span className="hc-alert" style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 inline-block" />DEALS
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Today&apos;s Best Camera Deals</h2>
                <p className="text-gray-400 text-base leading-relaxed mb-5 max-w-lg">
                  We track every price drop across Ring, Arlo, Wyze, Reolink, and Blink. Updated daily — never pay full price.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Ring — $50 off", "Wyze — Lowest price", "Arlo — 20% off", "Reolink — Launch discount"].map(f => (
                    <span key={f} className="text-xs text-gray-300 bg-brand-bg border border-brand-border rounded-full px-3 py-1.5 font-medium">{f}</span>
                  ))}
                </div>
                <Link href="/deals" className="btn-primary px-8 py-3" style={{ background: "#f59e0b", color: "#000" }}>
                  View All Deals →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ===== COMPARE CAMERAS ===== */}
        <section className="mb-14">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.22em] text-brand-green mb-1">Head to Head</p>
              <h2 className="text-2xl md:text-3xl font-black text-white">Compare Cameras</h2>
              <p className="text-gray-500 text-sm mt-1">We tested every brand head-to-head for 3 weeks each</p>
            </div>
            <Link href="/compare" className="text-brand-green text-sm font-bold hover:underline whitespace-nowrap">All comparisons →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { href: "/compare/ring-vs-arlo", b1: "Ring", b2: "Arlo", icon1: "🔔", icon2: "📡", verdict: "Tie" },
              { href: "/compare/wyze-vs-blink", b1: "Wyze", b2: "Blink", icon1: "👁", icon2: "⚡", verdict: "Wyze wins" },
              { href: "/compare/wyze-vs-ring", b1: "Wyze", b2: "Ring", icon1: "👁", icon2: "🔔", verdict: "Wyze wins" },
              { href: "/compare/reolink-vs-ring", b1: "Reolink", b2: "Ring", icon1: "📷", icon2: "🔔", verdict: "Reolink wins" },
            ].map((item, i) => (
              <Link key={item.href} href={item.href}
                className="hc-card p-5 flex flex-col items-center text-center group hc-fade-up hover:border-brand-green/30 transition-all"
                style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{item.icon1}</span>
                  <span className="text-gray-600 font-black text-sm">VS</span>
                  <span className="text-3xl">{item.icon2}</span>
                </div>
                <p className="font-black text-white text-sm mb-1 group-hover:text-brand-green transition-colors">{item.b1} vs {item.b2}</p>
                <span className="text-[10px] font-bold text-brand-green px-2 py-0.5 rounded-full bg-brand-green/10">{item.verdict}</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="hc-divider" />

        {/* ===== BEST OF 2026 LINKS ===== */}
        <section className="mb-14">
          <div className="mb-6">
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-brand-green mb-1">Expert Buyer&apos;s Guides</p>
            <h2 className="text-2xl md:text-3xl font-black text-white">Best Of 2026</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { href: "/best-hidden-cameras-2026", label: "Best Hidden Cameras", icon: "🎭", badge: "#1 Ranked" },
              { href: "/best-nanny-cam-2026", label: "Best Nanny Cams", icon: "👶", badge: "For Families" },
              { href: "/best-doorbell-camera-2026", label: "Best Doorbell Camera", icon: "🔔", badge: "Smart Home" },
              { href: "/best-outdoor-security-camera-2026", label: "Best Outdoor Security", icon: "🌿", badge: "Weatherproof" },
              { href: "/best-hidden-camera-detector", label: "Best Camera Detector", icon: "🔍", badge: "Privacy Pick" },
              { href: "/best-pet-camera-2026", label: "Best Pet Camera", icon: "🐾", badge: "2-Way Audio" },
              { href: "/best-car-dash-cam-2026", label: "Best Dash Cam", icon: "🚗", badge: "Road Safety" },
              { href: "/best-hidden-cameras-airbnb", label: "Best Airbnb Camera", icon: "🏠", badge: "Legal Pick" },
            ].map((item, i) => (
              <Link key={item.href} href={item.href}
                className="hc-card p-4 flex items-center gap-3 group hc-fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}>
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-white text-sm leading-snug group-hover:text-brand-green transition-colors">{item.label}</p>
                  <p className="text-[10px] text-brand-green/70 font-bold mt-0.5">{item.badge}</p>
                </div>
                <span className="text-gray-600 group-hover:text-brand-green transition-colors text-xs">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== ARTICLE GUIDES ===== */}
        {articles.length > 0 && (
          <section className="mb-14">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[.22em] text-brand-green mb-1">Latest</p>
                <h2 className="text-2xl font-black text-white">Guides & Reviews</h2>
              </div>
              <Link href="/blog" className="text-brand-green text-sm font-bold hover:underline">View all →</Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {articles.slice(0, 3).map(a => <ArticleCard key={a.slug} article={a} />)}
            </div>
          </section>
        )}

        {/* ===== SUBMIT YOUR FEED CTA ===== */}
        <section className="mb-10">
          <div className="relative overflow-hidden rounded-2xl border border-brand-green/25 hc-card">
            <div className="absolute inset-0 hc-hero-scanlines opacity-10 pointer-events-none" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(245,158,11,.06) 0%, transparent 60%, rgba(0,232,122,.04) 100%)" }} />
            <div className="relative p-8 md:p-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/20 rounded-full px-3 py-1 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse inline-block" />
                  <span className="text-brand-green text-xs font-black tracking-wider">FREE · NO CREDIT CARD</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">
                  Have a Live Camera Feed?<br className="hidden sm:block" /> Share It With the World.
                </h2>
                <p className="text-gray-400 text-sm md:text-base mb-5 max-w-md leading-relaxed">
                  Add your security cam, baby monitor, nanny cam, or pet cam to our global live directory — keep it private or make it public. Your choice.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["🏠 Home Cam", "👶 Baby Monitor", "👀 Nanny Cam", "🐾 Pet Cam", "🏢 Business"].map(f => (
                    <span key={f} className="text-xs text-gray-300 bg-brand-bg border border-brand-border rounded-full px-3 py-1.5 font-medium">{f}</span>
                  ))}
                </div>
                <Link href="/my-cams" className="btn-primary px-7 py-3">Upload Your Feed →</Link>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full lg:w-auto shrink-0">
                {[{ n: "30+", l: "Countries" }, { n: "60+", l: "Live Feeds" }, { n: "24/7", l: "Always On" }, { n: "Free", l: "Forever" }].map(s => (
                  <div key={s.l} className="hc-stat">
                    <div className="hc-stat-value">{s.n}</div>
                    <div className="hc-stat-label">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
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
      .map((f) => {
        const article = JSON.parse(fs.readFileSync(path.join(articlesDir, f), "utf8"));
        const bodyText = String(article.body || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
        return {
          slug: article.slug,
          title: article.title,
          date: article.date,
          category: article.category || "Guide",
          excerpt: article.excerpt || bodyText.slice(0, 180),
          readTime: Math.max(1, Math.ceil(bodyText.split(" ").filter(Boolean).length / 200)),
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch {}
  return { props: { articles } };
}
