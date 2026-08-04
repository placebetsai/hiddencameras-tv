import { useState } from "react";
import Layout from "../components/Layout";
import AdUnit from "../components/AdUnit";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import HomeSecurityCTA from "../components/HomeSecurityCTA";

const QUESTIONS = [
  {
    id: "location",
    question: "Where will you use this camera?",
    options: [
      { label: "Indoor (nursery, living room, office)", value: "indoor" },
      { label: "Outdoor (yard, driveway, front door)", value: "outdoor" },
      { label: "Both indoor and outdoor", value: "both" },
      { label: "Discreet / hidden location", value: "hidden" },
    ],
  },
  {
    id: "budget",
    question: "What's your budget?",
    options: [
      { label: "Under $25", value: "under25" },
      { label: "$25–$50", value: "25to50" },
      { label: "$50–$100", value: "50to100" },
      { label: "No limit — I want the best", value: "unlimited" },
    ],
  },
  {
    id: "features",
    question: "What's your must-have feature?",
    options: [
      { label: "Motion alerts on my phone", value: "motion" },
      { label: "Two-way audio (talk through camera)", value: "audio" },
      { label: "Pan-tilt-zoom (PTZ) coverage", value: "ptz" },
      { label: "Local storage — no cloud subscription", value: "local" },
    ],
  },
  {
    id: "night",
    question: "Do you need night vision?",
    options: [
      { label: "Yes, color night vision preferred", value: "color" },
      { label: "Standard infrared (black & white) is fine", value: "ir" },
      { label: "Not needed — well-lit area", value: "none" },
    ],
  },
  {
    id: "storage",
    question: "How do you want to store footage?",
    options: [
      { label: "Cloud subscription (access anywhere)", value: "cloud" },
      { label: "Local microSD card (no monthly fees)", value: "sd" },
      { label: "Don't care — whatever's easiest", value: "any" },
    ],
  },
];

