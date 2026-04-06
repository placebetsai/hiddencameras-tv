import { useState } from "react";
import Layout from "../components/Layout";
import CameraIcon from "../components/CameraIcon";

export default function SubmitCam() {
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.target);
    try {
      const res = await fetch("https://formspree.io/f/xyzgpvqk", {
        method: "POST", body: data, headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) e.target.reset();
    } catch { setStatus("error"); }
  }

  return (
    <Layout
      title="Submit a Live Public Cam — HiddenCameras.tv"
      description="Know a great public live webcam? Submit it to our global directory."
      canonical="https://hiddencameras.tv/submit-cam"
    >
      <div className="max-w-xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl border border-brand-border bg-brand-card flex items-center justify-center">
            <CameraIcon size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Submit a Live Cam</h1>
            <p className="text-gray-500 text-sm">Add a public webcam to our global directory</p>
          </div>
        </div>

        <div className="card border-yellow-500/20 mb-6 text-sm text-gray-400">
          <p><strong className="text-white">Guidelines:</strong> Must be a publicly accessible live stream (not private/paid). YouTube Live, Earthcam, or direct stream links accepted. No adult content.</p>
        </div>

        {status === "sent" ? (
          <div className="card border-brand-green/50 text-center py-10">
            <div className="text-4xl mb-3">✅</div>
            <p className="text-brand-green font-bold text-lg mb-1">Camera submitted!</p>
            <p className="text-gray-400 text-sm">We&apos;ll review and add it within 48 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">City / Location <span className="text-red-500">*</span></label>
              <input name="city" required placeholder="e.g. Tokyo, Japan"
                className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-green transition text-sm" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Camera Name / Description <span className="text-red-500">*</span></label>
              <input name="label" required placeholder="e.g. Shibuya Crossing"
                className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-green transition text-sm" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Stream URL <span className="text-red-500">*</span></label>
              <input name="url" type="url" required placeholder="https://youtube.com/watch?v=... or direct stream URL"
                className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-green transition text-sm" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Type</label>
              <select name="type"
                className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-green transition text-sm">
                <option>City</option>
                <option>Landmark</option>
                <option>Beach</option>
                <option>Nature</option>
                <option>Traffic</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Your Email (optional)</label>
              <input name="email" type="email" placeholder="you@example.com"
                className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-green transition text-sm" />
            </div>
            {status === "error" && <p className="text-red-400 text-sm">Something went wrong. Try again or email info@hiddencameras.tv</p>}
            <button type="submit" disabled={status === "sending"}
              className="btn-primary w-full py-3 disabled:opacity-50">
              {status === "sending" ? "Submitting..." : "Submit Camera →"}
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
}
