import Layout from "../components/Layout";
import ArticleCard from "../components/ArticleCard";
import AdUnit from "../components/AdUnit";
import Link from "next/link";
import path from "path";
import fs from "fs";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

const TOP_PICKS = [
  {
    name: "Blink Mini 2",
    category: "Best Budget",
    price: "$34.99",
    rating: "4.4/5",
    desc: "Compact plug-in indoor camera with 1080p HD video, motion detection, and two-way audio. Works with Alexa.",
    asin: "B0CGX9GQ3Q",
    highlight: true,
  },
  {
    name: "Ring Indoor Cam (2nd Gen)",
    category: "Best Overall",
    price: "$59.99",
    rating: "4.5/5",
    desc: "1080p HD with color night vision, privacy cover, and works seamlessly with Ring doorbells and Alexa.",
    asin: "B09WZBPX7K",
    highlight: false,
  },
  {
    name: "Wyze Cam v4",
    category: "Best Value",
    price: "$35.98",
    rating: "4.4/5",
    desc: "2K QHD indoor/outdoor camera with color night vision and free cloud storage for 14 days.",
    asin: "B0C3KXY935",
    highlight: false,
  },
  {
    name: "Arlo Pro 5S",
    category: "Best Premium",
    price: "$199.99",
    rating: "4.3/5",
    desc: "Wire-free 2K HDR with integrated spotlight, color night vision, and up to 6 months battery life.",
    asin: "B0B8QYZRSC",
    highlight: false,
  },
  {
    name: "Google Nest Cam (Indoor)",
    category: "Best Smart Home",
    price: "$99.99",
    rating: "4.4/5",
    desc: "1080p with Google AI-powered person, pet, and vehicle detection. Works with Google Home and Assistant.",
    asin: "B09NYZGGJD",
    highlight: false,
  },
  {
    name: "Eufy Security Indoor Cam S350",
    category: "Best No Subscription",
    price: "$79.99",
    rating: "4.5/5",
    desc: "4K ultra HD dual-lens camera with 8x zoom, local storage, no monthly fee required.",
    asin: "B0C7VN19YS",
    highlight: false,
  },
];

export default function Home({ articles }) {
  return (
    <Layout>
      {/* Hero */}
      <section className="text-center mb-12 pt-4">
        <div className="inline-block pill bg-brand-green/10 text-brand-green mb-4">UPDATED {new Date().toLocaleDateString("en-US",{month:"short",year:"numeric"})}</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
          The Best Hidden Cameras<br />
          <span className="text-brand-green">Reviewed & Ranked</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-base mb-6">
          Expert reviews of Ring, Arlo, Blink, Wyze, and Nest cameras. Buying guides for every use case — home security, Airbnb, nanny cams, and more.
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          <Link href="/reviews" className="btn-primary">See All Reviews</Link>
          <Link href="/best-hidden-cameras-airbnb" className="border border-brand-border text-white px-5 py-2 rounded-lg text-sm hover:border-brand-green transition">
            Best for Airbnb →
          </Link>
        </div>
      </section>

      <AdUnit />

      {/* Top Picks */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">Top Picks Right Now</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOP_PICKS.map((cam) => (
            <a
              key={cam.asin}
              href={`https://www.amazon.com/dp/${cam.asin}?tag=${AMAZON_TAG}`}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className={`card hover:border-brand-green/50 transition block ${cam.highlight ? "border-brand-green" : ""}`}
            >
              {cam.highlight && <div className="pill bg-brand-green text-black mb-2 inline-block">EDITOR&apos;S CHOICE</div>}
              <div className="pill bg-gray-800 text-gray-300 mb-2 inline-block ml-1">{cam.category}</div>
              <h3 className="font-bold text-white mb-1">{cam.name}</h3>
              <p className="text-gray-400 text-sm mb-3 leading-relaxed">{cam.desc}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-brand-green font-bold">{cam.price}</span>
                <span className="text-yellow-400 text-sm">★ {cam.rating}</span>
              </div>
              <div className="mt-3 text-xs text-center bg-yellow-400 text-black font-bold py-1.5 rounded-lg">
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
            <h2 className="text-xl font-bold text-white">Latest Guides & Reviews</h2>
            <Link href="/blog" className="text-brand-green text-sm hover:underline">View all →</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.slice(0, 6).map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}

      {/* High-converting CTA */}
      <section className="card border-brand-green/30 mb-12 text-center py-10">
        <h2 className="text-xl font-bold text-white mb-2">Hosting on Airbnb or VRBO?</h2>
        <p className="text-gray-400 mb-4 max-w-md mx-auto text-sm">
          Disclosure requirements, legal camera placements, and the exact models that guests don&apos;t complain about.
        </p>
        <Link href="/best-hidden-cameras-airbnb" className="btn-primary">
          Read the Airbnb Host Guide →
        </Link>
      </section>

      {/* Trust signals */}
      <section className="grid md:grid-cols-3 gap-4 mb-8 text-center">
        {[
          { icon: "🔍", title: "Independent Reviews", body: "We buy or borrow every camera we review. No manufacturer-provided units, no sponsored rankings." },
          { icon: "📦", title: "Hands-On Testing", body: "Each camera is tested for video quality, night vision, app reliability, and real-world motion detection accuracy." },
          { icon: "💰", title: "Best Price Tracked", body: "We monitor Amazon prices daily and update our recommendations when better value options appear." },
        ].map((t) => (
          <div key={t.title} className="card">
            <div className="text-2xl mb-2">{t.icon}</div>
            <p className="font-semibold text-white text-sm mb-1">{t.title}</p>
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
