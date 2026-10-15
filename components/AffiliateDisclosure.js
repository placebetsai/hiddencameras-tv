import Link from "next/link";

export default function AffiliateDisclosure() {
  return (
    <div className="rounded-xl bg-brand-surface/50 border border-brand-border/50 px-4 py-3 mb-6 flex items-start gap-2">
      <span className="text-gray-500 text-sm shrink-0">ℹ️</span>
      <p className="text-gray-500 text-xs leading-relaxed">
        This page links to retailers. Prices, stock and delivery are controlled by the retailer, not by us.viewing products independently.{" "}
        <Link href="/privacy" className="text-gray-400 underline hover:text-brand-green transition">Privacy Policy</Link>
      </p>
    </div>
  );
}
