import Layout from "../components/Layout";
import Link from "next/link";
import AdUnit from "../components/AdUnit";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

const TIMELINE = [
  {
    year: "1942",
    era: "WWII Origins",
    color: "#ef4444",
    events: [
      {
        title: "The First Closed-Circuit Television System",
        body: "German engineer Walter Bruch installed the world's first closed-circuit television (CCTV) system at Test Stand VII in Peenemünde, Germany — used to monitor V-2 rocket launches from a safe distance. The system wasn't designed for surveillance of people, but the infrastructure was born. This single engineering decision planted the seed for every security camera in existence today.",
      },
    ],
  },
  {
    year: "1949",
    era: "America Gets Cameras",
    color: "#f59e0b",
    events: [
      {
        title: "First Commercial CCTV in the United States",
        body: "Vericon, a contractor for the U.S. government, installed the first commercial closed-circuit TV system available to businesses. By 1949, Olean, New York became the first American city to install public-facing surveillance cameras on its streets — a decision that sparked both public fascination and the first recorded privacy debate around cameras watching citizens.",
      },
    ],
  },
  {
    year: "1948–1960",
    era: "Candid Camera Era",
    color: "#3b82f6",
    events: [
      {
        title: "Candid Camera: Hidden Cameras Enter Pop Culture",
        body: "Allen Funt's \"Candid Camera\" debuted on radio in 1947 before moving to TV in 1948, introducing millions of Americans to the concept of a hidden camera watching unsuspecting people. The show ran for decades and normalized the idea that cameras could be concealed. It was entertainment — but it also taught an entire generation that cameras don't have to be visible to be watching.",
      },
    ],
  },
  {
    year: "1960s",
    era: "Government Surveillance",
    color: "#8b5cf6",
    events: [
      {
        title: "London's Traffic Cameras & Public Space Surveillance",
        body: "London began deploying fixed-point traffic cameras in the early 1960s, and the Metropolitan Police started experimenting with portable CCTV units for crowd control. Meanwhile in the U.S., the FBI began building sophisticated surveillance programs under J. Edgar Hoover, using a mix of physical cameras, wiretaps, and informants to monitor civil rights leaders including Martin Luther King Jr.",
      },
      {
        title: "Banks Adopt Surveillance as Standard Practice",
        body: "Following a surge in bank robberies in the 1960s, virtually every major U.S. financial institution installed ceiling-mounted film cameras over teller windows. These early cameras used slow-scan film that captured a frame every few seconds — grainy, low-resolution, but legally admissible evidence that led to hundreds of prosecutions.",
      },
    ],
  },
  {
    year: "1970s",
    era: "The VHS Revolution",
    color: "#06b6d4",
    events: [
      {
        title: "Videotape Changes Everything",
        body: "The introduction of VHS (1976) and Betamax (1975) moved surveillance cameras from expensive one-off film systems to affordable, reusable magnetic tape. Retailers, casinos, and parking garages began installing systems that could record for hours. For the first time, a small business owner could afford a camera that actually stored footage. By the late 1970s, cassette-based systems were available for under $500.",
      },
      {
        title: "New York City's Times Square Experiment",
        body: "Amid skyrocketing crime rates, New York City deployed some of the earliest urban public camera networks. Times Square — then a notoriously dangerous neighborhood — became a testing ground for municipal surveillance. The cameras were crude by modern standards, but the model of deploying cameras in high-crime public areas spread rapidly to other cities.",
      },
    ],
  },
  {
    year: "1980s",
    era: "Miniaturization Begins",
    color: "#10b981",
    events: [
      {
        title: "The Birth of the Mini Camera",
        body: "Advances in semiconductor manufacturing through the 1980s allowed camera sensors to shrink dramatically. By mid-decade, cameras small enough to fit inside a clock, a book, or a plant pot were commercially available — initially only to law enforcement and private investigators. The cost of a discreet pinhole camera fell from thousands to hundreds of dollars over this decade.",
      },
      {
        title: "ATM Cameras Become Universal",
        body: "As automated teller machines proliferated in the 1980s, banks made built-in cameras a mandatory feature. ATM cameras introduced hundreds of millions of people to the idea that cameras are embedded in everyday objects — machines you use daily. This normalized hidden-in-plain-sight surveillance for the general public.",
      },
    ],
  },
  {
    year: "1990s",
    era: "The Nanny Cam Decade",
    color: "#f59e0b",
    events: [
      {
        title: "The Louise Woodward Case Sparks Nanny Cam Sales",
        body: "In 1997, British au pair Louise Woodward was convicted in the death of 8-month-old Matthew Eappen in Massachusetts. The case became a global media event and directly drove a massive surge in sales of concealed home cameras — quickly branded \"nanny cams.\" Within months of the verdict, consumer electronics stores were stocking clocks, teddy bears, and smoke detectors with built-in cameras. The nanny cam industry was born overnight.",
      },
      {
        title: "UK's National CCTV Explosion",
        body: "After the 1993 murder of 2-year-old James Bulger — caught on grainy shopping center CCTV footage that led to the killers' identification — the United Kingdom invested massively in public camera networks. By 1999, the UK had more CCTV cameras per capita than any other country. Estimates suggest there is now one camera for every 13 people in Britain.",
      },
      {
        title: "Internet Changes Distribution Forever",
        body: "The first live webcam went online in 1991 at Cambridge University — a camera pointed at a coffee pot so researchers could check if coffee was ready without walking downstairs. By the late 1990s, live streaming webcams were pointed at beaches, city streets, and wildlife preserves. The concept of a live public camera viewable from anywhere on Earth was established. Sites like <a href=\"https://hiddencameras.tv/live\" style=\"color:#3b82f6\">HiddenCameras.tv's live cam directory</a> are the direct descendants of this era.",
      },
    ],
  },
  {
    year: "2000s",
    era: "Digital & IP Cameras",
    color: "#3b82f6",
    events: [
      {
        title: "9/11 and the Surveillance State",
        body: "The September 11, 2001 attacks fundamentally changed the public's tolerance for surveillance. The USA PATRIOT Act dramatically expanded government surveillance authority. Cities across America and Europe rushed to build out public camera networks. In New York City alone, the NYPD's camera network grew from hundreds to thousands of cameras within a few years of the attacks.",
      },
      {
        title: "IP Cameras Replace Analog Systems",
        body: "The shift from analog coaxial cable systems to internet-protocol (IP) cameras in the mid-2000s was as significant as the shift to VHS. IP cameras connected directly to a network, could be viewed remotely, stored footage digitally, and offered far superior image quality. The DVR (digital video recorder) replaced the VHS stack. A company called Axis Communications shipped the first commercial IP camera in 1996; by 2005 IP cameras had taken over the commercial market.",
      },
      {
        title: "Miniature Consumer Hidden Cameras Go Mass Market",
        body: "By the mid-2000s, fully functional hidden cameras were available at consumer electronics stores for under $50. Camera pens, button cameras, glasses cameras, and watch cameras moved from spy-thriller props to Amazon listings. Combined with cheap digital storage, anyone could now build a home surveillance system for less than the cost of a night out.",
      },
    ],
  },
  {
    year: "2010s",
    era: "The Smart Home Revolution",
    color: "#8b5cf6",
    events: [
      {
        title: "Ring Doorbell: Security Camera Meets Social Network (2013)",
        body: "Jamie Siminoff founded Ring in 2013 after being frustrated he couldn't see who was at his door while in his garage workshop. The video doorbell was simple but revolutionary — it combined a security camera with a smartphone app and, later, a neighborhood social network (Neighbors). Amazon acquired Ring for over $1 billion in 2018. Ring didn't just sell cameras; it sold the idea that your entire neighborhood could share surveillance footage with each other.",
      },
      {
        title: "Nest Cam and the AI Camera Era (2015)",
        body: "Google's acquisition of Nest in 2014 for $3.2 billion brought Silicon Valley resources to consumer security cameras. The Nest Cam, released in 2015, introduced continuous cloud recording and — critically — AI-powered event detection that could distinguish a person from a dog or a car. Person detection, package alerts, and facial recognition followed. Modern cameras from <Link href=\"/reviews\">Arlo, Nest, and Ring</Link> now run machine learning models in real time.",
      },
      {
        title: "Airbnb and the Hidden Camera Crisis",
        body: "As short-term rentals boomed, so did reports of hidden cameras in rental properties. High-profile cases in Ireland, Australia, and the United States revealed hosts hiding cameras in bathrooms, bedrooms, and smoke detectors. Airbnb banned indoor cameras entirely in 2023 after years of controversy. This created an entirely new market for camera detection tools — and a booming how-to industry for guests who want to <a href=\"https://hiddencameras.tv/detect-hidden-cameras\" style=\"color:#3b82f6\">detect hidden cameras</a> before unpacking.",
      },
    ],
  },
  {
    year: "2020s",
    era: "AI, Privacy Wars & the Future",
    color: "#ef4444",
    events: [
      {
        title: "Facial Recognition Goes Mainstream",
        body: "By 2020, facial recognition had moved from science fiction to mall security. Companies like Clearview AI scraped billions of social media images to build searchable face databases. Police departments across the U.S. quietly adopted the technology. Several cities — San Francisco, Boston, Portland — banned government use of facial recognition in response. The debate between security and civil liberties has never been more heated.",
      },
      {
        title: "China's Social Credit Surveillance Model",
        body: "China's \"Sharp Eyes\" program aims to achieve total public surveillance coverage — an estimated 540+ million cameras covering public spaces, transit, and even rural areas. Integrated AI systems can track individuals across cities, flag jaywalkers, and feed data into social credit scoring. Whether this model spreads globally is one of the defining questions of 21st-century governance.",
      },
      {
        title: "Consumer Cameras Reach 4K and Beyond",
        body: "Modern consumer cameras like the <a href=\"https://hiddencameras.tv/reviews\" style=\"color:#3b82f6\">Eufy S350 shoot 4K video</a> with dual lenses, 8x optical zoom, and local storage — no subscription required. Battery life on wire-free cameras like the Arlo Pro 5S lasts up to six months. What required a government-level budget in the 1960s is now a $79 purchase with next-day shipping. The democratization of surveillance technology has cut both ways: anyone can protect their home, and anyone can invade someone else's privacy.",
      },
      {
        title: "The Right to Record vs. The Right to Privacy",
        body: "The fundamental tension of this era is not technological — it's legal and ethical. Most U.S. states allow recording in public spaces with no notice. Recording private spaces without consent is a felony in most jurisdictions. The gap between what cameras can do and what the law clearly permits has never been wider. See our full guide to <a href=\"https://hiddencameras.tv/detect-hidden-cameras\" style=\"color:#3b82f6\">hidden camera detection</a> and know your rights before you sweep a room.",
      },
    ],
  },
];

