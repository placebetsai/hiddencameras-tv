#!/usr/bin/env node
/**
 * generate-articles.js
 * Generates 1 SEO article per run using Claude, pushes JSON to GitHub,
 * which triggers a Cloudflare Pages rebuild automatically.
 *
 * Schedule: 3x/day via Render cron (8am, 1pm, 6pm ET)
 * Cost: ~$0.003/article with Claude Haiku
 */

require("dotenv").config();
const Anthropic = require("@anthropic-ai/sdk");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO  = "placebetsai/hiddencameras-tv";
const BRANCH       = "main";
const AMAZON_TAG   = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── Article topics pool — rotated daily so we never repeat ──────────────────

const TOPICS = [
  { title: "Best Hidden Cameras for Home Security in 2025", category: "Buying Guide", keywords: "hidden camera, home security camera, best indoor security camera" },
  { title: "Ring vs Blink: Which Amazon Camera Should You Buy?", category: "Comparison", keywords: "Ring camera, Blink camera, Ring vs Blink" },
  { title: "How to Detect Hidden Cameras in Hotel Rooms", category: "How-To", keywords: "hidden camera detector, find hidden camera, hotel room security" },
  { title: "Best Nanny Cams of 2025: Discreet Indoor Cameras", category: "Buying Guide", keywords: "nanny cam, baby monitor camera, indoor spy camera" },
  { title: "Arlo vs Wyze: Budget vs Premium Security Cameras", category: "Comparison", keywords: "Arlo camera, Wyze camera, security camera comparison" },
  { title: "Best Outdoor Security Cameras That Work in the Dark", category: "Buying Guide", keywords: "outdoor security camera, night vision camera, best outdoor camera" },
  { title: "Do You Need a Security Camera Subscription?", category: "Explainer", keywords: "security camera subscription, cloud storage, free security camera" },
  { title: "Best Security Cameras Without WiFi (2025)", category: "Buying Guide", keywords: "security camera no wifi, cellular security camera, SD card camera" },
  { title: "Google Nest vs Ring: The Smart Home Security Showdown", category: "Comparison", keywords: "Google Nest camera, Ring camera, smart home security" },
  { title: "How to Set Up a Home Security Camera System for Under $200", category: "How-To", keywords: "cheap home security system, budget security cameras, DIY security" },
  { title: "Best Doorbell Cameras of 2025: Ring, Nest, Eufy Ranked", category: "Buying Guide", keywords: "doorbell camera, video doorbell, best doorbell camera" },
  { title: "Hidden Camera Laws by State: What's Legal in 2025", category: "Legal Guide", keywords: "hidden camera laws, surveillance laws, is it legal to use hidden cameras" },
  { title: "Best Security Cameras for Apartments (No Drilling Required)", category: "Buying Guide", keywords: "apartment security camera, renter security camera, no drill camera" },
  { title: "How Long Do Security Camera Recordings Last?", category: "Explainer", keywords: "security camera storage, how long recordings kept, cloud vs local storage" },
  { title: "Best Fake Security Cameras That Actually Deter Crime", category: "Buying Guide", keywords: "fake security camera, dummy camera, deterrent camera" },
  { title: "Eufy vs Ring: Is the No-Subscription Camera Worth It?", category: "Comparison", keywords: "Eufy camera, Ring camera, no subscription security camera" },
  { title: "Best Pet Cameras for Monitoring Dogs and Cats at Home", category: "Buying Guide", keywords: "pet camera, dog camera, cat monitor" },
  { title: "How to Secure Your Front Door: Cameras + Smart Locks Guide", category: "How-To", keywords: "front door security, doorbell camera, smart lock" },
  { title: "Night Vision Security Cameras: IR vs Color Night Vision Explained", category: "Explainer", keywords: "night vision camera, color night vision, IR camera" },
  { title: "Best Business Security Cameras for Small Shops and Offices", category: "Buying Guide", keywords: "business security camera, office camera, retail security" },
];

