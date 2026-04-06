#!/usr/bin/env node
/**
 * generate-blog.js — daily AI blog post generator for HiddenCameras.tv
 * Uses Claude Haiku to write realistic surveillance / security camera articles.
 * Saves to data/articles/[slug].json for the Next.js static build to pick up.
 *
 * Usage: node scripts/generate-blog.js
 * Env:   ANTHROPIC_API_KEY
 */

const Anthropic = require("@anthropic-ai/sdk");
const fs = require("fs");
const path = require("path");

// ── Fake author profiles ──────────────────────────────────────────────────────
const AUTHORS = [
  {
    name: "Sarah Mitchell",
    title: "Senior Security Analyst",
    bio: "Sarah spent 8 years as a private investigator before turning to consumer tech writing. She tests every camera herself before recommending it.",
    initials: "SM",
  },
  {
    name: "Marcus Chen",
    title: "Technology Editor",
    bio: "Marcus covers surveillance technology, smart home gadgets, and privacy law. He holds a computer science degree from UC Berkeley.",
    initials: "MC",
  },
  {
    name: "Jordan Blake",
    title: "Privacy & Security Writer",
    bio: "Jordan writes about digital privacy, surveillance law, and personal security. Former cybersecurity consultant with 6 years in the field.",
    initials: "JB",
  },
  {
    name: "Alex Torres",
    title: "Home Security Expert",
    bio: "Alex has reviewed over 200 home security products and helped thousands of homeowners set up their own security systems.",
    initials: "AT",
  },
  {
    name: "Rachel Kim",
    title: "Investigative Tech Reporter",
    bio: "Rachel investigates tech company practices, data privacy, and the surveillance industry for HiddenCameras.tv and several national publications.",
    initials: "RK",
  },
];

// ── Article topic pool ────────────────────────────────────────────────────────
// Topics rotate so we never write the same thing twice in a week
const TOPICS = [
  { title: "How to Check for Hidden Cameras in a Hotel Room", category: "Detection Guide", keywords: "hotel hidden camera, spy cam detector, find hidden cameras" },
  { title: "Best Security Cameras Without Subscriptions in 2026", category: "Buying Guide", keywords: "no subscription security camera, local storage camera, no monthly fee" },
  { title: "Ring vs Wyze: Which Budget Camera Is Actually Worth It?", category: "Comparison", keywords: "Ring vs Wyze, budget security camera comparison, cheap home camera" },
  { title: "5 Signs Your Airbnb Has a Hidden Camera", category: "Detection Guide", keywords: "airbnb hidden camera, spy camera airbnb, vacation rental surveillance" },
  { title: "Do Nanny Cams Have to Be Disclosed? Your Legal Rights", category: "Privacy & Law", keywords: "nanny cam legal, hidden camera laws, surveillance disclosure law" },
  { title: "Best Outdoor Security Cameras for 2026: Tested & Ranked", category: "Buying Guide", keywords: "best outdoor security camera, weatherproof camera, outdoor surveillance" },
  { title: "How Far Can Security Cameras See? The Real Numbers", category: "How It Works", keywords: "security camera range, camera viewing distance, camera field of view" },
  { title: "Can Your Neighbor Point a Camera at Your House? The Law Explained", category: "Privacy & Law", keywords: "neighbor security camera laws, surveillance privacy rights, neighbor camera pointing at house" },
  { title: "Best Hidden Cameras That Look Like Everyday Objects", category: "Buying Guide", keywords: "hidden camera disguised, spy camera disguise, covert surveillance camera" },
  { title: "How to Tell If a Smoke Detector Has a Hidden Camera Inside", category: "Detection Guide", keywords: "smoke detector camera, hidden camera smoke alarm, spy cam in smoke detector" },
  { title: "Wired vs Wireless Security Cameras: Which Is More Reliable?", category: "Comparison", keywords: "wired vs wireless camera, IP camera vs analog, best home camera setup" },
  { title: "Best Security Camera Systems for Large Properties in 2026", category: "Buying Guide", keywords: "security camera system, NVR camera system, large property surveillance" },
  { title: "How to Secure Your Security Camera from Getting Hacked", category: "How It Works", keywords: "security camera hacked, camera cybersecurity, secure IP camera" },
  { title: "Arlo vs Ring vs Nest: Which Smart Camera Ecosystem Wins?", category: "Comparison", keywords: "Arlo vs Ring vs Nest, best smart home camera, camera ecosystem comparison" },
  { title: "Hidden Camera Laws by State: What You Can and Can't Do in 2026", category: "Privacy & Law", keywords: "hidden camera state laws, surveillance law by state, spy cam legal 2026" },
  { title: "Best Doorbell Cameras Ranked by Performance in 2026", category: "Buying Guide", keywords: "best doorbell camera, video doorbell 2026, smart doorbell review" },
  { title: "How Night Vision Actually Works in Security Cameras", category: "How It Works", keywords: "night vision security camera, IR camera how it works, camera night mode" },
  { title: "What to Do If You Find a Hidden Camera in Your Rental", category: "Detection Guide", keywords: "found hidden camera, what to do spy camera, report hidden camera" },
  { title: "Can Security Cameras Record Audio Legally?", category: "Privacy & Law", keywords: "security camera audio recording, two-way audio legal, security camera law" },
  { title: "Best Pet Cameras to Monitor Your Dog or Cat From Work", category: "Buying Guide", keywords: "best pet camera, dog camera, cat camera, pet monitoring camera" },
];

