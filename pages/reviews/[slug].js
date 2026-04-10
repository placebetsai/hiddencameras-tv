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
    fullReview: "The Blink Mini 2 is Amazon's answer to ultra-affordable home security. At just $34.99, it's the cheapest quality camera you can buy. The 1080p HD video is sharp enough to identify faces across a room, and the built-in motion detection sends instant alerts to your phone.\n\nTwo-way audio lets you talk through the camera, and night vision covers up to 20 feet in complete darkness. Setup takes about 2 minutes — plug it in, scan the QR code in the Blink app, and you're live.\n\nThe catch? You'll want Blink's subscription ($3/mo per camera or $10/mo unlimited) for cloud clip storage. Without it, you only get live view and motion alerts with no recording. But even without the plan, it's a solid deterrent and monitoring tool.\n\nFor Alexa users, the integration is seamless — say \"Alexa, show me the living room\" and it pops up on any Echo Show. If you're on a budget and want basic indoor monitoring, this is the one to get.",
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
    fullReview: "The Ring Indoor Cam 2nd Gen is our top overall pick for 2026. The headline feature is color night vision — while most cameras switch to grainy black-and-white after dark, this one delivers full-color footage using an ambient light sensor. You can actually tell what color shirt someone is wearing at 2am.\n\nThe physical privacy cover is a game-changer. Slide it over the lens and the camera is physically blocked — no software trust required. This alone makes it the best choice for bedrooms or private spaces where you want guaranteed off-time.\n\nVideo quality is crisp 1080p with a wide 143-degree field of view. Motion detection is customizable with zones, and the Ring app is one of the most polished in the business. If you already have a Ring doorbell or other Ring devices, this integrates perfectly into the same ecosystem.\n\nThe downsides: you're locked into Amazon's ecosystem, and Ring Protect ($3.99/mo) is basically required for video history. Without it, you only get live view. There's also no local storage option — everything goes through the cloud.",
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
    fullReview: "The Wyze Cam v4 is the best value proposition in home security cameras, period. At $35.98, you get 2K QHD resolution (sharper than the Ring and Blink at higher price points), color night vision, and — the kicker — 14 days of free cloud storage with no subscription required.\n\nThe v4 is also IP65 weather resistant, meaning you can use it indoors or outdoors without buying a separate outdoor camera. The starlight sensor delivers impressive color night vision, and the 130-degree field of view covers most rooms easily.\n\nWyze includes free person detection (no subscription needed) and smoke/CO alarm detection. The Cam Plus subscription ($1.99/mo) adds vehicle, pet, and package detection plus full-length event videos instead of 12-second clips.\n\nThe app is the weakest link — it can be slow to load live views and occasionally drops connection. But for the price, these are minor annoyances. If you want the most camera for the least money, the Wyze Cam v4 is unbeatable.",
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
    fullReview: "The Arlo Pro 5S is the premium choice for anyone who wants the best outdoor security camera money can buy. It's completely wire-free with a rechargeable battery that lasts up to 6 months on a single charge — no running cables through your walls.\n\n2K HDR video is the best in class. Colors are accurate, details are sharp, and the HDR handles tricky lighting (like a bright sky behind a dark porch) better than any competitor. The integrated LED spotlight activates on motion, giving you full-color night video instead of infrared.\n\nThe 160-degree field of view is the widest we've tested. Smart detection distinguishes between people, animals, vehicles, and packages with impressive accuracy. The app is excellent — fast, reliable, and well-designed.\n\nThe price is the main barrier. At $199.99 per camera (plus the SmartHub for some features), a full home setup gets expensive fast. Arlo Secure ($7.99/mo for all cameras) is needed for cloud storage, AI features, and 30-day video history. But if budget isn't the primary concern, this is the best outdoor camera available.",
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
    fullReview: "If your home runs on Google, the Nest Cam Indoor is the obvious choice. Google's on-device AI processing is the smartest in the business — it accurately distinguishes between people, pets, and vehicles, and can even recognize familiar faces (with Nest Aware).\n\nThe camera itself delivers 1080p HDR video with a clean, modern design that blends into any room. Night vision is solid with infrared LEDs, and the built-in speaker and microphone handle two-way audio clearly.\n\nThe Google Home app is best-in-class for managing cameras. You get 3 hours of free event history without any subscription, which is enough to catch most incidents. Nest Aware ($8/mo or $12/mo for Plus) extends that to 30 or 60 days and adds intelligent alerts.\n\nThe biggest drawback is ecosystem lock-in. This camera works through Google Home only — no Alexa, no HomeKit. If you're not in the Google ecosystem, look elsewhere. There's also no microSD slot for local storage.",
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
    fullReview: "The Eufy S350 is the best camera for anyone who refuses to pay monthly subscriptions. All footage is stored locally on the camera's built-in storage or a microSD card — no cloud required, no monthly fees, ever.\n\nThe dual-lens system is unique: a wide-angle 4K lens covers the full room while a telephoto lens provides 8x hybrid zoom for detail shots. The camera automatically tracks moving subjects and zooms in — you can read text on a package from across the room.\n\n4K resolution is the sharpest we've tested. Night vision uses infrared for clear footage in complete darkness. The Eufy Security app handles live view, playback, and settings without any lag.\n\nThe camera is larger than competitors — it won't disappear on a shelf. Ecosystem integration is limited compared to Ring or Google — it works with Alexa and Google Assistant for basic commands but doesn't deep-integrate with either. If privacy and avoiding subscriptions are your priorities, this is the clear winner.",
  },
];