function pickTopic() {
  // Pick based on day-of-year so it rotates without repeating for ~20 days
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return TOPICS[dayOfYear % TOPICS.length];
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// ─── Generate article with Claude ────────────────────────────────────────────

async function generateArticle(topic) {
  console.log(`[gen] Generating: "${topic.title}"`);

  const prompt = `You are a security expert writing for HiddenCameras.tv, a trusted home security review site.

Write a comprehensive, SEO-optimized article on this topic:
Title: "${topic.title}"
Category: ${topic.category}
Target keywords: ${topic.keywords}

Requirements:
- 800-1200 words of real, useful content
- H2 and H3 headings (use <h2> and <h3> tags)
- Include specific product mentions with Amazon ASINs where relevant (use shortcode [AMAZON:ASIN:Product Name] for buy links)
  Common ASINs: B0CGX9GQ3Q (Blink Mini 2), B09WZBPX7K (Ring Indoor Cam), B0CJ9YX7DG (Wyze Cam v4), B0B8QYZRSC (Arlo Pro 5S), B09NYZGGJD (Google Nest Cam), B0C7VN19YS (Eufy S350)
- No fluff, no filler — real advice a homeowner would act on
- Use <p>, <ul>, <li>, <strong>, <h2>, <h3> HTML tags only
- End with a clear recommendation
- Tone: knowledgeable, direct, trustworthy — not salesy

Return ONLY a JSON object, no other text:
{
  "title": "exact article title",
  "excerpt": "2-sentence meta description, 150 chars max",
  "body": "full HTML article body",
  "category": "${topic.category}"
}`;

  const msg = await claude.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2500,
    messages: [{ role: "user", content: prompt }],
  });

  const text = msg.content[0].text.trim();
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON in response");
  return JSON.parse(match[0]);
}

// ─── Push article JSON to GitHub ─────────────────────────────────────────────

async function pushToGitHub(slug, content) {
  const filePath = `data/articles/${slug}.json`;
  const encoded  = Buffer.from(JSON.stringify(content, null, 2)).toString("base64");

  // Check if file exists (get its SHA)
  let sha;
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}?ref=${BRANCH}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: "application/vnd.github.v3+json" },
    });
    if (res.ok) {
      const data = await res.json();
      sha = data.sha;
    }
  } catch {}

  const body = {
    message: `Add article: ${content.title}`,
    content: encoded,
    branch: BRANCH,
  };
  if (sha) body.sha = sha;

  const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`, {
    method:  "PUT",
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`GitHub push failed: ${JSON.stringify(data)}`);
  console.log(`[gen] Pushed to GitHub: ${filePath}`);
  return data;
}

// ─── Post teaser tweet ────────────────────────────────────────────────────────

async function postTweet(article, slug) {
  const { X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET } = process.env;
  if (!X_API_KEY || !X_API_SECRET || !X_ACCESS_TOKEN || !X_ACCESS_TOKEN_SECRET) {
    console.log("[twitter] No X credentials — skipping tweet");
    return;
  }
  try {
    const { TwitterApi } = require("twitter-api-v2");
    const twitter = new TwitterApi({ appKey: X_API_KEY, appSecret: X_API_SECRET, accessToken: X_ACCESS_TOKEN, accessSecret: X_ACCESS_TOKEN_SECRET });

    const prompt = `Write a punchy 200-char tweet teaser for this article: "${article.title}". No hashtags. End with the link placeholder [LINK]. Return only the tweet text.`;
    const msg = await claude.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 100,
      messages: [{ role: "user", content: prompt }],
    });
    const tweetText = msg.content[0].text.trim().replace("[LINK]", `https://hiddencameras.tv/blog/${slug}`);
    const res = await twitter.v2.tweet(tweetText);
    console.log(`[twitter] Posted tweet: ${res.data.id}`);
  } catch (err) {
    console.warn(`[twitter] Tweet failed: ${err.message}`);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function run() {
  const ts = () => new Date().toISOString().slice(0, 19).replace("T", " ");
  console.log(`\n[${ts()}] === Article Generator ===`);

  if (!process.env.ANTHROPIC_API_KEY) { console.error("ANTHROPIC_API_KEY not set"); process.exit(1); }
  if (!GITHUB_TOKEN) { console.error("GITHUB_TOKEN not set"); process.exit(1); }

  const topic   = pickTopic();
  const slug    = slugify(topic.title);

  let article;
  try {
    article = await generateArticle(topic);
  } catch (err) {
    console.error(`[gen] Generate failed: ${err.message}`);
    process.exit(1);
  }

  const fullArticle = {
    slug,
    title:    article.title,
    excerpt:  article.excerpt,
    body:     article.body,
    category: article.category,
    date:     new Date().toISOString(),
  };

  try {
    await pushToGitHub(slug, fullArticle);
  } catch (err) {
    console.error(`[gen] GitHub push failed: ${err.message}`);
    process.exit(1);
  }

  await postTweet(fullArticle, slug);

  console.log(`[${ts()}] Done. Article: "${article.title}"`);
}

run().catch((err) => { console.error("Fatal:", err.message); process.exit(1); });
