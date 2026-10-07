import AdUnit from "../components/AdUnit";
import Link from "next/link";
import Layout from "../components/Layout";

const FAQS = [
  {
    q: "Which detector should I buy for a hotel or rental?",
    a: "A combined RF and lens-finder unit covers the two failure modes that matter in a room you do not control: something transmitting, and something optical you can spot with a reflection. Add a network scan of the router if the room has one. A single-purpose RF detector on its own will miss a camera recording to a card, because it is not transmitting anything.",
  },
  {
    q: "Will a detector find a camera that is not connected to wifi?",
    a: "Not necessarily. A camera writing to a memory card transmits nothing, so an RF detector stays silent even when it is running. That is why a detector is treated as one instrument in a sweep rather than the whole sweep — the visual pass with a light source is what catches the non-transmitting devices.",
  },
  {
    q: "Why does my detector keep beeping at nothing?",
    a: "Because it is detecting radio energy, and most rooms are full of it: phone chargers, bluetooth trackers, motion sensors, microwaves and the router itself. What separates a useful reading from noise is a baseline — scan the room once, note where it is already busy, then look for something that is not on that baseline. Beeping everywhere and nowhere is a calibration problem, not proof of a device.",
  },
  {
    q: "What does a lens finder actually detect?",
    a: "It shines a light back at the lens and looks for the reflection that only a curved piece of glass returns, which shows up as a bright point through the viewer. It works regardless of whether the camera is on or transmitting, but it needs you to be close enough and at the right angle, so it is a slow, deliberate method rather than a quick wave of the room.",
  },
  {
    q: "When is it worth hiring a professional?",
    a: "When the stakes are serious — a workplace, a rented property with a history of complaints, or anything that may end up in legal proceedings — or when the sweep has already found something and you need it documented properly. A professional sweep produces a report, which is a different product from a gadget you bought once.",
  },
];

export default function HiddenCameraDetectorsPage() {
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
      title="Hidden Camera Detectors: Best Detector Guides & Room Checks | HiddenCameras.tv"
      description="How to choose and use a hidden camera detector: RF scanning, lens finders, network checks and physical inspection — what each method finds, what it misses, and how to read a noisy result."
      canonical="https://hiddencameras.tv/hidden-camera-detectors"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="max-w-5xl mx-auto px-4 py-14">
        <p className="text-brand-green text-xs font-black tracking-[0.24em] uppercase mb-4">Detector Guide</p>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-5">Hidden Camera Detectors</h1>
        <p className="text-brand-muted text-lg leading-relaxed max-w-3xl mb-8">
          A detector is one instrument, not a verdict. This guide covers how to choose between an
          RF scanner, a lens finder and a network check, how to read a result without fooling
          yourself, and the honest list of things no handheld device will tell you.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/best-hidden-camera-detector" className="card block hover:border-brand-green/50 transition">
            <h2 className="text-white font-black mb-2">Best Hidden Camera Detector</h2>
            <p className="text-brand-muted text-sm">Detector picks and what the devices can actually find.</p>
          </Link>
          <Link href="/how-to-detect-hidden-cameras-airbnb" className="card block hover:border-brand-green/50 transition">
            <h2 className="text-white font-black mb-2">Airbnb Room Checks</h2>
            <p className="text-brand-muted text-sm">A practical inspection path for rentals and hotel rooms.</p>
          </Link>
        </div>

        <AdUnit slot="inContent" />

        <section className="prose-dark max-w-none">
          <h2>Pick the method for what you suspect</h2>
          <p>
            Different devices fail in different ways, so the useful detector depends on how the
            thing you are looking for would be working. The table below is the short version: each
            method has a specific blind spot, and it is the blind spot that decides the order you
            use them in.
          </p>
          <ul>
            <li>
              <strong>RF scanning</strong> — finds anything actively transmitting: wifi cameras,
              wireless lenses, bug transmitters. It will not find a camera recording locally to a
              memory card, and it will not tell you what the signal is, only that something is
              there.
            </li>
            <li>
              <strong>Lens finding</strong> — works on a device whether it is switched on or not,
              because it relies on the reflection off the lens glass. It needs proximity and a
              steady angle, so it is slow in a large room and awkward at a distance.
            </li>
            <li>
              <strong>Network scanning</strong> — lists what is connected to the room&apos;s router
              and exposes unfamiliar devices and their manufacturers. It misses anything that is
              not on the network, and a camera on mobile data will not appear at all.
            </li>
            <li>
              <strong>Physical inspection</strong> — a deliberate pass with a light source checking
              the usual hiding places. Slow, unglamorous, and the only method that catches a
              non-transmitting device you can actually see.
            </li>
          </ul>

          <h2>How to read a result without fooling yourself</h2>
          <p>
            Every consumer detector will find something in a modern room, because modern rooms are
            full of radios. Chargers, bluetooth tags, motion sensors and the router all put out
            energy, and a cheap detector has no way of telling a router apart from a camera. The
            step that separates a real sweep from a scare is taking a baseline first: scan the room
            before you start looking, note where the signal is already busy, and treat only what
            appears on top of that baseline as interesting.
          </p>
          <p>
            When something does register, narrow it down before you conclude anything. Move the
            device closer and see whether the reading strengthens — distance matters far more than
            most people expect. Change the angle to rule out your own phone in a pocket. If the
            signal disappears when you switch off the local lights or chargers, you have just
            identified the source rather than proved a camera.
          </p>

          <h2>What no detector will find</h2>
          <p>
            Handheld units are sold with far more confidence than they deserve, so it is worth
            stating plainly what falls outside their reach. A device recording to its own memory
            card transmits nothing. A camera wired back to a recorder elsewhere in the building
            produces no radio signal in the room. Something hidden inside a vent, behind a
            mirror, or inside a fixture will not be picked up unless you physically see it, and
            anything deliberately out of sight defeats a lens finder as well.
          </p>
          <p>
            This is why the reliable routine combines methods: a network scan, a physical pass with
            a light, then an RF scan, then a lens check of anything that looks like a lens. One
            instrument used alone gives you a single, incomplete answer with no way to know what it
            missed.
          </p>

          <h2>What to look for when buying one</h2>
          <ul>
            <li>
              <strong>Adjustable sensitivity</strong> — the single most useful feature, because it
              is what lets you take a baseline and then tighten the threshold until only a real
              source registers.
            </li>
            <li>
              <strong>More than one detection type</strong> — an RF scanner with a lens finder
              covers both transmitting and non-transmitting devices; anything with a magnetic and
              electric field mode adds little indoors but does no harm.
            </li>
            <li>
              <strong>A visible signal reading</strong> — a bar or numeric readout tells you
              whether a signal is getting stronger as you move. A beeping LED on its own does not.
            </li>
            <li>
              <strong>Sealed optics for the lens finder</strong> — cheap viewers let ambient light
              in and wash out the reflection, which is why people conclude their detector is
              broken when it is just badly made.
            </li>
            <li>
              <strong>Honest battery life</strong> — a unit that dies mid-sweep is worse than no
              unit, and the powered features (illumination, higher transmit power) drain it
              fastest.
            </li>
          </ul>

          <h2>The order that works</h2>
          <p>
            Start with your eyes: a slow pass of every surface at a shallow angle with a light in
            your hand, covering vents, smoke detectors, mirrors, shelves, plug sockets and anything
            with a lens-shaped opening. Then scan the network for devices you did not connect. Then
            take an RF baseline and sweep, working around the room rather than across it. Finish
            with the lens finder on anything that survived the first three passes. If all four come
            back clean, you have a considerably better answer than any single tool would have given
            you — and no responsible claim beyond that.
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
