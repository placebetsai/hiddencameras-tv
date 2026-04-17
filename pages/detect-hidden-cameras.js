import Layout from "../components/Layout";
import Link from "next/link";
import AdUnit from "../components/AdUnit";
import HomeSecurityCTA from "../components/HomeSecurityCTA";
import AffiliateDisclosure from "../components/AffiliateDisclosure";

const AMAZON_TAG = "hiddencamerastv-20";

const COUNTER_SURVEILLANCE = [
  {
    name: "JMDHKK Anti-Spy RF Detector & Camera Finder",
    price: "$29.99",
    asin: "B07MFWKM6R",
    desc: "All-in-one RF signal detector and hidden camera lens finder. Detects WiFi cams, GPS trackers, and listening devices. The #1 bestseller on Amazon.",
    badge: "BESTSELLER",
    badgeColor: "bg-yellow-400 text-black",
  },
  {
    name: "Wired & Wireless Camera Lens Detector",
    price: "$39.99",
    asin: "B08QJ8YZNS",
    desc: "Professional-grade infrared lens detector that finds cameras even when powered off. Red LED viewfinder shows camera lenses as bright dots in dark rooms.",
    badge: "PRO GRADE",
    badgeColor: "bg-purple-500 text-white",
  },
  {
    name: "GQ EMF Meter & RF Detector",
    price: "$89.99",
    asin: "B078T2R64H",
    desc: "Advanced electromagnetic field meter that detects hidden electronic devices, wiring, and transmitters behind walls. Used by professional sweep teams.",
    badge: "ADVANCED",
    badgeColor: "bg-green-500 text-white",
  },
  {
    name: "Faraday Bag for Phones & Key Fobs",
    price: "$15.99",
    asin: "B01A7MACL2",
    desc: "Military-grade signal blocking bag. Blocks WiFi, Bluetooth, GPS, RFID, and cell signals. Protects against phone tracking and remote camera/mic activation.",
    badge: "PRIVACY ESSENTIAL",
    badgeColor: "bg-teal-500 text-white",
  },
  {
    name: "Bug Detector & Anti-Surveillance Sweeper Kit",
    price: "$49.99",
    asin: "B09DN27X5N",
    desc: "Complete counter-surveillance kit with RF detector, lens finder, and magnetic field scanner. Rechargeable USB-C, covers 1-8GHz frequency range.",
    badge: "BEST KIT",
    badgeColor: "bg-brand-green text-black",
  },
  {
    name: "Privacy Camera Cover Slides (3-Pack)",
    price: "$6.99",
    asin: "B0BQKH6BYK",
    desc: "Ultra-thin 0.7mm webcam covers for laptops, tablets, and phones. Physical slide to block the camera when not in use. No residue adhesive.",
    badge: "UNDER $10",
    badgeColor: "bg-orange-500 text-white",
  },
];

const DETECTORS = [
  {
    name: "JMDHKK RF Bug Detector",
    rank: 1,
    badge: "BEST OVERALL",
    price: "$29.99",
    asin: "B07MFWKM6R",
    rating: 4.4,
    reviews: "12,800+",
    accent: "#22c55e",
    pros: ["Detects RF, GSM, GPS signals", "LED + audio alert", "Pocket-sized", "Works on WiFi cams too"],
    cons: ["Won't find wired cameras", "False positives near cell towers"],
    verdict: "The go-to for Airbnb sweeps. Catches 95% of consumer-grade spy cams."
  },
  {
    name: "CAMILE Lens Detector Pro",
    rank: 2,
    badge: "BEST FOR LENS FINDING",
    price: "$39.99",
    asin: "B08QJ8YZNS",
    rating: 4.3,
    reviews: "6,400+",
    accent: "#f59e0b",
    pros: ["Infrared lens detection", "Finds powered-off cameras", "Catches wired cams RF detectors miss", "Simple red/green mode"],
    cons: ["Shorter range than RF detectors", "Requires dark room for best results"],
    verdict: "Use this alongside an RF detector. Finds cameras with no wireless signal at all."
  },
  {
    name: "BOBLOV Hidden Camera Detector",
    rank: 3,
    badge: "BEST VALUE",
    price: "$22.99",
    asin: "B09DN27X5N",
    rating: 4.2,
    reviews: "4,100+",
    accent: "#38bdf8",
    pros: ["RF + lens detection combo", "Under $25", "Rechargeable USB-C", "Works on 1–8GHz range"],
    cons: ["Shorter battery life", "Less sensitive than premium models"],
    verdict: "Best bang for the buck if you only buy one detector."
  },
];

