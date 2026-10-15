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
        <p className="text-gray-400 mb-6"><strong>Last Updated:</strong> October 10, 2026</p>

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
          HiddenCameras.tv may display advertisements. Product links are provided for reference.
          Affiliate relationships do not buy rankings or editorial placement. Sponsored or paid
          relationships, if any, should be disclosed on the relevant page.
        </p>

        <h2>5. Public Camera Streams</h2>
        <p>
          Live camera pages link to or embed publicly accessible streams. We do not own, operate,
          host, or store those video feeds. If you control a stream and want it corrected or removed,
          contact info@hiddencameras.tv.
        </p>

                <h2>6. Limitation of Liability</h2>
        <p className="text-gray-400 leading-relaxed mb-5">
          HiddenCameras.tv is published for general informational purposes. Nothing on this site
          is legal, security, or professional advice, and you should confirm anything that matters
          with a qualified professional in your jurisdiction before acting on it. Product
          specifications, prices, and availability change without notice, and we make no warranty
          that information on this site is complete, current, or accurate at the moment you read it.
        </p>
        <p className="text-gray-400 leading-relaxed mb-5">
          To the fullest extent permitted by law, we are not liable for any loss or damage arising
          from your use of this site, from reliance on its content, or from products purchased
          through third-party links. Where our content describes what a device is capable of, that
          description is not a guarantee of performance in your specific circumstances.
        </p>

        <h2>7. Third-Party Links and Advertising</h2>
        <p className="text-gray-400 leading-relaxed mb-5">
          This site links to retailers, manufacturers, and other third parties, and carries
          display advertising. We do not control those sites and are not responsible for their
          content, pricing, privacy practices, or the fulfilment of any order you place with them.
          Where a link goes to a retailer, that retailer sets its own prices and availability; this does
          not influence our rankings or recommendations, which are made independently.
        </p>

        <h2>8. Submissions and User Content</h2>
        <p className="text-gray-400 leading-relaxed mb-5">
          If you submit a product, a review, a correction, or a photograph to us, you confirm that
          you have the right to do so and that the submission does not infringe anyone else's
          rights. You grant us a non-exclusive licence to publish that submission on this site.
          Do not submit material that is unlawful, defamatory, or that contains personal
          information about another person.
        </p>

        <h2>9. Governing Law</h2>
        <p className="text-gray-400 leading-relaxed mb-5">
          These terms are governed by the laws of the United States and the state in which the
          operator is resident, without regard to conflict-of-law principles. If any provision of
          these terms is found unenforceable, the remaining provisions continue in full effect.
          Our failure to enforce a provision is not a waiver of it.
        </p>

        <h2>10. Changes to These Terms</h2>
        <p className="text-gray-400 leading-relaxed mb-5">
          We may update these terms as the site changes. The "last updated" date at the top of this
          page reflects the most recent revision, and continued use of the site after a change
          means you accept the revised terms. If you do not accept them, discontinue use of the site.
        </p>

        <h2>11. Contact</h2>
        <p>
          Questions, corrections, takedown requests, and legal notices can be sent to{" "}
          <a href="mailto:info@hiddencameras.tv">info@hiddencameras.tv</a>.
        </p>
      </div>
    </Layout>
  );
}
