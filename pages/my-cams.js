import { useState } from "react";
import Layout from "../components/Layout";
import CameraIcon from "../components/CameraIcon";

const FEATURES = [
  { icon: "🏠", label: "Home Security", desc: "Monitor your property from anywhere" },
  { icon: "👶", label: "Baby Monitor", desc: "Keep an eye on the nursery" },
  { icon: "👀", label: "Nanny Cam", desc: "Secure, private access" },
  { icon: "🐾", label: "Pet Cam", desc: "Watch your pets while you're out" },
];

export default function MyCams() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const form = new FormData();
      form.append("email", email);
      form.append("_subject", "My Cams Beta Waitlist — HiddenCameras.tv");
      const res = await fetch("https://formsubmit.co/ajax/info@hiddencameras.tv", {
        method: "POST",
        body: form,
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Layout
      title="My Cams — Private Camera Dashboard | HiddenCameras.tv"
      description="Manage all your home, baby, nanny, and pet cameras in one private dashboard. Launching soon — join the waitlist."
      canonical="https://hiddencameras.tv/my-cams"
    >
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-2xl bg-brand-green/10 border border-brand-green/30 flex items-center justify-center mx-auto mb-6">
          <CameraIcon size={40} />
        </div>

        <div className="pill bg-brand-green/10 text-brand-green mb-4 inline-block">Coming Soon</div>
        <h1 className="text-3xl font-black text-white mb-3">My Private Cam Dashboard</h1>
        <p className="text-gray-400 text-base mb-10 max-w-lg mx-auto">
          One secure place to manage all your home, baby, nanny, and pet cameras. Private by default — share only what you choose.
        </p>

        {/* Feature grid */}
        <div className="grid grid-cols-2 gap-3 mb-10">
          {FEATURES.map(f => (
            <div key={f.label} className="card text-left">
              <div className="text-2xl mb-2">{f.icon}</div>
              <p className="text-white font-semibold text-sm">{f.label}</p>
              <p className="text-gray-500 text-xs mt-0.5">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Waitlist */}
        {status === "sent" ? (
          <div className="card border-brand-green/40 py-10">
            <p className="text-brand-green text-lg font-bold mb-1">You're on the list!</p>
            <p className="text-gray-400 text-sm">We'll email you when My Cams launches. Thanks for your interest.</p>
          </div>
        ) : (
          <div className="card">
            <p className="text-white font-bold mb-1">Get early access</p>
            <p className="text-gray-500 text-sm mb-5">Be first to know when we launch. No spam.</p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 bg-brand-bg border border-brand-border rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-green transition text-sm"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary px-6 disabled:opacity-50 whitespace-nowrap"
              >
                {status === "sending" ? "..." : "Notify Me"}
              </button>
            </form>
            {status === "error" && (
              <p className="text-red-400 text-xs mt-2">Something went wrong. Email us at info@hiddencameras.tv</p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
