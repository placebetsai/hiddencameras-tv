import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import CameraIcon from "./CameraIcon";
import NewsTicker from "./NewsTicker";

export default function Layout({ children, title, description, canonical }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = title || "HiddenCameras.tv — Live World Cams & Security Camera Reviews";
  const d = description || "Watch 500+ live public cameras worldwide. Expert reviews of Ring, Arlo, Blink, Wyze & Nest. Surveillance news 24/7.";
  const url = canonical || "https://hiddencameras.tv";

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
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="theme-color" content="#00e676" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </Head>

      {/* Sticky header block: nav + ticker */}
      <div className="sticky top-0 z-50">
        <nav className="border-b border-brand-border" style={{ background: "rgba(8,11,13,0.97)", backdropFilter: "blur(20px)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">

            {/* Logo — always visible */}
            <Link href="/" className="flex items-center gap-2 font-bold tracking-tight group shrink-0">
              <div className="w-8 h-8 rounded-lg bg-brand-green/10 border border-brand-green/30 flex items-center justify-center group-hover:shadow-green-sm transition-all shrink-0">
                <CameraIcon size={18} />
              </div>
              <span className="text-base leading-none">
                <span className="text-brand-green">Hidden</span><span className="text-white">Cameras</span><span className="text-brand-muted">.tv</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-0.5">
              <Link href="/" className="nav-link px-3 py-1.5 rounded-lg hover:bg-brand-card text-sm">Home</Link>
              <Link href="/live" className="nav-link px-3 py-1.5 rounded-lg hover:bg-brand-card flex items-center gap-1.5 text-red-400 hover:text-red-300 text-sm">
                <span className="live-dot w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />Live Cams
              </Link>
              <Link href="/news" className="nav-link px-3 py-1.5 rounded-lg hover:bg-brand-card text-sm">News</Link>
              <Link href="/detect-hidden-cameras" className="nav-link px-3 py-1.5 rounded-lg hover:bg-brand-card text-sm">Detect</Link>
              <Link href="/reviews" className="nav-link px-3 py-1.5 rounded-lg hover:bg-brand-card text-sm">Reviews</Link>
              <Link href="/blog" className="nav-link px-3 py-1.5 rounded-lg hover:bg-brand-card text-sm">Blog</Link>
              <Link href="/my-cams" className="nav-link px-3 py-1.5 rounded-lg hover:bg-brand-card text-sm">My Cams</Link>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <Link href="/submit-cam" className="btn-outline text-xs py-1.5 px-3">+ Submit Cam</Link>
              <Link href="/my-cams" className="btn-primary text-xs py-1.5 px-3">Add My Cam</Link>
            </div>

            {/* Mobile right side */}
            <div className="flex md:hidden items-center gap-2">
              <Link href="/live" className="flex items-center gap-1 text-red-400 text-xs font-bold">
                <span className="live-dot w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />LIVE
              </Link>
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-brand-muted hover:text-white p-1.5 rounded-lg hover:bg-brand-card transition">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
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
            <div className="md:hidden border-t border-brand-border bg-brand-bg px-4 py-3 flex flex-col gap-1">
              {[
                { href: "/", label: "Home" },
                { href: "/live", label: "🔴 Live World Cams" },
                { href: "/news", label: "📰 Surveillance News" },
                { href: "/detect-hidden-cameras", label: "🔍 Detect Hidden Cameras" },
                { href: "/reviews", label: "Camera Reviews" },
                { href: "/blog", label: "Blog & Guides" },
                { href: "/my-cams", label: "My Cams" },
                { href: "/best-hidden-cameras-airbnb", label: "Airbnb Guide" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                  className="text-brand-muted hover:text-white hover:bg-brand-card px-3 py-2.5 rounded-lg text-sm transition font-medium">
                  {label}
                </Link>
              ))}
              <div className="pt-2 mt-1 border-t border-brand-border flex gap-2">
                <Link href="/submit-cam" onClick={() => setMenuOpen(false)} className="btn-outline flex-1 text-center text-xs py-2">+ Submit Cam</Link>
                <Link href="/my-cams" onClick={() => setMenuOpen(false)} className="btn-primary flex-1 text-center text-xs py-2">Add My Cam</Link>
              </div>
            </div>
          )}
        </nav>

        {/* News Ticker */}
        <NewsTicker />
      </div>

      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-brand-border bg-brand-surface mt-10 md:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 mb-8">
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
                <Link href="/my-cams" className="hover:text-brand-green transition">My Private Cams</Link>
                <Link href="/submit-cam" className="hover:text-brand-green transition">Submit a Cam</Link>
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
                <Link href="/contact" className="hover:text-brand-green transition">Contact</Link>
                <Link href="/privacy" className="hover:text-brand-green transition">Privacy Policy</Link>
                <a href="mailto:info@hiddencameras.tv" className="hover:text-brand-green transition">info@hiddencameras.tv</a>
              </div>
            </div>
          </div>
          <div className="border-t border-brand-border pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-brand-muted">
            <p>© {new Date().getFullYear()} HiddenCameras.tv · Amazon Associate: we earn commissions on qualifying purchases.</p>
            <p>All live cameras are publicly accessible streams. We do not host or store video footage.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
