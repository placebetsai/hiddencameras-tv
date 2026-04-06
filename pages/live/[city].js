import Layout from "../../components/Layout";
import Link from "next/link";
import AdUnit from "../../components/AdUnit";
import { useState } from "react";

const AMAZON_TAG = "hiddencamerastv-20";

// Full city data — each city gets its own SEO page
const CITIES = [
  {
    slug: "new-york-city",
    name: "New York City",
    country: "USA",
    flag: "🇺🇸",
    continent: "North America",
    description: "The city that never sleeps has hundreds of public webcams broadcasting 24/7. From the glittering lights of Times Square to the iconic Brooklyn Bridge, watch NYC live from anywhere in the world.",
    highlights: ["Times Square", "Brooklyn Bridge", "Central Park", "Empire State Building", "One World Trade"],
    img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&q=80&auto=format&fit=crop",
    cams: [
      { label: "Times Square", ytId: "kPnlOuCO3rA", type: "City Center" },
      { label: "Brooklyn Bridge", ytId: null, type: "Landmark" },
      { label: "Central Park", ytId: null, type: "Park" },
      { label: "Empire State Building", ytId: null, type: "Landmark" },
    ],
    security: { crime: "Moderate", surveillance: "High", police: "NYPD — 36,000 officers" },
    asin: "B0CGX9GQ3Q",
    productName: "Blink Mini 2 Indoor Cam",
  },
  {
    slug: "tokyo",
    name: "Tokyo",
    country: "Japan",
    flag: "🇯🇵",
    continent: "Asia",
    description: "Tokyo is one of the most surveilled cities on earth with over 500,000 public cameras. Watch the world's busiest pedestrian crossing at Shibuya, neon-lit Shinjuku, and the historic streets of Asakusa.",
    highlights: ["Shibuya Crossing", "Shinjuku", "Akihabara", "Asakusa", "Tokyo Tower"],
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80&auto=format&fit=crop",
    cams: [
      { label: "Shibuya Crossing", ytId: "6suFN3YhL-I", type: "City Center" },
      { label: "Shinjuku at Night", ytId: null, type: "City Center" },
      { label: "Tokyo Tower", ytId: null, type: "Landmark" },
    ],
    security: { crime: "Very Low", surveillance: "Very High", police: "Tokyo Metropolitan Police" },
    asin: "B09WZBPX7K",
    productName: "Ring Indoor Cam 2nd Gen",
  },
  {
    slug: "london",
    name: "London",
    country: "United Kingdom",
    flag: "🇬🇧",
    continent: "Europe",
    description: "London has more CCTV cameras per capita than almost any city on earth — over 900,000 across the metro area. Watch Big Ben, Tower Bridge, Trafalgar Square, and the Thames live around the clock.",
    highlights: ["Big Ben", "Tower Bridge", "Trafalgar Square", "Buckingham Palace", "Piccadilly Circus"],
    img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80&auto=format&fit=crop",
    cams: [
      { label: "Big Ben & Westminster", ytId: "e1bXe-mBzuU", type: "Landmark" },
      { label: "Trafalgar Square", ytId: null, type: "City Center" },
      { label: "Tower Bridge", ytId: null, type: "Landmark" },
    ],
    security: { crime: "Moderate", surveillance: "Very High", police: "Metropolitan Police" },
    asin: "B08C5XKWG6",
    productName: "Arlo Pro 4 Spotlight Camera",
  },
  {
    slug: "paris",
    name: "Paris",
    country: "France",
    flag: "🇫🇷",
    continent: "Europe",
    description: "The City of Light streams beautifully online. Watch the Eiffel Tower at golden hour, Notre-Dame's ongoing reconstruction, and the bustling Champs-Élysées — all live, all free.",
    highlights: ["Eiffel Tower", "Notre-Dame", "Champs-Élysées", "Louvre", "Sacré-Cœur"],
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80&auto=format&fit=crop",
    cams: [
      { label: "Eiffel Tower", ytId: "oCBQFl2KvVU", type: "Landmark" },
      { label: "Notre-Dame Reconstruction", ytId: null, type: "Landmark" },
      { label: "Champs-Élysées", ytId: null, type: "City Center" },
    ],
    security: { crime: "Moderate", surveillance: "High", police: "Police Nationale" },
    asin: "B0C3KXY935",
    productName: "Wyze Cam v4",
  },
  {
    slug: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    continent: "Middle East",
    description: "Dubai's futuristic skyline is one of the most photographed in the world. Watch the Burj Khalifa — the world's tallest building — and the glittering Dubai Marina live from the UAE.",
    highlights: ["Burj Khalifa", "Dubai Marina", "Palm Jumeirah", "Dubai Frame", "Gold Souk"],
    img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80&auto=format&fit=crop",
    cams: [
      { label: "Burj Khalifa View", ytId: null, type: "Landmark" },
      { label: "Dubai Marina", ytId: null, type: "City Center" },
      { label: "Palm Jumeirah", ytId: null, type: "Landmark" },
    ],
    security: { crime: "Very Low", surveillance: "Very High", police: "Dubai Police" },
    asin: "B0CGX9GQ3Q",
    productName: "Blink Outdoor 4 Camera",
  },
  {
    slug: "sydney",
    name: "Sydney",
    country: "Australia",
    flag: "🇦🇺",
    continent: "Oceania",
    description: "Sydney's iconic harbor is one of the most beautiful live cam views anywhere. Watch the Opera House shells catch the sunrise, sailboats glide under the Harbour Bridge, and Bondi Beach live.",
    highlights: ["Opera House", "Harbour Bridge", "Bondi Beach", "Circular Quay", "The Rocks"],
    img: "https://images.unsplash.com/photo-1523428096881-5bd79d043006?w=1200&q=80&auto=format&fit=crop",
    cams: [
      { label: "Opera House & Harbour", ytId: null, type: "Landmark" },
      { label: "Bondi Beach", ytId: null, type: "Beach" },
      { label: "Harbour Bridge", ytId: null, type: "Landmark" },
    ],
    security: { crime: "Low", surveillance: "High", police: "NSW Police Force" },
    asin: "B09WZBPX7K",
    productName: "Ring Outdoor Stick Up Cam",
  },
  {
    slug: "rome",
    name: "Rome",
    country: "Italy",
    flag: "🇮🇹",
    continent: "Europe",
    description: "The Eternal City streams live across centuries of history. Watch the Colosseum, the Trevi Fountain coins being tossed, and the Vatican's St. Peter's Square — all from your couch.",
    highlights: ["Colosseum", "Trevi Fountain", "Vatican", "Spanish Steps", "Pantheon"],
    img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80&auto=format&fit=crop",
    cams: [
      { label: "Colosseum", ytId: null, type: "Landmark" },
      { label: "Trevi Fountain", ytId: null, type: "Landmark" },
      { label: "St. Peter's Square", ytId: null, type: "Landmark" },
    ],
    security: { crime: "Moderate", surveillance: "Moderate", police: "Polizia di Stato" },
    asin: "B07XTQJ6SH",
    productName: "Eufy Security Indoor Cam 2K",
  },
  {
    slug: "singapore",
    name: "Singapore",
    country: "Singapore",
    flag: "🇸🇬",
    continent: "Asia",
    description: "Singapore's futuristic city-state is one of the safest in the world — and one of the most surveilled. Watch Marina Bay Sands, Gardens by the Bay, and the nightly light show live.",
    highlights: ["Marina Bay Sands", "Gardens by the Bay", "Clarke Quay", "Sentosa Island", "Orchard Road"],
    img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80&auto=format&fit=crop",
    cams: [
      { label: "Marina Bay Sands", ytId: null, type: "Landmark" },
      { label: "Gardens by the Bay", ytId: null, type: "Nature" },
      { label: "Clarke Quay", ytId: null, type: "City Center" },
    ],
    security: { crime: "Very Low", surveillance: "Very High", police: "Singapore Police Force" },
    asin: "B0CGX9GQ3Q",
    productName: "Blink Mini 2 Smart Security Camera",
  },
];

