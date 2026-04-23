"use client";
import { useEffect, useState } from "react";

// Fetches news.json (built at deploy time by scripts/generate-news.js).
// Shows fallback until fetch completes so SSG output has content.
const FALLBACK_HEADLINES = [
  { text: "Hidden cameras, surveillance, and home security coverage", url: "/news" },
];

export default function NewsTicker() {
  const [headlines, setHeadlines] = useState(FALLBACK_HEADLINES);

  useEffect(() => {
    fetch("/news.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.items?.length) setHeadlines(data.items);
      })
      .catch(() => {});
  }, []);

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
          <div className="ticker-track" style={{ display: "flex", alignItems: "center", height: "100%", width: "max-content" }}>
            {[...headlines, ...headlines].map((h, i) => (
              <a key={i} href={h.url} target="_blank" rel="noopener noreferrer"
                aria-hidden={i >= headlines.length ? "true" : undefined}
                tabIndex={i >= headlines.length ? -1 : undefined}
                className="text-gray-300 text-xs whitespace-nowrap hover:text-brand-green transition-colors duration-150 group flex-shrink-0">
                <span className="text-red-500 mr-1.5 text-[10px]">●</span>
                <span className="group-hover:underline underline-offset-2">{h.text}</span>
                <span className="text-brand-border mx-5">·</span>
              </a>
            ))}
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
