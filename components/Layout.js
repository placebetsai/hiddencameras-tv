import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import CameraIcon from "./CameraIcon";
import NewsTicker from "./NewsTicker";
import AdUnit from "./AdUnit";

const CAMERA_GROUPS = [
  {
    title: "Home Monitoring",
    links: [
      { href: "/nanny-cam", label: "Nanny Cams" },
      { href: "/indoor-security-cameras", label: "Indoor Cameras" },
      { href: "/pet-cameras", label: "Pet Cameras" },
      { href: "/wireless-security-cameras", label: "Wireless Cameras" },
    ],
  },
  {
    title: "Perimeter & Entry",
    links: [
      { href: "/doorbell-cameras", label: "Doorbell Cameras" },
      { href: "/outdoor-security-cameras", label: "Outdoor Cameras" },
      { href: "/trail-cameras", label: "Trail Cameras" },
    ],
  },
  {
    title: "Hidden & Specialty",
    links: [
      { href: "/spy-cameras", label: "Spy Cameras" },
      { href: "/mini-spy-cameras", label: "Mini Spy Cameras" },
      { href: "/hidden-cameras", label: "Hidden Cameras" },
      { href: "/hidden-camera-detectors", label: "Hidden Camera Detectors" },
      { href: "/wifi-hidden-cameras", label: "WiFi Hidden Cameras" },
      { href: "/body-cameras", label: "Body Cameras" },
      { href: "/car-cameras", label: "Car & Dash Cameras" },
    ],
  },
];

const BEST_OF_2026 = [
  { href: "/best-hidden-cameras-2026", label: "Best Hidden Cameras 2026" },
  { href: "/best-nanny-cam-2026", label: "Best Nanny Cam 2026" },
  { href: "/best-doorbell-camera-2026", label: "Best Doorbell Camera 2026" },
  { href: "/best-outdoor-security-camera-2026", label: "Best Outdoor Security Camera 2026" },
  { href: "/best-hidden-camera-detector", label: "Best Hidden Camera Detector" },
  { href: "/best-pet-camera-2026", label: "Best Pet Camera 2026" },
  { href: "/best-car-dash-cam-2026", label: "Best Car Dash Cam 2026" },
  { href: "/best-hidden-cameras-airbnb", label: "Best Hidden Cameras for Airbnb" },
];

const COMPARE_LINKS = [
  { href: "/ring-vs-blink", label: "Ring vs Blink" },
  { href: "/ring-vs-arlo", label: "Ring vs Arlo" },
  { href: "/wyze-vs-blink", label: "Wyze vs Blink" },
  { href: "/nest-cam-vs-arlo", label: "Nest Cam vs Arlo" },
];

