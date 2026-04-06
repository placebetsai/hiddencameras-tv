import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import CameraIcon from "../components/CameraIcon";
import { supabase } from "../lib/supabase";

const CAM_TYPES = [
  { value: "home", label: "Home Security", icon: "🏠" },
  { value: "baby", label: "Baby Monitor", icon: "👶" },
  { value: "nanny", label: "Nanny Cam", icon: "👀" },
  { value: "pet", label: "Pet Cam", icon: "🐾" },
  { value: "business", label: "Business", icon: "🏢" },
  { value: "other", label: "Other", icon: "📷" },
];

function CamTypeIcon({ type }) {
  return CAM_TYPES.find(t => t.value === type)?.icon || "📷";
}

export default function MyCams() {
  const [user, setUser] = useState(null);
  const [cams, setCams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", stream_url: "", cam_type: "home", is_public: false });
  const [saving, setSaving] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const [authForm, setAuthForm] = useState({ email: "", password: "" });
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user || null));
    supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
      if (session?.user) loadCams(session.user.id);
      else { setCams([]); setLoading(false); }
    });
  }, []);

  useEffect(() => {
    if (user) loadCams(user.id);
    else setLoading(false);
  }, [user]);

  async function loadCams(uid) {
    setLoading(true);
    const { data } = await supabase.from("private_cams").select("*").eq("user_id", uid).order("created_at", { ascending: false });
    setCams(data || []);
    setLoading(false);
  }

  async function handleAuth(e) {
    e.preventDefault();
    setAuthError("");
    const fn = authMode === "signin" ? supabase.auth.signInWithPassword : supabase.auth.signUp;
    const { error } = await fn({ email: authForm.email, password: authForm.password });
    if (error) setAuthError(error.message);
  }

  async function handleSaveCam(e) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    await supabase.from("private_cams").insert({ ...form, user_id: user.id });
    setForm({ name: "", description: "", stream_url: "", cam_type: "home", is_public: false });
    setShowForm(false);
    setSaving(false);
    loadCams(user.id);
  }

  async function togglePublic(cam) {
    await supabase.from("private_cams").update({ is_public: !cam.is_public }).eq("id", cam.id);
    loadCams(user.id);
  }

  async function deleteCam(id) {
    await supabase.from("private_cams").delete().eq("id", id);
    loadCams(user.id);
  }

  if (!user) return (
    <Layout title="Share Your Feed — HiddenCameras.tv" canonical="https://hiddencameras.tv/my-cams">
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-green/10 border border-brand-green/30 flex items-center justify-center mx-auto mb-4">
            <CameraIcon size={36} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Share Your Live Feed</h1>
          <p className="text-brand-muted text-sm">Have a live stream? Add it to the global directory. Keep it private or share it with the world.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {[
            { icon: "🏠", label: "Home Security" },
            { icon: "👶", label: "Baby Monitor" },
            { icon: "👀", label: "Nanny Cam" },
            { icon: "🐾", label: "Pet Cam" },
          ].map(f => (
            <div key={f.label} className="card text-center py-3">
              <div className="text-2xl mb-1">{f.icon}</div>
              <div className="text-xs text-brand-muted">{f.label}</div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="flex gap-2 mb-6">
            <button onClick={() => setAuthMode("signin")}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${authMode === "signin" ? "bg-brand-green text-black" : "text-brand-muted hover:text-white"}`}>
              Sign In
            </button>
            <button onClick={() => setAuthMode("signup")}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${authMode === "signup" ? "bg-brand-green text-black" : "text-brand-muted hover:text-white"}`}>
              Create Account
            </button>
          </div>
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input type="email" required placeholder="you@example.com" value={authForm.email}
                onChange={e => setAuthForm(f => ({ ...f, email: e.target.value }))}
                className="input" />
            </div>
            <div>
              <label className="label">Password</label>
              <input type="password" required placeholder="••••••••" value={authForm.password}
                onChange={e => setAuthForm(f => ({ ...f, password: e.target.value }))}
                className="input" />
            </div>
            {authError && <p className="text-red-400 text-xs">{authError}</p>}
            <button type="submit" className="btn-primary w-full py-3">
              {authMode === "signin" ? "Sign In" : "Create Free Account"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );

  return (
    <Layout title="Upload Your Feed — HiddenCameras.tv" canonical="https://hiddencameras.tv/my-cams">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">My Feeds</h1>
            <p className="text-brand-muted text-sm mt-1">{user.email}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowForm(!showForm)} className="btn-primary">+ Upload Feed</button>
            <button onClick={() => supabase.auth.signOut()} className="btn-ghost text-xs">Sign Out</button>
          </div>
        </div>

        {showForm && (
          <div className="card mb-6 border-brand-green/20">
            <h3 className="font-bold text-white mb-4">Upload New Feed</h3>
            <form onSubmit={handleSaveCam} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Feed Name *</label>
                  <input required placeholder="e.g. Front Porch, Baby Room, Office" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input" />
                </div>
                <div>
                  <label className="label">Camera Type</label>
                  <select value={form.cam_type} onChange={e => setForm(f => ({ ...f, cam_type: e.target.value }))} className="input">
                    {CAM_TYPES.map(t => <option key={t.value} value={t.value}>{t.icon} {t.label}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Stream URL *</label>
                <input required type="url" placeholder="https://youtube.com/watch?v=... or rtsp://..." value={form.stream_url}
                  onChange={e => setForm(f => ({ ...f, stream_url: e.target.value }))} className="input" />
              </div>
              <div>
                <label className="label">Description (optional)</label>
                <input placeholder="e.g. Watching the front porch" value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="input" />
              </div>
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={form.is_public} onChange={e => setForm(f => ({ ...f, is_public: e.target.checked }))} className="sr-only peer" />
                  <div className="w-10 h-6 bg-brand-border peer-checked:bg-brand-green rounded-full transition-colors" />
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
                </label>
                <span className="text-sm text-brand-muted">List publicly in the live directory for others to watch</span>
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={saving} className="btn-primary">{saving ? "Saving..." : "Save Camera"}</button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="grid md:grid-cols-2 gap-4">
            {[1,2,3].map(i => <div key={i} className="card shimmer h-40" />)}
          </div>
        ) : cams.length === 0 ? (
          <div className="text-center py-16 card">
            <div className="text-5xl mb-4">📡</div>
            <p className="text-white font-bold mb-2">No feeds uploaded yet</p>
            <p className="text-brand-muted text-sm mb-5">Upload your first live feed — keep it private or share it with the world</p>
            <button onClick={() => setShowForm(true)} className="btn-primary">+ Upload Your First Feed</button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {cams.map(cam => (
              <div key={cam.id} className="card hover:border-brand-borderHover transition group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{CamTypeIcon({ type: cam.cam_type })}</span>
                    <div>
                      <p className="font-bold text-white text-sm">{cam.name}</p>
                      <p className="text-brand-muted text-xs">{CAM_TYPES.find(t => t.value === cam.cam_type)?.label}</p>
                    </div>
                  </div>
                  <span className={`pill text-xs ${cam.is_public ? "pill-green" : "pill-gray"}`}>
                    {cam.is_public ? "Public" : "Private"}
                  </span>
                </div>
                {cam.description && <p className="text-brand-muted text-xs mb-3">{cam.description}</p>}
                <div className="flex gap-2 pt-3 border-t border-brand-border">
                  <a href={cam.stream_url} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs py-1.5 px-3">▶ Watch</a>
                  <button onClick={() => togglePublic(cam)} className="btn-outline text-xs py-1.5 px-3">
                    {cam.is_public ? "Make Private" : "Make Public"}
                  </button>
                  <button onClick={() => deleteCam(cam.id)} className="btn-ghost text-xs py-1.5 px-3 text-red-500 hover:text-red-400 ml-auto">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
