#!/usr/bin/env node
/**
 * bulk-generate-blog.js — generates 60 backdated articles for HiddenCameras.tv
 * All dates Jan 2 – Apr 5 2026 (before today)
 * Run: ANTHROPIC_API_KEY=... node scripts/bulk-generate-blog.js
 */

const Anthropic = require("@anthropic-ai/sdk");
const fs = require("fs");
const path = require("path");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const AUTHORS = [
  { name: "Sarah Mitchell",  title: "Senior Security Analyst",       bio: "Sarah spent 8 years as a private investigator before turning to consumer tech writing. She tests every camera herself before recommending it.", initials: "SM" },
  { name: "Marcus Chen",     title: "Technology Editor",             bio: "Marcus covers surveillance technology, smart home gadgets, and privacy law. He holds a computer science degree from UC Berkeley.",              initials: "MC" },
  { name: "Jordan Blake",    title: "Privacy & Security Writer",     bio: "Jordan writes about digital privacy, surveillance law, and personal security. Former cybersecurity consultant with 6 years in the field.",       initials: "JB" },
  { name: "Alex Torres",     title: "Home Security Expert",          bio: "Alex has reviewed over 200 home security products and helped thousands of homeowners set up their own security systems.",                        initials: "AT" },
  { name: "Rachel Kim",      title: "Investigative Tech Reporter",   bio: "Rachel investigates tech company practices, data privacy, and the surveillance industry for HiddenCameras.tv and several national publications.", initials: "RK" },
];