const CAMERAS = [
  {
    name: "Night Vision 1080p Portable Mini Camera",
    price: "18.67",
    image: "https://cdn.shopify.com/s/files/1/0908/9830/1233/files/product-image-590255746.jpg?v=1734006412",
    url: "https://www.amazon.com/dp/B0C...?tag=hiddencamerastv-20",
    category: "hidden",
    match: { location: ["hidden", "indoor"], budget: ["under25"], night: ["ir", "color"], features: ["motion"], storage: ["sd", "any"] },
    reason: "Ultra-discreet design, night vision built-in, and under $20. Perfect if you need a hidden camera that just works.",
  },
  {
    name: "Wireless 1080p Indoor Security Camera",
    price: "29.99",
    image: "https://cdn.shopify.com/s/files/1/0908/9830/1233/files/ce4a354e401f9f52a0a205019565_import.webp?v=1776700523",
    url: "https://www.amazon.com/dp/B09...?tag=hiddencamerastv-20",
    category: "indoor",
    match: { location: ["indoor", "both"], budget: ["25to50", "under25"], night: ["ir", "none"], features: ["motion", "audio"], storage: ["sd", "any"] },
    reason: "Best value indoor camera with motion alerts, two-way audio, and SD card storage. No subscription needed.",
  },
  {
    name: "IP65 Outdoor WiFi Camera V380 Pro",
    price: "34.99",
    image: "https://cdn.shopify.com/s/files/1/0908/9830/1233/files/25d7661a4daab3d111e99415baa8_import.webp?v=1776700543",
    url: "https://www.amazon.com/dp/B09...?tag=hiddencamerastv-20",
    category: "outdoor",
    match: { location: ["outdoor", "both"], budget: ["25to50"], night: ["ir", "color"], features: ["motion"], storage: ["sd", "cloud", "any"] },
    reason: "Weatherproof IP65 rating handles rain and dust. WiFi-connected with remote viewing from your phone.",
  },
  {
    name: "Mini Hidden Nanny Cam 1080p",
    price: "44.99",
    image: "https://cdn.shopify.com/s/files/1/0908/9830/1233/files/f87678c148429c744b40c5316309_import.webp?v=1776700515",
    url: "https://www.amazon.com/dp/B0CGX9GQ3Q?tag=hiddencamerastv-20",
    category: "hidden",
    match: { location: ["hidden", "indoor"], budget: ["25to50", "50to100"], night: ["ir"], features: ["motion", "audio"], storage: ["sd"] },
    reason: "Disguised as an everyday object. 1080p recording with motion-triggered capture. No visible lens.",
  },
  {
    name: "1080p Pan-Tilt-Zoom Indoor Pet/Baby Monitor",
    price: "49.99",
    image: "https://cdn.shopify.com/s/files/1/0908/9830/1233/files/1cf02a014b8ca066842f08540aea_import.webp?v=1776700530",
    url: "https://www.amazon.com/dp/B09...?tag=hiddencamerastv-20",
    category: "indoor",
    match: { location: ["indoor", "both"], budget: ["25to50", "50to100"], night: ["ir", "none"], features: ["ptz", "audio", "motion"], storage: ["sd", "any"] },
    reason: "360-degree pan-tilt coverage from a single camera. Two-way audio for talking to pets or babies. Smart tracking follows movement.",
  },
  {
    name: "1080p IP66 Outdoor WiFi Bullet Camera",
    price: "54.99",
    image: "https://cdn.shopify.com/s/files/1/0908/9830/1233/files/9c1a00b04a4ab270d65f34493fae_import.webp?v=1776700550",
    url: "https://www.amazon.com/dp/B09...?tag=hiddencamerastv-20",
    category: "outdoor",
    match: { location: ["outdoor", "both"], budget: ["50to100", "25to50"], night: ["color", "ir"], features: ["motion"], storage: ["cloud", "sd", "any"] },
    reason: "IP66-rated bullet camera with color night vision. Visible deterrent design — lets intruders know they're being watched.",
  },
  {
    name: "Solar-Powered Outdoor WiFi Camera",
    price: "39.99",
    image: "https://cdn.shopify.com/s/files/1/0908/9830/1233/files/cc532fe94fda8e1846699ae909b1_import.webp?v=1776700557",
    url: "https://www.amazon.com/dp/B09...?tag=hiddencamerastv-20",
    category: "outdoor",
    match: { location: ["outdoor"], budget: ["25to50", "50to100"], night: ["color", "ir"], features: ["motion"], storage: ["sd", "cloud", "any"] },
    reason: "Solar panel keeps it charged forever. No wiring needed. Perfect for remote areas without power outlets.",
  },
  {
    name: "4K Mini WiFi Pinhole Hidden Camera",
    price: "54.99",
    image: "https://cdn.shopify.com/s/files/1/0908/9830/1233/files/93a5ffe849d2bc14650bf077d71f_import.webp?v=1776700498",
    url: "https://www.amazon.com/dp/B07MFWKM6R?tag=hiddencamerastv-20",
    category: "hidden",
    match: { location: ["hidden"], budget: ["50to100", "unlimited"], night: ["ir"], features: ["motion"], storage: ["sd"] },
    reason: "4K resolution in a pinhole form factor. The highest-quality hidden camera we stock — captures faces clearly.",
  },
  {
    name: "2K Pan-Tilt Pet + Baby Camera with Smart Tracking",
    price: "79.99",
    image: "https://cdn.shopify.com/s/files/1/0908/9830/1233/files/88e9158a41d48aaabb05efcc5bae_import.webp?v=1776700536",
    url: "https://www.amazon.com/dp/B09...?tag=hiddencamerastv-20",
    category: "indoor",
    match: { location: ["indoor", "both"], budget: ["50to100", "unlimited"], night: ["color", "ir"], features: ["ptz", "audio", "motion"], storage: ["sd", "cloud"] },
    reason: "2K resolution with AI smart tracking — follows pets or people automatically. Premium pick for whole-room monitoring.",
  },
];

function scoreCamera(camera, answers) {
  let score = 0;
  const max = Object.keys(answers).length;
  for (const [key, value] of Object.entries(answers)) {
    if (camera.match[key] && camera.match[key].includes(value)) score++;
  }
  return score / max;
}

