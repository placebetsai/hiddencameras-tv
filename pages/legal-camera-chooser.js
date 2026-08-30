import { useState } from "react";
import Layout from "../components/Layout";
import AdUnit from "../components/AdUnit";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import HomeSecurityCTA from "../components/HomeSecurityCTA";

const STEPS = [
  {
    id: "situation",
    question: "What's your situation?",
    options: [
      { label: "Nanny / Babysitter", value: "nanny", icon: "👶" },
      { label: "Elderly parent care", value: "elderly", icon: "🧓" },
      { label: "Home security", value: "home", icon: "🏠" },
      { label: "Rental property / Airbnb", value: "rental", icon: "🔑" },
      { label: "Pet monitoring", value: "pet", icon: "🐾" },
      { label: "Dash cam", value: "dash", icon: "🚗" },
      { label: "Business / Office", value: "business", icon: "🏢" },
    ],
  },
  {
    id: "visibility",
    question: "Hidden or visible?",
    options: [
      { label: "Visible deterrent", value: "visible", icon: "👁" },
      { label: "Hidden / secret", value: "hidden", icon: "🕵️" },
      { label: "Don't know", value: "unsure", icon: "🤔" },
    ],
  },
  {
    id: "audio",
    question: "Do you need audio recording?",
    options: [
      { label: "Yes", value: "yes", icon: "🎙" },
      { label: "No", value: "no", icon: "🔇" },
      { label: "Not sure", value: "unsure", icon: "🤔" },
    ],
  },
  {
    id: "state",
    question: "Your state",
    type: "dropdown",
  },
];

