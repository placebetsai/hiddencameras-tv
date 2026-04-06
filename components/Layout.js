import Head from "next/head";
import Link from "next/link";
import CameraIcon from "./CameraIcon";

export default function Layout({ children, title, description, canonical }) {
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
        <meta property="og:image" content="https://hiddencameras.tv/og-image.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@hiddencameras4u" />
        <meta name="twitter:image" content="https://hiddencameras.tv/og-image.svg" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="google-site-verification" content="" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.svg" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </Head>

      {/* Navbar */}
      <nav className="border-b border-brand-border sticky top-0 z-50 bg-brand-bg/95 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight group">
            <CameraIcon size={26} className="group-hover:scale-110 transition-transform" />
            <span>
              <span className="text-brand-green">Hidden</span>
              <span className="text-white">Cameras</span>
              <span className="text-gray-500">.tv</span>
            </span>
          </Link>
          <div className="flex gap-5 text-sm text-gray-400">
            <Link href="/reviews" className="hover:text-white transition">Reviews</Link>
            <Link href="/blog" className="hover:text-white transition">Guides</Link>
            <Link href="/live" className="hover:text-red-400 transition flex items-center gap-1">
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
              Live
            </Link>
            <Link href="/best-hidden-cameras-airbnb" className="hover:text-white transition">Airbnb</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>

      <footer className="border-t border-brand-border mt-16 py-8 text-center text-sm text-gray-500">
        <div className="flex items-center justify-center gap-2 mb-3">
          <CameraIcon size={18} />
          <span className="font-semibold text-gray-400">
            <span className="text-brand-green">Hidden</span>Cameras.tv
          </span>
        </div>
        <p className="mb-2">
          <Link href="/" className="hover:text-white mx-2">Home</Link>
          <Link href="/reviews" className="hover:text-white mx-2">Reviews</Link>
          <Link href="/blog" className="hover:text-white mx-2">Guides</Link>
          <Link href="/privacy" className="hover:text-white mx-2">Privacy</Link>
          <Link href="/contact" className="hover:text-white mx-2">Contact</Link>
        </p>
        <p>© {new Date().getFullYear()} HiddenCameras.tv — As an Amazon Associate we earn from qualifying purchases.</p>
      </footer>
    </>
  );
}