function getRecommendations(answers) {
  return CAMERAS
    .map(cam => ({ ...cam, score: scoreCamera(cam, answers) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export default function CameraFinderPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);

  const currentQ = QUESTIONS[step];
  const progress = ((step) / QUESTIONS.length) * 100;

  function handleAnswer(value) {
    const updated = { ...answers, [currentQ.id]: value };
    setAnswers(updated);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setResults(getRecommendations(updated));
    }
  }

  function restart() {
    setStep(0);
    setAnswers({});
    setResults(null);
  }

  return (
    <Layout
      title="Camera Finder Quiz – Find the Perfect Security Camera | HiddenCameras.tv"
      description="Answer 5 quick questions and we'll recommend the best security camera for your needs. Compare prices, features, and storage options."
      canonical="https://hiddencameras.tv/camera-finder"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Quiz",
            name: "Camera Finder Quiz",
            description: "Find the perfect security camera for your needs in 5 questions.",
            educationalLevel: "Beginner",
          }),
        }}
      />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">INTERACTIVE TOOL</div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
          Camera Finder Quiz
        </h1>
        <p className="text-gray-400 mb-8 max-w-2xl">
          Answer 5 quick questions and we&apos;ll match you with the perfect camera from our catalog. No fluff, no sponsored bias &mdash; just the right camera for your situation.
        </p>

        <AffiliateDisclosure />

        {!results ? (
          <div className="mt-8">
            {/* Progress bar */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-green rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 font-mono">{step + 1}/{QUESTIONS.length}</span>
            </div>

            {/* Question card */}
            <div className="rounded-2xl border border-gray-800 bg-black/50 p-6 md:p-8 mb-8">
              <div className="text-brand-green text-xs font-mono uppercase tracking-widest mb-2">
                Question {step + 1}
              </div>
              <h2 className="text-xl font-bold text-white mb-6">{currentQ.question}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      answers[currentQ.id] === opt.value
                        ? "border-brand-green bg-brand-green/10 text-white"
                        : "border-gray-800 bg-gray-900/50 text-gray-300 hover:border-gray-600 hover:bg-gray-800/50"
                    }`}
                  >
                    <span className="text-sm font-semibold">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <AdUnit />

            {/* Tips section */}
            <div className="mt-8 rounded-2xl border border-gray-800 bg-black/50 p-6">
              <h3 className="text-white font-bold mb-3">While you decide&hellip;</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400">
                <div className="flex gap-3">
                  <span className="text-brand-green text-lg shrink-0">💡</span>
                  <p>Indoor cameras are great for monitoring pets, babies, and deliveries. Most work with Alexa and Google Home.</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-brand-green text-lg shrink-0">💡</span>
                  <p>Outdoor cameras need IP65+ weatherproofing. Solar-powered options eliminate wiring headaches entirely.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* RESULTS */
          <div className="mt-8">
            <div className="rounded-2xl border border-brand-green/30 bg-brand-green/5 p-6 mb-8">
              <div className="text-brand-green text-xs font-mono uppercase tracking-widest mb-2">Your Results</div>
              <h2 className="text-xl font-bold text-white mb-2">We recommend these 3 cameras for you:</h2>
              <p className="text-gray-400 text-sm">Ranked by how well they match your needs. Tap to check current prices on Amazon.</p>
            </div>

            <div className="space-y-4 mb-8">
              {results.map((cam, i) => (
                <a
                  key={cam.name}
                  href={cam.url}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="card hover:border-brand-green/40 transition flex flex-col sm:flex-row gap-5 p-5"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-3xl font-black text-brand-green shrink-0 w-10 text-center">
                      #{i + 1}
                    </div>
                    <img
                      src={cam.image}
                      alt={cam.name}
                      className="w-20 h-20 object-contain rounded-lg bg-white/5 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-sm">{cam.name}</h3>
                      <div className="text-brand-green font-black text-lg mt-1">${cam.price}</div>
                      <p className="text-gray-400 text-xs mt-2 leading-relaxed">{cam.reason}</p>
                      <div className="mt-2">
                        <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/25">
                          {Math.round(cam.score * 100)}% match
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center sm:items-end">
                    <span className="text-brand-green text-xs font-bold whitespace-nowrap">Check Price on Amazon →</span>
                  </div>
                </a>
              ))}
            </div>

            <AdUnit />

            <div className="text-center">
              <button
                onClick={restart}
                className="px-6 py-3 rounded-xl border border-gray-700 text-gray-400 hover:border-brand-green hover:text-brand-green transition text-sm font-semibold"
              >
                ↺ Retake the Quiz
              </button>
            </div>

            <div className="mt-8">
              <HomeSecurityCTA />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