const STATES = [
  { name: "Alabama", consent: "one-party", note: "You can record if you are part of the conversation." },
  { name: "Alaska", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Arizona", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Arkansas", consent: "one-party", note: "Consent of at least one party required." },
  { name: "California", consent: "two-party", note: "All parties must consent to recording. Penal Code §632." },
  { name: "Colorado", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Connecticut", consent: "two-party", note: "All parties must consent. Camera-only (no audio) may be exempt." },
  { name: "Delaware", consent: "two-party", note: "All parties must consent to recording." },
  { name: "Florida", consent: "two-party", note: "All parties must consent. Fla. Stat. §934.03." },
  { name: "Georgia", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Hawaii", consent: "two-party", note: "All parties must consent to recording." },
  { name: "Idaho", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Illinois", consent: "two-party", note: "All parties must consent. Eavesdropping statute is strict." },
  { name: "Indiana", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Iowa", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Kansas", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Kentucky", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Louisiana", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Maine", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Maryland", consent: "two-party", note: "All parties must consent. Md. Code §10-402." },
  { name: "Massachusetts", consent: "two-party", note: "All parties must consent to recording." },
  { name: "Michigan", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Minnesota", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Mississippi", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Missouri", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Montana", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Nebraska", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Nevada", consent: "two-party", note: "All parties must consent to recording." },
  { name: "New Hampshire", consent: "one-party", note: "Consent of at least one party required." },
  { name: "New Jersey", consent: "two-party", note: "All parties must consent to recording." },
  { name: "New Mexico", consent: "one-party", note: "Consent of at least one party required." },
  { name: "New York", consent: "one-party", note: "Consent of at least one party required." },
  { name: "North Carolina", consent: "two-party", note: "All parties must consent. N.C.G.S. §15A-266." },
  { name: "North Dakota", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Ohio", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Oklahoma", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Oregon", consent: "two-party", note: "All parties must consent to recording." },
  { name: "Pennsylvania", consent: "two-party", note: "All parties must consent. 18 Pa.C.S. §5703." },
  { name: "Rhode Island", consent: "two-party", note: "All parties must consent to recording." },
  { name: "South Carolina", consent: "one-party", note: "Consent of at least one party required." },
  { name: "South Dakota", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Tennessee", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Texas", consent: "one-party", note: "Consent of at least one party required. Penal Code §39.02." },
  { name: "Utah", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Vermont", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Virginia", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Washington", consent: "two-party", note: "All parties must consent. RCW 9.73.030." },
  { name: "West Virginia", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Wisconsin", consent: "one-party", note: "Consent of at least one party required." },
  { name: "Wyoming", consent: "one-party", note: "Consent of at least one party required." },
];

const CAMERAS = {
  visible: {
    home: [
      { name: "Ring Indoor Cam (2nd Gen)", price: "$59.99", asin: "B09WGY4T6K", reason: "Built-in siren, two-way audio, and Motion Detection. Hardwired for 24/7 recording. Alexa-compatible." },
      { name: "Wyze Cam v3", price: "$35.98", asin: "B09WTKC8V4", reason: "Starlight sensor for color night vision. IP65 weatherproof. Local SD card or cloud. Best budget option." },
      { name: "eufy E30 Indoor Cam", price: "$49.99", asin: "B0C4XQJN5S", reason: "2K resolution, local storage with HomeBase, no subscription. Human/pet AI detection. Privacy mode." },
    ],
    nanny: [
      { name: "Wyze Cam v3", price: "$35.98", asin: "B09WTKC8V4", reason: "Affordable, reliable, and compact. Motion alerts sent to your phone. Two-way audio for checking in." },
      { name: "Ring Indoor Cam (2nd Gen)", price: "$59.99", asin: "B09WGY4T6K", reason: "Discreet tabletop mount. Works with Alexa. Shared access for partners or family members." },
      { name: "eufy E30 Indoor Cam", price: "$49.99", asin: "B0C4XQJN5S", reason: "No monthly fees. Stores footage locally. Crystal-clear 2K with night vision." },
    ],
    elderly: [
      { name: "Wyze Cam v3", price: "$35.98", asin: "B09WTKC8V4", reason: "Two-way audio lets you talk to your parent remotely. Motion alerts show daily activity patterns." },
      { name: "Ring Indoor Cam (2nd Gen)", price: "$59.99", asin: "B09WGY4T6K", reason: "Quick setup, shared viewing for family. Integrates with Ring alarm system if already installed." },
      { name: "eufy E30 Indoor Cam", price: "$49.99", asin: "B0C4XQJN5S", reason: "Privacy mode toggles camera off when you visit. No subscription required for full functionality." },
    ],
    rental: [
      { name: "Ring Indoor Cam (2nd Gen)", price: "$59.99", asin: "B09WGY4T6K", reason: "Discreet design. Must be disclosed to guests per Airbnb policy and most state laws. Hardwired." },
      { name: "Wyze Cam v3", price: "$35.98", asin: "B09WTKC8V4", reason: "Low-cost option for monitoring common areas. Outdoor model available for exterior coverage." },
      { name: "eufy E30 Indoor Cam", price: "$49.99", asin: "B0C4XQJN5S", reason: "Local storage means guest footage stays on-premises. No cloud upload of guest activity." },
    ],
    pet: [
      { name: "Wyze Cam v3", price: "$35.98", asin: "B09WTKC8V4", reason: "Two-way audio for talking to pets. Motion tracking captures activity. Weatherproof for pet doors." },
      { name: "eufy E30 Indoor Cam", price: "$49.99", asin: "B0C4XQJN5S", reason: "Pet detection AI reduces false alerts. 2K clarity to see what your pet is chewing on." },
      { name: "Ring Indoor Cam (2nd Gen)", price: "$59.99", asin: "B09WGY4T6K", reason: "Works with Alexa: 'Show me the pet cam.' Instant live view on Echo Show or Fire TV." },
    ],
    dash: [
      { name: "Viofo A119 Mini 2", price: "$69.99", asin: "B0C4XQJN5S", reason: "2K dash cam with GPS logger. Parking mode with motion detection. Compact windshield mount." },
      { name: "Vantrue N2X", price: "$129.99", asin: "B09WTKC8V4", reason: "Front and cabin dual-camera. Infrared interior recording. Ideal for rideshare drivers." },
      { name: "Rexing V1", price: "$89.99", asin: "B09WGY4T6K", reason: "170-degree wide angle, loop recording, G-sensor. Proven reliability with millions sold." },
    ],
    business: [
      { name: "Ring Indoor Cam (2nd Gen)", price: "$59.99", asin: "B09WGY4T6K", reason: "Multi-camera setup via Ring app. Shared access for security staff. Professional monitoring available." },
      { name: "eufy E30 Indoor Cam", price: "$49.99", asin: "B0C4XQJN5S", reason: "No subscription for multiple cameras. Local storage keeps business footage on-site. AI person detection." },
      { name: "Wyze Cam v3", price: "$35.98", asin: "B09WTKC8V4", reason: "Deploy multiple units cheaply. Cloud or local storage options. Works in warehouses and offices." },
    ],
  },
  hidden: {
    nanny: [
      { name: "Mini Hidden Nanny Cam 1080p", price: "$44.99", asin: "B0CJ9YX7DG", reason: "Disguised as an everyday object. 1080p recording with motion-triggered capture. No visible lens." },
      { name: "4K Mini WiFi Pinhole Camera", price: "$54.99", asin: "B07MFWKM6R", reason: "4K pinhole resolution captures faces clearly. WiFi remote viewing. SD card recording." },
      { name: "Night Vision 1080p Portable Mini Camera", price: "$18.67", asin: "B0C...?", reason: "Ultra-discreet design under $20. Built-in night vision. Motion-triggered 1080p capture." },
    ],
    elderly: [
      { name: "Mini Hidden Nanny Cam 1080p", price: "$44.99", asin: "B0CJ9YX7DG", reason: "Monitor without alarming your parent. Discreet placement in living areas or kitchen." },
      { name: "Night Vision 1080p Portable Mini Camera", price: "$18.67", asin: "B0C...?", reason: "Budget option for room monitoring. Night vision works in low-light conditions." },
      { name: "4K Mini WiFi Pinhole Camera", price: "$54.99", asin: "B07MFWKM6R", reason: "High-resolution capture for identifying visitors. Remote WiFi access from your phone." },
    ],
    home: [
      { name: "4K Mini WiFi Pinhole Camera", price: "$54.99", asin: "B07MFWKM6R", reason: "4K hidden camera for maximum detail. WiFi for remote access. MicroSD recording." },
      { name: "Mini Hidden Nanny Cam 1080p", price: "$44.99", asin: "B0CJ9YX7DG", reason: "Concealed in common household item. Motion alerts and auto-recording." },
      { name: "Night Vision 1080p Portable Mini Camera", price: "$18.67", asin: "B0C...?", reason: "Entry-level covert camera. Night vision and motion detection built in." },
    ],
    rental: [
      { name: "4K Mini WiFi Pinhole Camera", price: "$54.99", asin: "B07MFWKM6R", reason: "Highest quality covert recording. Important: disclosure laws vary by state for rental properties." },
      { name: "Mini Hidden Nanny Cam 1080p", price: "$44.99", asin: "B0CJ9YX7DG", reason: "Discreet monitoring. Check local laws — hidden cameras in rentals have strict rules in most states." },
      { name: "Night Vision 1080p Portable Mini Camera", price: "$18.67", asin: "B0C...?", reason: "Low-cost covert option. Legal requirements vary — always check your state consent laws first." },
    ],
    pet: [
      { name: "Mini Hidden Nanny Cam 1080p", price: "$44.99", asin: "B0CJ9YX7DG", reason: "Place discreetly to see what pets do when alone. Motion-triggered recording saves storage." },
      { name: "Night Vision 1080p Portable Mini Camera", price: "$18.67", asin: "B0C...?", reason: "Compact and portable. Move between rooms as needed. Night vision for dark areas." },
      { name: "4K Mini WiFi Pinhole Camera", price: "$54.99", asin: "B07MFWKM6R", reason: "4K detail catches every behavior. WiFi lets you check live from work or travel." },
    ],
    dash: [
      { name: "Viofo A119 Mini 2", price: "$69.99", asin: "B0C4XQJN5S", reason: "Compact hidden mount. 2K with GPS. Parking mode records when car is off." },
      { name: "Vantrue N2X", price: "$129.99", asin: "B09WTKC8V4", reason: "Dual front + cabin cameras. Infrared for interior recording at night." },
      { name: "Rexing V1", price: "$89.99", asin: "B09WGY4T6K", reason: "Sleek hidden design behind rearview mirror. Wide 170-degree lens." },
    ],
    business: [
      { name: "4K Mini WiFi Pinhole Camera", price: "$54.99", asin: "B07MFWKM6R", reason: "Covert office monitoring. High resolution for identifying people. Important: employee notification laws apply." },
      { name: "Mini Hidden Nanny Cam 1080p", price: "$44.99", asin: "B0CJ9YX7DG", reason: "Discreet placement in office. Check local employment recording laws before deploying." },
      { name: "Night Vision 1080p Portable Mini Camera", price: "$18.67", asin: "B0C...?", reason: "Budget covert option. Most states require employee notification — verify your state rules." },
    ],
  },
  unsure: null,
};

const STORAGE_RECS = {
  home: { type: "cloud", reason: "Cloud storage keeps footage safe even if the camera is stolen or damaged." },
  nanny: { type: "sd", reason: "Local SD card keeps nanny footage private. No third-party cloud access." },
  elderly: { type: "cloud", reason: "Cloud backup ensures footage is preserved if the camera is tampered with." },
  rental: { type: "cloud", reason: "Cloud storage protects evidence from tampering. Check retention policies with your provider." },
  pet: { type: "sd", reason: "SD cards handle large amounts of continuous footage without subscription fees." },
  dash: { type: "sd", reason: "Dash cams use loop recording on microSD — cloud would be impractical at driving speeds." },
  business: { type: "cloud", reason: "Cloud storage with access logs supports compliance requirements and legal defensibility." },
};

function getCameraRecommendations(situation, visibility) {
  if (visibility === "unsure") {
    const visible = CAMERAS.visible[situation] || CAMERAS.visible.home;
    const hidden = CAMERAS.hidden[situation] || CAMERAS.hidden.home;
    return [...visible.slice(0, 2), hidden[0]];
  }
  return CAMERAS[visibility]?.[situation] || CAMERAS.visible.home;
}

function getConsentType(stateName) {
  return STATES.find((s) => s.name === stateName);
}

function getReviewLink(situation) {
  const map = {
    nanny: "/nanny-cam",
    elderly: "/indoor-security-cameras",
    home: "/outdoor-security-cameras",
    rental: "/best-hidden-cameras-airbnb",
    pet: "/pet-cameras",
    dash: "/car-cameras",
    business: "/indoor-security-cameras",
  };
  return map[situation] || "/reviews";
}

export default function LegalCameraChooserPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);

  const currentQ = STEPS[step];
  const progress = ((step) / STEPS.length) * 100;

  function handleSelect(value) {
    const updated = { ...answers, [currentQ.id]: value };
    setAnswers(updated);
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setResults({
        cameras: getCameraRecommendations(updated.situation, updated.visibility),
        stateData: getConsentType(updated.state),
        storage: STORAGE_RECS[updated.situation] || STORAGE_RECS.home,
        situation: updated.situation,
        visibility: updated.visibility,
        audio: updated.audio,
      });
    }
  }

  function restart() {
    setStep(0);
    setAnswers({});
    setResults(null);
  }

  const isTwoParty = results?.stateData?.consent === "two-party";
  const needsAudioWarning = results?.audio === "yes" && isTwoParty;
  const reviewPath = getReviewLink(results?.situation);

  return (
    <Layout
      title="Legal Camera Chooser — Find the Right Camera & Know the Law | HiddenCameras.tv"
      description="Answer 4 questions to get a camera recommendation plus the legal recording rules for your state. One-party vs two-party consent explained."
      canonical="https://hiddencameras.tv/legal-camera-chooser"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Legal Camera Chooser",
            description: "Find the right security camera and understand your state's recording laws.",
            step: [
              { "@type": "HowToStep", name: "Situation", text: "Select your use case (nanny, home, business, etc.)" },
              { "@type": "HowToStep", name: "Visibility", text: "Choose hidden or visible camera" },
              { "@type": "HowToStep", name: "Audio", text: "Decide if you need audio recording" },
              { "@type": "HowToStep", name: "State", text: "Select your US state for consent laws" },
            ],
          }),
        }}
      />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">INTERACTIVE TOOL</div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
          Choose the Right Camera — Legally
        </h1>
        <p className="text-gray-400 mb-8 max-w-2xl">
          Tell us your situation. We&apos;ll recommend the right camera and explain the legal rules.
        </p>

        <AffiliateDisclosure />

        {!results ? (
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-green rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 font-mono">{step + 1}/{STEPS.length}</span>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-black/50 p-6 md:p-8 mb-8">
              <div className="text-brand-green text-xs font-mono uppercase tracking-widest mb-2">
                Step {step + 1}
              </div>
              <h2 className="text-xl font-bold text-white mb-6">{currentQ.question}</h2>

              {currentQ.type === "dropdown" ? (
                <div>
                  <label htmlFor="state-select" className="block text-sm text-gray-400 mb-2">Select your state</label>
                  <select
                    id="state-select"
                    className="w-full p-4 rounded-xl border border-gray-800 bg-gray-900/50 text-white text-sm focus:border-brand-green focus:outline-none transition"
                    defaultValue=""
                    onChange={(e) => {
                      if (e.target.value) handleSelect(e.target.value);
                    }}
                  >
                    <option value="" disabled>Choose a state…</option>
                    {STATES.map((s) => (
                      <option key={s.name} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQ.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        answers[currentQ.id] === opt.value
                          ? "border-brand-green bg-brand-green/10 text-white"
                          : "border-gray-800 bg-gray-900/50 text-gray-300 hover:border-gray-600 hover:bg-gray-800/50"
                      }`}
                    >
                      <span className="text-lg mr-2">{opt.icon}</span>
                      <span className="text-sm font-semibold">{opt.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <AdUnit />

            <div className="mt-8 rounded-2xl border border-gray-800 bg-black/50 p-6">
              <h3 className="text-white font-bold mb-3">While you decide&hellip;</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400">
                <div className="flex gap-3">
                  <span className="text-brand-green text-lg shrink-0">⚖️</span>
                  <p>Two-party consent states (CA, FL, IL, PA, WA) require ALL people being recorded to agree. Audio is the biggest legal risk.</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-brand-green text-lg shrink-0">📍</span>
                  <p>Cameras in bathrooms, guest bedrooms, or rental sleeping areas are illegal in every state — regardless of consent rules.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-brand-green/30 bg-brand-green/5 p-6">
              <div className="text-brand-green text-xs font-mono uppercase tracking-widest mb-2">Your Results</div>
              <h2 className="text-xl font-bold text-white mb-2">Here&apos;s your legal camera plan for {results.stateData?.name || "your state"}:</h2>
              <p className="text-gray-400 text-sm">Camera recommendations, consent laws, and storage tips — all based on your answers.</p>
            </div>

            {/* Camera Recommendations */}
            <div className="rounded-2xl border border-gray-800 bg-black/50 p-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="text-brand-green">📷</span> Recommended Cameras
              </h3>
              <div className="space-y-3">
                {results.cameras.map((cam, i) => (
                  <a
                    key={cam.name}
                    href={`https://www.amazon.com/dp/${cam.asin}?tag=hiddencamerastv-20`}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="block rounded-xl border border-gray-800 bg-gray-900/50 p-4 hover:border-brand-green/40 transition"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-brand-green font-black text-sm">#{i + 1}</span>
                          <h4 className="text-white font-bold text-sm">{cam.name}</h4>
                        </div>
                        <p className="text-gray-400 text-xs leading-relaxed">{cam.reason}</p>
                      </div>
                      <span className="text-brand-green font-black text-sm whitespace-nowrap">{cam.price}</span>
                    </div>
                    <span className="text-brand-green text-xs font-semibold mt-2 inline-block">Check Price on Amazon →</span>
                  </a>
                ))}
              </div>
            </div>

            <AdUnit />

            {/* Legal Summary */}
            <div className={`rounded-2xl border p-6 ${isTwoParty ? "border-yellow-500/30 bg-yellow-500/5" : "border-green-500/30 bg-green-500/5"}`}>
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className={isTwoParty ? "text-yellow-400" : "text-green-400"}>⚖️</span> Legal Summary — {results.stateData?.name}
              </h3>
              <div className="space-y-3 text-sm">
                <div className={`flex items-start gap-3 p-3 rounded-lg ${isTwoParty ? "bg-yellow-500/10" : "bg-green-500/10"}`}>
                  <span className={`text-lg shrink-0 ${isTwoParty ? "text-yellow-400" : "text-green-400"}`}>
                    {isTwoParty ? "⚠️" : "✅"}
                  </span>
                  <div>
                    <p className="text-white font-semibold">
                      {isTwoParty ? "Two-Party Consent State" : "One-Party Consent State"}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">{results.stateData?.note}</p>
                  </div>
                </div>

                {needsAudioWarning && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <span className="text-red-400 text-lg shrink-0">🚫</span>
                    <div>
                      <p className="text-red-400 font-semibold">Audio Recording Warning</p>
                      <p className="text-gray-400 text-xs mt-1">
                        In {results.stateData?.name}, recording audio without consent from all parties is a felony. Your camera must record video-only, or you must get written consent from everyone being recorded. Penalties include 1–5 years in prison and fines up to $10,000.
                      </p>
                    </div>
                  </div>
                )}

                {results.audio === "unsure" && isTwoParty && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <span className="text-yellow-400 text-lg shrink-0">💡</span>
                    <div>
                      <p className="text-yellow-400 font-semibold">Consider Disabling Audio</p>
                      <p className="text-gray-400 text-xs mt-1">
                        {results.stateData?.name} requires all-party consent for audio. If you might record conversations, disable audio or get written consent to avoid legal exposure.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Consent Warnings */}
            <div className="rounded-2xl border border-gray-800 bg-black/50 p-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="text-brand-green">📋</span> Consent Warnings & Best Practices
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-3">
                  <span className="text-brand-green shrink-0">•</span>
                  <span><strong className="text-white">Never record in bathrooms</strong> — every state criminalizes this regardless of consent type.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-green shrink-0">•</span>
                  <span><strong className="text-white">Airbnb hosts must disclose all cameras</strong> — Airbnb banned all undisclosed cameras (April 2026 policy). Visible signage required.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-green shrink-0">•</span>
                  <span><strong className="text-white">Employers need notice</strong> — most states require employee notification before workplace recording. Check your state labor laws.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-green shrink-0">•</span>
                  <span><strong className="text-white">Nanny cams are legal</strong> — in all 50 states, recording video in your own home is legal. Audio in two-party states requires consent.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-green shrink-0">•</span>
                  <span><strong className="text-white">Keep footage time-limited</strong> — most states expect reasonable retention. 30 days is a safe default for personal use.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-green shrink-0">•</span>
                  <span><strong className="text-white">Dash cams are legal in all 50 states</strong> — but audio recording in a two-party state requires passenger consent.</span>
                </li>
              </ul>
            </div>

            {/* Storage Recommendation */}
            <div className="rounded-2xl border border-gray-800 bg-black/50 p-6">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <span className="text-brand-green">💾</span> Storage Recommendation
              </h3>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-900/50">
                <span className="text-brand-green text-lg shrink-0">
                  {results.storage.type === "cloud" ? "☁️" : "💳"}
                </span>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {results.storage.type === "cloud" ? "Cloud Storage Recommended" : "Local SD Card Recommended"}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">{results.storage.reason}</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <a
                href={reviewPath}
                className="inline-block px-6 py-3 rounded-xl bg-brand-green text-black font-bold text-sm hover:bg-brand-greenDark transition"
              >
                Browse {results.situation === "dash" ? "Dash Cam" : results.situation === "rental" ? "Airbnb" : "Security Camera"} Reviews →
              </a>
            </div>

            <div className="text-center mt-3">
              <button
                onClick={restart}
                className="px-6 py-3 rounded-xl border border-gray-700 text-gray-400 hover:border-brand-green hover:text-brand-green transition text-sm font-semibold"
              >
                ↺ Start Over
              </button>
            </div>

            <div className="mt-8">
              <HomeSecurityCTA />
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
          <p className="text-yellow-400/80 text-xs leading-relaxed">
            <strong className="text-yellow-400">Disclaimer:</strong> This tool provides general information about camera laws in the United States and is not legal advice. Laws change frequently and local ordinances may impose additional restrictions. Always consult a licensed attorney in your state before installing or using any recording device. HiddenCameras.tv earns commissions on qualifying Amazon purchases.
          </p>
        </div>

        <p className="text-xs text-gray-600 mt-8">As an Amazon Associate, HiddenCameras.tv earns from qualifying purchases. <a href="/privacy" className="underline">Privacy Policy</a></p>
      </div>
    </Layout>
  );
}
