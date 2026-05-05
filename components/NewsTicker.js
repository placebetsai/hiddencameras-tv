"use client";

import { useEffect, useMemo, useState } from "react";

const FALLBACK_HEADLINES = [
  { id: "fallback-1", text: "Hidden cameras, surveillance, and home security coverage", url: "/news" },
  { id: "fallback-2", text: "Security camera reviews, privacy guides, and live camera updates", url: "/reviews" },
  { id: "fallback-3", text: "Learn where cameras are legal, useful, and worth the money", url: "/hidden-camera-laws" },
];

export default function NewsTicker() {
  const [mounted, setMounted] = useState(false);
  const [headlines, setHeadlines] = useState(FALLBACK_HEADLINES);
  const [pausedMobile, setPausedMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("/news.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const items = (data?.items || [])
          .map((item, index) => ({
            id: item.id || item.url || `news-${index}`,
            text: item.text || item.title,
            url: item.url || "/news",
          }))
          .filter((item) => item.text);
        if (items.length) setHeadlines(items);
      })
      .catch(() => {});
  }, []);

  const trackItems = useMemo(() => [...headlines, ...headlines], [headlines]);

  if (!mounted) return null;

  return (
    <div className="hc-ticker" aria-label="Hidden camera and security news">
      <div className="hc-ticker__label" aria-hidden="true">
        <span className="hc-ticker__dot" />
        <span className="hc-ticker__label-full">CAM NEWS</span>
        <span className="hc-ticker__label-short">CAM</span>
      </div>
      <div className="hc-ticker__viewport" onClick={() => setPausedMobile((p) => !p)}>
        <div className={`hc-ticker__track ${pausedMobile ? "is-paused" : ""}`}>
          {trackItems.map((item, index) => (
            <a
              key={`${item.id}-${index}`}
              href={item.url}
              target={item.url.startsWith("http") ? "_blank" : undefined}
              rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
              className="hc-ticker__item"
              aria-hidden={index >= headlines.length ? "true" : undefined}
              tabIndex={index >= headlines.length ? -1 : undefined}
              onClick={(event) => event.stopPropagation()}
            >
              <span className="hc-ticker__bullet" aria-hidden="true">●</span>
              <span className="hc-ticker__text">{item.text}</span>
              <span className="hc-ticker__sep" aria-hidden="true">•</span>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hc-ticker {
          display: flex;
          align-items: stretch;
          width: 100%;
          min-height: 34px;
          background: #0a0e12;
          border-bottom: 1px solid #1f2937;
          overflow: hidden;
        }
        .hc-ticker__label {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 0 12px;
          background: #dc2626;
          color: #fff;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.8px;
          line-height: 1;
        }
        .hc-ticker__dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #fff;
          flex-shrink: 0;
        }
        .hc-ticker__label-short { display: none; }
        .hc-ticker__viewport {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          cursor: pointer;
          mask-image: linear-gradient(to right, transparent, #000 24px, #000 calc(100% - 44px), transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, #000 24px, #000 calc(100% - 44px), transparent);
        }
        .hc-ticker__track {
          display: inline-flex;
          align-items: center;
          width: max-content;
          white-space: nowrap;
          min-height: 34px;
          animation: hc-scroll 58s linear infinite;
          will-change: transform;
        }
        .hc-ticker__track.is-paused,
        .hc-ticker__viewport:hover .hc-ticker__track {
          animation-play-state: paused;
        }
        .hc-ticker__item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0 18px;
          color: #d1d5db;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          flex-shrink: 0;
        }
        .hc-ticker__item:hover { color: #22c55e; }
        .hc-ticker__bullet {
          color: #ef4444;
          font-size: 10px;
        }
        .hc-ticker__sep {
          color: #374151;
          font-weight: 900;
          margin-left: 6px;
        }
        @keyframes hc-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hc-ticker__track { animation: none; }
        }
        @media (max-width: 640px) {
          .hc-ticker { min-height: 34px; }
          .hc-ticker__label {
            padding: 0 9px;
            gap: 5px;
            font-size: 9px;
            letter-spacing: 1.2px;
          }
          .hc-ticker__dot {
            width: 5px;
            height: 5px;
          }
          .hc-ticker__label-full { display: none; }
          .hc-ticker__label-short { display: inline; }
          .hc-ticker__viewport {
            mask-image: linear-gradient(to right, transparent, #000 14px, #000 calc(100% - 24px), transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, #000 14px, #000 calc(100% - 24px), transparent);
          }
          .hc-ticker__track {
            min-height: 34px;
            animation-duration: 42s;
          }
          .hc-ticker__item {
            font-size: 11px;
            padding: 0 12px;
            gap: 6px;
          }
        }
      `}</style>
    </div>
  );
}
