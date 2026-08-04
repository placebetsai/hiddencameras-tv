import { useState } from "react";

export default function EmailCapture({ variant = "default" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("https://formsubmit.co/ajax/hiddencameras.tv@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          _subject: "Security Tips Guide Request",
          _captcha: "false",
          _next: "https://hiddencameras.tv/thank-you",
        }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (variant === "banner") {
    return (
      <section className="w-full bg-gradient-to-r from-blue-900/60 to-slate-900/80 border-y border-blue-500/20 py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-blue-400 font-bold mb-2">FREE GUIDE</p>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
            Home Security Checklist 2026
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            15-point checklist to secure your home. Camera placement, settings, and more. Free PDF — no spam.
          </p>
          {status === "success" ? (
            <div className="text-green-400 font-bold text-lg">
              ✓ Check your inbox! Your checklist is on its way.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 max-w-sm px-4 py-3 rounded-full bg-slate-800 border border-slate-600 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 rounded-full bg-blue-500 text-white font-bold hover:bg-blue-400 transition-colors disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : "Get Security Tips →"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="text-red-400 text-xs mt-2">Something went wrong. Try again.</p>
          )}
        </div>
      </section>
    );
  }

  // Default card variant
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/40 to-slate-900/80 border border-blue-500/30">
      <p className="text-xs uppercase tracking-widest text-blue-400 font-bold mb-2">FREE GUIDE</p>
      <h3 className="text-xl font-black text-white mb-1">
        Home Security Checklist 2026
      </h3>
      <p className="text-gray-400 text-sm mb-4">
        15-point checklist to secure your home. Free — takes 10 seconds.
      </p>
      {status === "success" ? (
        <div className="text-green-400 font-bold">✓ Check your inbox!</div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white font-bold text-sm hover:bg-blue-400 transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : "Get Security Tips →"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-red-400 text-xs mt-2">Something went wrong. Try again.</p>
      )}
    </div>
  );
}
