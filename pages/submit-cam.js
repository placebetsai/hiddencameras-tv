import { useState } from "react";
import Layout from "../components/Layout";
import CameraIcon from "../components/CameraIcon";
import { supabase } from "../lib/supabase";

const CONTINENTS = ["North America", "Europe", "Asia", "Middle East", "South America", "Africa", "Oceania", "Other"];
const CAM_TYPES = ["City", "Landmark", "Beach", "Nature", "Traffic", "Wildlife", "Other"];

function extractYouTubeId(url) {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : "";
}

export default function SubmitCam() {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({
    label: "", city: "", country: "", continent: "North America",
    stream_url: "", cam_type: "City", submitter_email: "", flag: "",
  });

  function set(field) {
    return e => setForm(f => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const yt_id = extractYouTubeId(form.stream_url);

    const { error } = await supabase.from("submitted_cams").insert({
      label: form.label.trim(),
      city: form.city.trim(),
      country: form.country.trim(),
      continent: form.continent,
      stream_url: form.stream_url.trim(),
      cam_type: form.cam_type,
      submitter_email: form.submitter_email.trim(),
      yt_id,
      flag: form.flag.trim() || "🌍",
      status: "pending",
    });

    setStatus(error ? "error" : "sent");
  }

  return (
    <Layout
      title="Submit a Live Public Cam — HiddenCameras.tv"
      description="Know a great public live webcam? Submit it to our global directory."
      canonical="https://hiddencameras.tv/submit-cam"
    >
      <div className="max-w-xl mx-auto px-4 py-8">
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
          <p><strong className="text-white">Guidelines:</strong> Must be a publicly accessible live stream. YouTube Live, Earthcam, or direct stream URLs accepted. No private, paid, or adult content.</p>
        </div>

        {status === "sent" ? (
          <div className="card border-brand-green/50 text-center py-10">
            <div className="text-4xl mb-3">✅</div>
            <p className="text-brand-green font-bold text-lg mb-1">Camera submitted!</p>
            <p className="text-gray-400 text-sm">We&apos;ll review and add it to the live directory within 48 hours.</p>
            <button onClick={() => { setStatus("idle"); setForm({ label: "", city: "", country: "", continent: "North America", stream_url: "", cam_type: "City", submitter_email: "", flag: "" }); }}
              className="btn-outline mt-6 text-sm">Submit Another →</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="label">Camera Name / Location Description <span className="text-red-500">*</span></label>
                <input required value={form.label} onChange={set("label")} placeholder="e.g. Shibuya Crossing" className="input" />
              </div>
              <div>
                <label className="label">City <span className="text-red-500">*</span></label>
                <input required value={form.city} onChange={set("city")} placeholder="e.g. Tokyo" className="input" />
              </div>
              <div>
                <label className="label">Country</label>
                <input value={form.country} onChange={set("country")} placeholder="e.g. Japan" className="input" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Continent</label>
                <select value={form.continent} onChange={set("continent")} className="input">
                  {CONTINENTS.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Camera Type</label>
                <select value={form.cam_type} onChange={set("cam_type")} className="input">
                  {CAM_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="label">Stream URL <span className="text-red-500">*</span></label>
              <input required type="url" value={form.stream_url} onChange={set("stream_url")}
                placeholder="https://youtube.com/watch?v=... or https://earthcam.com/..." className="input" />
              <p className="text-gray-600 text-xs mt-1">YouTube, Earthcam, or any public stream URL</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Country Flag Emoji</label>
                <input value={form.flag} onChange={set("flag")} placeholder="🇯🇵" className="input" maxLength={4} />
              </div>
              <div>
                <label className="label">Your Email (optional)</label>
                <input type="email" value={form.submitter_email} onChange={set("submitter_email")} placeholder="you@example.com" className="input" />
              </div>
            </div>

            {status === "error" && (
              <p className="text-red-400 text-sm">Something went wrong. Try again or email <a href="mailto:info@hiddencameras.tv" className="underline">info@hiddencameras.tv</a></p>
            )}

            <button type="submit" disabled={status === "sending"} className="btn-primary w-full py-3 disabled:opacity-50">
              {status === "sending" ? "Submitting..." : "Submit Camera →"}
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
}
