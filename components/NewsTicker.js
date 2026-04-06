const HEADLINES = [
  "🏠 Airbnb bans ALL indoor hidden cameras effective April 30, 2026",
  "📡 Ring unveils AI facial-recognition doorbell — launching Q3 2026",
  "🇪🇺 EU Surveillance Camera Privacy Act takes full effect June 1, 2026",
  "🔍 Hidden camera detector sales surge 340% after hotel incidents",
  "🏙️ Tokyo deploys 50,000 AI-powered cameras for 2026 World Expo",
  "📷 Google Nest Cam Ultra 8K announced at $299 — shipping this summer",
  "💰 FTC fines covert spy cam seller $2.1M for deceptive marketing",
  "🚀 Wyze Cam v5 leaks: 4K, local AI processing, no subscription required",
  "🏆 Consumer Reports: Arlo Pro 5S wins Best Security Camera 2026",
  "✈️ US airports installing full biometric cameras at all gates by 2027",
  "🍎 Apple HomeKit Secure Video expands to 24 new camera brands in 2026",
  "🚫 Hikvision US government ban expanded to all state-level contracts",
  "🔐 New FCC rules require security cameras to meet minimum encryption standards",
  "🌐 EarthCam launches 500 new 4K city webcam feeds across 80 countries",
];

export default function NewsTicker() {
  const items = [...HEADLINES, ...HEADLINES];
  return (
    <div className="bg-[#0d1117] border-b border-brand-border overflow-hidden" style={{ height: "30px" }}>
      <div className="flex items-center h-full">
        <div className="shrink-0 flex items-center gap-1.5 bg-red-600 px-3 h-full z-10 select-none">
          <span className="live-dot w-1.5 h-1.5 rounded-full bg-white inline-block" />
          <span className="text-white text-[10px] font-extrabold tracking-widest whitespace-nowrap uppercase">Cam News</span>
        </div>
        <div className="overflow-hidden flex-1 relative h-full">
          <div className="ticker-scroll absolute inset-y-0 left-0 flex items-center">
            {items.map((h, i) => (
              <span key={i} className="text-gray-400 text-[11px] whitespace-nowrap">
                <span className="px-5">{h}</span>
                <span className="text-brand-border">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
