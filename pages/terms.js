import Layout from "../components/Layout";

export default function Terms() {
  return (
    <Layout
      title="Terms of Use — HiddenCameras.tv"
      description="Terms of use for HiddenCameras.tv covering educational content, product links, legal information, and acceptable use."
      canonical="https://hiddencameras.tv/terms"
    >
      <h1 className="text-2xl font-bold text-white mb-6">Terms of Use</h1>
      <div className="prose-dark max-w-none text-sm leading-relaxed">
        <p className="text-gray-400 mb-6"><strong>Last Updated:</strong> May 3, 2026</p>

        <h2>1. Educational Content Only</h2>
        <p>
          HiddenCameras.tv publishes security camera reviews, buyer guides, public webcam
          directories, privacy explainers, and surveillance-law summaries for general education.
          Nothing on this site is legal advice, safety advice for a specific property, or a
          substitute for professional guidance.
        </p>

        <h2>2. Legal and Ethical Use</h2>
        <p>
          You are responsible for obeying all federal, state, local, workplace, lease, and platform
          rules before installing or using any camera, detector, dashcam, body camera, or recording
          device. We do not endorse voyeurism, harassment, stalking, illegal recording, or monitoring
          people in bathrooms, bedrooms, changing areas, private rentals, or any place where they
          reasonably expect privacy.
        </p>

        <h2>3. Reviews, Prices, and Availability</h2>
        <p>
          Product features, prices, stock, subscriptions, and warranty terms change frequently.
          We try to keep guides useful, but we cannot guarantee that every price, model number,
          specification, or retailer page is current.
        </p>

        <h2>4. Affiliate Links and Advertising</h2>
        <p>
          HiddenCameras.tv may earn commissions from qualifying purchases and may display ads.
          Affiliate relationships do not buy rankings or editorial placement. Sponsored or paid
          relationships, if any, should be disclosed on the relevant page.
        </p>

        <h2>5. Public Camera Streams</h2>
        <p>
          Live camera pages link to or embed publicly accessible streams. We do not own, operate,
          host, or store those video feeds. If you control a stream and want it corrected or removed,
          contact info@hiddencameras.tv.
        </p>

        <h2>6. Contact</h2>
        <p>
          Questions, corrections, takedown requests, and legal notices can be sent to{" "}
          <a href="mailto:info@hiddencameras.tv">info@hiddencameras.tv</a>.
        </p>
      </div>
    </Layout>
  );
}
