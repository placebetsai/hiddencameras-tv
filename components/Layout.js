import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import CameraIcon from "./CameraIcon";

export default function Layout({ children, title, description, canonical }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = title || "HiddenCameras.tv — Live World Cams & Security Camera Reviews";
  const d = description || "Watch 60+ live public cameras worldwide. Expert reviews of Ring, Arlo, Blink, Wyze & Nest. Buying guides for every budget.";
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
        <meta property="og:image" content="https://hiddencameras.tv/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@hiddencameras4u" />
        <meta name="twitter:image" content="https://hiddencameras.tv/og-image.png" />
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

      {/* Top bar */}
      <div className="bg-brand-green/10 border-b border-brand-green/20 text-center py-1.5 text-xs text-brand-green font-medium tracking-wide">
        <span className="live-dot w-1.5 h-1.5 rounded-full bg-brand-green inline-block mr-2 align-middle" />
        60+ LIVE CAMERAS STREAMING WORLDWIDE · 24/7
      </div>

      {/* Navbar */}
      <nav className="border-b border-brand-border sticky top-0 z-50" style={{ background: "rgba(8,11,13,0.96)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-brand-green/10 border border-brand-green/30 flex items-center justify-center group-hover:shadow-green-sm transition-all">
              <CameraIcon size={20} />
            </div>
            <span className="hidden sm:block">
              <span className="text-brand-green">Hidden</span>
              <span className="text-white">Cameras</span>
              <span className="text-brand-muted">.tv</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="nav-link px-3 py-2 rounded-lg hover:bg-brand-card">Home</Link>
            <Link href="/reviews" className="nav-link px-3 py-2 rounded-lg hover:bg-brand-card">Reviews</Link>
            <Link href="/blog" className="nav-link px-3 py-2 rounded-lg hover:bg-brand-card">Blog</Link>
            <Link href="/live" className="nav-link px-3 py-2 rounded-lg hover:bg-brand-card flex items-center gap-1.5 text-red-400 hover:text-red-300">
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
              Live Cams
            </Link>
            <Link href="/my-cams" className="nav-link px-3 py-2 rounded-lg hover:bg-brand-card">My Cams</Link>
            <Link href="/about" className="nav-link px-3 py-2 rounded-lg hover:bg-brand-card">About</Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/submit-cam" className="btn-outline text-xs py-2 px-3">+ Submit Cam</Link>
            <Link href="/my-cams" className="btn-primary text-xs py-2 px-4">Add My Cam</Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-brand-muted hover:text-white p-2 rounded-lg hover:bg-brand-card transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen
                ? <><path d="M18 6L6 18"/><path d="M6 6l12 12"/></>
                : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-brand-border bg-brand-bg px-4 py-4 flex flex-col gap-1">
            {[
              { href: "/", label: "Home" },
              { href: "/reviews", label: "Reviews" },
              { href: "/blog", label: "Blog" },
              { href: "/live", label: "🔴 Live Cams" },
              { href: "/my-cams", label: "My Cams" },
              { href: "/best-hidden-cameras-airbnb", label: "Airbnb Guide" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                className="text-brand-muted hover:text-white hover:bg-brand-card px-3 py-2.5 rounded-lg text-sm transition">
                {label}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-brand-border flex gap-2">
              <Link href="/submit-cam" onClick={() => setMenuOpen(false)} className="btn-outline flex-1 text-center text-xs py-2">+ Submit Cam</Link>
              <Link href="/my-cams" onClick={() => setMenuOpen(false)} className="btn-primary flex-1 text-center text-xs py-2">Add My Cam</Link>
            </div>
          </div>
        )}
      </nav>

      <main className="min-h-screen">{children}</main>

      {/* Footer */}
      <footer className="border-t border-brand-border bg-brand-surface mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
            {/* Brand col */}
            <div className="col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-brand-green/10 border border-brand-green/30 flex items-center justify-center">
                  <CameraIcon size={20} />
                </div>
                <span className="font-bold text-lg">
                  <span className="text-brand-green">Hidden</span>
                  <span className="text-white">Cameras</span>
                  <span className="text-brand-muted">.tv</span>
                </span>
              </div>
              <p className="text-brand-muted text-sm leading-relaxed mb-4 max-w-xs">
                Independent security camera reviews, buying guides, and the world&apos;s largest public live webcam directory.
              </p>
              <div className="flex items-center gap-1 text-xs text-brand-muted">
                <span className="live-dot w-1.5 h-1.5 rounded-full bg-brand-green inline-block" />
                60+ cameras streaming live
              </div>
            </div>

            <div>
              <p className="text-white font-semibold text-sm mb-3">Reviews</p>
              <div className="flex flex-col gap-2 text-xs text-brand-muted">
                <Link href="/reviews" className="hover:text-brand-green transition">All Camera Reviews</Link>
                <Link href="/reviews" className="hover:text-brand-green transition">Best Budget</Link>
                <Link href="/reviews" className="hover:text-brand-green transition">Best Premium</Link>
                <Link href="/best-hidden-cameras-airbnb" className="hover:text-brand-green transition">Airbnb Guide</Link>
              </div>
            </div>

            <div>
              <p className="text-white font-semibold text-sm mb-3">Live Cams</p>
              <div className="flex flex-col gap-2 text-xs text-brand-muted">
                <Link href="/live" className="hover:text-brand-green transition">World Cameras</Link>
                <Link href="/my-cams" className="hover:text-brand-green transition">My Cams</Link>
                <Link href="/submit-cam" className="hover:text-brand-green transition">Submit a Cam</Link>
                <Link href="/blog" className="hover:text-brand-green transition">Blog & Guides</Link>
              </div>
            </div>

            <div>
              <p className="text-white font-semibold text-sm mb-3">Company</p>
              <div className="flex flex-col gap-2 text-xs text-brand-muted">
                <Link href="/about" className="hover:text-brand-green transition">About Us</Link>
                <Link href="/contact" className="hover:text-brand-green transition">Contact</Link>
                <Link href="/privacy" className="hover:text-brand-green transition">Privacy Policy</Link>
                <a href="mailto:info@hiddencameras.tv" className="hover:text-brand-green transition">info@hiddencameras.tv</a>
              </div>
            </div>
          </div>

          <div className="border-t border-brand-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-brand-muted">
            <p>© {new Date().getFullYear()} HiddenCameras.tv — Amazon Associate: we earn commissions on qualifying purchases.</p>
            <p>All live cameras shown are publicly accessible streams. We do not host or store video footage.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
