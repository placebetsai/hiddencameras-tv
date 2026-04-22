// EditorPickCard — premium editorial card for Fashionistas camera roundups.
// Tailwind-compatible with HC's dark/red aesthetic. Used by every best-of /
// category page that replaced its Amazon listicle.
//
// Props: p = { handle, title, price, image, badge, blurb }

import Link from "next/link";

const FASHIONISTAS = "https://fashionistas.ai";
const REF = "hiddencameras";

export default function EditorPickCard({ p }) {
  const href = `${FASHIONISTAS}/products/${p.handle}?ref=${REF}`;
  return (
    <article className="card relative overflow-hidden flex flex-col group hover:border-brand-green/40 transition-all">
      <span className="editor-badge">
        {p.badge}
      </span>
      {p.image && (
        <div className="aspect-square bg-brand-bg overflow-hidden">
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-white text-sm font-bold leading-tight mb-2 line-clamp-2">{p.title}</h3>
        <p className="text-gray-400 text-xs leading-5 mb-3 line-clamp-3">{p.blurb}</p>
        <div className="mt-auto flex items-center gap-3">
          <span className="text-brand-green font-black text-lg">${p.price}</span>
          <a
            href={href}
            target="_blank"
            rel="noopener nofollow"
            className="ml-auto bg-brand-green hover:bg-brand-greenDark text-black font-bold text-xs py-2 px-3 rounded-md transition"
          >
            Shop Now &rarr;
          </a>
        </div>
      </div>
    </article>
  );
}

export function EditorPickGrid({ picks }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
      {picks.map((p, i) => (
        <EditorPickCard key={`${p.handle}-${i}`} p={p} />
      ))}
    </div>
  );
}
