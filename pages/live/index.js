import Layout from "../../components/Layout";
import AdUnit from "../../components/AdUnit";
import { useState } from "react";

const CONTINENTS = ["All", "North America", "Europe", "Asia", "Middle East", "South America", "Africa", "Oceania"];

const CAMS = [
  // North America
  { id: "times-square", city: "New York City", country: "USA", continent: "North America", label: "Times Square", ytId: "kPnlOuCO3rA", flag: "🇺🇸", type: "City" },
  { id: "nyc-brooklyn", city: "New York City", country: "USA", continent: "North America", label: "Brooklyn Bridge", ytId: null, flag: "🇺🇸", type: "Landmark" },
  { id: "chicago-river", city: "Chicago", country: "USA", continent: "North America", label: "Chicago River", ytId: null, flag: "🇺🇸", type: "City" },
  { id: "las-vegas", city: "Las Vegas", country: "USA", continent: "North America", label: "The Strip", ytId: "3nYR3dMrROQ", flag: "🇺🇸", type: "City" },
  { id: "miami-beach", city: "Miami", country: "USA", continent: "North America", label: "South Beach", ytId: null, flag: "🇺🇸", type: "Beach" },
  { id: "santa-monica", city: "Los Angeles", country: "USA", continent: "North America", label: "Santa Monica Pier", ytId: null, flag: "🇺🇸", type: "Beach" },
  { id: "sf-golden-gate", city: "San Francisco", country: "USA", continent: "North America", label: "Golden Gate Bridge", ytId: null, flag: "🇺🇸", type: "Landmark" },
  { id: "nashville", city: "Nashville", country: "USA", continent: "North America", label: "Broadway", ytId: null, flag: "🇺🇸", type: "City" },
  { id: "new-orleans", city: "New Orleans", country: "USA", continent: "North America", label: "Bourbon Street", ytId: null, flag: "🇺🇸", type: "City" },
  { id: "dc-mall", city: "Washington D.C.", country: "USA", continent: "North America", label: "National Mall", ytId: null, flag: "🇺🇸", type: "Landmark" },
  { id: "niagara", city: "Niagara Falls", country: "Canada/USA", continent: "North America", label: "Niagara Falls", ytId: "4q6R8GBQHFM", flag: "🇨🇦", type: "Nature" },
  { id: "toronto", city: "Toronto", country: "Canada", continent: "North America", label: "CN Tower", ytId: null, flag: "🇨🇦", type: "City" },
  { id: "vancouver", city: "Vancouver", country: "Canada", continent: "North America", label: "Gastown", ytId: null, flag: "🇨🇦", type: "City" },
  { id: "mexico-city", city: "Mexico City", country: "Mexico", continent: "North America", label: "Zócalo Square", ytId: null, flag: "🇲🇽", type: "City" },

  // Europe
  { id: "paris-eiffel", city: "Paris", country: "France", continent: "Europe", label: "Eiffel Tower", ytId: "oCBQFl2KvVU", flag: "🇫🇷", type: "Landmark" },
  { id: "paris-notre-dame", city: "Paris", country: "France", continent: "Europe", label: "Notre-Dame", ytId: null, flag: "🇫🇷", type: "Landmark" },
  { id: "london-big-ben", city: "London", country: "UK", continent: "Europe", label: "Big Ben", ytId: "e1bXe-mBzuU", flag: "🇬🇧", type: "Landmark" },
  { id: "london-trafalgar", city: "London", country: "UK", continent: "Europe", label: "Trafalgar Square", ytId: null, flag: "🇬🇧", type: "City" },
  { id: "rome-colosseum", city: "Rome", country: "Italy", continent: "Europe", label: "Colosseum", ytId: null, flag: "🇮🇹", type: "Landmark" },
  { id: "rome-trevi", city: "Rome", country: "Italy", continent: "Europe", label: "Trevi Fountain", ytId: null, flag: "🇮🇹", type: "Landmark" },
  { id: "venice-canal", city: "Venice", country: "Italy", continent: "Europe", label: "Grand Canal", ytId: null, flag: "🇮🇹", type: "City" },
  { id: "amsterdam-canal", city: "Amsterdam", country: "Netherlands", continent: "Europe", label: "Canal District", ytId: null, flag: "🇳🇱", type: "City" },
  { id: "barcelona-sagrada", city: "Barcelona", country: "Spain", continent: "Europe", label: "Sagrada Familia", ytId: null, flag: "🇪🇸", type: "Landmark" },
  { id: "madrid-plaza", city: "Madrid", country: "Spain", continent: "Europe", label: "Plaza Mayor", ytId: null, flag: "🇪🇸", type: "City" },
  { id: "berlin-gate", city: "Berlin", country: "Germany", continent: "Europe", label: "Brandenburg Gate", ytId: null, flag: "🇩🇪", type: "Landmark" },
  { id: "prague-old", city: "Prague", country: "Czech Republic", continent: "Europe", label: "Old Town Square", ytId: null, flag: "🇨🇿", type: "City" },
  { id: "vienna-opera", city: "Vienna", country: "Austria", continent: "Europe", label: "State Opera", ytId: null, flag: "🇦🇹", type: "Landmark" },
  { id: "zurich-lake", city: "Zurich", country: "Switzerland", continent: "Europe", label: "Lake Zurich", ytId: null, flag: "🇨🇭", type: "Nature" },
  { id: "lisbon-belem", city: "Lisbon", country: "Portugal", continent: "Europe", label: "Belém Tower", ytId: null, flag: "🇵🇹", type: "Landmark" },
  { id: "athens-acropolis", city: "Athens", country: "Greece", continent: "Europe", label: "Acropolis", ytId: null, flag: "🇬🇷", type: "Landmark" },
  { id: "moscow-red-sq", city: "Moscow", country: "Russia", continent: "Europe", label: "Red Square", ytId: null, flag: "🇷🇺", type: "Landmark" },
  { id: "istanbul-hagia", city: "Istanbul", country: "Turkey", continent: "Europe", label: "Hagia Sophia", ytId: null, flag: "🇹🇷", type: "Landmark" },

  // Asia
  { id: "tokyo-shibuya", city: "Tokyo", country: "Japan", continent: "Asia", label: "Shibuya Crossing", ytId: "6suFN3YhL-I", flag: "🇯🇵", type: "City" },
  { id: "tokyo-shinjuku", city: "Tokyo", country: "Japan", continent: "Asia", label: "Shinjuku", ytId: null, flag: "🇯🇵", type: "City" },
  { id: "kyoto-geisha", city: "Kyoto", country: "Japan", continent: "Asia", label: "Gion District", ytId: null, flag: "🇯🇵", type: "City" },
  { id: "hong-kong", city: "Hong Kong", country: "China", continent: "Asia", label: "Victoria Harbour", ytId: null, flag: "🇭🇰", type: "City" },
  { id: "shanghai-bund", city: "Shanghai", country: "China", continent: "Asia", label: "The Bund", ytId: null, flag: "🇨🇳", type: "City" },
  { id: "singapore-marina", city: "Singapore", country: "Singapore", continent: "Asia", label: "Marina Bay Sands", ytId: null, flag: "🇸🇬", type: "Landmark" },
  { id: "bangkok-sukhumvit", city: "Bangkok", country: "Thailand", continent: "Asia", label: "Sukhumvit", ytId: null, flag: "🇹🇭", type: "City" },
  { id: "bali-beach", city: "Bali", country: "Indonesia", continent: "Asia", label: "Kuta Beach", ytId: null, flag: "🇮🇩", type: "Beach" },
  { id: "mumbai-gateway", city: "Mumbai", country: "India", continent: "Asia", label: "Gateway of India", ytId: null, flag: "🇮🇳", type: "Landmark" },
  { id: "seoul-gangnam", city: "Seoul", country: "South Korea", continent: "Asia", label: "Gangnam", ytId: null, flag: "🇰🇷", type: "City" },
  { id: "taipei-101", city: "Taipei", country: "Taiwan", continent: "Asia", label: "Taipei 101", ytId: null, flag: "🇹🇼", type: "Landmark" },
  { id: "kathmandu", city: "Kathmandu", country: "Nepal", continent: "Asia", label: "Boudhanath Stupa", ytId: null, flag: "🇳🇵", type: "Landmark" },

  // Middle East
  { id: "dubai-burj", city: "Dubai", country: "UAE", continent: "Middle East", label: "Burj Khalifa", ytId: null, flag: "🇦🇪", type: "Landmark" },
  { id: "dubai-marina", city: "Dubai", country: "UAE", continent: "Middle East", label: "Dubai Marina", ytId: null, flag: "🇦🇪", type: "City" },
  { id: "jerusalem-wall", city: "Jerusalem", country: "Israel", continent: "Middle East", label: "Western Wall", ytId: "SKFbMYBRPf8", flag: "🇮🇱", type: "Landmark" },
  { id: "riyadh-kingdom", city: "Riyadh", country: "Saudi Arabia", continent: "Middle East", label: "Kingdom Tower", ytId: null, flag: "🇸🇦", type: "Landmark" },

  // South America
  { id: "rio-copacabana", city: "Rio de Janeiro", country: "Brazil", continent: "South America", label: "Copacabana Beach", ytId: null, flag: "🇧🇷", type: "Beach" },
  { id: "rio-christ", city: "Rio de Janeiro", country: "Brazil", continent: "South America", label: "Christ the Redeemer", ytId: null, flag: "🇧🇷", type: "Landmark" },
  { id: "buenos-aires", city: "Buenos Aires", country: "Argentina", continent: "South America", label: "Plaza de Mayo", ytId: null, flag: "🇦🇷", type: "City" },
  { id: "santiago", city: "Santiago", country: "Chile", continent: "South America", label: "Plaza de Armas", ytId: null, flag: "🇨🇱", type: "City" },
  { id: "bogota", city: "Bogotá", country: "Colombia", continent: "South America", label: "La Candelaria", ytId: null, flag: "🇨🇴", type: "City" },

  // Africa
  { id: "cape-town", city: "Cape Town", country: "South Africa", continent: "Africa", label: "Table Mountain", ytId: null, flag: "🇿🇦", type: "Nature" },
  { id: "cairo-pyramids", city: "Cairo", country: "Egypt", continent: "Africa", label: "Pyramids of Giza", ytId: null, flag: "🇪🇬", type: "Landmark" },
  { id: "marrakech", city: "Marrakech", country: "Morocco", continent: "Africa", label: "Jemaa el-Fna", ytId: null, flag: "🇲🇦", type: "City" },
  { id: "nairobi", city: "Nairobi", country: "Kenya", continent: "Africa", label: "City Center", ytId: null, flag: "🇰🇪", type: "City" },

  // Oceania
  { id: "sydney-opera", city: "Sydney", country: "Australia", continent: "Oceania", label: "Opera House", ytId: null, flag: "🇦🇺", type: "Landmark" },
  { id: "sydney-harbour", city: "Sydney", country: "Australia", continent: "Oceania", label: "Harbour Bridge", ytId: null, flag: "🇦🇺", type: "Landmark" },
  { id: "auckland", city: "Auckland", country: "New Zealand", continent: "Oceania", label: "Sky Tower", ytId: null, flag: "🇳🇿", type: "Landmark" },
  { id: "honolulu", city: "Honolulu", country: "USA (Hawaii)", continent: "Oceania", label: "Waikiki Beach", ytId: null, flag: "🇺🇸", type: "Beach" },
];

