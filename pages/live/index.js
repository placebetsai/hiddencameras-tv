import Layout from "../../components/Layout";
import AdUnit from "../../components/AdUnit";
import { useState } from "react";

const CONTINENTS = ["All", "North America", "Europe", "Asia", "South America", "Oceania"];

const CAMS = [
  // North America
  { id: "times-square", city: "New York City", country: "USA", continent: "North America", label: "Times Square", searchQ: "Times Square NYC live cam 24/7", ytId: "kPnlOuCO3rA", flag: "🇺🇸" },
  { id: "chicago-river", city: "Chicago", country: "USA", continent: "North America", label: "Chicago Riverwalk", searchQ: "Chicago river live cam 24/7", ytId: null, flag: "🇺🇸" },
  { id: "las-vegas-strip", city: "Las Vegas", country: "USA", continent: "North America", label: "The Strip", searchQ: "Las Vegas strip live cam 24/7", ytId: null, flag: "🇺🇸" },
  { id: "miami-beach", city: "Miami", country: "USA", continent: "North America", label: "South Beach", searchQ: "Miami beach live cam 24/7", ytId: null, flag: "🇺🇸" },
  { id: "la-santa-monica", city: "Los Angeles", country: "USA", continent: "North America", label: "Santa Monica Pier", searchQ: "Santa Monica pier live cam 24/7", ytId: null, flag: "🇺🇸" },
  { id: "toronto-downtown", city: "Toronto", country: "Canada", continent: "North America", label: "Downtown", searchQ: "Toronto live cam 24/7", ytId: null, flag: "🇨🇦" },
  { id: "mexico-city", city: "Mexico City", country: "Mexico", continent: "North America", label: "Zócalo Square", searchQ: "Mexico City Zocalo live cam", ytId: null, flag: "🇲🇽" },

  // Europe
  { id: "paris-eiffel", city: "Paris", country: "France", continent: "Europe", label: "Eiffel Tower", searchQ: "Eiffel Tower live cam 24/7", ytId: "oCBQFl2KvVU", flag: "🇫🇷" },
  { id: "london-big-ben", city: "London", country: "UK", continent: "Europe", label: "Big Ben / Westminster", searchQ: "London Big Ben live cam 24/7", ytId: null, flag: "🇬🇧" },
  { id: "rome-colosseum", city: "Rome", country: "Italy", continent: "Europe", label: "Colosseum", searchQ: "Rome Colosseum live cam 24/7", ytId: null, flag: "🇮🇹" },
  { id: "amsterdam-canal", city: "Amsterdam", country: "Netherlands", continent: "Europe", label: "Canal District", searchQ: "Amsterdam canal live cam 24/7", ytId: null, flag: "🇳🇱" },
  { id: "barcelona-rambla", city: "Barcelona", country: "Spain", continent: "Europe", label: "La Rambla", searchQ: "Barcelona La Rambla live cam 24/7", ytId: null, flag: "🇪🇸" },
  { id: "berlin-gate", city: "Berlin", country: "Germany", continent: "Europe", label: "Brandenburg Gate", searchQ: "Berlin Brandenburg Gate live cam 24/7", ytId: null, flag: "🇩🇪" },
  { id: "prague-old-town", city: "Prague", country: "Czech Republic", continent: "Europe", label: "Old Town Square", searchQ: "Prague Old Town live cam 24/7", ytId: null, flag: "🇨🇿" },

  // Asia
  { id: "tokyo-shibuya", city: "Tokyo", country: "Japan", continent: "Asia", label: "Shibuya Crossing", searchQ: "Shibuya crossing live cam 24/7", ytId: "6suFN3YhL-I", flag: "🇯🇵" },
  { id: "hong-kong-harbor", city: "Hong Kong", country: "China", continent: "Asia", label: "Victoria Harbour", searchQ: "Hong Kong harbor live cam 24/7", ytId: null, flag: "🇭🇰" },
  { id: "singapore-marina", city: "Singapore", country: "Singapore", continent: "Asia", label: "Marina Bay Sands", searchQ: "Singapore Marina Bay live cam 24/7", ytId: null, flag: "🇸🇬" },
  { id: "bangkok-street", city: "Bangkok", country: "Thailand", continent: "Asia", label: "Sukhumvit Street", searchQ: "Bangkok street live cam 24/7", ytId: null, flag: "🇹🇭" },
  { id: "dubai-downtown", city: "Dubai", country: "UAE", continent: "Asia", label: "Downtown / Burj Khalifa", searchQ: "Dubai Burj Khalifa live cam 24/7", ytId: null, flag: "🇦🇪" },

  // South America
  { id: "rio-copacabana", city: "Rio de Janeiro", country: "Brazil", continent: "South America", label: "Copacabana Beach", searchQ: "Rio Copacabana live cam 24/7", ytId: null, flag: "🇧🇷" },
  { id: "buenos-aires", city: "Buenos Aires", country: "Argentina", continent: "South America", label: "Plaza de Mayo", searchQ: "Buenos Aires live cam 24/7", ytId: null, flag: "🇦🇷" },

  // Oceania
  { id: "sydney-opera", city: "Sydney", country: "Australia", continent: "Oceania", label: "Opera House", searchQ: "Sydney Opera House live cam 24/7", ytId: null, flag: "🇦🇺" },
  { id: "auckland-harbour", city: "Auckland", country: "New Zealand", continent: "Oceania", label: "Waitemata Harbour", searchQ: "Auckland harbour live cam 24/7", ytId: null, flag: "🇳🇿" },
];

