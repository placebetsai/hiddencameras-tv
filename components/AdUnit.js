import { useEffect } from "react";

const ENABLE_AD_UNITS = process.env.NEXT_PUBLIC_ENABLE_AD_UNITS === "true";

export default function AdUnit({ slot = "6600722153", style = {} }) {
  useEffect(() => {
    if (!ENABLE_AD_UNITS) return;
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {}
  }, []);

  if (!ENABLE_AD_UNITS) return null;

  return (
    <div className="text-center overflow-hidden" >
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client="ca-pub-7215975042937417"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
