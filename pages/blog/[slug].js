import Layout from "../../components/Layout";
import AdUnit from "../../components/AdUnit";
import AffiliateDisclosure from "../../components/AffiliateDisclosure";
import Link from "next/link";
import path from "path";
import fs from "fs";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

// Author bios — E-E-A-T signals for AdSense review
const AUTHORS = {
  "HiddenCameras Editorial": {
    initials: "HC",
    color: "#f59e0b",
    title: "Editorial Team",
    bio: "The HiddenCameras editorial team reviews and tests security cameras, analyzes surveillance laws, and creates practical guides for homeowners and renters. Every product recommendation is based on hands-on testing or verified specifications.",
    articles: "100+ articles",
  },
  "Israel Joffe": {
    initials: "IJ",
    color: "#f59e0b",
    title: "Founder & Editor",
    bio: "Israel is the founder of HiddenCameras.tv and a technology writer focused on privacy, security, and consumer electronics. He oversees editorial standards and product testing methodology across the site.",
    articles: "Founder",
  },
};

function AuthorCard({ article }) {
  const name = article.author || "HiddenCameras Editorial";
  const author = AUTHORS[name] || AUTHORS["HiddenCameras Editorial"];
  const reviewDate = article.dateModified || article.date;

  return (
    <div className="mt-10 rounded-2xl border border-brand-border bg-brand-surface p-6">
      <p className="text-[10px] font-black uppercase tracking-[.22em] text-brand-muted mb-4">About the Author</p>
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-black text-white flex-shrink-0 border-2"
          style={{ background: author.color + "22", borderColor: author.color + "55", color: author.color }}
        >
          {author.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-black text-white text-base">{name}</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: author.color + "18", color: author.color }}>
              {author.title}
            </span>
          </div>
          <p className="text-xs text-brand-muted font-medium mb-2">{author.articles} on HiddenCameras.tv</p>
          <p className="text-sm text-gray-400 leading-relaxed">{author.bio}</p>
        </div>
      </div>
      {/* Review date */}
      <div className="mt-4 pt-4 border-t border-brand-border flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs text-brand-muted">
          Last reviewed:{" "}
          <span className="text-gray-300 font-medium">
            {new Date(reviewDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </span>
        </span>
        <span className="text-xs text-brand-muted flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green inline-block" />
          Fact-checked by HiddenCameras.tv editorial team
        </span>
      </div>
    </div>
  );
}

export default function Article({ article }) {
  if (!article || !article.title) return null;

  const authorName = article.author || "HiddenCameras Editorial";
  const author = AUTHORS[authorName] || AUTHORS["HiddenCameras Editorial"];

  const renderBody = (body) =>
    body.replace(/\[AMAZON:([A-Z0-9]+):([^\]]+)\]/g, (_, asin, title) =>
      `<a href="https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}" target="_blank" rel="nofollow sponsored noopener noreferrer" class="inline-flex items-center gap-1 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded hover:bg-yellow-300 transition">${title} →</a>`
    );

  const splitBody = (body) => {
    const processed = renderBody(body || "");
    const paragraphs = processed.split(/<\/(?:p|h2|h3|ul|ol)>/i);
    if (paragraphs.length < 4) return { first: processed, second: "" };
    const midpoint = Math.floor(paragraphs.length / 2);
    let count = 0, splitIdx = 0;
    const tagRegex = /<\/(?:p|h2|h3|ul|ol)>/gi;
    let match;
    while ((match = tagRegex.exec(processed)) !== null) {
      count++;
      if (count === midpoint) { splitIdx = match.index + match[0].length; break; }
    }
    return { first: processed.slice(0, splitIdx), second: processed.slice(splitIdx) };
  };

  const { first: bodyFirst, second: bodySecond } = splitBody(article.body);
  const wordCount = (article.body || "").split(" ").length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.dateModified || article.date,
    author: {
      "@type": "Person",
      name: authorName,
      jobTitle: author.title,
      url: "https://hiddencameras.tv/about",
    },
    image: article.image || "https://hiddencameras.tv/og-default.png",
    publisher: {
      "@type": "Organization",
      name: "HiddenCameras.tv",
      url: "https://hiddencameras.tv",
      logo: { "@type": "ImageObject", url: "https://hiddencameras.tv/logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://hiddencameras.tv/blog/${article.slug}` },
  };

  return (
    <Layout
      title={`${article.title} — HiddenCameras.tv`}
      description={article.excerpt}
      canonical={`https://hiddencameras.tv/blog/${article.slug}`}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand-green transition">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-brand-green transition">Guides</Link>
        <span>/</span>
        <span className="text-gray-400 truncate">{article.title?.slice(0, 40)}…</span>
      </div>

      {/* Category pill */}
      <div className="inline-flex items-center gap-1.5 bg-brand-green/10 border border-brand-green/20 rounded-full px-3 py-1 mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-green inline-block" />
        <span className="text-brand-green text-xs font-black tracking-wide uppercase">{article.category || "Guide"}</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">{article.title}</h1>

      {/* Author + meta bar */}
      <div className="flex items-center gap-3 py-4 border-y border-brand-border mb-6">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
          style={{ background: author.color + "22", color: author.color, border: `1.5px solid ${author.color}44` }}
        >
          {author.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="text-sm font-bold text-white">{authorName}</span>
            <span className="text-gray-600 text-xs">·</span>
            <span className="text-xs text-gray-400">{author.title}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0 mt-0.5 text-xs text-gray-500">
            <span>
              Updated{" "}
              {new Date(article.dateModified || article.date).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric",
              })}
            </span>
            <span className="text-gray-700">·</span>
            <span>{readTime} min read</span>
            <span className="text-gray-700">·</span>
            <span>{wordCount.toLocaleString()} words</span>
          </div>
        </div>
        {/* Fact-checked badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand-border bg-brand-surface text-xs text-gray-400 flex-shrink-0">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          Fact-checked
        </div>
      </div>

      <AffiliateDisclosure />

      {/* Article body — first half */}
      <article className="prose-dark max-w-none" dangerouslySetInnerHTML={{ __html: bodyFirst }} />

      {/* Mid-article ad */}
      {bodySecond && (
        <>
          <AdUnit />
          <article className="prose-dark max-w-none" dangerouslySetInnerHTML={{ __html: bodySecond }} />
        </>
      )}

      {/* Author bio card */}
      <AuthorCard article={article} />

      {/* Bottom ad */}
      <AdUnit />

      {/* Related CTA */}
      <div className="hc-card p-8 mt-8 text-center border-brand-green/20">
        <div className="w-12 h-12 rounded-2xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center text-2xl mx-auto mb-4">📚</div>
        <p className="font-black text-white text-lg mb-2">More Security Guides</p>
        <p className="text-gray-400 text-sm mb-5">Expert reviews, detection guides, and buying advice — all in one place.</p>
        <Link href="/blog" className="btn-primary px-7 py-3">Browse All Guides →</Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const articlesDir = path.join(process.cwd(), "data", "articles");
  let slugs = [];
  try {
    slugs = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".json")).map((f) => f.replace(".json", ""));
  } catch {}
  return { paths: slugs.map((s) => ({ params: { slug: s } })), fallback: false };
}

export async function getStaticProps({ params }) {
  try {
    const filePath = path.join(process.cwd(), "data", "articles", `${params.slug}.json`);
    const raw = fs.readFileSync(filePath, "utf8");
    const article = JSON.parse(raw);
    if (!article || !article.title) return { notFound: true };
    return { props: { article } };
  } catch {
    return { notFound: true };
  }
}