function LiveBadge() {
  return (
    <span className="flex items-center gap-1 bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
      <span className="live-dot w-1.5 h-1.5 rounded-full bg-white inline-block" />
      LIVE
    </span>
  );
}

function CamCard({ cam }) {
  const [showEmbed, setShowEmbed] = useState(false);
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(cam.searchQ)}&sp=EgJAAQ%3D%3D`;

  return (
    <div className="card p-0 overflow-hidden group hover:border-brand-green/50 transition">
      {/* Camera view area */}
      <div className="relative bg-brand-bg h-40 flex items-center justify-center">
        {showEmbed && cam.ytId ? (
          <iframe
            src={`https://www.youtube.com/embed/${cam.ytId}?autoplay=1&mute=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            title={cam.label}
          />
        ) : (
          <>
            {/* Scanlines overlay */}
            <div className="absolute inset-0 scan-container">
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(0deg, #00c853, #00c853 1px, transparent 1px, transparent 4px)" }} />
            </div>
            {/* Corner brackets — CCTV look */}
            <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-brand-green/60" />
            <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-brand-green/60" />
            <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-brand-green/60" />
            <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-brand-green/60" />
            {/* City icon */}
            <div className="text-center z-10">
              <div className="text-4xl mb-1">{cam.flag}</div>
              <div className="text-gray-500 text-xs">{cam.city}</div>
            </div>
            {/* Timestamp */}
            <div className="absolute bottom-2 left-3 text-brand-green text-[10px] font-mono opacity-70">
              CAM-{cam.id.toUpperCase().slice(0,6)}
            </div>
          </>
        )}
        {/* Live badge */}
        <div className="absolute top-2 right-2 z-10">
          <LiveBadge />
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <p className="text-white font-bold text-sm leading-tight">{cam.label}</p>
            <p className="text-gray-500 text-xs">{cam.city}, {cam.country}</p>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          {cam.ytId ? (
            <button
              onClick={() => setShowEmbed(!showEmbed)}
              className="flex-1 text-center text-xs font-bold py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white transition"
            >
              {showEmbed ? "⏹ Stop" : "▶ Watch Live"}
            </button>
          ) : (
            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-xs font-bold py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white transition"
            >
              ▶ Find Live Feed →
            </a>
          )}
          <a
            href={`https://www.earthcam.com/search/?searchquery=${encodeURIComponent(cam.city)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs py-1.5 px-3 rounded-lg border border-brand-border text-gray-400 hover:border-brand-green hover:text-white transition"
          >
            EarthCam
          </a>
        </div>
      </div>
    </div>
  );
}

export default function LiveCams() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? CAMS : CAMS.filter(c => c.continent === active);

  return (
    <Layout
      title="Live Public Cameras Around the World — HiddenCameras.tv"
      description="Watch live public webcams from cities around the world. Times Square, Eiffel Tower, Shibuya Crossing, and hundreds more — free, 24/7."
      canonical="https://hiddencameras.tv/live"
    >
      {/* Hero */}
      <section className="text-center mb-10 pt-2 scan-container rounded-2xl border border-brand-border bg-brand-card px-6 py-10">
        <div className="inline-flex items-center gap-2 pill bg-red-600/20 text-red-400 mb-4">
          <span className="live-dot w-2 h-2 rounded-full bg-red-400 inline-block" />
          {CAMS.length} CAMERAS ONLINE
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
          Watch the World<br />
          <span className="text-brand-green">Live & Free</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-base mb-0">
          Public webcams from cities across every continent. Times Square, Shibuya Crossing, Eiffel Tower — streaming 24/7.
        </p>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { n: "22+", label: "Cities" },
          { n: "6", label: "Continents" },
          { n: "24/7", label: "Live Feeds" },
        ].map(s => (
          <div key={s.label} className="card text-center py-4">
            <div className="text-2xl font-extrabold text-brand-green">{s.n}</div>
            <div className="text-gray-500 text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <AdUnit />

      {/* Continent filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CONTINENTS.map(c => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition ${
              active === c
                ? "bg-brand-green text-black border-brand-green"
                : "border-brand-border text-gray-400 hover:border-brand-green hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Camera grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {filtered.map(cam => <CamCard key={cam.id} cam={cam} />)}
      </div>

      <AdUnit />

      <div className="card border-brand-green/20 text-center py-8">
        <p className="text-white font-bold mb-2">Want a hidden camera for your home?</p>
        <p className="text-gray-400 text-sm mb-4">See our expert-tested picks for every budget and use case.</p>
        <a href="/reviews" className="btn-primary">Browse Camera Reviews →</a>
      </div>
    </Layout>
  );
}
