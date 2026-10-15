import AdUnit from "../components/AdUnit";
import Layout from "../components/Layout";
import Link from "next/link";

const FAQS = [
  {
    q: "Is it legal to put a hidden camera in my own home?",
    a: "In your own home you generally may place a camera where you have a legitimate reason to, but not where anyone has a reasonable expectation of privacy — bathrooms, changing areas, and a guest's bedroom are off limits in every state. Video and audio are treated separately: recording a private conversation is often more restricted than recording video, so consent rules still apply.",
  },
  {
    q: "Can my landlord put hidden cameras in my apartment?",
    a: "No. A landlord cannot place cameras inside a rental unit, and doing so is treated as an illegal search or invasion of privacy in every state. Cameras in shared areas such as hallways, lobbies, elevators and parking lots are more often permitted, but disclosure is required in many states and leases commonly have to say so in writing.",
  },
  {
    q: "What are the penalties for illegal hidden cameras?",
    a: "It depends entirely on the state and the circumstances: offences are charged as misdemeanours or felonies, with fines, jail time and a sex-offence conviction possible in the most serious cases. Federal law (18 U.S.C. §1801) also addresses video voyeurism in places under federal jurisdiction. If you are documenting a violation, keep the evidence and report it to local police first.",
  },
  {
    q: "Do two-party consent states require permission before I record at home?",
    a: "In states commonly listed as all-party consent — California, Connecticut, Florida, Illinois, Maryland, Massachusetts, Montana, New Hampshire, Pennsylvania and Washington — everyone in a private conversation must agree to it. The rest of the country is generally one-party consent, where any participant may record. Whether a camera in a shared room counts as a private conversation is a question for a lawyer in your state.",
  },
  {
    q: "Are hidden cameras allowed in Airbnbs and hotels?",
    a: "Undisclosed cameras are not. Airbnb's rules prohibit cameras in private spaces such as bathrooms and bedrooms, and require any permitted camera in a living area to be disclosed before booking. Hotels have the same expectation of privacy in the room you paid for. If you find an undisclosed device, photograph it where it sits, report it to the platform or property, and involve police if you believe you were recorded.",
  },
  {
    q: "Can an employer watch staff with cameras?",
    a: "Employers can normally use cameras in common work areas, but bathrooms, changing rooms and break areas with an expectation of privacy are generally off limits, and several states require notice. Cameras that capture audio run into stricter rules because of two-party consent laws.",
  },
];