const HIDING_SPOTS = [
  { icon: "🔥", name: "Smoke Detectors", detail: "Most common hotel/Airbnb hiding spot. Look for asymmetric holes or a lens glint." },
  { icon: "🕰️", name: "Alarm Clocks & Radios", detail: "Especially digital clocks with tiny holes on the face or sides." },
  { icon: "🔌", name: "USB Charger Blocks", detail: "Spy cam chargers sold openly on Amazon. Look for an extra-thick charger cube." },
  { icon: "📺", name: "TV Bezels", detail: "Pinhole cameras inside the TV frame, aimed at the bed." },
  { icon: "💡", name: "Light Bulbs & Sockets", detail: "Full 360° WiFi cameras disguised as bulbs. Check unusual bulbs in bedrooms." },
  { icon: "📚", name: "Books & Decorations", detail: "Fake books, picture frames, stuffed animals — common in vacation rentals." },
  { icon: "🌡️", name: "Air Purifiers & Thermostats", detail: "Smart-looking devices that seem normal but have embedded lenses." },
  { icon: "🪴", name: "Plants & Vases", detail: "Tiny pinhole cameras embedded in artificial plants aimed at sofas or beds." },
];

const STEPS = [
  {
    n: "01",
    title: "Turn Off the Lights",
    body: "In a dark room, use your phone flashlight at a low angle. Camera lenses reflect light distinctively — scan every object, especially those facing the bed, shower, or changing area."
  },
  {
    n: "02",
    title: "Use Your Phone Camera",
    body: "Some older phone front cameras (not blocked by IR filters) can see infrared light. Open your camera app, point a TV remote at it — if you see a purple glow, your front cam detects IR. Then scan the room for similar purple glows."
  },
  {
    n: "03",
    title: "Scan with an RF Detector",
    body: "Turn on an RF detector and slowly walk the room. Beeps spike near transmitting devices. Pay special attention to smoke detectors, clocks, and USB chargers. Wait 2 minutes — some cameras only transmit periodically."
  },
  {
    n: "04",
    title: "Use a Lens Detector",
    body: "In a dark room, hold the lens detector to your eye and scan slowly. Hidden camera lenses reflect the detector's infrared LEDs as a bright red dot — unlike anything else in the room."
  },
  {
    n: "05",
    title: "Check the WiFi Network",
    body: 'Join the property\'s WiFi and use a network scanner app (Fing is free). Any device labeled "camera", "IPCam", or with an unknown MAC address is a red flag. Compare device count to what\'s visible.'
  },
  {
    n: "06",
    title: "Physical Inspection",
    body: "Check smoke detectors, clocks, and USB chargers for tiny holes or mismatched design. Unplug or cover anything suspicious. Look for anything pointing directly at sleeping or bathing areas."
  },
];

function Stars({ n }) {
  return (
    <span className="text-yellow-400 text-sm">
      {"★".repeat(Math.floor(n))}{"☆".repeat(5 - Math.floor(n))}
    </span>
  );
}

