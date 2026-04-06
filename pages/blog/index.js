import Layout from "../../components/Layout";
import ArticleCard from "../../components/ArticleCard";
import AdUnit from "../../components/AdUnit";
import Link from "next/link";
import path from "path";
import fs from "fs";

export default function Blog({ articles }) {
  return (
    <Layout
      title="Security Camera Guides & Reviews — HiddenCameras.tv"
      description="In-depth buying guides, hidden camera detection tips, and security camera comparisons. Updated weekly."
      canonical="https://hiddencameras.tv/blog"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        <div className="mb-6">
          <h1 className="text-3xl font-black text-white mb-2">Guides & Reviews</h1>
          <p className="text-gray-400 text-sm">In-depth buying guides, camera comparisons, and security tips.</p>
        </div>

        <AdUnit />

        {articles.length === 0 ? (
          <div className="card text-center py-16">
            <p className="text-gray-500 mb-4">Articles coming soon.</p>
            <Link href="/news" className="btn-primary text-sm">Read Surveillance News →</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          <div className="card border-brand-green/20">
            <h3 className="text-white font-bold mb-1">Detect Hidden Cameras</h3>
            <p className="text-gray-400 text-sm mb-4">Step-by-step sweep guide for Airbnbs and hotels.</p>
            <Link href="/detect-hidden-cameras" className="btn-primary text-sm">Read the Guide →</Link>
          </div>
          <div className="card">
            <h3 className="text-white font-bold mb-1">Surveillance News</h3>
            <p className="text-gray-400 text-sm mb-4">Latest in cameras, privacy law, and tech.</p>
            <Link href="/news" className="btn-outline text-sm">Read the News →</Link>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const articlesDir = path.join(process.cwd(), "data", "articles");
  let articles = [];
  try {
    const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".json"));
    articles = files
      .map((f) => JSON.parse(fs.readFileSync(path.join(articlesDir, f), "utf8")))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch {}
  return { props: { articles } };
}
