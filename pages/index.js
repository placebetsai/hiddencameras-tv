import Layout from "../components/Layout";
import HeroCarousel from "../components/HeroCarousel";
import ArticleCard from "../components/ArticleCard";
import AdUnit from "../components/AdUnit";
import Link from "next/link";
import path from "path";
import fs from "fs";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

const TOP_PICKS = [
  { name: "Blink Mini 2", slug: "blink-mini-2", category: "Best Budget", price: "$34.99", rating: "4.4", asin: "B0CGX9GQ3Q", highlight: true, badge: "EDITOR'S CHOICE", brandColor: "#1a73e8" },
  { name: "Ring Indoor Cam (2nd Gen)", slug: "ring-indoor-cam-gen2", category: "Best Overall", price: "$59.99", rating: "4.5", asin: "B09WZBPX7K", highlight: false, brandColor: "#232f3e" },
  { name: "Wyze Cam v4", slug: "wyze-cam-v4", category: "Best Value", price: "$35.98", rating: "4.4", asin: "B0C3KXY935", highlight: false, brandColor: "#0078d7" },
  { name: "Arlo Pro 5S", slug: "arlo-pro-5s", category: "Best Premium", price: "$199.99", rating: "4.3", asin: "B0B8QYZRSC", highlight: false, brandColor: "#6b21a8" },
  { name: "Google Nest Cam", slug: "google-nest-cam-indoor", category: "Best Smart Home", price: "$99.99", rating: "4.4", asin: "B09NYZGGJD", highlight: false, brandColor: "#4285f4" },
  { name: "Eufy S350", slug: "eufy-s350", category: "No Subscription", price: "$79.99", rating: "4.5", asin: "B0C7VN19YS", highlight: false, brandColor: "#0d9488" },
];

