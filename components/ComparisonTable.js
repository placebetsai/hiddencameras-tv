const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

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
                    href={`https://www.amazon.com/dp/${p.asin || p.a}?tag=${AMAZON_TAG}`}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs py-2 px-3 rounded-lg transition whitespace-nowrap"
                  >
                    Buy Now
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-gray-600 text-xs mt-2">Prices may vary. As an Amazon Associate we earn from qualifying purchases.</p>
    </div>
  );
}
