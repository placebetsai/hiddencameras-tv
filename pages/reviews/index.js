import Layout from "../../components/Layout";
import AdUnit from "../../components/AdUnit";
import Link from "next/link";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

const CAMERAS = [
  {
    slug: "blink-mini-2",
    name: "Blink Mini 2",
    brand: "Blink",
    category: "Best Budget",
    price: "$34.99",
    rating: 4.4,
    asin: "B0CGX9GQ3Q",
    badge: "EDITORS CHOICE",
    badgeColor: "bg-brand-green text-black",
    tags: ["Indoor", "Plug-in", "Alexa"],
    summary: "The best cheap indoor camera. 1080p, motion detection, two-way audio, and Works with Alexa. Tiny enough to hide anywhere.",
    pros: ["Cheapest quality cam available", "Tiny form factor", "Easy Alexa integration", "No hub required"],
    cons: ["Subscription for cloud clips", "No outdoor use", "Basic app"],
    score: { video: 4, nightVision: 3.5, app: 4, value: 5, privacy: 3.5 },
    brandColor: "#1a73e8",
  },
  {
    slug: "ring-indoor-cam-gen2",
    name: "Ring Indoor Cam (2nd Gen)",
    brand: "Ring",
    category: "Best Overall",
    price: "$59.99",
    rating: 4.5,
    asin: "B09WZBPX7K",
    badge: "TOP PICK",
    badgeColor: "bg-yellow-400 text-black",
    tags: ["Indoor", "Color Night Vision", "Privacy Cover"],
    summary: "Ring's best indoor cam. Color night vision, a physical privacy shutter, and seamless integration with all other Ring devices.",
    pros: ["Color night vision", "Physical privacy cover", "Best Ring ecosystem integration", "Sharp 1080p HD"],
    cons: ["Ring Protect plan for full features", "Amazon ecosystem lock-in", "No local storage"],
    score: { video: 4.5, nightVision: 4.5, app: 4.5, value: 4, privacy: 4.5 },
    brandColor: "#232f3e",
  },
  {
    slug: "wyze-cam-v4",
    name: "Wyze Cam v4",
    brand: "Wyze",
    category: "Best Value",
    price: "$35.98",
    rating: 4.4,
    asin: "B0CJ9YX7DG",
    badge: "BEST VALUE",
    badgeColor: "bg-blue-500 text-white",
    tags: ["Indoor/Outdoor", "2K QHD", "Free Storage"],
    summary: "2K resolution, color night vision, indoor/outdoor use, and 14 days of free cloud storage. Impossible to beat at this price.",
    pros: ["14 days free cloud storage", "2K QHD resolution", "Weather resistant", "Affordable"],
    cons: ["App can be slow", "Wyze brand less known", "Subscription for advanced features"],
    score: { video: 4.5, nightVision: 4, app: 3.5, value: 5, privacy: 4 },
    brandColor: "#0078d7",
  },
  {
    slug: "arlo-pro-5s",
    name: "Arlo Pro 5S",
    brand: "Arlo",
    category: "Best Premium",
    price: "$199.99",
    rating: 4.3,
    asin: "B0B8QYZRSC",
    badge: "PREMIUM",
    badgeColor: "bg-purple-600 text-white",
    tags: ["Wire-Free", "2K HDR", "6-Month Battery"],
    summary: "The gold standard for wire-free outdoor security. 2K HDR, integrated spotlight, and up to 6 months battery on a single charge.",
    pros: ["Completely wire-free", "2K HDR video", "Integrated color spotlight", "Long battery life"],
    cons: ["Expensive", "Subscription for full cloud", "Hub required for some features"],
    score: { video: 5, nightVision: 5, app: 4.5, value: 3.5, privacy: 4 },
    brandColor: "#6b21a8",
  },
  {
    slug: "google-nest-cam-indoor",
    name: "Google Nest Cam (Indoor)",
    brand: "Google",
    category: "Best Smart Home",
    price: "$99.99",
    rating: 4.4,
    asin: "B09NYZGGJD",
    badge: "SMART HOME PICK",
    badgeColor: "bg-red-500 text-white",
    tags: ["Indoor", "AI Detection", "Google Home"],
    summary: "Google's AI-powered person, pet, and vehicle detection is the best in class. Ideal for Google Home users.",
    pros: ["Best AI event detection", "Google Home integration", "Familiar Google interface", "3-hour event history free"],
    cons: ["Google ecosystem required", "Needs Nest Aware for full history", "No local storage"],
    score: { video: 4.5, nightVision: 4, app: 5, value: 4, privacy: 3.5 },
    brandColor: "#4285f4",
  },
  {
    slug: "eufy-s350",
    name: "Eufy Security Indoor Cam S350",
    brand: "Eufy",
    category: "Best No Subscription",
    price: "$79.99",
    rating: 4.5,
    asin: "B0C7VN19YS",
    badge: "NO SUBSCRIPTION",
    badgeColor: "bg-teal-500 text-white",
    tags: ["4K", "Dual Lens", "Local Storage"],
    summary: "4K dual-lens camera with 8x zoom. Stores footage locally — no monthly fee ever. The privacy-first choice.",
    pros: ["No subscription ever", "4K ultra HD", "Dual-lens 8x zoom", "Local storage included"],
    cons: ["Bulkier than competitors", "Limited cloud options", "Less ecosystem integration"],
    score: { video: 5, nightVision: 4, app: 4, value: 4.5, privacy: 5 },
    brandColor: "#0d9488",
  },
];

