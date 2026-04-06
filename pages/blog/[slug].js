import Layout from "../../components/Layout";
import AdUnit from "../../components/AdUnit";
import Link from "next/link";
import path from "path";
import fs from "fs";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "hiddencamerastv-20";

export default function Article({ article }) {
  if (!article) return null;

  // Replace [AMAZON:ASIN:Title] shortcodes with real affiliate links
  const renderBody = (body) =>
    body.replace(/\[AMAZON:([A-Z0-9]+):([^\]]+)\]/g, (_, asin, title) =>
      `<a href="https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}" target="_blank" rel="nofollow sponsored noopener noreferrer" class="inline-flex items-center gap-1 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded hover:bg-yellow-300 transition">${title} →</a>`
    );

  return (
    <Layout
      title={`${article.title} — HiddenCameras.tv`}
      description={article.excerpt}
      canonical={`https://hiddencameras.tv/blog/${article.slug}`}
    >
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            datePublished: article.date,
            publisher: { "@type": "Organization", name: "HiddenCameras.tv", url: "https://hiddencameras.tv" },
          }),
        }}
      />

      <div className="mb-4">
        <Link href="/blog" className="text-sm text-gray-500 hover:text-brand-green">← All Guides</Link>
      </div>

      <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">{article.category || "Guide"}</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight">{article.title}</h1>
      <div className="flex items-center gap-3 mb-6">
        {article.authorInitials && (
          <div className="w-8 h-8 rounded-full bg-brand-green/20 border border-brand-green/30 flex items-center justify-center text-brand-green text-xs font-bold shrink-0">
            {article.authorInitials}
          </div>
        )}
        <p className="text-gray-400 text-sm">
          {article.author && <span className="text-gray-300 font-medium">{article.author}</span>}
          {article.author && <span className="mx-2 text-gray-600">·</span>}
          {new Date(article.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          <span className="mx-2 text-gray-600">·</span>
          {Math.ceil((article.body || "").split(" ").length / 200)} min read
        </p>
      </div>

      <AdUnit />

      <article
        className="prose-dark max-w-none"
        dangerouslySetInnerHTML={{ __html: renderBody(article.body || "") }}
      />

      <AdUnit />

      <div className="card border-brand-green/30 mt-10 text-center py-8">
        <p className="font-bold text-white mb-2">Looking for more security tips?</p>
        <Link href="/blog" className="btn-primary">Browse All Guides →</Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const articlesDir = path.join(process.cwd(), "data", "articles");
  let slugs = [];
  try {
    slugs = fs.readdirSync(articlesDir)
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(".json", ""));
  } catch {}
  return { paths: slugs.map((s) => ({ params: { slug: s } })), fallback: false };
}

export async function getStaticProps({ params }) {
  try {
    const filePath = path.join(process.cwd(), "data", "articles", `${params.slug}.json`);
    const article = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return { props: { article } };
  } catch {
    return { notFound: true };
  }
}
