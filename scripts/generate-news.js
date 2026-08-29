#!/usr/bin/env node
/**
 * generate-news.js — runs at build time. Fetches Google News RSS for
 * hidden-camera/security-camera topics and writes public/news.json
 * which the NewsTicker component reads at runtime.
 *
 * This works for the static-export build. Daily deploy cron refreshes it.
 */
const fs = require("fs");
const path = require("path");

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

(async () => {
  const query = encodeURIComponent(
    '"hidden camera" OR "security camera" OR "surveillance camera" OR "doorbell camera" OR "nanny cam"',
  );
  const url = `https://news.google.com/rss/search?q=${query}&hl=en-US&gl=US&ceid=US:en`;

  let items = FALLBACK;
  try {
    const res = await fetch(url);
    if (res.ok) {
      const xml = await res.text();
      const parsed = [];
      const blocks = xml.split("<item>").slice(1);
      for (const block of blocks) {
        const tm = block.match(/<title>(?:<!\[CDATA\[)?([^<\]]+)(?:\]\]>)?<\/title>/);
        const lm = block.match(/<link>([^<]+)<\/link>/);
        if (!tm || !lm) continue;
        let title = decodeEntities(tm[1]).replace(/\s+-\s+[^-]+$/, "").trim();
        if (title.length > 110) title = title.slice(0, 107) + "…";
        if (title.length < 10) continue;
        parsed.push({ text: title, url: lm[1].trim() });
        if (parsed.length >= 20) break;
      }
      if (parsed.length) items = parsed;
    }
  } catch (e) {
    console.error("generate-news fetch failed:", e.message);
  }

  const out = { fetchedAt: new Date().toISOString(), items };
  const outPath = path.join(__dirname, "..", "public", "news.json");
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log(`[generate-news] wrote ${items.length} items to ${outPath}`);
})();
