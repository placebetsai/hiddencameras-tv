import Layout from "../components/Layout";

export default function EditorialPolicy() {
  return (
    <Layout
      title="Editorial Policy — HiddenCameras.tv"
      description="How HiddenCameras.tv writes, sources and updates its security camera reviews, buyer guides and surveillance law coverage."
      canonical="https://hiddencameras.tv/editorial-policy"
    >
      <h1 className="text-2xl font-bold text-white mb-6">Editorial Policy</h1>
      <div className="prose-dark max-w-none text-sm leading-relaxed">
        <p className="text-gray-400 mb-6"><strong>Last Updated:</strong> October 15, 2026</p>

        <h2>What we publish</h2>
        <p>
          HiddenCameras.tv covers security cameras, video doorbells, nanny cams, dashcams,
          camera detectors, live public webcams, and the laws around recording. Every article is
          written for readers first: what the product actually does, who it suits, and what to
          check before you buy.
        </p>

        <h2>How we source product information</h2>
        <p>
          Product specifications, model numbers, prices, and availability come from the
          manufacturer and the retailer&apos;s own product page, and they change often. When a
          guide names a price it is a snapshot, not a guarantee — always confirm the current price
          on the retailer&apos;s page before buying. If we get something wrong, we correct it.
        </p>

        <h2>How we make money</h2>
        <p>
          The site is funded by display advertising. Product links take you to the retailer&apos;s
          own page, where the retailer sets prices, stock, and delivery. We do not accept payment
          for rankings, scores, or inclusion in a guide, and no advertiser sees or approves our
          copy before it publishes.
        </p>

        <h2>Corrections</h2>
        <p>
          Found a broken link, a wrong model number, or an outdated law summary? Use the contact
          page and we will fix or remove it. Guides are re-checked on a rolling basis and the
          date at the top of each page shows when it was last updated.
        </p>

        <h2>No professional advice</h2>
        <p>
          Our law and privacy explainers are general education for a US audience, not legal
          advice. Surveillance law differs by state, country, and property type — check the
          actual statute or talk to a lawyer before you record.
        </p>
      </div>
    </Layout>
  );
}
