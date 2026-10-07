import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Contact() {
  const router = useRouter();
  const [sentFromLocation, setSentFromLocation] = useState(false);
  const sent = router.query.sent === "true" || router.asPath.includes("sent=true") || sentFromLocation;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSentFromLocation(new URLSearchParams(window.location.search).get("sent") === "true");
    }
  }, []);

  return (
    <Layout
      title="Contact Us — HiddenCameras.tv"
      description="Get in touch with the HiddenCameras.tv editorial team. Questions, tips, corrections, or partnership inquiries welcome."
      canonical="https://hiddencameras.tv/contact"
    >
      <div className="max-w-xl mx-auto px-4 py-10 sm:py-12">
        <h1 className="text-3xl font-black text-white mb-4 text-center">Contact Us</h1>
        <p className="text-gray-400 mb-8 text-center">
          Have a question, tip, correction, or partnership inquiry? We would love to hear from you. Fill out the form below or email us directly at{" "}
          <a href="mailto:info@hiddencameras.tv" className="text-brand-green hover:underline">
            info@hiddencameras.tv
          </a>.
        </p>

        <div className="card mb-6">
          <h2 className="text-white text-base font-black mb-3">What to include</h2>
          <ul className="text-gray-400 text-sm space-y-2 list-disc list-inside">
            <li>
              <strong className="text-brand-text">Corrections:</strong> the page URL, the line that
              is wrong, and what the correct information is. Corrections are checked first and noted
              on the updated page.
            </li>
            <li>
              <strong className="text-brand-text">Product or guide questions:</strong> the model or
              guide name and what you are deciding between — storage, power, night coverage, running
              cost.
            </li>
            <li>
              <strong className="text-brand-text">Reports about a camera you found:</strong> do not
              send footage or personal details here. Contact the platform or property first, and the
              police if you believe you were recorded.
            </li>
            <li>
              <strong className="text-brand-text">Business enquiries:</strong> say who you are and
              what you are proposing. We do not sell placement inside our roundups.
            </li>
          </ul>
          <p className="text-gray-500 text-xs mt-3">
            This site is edited by Israel Joffe. Messages go to the editorial inbox rather than a
            ticket queue, so please keep one message to one topic.
          </p>
        </div>

        {sent ? (
          <div className="card text-center py-10">
            <p className="text-brand-green text-lg font-bold mb-2">Thank you for reaching out!</p>
            <p className="text-gray-400 text-sm">
              Your message has been sent successfully. We typically respond within 1-2 business days.
            </p>
          </div>
        ) : (
          <form
            action="https://formsubmit.co/info@hiddencameras.tv"
            method="POST"
            className="card space-y-5"
          >
            {/* FormSubmit.co hidden config fields */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://hiddencameras.tv/contact?sent=true" />
            <input type="hidden" name="_subject" value="HiddenCameras.tv Contact Form" />

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Your name"
                autoComplete="name"
                className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-brand-green transition"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-brand-green transition"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="How can we help you?"
                className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-brand-green transition resize-y"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-3 text-sm font-bold"
            >
              Send Message
            </button>

            <p className="text-gray-600 text-xs text-center">
              We typically respond within 1-2 business days.
            </p>
          </form>
        )}
      </div>
    </Layout>
  );
}
