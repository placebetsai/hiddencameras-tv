#!/usr/bin/env node
/**
 * generate-sitemap.js
 * Generates sitemap.xml from static pages + article JSON files.
 * Run during build or as a standalone script.
 */
const fs = require("fs");
const path = require("path");

const BASE = "https://hiddencameras.tv";

const STATIC_PAGES = [
  { url: "/", priority: "1.0", changefreq: "daily" },
  { url: "/reviews/", priority: "0.9", changefreq: "weekly" },
  { url: "/blog/", priority: "0.9", changefreq: "daily" },
  { url: "/live/", priority: "0.8", changefreq: "hourly" },
  { url: "/best-hidden-cameras-airbnb/", priority: "0.8", changefreq: "weekly" },
  { url: "/best-hidden-cameras/", priority: "0.8", changefreq: "weekly" },
  { url: "/best-hidden-cameras-2026/", priority: "0.9", changefreq: "weekly" },
  { url: "/hidden-cameras/", priority: "0.95", changefreq: "weekly" },
  { url: "/wifi-hidden-cameras/", priority: "0.9", changefreq: "weekly" },
  { url: "/hidden-camera-detectors/", priority: "0.9", changefreq: "weekly" },
  { url: "/israel-joffe/", priority: "0.5", changefreq: "monthly" },
  { url: "/history-of-hidden-cameras/", priority: "0.8", changefreq: "monthly" },
  { url: "/detect-hidden-cameras/", priority: "0.8", changefreq: "monthly" },
  { url: "/hidden-camera-laws/", priority: "0.8", changefreq: "monthly" },
  { url: "/news/", priority: "0.7", changefreq: "daily" },
  { url: "/shop/", priority: "0.9", changefreq: "daily" },
  // Category pages
  { url: "/nanny-cam/", priority: "0.8", changefreq: "weekly" },
  { url: "/doorbell-cameras/", priority: "0.8", changefreq: "weekly" },
  { url: "/outdoor-security-cameras/", priority: "0.8", changefreq: "weekly" },
  { url: "/indoor-security-cameras/", priority: "0.8", changefreq: "weekly" },
  { url: "/spy-cameras/", priority: "0.8", changefreq: "weekly" },
  { url: "/mini-spy-cameras/", priority: "0.8", changefreq: "weekly" },
  { url: "/wireless-security-cameras/", priority: "0.8", changefreq: "weekly" },
  { url: "/pet-cameras/", priority: "0.8", changefreq: "weekly" },
  { url: "/car-cameras/", priority: "0.8", changefreq: "weekly" },
  { url: "/body-cameras/", priority: "0.8", changefreq: "weekly" },
  { url: "/trail-cameras/", priority: "0.8", changefreq: "weekly" },
  // New high-value content pages (April 2026)
  { url: "/how-to-detect-hidden-cameras-airbnb/", priority: "0.9", changefreq: "monthly" },
  { url: "/ring-vs-blink/", priority: "0.8", changefreq: "monthly" },
  { url: "/ring-vs-arlo/", priority: "0.8", changefreq: "monthly" },
  { url: "/wyze-vs-blink/", priority: "0.8", changefreq: "monthly" },
  { url: "/best-nanny-cam-2026/", priority: "0.8", changefreq: "monthly" },
  { url: "/best-doorbell-camera-2026/", priority: "0.8", changefreq: "monthly" },
  { url: "/best-outdoor-security-camera-2026/", priority: "0.8", changefreq: "monthly" },
  { url: "/best-hidden-camera-detector/", priority: "0.9", changefreq: "monthly" },
  { url: "/nest-cam-vs-arlo/", priority: "0.8", changefreq: "monthly" },
  { url: "/best-pet-camera-2026/", priority: "0.8", changefreq: "monthly" },
  { url: "/best-car-dash-cam-2026/", priority: "0.8", changefreq: "monthly" },
  { url: "/about/", priority: "0.6", changefreq: "monthly" },
  { url: "/contact/", priority: "0.4", changefreq: "monthly" },
  { url: "/privacy/", priority: "0.3", changefreq: "monthly" },
  { url: "/terms/", priority: "0.3", changefreq: "monthly" },
];

const REVIEW_SLUGS = [
  "blink-mini-2", "ring-indoor-cam-gen2", "wyze-cam-v4",
  "arlo-pro-5s", "google-nest-cam-indoor", "eufy-s350",
];

function getCitySlugs() {
  // Pull slugs directly from pages/live/[city].js so the sitemap stays in sync
  // whenever cities are added. Regex over the CITIES array (source of truth).
  try {
    const src = fs.readFileSync(
      path.join(__dirname, "../pages/live/[city].js"),
      "utf8"
    );
    const slugs = [];
    const re = /slug:\s*"([a-z0-9-]+)"/g;
    let m;
    while ((m = re.exec(src)) !== null) slugs.push(m[1]);
    return Array.from(new Set(slugs));
  } catch {
    return [];
  }
}

function getArticles() {
  const dir = path.join(__dirname, "../data/articles");
  try {
    return fs.readdirSync(dir)
      .filter(f => f.endsWith(".json"))
      .map(f => {
        const a = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
        // Use the FILENAME (without .json) as the slug — this matches what
        // pages/blog/[slug].js emits via getStaticPaths. The `slug` field
        // inside the JSON often strips the date suffix and causes 404s.
        return { slug: f.replace(/\.json$/, ""), date: a.date };
      });
  } catch { return []; }
}

function buildSitemap() {
  const now = new Date().toISOString().split("T")[0];
  const articles = getArticles();
  const cities = getCitySlugs();

  const urls = [
    ...STATIC_PAGES.map(p => `
  <url>
    <loc>${BASE}${p.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`),
    ...REVIEW_SLUGS.map(slug => `
  <url>
    <loc>${BASE}/reviews/${slug}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`),
    ...cities.map(slug => `
  <url>
    <loc>${BASE}/live/${slug}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`),
    ...articles.map(a => `
  <url>
    <loc>${BASE}/blog/${a.slug}/</loc>
    <lastmod>${(a.date || now).split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
}

const out = path.join(__dirname, "../public/sitemap.xml");
fs.writeFileSync(out, buildSitemap());
console.log(`[sitemap] Written: ${out} (${getArticles().length} articles, ${getCitySlugs().length} cities)`);
