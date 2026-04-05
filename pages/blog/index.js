import Layout from "../../components/Layout";
import ArticleCard from "../../components/ArticleCard";
import AdUnit from "../../components/AdUnit";
import path from "path";
import fs from "fs";

export default function Blog({ articles }) {
  return (
    <Layout title="Buying Guides & Reviews — HiddenCameras.tv" canonical="https://hiddencameras.tv/blog">
      <h1 className="text-2xl font-extrabold text-white mb-2">Guides & Reviews</h1>
      <p className="text-gray-400 mb-8">In-depth buying guides, camera comparisons, and security tips — updated daily.</p>

      <AdUnit />

      {articles.length === 0 ? (
        <p className="text-gray-500">Articles coming soon.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((a) => <ArticleCard key={a.slug} article={a} />)}
        </div>
      )}
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