const ARTICLES = [
  { date: "2026-01-02", title: "Why Every Home Needs a Security Camera in 2026",                         category: "Buying Guide",    author: 4 },
  { date: "2026-01-03", title: "How to Detect Hidden Cameras in a Hotel Room",                           category: "Detection Guide", author: 0 },
  { date: "2026-01-05", title: "The Best Arlo Security Camera Models Ranked for 2026",                   category: "Buying Guide",    author: 3 },
  { date: "2026-01-07", title: "Best Indoor Security Cameras of 2026: Tested and Ranked",                category: "Buying Guide",    author: 1 },
  { date: "2026-01-09", title: "How to Read Security Camera Footage Like a Pro",                         category: "How It Works",    author: 2 },
  { date: "2026-01-10", title: "Are Nanny Cams Legal? Everything You Need to Know",                      category: "Privacy & Law",   author: 2 },
  { date: "2026-01-12", title: "Security Camera Laws: What You Can and Cannot Record",                   category: "Privacy & Law",   author: 0 },
  { date: "2026-01-14", title: "How Hidden Cameras Work: A Complete Technical Guide",                    category: "How It Works",    author: 3 },
  { date: "2026-01-16", title: "Best Solar-Powered Security Cameras of 2026",                            category: "Buying Guide",    author: 1 },
  { date: "2026-01-17", title: "Ring vs Arlo: Which Security Camera System Wins in 2026?",               category: "Comparison",      author: 4 },
  { date: "2026-01-19", title: "Hidden Camera Detector Apps: Do They Actually Work?",                    category: "Detection Guide", author: 4 },
  { date: "2026-01-21", title: "The Best Baby Monitor Cameras of 2026",                                  category: "Buying Guide",    author: 0 },
  { date: "2026-01-23", title: "Best Battery-Powered Security Cameras With No Wiring Needed",            category: "Buying Guide",    author: 3 },
  { date: "2026-01-24", title: "How to Set Up a Home Security Camera System on a Budget",                category: "How It Works",    author: 1 },
  { date: "2026-01-26", title: "How to Choose the Right Security Camera for Your Needs",                 category: "Buying Guide",    author: 2 },
  { date: "2026-01-28", title: "Hidden Cameras in Airbnb: What Every Guest Needs to Know",               category: "Detection Guide", author: 2 },
  { date: "2026-01-30", title: "Eufy vs Ring: Which Smart Home Security Ecosystem Is Better?",           category: "Comparison",      author: 0 },
  { date: "2026-02-02", title: "Best Outdoor Security Cameras of 2026: Weatherproof and Reliable",       category: "Buying Guide",    author: 3 },
  { date: "2026-02-04", title: "The Best Complete Home Security Camera Systems for 2026",                category: "Buying Guide",    author: 1 },
  { date: "2026-02-05", title: "How Night Vision Security Cameras Work",                                 category: "How It Works",    author: 4 },
  { date: "2026-02-06", title: "What is RTSP Streaming and Why It Matters for Your Camera",              category: "How It Works",    author: 4 },
  { date: "2026-02-08", title: "Wyze vs Eufy: The Best Budget Security Camera Showdown",                 category: "Comparison",      author: 0 },
  { date: "2026-02-09", title: "How to Set Up Remote Access for Your Home Security Camera",              category: "How It Works",    author: 3 },
  { date: "2026-02-11", title: "Do You Really Need a Cloud Subscription for Your Security Camera?",      category: "Buying Guide",    author: 1 },
  { date: "2026-02-12", title: "Best Motion-Activated Security Cameras of 2026",                         category: "Buying Guide",    author: 2 },
  { date: "2026-02-14", title: "Best Video Doorbell Cameras of 2026: Reviewed and Ranked",               category: "Buying Guide",    author: 2 },
  { date: "2026-02-15", title: "Two-Factor Authentication for Security Cameras: Why It Matters",         category: "How It Works",    author: 0 },
  { date: "2026-02-17", title: "How to Catch a Porch Pirate Using a Security Camera",                    category: "Detection Guide", author: 3 },
  { date: "2026-02-18", title: "Best Indoor and Outdoor Security Cameras That Do Both Jobs",             category: "Buying Guide",    author: 1 },
  { date: "2026-02-20", title: "Best Pet Cameras: Watch Your Dog or Cat From Anywhere",                  category: "Buying Guide",    author: 4 },
  { date: "2026-02-21", title: "How to Build a Security Camera Network for Your Whole Property",         category: "How It Works",    author: 4 },
  { date: "2026-02-23", title: "How to Prevent Your Security Camera From Being Hacked",                  category: "How It Works",    author: 0 },
  { date: "2026-02-24", title: "Filming in Public vs Private Space: Where Is the Legal Line?",           category: "Privacy & Law",   author: 3 },
  { date: "2026-02-26", title: "Best Security Cameras for Small Businesses in 2026",                     category: "Buying Guide",    author: 1 },
  { date: "2026-02-27", title: "Best Security Cameras for Elderly Parents Living Alone",                 category: "Buying Guide",    author: 2 },
  { date: "2026-03-02", title: "Google Nest Cam vs Ring Indoor Cam: Which Should You Buy?",              category: "Comparison",      author: 2 },
  { date: "2026-03-03", title: "How Facial Recognition in Security Cameras Works in 2026",               category: "How It Works",    author: 0 },
  { date: "2026-03-04", title: "What is a PTZ Camera and Do You Need One for Your Home?",                category: "How It Works",    author: 3 },
  { date: "2026-03-06", title: "Best Floodlight Security Cameras With Motion-Activated Lighting",        category: "Buying Guide",    author: 1 },
  { date: "2026-03-07", title: "How to Discreetly Hide a Security Camera in Any Room",                   category: "How It Works",    author: 4 },
  { date: "2026-03-09", title: "Security Camera Strategy for Retail and Commercial Properties",          category: "Buying Guide",    author: 4 },
  { date: "2026-03-10", title: "Wireless vs Wired Security Cameras: Which is Better in 2026?",           category: "Comparison",      author: 0 },
  { date: "2026-03-12", title: "Best Security Cameras With No Monthly Fees or Subscriptions",            category: "Buying Guide",    author: 1 },
  { date: "2026-03-13", title: "How to Maintain and Clean Your Outdoor Security Cameras",                category: "How It Works",    author: 3 },
  { date: "2026-03-15", title: "How to Monitor Your Home Securely While on Vacation",                    category: "How It Works",    author: 2 },
  { date: "2026-03-16", title: "The Rise of AI in Home Security: What to Expect in 2026",                category: "How It Works",    author: 2 },
  { date: "2026-03-17", title: "Best Dash Cams of 2026: Stay Protected on Every Drive",                  category: "Buying Guide",    author: 0 },
  { date: "2026-03-19", title: "Best Security Cameras for Rental Properties and Landlords",              category: "Buying Guide",    author: 3 },
  { date: "2026-03-20", title: "How Long Do Security Cameras Store Footage? The Full Answer",            category: "How It Works",    author: 1 },
  { date: "2026-03-22", title: "Best Security Cameras for Apartments and Renters in 2026",               category: "Buying Guide",    author: 4 },
  { date: "2026-03-23", title: "How Sound Detection in Security Cameras Can Protect Your Home",          category: "How It Works",    author: 4 },
  { date: "2026-03-25", title: "Is a 4K Security Camera Worth the Extra Cost in 2026?",                  category: "Buying Guide",    author: 1 },
  { date: "2026-03-26", title: "7 Mistakes to Avoid When Buying a Security Camera",                      category: "Buying Guide",    author: 4 },
  { date: "2026-03-27", title: "How to Install a Security Camera Without Drilling Any Holes",            category: "How It Works",    author: 2 },
  { date: "2026-03-28", title: "Best Security Cameras for Garages, Driveways and Parking Areas",        category: "Buying Guide",    author: 3 },
  { date: "2026-03-30", title: "How AI-Powered Security Cameras Actually Detect Threats",                category: "How It Works",    author: 3 },
  { date: "2026-04-01", title: "Blink Camera Full Review: Is Amazon's Budget Cam Worth It?",             category: "Buying Guide",    author: 0 },
  { date: "2026-04-02", title: "The Complete Surveillance Camera Buyer's Guide for 2026",                category: "Buying Guide",    author: 2 },
  { date: "2026-04-03", title: "How to Turn Your Old Smartphone Into a Free Security Camera",            category: "How It Works",    author: 0 },
  { date: "2026-04-04", title: "The Complete Guide to Home Security Camera Placement",                   category: "How It Works",    author: 1 },
  { date: "2026-04-05", title: "Eufy Security Camera Review: The Best No-Subscription Option?",         category: "Buying Guide",    author: 3 },
];

