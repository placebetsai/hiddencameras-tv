import { useState, useEffect } from "react";
import Link from "next/link";

const SLIDES = [
  {
    id: "times-square",
    city: "New York City",
    location: "Times Square",
    country: "USA",
    flag: "🇺🇸",
    ytId: "kPnlOuCO3rA",
    // Unsplash free-use image of Times Square at night
    img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1400&q=80&auto=format&fit=crop",
    alt: "Live camera view of Times Square New York City at night with bright neon signs",
    color: "#ff6b6b",
  },
  {
    id: "shibuya",
    city: "Tokyo",
    location: "Shibuya Crossing",
    country: "Japan",
    flag: "🇯🇵",
    ytId: "6suFN3YhL-I",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1400&q=80&auto=format&fit=crop",
    alt: "Live webcam of Shibuya Crossing Tokyo Japan — world's busiest pedestrian crossing",
    color: "#a78bfa",
  },
  {
    id: "paris",
    city: "Paris",
    location: "Eiffel Tower",
    country: "France",
    flag: "🇫🇷",
    ytId: "oCBQFl2KvVU",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1400&q=80&auto=format&fit=crop",
    alt: "Live camera overlooking Eiffel Tower Paris France at golden hour",
    color: "#fbbf24",
  },
  {
    id: "dubai",
    city: "Dubai",
    location: "Burj Khalifa",
    country: "UAE",
    flag: "🇦🇪",
    ytId: null,
    img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1400&q=80&auto=format&fit=crop",
    alt: "Live webcam of Burj Khalifa Dubai UAE skyline at night",
    color: "#34d399",
  },
  {
    id: "sydney",
    city: "Sydney",
    location: "Opera House",
    country: "Australia",
    flag: "🇦🇺",
    ytId: null,
    img: "https://images.unsplash.com/photo-1523428096881-5bd79d043006?w=1400&q=80&auto=format&fit=crop",
    alt: "Live camera view of Sydney Opera House and Harbour Bridge Australia",
    color: "#38bdf8",
  },
  {
    id: "london",
    city: "London",
    location: "Big Ben",
    country: "UK",
    flag: "🇬🇧",
    ytId: "e1bXe-mBzuU",
    img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1400&q=80&auto=format&fit=crop",
    alt: "Live webcam of Big Ben and Westminster Bridge London United Kingdom",
    color: "#fb923c",
  },
];

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-full">
      <span className="live-dot w-2 h-2 rounded-full bg-white inline-block" />
      LIVE
    </span>
  );
}

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive(i => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const slide = SLIDES[active];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-brand-border h-[230px] sm:h-[360px] lg:h-[500px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background images */}
      {SLIDES.map((s, i) => (
        <div key={s.id} className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}>
          <img
            src={s.img}
            alt={s.alt}
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
          {/* Dark overlay gradient */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(8,11,13,0.95) 0%, rgba(8,11,13,0.7) 50%, rgba(8,11,13,0.3) 100%)" }} />
          {/* Bottom gradient */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,11,13,0.8) 0%, transparent 60%)" }} />
        </div>
      ))}

      {/* Scanline overlay */}
      <div className="absolute inset-0 scan-wrap z-10 pointer-events-none" />

      {/* CCTV corner decoration */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <LiveBadge />
        <span className="text-brand-green text-xs font-mono opacity-70 tracking-widest">CAM-{String(active + 1).padStart(2, "0")}/{SLIDES.length}</span>
      </div>
      <div className="absolute top-4 right-4 z-20 text-brand-green text-xs font-mono opacity-50">
        {new Date().toLocaleTimeString("en-US", { hour12: false })}
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 sm:p-8 md:p-12">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-1.5 sm:mb-3">
            <span className="text-xl sm:text-3xl">{slide.flag}</span>
            <span className="pill-gray text-[10px] sm:text-xs">{slide.country}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-0.5 sm:mb-1 leading-tight tracking-tight">
            {slide.location}
          </h2>
          <p className="text-sm sm:text-lg text-gray-400 mb-3 sm:mb-6">{slide.city}</p>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/live" className="btn-primary text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5">
              ▶ Watch Live
            </Link>
            <Link href="/live" className="btn-outline text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5">
              60+ Cities
            </Link>
          </div>
        </div>
      </div>

      {/* Slide indicators — hidden on small mobile */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-20 hidden sm:flex items-center gap-2">
        {SLIDES.map((s, i) => (
          <button key={s.id} onClick={() => { setActive(i); setPaused(true); }}
            className="group flex flex-col items-center gap-1 transition"
            aria-label={`View ${s.location} live camera`}>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg overflow-hidden border-2 transition-all"
              style={{ borderColor: i === active ? "#3b82f6" : "rgba(255,255,255,0.15)", opacity: i === active ? 1 : 0.5 }}>
              <img src={s.img} alt={`${s.location} thumbnail`} className="w-full h-full object-cover" loading="lazy" />
            </div>
          </button>
        ))}
      </div>

      {/* Mobile dot indicators */}
      <div className="absolute bottom-3 left-0 right-0 z-20 flex sm:hidden justify-center gap-1.5">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => { setActive(i); setPaused(true); }}
            className="w-1.5 h-1.5 rounded-full transition-all"
            style={{ background: i === active ? "#3b82f6" : "rgba(255,255,255,0.3)" }} />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-border z-20">
        <div className="h-full bg-brand-green transition-none"
          style={{ width: `${((active + 1) / SLIDES.length) * 100}%`, transition: paused ? "none" : "width 5s linear" }} />
      </div>
    </div>
  );
}
