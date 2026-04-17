import Link from "next/link";

const HEADLINES = [
  { text: "Airbnb bans ALL indoor hidden cameras effective April 30, 2026", url: "/news/" },
  { text: "Ring unveils AI facial-recognition doorbell — launching Q3 2026", url: "/news/" },
  { text: "EU Surveillance Camera Privacy Act takes full effect June 1, 2026", url: "/news/" },
  { text: "Hidden camera detector sales surge 340% after hotel incidents", url: "/detect-hidden-cameras/" },
  { text: "Tokyo deploys 50,000 AI-powered cameras for 2026 World Expo", url: "/news/" },
  { text: "Google Nest Cam Ultra 8K announced at $299 — shipping this summer", url: "/reviews/" },
  { text: "FTC fines covert spy cam seller $2.1M for deceptive marketing", url: "/news/" },
  { text: "Wyze Cam v5 leaks: 4K, local AI processing, no subscription", url: "/reviews/" },
  { text: "Consumer Reports: Arlo Pro 5S wins Best Security Camera 2026", url: "/reviews/" },
  { text: "US airports installing full biometric cameras at all gates by 2027", url: "/news/" },
  { text: "Apple HomeKit Secure Video expands to 24 new camera brands", url: "/news/" },
  { text: "Hikvision US government ban expanded to all state-level contracts", url: "/news/" },
  { text: "New FCC rules require security cameras to meet minimum encryption standards", url: "/news/" },
  { text: "EarthCam launches 500 new 4K city webcam feeds across 80 countries", url: "/live/" },
];

export default function NewsTicker() {
  return (
    <div className="bg-[#0a0e12] border-b border-brand-border" style={{ minHeight: "34px" }}>
      {/* Desktop: single row */}
      <div className="hidden sm:flex items-center h-[34px] relative">
        {/* CAM NEWS badge */}
        <div className="shrink-0 flex items-center gap-1.5 bg-red-600 px-3 h-full z-10 select-none">
          <span className="live-dot w-1.5 h-1.5 rounded-full bg-white inline-block" />
          <span className="text-white text-[10px] font-extrabold tracking-widest whitespace-nowrap">CAM NEWS</span>
        </div>
        {/* Scrolling area with fade */}
        <div className="overflow-hidden flex-1 relative h-full">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #0a0e12, transparent)" }} />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #0a0e12 30%, transparent)" }} />
          <div className="ticker-wrap absolute inset-y-0 left-0 right-0 flex items-center">
            <div className="ticker-scroll flex items-center shrink-0">
              {HEADLINES.map((h, i) => (
                <a key={i} href={h.url}
                  className="text-gray-300 text-xs whitespace-nowrap hover:text-brand-green transition-colors duration-150 group flex-shrink-0">
                  <span className="text-red-500 mr-1.5 text-[10px]">●</span>
                  <span className="group-hover:underline underline-offset-2">{h.text}</span>
                  <span className="text-brand-border mx-5">·</span>
                </a>
              ))}
            </div>
            <div className="ticker-scroll flex items-center shrink-0" aria-hidden="true">
              {HEADLINES.map((h, i) => (
                <a key={`dup-${i}`} href={h.url} tabIndex={-1}
                  className="text-gray-300 text-xs whitespace-nowrap hover:text-brand-green transition-colors duration-150 group flex-shrink-0">
                  <span className="text-red-500 mr-1.5 text-[10px]">●</span>
                  <span className="group-hover:underline underline-offset-2">{h.text}</span>
                  <span className="text-brand-border mx-5">·</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* More News link */}
        <Link href="/news"
          className="shrink-0 text-[10px] font-bold text-brand-green hover:text-white border-l border-brand-border px-3 h-full flex items-center transition-colors whitespace-nowrap z-10 bg-[#0a0e12]">
          More News →
        </Link>
      </div>

      {/* Mobile: stacked */}
      <div className="flex sm:hidden flex-col">
        {/* Badge row */}
        <div className="flex items-center gap-1.5 px-3 pt-1.5 pb-1">
          <span className="live-dot w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
          <span className="text-red-400 text-[11px] font-extrabold tracking-widest uppercase">Cam News</span>
          <Link href="/news" className="ml-auto text-[10px] text-brand-green font-bold">More →</Link>
        </div>
        {/* Scroll row */}
        <div className="overflow-hidden relative" style={{ height: "26px" }}>
          <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #0a0e12, transparent)" }} />
          <div className="ticker-wrap absolute inset-y-0 left-0 right-0 flex items-center">
            <div className="ticker-scroll flex items-center shrink-0">
              {HEADLINES.map((h, i) => (
                <a key={i} href={h.url}
                  className="text-gray-300 text-[12px] font-medium whitespace-nowrap px-3 hover:text-brand-green transition-colors">
                  {h.text}
                  <span className="text-brand-border mx-3">·</span>
                </a>
              ))}
            </div>
            <div className="ticker-scroll flex items-center shrink-0" aria-hidden="true">
              {HEADLINES.map((h, i) => (
                <a key={`dup-${i}`} href={h.url} tabIndex={-1}
                  className="text-gray-300 text-[12px] font-medium whitespace-nowrap px-3 hover:text-brand-green transition-colors">
                  {h.text}
                  <span className="text-brand-border mx-3">·</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
