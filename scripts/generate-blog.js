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

// ── Author profile (single honest editorial byline) ─────────────────────────
const AUTHOR = {
  name: "HiddenCameras Editorial Team",
  title: "Editorial Team",
  bio: "The HiddenCameras.tv editorial team researches and writes about security cameras, surveillance technology, and home safety.",
  initials: "HC",
};

// ── Article topic pool (60+ diverse topics) ─────────────────────────────────
// Topics rotate so we never write the same thing twice in a week
const TOPICS = [
  // Detection Guides
  { title: "How to Check for Hidden Cameras in a Hotel Room", category: "Detection Guide", keywords: "hotel hidden camera, spy cam detector, find hidden cameras" },
  { title: "5 Signs Your Airbnb Has a Hidden Camera", category: "Detection Guide", keywords: "airbnb hidden camera, spy camera airbnb, vacation rental surveillance" },
  { title: "How to Tell If a Smoke Detector Has a Hidden Camera Inside", category: "Detection Guide", keywords: "smoke detector camera, hidden camera smoke alarm, spy cam in smoke detector" },
  { title: "What to Do If You Find a Hidden Camera in Your Rental", category: "Detection Guide", keywords: "found hidden camera, what to do spy camera, report hidden camera" },
  { title: "How to Use Your Phone to Detect Hidden Cameras", category: "Detection Guide", keywords: "phone detect hidden camera, IR camera finder app, smartphone spy cam detector" },
  { title: "Hidden Camera Detector Tools: Which Ones Actually Work?", category: "Detection Guide", keywords: "hidden camera detector review, RF detector spy cam, lens finder device" },
  { title: "How to Find Hidden Cameras in a Changing Room or Bathroom", category: "Detection Guide", keywords: "changing room camera, bathroom spy cam, public restroom hidden camera" },

  // Buying Guides
  { title: "Best Security Cameras Without Subscriptions in 2026", category: "Buying Guide", keywords: "no subscription security camera, local storage camera, no monthly fee" },
  { title: "Best Outdoor Security Cameras for 2026: Tested & Ranked", category: "Buying Guide", keywords: "best outdoor security camera, weatherproof camera, outdoor surveillance" },
  { title: "Best Hidden Cameras That Look Like Everyday Objects", category: "Buying Guide", keywords: "hidden camera disguised, spy camera disguise, covert surveillance camera" },
  { title: "Best Security Camera Systems for Large Properties in 2026", category: "Buying Guide", keywords: "security camera system, NVR camera system, large property surveillance" },
  { title: "Best Doorbell Cameras Ranked by Performance in 2026", category: "Buying Guide", keywords: "best doorbell camera, video doorbell 2026, smart doorbell review" },
  { title: "Best Pet Cameras to Monitor Your Dog or Cat From Work", category: "Buying Guide", keywords: "best pet camera, dog camera, cat camera, pet monitoring camera" },
  { title: "Best Baby Monitors With Camera in 2026: WiFi vs Dedicated", category: "Buying Guide", keywords: "best baby monitor camera, wifi baby cam, baby monitor 2026" },
  { title: "Best Solar-Powered Security Cameras for Off-Grid Use", category: "Buying Guide", keywords: "solar security camera, off-grid camera, solar powered outdoor camera" },
  { title: "Best Security Cameras Under $50 in 2026", category: "Buying Guide", keywords: "cheap security camera, budget camera under 50, affordable surveillance" },
  { title: "Best 4K Security Cameras for Crystal-Clear Footage", category: "Buying Guide", keywords: "4K security camera, ultra HD camera, high resolution surveillance" },
  { title: "Best Floodlight Cameras to Light Up and Record Your Yard", category: "Buying Guide", keywords: "floodlight camera, outdoor light camera, security floodlight cam" },
  { title: "Best Dash Cameras for Car Security and Parking Mode", category: "Buying Guide", keywords: "best dash cam, parking mode camera, car security camera" },
  { title: "Best PoE Security Camera Systems for Reliable Home Coverage", category: "Buying Guide", keywords: "PoE camera system, power over ethernet camera, wired camera system" },
  { title: "Best Trail Cameras for Wildlife and Property Surveillance", category: "Buying Guide", keywords: "trail camera, wildlife camera, game camera property security" },
  { title: "Best Body Cameras for Personal Safety in 2026", category: "Buying Guide", keywords: "body camera personal use, wearable camera, body cam safety" },

  // Brand and Model Reviews
  { title: "Blink Mini 2 Review: Is the Cheapest Camera Actually Good?", category: "Brand Review", keywords: "Blink Mini 2 review, Blink camera review, cheap Blink camera" },
  { title: "Ring Indoor Cam Gen 2 vs Gen 1: What Changed and Is It Worth It?", category: "Brand Review", keywords: "Ring Indoor Cam review, Ring Gen 2, Ring camera upgrade" },
  { title: "Wyze Cam v4 Full Review: Best Budget Camera for 2026?", category: "Brand Review", keywords: "Wyze Cam v4 review, Wyze camera, Wyze vs competitors" },
  { title: "Arlo Pro 5S Review: Premium Features Worth the Price?", category: "Brand Review", keywords: "Arlo Pro 5S review, Arlo camera review, premium security camera" },
  { title: "Google Nest Cam Review: How Good Is On-Device AI?", category: "Brand Review", keywords: "Google Nest Cam review, Nest camera AI, smart home camera" },
  { title: "Eufy S350 Review: The Best No-Subscription Indoor Camera?", category: "Brand Review", keywords: "Eufy S350 review, Eufy no subscription, local storage camera" },
  { title: "Reolink Argus 4 Pro Review: Wire-Free 4K Security", category: "Brand Review", keywords: "Reolink Argus 4 Pro, wire-free 4K camera, Reolink review" },
  { title: "TP-Link Tapo C420S2 Review: Budget Outdoor Camera System", category: "Brand Review", keywords: "TP-Link Tapo camera, Tapo security system, budget outdoor camera" },

  // Comparison Articles
  { title: "Ring vs Wyze: Which Budget Camera Is Actually Worth It?", category: "Comparison", keywords: "Ring vs Wyze, budget security camera comparison, cheap home camera" },
  { title: "Wired vs Wireless Security Cameras: Which Is More Reliable?", category: "Comparison", keywords: "wired vs wireless camera, IP camera vs analog, best home camera setup" },
  { title: "Arlo vs Ring vs Nest: Which Smart Camera Ecosystem Wins?", category: "Comparison", keywords: "Arlo vs Ring vs Nest, best smart home camera, camera ecosystem comparison" },
  { title: "Blink vs Wyze: Sub-$40 Camera Showdown", category: "Comparison", keywords: "Blink vs Wyze, cheapest security camera, budget cam comparison" },
  { title: "Eufy vs Arlo: Which No-Subscription Camera Is Better?", category: "Comparison", keywords: "Eufy vs Arlo, no subscription camera, local storage vs cloud" },
  { title: "Indoor vs Outdoor Security Cameras: Do You Need Both?", category: "Comparison", keywords: "indoor vs outdoor camera, home security camera types, camera placement" },

  // Privacy and Law
  { title: "Do Nanny Cams Have to Be Disclosed? Your Legal Rights", category: "Privacy & Law", keywords: "nanny cam legal, hidden camera laws, surveillance disclosure law" },
  { title: "Can Your Neighbor Point a Camera at Your House? The Law Explained", category: "Privacy & Law", keywords: "neighbor security camera laws, surveillance privacy rights, neighbor camera pointing at house" },
  { title: "Hidden Camera Laws by State: What You Can and Can't Do in 2026", category: "Privacy & Law", keywords: "hidden camera state laws, surveillance law by state, spy cam legal 2026" },
  { title: "Can Security Cameras Record Audio Legally?", category: "Privacy & Law", keywords: "security camera audio recording, two-way audio legal, security camera law" },
  { title: "GDPR and Security Cameras: What European Homeowners Must Know", category: "Privacy & Law", keywords: "GDPR security camera, Europe camera law, data protection surveillance" },
  { title: "Workplace Surveillance Laws: Can Your Employer Watch You?", category: "Privacy & Law", keywords: "workplace camera laws, employer surveillance, office security camera legal" },
  { title: "Ring Doorbell Privacy Concerns: What Your Neighbors See", category: "Privacy & Law", keywords: "Ring doorbell privacy, doorbell camera neighbor, video doorbell legal" },
  { title: "Is It Legal to Record Police With a Body Camera?", category: "Privacy & Law", keywords: "record police body camera, filming police legal, body cam rights" },

  // Installation Guides
  { title: "How to Install a Security Camera Without Drilling Holes", category: "Installation Guide", keywords: "no drill camera install, adhesive camera mount, renter security camera" },
  { title: "How to Set Up a Multi-Camera Home Security System From Scratch", category: "Installation Guide", keywords: "home security system setup, DIY camera system, multi camera installation" },
  { title: "Best Places to Mount Security Cameras Around Your Home", category: "Installation Guide", keywords: "camera placement guide, where to put security camera, camera mounting tips" },
  { title: "How to Run Security Camera Wires Through Your Attic", category: "Installation Guide", keywords: "camera wiring guide, run cable attic, PoE camera installation" },
  { title: "Setting Up a Nanny Cam: Placement Tips and Best Practices", category: "Installation Guide", keywords: "nanny cam setup, nanny camera placement, baby room camera" },
  { title: "How to Connect Your Security Camera to WiFi Reliably", category: "Installation Guide", keywords: "camera wifi setup, connect camera to router, wireless camera troubleshooting" },

  // Technical Explainers
  { title: "How Far Can Security Cameras See? The Real Numbers", category: "How It Works", keywords: "security camera range, camera viewing distance, camera field of view" },
  { title: "How Night Vision Actually Works in Security Cameras", category: "How It Works", keywords: "night vision security camera, IR camera how it works, camera night mode" },
  { title: "How to Secure Your Security Camera from Getting Hacked", category: "How It Works", keywords: "security camera hacked, camera cybersecurity, secure IP camera" },
  { title: "What Is Local Storage vs Cloud Storage for Security Cameras?", category: "How It Works", keywords: "local vs cloud camera storage, NAS security camera, microSD camera" },
  { title: "Understanding Camera Resolution: 1080p vs 2K vs 4K Explained", category: "How It Works", keywords: "camera resolution comparison, 1080p vs 4K camera, security camera quality" },
  { title: "How Motion Detection Zones Work and Why You Should Set Them", category: "How It Works", keywords: "motion detection zones, camera motion sensitivity, reduce false alerts" },
  { title: "What Is Person Detection and Is AI Really Better Than PIR?", category: "How It Works", keywords: "person detection camera, AI vs PIR, smart camera detection" },
  { title: "How Two-Way Audio Works on Security Cameras", category: "How It Works", keywords: "two-way audio camera, talk through camera, security camera speaker" },

  // Seasonal and Situational
  { title: "How to Secure Your Home Before Going on Vacation", category: "Seasonal Tips", keywords: "vacation home security, travel security camera, protect home while away" },
  { title: "Holiday Package Theft: Best Cameras to Catch Porch Pirates", category: "Seasonal Tips", keywords: "porch pirate camera, package theft doorbell, holiday delivery security" },
  { title: "Back-to-School Home Security: Keeping Kids Safe After School", category: "Seasonal Tips", keywords: "after school safety camera, kids home alone camera, latchkey kid security" },
  { title: "Winter Security Camera Tips: Cold Weather Performance Guide", category: "Seasonal Tips", keywords: "security camera cold weather, winter camera tips, camera freezing" },
  { title: "Spring Cleaning Your Security Setup: Maintenance Checklist", category: "Seasonal Tips", keywords: "security camera maintenance, clean camera lens, check camera firmware" },

  // Use Case Guides
  { title: "Best Camera Setup for Small Business Owners in 2026", category: "Use Case Guide", keywords: "small business security camera, shop camera system, retail surveillance" },
  { title: "How to Monitor Elderly Parents Remotely With Cameras", category: "Use Case Guide", keywords: "elderly parent camera, senior monitoring camera, remote parent care" },
  { title: "Security Camera Setup for Renters: No Holes No Problem", category: "Use Case Guide", keywords: "renter security camera, apartment camera, no damage camera install" },
  { title: "How Real Estate Agents Use Cameras for Open House Security", category: "Use Case Guide", keywords: "open house camera, real estate security, showing security camera" },
  { title: "Farm and Ranch Security Cameras: Covering Large Areas on a Budget", category: "Use Case Guide", keywords: "farm security camera, ranch surveillance, large property camera" },
];

// ── Amazon affiliate products to reference in articles ────────────────────────
const AMAZON_PRODUCTS = [
  { asin: "B0CGX9GQ3Q", name: "Blink Mini 2", label: "Best Budget Pick" },
  { asin: "B09WZBPX7K", name: "Ring Indoor Cam 2nd Gen", label: "Best Overall" },
  { asin: "B0CJ9YX7DG", name: "Wyze Cam v4", label: "Best Value" },
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

  // Use editorial team byline
  const author = AUTHOR;
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

  console.log(`[blog] Generating: "${topic.title}" by ${AUTHOR.name}`);

  const msg = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: `You are a writer for the HiddenCameras.tv editorial team. Write a detailed, expert blog article for this publication.

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
- Write in an editorial team voice, not as a named individual
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