function Stars({ rating }) {
  return (
    <span className="star-rating text-sm">
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
      <span className="text-gray-600">{"★".repeat(5 - Math.ceil(rating))}</span>
      <span className="text-gray-400 ml-1">{rating}/5</span>
    </span>
  );
}

function ScoreBar({ label, score }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-gray-500 w-24 shrink-0">{label}</span>
      <div className="flex-1 bg-brand-border rounded-full h-1.5">
        <div className="bg-brand-green h-1.5 rounded-full transition-all" style={{ width: `${(score / 5) * 100}%` }} />
      </div>
      <span className="text-gray-400 w-6">{score}</span>
    </div>
  );
}

function CamSVG({ color = "#3b82f6" }) {
  return (
    <svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="4" y="12" width="52" height="38" rx="6" fill="#1a1a1a" stroke={color} strokeWidth="2"/>
      <rect x="22" y="6" width="14" height="8" rx="3" fill={color}/>
      <circle cx="30" cy="31" r="13" fill="#0d0d0d" stroke={color} strokeWidth="2"/>
      <circle cx="30" cy="31" r="8" fill="#111" stroke={color} strokeWidth="1" opacity="0.5"/>
      <circle cx="30" cy="31" r="4" fill={color} opacity="0.9"/>
      <circle cx="33" cy="28" r="1.5" fill="white" opacity="0.4"/>
      <path d="M56 20 L72 15 L72 47 L56 42" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="53" cy="18" r="3.5" fill="#ef4444"/>
    </svg>
  );
}

export default function Reviews() {
  return (
    <Layout
      title="Best Security Camera Reviews 2026 — HiddenCameras.tv"
      description="In-depth reviews of the best security cameras of 2026. Ring, Arlo, Blink, Wyze, Google Nest, and Eufy tested and ranked."
      canonical="https://hiddencameras.tv/reviews"
    >
      <div className="mb-8">
        <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">2026 REVIEWS</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
          Security Camera Reviews
        </h1>
        <p className="text-gray-400 max-w-2xl">
          Every camera below is independently tested. We score on video quality, night vision, app reliability, and value. Updated monthly.
        </p>
      </div>

      <AdUnit />

      <div className="grid gap-6 mb-10">
        {CAMERAS.map((cam) => (
          <div key={cam.slug} className="card hover:border-brand-green/40 transition group">
            <div className="flex flex-col md:flex-row gap-5">
              {/* Camera graphic */}
              <div className="shrink-0 w-full md:w-40 h-32 md:h-auto rounded-lg bg-brand-bg border border-brand-border flex items-center justify-center p-4">
                <CamSVG color={cam.brandColor} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`pill ${cam.badgeColor} text-[10px] font-extrabold tracking-wide`}>{cam.badge}</span>
                  <span className="pill bg-gray-800 text-gray-300">{cam.category}</span>
                  {cam.tags.map(t => (
                    <span key={t} className="pill bg-brand-border text-gray-400">{t}</span>
                  ))}
                </div>

                <h2 className="text-lg font-extrabold text-white group-hover:text-brand-green transition mb-1">{cam.name}</h2>
                <div className="flex items-center gap-3 mb-3">
                  <Stars rating={cam.rating} />
                  <span className="text-brand-green font-bold">{cam.price}</span>
                </div>

                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{cam.summary}</p>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Pros</p>
                    <ul className="space-y-1">
                      {cam.pros.map(p => <li key={p} className="text-xs text-gray-300 flex gap-1.5"><span className="text-brand-green shrink-0">✓</span>{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Cons</p>
                    <ul className="space-y-1">
                      {cam.cons.map(c => <li key={c} className="text-xs text-gray-400 flex gap-1.5"><span className="text-red-500 shrink-0">✗</span>{c}</li>)}
                    </ul>
                  </div>
                </div>

                {/* Score bars */}
                <div className="space-y-1.5 mb-4">
                  <ScoreBar label="Video Quality" score={cam.score.video} />
                  <ScoreBar label="Night Vision" score={cam.score.nightVision} />
                  <ScoreBar label="App" score={cam.score.app} />
                  <ScoreBar label="Value" score={cam.score.value} />
                  <ScoreBar label="Privacy" score={cam.score.privacy} />
                </div>

                <a
                  href={`https://www.amazon.com/dp/${cam.asin}?tag=${AMAZON_TAG}`}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="inline-block bg-yellow-400 text-black text-sm font-bold px-5 py-2 rounded-lg hover:bg-yellow-300 transition"
                >
                  {cam.price} — Check Price on Amazon →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdUnit />

      <div className="card border-brand-green/20 text-center py-8">
        <p className="text-white font-bold mb-2">Need help choosing?</p>
        <p className="text-gray-400 text-sm mb-4">Read our buying guides for specific use cases — Airbnb, nanny cams, outdoor security, and more.</p>
        <Link href="/blog" className="btn-primary">Browse All Guides →</Link>
      </div>
    </Layout>
  );
}