function Stars({ rating }) {
  return (
    <span className="star-rating text-lg">
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
      <span className="text-gray-600">{"★".repeat(5 - Math.ceil(rating))}</span>
      <span className="text-gray-400 ml-2 text-base">{rating}/5</span>
    </span>
  );
}

function ScoreBar({ label, score }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-gray-400 w-28 shrink-0">{label}</span>
      <div className="flex-1 bg-brand-border rounded-full h-2">
        <div className="bg-brand-green h-2 rounded-full transition-all" style={{ width: `${(score / 5) * 100}%` }} />
      </div>
      <span className="text-white font-bold w-8 text-right">{score}</span>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: CAMERAS.map((c) => ({ params: { slug: c.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const cam = CAMERAS.find((c) => c.slug === params.slug);
  if (!cam) return { notFound: true };
  return { props: { cam } };
}

export default function ReviewPage({ cam }) {
  const otherCameras = CAMERAS.filter((c) => c.slug !== cam.slug);

  const avgScore = ((cam.score.video + cam.score.nightVision + cam.score.app + cam.score.value + cam.score.privacy) / 5).toFixed(1);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: cam.name,
    description: cam.summary,
    brand: { "@type": "Brand", name: cam.brand },
    url: `https://hiddencameras.tv/reviews/${cam.slug}`,
    image: `https://hiddencameras.tv/og-image.png`,
    offers: {
      "@type": "Offer",
      url: `https://www.amazon.com/dp/${cam.asin}?tag=${AMAZON_TAG}`,
      priceCurrency: "USD",
      price: cam.price.replace("$", ""),
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Amazon" },
    },
    review: {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: cam.rating, bestRating: 5 },
      author: { "@type": "Organization", name: "HiddenCameras.tv" },
      datePublished: "2026-04-01",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgScore,
      bestRating: 5,
      ratingCount: 5,
    },
  };

  return (
    <Layout
      title={`${cam.name} Review 2026 — ${cam.category} | HiddenCameras.tv`}
      description={cam.summary}
      canonical={`https://hiddencameras.tv/reviews/${cam.slug}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="mb-6">
        <Link href="/reviews" className="text-sm text-gray-500 hover:text-brand-green transition mb-4 inline-block">
          ← All Reviews
        </Link>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`pill ${cam.badgeColor} text-xs font-extrabold tracking-wide`}>{cam.badge}</span>
          <span className="pill bg-gray-800 text-gray-300">{cam.category}</span>
          {cam.tags.map((t) => (
            <span key={t} className="pill bg-brand-border text-gray-400">{t}</span>
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">{cam.name} Review</h1>
        <div className="flex items-center gap-4 mb-4">
          <Stars rating={cam.rating} />
          <span className="text-brand-green font-bold text-lg">{cam.price}</span>
        </div>
        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">{cam.summary}</p>
      </div>

      <a
        href={`https://www.amazon.com/dp/${cam.asin}?tag=${AMAZON_TAG}`}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="inline-block bg-yellow-400 text-black text-sm font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition mb-8"
      >
        {cam.price} — Check Price on Amazon →
      </a>

      <AdUnit />

      {/* Full review */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Full Review</h2>
        <div className="text-gray-300 leading-relaxed space-y-4">
          {cam.fullReview.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      {/* Scores */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Performance Scores</h2>
        <div className="space-y-3">
          <ScoreBar label="Video Quality" score={cam.score.video} />
          <ScoreBar label="Night Vision" score={cam.score.nightVision} />
          <ScoreBar label="App" score={cam.score.app} />
          <ScoreBar label="Value" score={cam.score.value} />
          <ScoreBar label="Privacy" score={cam.score.privacy} />
        </div>
      </div>

      {/* Pros and cons */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="card">
          <h3 className="text-sm font-bold text-brand-green uppercase tracking-wider mb-3">Pros</h3>
          <ul className="space-y-2">
            {cam.pros.map((p) => (
              <li key={p} className="text-sm text-gray-300 flex gap-2">
                <span className="text-brand-green shrink-0">✓</span>{p}
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-3">Cons</h3>
          <ul className="space-y-2">
            {cam.cons.map((c) => (
              <li key={c} className="text-sm text-gray-400 flex gap-2">
                <span className="text-red-500 shrink-0">✗</span>{c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <a
        href={`https://www.amazon.com/dp/${cam.asin}?tag=${AMAZON_TAG}`}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="block w-full text-center bg-yellow-400 text-black font-bold py-4 rounded-lg hover:bg-yellow-300 transition mb-8 text-lg"
      >
        Buy {cam.name} on Amazon — {cam.price} →
      </a>

      <AdUnit />

      {/* Other cameras */}
      <div className="mt-10">
        <h2 className="text-lg font-bold text-white mb-4">Other Reviews</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherCameras.map((c) => (
            <Link
              key={c.slug}
              href={`/reviews/${c.slug}`}
              className="card hover:border-brand-green/40 transition group p-4"
            >
              <span className={`pill ${c.badgeColor} text-[10px] font-extrabold mb-2 inline-block`}>{c.badge}</span>
              <h3 className="text-white font-bold group-hover:text-brand-green transition">{c.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-yellow-400 text-sm">{"★".repeat(Math.floor(c.rating))}</span>
                <span className="text-brand-green font-bold text-sm">{c.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
