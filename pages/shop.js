// Live product catalog on hiddencameras.tv — fetches from Fashionistas.ai
// Shopify storefront (single inventory source of truth). Cards link out to
// the product page on Fashionistas.ai for checkout.
//
// Auto-skips out-of-stock items so we never show a sold-out product.
// Revalidates every 1 hour via ISR (Next.js incremental static regeneration).
import Layout from "../components/Layout";
import Link from "next/link";

const SHOP = "https://fashionistas.ai";
const COLLECTION = "security-cameras";

const SUBSECTIONS = [
  { tag: "hidden",   title: "Hidden Cameras",   blurb: "Pinhole and disguised cams for discreet, lawful indoor use." },
  { tag: "indoor",   title: "Indoor Cameras",   blurb: "Pan-tilt and static WiFi cams for home interiors." },
  { tag: "outdoor",  title: "Outdoor Cameras",  blurb: "Weatherproof IP65/IP66 cams, wired and solar." },
  { tag: "doorbell", title: "Doorbell Cameras", blurb: "Wireless and hardwired video doorbells." },
  { tag: "dash",     title: "Dash Cameras",     blurb: "Single and dual-lens car dashcams with night vision." },
  { tag: "nanny",    title: "Nanny Cameras",    blurb: "Baby and pet monitors with two-way audio." },
];

function ProductCard({ p }) {
  const v = p.variants[0] || {};
  const price = v.price || "?";
  const compareAt = v.compare_at_price && parseFloat(v.compare_at_price) > parseFloat(price) ? v.compare_at_price : null;
  const img = (p.images || [])[0]?.src;
  const url = `${SHOP}/products/${p.handle}?ref=hiddencameras`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener nofollow"
      className="card group relative overflow-hidden hover:border-brand-green/40 transition-all flex flex-col"
    >
      {img && (
        <div className="aspect-square bg-brand-bg overflow-hidden">
          <img
            src={img}
            alt={p.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-white text-sm font-bold leading-tight mb-2 line-clamp-2">{p.title}</h3>
        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-brand-green font-black text-lg">${price}</span>
          {compareAt && (
            <span className="text-brand-muted text-xs line-through">${compareAt}</span>
          )}
          <span className="ml-auto text-[10px] text-brand-muted uppercase tracking-wider">View →</span>
        </div>
      </div>
    </a>
  );
}

export default function Shop({ subsections, totalCount, lastUpdated }) {
  return (
    <Layout
      title="Security Camera Shop — Buy Hidden, Outdoor, Doorbell & Dash Cams | HiddenCameras.tv"
      description={`Shop ${totalCount}+ trending security cameras: hidden, indoor, outdoor, doorbell, dash, and nanny cameras. Updated daily, fast US shipping via our partner Fashionistas.ai.`}
      canonical="https://hiddencameras.tv/shop"
    >
      <div className="mb-8">
        <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">SHOP</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
          Security Camera Catalog
        </h1>
        <p className="text-gray-400 mt-3 max-w-2xl">
          Trending cameras across 6 categories — every item ships from a US warehouse
          via our partner store{" "}
          <a
            href={`${SHOP}/collections/security-cameras?ref=hiddencameras`}
            target="_blank"
            rel="noopener nofollow"
            className="text-brand-green underline hover:text-brand-greenDark"
          >
            Fashionistas.ai
          </a>
          . Tap any product to view details and check out. Inventory is synced live;
          sold-out items are hidden automatically.
        </p>
        <p className="text-xs text-brand-muted mt-2">
          {totalCount} products in stock · last refreshed {lastUpdated}
        </p>
      </div>

      {/* quick subsection nav */}
      <nav className="flex flex-wrap gap-2 mb-10">
        {subsections.filter(s => s.products.length > 0).map(s => (
          <a key={s.tag} href={`#${s.tag}`} className="pill bg-brand-card hover:bg-brand-cardHover text-brand-text border-brand-border">
            {s.title} ({s.products.length})
          </a>
        ))}
      </nav>

      {subsections.map(s => s.products.length === 0 ? null : (
        <section key={s.tag} id={s.tag} className="mb-14 scroll-mt-24">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-2xl font-black text-white">{s.title}</h2>
            <span className="text-xs text-brand-muted">{s.products.length} in stock</span>
          </div>
          <p className="text-sm text-gray-400 mb-6 max-w-2xl">{s.blurb}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {s.products.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        </section>
      ))}

      <div className="card p-6 mt-12 text-center">
        <p className="text-brand-text mb-2 font-bold">Don't see what you need?</p>
        <p className="text-brand-muted text-sm mb-4">
          Browse the full Fashionistas catalog or contact us for sourcing requests.
        </p>
        <a
          href={`${SHOP}?ref=hiddencameras`}
          target="_blank"
          rel="noopener nofollow"
          className="btn-primary inline-block"
        >
          Browse Full Catalog →
        </a>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  let products = [];
  try {
    const r = await fetch(`${SHOP}/collections/${COLLECTION}/products.json?limit=250`);
    if (r.ok) {
      const d = await r.json();
      products = d.products || [];
    }
  } catch (e) {
    products = [];
  }

  // skip products where every variant is sold out
  products = products.filter(p =>
    Array.isArray(p.variants) && p.variants.some(v => v.available)
  );

  // group by tag
  const subsections = SUBSECTIONS.map(s => ({
    ...s,
    products: products.filter(p => (p.tags || []).includes(s.tag) || (p.tags || []).includes(`${s.tag}-cameras`)),
  }));

  return {
    props: {
      subsections,
      totalCount: products.length,
      lastUpdated: new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC",
    },
    revalidate: 3600,  // refresh hourly
  };
}
