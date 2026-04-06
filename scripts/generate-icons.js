#!/usr/bin/env node
/**
 * Generates all required PNG assets from SVG source using sharp.
 * Outputs: favicon-16.png, favicon-32.png, apple-touch-icon.png, og-image.png
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const pub = path.join(__dirname, "../public");

// ─── Favicon SVG (tight camera icon, green on dark) ──────────────────────────
const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#0d0d0d"/>
  <!-- body -->
  <rect x="6" y="20" width="40" height="28" rx="5" fill="#1a1a1a" stroke="#00c853" stroke-width="2.5"/>
  <!-- shutter bump -->
  <rect x="20" y="14" width="10" height="7" rx="2.5" fill="#00c853"/>
  <!-- lens ring -->
  <circle cx="26" cy="34" r="10" fill="#0d0d0d" stroke="#00c853" stroke-width="2.5"/>
  <!-- lens iris -->
  <circle cx="26" cy="34" r="5.5" fill="#00c853"/>
  <!-- glint -->
  <circle cx="28.5" cy="31.5" r="2" fill="white" opacity="0.45"/>
  <!-- CCTV arm -->
  <path d="M46 26 L58 22 L58 46 L46 42" stroke="#00c853" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <!-- record dot -->
  <circle cx="44" cy="23" r="3.5" fill="#ef4444"/>
</svg>`;

// ─── OG Image SVG (1200x630) ──────────────────────────────────────────────────
const OG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <radialGradient id="glow" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#00c853" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#0d0d0d" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#111111"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Grid lines -->
  <line x1="0" y1="315" x2="1200" y2="315" stroke="#1e1e1e" stroke-width="1"/>
  <line x1="600" y1="0" x2="600" y2="630" stroke="#1e1e1e" stroke-width="1"/>

  <!-- CCTV corner brackets -->
  <path d="M40 40 L40 80 M40 40 L80 40" stroke="#00c853" stroke-width="2" opacity="0.5"/>
  <path d="M1160 40 L1160 80 M1160 40 L1120 40" stroke="#00c853" stroke-width="2" opacity="0.5"/>
  <path d="M40 590 L40 550 M40 590 L80 590" stroke="#00c853" stroke-width="2" opacity="0.5"/>
  <path d="M1160 590 L1160 550 M1160 590 L1120 590" stroke="#00c853" stroke-width="2" opacity="0.5"/>

  <!-- Camera body -->
  <rect x="430" y="150" width="260" height="185" rx="22" fill="#1a1a1a" stroke="#00c853" stroke-width="3"/>
  <!-- Shutter bump -->
  <rect x="510" y="132" width="62" height="22" rx="8" fill="#00c853"/>
  <!-- Lens ring outer -->
  <circle cx="560" cy="243" r="72" fill="#0d0d0d" stroke="#00c853" stroke-width="3"/>
  <!-- Lens ring inner -->
  <circle cx="560" cy="243" r="52" fill="#111" stroke="#2a2a2a" stroke-width="1.5"/>
  <!-- Aperture -->
  <path d="M560 193 L572 217 L548 217 Z" fill="#00c853" opacity="0.85"/>
  <path d="M560 293 L548 269 L572 269 Z" fill="#00c853" opacity="0.85"/>
  <path d="M510 243 L534 231 L534 255 Z" fill="#00c853" opacity="0.85"/>
  <path d="M610 243 L586 255 L586 231 Z" fill="#00c853" opacity="0.85"/>
  <!-- Lens center -->
  <circle cx="560" cy="243" r="28" fill="#0a0a0a" stroke="#00c853" stroke-width="2"/>
  <circle cx="560" cy="243" r="14" fill="#00c853"/>
  <circle cx="567" cy="236" r="5.5" fill="white" opacity="0.35"/>
  <!-- CCTV arm -->
  <path d="M690 185 L780 158 L780 330 L690 302" stroke="#00c853" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <!-- Record dot -->
  <circle cx="680" cy="178" r="11" fill="#ef4444"/>
  <circle cx="680" cy="178" r="6" fill="#ff6b6b"/>

  <!-- Brand text -->
  <text x="600" y="435" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" font-weight="900" font-size="72" letter-spacing="-2">
    <tspan fill="#00c853">Hidden</tspan><tspan fill="#ffffff">Cameras</tspan><tspan fill="#6b7280">.tv</tspan>
  </text>

  <!-- Tagline -->
  <text x="600" y="490" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" font-weight="400" font-size="26" fill="#6b7280" letter-spacing="1">
    REVIEWS · LIVE CAMS · BUYING GUIDES
  </text>

  <!-- Bottom bar -->
  <rect x="0" y="580" width="1200" height="50" fill="#00c853" opacity="0.08"/>
  <text x="600" y="610" text-anchor="middle" font-family="monospace" font-size="15" fill="#00c853" opacity="0.7" letter-spacing="3">
    HIDDENCAMERAS.TV
  </text>
</svg>`;

// ─── Apple Touch Icon SVG (512x512) ──────────────────────────────────────────
const APPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="100" fill="#0d0d0d"/>
  <rect x="44" y="156" width="320" height="220" rx="40" fill="#1a1a1a" stroke="#00c853" stroke-width="16"/>
  <rect x="156" y="108" width="80" height="56" rx="20" fill="#00c853"/>
  <circle cx="204" cy="266" r="80" fill="#0d0d0d" stroke="#00c853" stroke-width="16"/>
  <circle cx="204" cy="266" r="44" fill="#00c853"/>
  <circle cx="224" cy="246" r="16" fill="white" opacity="0.4"/>
  <path d="M364 200 L464 168 L464 368 L364 336" stroke="#00c853" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <circle cx="352" cy="188" r="26" fill="#ef4444"/>
</svg>`;

async function generate() {
  // Favicon 16x16
  await sharp(Buffer.from(FAVICON_SVG)).resize(16,16).png().toFile(path.join(pub,"favicon-16x16.png"));
  console.log("✓ favicon-16x16.png");

  // Favicon 32x32
  await sharp(Buffer.from(FAVICON_SVG)).resize(32,32).png().toFile(path.join(pub,"favicon-32x32.png"));
  console.log("✓ favicon-32x32.png");

  // Favicon 180x180 (apple-touch-icon)
  await sharp(Buffer.from(APPLE_SVG)).resize(180,180).png().toFile(path.join(pub,"apple-touch-icon.png"));
  console.log("✓ apple-touch-icon.png");

  // Android icon 192
  await sharp(Buffer.from(APPLE_SVG)).resize(192,192).png().toFile(path.join(pub,"icon-192.png"));
  console.log("✓ icon-192.png");

  // Android icon 512
  await sharp(Buffer.from(APPLE_SVG)).resize(512,512).png().toFile(path.join(pub,"icon-512.png"));
  console.log("✓ icon-512.png");

  // OG image 1200x630
  await sharp(Buffer.from(OG_SVG)).resize(1200,630).png().toFile(path.join(pub,"og-image.png"));
  console.log("✓ og-image.png");

  console.log("All icons generated.");
}

generate().catch(e => { console.error(e); process.exit(1); });