// ── Amazon affiliate products to reference in articles ────────────────────────
const AMAZON_PRODUCTS = [
  { asin: "B0CGX9GQ3Q", name: "Blink Mini 2", label: "Best Budget Pick" },
  { asin: "B09WZBPX7K", name: "Ring Indoor Cam 2nd Gen", label: "Best Overall" },
  { asin: "B0C3KXY935", name: "Wyze Cam v4", label: "Best Value" },
  { asin: "B0B8QYZRSC", name: "Arlo Pro 5S", label: "Best Premium" },
  { asin: "B09NYZGGJD", name: "Google Nest Cam", label: "Best Smart Home" },
  { asin: "B0C7VN19YS", name: "Eufy Indoor Cam S350", label: "No Subscription" },
  { asin: "B07MFWKM6R", name: "JMDHKK RF Bug Detector", label: "Best Detector" },
  { asin: "B08QJ8YZNS", name: "CAMILE Lens Detector Pro", label: "Lens Finder" },
];

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Pick topic not written recently (based on existing article slugs)
function pickTopic(existingSlugs) {
  const shuffled = [...TOPICS].sort(() => Math.random() - 0.5);
  for (const topic of shuffled) {
    const slug = slugify(topic.title);
    if (!existingSlugs.some((s) => s.startsWith(slug.slice(0, 30)))) {
      return topic;
    }
  }
  return shuffled[0]; // fallback: just pick one
}

async function generateArticle() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("[blog] ANTHROPIC_API_KEY not set");
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });

  // Pick author and topic
  const author = pickRandom(AUTHORS);
  const articlesDir = path.join(process.cwd(), "data", "articles");
  const existing = fs.existsSync(articlesDir)
    ? fs.readdirSync(articlesDir).filter((f) => f.endsWith(".json")).map((f) => f.replace(".json", ""))
    : [];
  const topic = pickTopic(existing);

  const today = new Date().toISOString().split("T")[0];
  const slug = `${slugify(topic.title)}-${today}`;

  // Don't regenerate if already exists today
  if (existing.some((s) => s.endsWith(today))) {
    console.log(`[blog] Article for ${today} already exists — skipping`);
    process.exit(0);
  }

  const productRef = AMAZON_PRODUCTS.slice(0, 3)
    .map((p) => `[AMAZON:${p.asin}:${p.name} — ${p.label}]`)
    .join(", ");

  console.log(`[blog] Generating: "${topic.title}" by ${author.name}`);

  const msg = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: `You are ${author.name}, ${author.title} at HiddenCameras.tv. Write a detailed, expert blog article for this publication.

Article title: "${topic.title}"
Category: ${topic.category}
Target keywords: ${topic.keywords}

Requirements:
- Write in first person occasionally but mostly authoritative third person
- 600-900 words of body content
- Use HTML formatting: <h2>, <h3>, <ul>, <li>, <p>, <strong>, <em>
- Include 2-3 relevant product references using this EXACT format (these become affiliate links): [AMAZON:ASIN:Product Name — Label]
- Available products: ${productRef} (and B09DN27X5N:BOBLOV Detector, B0B8QYZRSC:Arlo Pro 5S)
- Be genuinely helpful, specific, and accurate — no fluff
- Don't mention the author's name in the body
- Do NOT start with the title as an h1 (the page already shows the title)
- End with a practical takeaway or recommendation

Return ONLY valid JSON (no markdown code blocks):
{
  "excerpt": "1-2 sentence summary for cards/SEO, under 160 chars",
  "body": "full HTML body content here"
}`,
      },
    ],
  });

  const text = msg.content[0].text.trim();
  const json = text.match(/\{[\s\S]*\}/)?.[0];
  if (!json) throw new Error(`No JSON in Claude response: ${text.slice(0, 200)}`);

  const { excerpt, body } = JSON.parse(json);

  const article = {
    slug,
    title: topic.title,
    excerpt,
    category: topic.category,
    date: new Date().toISOString(),
    author: author.name,
    authorTitle: author.title,
    authorBio: author.bio,
    authorInitials: author.initials,
    body,
  };

  if (!fs.existsSync(articlesDir)) fs.mkdirSync(articlesDir, { recursive: true });
  const filePath = path.join(articlesDir, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(article, null, 2));

  console.log(`[blog] Saved: data/articles/${slug}.json`);
  console.log(`[blog] Author: ${author.name} | Category: ${topic.category}`);
  return slug;
}

generateArticle().catch((err) => {
  console.error("[blog] Error:", err.message);
  process.exit(1);
});
