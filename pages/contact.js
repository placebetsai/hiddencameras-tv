import Layout from "../components/Layout";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Open mailto as fallback — no backend required
    const subject = encodeURIComponent(`HiddenCameras.tv Inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:info@hiddencameras.tv?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <Layout
      title="Contact Us — HiddenCameras.tv"
      description="Get in touch with the HiddenCameras.tv editorial team. Questions, tips, corrections, or partnership inquiries welcome."
      canonical="https://hiddencameras.tv/contact"
    >
      <div className="max-w-xl mx-auto py-12">
        <h1 className="text-3xl font-black text-white mb-4 text-center">Contact Us</h1>
        <p className="text-gray-400 mb-8 text-center">
          Have a question, tip, correction, or partnership inquiry? We would love to hear from you. Fill out the form below or email us directly at{" "}
          <a href="mailto:info@hiddencameras.tv" className="text-brand-green hover:underline">
            info@hiddencameras.tv
          </a>.
        </p>

        {submitted ? (
          <div className="card text-center py-10">
            <p className="text-brand-green text-lg font-bold mb-2">Thank you for reaching out!</p>
            <p className="text-gray-400 text-sm">
              Your email client should have opened with your message. If it did not, please email us directly at{" "}
              <a href="mailto:info@hiddencameras.tv" className="text-brand-green hover:underline">info@hiddencameras.tv</a>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
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
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
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
                value={form.message}
                onChange={handleChange}
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