export default function Layout({ children, title, description, canonical, robots }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [camerasOpen, setCamerasOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const router = useRouter();
  const t = title || "HiddenCameras.tv — Live Cams & Security Reviews";
  const d = description || "Watch 500+ live public cameras worldwide. Expert reviews of Ring, Arlo, Blink, Wyze & Nest. Surveillance news 24/7.";
  const url = canonical || "https://hiddencameras.tv";
  const robotsContent = robots || "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const isContactRoute = router.pathname === "/contact";

  return (
    <>
      <Head>
        <title>{t}</title>
        <meta name="description" content={d} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={t} />
        <meta property="og:description" content={d} />
        <meta property="og:site_name" content="HiddenCameras.tv" />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://hiddencameras.tv/og-image.png" />
        <meta property="og:image:secure_url" content="https://hiddencameras.tv/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="HiddenCameras.tv — Live World Cams & Security Camera Reviews" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@hiddencameras4u" />
        <meta name="twitter:creator" content="@hiddencameras4u" />
        <meta name="twitter:image" content="https://hiddencameras.tv/og-image.png" />
        <meta name="twitter:image:alt" content="HiddenCameras.tv — Live World Cams & Security Camera Reviews" />
        <meta name="twitter:title" content={t} />
        <meta name="twitter:description" content={d} />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta name="robots" content={robotsContent} />
        <meta name="theme-color" content="#f59e0b" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </Head>

      {/* Sticky header block: nav + ticker */}
      <div className={isContactRoute ? "relative z-50" : "sticky top-0 z-50"}>
        <nav
          className="border-b border-brand-border"
          style={{ background: isContactRoute ? "rgba(8,11,13,1)" : "rgba(8,11,13,0.97)", backdropFilter: isContactRoute ? "none" : "blur(20px)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-2.5 flex items-center justify-between gap-3">

            {/* Logo — always visible */}
            <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight group shrink-0">
              <div className="w-9 h-9 md:w-9 md:h-9 rounded-lg bg-brand-green/10 border border-brand-green/30 flex items-center justify-center group-hover:shadow-green-sm transition-all shrink-0">
                <CameraIcon className="w-5 h-5 md:w-5 md:h-5" size={22} />
              </div>
              <span className="text-lg md:text-base leading-none">
                <span className="text-brand-green">Hidden</span><span className="text-white">Cameras</span><span className="text-brand-muted">.tv</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-0.5 ml-4">
              <Link href="/" className="nav-link px-2.5 py-1.5 rounded-lg hover:bg-brand-card text-sm">Home</Link>
              <Link href="/live" className="nav-link px-2.5 py-1.5 rounded-lg hover:bg-brand-card flex items-center gap-1.5 text-red-400 hover:text-red-300 text-sm">
                <span className="live-dot w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />Live
              </Link>

              {/* Cameras dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCamerasOpen(true)}
                onMouseLeave={() => setCamerasOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setCamerasOpen((o) => !o)}
                  aria-expanded={camerasOpen}
                  aria-haspopup="true"
                  className="nav-link px-3 py-1.5 rounded-lg hover:bg-brand-card text-sm flex items-center gap-1"
                >
                  Cameras
                  <span className="text-[10px] opacity-70">▾</span>
                </button>
                <div
                  className={`absolute left-0 top-full w-[760px] max-w-[92vw] pt-2 px-4 pb-4 rounded-lg border border-brand-border shadow-xl grid grid-cols-[1.3fr_1fr] gap-x-4 gap-y-1 transition-opacity ${camerasOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                  style={{ background: "rgba(8,11,13,0.99)", backdropFilter: "blur(20px)" }}
                  aria-hidden={!camerasOpen}
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-brand-muted mb-2">Camera Types</p>
                    <div className="grid grid-cols-3 gap-4">
                      {CAMERA_GROUPS.map((group) => (
                        <div key={group.title}>
                          <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-brand-green">{group.title}</p>
                          <div className="flex flex-col">
                            {group.links.map(({ href, label }) => (
                              <Link key={href} href={href} className="text-sm text-brand-text hover:text-brand-green hover:bg-brand-card px-2 py-1 rounded transition">
                                {label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-brand-muted mb-2">Best Of 2026</p>
                    <div className="flex flex-col">
                      {BEST_OF_2026.map(({ href, label }) => (
                        <Link key={href} href={href} className="text-sm text-brand-text hover:text-brand-green hover:bg-brand-card px-2 py-1 rounded transition">
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Compare dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCompareOpen(true)}
                onMouseLeave={() => setCompareOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setCompareOpen((o) => !o)}
                  aria-expanded={compareOpen}
                  aria-haspopup="true"
                  className="nav-link px-3 py-1.5 rounded-lg hover:bg-brand-card text-sm flex items-center gap-1"
                >
                  Compare
                  <span className="text-[10px] opacity-70">▾</span>
                </button>
                <div
                  className={`absolute left-0 top-full w-[240px] pt-2 px-3 pb-3 rounded-lg border border-brand-border shadow-xl flex flex-col transition-opacity ${compareOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                  style={{ background: "rgba(8,11,13,0.99)", backdropFilter: "blur(20px)" }}
                  aria-hidden={!compareOpen}
                >
                  {COMPARE_LINKS.map(({ href, label }) => (
                    <Link key={href} href={href} className="text-sm text-brand-text hover:text-brand-green hover:bg-brand-card px-2 py-1 rounded transition">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/news" className="nav-link px-2.5 py-1.5 rounded-lg hover:bg-brand-card text-sm">News</Link>
              <Link href="/reviews" className="nav-link px-2.5 py-1.5 rounded-lg hover:bg-brand-card text-sm">Reviews</Link>
              <Link href="/blog" className="nav-link px-2.5 py-1.5 rounded-lg hover:bg-brand-card text-sm">Blog</Link>
              <Link href="/shop" className="nav-link px-3 py-1.5 rounded-lg text-sm font-semibold text-brand-green hover:bg-brand-green/10 transition">Shop</Link>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <form
                role="search"
                className="flex items-center bg-white/5 border border-brand-border rounded-full pl-3 focus-within:border-brand-green/40"
                onSubmit={(e) => {
                  e.preventDefault();
                  const q = e.currentTarget.q.value.trim();
                  if (!q) return;
                  window.open(`https://www.google.com/search?q=${encodeURIComponent("site:hiddencameras.tv " + q)}`, "_blank", "noopener");
                }}
              >
                <input name="q" type="search" placeholder="Search…" aria-label="Search site" autoComplete="off" className="bg-transparent outline-none text-white text-xs w-28 py-1.5 placeholder-brand-muted" />
                <button type="submit" aria-label="Search" className="w-7 h-7 flex items-center justify-center rounded-full bg-brand-green/20 hover:bg-brand-green text-brand-green hover:text-black transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                </button>
              </form>
              <Link href="/my-cams" className="btn-primary text-xs py-1.5 px-3">Submit Feed →</Link>
            </div>

            {/* Mobile right side */}
            <div className="flex lg:hidden items-center gap-2">
              <Link href="/live" className="flex items-center gap-1.5 text-red-400 text-sm font-bold">
                <span className="live-dot w-2 h-2 rounded-full bg-red-500 inline-block" />LIVE
              </Link>
              <Link href="/shop" className="px-3 py-1.5 rounded-lg text-sm font-semibold text-brand-green hover:bg-brand-green/10 transition">
                Shop
              </Link>
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-brand-muted hover:text-white p-2 rounded-lg hover:bg-brand-card transition">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  {menuOpen
                    ? <><path d="M18 6L6 18"/><path d="M6 6l12 12"/></>
                    : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
                  }
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="lg:hidden border-t border-brand-border bg-brand-bg px-4 py-3 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
              {[
                { href: "/", label: "Home" },
                { href: "/live", label: "Live World Cams" },
                { href: "/news", label: "Surveillance News" },
                { href: "/detect-hidden-cameras", label: "Detect Hidden Cameras" },
                { href: "/reviews", label: "Camera Reviews" },
                { href: "/shop", label: "Shop" },
                { href: "/blog", label: "Blog & Guides" },
                { href: "/history-of-hidden-cameras", label: "Camera History" },
                { href: "/my-cams", label: "Submit Your Feed" },
              ].map(({ href, label }) => (
                <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                  className="text-brand-muted hover:text-white hover:bg-brand-card px-3 py-2.5 rounded-lg text-sm transition font-medium">
                  {label}
                </Link>
              ))}

              <p className="mt-3 mb-1 px-3 text-[10px] uppercase tracking-widest text-brand-muted">Camera Types</p>
              {CAMERA_GROUPS.map((group) => (
                <div key={group.title} className="mt-1">
                  <p className="px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-brand-green">{group.title}</p>
                  {group.links.map(({ href, label }) => (
                    <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                      className="text-brand-muted hover:text-white hover:bg-brand-card px-3 py-2 rounded-lg text-sm transition">
                      {label}
                    </Link>
                  ))}
                </div>
              ))}

              <p className="mt-3 mb-1 px-3 text-[10px] uppercase tracking-widest text-brand-muted">Best Of 2026</p>
              {BEST_OF_2026.map(({ href, label }) => (
                <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                  className="text-brand-muted hover:text-white hover:bg-brand-card px-3 py-2 rounded-lg text-sm transition">
                  {label}
                </Link>
              ))}

              <p className="mt-3 mb-1 px-3 text-[10px] uppercase tracking-widest text-brand-muted">Compare</p>
              {COMPARE_LINKS.map(({ href, label }) => (
                <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                  className="text-brand-muted hover:text-white hover:bg-brand-card px-3 py-2 rounded-lg text-sm transition">
                  {label}
                </Link>
              ))}

              <p className="mt-3 mb-1 px-3 text-[10px] uppercase tracking-widest text-brand-muted">More</p>
              {[
                { href: "/hidden-camera-laws", label: "Hidden Camera Laws" },
                { href: "/israel-joffe", label: "About Israel Joffe" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                  className="text-brand-muted hover:text-white hover:bg-brand-card px-3 py-2 rounded-lg text-sm transition">
                  {label}
                </Link>
              ))}

              <div className="pt-2 mt-1 border-t border-brand-border flex gap-2">
                <Link href="/my-cams" onClick={() => setMenuOpen(false)} className="btn-primary flex-1 text-center text-xs py-2">Submit Your Feed →</Link>
              </div>
            </div>
          )}
        </nav>

        {/* News Ticker */}
        {!isContactRoute && <NewsTicker />}
      </div>

      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-brand-border bg-brand-surface mt-10 md:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-8 mb-8">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-brand-green/10 border border-brand-green/30 flex items-center justify-center">
                  <CameraIcon size={18} />
                </div>
                <span className="font-bold text-base">
                  <span className="text-brand-green">Hidden</span><span className="text-white">Cameras</span><span className="text-brand-muted">.tv</span>
                </span>
              </Link>
              <p className="text-brand-muted text-sm leading-relaxed mb-4 max-w-xs">
                The world&apos;s largest live public webcam directory. Independent security camera reviews, surveillance news, and buying guides.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                <span className="live-dot w-1.5 h-1.5 rounded-full bg-brand-green inline-block" />
                500+ cameras streaming live 24/7
              </div>
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-3">Live Cams</p>
              <div className="flex flex-col gap-2 text-xs text-brand-muted">
                <Link href="/live" className="hover:text-brand-green transition">World Cameras</Link>
                <Link href="/history-of-hidden-cameras" className="hover:text-brand-green transition">Camera History</Link>
                <Link href="/my-cams" className="hover:text-brand-green transition">Submit Your Feed</Link>
              </div>
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-3">Reviews</p>
              <div className="flex flex-col gap-2 text-xs text-brand-muted">
                <Link href="/reviews" className="hover:text-brand-green transition">All Reviews</Link>
                <Link href="/best-hidden-cameras-airbnb" className="hover:text-brand-green transition">Airbnb Guide</Link>
                <Link href="/blog" className="hover:text-brand-green transition">Blog & Guides</Link>
              </div>
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-3">Company</p>
              <div className="flex flex-col gap-2 text-xs text-brand-muted">
                <Link href="/about" className="hover:text-brand-green transition">About</Link>
                <Link href="/israel-joffe" className="hover:text-brand-green transition">About Israel Joffe</Link>
                <Link href="/contact" className="hover:text-brand-green transition">Contact</Link>
                <Link href="/hidden-camera-laws" className="hover:text-brand-green transition">Hidden Camera Laws</Link>
                <Link href="/privacy" className="hover:text-brand-green transition">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-brand-green transition">Terms of Use</Link>
                <a href="mailto:info@hiddencameras.tv" className="hover:text-brand-green transition">info@hiddencameras.tv</a>
              </div>
            </div>
          </div>
          <div className="border-t border-brand-border pt-5 mb-5">
            <p className="text-white font-semibold text-xs uppercase tracking-widest mb-3">Across the network</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-brand-muted">
              <a href="https://scooter.exchange" target="_blank" rel="noopener" className="hover:text-brand-green transition">scooter.exchange</a>
              <a href="https://diamonds.forsale" target="_blank" rel="noopener" className="hover:text-brand-green transition">diamonds.forsale</a>
              <a href="https://fashionistas.ai" target="_blank" rel="noopener" className="hover:text-brand-green transition">fashionistas.ai</a>
              <a href="https://placebets.ai" target="_blank" rel="noopener" className="hover:text-brand-green transition">placebets.ai</a>
              <a href="https://spanishtvshows.com" target="_blank" rel="noopener" className="hover:text-brand-green transition">spanishtvshows.com</a>
              <a href="https://ihatecollege.com" target="_blank" rel="noopener" className="hover:text-brand-green transition">ihatecollege.com</a>
              <a href="https://wuwonline.com" target="_blank" rel="noopener" className="hover:text-brand-green transition">wuwonline.com</a>
            </div>
          </div>
          <div className="border-t border-brand-border pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-brand-muted">
            <p>© {new Date().getFullYear()} HiddenCameras.tv · Amazon Associate: we earn commissions on qualifying purchases.</p>
            <p>Educational security content only. All live cameras are publicly accessible streams. We do not host or store video footage.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
