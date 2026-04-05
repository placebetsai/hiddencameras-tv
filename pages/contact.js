import { useState } from "react";
import Layout from "../components/Layout";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.target);
    try {
      const res = await fetch("https://formspree.io/f/" + process.env.NEXT_PUBLIC_FORMSPREE_ID, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <Layout
      title="Contact — HiddenCameras.tv"
      canonical="https://hiddencameras.tv/contact"
    >
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-extrabold text-white mb-2">Contact Us</h1>
        <p className="text-gray-400 mb-8">
          Questions, product tips, or partnership inquiries — reach us at{" "}
          <a href="mailto:info@hiddencameras.tv" className="text-brand-green hover:underline">
            info@hiddencameras.tv
          </a>
        </p>

        {status === "sent" ? (
          <div className="card border-brand-green/50 text-center py-10">
            <p className="text-brand-green text-lg font-bold mb-1">Message sent!</p>
            <p className="text-gray-400 text-sm">We typically reply within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input
                name="name"
                required
                placeholder="Your name"
                className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-green transition text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-green transition text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="How can we help?"
                className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-green transition text-sm resize-none"
              />
            </div>
            <input type="hidden" name="_replyto" value="info@hiddencameras.tv" />
            {status === "error" && (
              <p className="text-red-400 text-sm">Something went wrong. Email us directly at info@hiddencameras.tv</p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary w-full py-3 disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
}
