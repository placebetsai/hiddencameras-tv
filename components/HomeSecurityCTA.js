const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

export default function HomeSecurityCTA() {
  return (
    <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-brand-card p-6 mb-8">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🛡️</span>
        <h3 className="text-lg font-bold text-white">Want Complete Home Security?</h3>
      </div>
      <p className="text-gray-400 text-sm mb-5 leading-relaxed">
        Individual cameras are great, but a full security system includes cameras, door/window sensors, motion detectors, and optional professional monitoring. These top-rated systems start under $200.
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        <a
          href="https://simplisafe.com/?utm_source=hiddencamerastv"
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="card hover:border-blue-500/40 transition p-4 flex items-start gap-3"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 text-lg font-bold shrink-0">S</div>
          <div>
            <p className="text-white font-semibold text-sm">SimpliSafe</p>
            <p className="text-gray-500 text-xs mt-0.5">No contract. DIY install in 30 min. Camera, sensors, 24/7 monitoring from $0.50/day.</p>
            <span className="text-blue-400 text-xs font-semibold mt-1 inline-block">Learn More →</span>
          </div>
        </a>
        <a
          href={`https://www.amazon.com/dp/B07Q9VBYV8?tag=${AMAZON_TAG}`}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="card hover:border-yellow-500/40 transition p-4 flex items-start gap-3"
        >
          <div className="w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 text-lg font-bold shrink-0">R</div>
          <div>
            <p className="text-white font-semibold text-sm">Ring Alarm Security Kit</p>
            <p className="text-gray-500 text-xs mt-0.5">5-piece kit with base station, keypad, contact sensor, motion detector, and range extender.</p>
            <span className="text-yellow-400 text-xs font-semibold mt-1 inline-block">Check Price on Amazon →</span>
          </div>
        </a>
      </div>
    </div>
  );
}
