import Link from "next/link";

export default function ArticleCard({ article }) {
  return (
    <Link href={`/blog/${article.slug}`} className="card hover:border-brand-green/50 transition block group">
      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">{article.category || "Guide"}</div>
      <h3 className="font-bold text-white group-hover:text-brand-green transition mb-2 leading-snug">
        {article.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{article.excerpt}</p>
      <p className="text-xs text-gray-500 mt-3">{new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
    </Link>
  );
}