export default function Page() {
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
      title="Hidden Camera Laws by State (2026) — Legal Guide — HiddenCameras.tv"
      description="What US law says about hidden cameras: one-party vs all-party consent states, where cameras are prohibited, landlord and rental rules, and what to do if you find one."
      canonical="https://hiddencameras.tv/hidden-camera-laws"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">LEGAL GUIDE</div>

      <AdUnit slot="inContent" />

      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
        Hidden Camera Laws by State (2026)
      </h1>
      <p className="text-gray-400 mb-8 max-w-2xl">
        Where a camera may be placed, who has to consent to being recorded, what landlords and
        platforms allow, and what to do when you find a device you did not agree to.
      </p>

      <div className="card border-yellow-500/20 mb-8">
        <p className="text-gray-300 text-sm leading-relaxed">
          This legal guide is informational only and is not legal advice. Laws change and
          local rules can differ. Confirm current requirements with an attorney or official
          state source before installing or using any recording device.
        </p>
      </div>

      <section className="prose-dark max-w-none">
        <p>
          Two separate questions decide whether a hidden camera is legal: <strong>where you put
          it</strong>, and <strong>whether the people it captures have to consent</strong>. Video
          and audio are usually treated as different things under the law, which is why a camera
          that is perfectly lawful on its own can become a problem the moment it also records
          sound.
        </p>

        <h2>One-party consent vs all-party consent</h2>
        <p>
          Consent rules govern recording conversations, not simply pointing a lens. In a
          <strong> one-party consent</strong> state, anyone taking part in the conversation may
          record it without telling anyone else. In an <strong>all-party consent</strong> state,
          every person in that conversation has to agree first — and a hidden camera that records
          audio in a private conversation will usually fall inside that rule.
        </p>
        <p>
          The states commonly listed as all-party consent are California, Connecticut, Florida,
          Illinois, Maryland, Massachusetts, Montana, New Hampshire, Pennsylvania and Washington.
          The remaining states are generally one-party consent. Territory, exceptions and the
          definitions of "private conversation" differ, so treat that list as a starting point
          rather than a ruling.
        </p>
        <ul>
          <li>
            <strong>One-party consent:</strong> you may record a conversation you are part of.
            Placing a camera in a shared family or work space is usually assessed on privacy
            expectations rather than consent.
          </li>
          <li>
            <strong>All-party consent:</strong> anyone recorded in a private conversation must
            agree. Audio capture is the usual tripwire — video alone is often treated more
            permissively.
          </li>
          <li>
            <strong>Never permitted:</strong> cameras in bathrooms, changing rooms, fitting rooms,
            or any area where a person has a reasonable expectation of privacy, regardless of
            which consent category your state uses.
          </li>
        </ul>

        <h2>Where cameras are allowed in a home</h2>
        <p>
          Owners and tenants can generally record in the common parts of a home they control —
          entrances, hallways, driveways — where there is no expectation of privacy. The line is
          drawn at rooms used for dressing, bathing or sleeping, and at a guest's bedroom. A camera
          aimed at a neighbour's property, a public street or a shared garden raises a separate
          question of trespass and harassment that consent rules do not resolve.
        </p>
        <p>
          Landlords are in a different position: cameras inside a rental unit are not allowed, and
          cameras in shared building areas normally require clear notice — often written into the
          lease. Tenants who suspect an undisclosed device should ask for the location of every
          camera in writing before doing anything else.
        </p>

        <h2>Rentals, hotels and short stays</h2>
        <p>
          Platform rules are stricter than most statutes. Airbnb prohibits cameras in private
          spaces such as bathrooms and bedrooms and requires anything permitted in a living area
          to be disclosed before booking; undisclosed devices are grounds for removal from the
          platform. Hotels carry the same expectation for the room you paid for, and a service
          camera left running behind a television or smoke detector is a common complaint.
        </p>
        <p>
          If you find one, photograph it in place, do not touch it, report it to the property or
          platform, and contact local police if you believe recording actually took place. Saving
          the listing text and the host's messages matters — whether the device was disclosed is
          often the whole case.
        </p>

        <h2>Workplaces and shared housing</h2>
        <p>
          Employers can normally cover entrances, shop floors and reception areas, but bathrooms,
          changing rooms and some break areas are off limits, and several states require staff to
          be told in advance. Landlords, housemates and family members are all covered by the same
          expectation of privacy in the private parts of a home — sharing a lease does not remove
          it.
        </p>

        <h2>What to do if you find a camera</h2>
        <ul>
          <li>Photograph and video the device exactly where it is, including its position in the room.</li>
          <li>Do not unplug or move it — the location is often what matters.</li>
          <li>Save the booking, lease or message thread that relates to the space.</li>
          <li>Report it to the platform, host or property manager in writing.</li>
          <li>Go to police if you have reason to believe you were recorded, especially with audio.</li>
        </ul>

        <h2>Frequently asked questions</h2>
        {FAQS.map(({ q, a }) => (
          <div key={q} className="mb-6">
            <h3 className="text-white">{q}</h3>
            <p className="text-gray-400">{a}</p>
          </div>
        ))}

        <p className="text-sm text-gray-500">
          Last reviewed for the 2026 legal cycle. Consent categories and penalty ranges change
          between sessions — check your own state statute before relying on any summary here.{" "}
          <Link href="/editorial-policy" className="underline">
            How we review our guides
          </Link>
          .
        </p>
      </section>

      <p className="text-xs text-gray-600 mt-8">
        Prices and availability are set by the retailer.{" "}
        <Link href="/privacy" className="underline">
          Privacy
        </Link>
        .
      </p>
    </Layout>
  );
}