export async function getStaticPaths() {
  return {
    paths: CITIES.map(c => ({ params: { city: c.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const city = CITIES.find(c => c.slug === params.city);
  if (!city) return { notFound: true };
  const related = CITIES.filter(c => c.slug !== city.slug).slice(0, 4);
  return { props: { city, related } };
}

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1 bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
      <span className="live-dot w-1.5 h-1.5 rounded-full bg-white inline-block" />LIVE
    </span>
  );
}

function CamRow({ cam }) {
  const [showEmbed, setShowEmbed] = useState(false);
  const ytSearch = `https://www.youtube.com/results?search_query=${encodeURIComponent(cam.label + " live cam 24/7")}&sp=EgJAAQ%3D%3D`;

  return (
    <div className="card p-0 overflow-hidden">
      {showEmbed && cam.ytId ? (
        <div className="relative" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={`https://www.youtube.com/embed/${cam.ytId}?autoplay=1&mute=1`}
            allow="autoplay; encrypted-media" allowFullScreen
            className="absolute inset-0 w-full h-full" title={cam.label}
          />
        </div>
      ) : null}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <LiveBadge />
          <div>
            <p className="text-white font-semibold text-sm">{cam.label}</p>
            <p className="text-gray-500 text-xs">{cam.type}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {cam.ytId ? (
            <button onClick={() => setShowEmbed(v => !v)}
              className="text-xs font-bold py-1.5 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white transition">
              {showEmbed ? "⏹ Stop" : "▶ Watch"}
            </button>
          ) : (
            <a href={ytSearch} target="_blank" rel="noopener noreferrer"
              className="text-xs font-bold py-1.5 px-3 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition">
              ▶ Find Stream
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CityPage({ city, related }) {
  return (
    <Layout
      title={`${city.name} Live Webcams — Watch ${city.name} Online Free | HiddenCameras.tv`}
      description={`Watch ${city.name} live webcams free. ${city.highlights.slice(0, 3).join(", ")} and more — streaming 24/7. No login required.`}
      canonical={`https://hiddencameras.tv/live/${city.slug}`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-4">
          <Link href="/" className="hover:text-gray-400 transition">Home</Link>
          <span>›</span>
          <Link href="/live" className="hover:text-gray-400 transition">Live Cams</Link>
          <span>›</span>
          <span className="text-gray-400">{city.name}</span>
        </div>

        {/* Hero */}
        <div className="relative rounded-2xl overflow-hidden mb-6 h-[200px] sm:h-[320px]">
          <img src={city.img} alt={`${city.name} live webcam view`} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(8,11,13,0.95) 0%, rgba(8,11,13,0.5) 60%, rgba(8,11,13,0.2) 100%)" }} />
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8">
            <div className="flex items-center gap-2 mb-2">
              <LiveBadge />
              <span className="text-gray-300 text-xs">{city.continent}</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-3xl">{city.flag}</span>
              <h1 className="text-2xl sm:text-4xl font-black text-white">{city.name}</h1>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm">{city.country}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">

            {/* About */}
            <section className="card">
              <h2 className="text-white font-bold mb-2">About {city.name} Live Cams</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{city.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {city.highlights.map(h => (
                  <span key={h} className="text-xs text-brand-green bg-brand-green/10 px-2.5 py-1 rounded-full border border-brand-green/20">{h}</span>
                ))}
              </div>
            </section>

            {/* Live camera feeds */}
            <section>
              <h2 className="text-white font-bold mb-3">{city.name} Live Camera Feeds</h2>
              <div className="space-y-2">
                {city.cams.map(cam => <CamRow key={cam.label} cam={cam} />)}
              </div>
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(city.name + " live cam 24/7")}&sp=EgJAAQ%3D%3D`}
                target="_blank" rel="noopener noreferrer"
                className="btn-outline text-sm w-full mt-3 text-center">
                Find More {city.name} Streams on YouTube →
              </a>
            </section>

            <AdUnit />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">

            {/* Security info */}
            <div className="card">
              <h3 className="text-white font-semibold text-sm mb-3">Surveillance Profile</h3>
              <div className="space-y-2">
                {[
                  { label: "Crime Level", val: city.security.crime },
                  { label: "Camera Density", val: city.security.surveillance },
                  { label: "Law Enforcement", val: city.security.police },
                ].map(r => (
                  <div key={r.label} className="flex justify-between items-start gap-2">
                    <span className="text-gray-500 text-xs">{r.label}</span>
                    <span className="text-gray-300 text-xs font-medium text-right">{r.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product rec */}
            <div className="card border-brand-green/20">
              <p className="text-gray-500 text-[10px] uppercase tracking-wider font-bold mb-2">Visiting {city.name}?</p>
              <h3 className="text-white font-bold text-sm mb-1">Carry a hidden camera detector</h3>
              <p className="text-gray-500 text-xs mb-3">Sweep your hotel room in 5 minutes. Catches 95% of spy cams.</p>
              <p className="text-brand-green font-bold text-sm mb-2">{city.productName}</p>
              <a href={`https://www.amazon.com/dp/${city.asin}?tag=${AMAZON_TAG}`}
                target="_blank" rel="noopener noreferrer sponsored"
                className="btn-primary text-xs w-full text-center">
                Check Price on Amazon →
              </a>
              <p className="text-gray-600 text-[10px] mt-2 text-center">Amazon Associate link</p>
            </div>

            {/* Detect guide CTA */}
            <div className="card">
              <h3 className="text-white font-semibold text-sm mb-1">How to sweep your room</h3>
              <p className="text-gray-500 text-xs mb-3">Our complete guide covers hotels, Airbnbs, and vacation rentals.</p>
              <Link href="/detect-hidden-cameras" className="btn-outline text-xs w-full text-center">
                Detection Guide →
              </Link>
            </div>

          </div>
        </div>

        {/* Related cities */}
        <section className="mt-8">
          <h2 className="text-white font-bold mb-4">More Live Cam Cities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {related.map(c => (
              <Link key={c.slug} href={`/live/${c.slug}`}
                className="card card-hover p-3 flex items-center gap-2">
                <span className="text-2xl">{c.flag}</span>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">{c.name}</p>
                  <p className="text-gray-600 text-xs">{c.country}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/live" className="btn-outline text-sm">View All 60+ Cities →</Link>
          </div>
        </section>

      </div>
    </Layout>
  );
}
