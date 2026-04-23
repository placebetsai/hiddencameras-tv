// Server component — fetches live news from Google News RSS hourly.
// Was previously hardcoded with invented headlines. Now pulls real stories
// about hidden cameras, security cameras, and surveillance from live sources.

export const revalidate = 3600; // rebuild hourly

const FALLBACK = [
  { text: "Hidden cameras, surveillance, and home security coverage", url: "/news" },
];

function decodeEntities(s) {
  return (s || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)));
}

async function fetchNews() {
  const query = encodeURIComponent(
    '"hidden camera" OR "security camera" OR "surveillance camera" OR "doorbell camera" OR "nanny cam"',
  );
  const url = `https://news.google.com/rss/search?q=${query}&hl=en-US&gl=US&ceid=US:en`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return FALLBACK;
    const xml = await res.text();
    const items = [];
    const itemBlocks = xml.split("<item>").slice(1);
    for (const block of itemBlocks) {
      const tm = block.match(/<title>(?:<!\[CDATA\[)?([^<\]]+)(?:\]\]>)?<\/title>/);
      const lm = block.match(/<link>([^<]+)<\/link>/);
      if (!tm || !lm) continue;
      let title = decodeEntities(tm[1]).replace(/\s+-\s+[^-]+$/, "").trim();
      if (title.length > 110) title = title.slice(0, 107) + "…";
      if (title.length < 10) continue;
      items.push({ text: title, url: lm[1].trim() });
      if (items.length >= 20) break;
    }
    return items.length ? items : FALLBACK;
  } catch {
    return FALLBACK;
  }
}

export default async function NewsTicker() {
  const headlines = await fetchNews();

  return (
    <div className="bg-[#0a0e12] border-b border-brand-border" style={{ minHeight: "34px" }}>
      {/* Desktop: single row */}
      <div className="hidden sm:flex items-center h-[34px] relative">
        <div className="shrink-0 flex items-center gap-1.5 bg-red-600 px-3 h-full z-10 select-none">
          <span className="live-dot w-1.5 h-1.5 rounded-full bg-white inline-block" />
          <span className="text-white text-[10px] font-extrabold tracking-widest whitespace-nowrap">CAM NEWS</span>
        </div>
        <div className="overflow-hidden flex-1 relative h-full">
          <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #0a0e12, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #0a0e12 30%, transparent)" }} />
          <div className="ticker-wrap absolute inset-y-0 left-0 right-0 flex items-center">
            <div className="ticker-scroll flex items-center shrink-0">
              {headlines.map((h, i) => (
                <a key={i} href={h.url} target="_blank" rel="noopener noreferrer"
                  className="text-gray-300 text-xs whitespace-nowrap hover:text-brand-green transition-colors duration-150 group flex-shrink-0">
                  <span className="text-red-500 mr-1.5 text-[10px]">●</span>
                  <span className="group-hover:underline underline-offset-2">{h.text}</span>
                  <span className="text-brand-border mx-5">·</span>
                </a>
              ))}
            </div>
            <div className="ticker-scroll flex items-center shrink-0" aria-hidden="true">
              {headlines.map((h, i) => (
                <a key={`dup-${i}`} href={h.url} tabIndex={-1} target="_blank" rel="noopener noreferrer"
                  className="text-gray-300 text-xs whitespace-nowrap hover:text-brand-green transition-colors duration-150 group flex-shrink-0">
                  <span className="text-red-500 mr-1.5 text-[10px]">●</span>
                  <span className="group-hover:underline underline-offset-2">{h.text}</span>
                  <span className="text-brand-border mx-5">·</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="sm:hidden flex items-center h-[34px]">
        <div className="shrink-0 flex items-center gap-1 bg-red-600 px-2 h-full">
          <span className="live-dot w-1 h-1 rounded-full bg-white inline-block" />
          <span className="text-white text-[9px] font-extrabold tracking-wider">CAM</span>
        </div>
        <div className="flex-1 overflow-hidden px-3">
          <div className="ticker-scroll-mobile flex items-center">
            {headlines.map((h, i) => (
              <a key={i} href={h.url} target="_blank" rel="noopener noreferrer"
                className="text-gray-300 text-[11px] whitespace-nowrap mr-8 flex-shrink-0">
                <span className="text-red-500 mr-1">●</span>
                {h.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
