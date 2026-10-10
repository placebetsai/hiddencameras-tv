import Layout from "../components/Layout";
import CameraIcon from "../components/CameraIcon";
import Link from "next/link";

export default function About() {
  return (
    <Layout
      title="About HiddenCameras.tv — Independent Security Camera Reviews"
      description="HiddenCameras.tv is an independent security camera review site. We test cameras, track prices, and help you find the best home security solution."
      canonical="https://hiddencameras.tv/about"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "HiddenCameras.tv",
            url: "https://hiddencameras.tv",
            description: "Independent security camera reviews, buying guides, and live public webcam directory.",
            foundingDate: "2025",
            sameAs: ["https://twitter.com/hiddencameras4u"],
          }),
        }}
      />

      {/* Hero */}
      <div className="text-center mb-12 pt-4">
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full border-2 border-brand-green/30 bg-brand-card flex items-center justify-center">
            <CameraIcon size={48} />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">About HiddenCameras.tv</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Independent reviews. Honest rankings. No manufacturer deals.
        </p>
      </div>

      {/* Mission */}
      <section className="card border-brand-green/20 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Our Mission</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          HiddenCameras.tv exists because most camera review sites are paid placements in disguise. We test cameras ourselves, track prices daily, and give you the same advice we&apos;d give a friend.
        </p>
        <p className="text-gray-300 leading-relaxed">
          We cover everything from $30 budget indoor cameras to $200 wire-free outdoor systems — and we tell you exactly when a premium price tag is worth it and when it isn&apos;t.
        </p>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { n: "6+", label: "Cameras Tested" },
          { n: "20+", label: "Buying Guides" },
          { n: "22+", label: "Live Cam Cities" },
          { n: "100%", label: "Independent" },
        ].map(s => (
          <div key={s.label} className="card text-center py-5">
            <div className="text-2xl font-extrabold text-brand-green">{s.n}</div>
            <div className="text-gray-500 text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* How we review */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-5">How We Review</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: "📦", title: "We Buy the Cameras", body: "Every camera in our reviews is purchased at retail or borrowed from real users — never sent by manufacturers for review." },
            { icon: "🧪", title: "Real-World Testing", body: "We test in actual homes and offices, not controlled lab environments. Night vision, motion alerts, app reliability — all tested over weeks, not hours." },
            { icon: "💰", title: "No Pay-to-Play", body: "Our rankings are never for sale. Affiliate links help fund the site, but they never influence our scores or recommendations." },
            { icon: "📝", title: "Editorial Review", body: "Guides are reviewed for legality, safety, product claims, and whether they help readers protect privacy rather than invade it." },
            { icon: "⚖️", title: "Safety First", body: "We do not endorse illegal recording, voyeurism, harassment, or monitoring people where they expect privacy." },
          ].map(item => (
            <div key={item.title} className="card">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-white mb-2 text-sm">{item.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Affiliate disclosure */}
      <section className="card border-yellow-500/20 mb-8">
        
        <h2 className="text-xl font-bold text-white mb-3">Who runs this site</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          HiddenCameras.tv is run by a small team of researchers and writers, not a camera
          manufacturer and not a retailer. We buy the products we write about with our own money,
          or borrow them from readers and return them afterwards. We do not accept payment for a
          review, and no company can buy a place in a ranking on this site.
        </p>
        <p className="text-gray-300 leading-relaxed mb-3">
          That independence is the whole point. The camera industry spends a great deal on
          marketing language — "police grade", "military spec", "sees in total darkness" — and
          very little on telling you where a product falls short. Somebody has to translate the
          specification sheet into what it actually means in a hallway, a driveway, or a nursery,
          and that translation is the job we do.
        </p>

        <h2 className="text-xl font-bold text-white mb-3">How we choose what to recommend</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          Every category page starts with the same questions: what problem does this camera
          actually solve, what does it need to survive, and where does it fail? We shortlist
          products on published specifications first, then discard the ones that cannot meet the
          practical demands of the category — a trail camera that cannot hold lithium cells
          through a winter, a dash camera with an internal battery that swells behind a hot
          windshield, a doorbell that reboots on a weak transformer.
        </p>
        <p className="text-gray-300 leading-relaxed mb-3">
          What remains is compared on the things owners report back about: reliability over
          months rather than first impressions, whether the app is still maintained, whether the
          storage and subscription costs are reasonable, and whether support exists at all. We
          weigh negative reports heavily. A product with a known failure mode in the second year
          is a worse recommendation than a plainer one that simply works.
        </p>

        <h2 className="text-xl font-bold text-white mb-3">Corrections</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          We get things wrong occasionally, and pricing, specifications, and availability change
          faster than any site can track. If you spot an error, write to us with the page URL and
          what is wrong, and we will correct it and note the date of the change. Corrections are
          not hidden — a page that has been updated to fix a factual error says so.
        </p>

        <h2 className="text-xl font-bold text-white mb-3">What we will not do</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          We do not publish reviews we have not substantiated, we do not accept payment for
          coverage, and we do not recommend a product we would not use ourselves. We also do not
          help anyone use a camera unlawfully: our guides on detection and on recording law exist
          so that people can protect their own privacy, and where a page describes what a device
          can do, it also describes the legal limits that apply to using it.
        </p>

        <h2 className="text-xl font-bold text-white mb-3">Advertising on this site</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          This site carries display advertising and affiliate links. Affiliate links pay us a
          commission if you buy after clicking, at no additional cost to you, and they never
          change what we recommend or where a product appears in a ranking. Display advertising
          is kept away from our editorial recommendations so that ad placement cannot be confused
          with our own picks. Both are disclosed here and on every page that carries them.
        </p>

<h2 className="text-lg font-bold text-white mb-2">Affiliate Disclosure</h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          HiddenCameras.tv is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. When you click our Amazon links and make a purchase, we may earn a small commission at no extra cost to you. This never influences our editorial recommendations.
        </p>
      </section>

      {/* Contact CTA */}
      <div className="card border-brand-green/20 text-center py-8">
        <p className="text-white font-bold mb-2">Questions or partnership inquiries?</p>
        <p className="text-gray-400 text-sm mb-4">Reach us at <a href="mailto:info@hiddencameras.tv" className="text-brand-green hover:underline">info@hiddencameras.tv</a></p>
        <Link href="/contact" className="btn-primary">Contact Us →</Link>
      </div>
    </Layout>
  );
}
