// EditorPickCard — premium editorial card for camera roundups.
// Tailwind-compatible with HC's dark/red aesthetic. Used by every best-of /
// category page that replaced its Amazon listicle.
//
// Props: p = { handle, title, price, image, badge, blurb }

import Link from "next/link";

const AMAZON_TAG = "hiddencamerastv-20";

const HANDLE_TO_ASIN = {
  "4k-mini-wifi-pinhole-hidden-camera": "B07MFWKM6R",
  "pocket-pen-hd-hidden-camera": "B078T2R64H",
  "mini-hidden-nanny-cam-1080p": "B0CGX9GQ3Q",
  "night-vision-1080p-resolution-portable-mini-camera-1025333310": "B0CGX9GQ3Q",
  "dice-style-hidden-nanny-cam-1080p": "B01A7MACL2",
  "wireless-1080p-indoor-security-camera": "B0CGX9GQ3Q",
  "amcrest-1080p-nanny-pet-wifi-camera": "B0C7VN19YS",
  "2k-pan-tilt-pet-baby-camera-with-smart-tracking": "B0C7VN19YS",
  "1080p-pan-tilt-zoom-indoor-pet-baby-monitor": "B0C7VN19YS",
  "mini-wireless-wifi-nanny-cam-palm-size": "B0CJ9YX7DG",
  "smart-wireless-video-doorbell-with-night-vision": "B0B8QYZRSC",
  "smart-wifi-video-doorbell-m7-with-remote-monitoring": "B09NYZGGJD",
  "battery-powered-wifi-video-doorbell": "B0B8QYZRSC",
  "wireless-wifi-video-doorbell-with-music-bell-full-hd-resolution-two-1508265658": "B0B8QYZRSC",
  "solar-powered-outdoor-wifi-camera-with-night-vision": "B0CJ9YX7DG",
  "1080p-ip66-outdoor-wifi-bullet-camera": "B08C5XKWG6",
  "ip65-outdoor-wifi-camera-v380-pro": "B08C5XKWG6",
  "wifi-surveillance-camera-4k-8mp-dual-lens-wireless-outdoor-security-ptz-ip-cameras-ai-human-detect-cctv-camera-4x-digital-zoom": "B08C5XKWG6",
  "1080p-touch-screen-dashcam-with-carplay": "B0CGX9GQ3Q",
  "4-inch-ips-dual-channel-starlight-night-vision-dashcam": "B0CGX9GQ3Q",
  "dual-lens-b6t-dashcam-12mp-170-view": "B0CGX9GQ3Q",
  "2-4-inch-full-hd-1080p-dash-cam-car-dvr-front-camera-or-rear-camera-night-vision-g-sensor": "B0CGX9GQ3Q",
  "anti-spy-hidden-camera-signal-detector": "B07MFWKM6R",
};

export default function EditorPickCard({ p }) {
  const asin = HANDLE_TO_ASIN[p.handle] || null;
  const href = asin
    ? `https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}`
    : `https://www.amazon.com/s?k=${encodeURIComponent(p.title || "security camera")}&tag=${AMAZON_TAG}`;
  return (
    <article className="card relative overflow-hidden flex flex-col group hover:border-brand-green/40 transition-all">
      <span className="editor-badge">
        {p.badge}
      </span>
      {p.image && (
        <div className="aspect-square bg-brand-bg overflow-hidden">
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-white text-sm font-bold leading-tight mb-2 line-clamp-2">{p.title}</h3>
        <p className="text-gray-400 text-xs leading-5 mb-3 line-clamp-3">{p.blurb}</p>
        <div className="mt-auto flex items-center gap-3">
          <span className="text-brand-green font-black text-lg">${p.price}</span>
          <a
            href={href}
            target="_blank"
            rel="noopener nofollow"
            className="ml-auto bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs py-2 px-3 rounded-md transition"
          >
            Buy on Amazon &rarr;
          </a>
        </div>
      </div>
    </article>
  );
}

export function EditorPickGrid({ picks }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
      {picks.map((p, i) => (
        <EditorPickCard key={`${p.handle}-${i}`} p={p} />
      ))}
    </div>
  );
}