const CAM_TYPES = ["All Types", "City", "Landmark", "Beach", "Nature"];

function LiveBadge() {
  return (
    <span className="flex items-center gap-1 bg-red-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
      <span className="live-dot w-1.5 h-1.5 rounded-full bg-white inline-block" />LIVE
    </span>
  );
}

function CamCard({ cam }) {
  const [showEmbed, setShowEmbed] = useState(false);
  const ytSearch = `https://www.youtube.com/results?search_query=${encodeURIComponent(cam.city + " " + cam.label + " live cam 24/7")}&sp=EgJAAQ%3D%3D`;
  const earthcam = `https://www.earthcam.com/search/?searchquery=${encodeURIComponent(cam.city)}`;

  return (
    <div className="card p-0 overflow-hidden group hover:border-brand-green/40 transition flex flex-col">
      <div className="relative bg-brand-bg h-36 flex items-center justify-center flex-shrink-0">
        {showEmbed && cam.ytId ? (
          <iframe
            src={`https://www.youtube.com/embed/${cam.ytId}?autoplay=1&mute=1`}
            allow="autoplay; encrypted-media" allowFullScreen
            className="absolute inset-0 w-full h-full" title={cam.label}
          />
        ) : (
          <>
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(0deg,#00c853,#00c853 1px,transparent 1px,transparent 4px)" }} />
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-brand-green/50" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-brand-green/50" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-brand-green/50" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-brand-green/50" />
            <div className="text-center z-10">
              <div className="text-4xl mb-1">{cam.flag}</div>
              <div className="text-gray-600 text-[10px] font-mono">{cam.id.slice(0,8).toUpperCase()}</div>
            </div>
          </>
        )}
        <div className="absolute top-2 right-2 z-10"><LiveBadge /></div>
        <div className="absolute bottom-2 left-2 z-10">
          <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-brand-bg/80 text-gray-400 border border-brand-border">{cam.type}</span>
        </div>
      </div>
      <div className="p-3 flex flex-col flex-1">
        <p className="text-white font-bold text-xs leading-tight">{cam.label}</p>
        <p className="text-gray-500 text-[11px] mb-3">{cam.city}, {cam.country}</p>
        <div className="flex gap-1.5 mt-auto">
          {cam.ytId ? (
            <button onClick={() => setShowEmbed(!showEmbed)}
              className="flex-1 text-center text-[11px] font-bold py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white transition">
              {showEmbed ? "⏹ Stop" : "▶ Watch"}
            </button>
          ) : (
            <a href={ytSearch} target="_blank" rel="noopener noreferrer"
              className="flex-1 text-center text-[11px] font-bold py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white transition">
              ▶ Find Live
            </a>
          )}
          <a href={earthcam} target="_blank" rel="noopener noreferrer"
            className="text-[11px] py-1.5 px-2 rounded-lg border border-brand-border text-gray-400 hover:border-brand-green hover:text-white transition">
            EarthCam
          </a>
        </div>
      </div>
    </div>
  );
}

export default function LiveCams() {
  const [continent, setContinent] = useState("All");
  const [type, setType] = useState("All Types");
  const [search, setSearch] = useState("");

  const filtered = CAMS.filter(c => {
    if (continent !== "All" && c.continent !== continent) return false;
    if (type !== "All Types" && c.type !== type) return false;
    if (search && !`${c.city} ${c.label} ${c.country}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <Layout
      title="Live Public Cameras Around the World — HiddenCameras.tv"
      description={`Watch ${CAMS.length}+ live public webcams from cities around the world. Times Square, Eiffel Tower, Shibuya Crossing — free, 24/7.`}
      canonical="https://hiddencameras.tv/live"
    >
      {/* Hero */}
      <section className="text-center mb-8 scan-container rounded-2xl border border-brand-border bg-brand-card px-6 py-10">
        <div className="inline-flex items-center gap-2 pill bg-red-600/20 text-red-400 mb-4">
          <span className="live-dot w-2 h-2 rounded-full bg-red-400 inline-block" />
          {CAMS.length} CAMERAS WORLDWIDE
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 leading-tight tracking-tight">
          Watch the World<br /><span className="text-brand-green">Live &amp; Free</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-base">
          Public webcams from {CONTINENTS.length - 1} continents. Landmarks, beaches, cities — 24/7.
        </p>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { n: `${CAMS.length}+`, label: "Cameras" },
          { n: "8", label: "Regions" },
          { n: "40+", label: "Countries" },
          { n: "24/7", label: "Live" },
        ].map(s => (
          <div key={s.label} className="card text-center py-3">
            <div className="text-xl font-extrabold text-brand-green">{s.n}</div>
            <div className="text-gray-500 text-[11px] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <AdUnit />

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search city, country, or landmark..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-brand-card border border-brand-border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-green transition text-sm"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-3">
        {CONTINENTS.map(c => (
          <button key={c} onClick={() => setContinent(c)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition ${continent === c ? "bg-brand-green text-black border-brand-green" : "border-brand-border text-gray-400 hover:border-brand-green hover:text-white"}`}>
            {c}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {CAM_TYPES.map(t => (
          <button key={t} onClick={() => setType(t)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition ${type === t ? "bg-gray-700 text-white border-gray-600" : "border-brand-border text-gray-500 hover:border-gray-600 hover:text-gray-300"}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-gray-500 text-xs mb-4">{filtered.length} cameras found</p>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {filtered.map(cam => <CamCard key={cam.id} cam={cam} />)}
        {filtered.length === 0 && (
          <div className="col-span-4 text-center py-12 text-gray-500">No cameras match your search.</div>
        )}
      </div>

      <AdUnit />

      {/* Submit cam CTA */}
      <div className="card border-brand-green/20 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1">
            <h3 className="text-white font-bold mb-1">Know a great public live cam?</h3>
            <p className="text-gray-400 text-sm">Submit a camera and we&apos;ll add it to the directory. Must be a public, non-private feed.</p>
          </div>
          <a href="/submit-cam" className="btn-primary whitespace-nowrap shrink-0">Submit a Camera →</a>
        </div>
      </div>

      <div className="card border-yellow-500/10 text-center py-6">
        <p className="text-white font-bold mb-2">Want a hidden camera for your home?</p>
        <a href="/reviews" className="btn-primary">See Expert Reviews →</a>
      </div>
    </Layout>
  );
}
