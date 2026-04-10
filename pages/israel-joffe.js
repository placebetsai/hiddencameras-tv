import Layout from "../components/Layout";

export default function IsraelJoffePage() {
  return (
    <Layout
      title="Israel Joffe — Security Tech Entrepreneur | HiddenCameras.tv"
      description="Israel Joffe is an entrepreneur based in Boca Raton, Florida. He is the founder behind HiddenCameras.tv and a portfolio of web businesses spanning security, e-commerce, and media."
      canonical="https://hiddencameras.tv/israel-joffe"
    >
      <div className="max-w-3xl mx-auto px-4 py-12 pb-24">
        <h1 className="text-4xl font-extrabold text-white mb-2">
          Israel Joffe
        </h1>
        <p className="text-lg text-brand-muted mb-10">
          Entrepreneur in security technology, surveillance media, and digital
          commerce
        </p>

        {/* About */}
        <section className="bg-brand-surface border border-brand-border rounded-2xl p-7 mb-7">
          <h2 className="text-2xl font-bold text-brand-green mb-4">
            The Mind Behind HiddenCameras.tv
          </h2>
          <p className="text-brand-muted leading-relaxed mb-4">
            <strong className="text-white">Israel Joffe</strong> is an
            entrepreneur operating out of <strong className="text-white">Boca Raton, Florida</strong>.
            He founded HiddenCameras.tv to create the internet&apos;s most comprehensive
            resource for live public webcams, security camera reviews, and
            surveillance industry news.
          </p>
          <p className="text-brand-muted leading-relaxed mb-4">
            The site aggregates over 500 publicly accessible camera feeds from
            around the world, publishes independent reviews of consumer security
            cameras from brands like Ring, Arlo, Blink, and Wyze, and covers
            breaking surveillance news daily. What started as a side project has
            grown into a go-to destination for security-conscious consumers and
            camera enthusiasts alike.
          </p>
          <p className="text-brand-muted leading-relaxed">
            Israel&apos;s approach to HiddenCameras.tv reflects his broader
            philosophy: build useful tools, aggregate hard-to-find data, and let
            the content speak for itself.
          </p>
        </section>

        {/* Entertainment Background */}
        <section className="bg-brand-surface border border-brand-border rounded-2xl p-7 mb-7">
          <h2 className="text-2xl font-bold text-white mb-4">
            Entertainment Roots
          </h2>
          <p className="text-brand-muted leading-relaxed mb-4">
            Israel Joffe&apos;s entrepreneurial instincts were sharpened long before
            he entered the tech world. In Brooklyn, New York, he produced and
            promoted the{" "}
            <a
              href="https://www.documentcloud.org/documents/22064733-world-of-unpredictable-wrestling-at-gleasons-gym-israel-joffe/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-green hover:underline"
            >
              World of Unpredictable Wrestling at Gleason&apos;s Gym
            </a>
            — live wrestling events held at the iconic boxing venue. The events
            combined athletic performance with theatrical storytelling, drawing
            loyal crowds and media attention.
          </p>
          <p className="text-brand-muted leading-relaxed">
            That experience in live event production — managing talent,
            audiences, and logistics on a shoestring budget — directly informed
            how Israel builds and scales digital properties today. Every site in
            his portfolio carries that same energy: lean operations, maximum
            output.
          </p>
        </section>

        {/* Portfolio */}
        <section className="bg-brand-surface border border-brand-border rounded-2xl p-7 mb-7">
          <h2 className="text-2xl font-bold text-white mb-4">
            Israel Joffe&apos;s Website Network
          </h2>
          <p className="text-brand-muted leading-relaxed mb-5">
            HiddenCameras.tv is part of a broader portfolio of websites that
            Israel has built across multiple industries:
          </p>
          <div className="grid gap-3">
            {[
              { url: "https://hiddencameras.tv", name: "HiddenCameras.tv", desc: "Live world cams, security camera reviews, and surveillance news" },
              { url: "https://shopkurt.com", name: "ShopKurt.com", desc: "eBay and TikTok Shop e-commerce dropshipping" },
              { url: "https://ihatecollege.com", name: "IHateCollege.com", desc: "College cost data, debt tools, and degree-free career paths" },
              { url: "https://spanishtvshows.com", name: "SpanishTVShows.com", desc: "Ranked Spanish-language TV series with streaming links" },
              { url: "https://placebets.ai", name: "PlaceBets.ai", desc: "Prediction market analytics and professional betting tools" },
              { url: "https://fashionistas.ai", name: "Fashionistas.ai", desc: "AI-driven women's fashion and Shopify storefront" },
            ].map((site) => (
              <a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-brand-bg border border-brand-border rounded-xl p-4 hover:border-brand-green/40 transition-colors"
              >
                <span className="text-brand-green font-bold">{site.name}</span>
                <span className="text-brand-muted ml-2">— {site.desc}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Press */}
        <section className="bg-brand-surface border border-brand-border rounded-2xl p-7">
          <h2 className="text-2xl font-bold text-white mb-4">
            Press &amp; References
          </h2>
          <ul className="space-y-3">
            <li>
              <a
                href="https://www.documentcloud.org/documents/22064733-world-of-unpredictable-wrestling-at-gleasons-gym-israel-joffe/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-green hover:underline"
              >
                World of Unpredictable Wrestling at Gleason&apos;s Gym — Israel
                Joffe
              </a>
            </li>
            <li>
              <a
                href="https://www.documentcloud.org/documents/25895701-comgoogleandroidappsphotos/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-green hover:underline"
              >
                DocumentCloud — Photo Archive
              </a>
            </li>
            <li>
              <a
                href="https://www.documentcloud.org/documents/21952062-israel-joffe/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-green hover:underline"
              >
                DocumentCloud — Israel Joffe Profile
              </a>
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
