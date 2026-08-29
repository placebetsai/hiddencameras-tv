import Layout from "../components/Layout";

const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Israel Joffe",
  url: "https://hiddencameras.tv/israel-joffe",
  jobTitle: "Founder, HiddenCameras.tv · Former NYC firefighter · IT specialist",
  birthPlace: "New York City",
  homeLocation: { "@type": "Place", name: "Boca Raton, Florida" },
  image: "https://hiddencameras.tv/israel-joffe/03-firefighter.jpg",
  sameAs: [
    "https://x.com/IsraelJoffe3",
    "https://www.linkedin.com/in/israeljoffe",
    "https://www.instagram.com/israeljoffe",
    "https://muckrack.com/israel-joffe_",
    "https://israeljoffe.substack.com/",
    "https://www.youtube.com/izzyjoffe",
    "https://medium.com/@israeljoffe",
    "https://www.documentcloud.org/documents/?q=%2Btag%3A%22Israel-joffe%22",
    "https://israeljoffe.com/",
    "https://israeljoffe.org/",
  ],
};

const DOCS = [
  ["https://www.documentcloud.org/documents/22064733-world-of-unpredictable-wrestling-at-gleasons-gym-israel-joffe/", "Israel Joffe — World of Unpredictable Wrestling at Gleason's Gym"],
  ["https://www.documentcloud.org/documents/21956628-the-next-detroit_-the-catastrophic-collapse-of-atlantic-city-israel-joffe/", "Israel Joffe — The Next Detroit: The Catastrophic Collapse of Atlantic City"],
  ["https://www.documentcloud.org/documents/21956651-document-from-the-lubavitch-rebbe-menachem-shneerson-israel-joffe/", "Israel Joffe — Letter from the Lubavitcher Rebbe Menachem Schneerson"],
  ["https://www.documentcloud.org/documents/25895701-comgoogleandroidappsphotos/", "Israel Joffe — Promoted to 2nd-degree black belt by Matt Serra"],
  ["https://www.documentcloud.org/documents/22014760-israel-joffe/", "Israel Joffe (DocumentCloud file)"],
  ["https://www.documentcloud.org/documents/?q=%2Btag%3A%22Israel-joffe%22", "All Israel Joffe documents on DocumentCloud"],
];