const LIVE_PREVIEW = [
  { city: "New York", flag: "🇺🇸", label: "Times Square", img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&q=75&auto=format&fit=crop", alt: "Times Square New York City live cam" },
  { city: "Tokyo", flag: "🇯🇵", label: "Shibuya Crossing", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=75&auto=format&fit=crop", alt: "Shibuya Crossing Tokyo live webcam" },
  { city: "Paris", flag: "🇫🇷", label: "Eiffel Tower", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=75&auto=format&fit=crop", alt: "Eiffel Tower Paris live camera" },
  { city: "Dubai", flag: "🇦🇪", label: "Burj Khalifa", img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=75&auto=format&fit=crop", alt: "Burj Khalifa Dubai live webcam" },
];

function CamSVG({ color = "#00c853" }) {
  return (
    <svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-12">
      <rect x="4" y="12" width="52" height="38" rx="6" fill="#1a1a1a" stroke={color} strokeWidth="2"/>
      <rect x="22" y="6" width="14" height="8" rx="3" fill={color}/>
      <circle cx="30" cy="31" r="13" fill="#0d0d0d" stroke={color} strokeWidth="2"/>
      <circle cx="30" cy="31" r="4" fill={color} opacity="0.9"/>
      <circle cx="33" cy="28" r="1.5" fill="white" opacity="0.4"/>
      <path d="M56 20 L72 15 L72 47 L56 42" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="53" cy="18" r="3.5" fill="#ef4444"/>
    </svg>
  );
}

export default function Home({ articles }) {
  return (
    <Layout>
      {/* Hero Carousel */}
      <section className="mb-8">
        <HeroCarousel />
      </section>

      {/* Stats bar */}
      <section className="card mb-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-brand-border text-center">
        {[
          { n: "60+", label: "Live Cities" },
          { n: "6", label: "Cameras Reviewed" },
          { n: "100%", label: "Independent" },
          { n: "24/7", label: "Streaming Live" },
        ].map(s => (
          <div key={s.label} className="py-4">
            <div className="text-2xl font-extrabold text-brand-green">{s.n}</div>
            <div className="text-gray-500 text-xs mt-0.5">{s.label}</div>
          </div>
        ))}
      </section>

      <AdUnit />

      {/* Live Cam Preview Strip */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="live-dot w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
            <h2 className="text-xl font-bold text-white">Live World Cameras</h2>
          </div>
          <Link href="/live" className="text-brand-green text-sm hover:underline">View all 60+ cities →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {LIVE_PREVIEW.map(cam => (
            <Link
              key={cam.city}
              href="/live"
              className="card p-0 overflow-hidden hover:border-red-500/50 transition group"
            >
              <div className="relative h-36 overflow-hidden">
                <img src={cam.img} alt={cam.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* CCTV corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-brand-green/60" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-brand-green/60" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-brand-green/60" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-brand-green/60" />
                <div className="absolute top-2 left-2 z-10">
                  <span className="flex items-center gap-1 bg-red-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">
                    <span className="live-dot w-1 h-1 rounded-full bg-white" />LIVE
                  </span>
                </div>
                <div className="absolute bottom-2 left-3 z-10">
                  <p className="text-white text-xs font-bold drop-shadow">{cam.city}</p>
                  <p className="text-gray-300 text-[10px] drop-shadow">{cam.label}</p>
                </div>
                <div className="absolute bottom-2 right-3 z-10 text-xl">{cam.flag}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Picks */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Top Picks Right Now</h2>
          <Link href="/reviews" className="text-brand-green text-sm hover:underline">Full reviews →</Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOP_PICKS.map((cam) => (
            <a
              key={cam.asin}
              href={`https://www.amazon.com/dp/${cam.asin}?tag=${AMAZON_TAG}`}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className={`card hover:border-brand-green/50 transition block group relative overflow-hidden ${cam.highlight ? "border-brand-green" : ""}`}
            >
              {cam.highlight && (
                <div className="absolute top-0 right-0 w-20 h-20 bg-brand-green/5 rounded-bl-full" />
              )}
              <div className="flex items-center gap-3 mb-3">
                <CamSVG color={cam.brandColor} />
                <div>
                  {cam.badge && <div className="pill bg-brand-green text-black text-[10px] font-extrabold mb-1 inline-block">{cam.badge}</div>}
                  <div className="pill bg-gray-800 text-gray-400 text-[10px] inline-block ml-1">{cam.category}</div>
                </div>
              </div>
              <h3 className="font-bold text-white group-hover:text-brand-green transition mb-2">{cam.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-brand-green font-bold text-lg">{cam.price}</span>
                <span className="text-yellow-400 text-sm">★ {cam.rating}/5</span>
              </div>
              <div className="mt-3 text-xs text-center bg-yellow-400 text-black font-bold py-2 rounded-lg group-hover:bg-yellow-300 transition">
                Check Price on Amazon →
              </div>
            </a>
          ))}
        </div>
      </section>

      <AdUnit />

      {/* Latest Articles */}
      {articles.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Latest Guides &amp; Reviews</h2>
            <Link href="/blog" className="text-brand-green text-sm hover:underline">View all →</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.slice(0, 6).map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}

      {/* Airbnb CTA */}
      <section className="card border-brand-green/20 mb-10 text-center py-10">
        <div className="text-3xl mb-3">🏠</div>
        <h2 className="text-xl font-bold text-white mb-2">Hosting on Airbnb or VRBO?</h2>
        <p className="text-gray-400 mb-5 max-w-md mx-auto text-sm">
          Disclosure requirements, legal placements, and the exact camera models that guests never complain about.
        </p>
        <Link href="/best-hidden-cameras-airbnb" className="btn-primary">
          Read the Airbnb Host Guide →
        </Link>
      </section>

      {/* Trust signals */}
      <section className="grid md:grid-cols-3 gap-4 mb-8">
        {[
          { icon: "🔍", title: "Independent Reviews", body: "We buy or borrow every camera we test. No manufacturer-provided units, no sponsored rankings." },
          { icon: "📦", title: "Hands-On Testing", body: "Each camera is tested for video quality, night vision, app reliability, and real-world motion detection." },
          { icon: "💰", title: "Price Tracked Daily", body: "We monitor Amazon prices and update picks when better value options appear." },
        ].map((t) => (
          <div key={t.title} className="card text-center">
            <div className="text-3xl mb-3">{t.icon}</div>
            <p className="font-bold text-white text-sm mb-2">{t.title}</p>
            <p className="text-gray-400 text-xs leading-relaxed">{t.body}</p>
          </div>
        ))}
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const articlesDir = path.join(process.cwd(), "data", "articles");
  let articles = [];
  try {
    const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".json"));
    articles = files
      .map((f) => JSON.parse(fs.readFileSync(path.join(articlesDir, f), "utf8")))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch {}
  return { props: { articles } };
}