const PRODUCTS = [
  { asin: "B0CGX9GQ3Q", name: "Blink Mini 2",               label: "Best Budget" },
  { asin: "B09WZBPX7K", name: "Ring Indoor Cam 2nd Gen",    label: "Best Overall" },
  { asin: "B0CJ9YX7DG", name: "Wyze Cam v4",                label: "Best Value" },
  { asin: "B0B8QYZRSC", name: "Arlo Pro 5S",                label: "Best Premium" },
  { asin: "B09NYZGGJD", name: "Google Nest Cam",            label: "Best Smart Home" },
  { asin: "B0C7VN19YS", name: "Eufy Indoor Cam S350",       label: "No Subscription" },
];

function slugify(t) {
  return t.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 80);
}

async function generateOne(meta) {
  const author = AUTHORS[meta.author];
  const slug = `${slugify(meta.title)}-${meta.date}`;
  const outDir = path.join(process.cwd(), "data", "articles");
  const outPath = path.join(outDir, `${slug}.json`);

  if (fs.existsSync(outPath)) {
    console.log(`[skip] ${slug}`);
    return;
  }

  // Pick 2 relevant products
  const prods = PRODUCTS.slice(0, 3).map(p => `[AMAZON:${p.asin}:${p.name} — ${p.label}]`).join(", ");

  const msg = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2000,
    messages: [{
      role: "user",
      content: `You are ${author.name}, ${author.title} at HiddenCameras.tv. Write a detailed, SEO-optimized blog article.

Article title: "${meta.title}"
Category: ${meta.category}
Published date: ${meta.date}

Requirements:
- 650-900 words of body content
- HTML: <h2>, <h3>, <p>, <ul>, <li>, <strong>
- Include 2 product references in EXACT format: [AMAZON:ASIN:Name — Label]
- Available: ${prods}
- Authoritative, helpful, specific — no fluff or filler
- Do NOT start with an h1 (title shown separately)
- End with a clear recommendation or takeaway

Return ONLY valid JSON (no markdown):
{"excerpt":"1-2 sentence SEO summary under 155 chars","body":"full HTML here"}`
    }]
  });

  const text = msg.content[0].text.trim();
  const json = text.match(/\{[\s\S]*\}/)?.[0];
  if (!json) throw new Error(`No JSON for: ${meta.title}`);

  const { excerpt, body } = JSON.parse(json);

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify({
    slug,
    title: meta.title,
    excerpt,
    category: meta.category,
    date: new Date(meta.date).toISOString(),
    author: author.name,
    authorTitle: author.title,
    authorBio: author.bio,
    authorInitials: author.initials,
    body,
  }, null, 2));

  console.log(`[done] ${meta.date} — ${meta.title}`);
}

async function run() {
  if (!process.env.ANTHROPIC_API_KEY) { console.error("No ANTHROPIC_API_KEY"); process.exit(1); }

  const BATCH = 5;
  for (let i = 0; i < ARTICLES.length; i += BATCH) {
    const batch = ARTICLES.slice(i, i + BATCH);
    await Promise.all(batch.map(a => generateOne(a).catch(e => console.error(`[err] ${a.title}: ${e.message}`))));
    console.log(`[batch] ${Math.min(i + BATCH, ARTICLES.length)}/${ARTICLES.length} done`);
  }
  console.log("[bulk] All articles generated.");
}

run();
