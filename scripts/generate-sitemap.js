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
  { url: "/contact/", priority: "0.4", changefreq: "monthly" },
  { url: "/privacy/", priority: "0.3", changefreq: "monthly" },
];

const REVIEW_SLUGS = [
  "blink-mini-2", "ring-indoor-cam-gen2", "wyze-cam-v4",
  "arlo-pro-5s", "google-nest-cam-indoor", "eufy-s350",
];

function getArticles() {
  const dir = path.join(__dirname, "../data/articles");
  try {
    return fs.readdirSync(dir)
      .filter(f => f.endsWith(".json"))
      .map(f => {
        const a = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
        return { slug: a.slug, date: a.date };
      });
  } catch { return []; }
}

function buildSitemap() {
  const now = new Date().toISOString().split("T")[0];
  const articles = getArticles();

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
console.log(`[sitemap] Written: ${out} (${getArticles().length} articles)`);
