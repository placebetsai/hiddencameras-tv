import Link from "next/link";
import CameraIcon from "./CameraIcon";

export default function ArticleCard({ article }) {
  const readTime = Math.max(1, Math.ceil(((article.body || "").split(" ").length) / 200));
  return (
    <Link href={`/blog/${article.slug}/`} className="card hover:border-brand-green/50 transition block group relative overflow-hidden">
      {/* subtle corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-brand-green/5 rounded-bl-full" />
      <div className="flex items-start gap-2 mb-3">
        <div className="p-1.5 rounded-lg bg-brand-green/10 shrink-0">
          <CameraIcon size={16} />
        </div>
        <div className="pill bg-brand-green/10 text-brand-green">{article.category || "Guide"}</div>
      </div>
      <h3 className="font-bold text-white group-hover:text-brand-green transition mb-2 leading-snug text-sm">
        {article.title}
      </h3>
      <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">{article.excerpt}</p>
      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-gray-500">
          {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </p>
        <p className="text-xs text-gray-500">{readTime} min read</p>
      </div>
    </Link>
  );
}
