import Head from "next/head";
import Link from "next/link";
import CameraIcon from "./CameraIcon";
import { useState } from "react";

export default function Layout({ children, title, description, canonical }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = title || "HiddenCameras.tv — Home Security & Hidden Camera Reviews";
  const d = description || "Expert reviews of hidden cameras, security cameras, and home surveillance systems. Find the best Ring, Arlo, Blink, Wyze, and Nest cameras for every budget.";
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
        <meta name="theme-color" content="#00c853" />
        {/* Favicons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </Head>

      {/* Navbar */}
      <nav className="border-b border-brand-border sticky top-0 z-50 bg-brand-bg/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight group shrink-0">
            <CameraIcon size={26} className="group-hover:scale-110 transition-transform" />
            <span>
              <span className="text-brand-green">Hidden</span>
              <span className="text-white">Cameras</span>
              <span className="text-gray-500">.tv</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-5 text-sm text-gray-400">
            <Link href="/reviews" className="hover:text-white transition">Reviews</Link>
            <Link href="/blog" className="hover:text-white transition">Blog</Link>
            <Link href="/live" className="hover:text-red-400 transition flex items-center gap-1.5 font-semibold">
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
              Live Cams
            </Link>
            <Link href="/best-hidden-cameras-airbnb" className="hover:text-white transition">Airbnb</Link>
            <Link href="/about" className="hover:text-white transition">About</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
            <Link href="/submit-cam" className="btn-primary py-1.5">Submit a Cam</Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-400 hover:text-white p-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <path d="M18 6L6 18M6 6l12 12" />
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-brand-border bg-brand-bg px-4 py-3 flex flex-col gap-3 text-sm text-gray-400">
            <Link href="/reviews" onClick={() => setMenuOpen(false)} className="hover:text-white">Reviews</Link>
            <Link href="/blog" onClick={() => setMenuOpen(false)} className="hover:text-white">Blog</Link>
            <Link href="/live" onClick={() => setMenuOpen(false)} className="hover:text-red-400 flex items-center gap-1.5">
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-red-500" />Live Cams
            </Link>
            <Link href="/best-hidden-cameras-airbnb" onClick={() => setMenuOpen(false)} className="hover:text-white">Airbnb</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="hover:text-white">About</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-white">Contact</Link>
            <Link href="/submit-cam" onClick={() => setMenuOpen(false)} className="btn-primary text-center py-2">Submit a Cam</Link>
          </div>
        )}
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>

      <footer className="border-t border-brand-border mt-16 pt-10 pb-8 bg-brand-bg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CameraIcon size={20} />
                <span className="font-bold text-gray-300"><span className="text-brand-green">Hidden</span>Cameras.tv</span>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">Independent security camera reviews and the world&apos;s largest public live cam directory.</p>
            </div>
            {/* Reviews */}
            <div>
              <p className="text-gray-300 font-semibold text-sm mb-3">Reviews</p>
              <div className="flex flex-col gap-1.5 text-xs text-gray-500">
                <Link href="/reviews" className="hover:text-brand-green">All Camera Reviews</Link>
                <Link href="/best-hidden-cameras-airbnb" className="hover:text-brand-green">Best for Airbnb</Link>
                <Link href="/reviews" className="hover:text-brand-green">Best Budget Cams</Link>
                <Link href="/reviews" className="hover:text-brand-green">Best Premium Cams</Link>
              </div>
            </div>
            {/* Content */}
            <div>
              <p className="text-gray-300 font-semibold text-sm mb-3">Content</p>
              <div className="flex flex-col gap-1.5 text-xs text-gray-500">
                <Link href="/blog" className="hover:text-brand-green">Blog &amp; Guides</Link>
                <Link href="/live" className="hover:text-brand-green">Live World Cams</Link>
                <Link href="/submit-cam" className="hover:text-brand-green">Submit a Cam</Link>
                <Link href="/about" className="hover:text-brand-green">About Us</Link>
              </div>
            </div>
            {/* Legal */}
            <div>
              <p className="text-gray-300 font-semibold text-sm mb-3">Legal</p>
              <div className="flex flex-col gap-1.5 text-xs text-gray-500">
                <Link href="/privacy" className="hover:text-brand-green">Privacy Policy</Link>
                <Link href="/contact" className="hover:text-brand-green">Contact Us</Link>
                <a href="mailto:info@hiddencameras.tv" className="hover:text-brand-green">info@hiddencameras.tv</a>
              </div>
            </div>
          </div>

          <div className="border-t border-brand-border pt-6 text-center text-xs text-gray-600">
            <p className="mb-1">© {new Date().getFullYear()} HiddenCameras.tv — As an Amazon Associate we earn from qualifying purchases.</p>
            <p>All public cameras shown are legally accessible public streams. We do not host or store any video footage.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