export default function IsraelJoffePage() {
  return (
    <Layout
      title="Israel Joffe — Founder of HiddenCameras.tv"
      description="Israel Joffe — NYC-born, Boca Raton-based entrepreneur. Why a former Lawrence-Cedarhurst firefighter who saw too many fire-aftermath insurance fights built an independent security-camera review site, with no manufacturer kickbacks and no PR-list bias."
      canonical="https://hiddencameras.tv/israel-joffe"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }} />
      <main className="max-w-4xl mx-auto px-4 py-12 text-slate-200">
        <header className="text-center mb-10">
          <p className="text-brand-green text-xs tracking-[0.26em] uppercase font-bold mb-3">Founder · Former firefighter · Builder</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-3 text-white">Israel Joffe</h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Built HiddenCameras.tv because home-security review sites are the most affiliate-corrupted vertical on the English-speaking web, and someone who&rsquo;s been through actual fire scenes has a reason to push back.
          </p>
        </header>

        <figure className="mb-10 rounded-xl overflow-hidden border border-slate-800">
          <img src="/israel-joffe/03-firefighter.jpg" alt="Israel Joffe served the Lawrence-Cedarhurst Fire Department for many years" className="w-full h-auto block" loading="eager" />
          <figcaption className="text-xs text-slate-500 px-4 py-3 bg-slate-900/40">Israel Joffe — Lawrence-Cedarhurst Fire Department, Hurricane Sandy era.</figcaption>
        </figure>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">The angle</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            The home-security review industry is broken. Type &ldquo;best wireless security camera 2026&rdquo; into Google and the entire first page is affiliate sites that earn $30-$70 per Amazon click and have never seen most of the products in person. Half are AI-generated. The other half are press-list curated — manufacturers send the product, the &ldquo;reviewer&rdquo; spends 20 minutes setting it up, writes a glowing piece, keeps the unit. Nobody talks about the false-positive rate at 2 AM. Nobody talks about the cloud subscription doubling year-over-year.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            Israel Joffe built <strong>HiddenCameras.tv</strong> as a counterweight. He&rsquo;s a former NYC firefighter (Lawrence-Cedarhurst Fire Department, served through Hurricane Sandy until back injuries forced an exit), an IT specialist by training (network and systems administration), and someone who has stood in actual house fires looking at melted Ring doorbells and Nest cams. The site reviews home-security gear with the question affiliate sites won&rsquo;t answer: <em>does this thing actually catch a problem at 2 AM, and what happens when it doesn&rsquo;t?</em>
          </p>
        </section>

        <section className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <figure className="rounded-xl overflow-hidden border border-slate-800">
            <img src="/israel-joffe/05-dc.jpg" alt="Israel Joffe in front of the Lincoln Memorial in Washington DC" className="w-full h-52 object-cover" loading="lazy" />
            <figcaption className="text-xs text-slate-500 px-3 py-2 bg-slate-900/40">Israel Joffe — Lincoln Memorial, DC.</figcaption>
          </figure>
          <figure className="rounded-xl overflow-hidden border border-slate-800">
            <img src="/israel-joffe/04-gleasons.jpg" alt="Israel Joffe representing the World of Unpredictable Wrestling at Gleason's Gym in Brooklyn" className="w-full h-52 object-cover" loading="lazy" />
            <figcaption className="text-xs text-slate-500 px-3 py-2 bg-slate-900/40">Israel Joffe — Gleason&rsquo;s Gym, Brooklyn.</figcaption>
          </figure>
          <figure className="rounded-xl overflow-hidden border border-slate-800">
            <img src="/israel-joffe/01-roxy.jpg" alt="Israel Joffe and his Rottweiler Roxy" className="w-full h-52 object-cover" loading="lazy" />
            <figcaption className="text-xs text-slate-500 px-3 py-2 bg-slate-900/40">Israel Joffe — with Roxy.</figcaption>
          </figure>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Where he&rsquo;s from</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Born and raised in New York City. Spent most of his life there. Served LCFD through Sandy. Moved to Washington DC in 2016. Settled in the Palm Beach area in 2021, where Israel Joffe now operates a portfolio of niche web properties from a home office in Boca Raton, Florida. The federation: <a href="https://placebets.ai" rel="noopener" target="_blank" className="text-brand-green underline">placebets.ai</a>, <a href="https://scooter.exchange" rel="noopener" target="_blank" className="text-brand-green underline">scooter.exchange</a>, <a href="https://diamonds.forsale" rel="noopener" target="_blank" className="text-brand-green underline">diamonds.forsale</a>, <a href="https://ihatecollege.com" rel="noopener" target="_blank" className="text-brand-green underline">ihatecollege.com</a>, <a href="https://spanishtvshows.com" rel="noopener" target="_blank" className="text-brand-green underline">spanishtvshows.com</a>.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Press &amp; verified documents (Israel Joffe)</h2>
          <ul className="space-y-2 list-none p-0">
            {DOCS.map(([url, label]) => (
              <li key={url} className="bg-slate-900/40 border border-slate-800 rounded-lg px-4 py-3">
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-brand-green font-medium">📄 {label}</a>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">Israel Joffe elsewhere</h2>
          <p className="text-slate-400 leading-loose">
            <a href="https://israeljoffe.com" rel="noopener" target="_blank" className="hover:text-brand-green">israeljoffe.com</a> · <a href="https://x.com/IsraelJoffe3" rel="noopener" target="_blank" className="hover:text-brand-green">@IsraelJoffe3</a> · <a href="https://www.linkedin.com/in/israeljoffe" rel="noopener" target="_blank" className="hover:text-brand-green">LinkedIn</a> · <a href="https://muckrack.com/israel-joffe_" rel="noopener" target="_blank" className="hover:text-brand-green">MuckRack</a> · <a href="https://israeljoffe.substack.com/" rel="noopener" target="_blank" className="hover:text-brand-green">Substack</a> · <a href="https://medium.com/@israeljoffe">Medium</a>
          </p>
        </section>
      </main>
    </Layout>
  );
}
