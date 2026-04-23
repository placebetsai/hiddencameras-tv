// ASIN -> Fashionistas.ai product handle map.
// Articles still pass legacy ASINs via props; we transparently route them to
// the closest-matching live product. Unknown ASINs fall back to the generic
// indoor camera so the link is always valid.
const ASIN_TO_HANDLE = {
  // Indoor cams
  B0CGX9GQ3Q: "wireless-1080p-indoor-security-camera", // Blink Mini 2
  B09WZBPX7K: "wireless-1080p-indoor-security-camera", // Ring Indoor Cam 2nd Gen
  B0C7VN19YS: "amcrest-1080p-nanny-pet-wifi-camera",   // Eufy Indoor S350
  B07XTQJ6SH: "amcrest-1080p-nanny-pet-wifi-camera",   // Eufy Indoor 2K
  B0CJ9YX7DG: "mini-wireless-wifi-nanny-cam-palm-size", // Wyze Cam v4
  // Outdoor cams
  B08C5XKWG6: "1080p-ip66-outdoor-wifi-bullet-camera",  // Arlo Pro 4
  // Smart/doorbell/premium
  B0B8QYZRSC: "smart-wireless-video-doorbell-with-night-vision",
  B09NYZGGJD: "smart-wifi-video-doorbell-m7-with-remote-monitoring",
  // Detection / counter-surveillance gear -> closest adjacent product
  B07MFWKM6R: "4k-mini-wifi-pinhole-hidden-camera",
  B08QJ8YZNS: "4k-mini-wifi-pinhole-hidden-camera",
  B078T2R64H: "pocket-pen-hd-hidden-camera",
  B01A7MACL2: "dice-style-hidden-nanny-cam-1080p",
  B09DN27X5N: "pocket-pen-hd-hidden-camera",
  B0BQKH6BYK: "mini-wireless-wifi-nanny-cam-palm-size",
};

const DEFAULT_HANDLE = "wireless-1080p-indoor-security-camera";

function productHref(p) {
  const handle =
    p.handle || ASIN_TO_HANDLE[p.asin] || ASIN_TO_HANDLE[p.a] || DEFAULT_HANDLE;
  return `https://fashionistas.ai/products/${handle}?ref=hiddencameras`;
}

function Stars({ rating }) {
  return (
    <span className="text-yellow-400 text-xs whitespace-nowrap">
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
      <span className="text-gray-600">{"★".repeat(5 - Math.ceil(rating))}</span>
      <span className="text-gray-400 ml-1">{rating}</span>
    </span>
  );
}

export default function ComparisonTable({ products, title }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="mb-10">
      {title && <h2 className="text-xl font-bold text-white mb-4">{title}</h2>}
      <div className="overflow-x-auto rounded-2xl border border-brand-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-brand-surface border-b border-brand-border">
              <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3">Product</th>
              <th className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-3">Rating</th>
              <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-3 hidden sm:table-cell">Key Feature</th>
              <th className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-3">Price</th>
              <th className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-3">Buy</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr
                key={p.asin || p.a || i}
                className={`border-b border-brand-border/50 hover:bg-brand-card/50 transition ${i === 0 ? "bg-brand-green/5" : ""}`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {i === 0 && <span className="text-brand-green text-xs font-bold">#1</span>}
                    {i === 1 && <span className="text-gray-400 text-xs font-bold">#2</span>}
                    {i === 2 && <span className="text-gray-500 text-xs font-bold">#3</span>}
                    {i > 2 && <span className="text-gray-600 text-xs font-bold">#{i + 1}</span>}
                    <span className="text-white font-semibold text-sm">{p.name || p.n}</span>
                  </div>
                </td>
                <td className="px-3 py-3 text-center">
                  <Stars rating={p.rating || p.r_score || 4.3} />
                </td>
                <td className="px-3 py-3 text-gray-400 text-xs hidden sm:table-cell">
                  {p.feature || p.w || p.summary || ""}
                </td>
                <td className="px-3 py-3 text-center">
                  <span className="text-brand-green font-bold text-sm whitespace-nowrap">{p.price || p.p}</span>
                </td>
                <td className="px-3 py-3 text-center">
                  <a
                    href={productHref(p)}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs py-2 px-3 rounded-lg transition whitespace-nowrap"
                  >
                    View Product →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-gray-600 text-xs mt-2">Prices may vary. Products ship from our partner store.</p>
    </div>
  );
}
