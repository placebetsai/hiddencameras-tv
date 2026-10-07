import AdUnit from "../components/AdUnit";
import Link from "next/link";
import Layout from "../components/Layout";

const guides = [
  ["Best Hidden Cameras 2026", "/best-hidden-cameras-2026", "Our main roundup: covert and discreet units compared on recording, storage and how visible the lens really is."],
  ["Hidden Cameras for Airbnb", "/best-hidden-cameras-airbnb", "Devices suited to short stays and rentals, plus the platform rules that apply to both hosts and guests."],
  ["How to Detect Hidden Cameras", "/detect-hidden-cameras", "The sweep routine — order, hiding places, and what each detection method misses."],
  ["Hidden Camera Laws", "/hidden-camera-laws", "Consent rules by state, where cameras are prohibited, and what to do if you find one."],
  ["Spy Cameras", "/spy-cameras", "Disguised form factors — pens, clocks, chargers — and the honest limits of a novelty body."],
  ["Mini Spy Cameras", "/mini-spy-cameras", "Small wireless units: power, field of view, and the trade-off between size and battery life."],
];

const FAQS = [
  {
    q: "What counts as a hidden camera?",
    a: "Any camera whose lens is concealed by its housing or its placement rather than advertised on the outside. That covers purpose-built covert units — a camera inside a clock, charger or pen — and ordinary security cameras deliberately positioned where they are not noticed. The distinction matters legally: intent and location usually decide how a recording is treated, not the shape of the device.",
  },
  {
    q: "What is the difference between a hidden camera and a nanny cam?",
    a: "Nanny cam is a use case, not a product category. It usually means an indoor camera left in a home to record a room, often one that blends into the decor, and it carries an expectation of disclosure to anyone who lives or works there. A hidden camera in the covert sense is built specifically not to be seen. The same hardware can be either, depending on where it is put and whether the people in the room know.",
  },
  {
    q: "How long do these cameras record for?",
    a: "It depends on storage and power rather than the camera. On a memory card with loop recording, footage is overwritten once the card fills, which at typical bitrates gives somewhere between one and several days of continuous recording. Battery-powered units run hours rather than days if they record continuously, and much longer if they only wake on motion. Cloud plans usually keep clips for 7 to 60 days depending on tier.",
  },
  {
    q: "Do I need permission to record inside my own home?",
    a: "Recording in your own home is generally permitted, but not in rooms where anyone has a reasonable expectation of privacy — bathrooms, changing areas and a guest's bedroom are excluded everywhere — and audio recording can require consent from everyone involved even when video does not. The state-by-state consent position is set out in our legal guide.",
  },
  {
    q: "How do you decide what appears in your guides?",
    a: "From published specifications and documented features — storage, power, night performance, running cost — filtered by the things that break purchases in practice. Commercial links are marked, we do not charge for inclusion in a roundup, and any claim we cannot support from the product's own documentation is left out rather than softened.",
  },
];

export default function HiddenCamerasPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Hidden Cameras",
    url: "https://hiddencameras.tv/hidden-cameras",
    description:
      "Hidden camera buying guides, detection guides, privacy rules, and discreet security camera reviews.",
  };

  const faqSchema = {
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
      title="Hidden Cameras: Reviews, Laws, Detectors & Buying Guides | HiddenCameras.tv"
      description="Hidden camera guides for buyers and renters: best hidden cameras, spy cameras, mini cameras, detection tips, Airbnb safety, and hidden camera laws."
      canonical="https://hiddencameras.tv/hidden-cameras"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="max-w-5xl mx-auto px-4 py-14">
        <p className="text-brand-green text-xs font-black tracking-[0.24em] uppercase mb-4">Hidden Camera Hub</p>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-5">Hidden Cameras</h1>
        <p className="text-brand-muted text-lg leading-relaxed max-w-3xl mb-8">
          Everything on this site about concealed cameras, in one place: what to buy and why,
          how they are discovered, and what the law says about installing or finding one. Start
          with the guide that matches your side of it — you are usually either buying one or
          looking for one.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {guides.map(([title, href, blurb]) => (
            <Link key={href} href={href} className="card block hover:border-brand-green/50 transition">
              <h2 className="text-white text-lg font-black mb-2">{title}</h2>
              <p className="text-brand-muted text-sm leading-relaxed">{blurb}</p>
            </Link>
          ))}
        </div>

        <AdUnit slot="inContent" />

        <section className="prose-dark max-w-none">
          <h2>What people actually want to know</h2>
          <p>
            Hidden cameras fall into two audiences who rarely read each other's pages. Someone
            outfitting a home, a rental or a vehicle wants to know what a device records, where the
            footage goes, how long the battery lasts and whether it will be obvious. Someone in an
            unfamiliar room wants to know whether there is one, and what to do about it. The
            guides above are split along that line for a reason — the same technology is a
            legitimate purchase in one context and a policy violation in another.
          </p>
          <p>
            The part both sides share is size and power. Smaller cameras run on smaller batteries
            and record less; a unit that looks convincing inside a clock rarely has the field of
            view of a camera that does not have to hide. Anyone selling you a device that is
            simultaneously invisible, wide-angle and long-lasting is describing three different
            products.
          </p>

          <h2>How a hidden camera is chosen</h2>
          <ul>
            <li>
              <strong>Power first.</strong> Mains power means unlimited recording and a cable you
              have to hide. Battery means hours or days, or motion-only recording to stretch it.
              Solar works outdoors and not really indoors.
            </li>
            <li>
              <strong>Storage second.</strong> Local card, local hub, or cloud. Each survives a
              different kind of failure, and only one of them needs a subscription.
            </li>
            <li>
              <strong>Visibility third.</strong> A covert body buys concealment and costs you
              resolution, lens angle and heat dissipation. If the camera does not have to be
              hidden, you get far more camera for the same money.
            </li>
            <li>
              <strong>Legality throughout.</strong> Buying is generally unregulated; using is not.
              Bedrooms, bathrooms and any private space are off limits, and audio rules are
              stricter than video rules in most states.
            </li>
          </ul>

          <h2>If you are on the other side of it</h2>
          <p>
            Finding a camera you did not agree to is a process problem, not a gadget problem.
            Start with a physical pass and a light source, check the room&apos;s network for
            unfamiliar devices, then sweep with an RF detector against a baseline taken before you
            started. Our detection guide lays out the order and, just as usefully, the list of
            things no handheld device will tell you. Once something is found, photograph it in
            place and report it rather than moving it — the position is usually the evidence.
          </p>

          <h2>How these pages are written</h2>
          <p>
            Guides on this site are built from published specifications and documented product
            features, reviewed on a regular cycle, and corrected when a manufacturer changes
            something that matters. We do not run lab tests of our own, so we do not claim to;
            where a performance figure appears it comes with the condition it was measured under.
            Commercial relationships are disclosed on the relevant pages, and no retailer pays for
            placement in a roundup.
          </p>

          <h2>Frequently asked questions</h2>
          {FAQS.map(({ q, a }) => (
            <div key={q} className="mb-6">
              <h3 className="text-white">{q}</h3>
              <p className="text-gray-400">{a}</p>
            </div>
          ))}
        </section>

        <AdUnit slot="bottom" />
      </section>
    </Layout>
  );
}
