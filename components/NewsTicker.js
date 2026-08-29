"use client";

import { useEffect, useMemo, useState } from "react";

const HC_KEYWORDS = [
  "Ring", "Arlo", "Wyze", "Blink", "Nest", "Eufy", "Reolink", "Hikvision",
  "Airbnb", "FBI", "FTC", "GDPR", "4K", "AI", "privacy", "surveillance",
  "hidden camera", "doorbell", "dash cam", "nanny cam",
];

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightTitle(title) {
  const t = String(title || "");
  if (!t) return t;
  const sorted = [...HC_KEYWORDS].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${sorted.map(escapeRegExp).join("|")})`, "gi");
  const parts = t.split(pattern);
  return parts.map((part, idx) => {
    if (!part) return null;
    const isKw = sorted.some((k) => k.toLowerCase() === part.toLowerCase());
    return isKw ? <span key={idx} className="kw">{part}</span> : <span key={idx}>{part}</span>;
  });
}

const FALLBACKS = [
  { title: "Ring Pro 4 debuts AI facial recognition without cloud processing", url: "/news" },
  { title: "Airbnb bans all indoor hidden cameras worldwide effective April 2026", url: "/news" },
  { title: "EU Surveillance Camera Act now in full effect — 30-day footage limits", url: "/news" },
  { title: "FTC fines spy cam seller $2.1M for marketing covert devices as household objects", url: "/news" },
  { title: "Wyze Cam v5 leak: 4K, local AI, no subscription fees", url: "/news" },
  { title: "Hidden camera detector sales up 340% in 2026 after hotel incidents", url: "/news" },
];

export default function NewsTicker() {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const [pausedMobile, setPausedMobile] = useState(false);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        // Try API route first, fall back to static news.json
        let data = null;
        try {
          const r = await fetch("/api/news", { cache: "no-store" });
          if (r.ok) data = await r.json();
        } catch {}
        if (!data) {
          const r = await fetch("/news.json");
          if (r.ok) data = await r.json();
        }
        if (!alive) return;

        const raw = Array.isArray(data)
          ? data
          : (data?.items || data?.headlines || []);

        const list = raw
          .map((item) => ({
            title: item.title || item.text || item.headline || "",
            url: item.url || item.link || "/news",
          }))
          .filter((i) => i.title)
          .slice(0, 20);

        setItems(list.length ? list : FALLBACKS);

        setReady(false);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (!alive) return;
            setRunKey((k) => k + 1);
            setReady(true);
          });
        });
      } catch {
        if (!alive) return;
        setItems(FALLBACKS);
        setReady(false);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (!alive) return;
            setRunKey((k) => k + 1);
            setReady(true);
          });
        });
      }
    }

    load();
    const t = setInterval(load, 30 * 60 * 1000);
    return () => { alive = false; clearInterval(t); };
  }, []);

  const contentItems = useMemo(() => items.slice(0, 20), [items]);
  const hasItems = contentItems.length > 0;

  return (
    <div className="tickerRoot" aria-label="Security and surveillance news headlines">

      {/* DESKTOP ROW */}
      <div className="desktopRow">
        <span className="label">🔴 SECURITY:</span>
        <div className="viewport">
          {!hasItems ? (
            <div className="idle">&nbsp;</div>
          ) : (
            <div key={runKey} className={`track ${ready ? "run desktopSpeed" : ""}`}>
              <div className="content">
                {contentItems.map((it, i) => (
                  <a key={`${it.url}-${i}`} href={it.url}
                    target={it.url.startsWith("http") ? "_blank" : undefined}
                    rel={it.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="item" title={it.title}>
                    <span className="dot">●</span>
                    <span className="text">{highlightTitle(it.title)}</span>
                  </a>
                ))}
              </div>
              <div className="content" aria-hidden="true">
                {contentItems.map((it, i) => (
                  <a key={`${it.url}-dup-${i}`} href={it.url}
                    target={it.url.startsWith("http") ? "_blank" : undefined}
                    rel={it.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="item" tabIndex={-1} title={it.title}>
                    <span className="dot">●</span>
                    <span className="text">{highlightTitle(it.title)}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE ROW */}
      <div className="mobileRow">
        <div className="mobileLabel">
          <span className="mobileDot">●</span>
          <span className="mobileText">Security News</span>
          <span className="tapHint">{pausedMobile ? "Paused" : "Tap to pause"}</span>
        </div>
        <div className="viewport"
          role="button"
          aria-label="Tap to pause or resume headlines"
          onClick={() => setPausedMobile((p) => !p)}>
          {!hasItems ? (
            <div className="idle">&nbsp;</div>
          ) : (
            <div key={`m-${runKey}`}
              className={`track ${ready ? "run mobileSpeed" : ""} ${pausedMobile ? "paused" : ""}`}>
              <div className="content">
                {contentItems.map((it, i) => (
                  <a key={`${it.url}-m-${i}`} href={it.url}
                    target={it.url.startsWith("http") ? "_blank" : undefined}
                    rel={it.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="item" title={it.title}
                    onClick={(e) => e.stopPropagation()}>
                    <span className="dot">●</span>
                    <span className="text">{highlightTitle(it.title)}</span>
                  </a>
                ))}
              </div>
              <div className="content" aria-hidden="true">
                {contentItems.map((it, i) => (
                  <a key={`${it.url}-m-dup-${i}`} href={it.url}
                    target={it.url.startsWith("http") ? "_blank" : undefined}
                    rel={it.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="item" tabIndex={-1} title={it.title}
                    onClick={(e) => e.stopPropagation()}>
                    <span className="dot">●</span>
                    <span className="text">{highlightTitle(it.title)}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* LINK ROW */}
      <div className="tickerLinkRow">
        <a className="tickerLink" href="/news">Latest security news →</a>
      </div>

      <style jsx>{`
        .tickerRoot {
          width: 100%;
          background: rgba(8,11,13,0.95);
          border-bottom: 1px solid #1f2a44;
          backdrop-filter: blur(10px);
          position: relative;
          z-index: 5;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }

        /* DESKTOP */
        .desktopRow {
          display: flex;
          align-items: center;
          height: 40px;
          padding: 0 16px;
          gap: 12px;
        }
        .label {
          flex: 0 0 auto;
          font-weight: 900;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #ef4444;
          white-space: nowrap;
          line-height: 1;
        }

        /* MOBILE */
        .mobileRow {
          display: none;
          padding: 10px 12px 12px;
        }
        .mobileLabel {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 6px;
        }
        .mobileDot {
          color: #ef4444;
          font-size: 14px;
          line-height: 1;
        }
        .mobileText {
          font-weight: 900;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #ef4444;
        }
        .tapHint {
          margin-left: auto;
          font-size: 11px;
          font-weight: 800;
          color: rgba(255,255,255,.45);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        /* VIEWPORT */
        .viewport {
          flex: 1 1 auto;
          overflow: hidden;
          height: 40px;
          display: flex;
          align-items: center;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          position: relative;
        }
        .viewport::before,
        .viewport::after {
          content: "";
          position: absolute;
          top: 0; bottom: 0;
          width: 44px;
          pointer-events: none;
          z-index: 3;
        }
        .viewport::before {
          left: 0;
          background: linear-gradient(to right, rgba(8,11,13,.95), transparent);
        }
        .viewport::after {
          right: 0;
          background: linear-gradient(to left, rgba(8,11,13,.95), transparent);
        }

        .idle {
          color: rgba(255,255,255,.4);
          font-weight: 600;
          font-size: 13px;
          white-space: nowrap;
        }

        /* TRACK */
        .track {
          display: inline-flex;
          width: max-content;
          white-space: nowrap;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .content {
          display: inline-flex;
          width: max-content;
          align-items: center;
          white-space: nowrap;
        }

        /* SPEEDS — same as SpanishTVShows engine */
        .run.desktopSpeed {
          animation: move 86s linear infinite;
          -webkit-animation: move 86s linear infinite;
        }
        .run.mobileSpeed {
          animation: move 55s linear infinite;
          -webkit-animation: move 55s linear infinite;
        }
        .desktopRow .viewport:hover .run.desktopSpeed {
          animation-play-state: paused;
          -webkit-animation-play-state: paused;
        }
        .paused {
          animation-play-state: paused !important;
          -webkit-animation-play-state: paused !important;
        }

        /* ITEMS */
        .item {
          display: inline-flex;
          align-items: center;
          font-weight: 700;
          font-size: 13px;
          color: rgba(226,232,240,.9);
          text-decoration: none;
          margin-right: 24px;
          line-height: 1.2;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          white-space: nowrap;
        }
        .item:hover { color: #f59e0b; }
        .dot {
          color: #ef4444;
          margin-right: 10px;
          flex: 0 0 auto;
          font-size: 9px;
        }
        .text {
          max-width: 75vw;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: inline-block;
        }
        :global(.kw) {
          color: #f59e0b;
          font-weight: 900;
        }

        /* LINK ROW */
        .tickerLinkRow {
          padding: 5px 16px 8px;
          display: flex;
          justify-content: flex-start;
        }
        .tickerLink {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,.45);
          text-decoration: none;
        }
        .tickerLink:hover { color: #f59e0b; }

        @-webkit-keyframes move {
          0%   { -webkit-transform: translate3d(0, 0, 0); }
          100% { -webkit-transform: translate3d(-50%, 0, 0); }
        }
        @keyframes move {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        @media (max-width: 768px) {
          .desktopRow { display: none; }
          .mobileRow { display: block; }
          .viewport { height: 34px; }
          .item { font-size: 14px; font-weight: 700; }
          .text { max-width: 85vw; }
          .viewport::before, .viewport::after { width: 28px; }
          .tickerLinkRow { padding: 5px 12px 8px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .track { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
