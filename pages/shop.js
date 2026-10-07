import AdUnit from "../components/AdUnit";
import Layout from "../components/Layout";
import Link from "next/link";

const GUIDES = [
  {
    href: "/best-hidden-cameras-2026",
    title: "Best Hidden Cameras 2026",
    blurb: "Our main roundup: covert and discreet cameras, what each one records, and which form factor suits which room.",
  },
  {
    href: "/best-nanny-cam-2026",
    title: "Best Nanny Cams",
    blurb: "Indoor monitors for caregivers and rooms — power, storage, night vision and how visible the lens actually is.",
  },
  {
    href: "/best-hidden-camera-detector",
    title: "Best Hidden Camera Detectors",
    blurb: "RF scanners, lens finders and multi-tool kits, plus what each type of detector can and cannot pick up.",
  },
  {
    href: "/best-outdoor-security-camera-2026",
    title: "Best Outdoor Security Cameras",
    blurb: "Weatherproof wifi and wired units rated on night performance, recording reliability and subscription costs.",
  },
  {
    href: "/best-doorbell-camera-2026",
    title: "Best Video Doorbells",
    blurb: "Doorbell cams compared on power, chime compatibility, package view and how much you pay per month afterwards.",
  },
  {
    href: "/best-pet-camera-2026",
    title: "Best Pet Cameras",
    blurb: "Treat-dispensers and two-way audio for pets at home, with notes on app quality and whether the unit tips over.",
  },
  {
    href: "/best-car-dash-cam-2026",
    title: "Best Dash Cams",
    blurb: "Front and dual-channel dash cams rated on loop recording, parking mode, heat tolerance and card support.",
  },
  {
    href: "/detect-hidden-cameras",
    title: "How to Detect Hidden Cameras",
    blurb: "The inspection routine that goes with the hardware — sweep order, the places they hide, and when gear is not enough.",
  },
  {
    href: "/compare",
    title: "Compare Cameras",
    blurb: "Put two or more models side by side on resolution, storage, power and running cost before you commit.",
  },
];

const FAQS = [
  {
    q: "Which camera should I buy first?",
    a: "Decide what problem you are solving before you look at models. For a single room, an indoor unit with local storage is usually enough. For an entrance, you need weatherproofing and a wider view. For a car, a dash cam with loop recording and a heat rating. Buying the wrong category first is the most common reason people end up with two cameras instead of one.",
  },
  {
    q: "Do these cameras need a monthly subscription?",
    a: "Some do and some do not. Cloud recording is normally what the subscription pays for; a camera that writes to a microSD card or a local hub keeps working without one. Check what stops working when you stop paying — live view and local recording usually continue, clip history usually does not.",
  },
  {
    q: "What storage should I look for?",
    a: "Local storage means a microSD slot or a recorder box; cloud storage means someone else holds your footage. If a camera only records to the cloud, it stops working the moment your internet does. We note storage type for every product in our roundups so you can see which situation you are buying into.",
  },
  {
    q: "Are hidden cameras legal to buy?",
    a: "Buying a small or discreet camera is generally legal in the United States. Using it is where the law gets specific: recording in bathrooms, changing rooms or anyone's private space is not allowed, and audio recording can require consent from everyone involved. Our legal guide explains the state-by-state position before you install anything.",
  },
  {
    q: "How do you choose what appears here?",
    a: "Our roundups are built from published specifications, documented feature sets and real trade-offs — storage, power, night performance, running cost — not from who pays us. Where a link is commercial we say so, and prices you see can change because they are set by the retailer, not by us.",
  },
];

export default function Shop() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <Layout
      title="Shop Camera Buying Guides 2026 | HiddenCameras.tv"
      description="Buying guides for hidden cameras, nanny cams, detectors, outdoor cameras, doorbells, pet cams and dash cams — how to choose the right category before you spend anything."
      canonical="https://hiddencameras.tv/shop"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="max-w-5xl mx-auto px-4 py-14">
        <p className="text-brand-green text-xs font-black tracking-[0.24em] uppercase mb-4">Buying Guides</p>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-5">Shop by Guide</h1>
        <p className="text-brand-muted text-lg leading-relaxed max-w-3xl mb-8">
          Every buying decision on this site starts with the same question: what are you trying to
          see, and where? These are the guides that answer it — organised by the situation you are
          actually in, not by the size of the camera.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {GUIDES.map(({ href, title, blurb }) => (
            <Link key={href} href={href} className="card block hover:border-brand-green/50 transition">
              <h2 className="text-white font-black mb-2">{title}</h2>
              <p className="text-brand-muted text-sm">{blurb}</p>
            </Link>
          ))}
        </div>

        <AdUnit slot="inContent" />

        <section className="prose-dark max-w-none">
          <h2>Start with the situation, not the spec sheet</h2>
          <p>
            The camera that records a front door well is the wrong camera for a bedroom, and the
            camera that disappears into a bookshelf is the wrong camera for a driveway. Resolution
            and field of view matter, but only after the category fits the job. Everything below
            is written to help you make that first decision.
          </p>
          <ul>
            <li>
              <strong>One room, indoors:</strong> an indoor unit with local storage and night
              vision. No weatherproofing required, and pan-tilt is worth more than extra megapixels
              in a small room.
            </li>
            <li>
              <strong>An entrance or garden:</strong> an outdoor-rated unit (IP65 or better), with a
              view wide enough to cover the approach rather than just the handle.
            </li>
            <li>
              <strong>A parked car:</strong> a dash cam with loop recording, a heat rating and
              parking mode — a normal indoor camera will cook on a windscreen in July.
            </li>
            <li>
              <strong>Checking a room you do not trust:</strong> detection gear first, camera second.
              See the detector roundup and the sweep routine before you buy anything to hide.
            </li>
          </ul>

          <h2>What usually decides it</h2>
          <p>
            Three things settle most purchases, in this order: <strong>how the unit is powered</strong>{" "}
            (mains, battery, or solar), <strong>where the footage goes</strong> (memory card, local
            hub, or cloud), and <strong>what it costs you after the purchase</strong>. A cheaper
            camera with a paid cloud plan often costs more in the second year than a pricier camera
            that records to a card. We list all three for every product in our roundups so you can
            compare on running cost instead of headline price.
          </p>
          <p>
            Night performance is the other common surprise. Manufacturer figures for infrared range
            assume a clear, dark space; hallways with a lamp on, or a porch with street lighting,
            behave differently. Where we can qualify a claim we say what conditions it applies to.
          </p>

          <h2>How these guides are built</h2>
          <p>
            Roundups start from published specifications and documented features, then get reduced
            by the things that actually break a purchase: an app that signs you out, a storage card
            nobody mentions, a doorbell that needs a transformer you do not have. Where a guide
            links to a retailer we mark it as commercial, and we do not charge for placement in a
            roundup. Prices and availability come from the retailer and change without notice —
            check the live listing before you rely on a number here.
          </p>
          <p>
            If a guide is wrong or out of date, that is worth telling us about. Corrections are
            logged, and updated guides carry the date they were last reviewed.
          </p>

          <h2>Frequently asked questions</h2>
          {FAQS.map(({ q, a }) => (
            <div key={q} className="mb-6">
              <h3 className="text-white">{q}</h3>
              <p className="text-gray-400">{a}</p>
            </div>
          ))}
        </section>

        <AdUnit />
      </section>
    </Layout>
  );
}