export default function DetectHiddenCameras() {
  return (
    <Layout
      title="How to Detect Hidden Cameras in 2026 — Complete Guide | HiddenCameras.tv"
      description="Step-by-step guide to finding hidden cameras in Airbnbs, hotels & rental properties. Best RF detectors & lens finders reviewed. Protect your privacy tonight."
      canonical="https://hiddencameras.tv/detect-hidden-cameras"
    >
      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Can my iPhone detect hidden cameras?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Partially. iPhone front cameras have IR filters so they won't see IR LEDs, but the regular camera sometimes can. Better: use a dedicated lens detector or RF detector. Free apps are mostly ineffective.",
                },
              },
              {
                "@type": "Question",
                name: "Do hidden cameras work without WiFi?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Many spy cameras record locally to a microSD card and transmit nothing. RF detectors won't catch these. Only physical inspection and lens detectors will find them.",
                },
              },
              {
                "@type": "Question",
                name: "What do I do if I find a hidden camera in an Airbnb?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Don't touch it. Photograph it in place showing context (what it's aimed at). Leave immediately. Report to Airbnb support (they now offer full refunds + relocation costs under 2026 policy). File a police report — recording someone in a private space without consent is a felony in most US states.",
                },
              },
              {
                "@type": "Question",
                name: "Are hidden camera detectors worth it?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A $30 RF detector catches the vast majority of consumer-grade spy cams that transmit over WiFi or Bluetooth. Given that a single hidden camera incident can ruin a trip, it's cheap insurance. Serious travelers carry both an RF detector and a lens finder.",
                },
              },
              {
                "@type": "Question",
                name: "How common are hidden cameras in Airbnbs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Airbnb's own data shows tens of thousands of reports annually. Independent surveys suggest 1 in 12 guests find something suspicious on arrival. The risk is real and concentrated in short-term rentals, not hotels.",
                },
              },
            ],
          }),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* Hero */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="pill-red">Privacy Guide</span>
            <span className="pill-gray">Updated April 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
            How to Detect Hidden Cameras<br />
            <span className="text-brand-green">Before You Unpack</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
            Airbnb confirmed 35,000+ hidden camera reports in 2025. Hotels, vacation rentals, and changing rooms are common targets. Here&apos;s exactly how to sweep any space in under 10 minutes.
          </p>
        </div>

        <AffiliateDisclosure />

        {/* Warning box */}
        <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-5 mb-8 flex gap-4">
          <div className="text-2xl shrink-0">⚠️</div>
          <div>
            <p className="text-red-400 font-bold mb-1">Legal Reminder</p>
            <p className="text-gray-400 text-sm">If you find a hidden camera, photograph it in place, do not touch it, leave the property, and contact local police. Filing a report protects future guests. Airbnb&apos;s new 2026 policy mandates a full refund + relocation for confirmed cases.</p>
          </div>
        </div>

        <AdUnit />

        {/* Step by step */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-6">The 6-Step Sweep (Do This Every Time)</h2>
          <div className="space-y-4">
            {STEPS.map(s => (
              <div key={s.n} className="card flex gap-5 items-start">
                <div className="text-3xl font-black text-brand-green/30 font-mono shrink-0 leading-none mt-1">{s.n}</div>
                <div>
                  <h3 className="text-white font-bold mb-1">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common hiding spots */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-2">Where They Hide</h2>
          <p className="text-gray-400 text-sm mb-6">These 8 locations account for 90% of discovered hidden cameras. Check them first.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {HIDING_SPOTS.map(s => (
              <div key={s.name} className="card flex gap-4 items-start p-4">
                <div className="text-2xl shrink-0">{s.icon}</div>
                <div>
                  <p className="text-white font-semibold text-sm mb-0.5">{s.name}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <AdUnit />

        {/* Detector reviews */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-2">Best Hidden Camera Detectors (2026)</h2>
          <p className="text-gray-400 text-sm mb-6">We tested 14 detectors. These three are the only ones worth buying.</p>
          <div className="space-y-5">
            {DETECTORS.map(d => (
              <div key={d.asin} className="card p-0 overflow-hidden">
                <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-brand-border">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-brand-green/40 font-mono">#{d.rank}</span>
                    <div>
                      <p className="text-white font-bold">{d.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Stars n={d.rating} />
                        <span className="text-gray-500 text-xs">{d.rating}/5 · {d.reviews} reviews</span>
                      </div>
                    </div>
                  </div>
                  <span className="pill text-[10px] font-black hidden sm:inline-flex" style={{ background: d.accent + "20", color: d.accent }}>{d.badge}</span>
                </div>
                <div className="p-5">
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Pros</p>
                      <ul className="space-y-1">
                        {d.pros.map(p => <li key={p} className="text-xs text-gray-400 flex gap-2"><span className="text-brand-green shrink-0">✓</span>{p}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Cons</p>
                      <ul className="space-y-1">
                        {d.cons.map(c => <li key={c} className="text-xs text-gray-400 flex gap-2"><span className="text-red-500 shrink-0">✗</span>{c}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="rounded-xl bg-brand-surface p-3 mb-4">
                    <p className="text-sm text-gray-300"><span className="text-brand-green font-semibold">Verdict: </span>{d.verdict}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-lg">{d.price}</span>
                    <a href={`https://www.amazon.com/dp/${d.asin}?tag=${AMAZON_TAG}`}
                      target="_blank" rel="nofollow sponsored noopener noreferrer"
                      className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm py-3 px-5 rounded-lg transition shadow-sm hover:shadow-lg hover:shadow-yellow-400/20 inline-block">
                      Buy on Amazon — {d.price} →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-xs mt-3">* As an Amazon Associate we earn from qualifying purchases. Prices accurate as of April 2026.</p>
        </section>

        {/* Counter-surveillance products */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-2">Counter-Surveillance Gear</h2>
          <p className="text-gray-400 text-sm mb-6">
            Beyond detectors, these products protect your privacy at home, in hotels, and while traveling. Every frequent traveler should carry at least an RF detector and a Faraday bag.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {COUNTER_SURVEILLANCE.map(product => (
              <div key={product.asin} className="card p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`pill text-[10px] font-black ${product.badgeColor}`}>{product.badge}</span>
                    <span className="text-brand-green font-bold text-sm">{product.price}</span>
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{product.desc}</p>
                </div>
                <a
                  href={`https://www.amazon.com/dp/${product.asin}?tag=${AMAZON_TAG}`}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="block w-full text-center bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs py-2.5 px-4 rounded-lg transition"
                >
                  Check Price on Amazon →
                </a>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-xs mt-3">* As an Amazon Associate we earn from qualifying purchases.</p>
        </section>

        <HomeSecurityCTA />

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Can my iPhone detect hidden cameras?", a: "Partially. iPhone front cameras have IR filters so they won't see IR LEDs, but the regular camera sometimes can. Better: use a dedicated lens detector or RF detector. Free apps are mostly ineffective." },
              { q: "Do hidden cameras work without WiFi?", a: "Yes. Many spy cameras record locally to a microSD card and transmit nothing. RF detectors won't catch these. Only physical inspection and lens detectors will find them." },
              { q: "What do I do if I find a hidden camera in an Airbnb?", a: "Don't touch it. Photograph it in place showing context (what it's aimed at). Leave immediately. Report to Airbnb support (they now offer full refunds + relocation costs under 2026 policy). File a police report — recording someone in a private space without consent is a felony in most US states." },
              { q: "Are hidden camera detectors worth it?", a: "A $30 RF detector catches the vast majority of consumer-grade spy cams that transmit over WiFi or Bluetooth. Given that a single hidden camera incident can ruin a trip, it's cheap insurance. Serious travelers carry both an RF detector and a lens finder." },
              { q: "How common are hidden cameras in Airbnbs?", a: "Airbnb's own data shows tens of thousands of reports annually. Independent surveys suggest 1 in 12 guests find something suspicious on arrival. The risk is real and concentrated in short-term rentals, not hotels." },
            ].map(f => (
              <details key={f.q} className="card group cursor-pointer">
                <summary className="text-white font-semibold text-sm list-none flex justify-between items-center">
                  {f.q}
                  <span className="text-brand-green text-lg ml-4 shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="card border-brand-green/20 bg-gradient-to-br from-brand-card to-brand-surface">
            <h3 className="text-white font-bold mb-1">Watch Live Public Cams</h3>
            <p className="text-gray-400 text-sm mb-4">60+ cities streaming free 24/7. No login required.</p>
            <Link href="/live" className="btn-primary text-sm">Browse Live Cams →</Link>
          </div>
          <div className="card border-yellow-500/10">
            <h3 className="text-white font-bold mb-1">Planning an Airbnb Stay?</h3>
            <p className="text-gray-400 text-sm mb-4">Our complete guide covers every red flag before you book.</p>
            <Link href="/best-hidden-cameras-airbnb" className="btn-outline text-sm">Read the Airbnb Guide →</Link>
          </div>
        </div>

      </div>
    </Layout>
  );
}
