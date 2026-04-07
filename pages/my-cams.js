import { useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { supabase } from "../lib/supabase";

const CONTINENTS = ["North America", "South America", "Europe", "Asia", "Africa", "Oceania", "Middle East", "Other"];
const CAM_TYPES = ["Home", "Baby Monitor", "Nanny Cam", "Pet Cam", "Business", "City", "Nature", "Other"];

function extractYouTubeId(url) {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : "";
}

export default function MyCams() {
  const [step, setStep] = useState("form"); // form | success | error
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    label: "",
    city: "",
    country: "",
    continent: "North America",
    stream_url: "",
    cam_type: "Home",
    flag: "🌍",
    submitter_email: "",
  });

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");
    try {
      const yt_id = extractYouTubeId(form.stream_url);
      const { error } = await supabase.from("submitted_cams").insert({
        label: form.label,
        city: form.city,
        country: form.country,
        continent: form.continent,
        stream_url: form.stream_url,
        cam_type: form.cam_type,
        flag: form.flag,
        submitter_email: form.submitter_email,
        yt_id,
        status: "pending",
      });
      if (error) throw new Error(error.message);
      setStep("success");
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setStep("error");
    } finally {
      setSaving(false);
    }
  }

  if (step === "success") return (
    <Layout title="Feed Submitted — HiddenCameras.tv" canonical="https://hiddencameras.tv/my-cams">
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-extrabold text-white mb-3">Feed Submitted!</h1>
        <p className="text-brand-muted mb-6">We&apos;ll review your camera feed and add it to the live directory within 24 hours. Thanks for contributing.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={() => { setStep("form"); setForm({ label:"",city:"",country:"",continent:"North America",stream_url:"",cam_type:"Home",flag:"🌍",submitter_email:"" }); }}
            className="btn-outline">Submit Another</button>
          <Link href="/live" className="btn-primary">Watch Live Cams →</Link>
        </div>
      </div>
    </Layout>
  );

  return (
    <Layout title="Submit Your Feed — HiddenCameras.tv" canonical="https://hiddencameras.tv/my-cams"
      description="Submit your live camera feed to HiddenCameras.tv. Home security, pet cams, baby monitors, city cams — any live stream welcome.">
      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="pill bg-brand-green/10 text-brand-green mb-3 inline-block">FREE</div>
          <h1 className="text-3xl font-extrabold text-white mb-3">Submit Your Live Feed</h1>
          <p className="text-brand-muted">Have a camera streaming live? Share it with the world. We accept home cams, pet cams, city views, nature feeds, and more.</p>
        </div>

        {/* What we accept */}
        <div className="grid grid-cols-3 gap-3 mb-8 text-center">
          {[["🏠","Home Cam"],["👶","Baby Monitor"],["🐾","Pet Cam"],["👀","Nanny Cam"],["🏢","Business"],["🌿","Nature"]].map(([icon,label])=>(
            <div key={label} className="card py-3">
              <div className="text-xl mb-1">{icon}</div>
              <div className="text-xs text-brand-muted">{label}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="card border-brand-green/20">
          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">Camera Label *</label>
                <input required placeholder="e.g. Times Square, Front Porch, Baby Room"
                  value={form.label} onChange={e => set("label", e.target.value)} className="input" />
              </div>
              <div>
                <label className="label">Camera Type *</label>
                <select required value={form.cam_type} onChange={e => set("cam_type", e.target.value)} className="input">
                  {CAM_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="label">Stream URL * <span className="text-brand-muted font-normal">(YouTube, direct stream, or embed URL)</span></label>
              <input required type="url" placeholder="https://youtube.com/watch?v=... or https://..."
                value={form.stream_url} onChange={e => set("stream_url", e.target.value)} className="input" />
              <p className="text-brand-muted text-xs mt-1">YouTube live streams and YouTube videos both work.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="label">City</label>
                <input placeholder="New York" value={form.city} onChange={e => set("city", e.target.value)} className="input" />
              </div>
              <div>
                <label className="label">Country</label>
                <input placeholder="USA" value={form.country} onChange={e => set("country", e.target.value)} className="input" />
              </div>
              <div>
                <label className="label">Continent</label>
                <select value={form.continent} onChange={e => set("continent", e.target.value)} className="input">
                  {CONTINENTS.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">Flag Emoji</label>
                <input placeholder="🇺🇸" value={form.flag} onChange={e => set("flag", e.target.value)} className="input" maxLength={4} />
              </div>
              <div>
                <label className="label">Your Email <span className="text-brand-muted font-normal">(optional — for status updates)</span></label>
                <input type="email" placeholder="you@example.com"
                  value={form.submitter_email} onChange={e => set("submitter_email", e.target.value)} className="input" />
              </div>
            </div>

            {step === "error" && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                {errorMsg}
              </div>
            )}

            <button type="submit" disabled={saving} className="btn-primary w-full py-3 text-base">
              {saving ? "Submitting..." : "Submit Your Feed →"}
            </button>

            <p className="text-center text-brand-muted text-xs">
              Free forever. We review all submissions within 24 hours. No account required.
            </p>
          </form>
        </div>

        {/* FAQ */}
        <div className="mt-8 space-y-4">
          {[
            ["What streams do you accept?", "Any publicly accessible live stream. YouTube Live, direct RTSP/HLS URLs, or embed-ready streams. We don't accept pre-recorded videos."],
            ["How long does review take?", "Usually under 24 hours. We check that the stream is live, legal, and appropriate before listing."],
            ["Can I remove my feed later?", "Yes — email info@hiddencameras.tv and we'll remove it promptly."],
            ["Is my camera public?", "Only if you want it to be. Private feeds (home security, baby monitors) can be submitted without public listing — we keep them in your private collection."],
          ].map(([q,a]) => (
            <div key={q} className="card">
              <p className="text-white font-semibold text-sm mb-1">{q}</p>
              <p className="text-brand-muted text-xs leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
