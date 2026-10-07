import AdUnit from "../components/AdUnit";
import Link from "next/link";
import Layout from "../components/Layout";

const FAQS = [
  {
    q: "Do wifi hidden cameras work without internet?",
    a: "They can record, but they cannot be watched. A camera in access-point mode creates its own hotspot you join directly with a phone, which is how many small units work straight out of the box — live view over that link, footage to the card, no router involved. Internet is what adds remote viewing, app alerts and cloud backup, and it is also what makes the camera reachable by someone else if it is left on its default settings.",
  },
  {
    q: "How can I tell if a camera is on my network?",
    a: "Log into the router and open the connected-device list. Anything you did not add shows up there with a device name and a manufacturer — camera vendors appear under their own names, which is usually the giveaway. A device called something generic with no label is worth a closer look, and a network scanner app will show devices even when the router interface does not list them clearly.",
  },
  {
    q: "What should I change before using a wifi camera?",
    a: "Replace the default password, change the default network name if the unit ships with one, keep firmware updated, and put the camera on its own network or guest network if your router supports it. Those four steps remove most of the realistic ways an unattended camera ends up being watched by someone who is not you.",
  },
  {
    q: "Why does my camera keep disconnecting?",
    a: "Usually one of three things: the camera is too far from the router for a stable signal, it is trying to use a 5GHz network it handles badly, or it is competing with other devices for the same band. Moving it closer, forcing 2.4GHz where the camera supports both, and checking for interference from thick walls or metal fixtures resolves most of it.",
  },
  {
    q: "Is 2.4GHz or 5GHz better for a camera?",
    a: "2.4GHz, in almost every case. It travels further and through walls more easily, which matters more than raw speed for a device streaming video. 5GHz gives a cleaner, faster link in the same room but drops off quickly through obstacles, so a camera on the far side of an apartment or behind a brick wall will struggle with it.",
  },
];

export default function WifiHiddenCamerasPage() {
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
      title="WiFi Hidden Cameras: What to Buy, Avoid & Check | HiddenCameras.tv"
      description="How WiFi hidden cameras actually connect and record: access point vs router mode, band choice, storage, hardening the defaults, and how to spot one already on your network."
      canonical="https://hiddencameras.tv/wifi-hidden-cameras"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="max-w-5xl mx-auto px-4 py-14">
        <p className="text-brand-green text-xs font-black tracking-[0.24em] uppercase mb-4">Wireless Camera Guide</p>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-5">WiFi Hidden Cameras</h1>
        <p className="text-brand-muted text-lg leading-relaxed max-w-3xl mb-8">
          A wifi camera is really two products: the lens, and the network link you hand it. This
          guide covers the connection — how these units pair, where footage goes, what a default
          configuration leaves open, and how the same connection is what makes one findable.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/mini-spy-cameras" className="card block hover:border-brand-green/50 transition">
            <h2 className="text-white font-black mb-2">Mini WiFi Cameras</h2>
            <p className="text-brand-muted text-sm">Small wireless cameras, setup tradeoffs, and buyer warnings.</p>
          </Link>
          <Link href="/nanny-cam" className="card block hover:border-brand-green/50 transition">
            <h2 className="text-white font-black mb-2">Nanny Cams</h2>
            <p className="text-brand-muted text-sm">Home monitoring cameras for caregivers, pets, and rooms.</p>
          </Link>
          <Link href="/detect-hidden-cameras" className="card block hover:border-brand-green/50 transition">
            <h2 className="text-white font-black mb-2">Detection</h2>
            <p className="text-brand-muted text-sm">How to inspect rentals, hotels, and unfamiliar rooms.</p>
          </Link>
          <Link href="/hidden-camera-laws" className="card block hover:border-brand-green/50 transition">
            <h2 className="text-white font-black mb-2">Legal Rules</h2>
            <p className="text-brand-muted text-sm">Where cameras are allowed, consent, and what is not permitted.</p>
          </Link>
        </div>

        <AdUnit slot="inContent" />

        <section className="prose-dark max-w-none">
          <h2>Two ways a camera joins a network</h2>
          <p>
            Almost every wifi camera works in one of two modes, and which one it uses decides
            everything that follows. In <strong>access point mode</strong> the camera broadcasts
            its own network; you join it with your phone and view the feed directly. There is no
            router, no account and no cloud involved, which makes it simple to start and impossible
            to check on when you are away from the room.
          </p>
          <p>
            In <strong>station mode</strong> the camera joins your router like any other device,
            which is what unlocks remote viewing, push alerts and cloud recording. It also means
            the camera now sits on the same network as your laptop and phone, so its security
            defaults matter as much as yours do. Most units let you choose during setup; plenty of
            cheap ones do not, and default to whichever mode their firmware ships with.
          </p>

          <h2>Where the footage actually goes</h2>
          <p>
            There are three destinations and they fail differently. A <strong>memory card</strong>
            in the camera keeps working when the internet does not, and needs no subscription, but
            the footage walks away with the camera. A <strong>local hub or recorder</strong> keeps
            the card off the camera itself, which is the more robust option where the camera might
            be found. <strong>Cloud storage</strong> survives both of those failures but is usually
            what the subscription pays for, and it stops recording the moment the plan lapses.
          </p>
          <p>
            For anything that matters, check what the camera does when it cannot reach the network:
            some buffer locally and upload later, others simply stop recording at that moment. The
            spec sheet rarely says, and it is the difference between a camera that captured an
            incident during an outage and one that did not.
          </p>

          <h2>Band, range and placement</h2>
          <ul>
            <li>
              <strong>Use 2.4GHz</strong> unless you have a specific reason not to. It passes
              through walls far better than 5GHz, and a camera streaming video needs penetration
              more than it needs speed.
            </li>
            <li>
              <strong>Placement beats specification.</strong> A cheaper camera in a good position
              outperforms an expensive one behind a metal cabinet. Height and angle matter more
              than megapixels for coverage.
            </li>
            <li>
              <strong>Power is the weak link.</strong> A camera that runs off a battery will
              eventually be flat, and hidden units on USB power need somewhere to plug in that does
              not give the position away.
            </li>
            <li>
              <strong>Watch the field of view.</strong> Wide-angle lenses look impressive on the
              box and distort heavily at the edges; decide what has to be legible — a face, a
              number plate, a doorway — before choosing.
            </li>
          </ul>

          <h2>Hardening one before you use it</h2>
          <p>
            The realistic threat to a home camera is not a sophisticated attack, it is a device
            left on its factory settings. Change the default password, set a network name that does
            not describe the camera, install firmware updates when prompted, and — where the router
            supports it — put the camera on a guest network so it cannot see or reach the rest of
            your devices. If you plan to view the feed from outside the house, use the
            manufacturer&apos;s app with two-factor authentication rather than opening a port on
            your router.
          </p>
          <p>
            The reverse of this is how you find one you did not put there: a camera on your network
            shows up in the router&apos;s device list, usually under the manufacturer&apos;s name.
            That check, plus a physical pass of the room, is the cheapest detection there is.
          </p>

          <h2>Frequently asked questions</h2>
          {FAQS.map(({ q, a }) => (
            <div key={q} className="mb-6">
              <h3 className="text-white">{q}</h3>
              <p className="text-gray-400">{a}</p>
            </div>
          ))}

          <p className="text-sm text-gray-500">
            Recording laws apply to wifi cameras the same way they apply to any other camera —
            see the <Link href="/hidden-camera-laws">hidden camera laws guide</Link> before you
            install one somewhere other than your own home.
          </p>
        </section>

        <AdUnit slot="bottom" />
      </section>
    </Layout>
  );
}
