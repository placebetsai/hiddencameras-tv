import Layout from "../components/Layout";
export default function Privacy() {
  return (
    <Layout title="Privacy Policy — HiddenCameras.tv">
      <h1 className="text-2xl font-bold text-white mb-6">Privacy Policy</h1>
      <div className="prose-dark max-w-none">
        <p>HiddenCameras.tv (&quot;we&quot;, &quot;us&quot;) is committed to protecting your privacy.</p>
        <h2>Affiliate Disclosure</h2>
        <p>HiddenCameras.tv is a participant in the Amazon Services LLC Associates Program. We earn commissions when you purchase through our links at no extra cost to you.</p>
        <h2>Advertising</h2>
        <p>We use Google AdSense to display ads. Google may use cookies to serve ads based on your prior visits. You can opt out at <a href="https://www.google.com/settings/ads">google.com/settings/ads</a>.</p>
        <h2>Cookies</h2>
        <p>We use cookies for analytics and to improve site experience. No personal data is sold to third parties.</p>
        <h2>Contact</h2>
        <p>Questions? Email info@hiddencameras.tv.</p>
      </div>
    </Layout>
  );
}