export default function HistoryPage() {
  return (
    <Layout
      title="History of Hidden Cameras: From WWII to AI Surveillance (2026) — HiddenCameras.tv"
      description="The complete history of hidden cameras — from the first CCTV at a Nazi rocket launch site in 1942 to today's AI-powered 4K smart home cameras. Timeline, key cases, and privacy milestones."
      canonical="https://hiddencameras.tv/history-of-hidden-cameras"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "History of Hidden Cameras: From WWII to AI Surveillance",
            "description": "The complete history of hidden cameras — from the first CCTV at a Nazi rocket launch site in 1942 to today's AI-powered 4K smart home cameras.",
            "image": "https://hiddencameras.tv/og-image.png",
            "datePublished": "2026-01-01",
            "dateModified": "2026-04-01",
            "author": { "@type": "Organization", "name": "HiddenCameras.tv" },
            "publisher": {
              "@type": "Organization",
              "name": "HiddenCameras.tv",
              "logo": { "@type": "ImageObject", "url": "https://hiddencameras.tv/favicon.svg" }
            },
            "mainEntityOfPage": { "@type": "WebPage", "@id": "https://hiddencameras.tv/history-of-hidden-cameras" }
          })
        }}
      />

      {/* Hero */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="pill bg-brand-green/10 text-brand-green">HISTORY</span>
          <span className="pill bg-brand-border text-brand-muted">~15 min read</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
          History of Hidden Cameras
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl leading-relaxed mb-6">
          From a German rocket launch site in 1942 to the AI-powered 4K camera in your front doorbell — the complete story of how surveillance technology went from classified military hardware to a $79 Amazon purchase.
        </p>
        {/* Key stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Years of History", value: "80+" },
            { label: "Cameras Worldwide (est.)", value: "1 Billion+" },
            { label: "UK Cameras per Person", value: "1 per 13" },
            { label: "China Public Cameras", value: "540M+" },
          ].map(({ label, value }) => (
            <div key={label} className="card text-center py-4">
              <div className="text-2xl font-extrabold text-brand-green mb-1">{value}</div>
              <div className="text-xs text-brand-muted">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <AdUnit />

      {/* Table of Contents */}
      <div className="card border-brand-green/20 mb-10">
        <p className="text-white font-bold text-sm mb-3 uppercase tracking-wider">Table of Contents</p>
        <ol className="space-y-1.5 text-sm">
          {TIMELINE.map((era) => (
            <li key={era.year}>
              <a href={`#era-${era.year.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}
                className="text-brand-green hover:underline font-medium">
                {era.year} — {era.era}
              </a>
            </li>
          ))}
          <li>
            <a href="#today" className="text-brand-green hover:underline font-medium">
              Today — Live Public Cameras &amp; What&apos;s Next
            </a>
          </li>
        </ol>
      </div>

      {/* Timeline */}
      <div className="relative mb-12">
        {/* Vertical line */}
        <div className="absolute left-5 md:left-8 top-0 bottom-0 w-0.5 bg-brand-border" />

        <div className="space-y-12">
          {TIMELINE.map((era) => (
            <div key={era.year} id={`era-${era.year.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}
              className="relative pl-14 md:pl-20">
              {/* Year dot */}
              <div className="absolute left-0 md:left-3 top-1 flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 font-extrabold text-[10px] text-center leading-tight z-10"
                  style={{ background: "#0a0e1a", borderColor: era.color, color: era.color }}>
                  {era.year.length <= 4 ? era.year : era.year.split("–")[0]}
                </div>
              </div>

              <div className="mb-2">
                <span className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                  style={{ background: era.color + "20", color: era.color }}>
                  {era.era}
                </span>
                <span className="text-brand-muted text-xs ml-2">{era.year}</span>
              </div>

              <div className="space-y-4">
                {era.events.map((ev) => (
                  <div key={ev.title} className="card">
                    <h2 className="text-white font-bold text-base mb-2">{ev.title}</h2>
                    <p className="text-gray-400 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: ev.body }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdUnit />

      {/* Today section */}
      <div id="today" className="mb-12">
        <h2 className="text-2xl font-extrabold text-white mb-6">Today: Watch the World Live</h2>
        <div className="prose-dark mb-6">
          <p>The end result of 80 years of hidden camera history is a world blanketed in lenses. Every major city has thousands of public-facing cameras streaming 24/7 — and many of them are publicly viewable for free. Traffic cams, beach cams, wildlife cams, and city square webcams from every continent stream to the open internet in real time.</p>
          <p>That&apos;s exactly what we&apos;ve built at HiddenCameras.tv. Our <Link href="/live" className="text-brand-green hover:underline">live camera directory</Link> curates 500+ publicly accessible streams from around the world — no login, no subscription, completely free. Watch Times Square, the Eiffel Tower, Tokyo&apos;s Shibuya Crossing, and hundreds more right now.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link href="/live" className="card hover:border-brand-green/40 transition group text-center py-6">
            <div className="text-3xl mb-2">🌍</div>
            <div className="text-white font-bold mb-1 group-hover:text-brand-green transition">Live World Cams</div>
            <div className="text-brand-muted text-xs">500+ streams, 60+ countries</div>
          </Link>
          <Link href="/detect-hidden-cameras" className="card hover:border-brand-green/40 transition group text-center py-6">
            <div className="text-3xl mb-2">🔍</div>
            <div className="text-white font-bold mb-1 group-hover:text-brand-green transition">Detect Hidden Cameras</div>
            <div className="text-brand-muted text-xs">Hotel, Airbnb &amp; rental sweep guide</div>
          </Link>
          <Link href="/reviews" className="card hover:border-brand-green/40 transition group text-center py-6">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-white font-bold mb-1 group-hover:text-brand-green transition">Camera Reviews 2026</div>
            <div className="text-brand-muted text-xs">Ring, Arlo, Wyze, Eufy tested</div>
          </Link>
        </div>
      </div>

      {/* What's Next */}
      <div className="card border-brand-green/20 mb-12">
        <h2 className="text-xl font-extrabold text-white mb-4">What&apos;s Next: The Future of Surveillance</h2>
        <div className="prose-dark">
          <p>The next decade of surveillance technology will be defined by <strong>AI inference at the edge</strong> — cameras that process and understand video locally, without sending footage to the cloud. This solves privacy concerns (your footage stays on your device) while enabling capabilities that cloud systems can&apos;t match: sub-100ms response times, offline operation, and on-device facial recognition.</p>
          <p>Simultaneously, <strong>legal frameworks are racing to catch up</strong>. The EU&apos;s AI Act restricts real-time biometric surveillance in public spaces. Several U.S. states have passed biometric privacy laws. The fundamental question — who owns the footage when a camera captures a public street — still has no universal answer.</p>
          <p>For consumers, the immediate future is continued price compression and capability expansion. What the Arlo Pro 5S does for $199 today will cost $39 in five years. The real competition is shifting from hardware to software — who has the best AI detection model, the best app experience, and the most trustworthy data policy.</p>
          <p>For more, read our <Link href="/blog" className="text-brand-green hover:underline">security camera guides and buying advice</Link>, or dive into the <Link href="/news" className="text-brand-green hover:underline">latest surveillance news</Link>.</p>
        </div>
      </div>

      {/* Buy a camera CTA */}
      <div className="card border-brand-border mb-12">
        <h3 className="text-white font-bold text-lg mb-4">Top Cameras in 2026 (from our reviews)</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: "Blink Mini 2", price: "$34.99", label: "Best Budget", asin: "B0CGX9GQ3Q" },
            { name: "Ring Indoor Cam (2nd Gen)", price: "$59.99", label: "Best Overall", asin: "B09WZBPX7K" },
            { name: "Eufy Indoor Cam S350", price: "$79.99", label: "No Subscription", asin: "B0C7VN19YS" },
          ].map((cam) => (
            <div key={cam.asin} className="bg-brand-bg border border-brand-border rounded-xl p-4 flex flex-col gap-2">
              <span className="pill bg-brand-green/10 text-brand-green text-[10px]">{cam.label}</span>
              <div className="text-white font-bold text-sm">{cam.name}</div>
              <a href={`https://www.amazon.com/dp/${cam.asin}?tag=${AMAZON_TAG}`}
                target="_blank" rel="nofollow sponsored noopener noreferrer"
                className="mt-auto block w-full bg-yellow-400 text-black text-sm font-bold px-4 py-3 rounded-lg hover:bg-yellow-300 transition text-center shadow-sm hover:shadow-lg hover:shadow-yellow-400/20">
                Buy on Amazon — {cam.price} →
              </a>
            </div>
          ))}
        </div>
        <p className="text-brand-muted text-xs mt-3">See all ratings and scores on our <Link href="/reviews" className="text-brand-green hover:underline">full reviews page →</Link></p>
      </div>

      {/* Sources */}
      <div className="card border-brand-border mb-8">
        <h3 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Sources &amp; Further Reading</h3>
        <ul className="space-y-1.5 text-xs text-brand-muted">
          <li>· Norris, C. &amp; Armstrong, G. (1999). <em>The Maximum Surveillance Society.</em> Berg Publishers.</li>
          <li>· Surveillance Studies Network (2006). <em>A Report on the Surveillance Society.</em> UK Information Commissioner.</li>
          <li>· IHS Markit (2021). <em>The IHS Markit Video Surveillance &amp; Analytics Intelligence Service.</em></li>
          <li>· Electronic Frontier Foundation — <em>Street-Level Surveillance: Video Surveillance</em> (eff.org)</li>
          <li>· Office of the Privacy Commissioner of Canada — <em>CCTV Guidelines for Canadian Businesses</em></li>
          <li>· Zuboff, S. (2019). <em>The Age of Surveillance Capitalism.</em> PublicAffairs.</li>
        </ul>
      </div>
    </Layout>
  );
}
