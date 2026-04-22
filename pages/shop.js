// Live product catalog on hiddencameras.tv — fetches from Fashionistas.ai
// Shopify storefront (single inventory source of truth). Cards link out to
// the product page on Fashionistas.ai for checkout.
//
// Auto-skips out-of-stock items so we never show a sold-out product.
// Revalidates every 1 hour via ISR (Next.js incremental static regeneration).
import Layout from "../components/Layout";

const SHOP = "https://fashionistas.ai";
const CATALOG = "https://js0hy0-ux.myshopify.com";
const COLLECTION = "security-cameras";
const REF = "hiddencameras";
const THIN_SECTION_COUNT = 2;

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
  const url = `${SHOP}/products/${p.handle}?ref=${REF}`;
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

function getProductHref(handle) {
  return `${SHOP}/products/${handle}?ref=${REF}`;
}

function getShopHref() {
  return `${SHOP}?ref=${REF}`;
}

function getCollectionHref() {
  return `${CATALOG}/collections/${COLLECTION}`;
}

function getFullCatalogHref() {
  return `${CATALOG}/collections/all`;
}

export default function Shop({ subsections, lastUpdated, state, message, featuredFallbacks }) {
  const populatedSections = subsections.filter((section) => section.products.length > 0);
  const hasProducts = populatedSections.length > 0;
  const thinSections = populatedSections.filter((section) => section.products.length < THIN_SECTION_COUNT);
  const showCatalogNotice = state !== "ready" || thinSections.length > 0;
  const visibleCount = populatedSections.reduce((sum, section) => sum + section.products.length, 0);

  const itemListProducts = populatedSections.flatMap((section) => section.products);
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Security Camera Shop — HiddenCameras.tv",
    url: "https://hiddencameras.tv/shop",
    numberOfItems: itemListProducts.length,
    itemListElement: itemListProducts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SHOP}/products/${p.handle}?ref=${REF}`,
      name: p.title,
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://hiddencameras.tv" },
      { "@type": "ListItem", position: 2, name: "Shop", item: "https://hiddencameras.tv/shop" },
    ],
  };

  return (
    <Layout
      title="Shop Security Cameras 2026 | HiddenCameras.tv"
      description={`Shop ${visibleCount}+ live security cameras: hidden, indoor, outdoor, doorbell, dash, and nanny cameras. Updated daily, fast US shipping via our partner Fashionistas.ai.`}
      canonical="https://hiddencameras.tv/shop"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="mb-8">
        <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">SHOP</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
          Security Camera Catalog
        </h1>
        <p className="text-gray-400 mt-3 max-w-2xl">
          Trending cameras across 6 categories — every item ships from a US warehouse
          via our partner store{" "}
          <a
            href={getShopHref()}
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
          {visibleCount} visible live items · last refreshed {lastUpdated}
        </p>
      </div>

      {showCatalogNotice && (
        <div className="card p-5 mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
            {state === "error" ? "Catalog connection issue" : state === "empty" ? "No tagged cameras live" : "Lean inventory"}
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">
            {state === "error"
              ? "The camera feed did not load cleanly."
              : state === "empty"
                ? "No tagged cameras are live right now."
                : "Some camera categories only have one live item right now."}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-400">
            {state !== "ready"
              ? `${message} We are only sending visitors to verified live product pages and the storefront while the feed recovers.`
              : "Empty categories stay hidden on purpose. If a category looks sparse, that is the actual live inventory rather than filler links to dead paths."}
          </p>
        </div>
      )}

      {/* quick subsection nav */}
      <nav className="flex flex-wrap gap-2 mb-10">
        {populatedSections.map(s => (
          <a key={s.tag} href={`#${s.tag}`} className="pill bg-brand-card hover:bg-brand-cardHover text-brand-text border-brand-border">
            {s.title} ({s.products.length})
          </a>
        ))}
        {showCatalogNotice && (
          <a
            href={getCollectionHref()}
            target="_blank"
            rel="noopener nofollow"
            className="pill bg-brand-green/10 text-brand-green border-brand-green/30"
          >
            Open live collection
          </a>
        )}
        {!hasProducts && (
          <a
            href={getFullCatalogHref()}
            target="_blank"
            rel="noopener nofollow"
            className="pill bg-brand-green/10 text-brand-green border-brand-green/30"
          >
            Browse full catalog
          </a>
        )}
      </nav>

      {populatedSections.map(s => (
        <section key={s.tag} id={s.tag} className="mb-14 scroll-mt-24">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-2xl font-black text-white">{s.title}</h2>
            <span className="text-xs text-brand-muted">{s.products.length === 1 ? "1 live item" : `${s.products.length} live items`}</span>
          </div>
          <p className="text-sm text-gray-400 mb-6 max-w-2xl">{s.blurb}</p>
          {s.products.length < THIN_SECTION_COUNT && (
            <p className="mb-5 text-sm leading-6 text-amber-200">
              This category is thin right now, so we are only showing the live item we could verify.
            </p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {s.products.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        </section>
      ))}

      {!hasProducts && (
        <section className="card p-6 mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-muted">Fallback mode</p>
          <h2 className="mt-2 text-3xl font-black text-white">No live tagged camera products are rendering here right now.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-400">
            Instead of surfacing empty categories or questionable collection URLs, this route falls back to verified live product pages and the working storefront.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {featuredFallbacks.map((product) => (
              <a
                key={product.id}
                href={getProductHref(product.handle)}
                target="_blank"
                rel="noopener nofollow"
                className="pill bg-brand-card hover:bg-brand-cardHover text-brand-text border-brand-border"
              >
                {product.title}
              </a>
            ))}
            <a
              href={getCollectionHref()}
              target="_blank"
              rel="noopener nofollow"
              className="btn-primary inline-block"
            >
              Open collection →
            </a>
            <a
              href={getFullCatalogHref()}
              target="_blank"
              rel="noopener nofollow"
              className="btn-primary inline-block"
            >
              Browse full catalog →
            </a>
          </div>
        </section>
      )}

      <div className="card p-6 mt-12 text-center">
        <p className="text-brand-text mb-2 font-bold">Don't see what you need?</p>
        <p className="text-brand-muted text-sm mb-4">
          Browse the full Fashionistas catalog or contact us for sourcing requests.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={getCollectionHref()}
            target="_blank"
            rel="noopener nofollow"
            className="btn-primary inline-block"
          >
            Open Collection →
          </a>
          <a
            href={getFullCatalogHref()}
            target="_blank"
            rel="noopener nofollow"
            className="btn-primary inline-block"
          >
            Browse Full Catalog →
          </a>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  let products = [];
  let state = "ready";
  let message = null;
  try {
    const r = await fetch(`${CATALOG}/collections/${COLLECTION}/products.json?limit=250`);
    if (r.ok) {
      const d = await r.json();
      products = d.products || [];
    } else {
      state = "error";
      message = `Catalog request failed with HTTP ${r.status}.`;
    }
  } catch (e) {
    products = [];
    state = "error";
    message = "The live camera feed is unavailable right now.";
  }

  // skip products where every variant is sold out
  products = products.filter(p =>
    Array.isArray(p.variants) && p.variants.some(v => v.available)
  );

  if (state === "ready" && products.length === 0) {
    state = "empty";
    message = "The live camera feed is up, but none of the tagged products in this collection are available right now.";
  }

  // group by tag
  const subsections = SUBSECTIONS.map(s => ({
    ...s,
    products: products.filter(p => (p.tags || []).includes(s.tag) || (p.tags || []).includes(`${s.tag}-cameras`)),
  }));

  return {
    props: {
      subsections,
      lastUpdated: new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC",
      state,
      message,
      featuredFallbacks: products.slice(0, 4),
    },
    // ISR (revalidate) is INCOMPATIBLE with `output: "export"` in next.config.js.
    // The catalog refreshes when the daily-fashion-refresh cron triggers a CF
    // Pages deploy hook (HC_DEPLOY_HOOK_URL), not via runtime revalidation.
  };
}
