import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import CameraIcon from "../components/CameraIcon";
import { supabase } from "../lib/supabase";

const CAM_TYPES = [
  { value: "home",     label: "Home Security", icon: "🏠" },
  { value: "baby",     label: "Baby Monitor",  icon: "👶" },
  { value: "nanny",    label: "Nanny Cam",     icon: "👀" },
  { value: "pet",      label: "Pet Cam",       icon: "🐾" },
  { value: "business", label: "Business",      icon: "🏢" },
  { value: "other",    label: "Other",         icon: "📷" },
];

function extractYouTubeId(url) {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

function CamEmbed({ url }) {
  const ytId = extractYouTubeId(url);
  if (ytId) return (
    <iframe
      src={`https://www.youtube.com/embed/${ytId}?autoplay=0`}
      className="w-full aspect-video rounded-lg border border-brand-border"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
  return (
    <iframe src={url} className="w-full aspect-video rounded-lg border border-brand-border" allowFullScreen />
  );
}

export default function MyCams() {
  const [user, setUser]           = useState(null);
  const [cams, setCams]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [saving, setSaving]       = useState(false);
  const [saveError, setSaveError] = useState("");
  const [authMode, setAuthMode]   = useState("signin");
  const [authForm, setAuthForm]   = useState({ email: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [watching, setWatching]   = useState(null);
  const [form, setForm] = useState({ name: "", description: "", stream_url: "", cam_type: "home", is_public: false });

  // ── Auth state ────────────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user || null;
      setUser(u);
      if (u) loadCams(u.id);
      else setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      const u = session?.user || null;
      setUser(u);
      if (u) loadCams(u.id);
      else { setCams([]); setLoading(false); }
    });
    return () => subscription.unsubscribe();
  }, []);

  // ── Load cams ─────────────────────────────────────────────────────────────
  async function loadCams(uid) {
    setLoading(true);
    const { data, error } = await supabase
      .from("private_cams")
      .select("*")
      .eq("user_id", uid)
      .order("created_at", { ascending: false });
    if (!error) setCams(data || []);
    setLoading(false);
  }

  // ── Auth submit ───────────────────────────────────────────────────────────
  async function handleAuth(e) {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    try {
      if (authMode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email: authForm.email,
          password: authForm.password,
        });
        if (error) setAuthError(error.message);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: authForm.email,
          password: authForm.password,
        });
        if (error) {
          setAuthError(error.message);
        } else if (data?.user && !data.session) {
          setAuthError("✅ Account created! Check your email inbox to confirm, then sign in.");
        }
      }
    } catch (err) {
      setAuthError("Connection error — please try again.");
    } finally {
      setAuthLoading(false);
    }
  }

  // ── Save cam ──────────────────────────────────────────────────────────────
  async function handleSaveCam(e) {
    e.preventDefault();
    setSaving(true);
    setSaveError("");
    const { error } = await supabase.from("private_cams").insert({
      ...form,
      user_id: user.id,
    });
    if (error) {
      setSaveError(error.message);
    } else {
      setForm({ name: "", description: "", stream_url: "", cam_type: "home", is_public: false });
      setShowForm(false);
      loadCams(user.id);
    }
    setSaving(false);
  }

  async function togglePublic(cam) {
    await supabase.from("private_cams").update({ is_public: !cam.is_public }).eq("id", cam.id);
    loadCams(user.id);
  }

  async function deleteCam(id) {
    if (!confirm("Delete this feed?")) return;
    await supabase.from("private_cams").delete().eq("id", id);
    loadCams(user.id);
  }

  // ── NOT LOGGED IN ─────────────────────────────────────────────────────────
  if (!user) return (
    <Layout title="Submit Your Feed — HiddenCameras.tv" canonical="https://hiddencameras.tv/my-cams">
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-green/10 border border-brand-green/30 flex items-center justify-center mx-auto mb-4">
            <CameraIcon size={36} />
          </div>
          <h1 className="text-2xl font-extrabold text-white mb-2">Submit Your Live Feed</h1>
          <p className="text-brand-muted text-sm leading-relaxed">
            Create a free account to add your camera feeds. Keep them private for your own viewing,
            or make them public so the world can watch.
          </p>
        </div>

        {/* Feature pills */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {[["🔒","Private feeds only you see"],["🌍","Public feeds in /live directory"],["📱","Watch from any device"],["🆓","Always free"]].map(([icon,label])=>(
            <div key={label} className="card py-3 text-center">
              <div className="text-xl mb-1">{icon}</div>
              <div className="text-xs text-brand-muted">{label}</div>
            </div>
          ))}
        </div>

        {/* Auth form */}
        <div className="card">
          <div className="flex gap-1 p-1 bg-brand-bg rounded-xl mb-6">
            {["signin","signup"].map(mode => (
              <button key={mode} onClick={() => { setAuthMode(mode); setAuthError(""); }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${authMode === mode ? "bg-brand-green text-black" : "text-brand-muted hover:text-white"}`}>
                {mode === "signin" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input type="email" required placeholder="you@example.com"
                value={authForm.email}
                onChange={e => setAuthForm(f => ({ ...f, email: e.target.value }))}
                className="input" />
            </div>
            <div>
              <label className="label">Password {authMode === "signup" && <span className="text-brand-muted font-normal">(min 6 chars)</span>}</label>
              <input type="password" required minLength={6} placeholder="••••••••"
                value={authForm.password}
                onChange={e => setAuthForm(f => ({ ...f, password: e.target.value }))}
                className="input" />
            </div>

            {authError && (
              <p className={`text-xs px-3 py-2 rounded-lg ${authError.startsWith("✅") ? "bg-brand-green/10 text-brand-green" : "bg-red-500/10 text-red-400"}`}>
                {authError}
              </p>
            )}

            <button type="submit" disabled={authLoading} className="btn-primary w-full py-3">
              {authLoading ? "Please wait..." : authMode === "signin" ? "Sign In →" : "Create Free Account →"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );

  // ── LOGGED IN ─────────────────────────────────────────────────────────────
  return (
    <Layout title="My Feeds — HiddenCameras.tv" canonical="https://hiddencameras.tv/my-cams">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-white">My Feeds</h1>
            <p className="text-brand-muted text-sm mt-0.5">{user.email}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { setShowForm(!showForm); setSaveError(""); }} className="btn-primary">
              {showForm ? "Cancel" : "+ Add Feed"}
            </button>
            <button onClick={() => supabase.auth.signOut()} className="btn-ghost text-xs">Sign Out</button>
          </div>
        </div>

        {/* Add feed form */}
        {showForm && (
          <div className="card border-brand-green/20 mb-8">
            <h3 className="font-bold text-white mb-5">Add New Feed</h3>
            <form onSubmit={handleSaveCam} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Feed Name *</label>
                  <input required placeholder="e.g. Front Porch, Baby Room"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="input" />
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
                <input required type="url" placeholder="https://youtube.com/watch?v=... or https://..."
                  value={form.stream_url}
                  onChange={e => setForm(f => ({ ...f, stream_url: e.target.value }))}
                  className="input" />
                <p className="text-brand-muted text-xs mt-1">YouTube live streams, YouTube videos, or any public stream URL.</p>
              </div>
              <div>
                <label className="label">Description <span className="text-brand-muted font-normal">(optional)</span></label>
                <input placeholder="e.g. Watching the front door"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="input" />
              </div>

              {/* Public toggle */}
              <div className="flex items-center gap-3 bg-brand-bg rounded-xl px-4 py-3">
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input type="checkbox" checked={form.is_public}
                    onChange={e => setForm(f => ({ ...f, is_public: e.target.checked }))}
                    className="sr-only peer" />
                  <div className="w-10 h-6 bg-brand-border peer-checked:bg-brand-green rounded-full transition-colors" />
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
                </label>
                <div>
                  <p className="text-white text-sm font-semibold">{form.is_public ? "🌍 Public" : "🔒 Private"}</p>
                  <p className="text-brand-muted text-xs">{form.is_public ? "Anyone can watch this on the /live page" : "Only you can see this feed"}</p>
                </div>
              </div>

              {saveError && <p className="bg-red-500/10 text-red-400 text-xs px-3 py-2 rounded-lg">{saveError}</p>}

              <div className="flex gap-3">
                <button type="submit" disabled={saving} className="btn-primary">{saving ? "Saving..." : "Save Feed"}</button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Cam watching modal */}
        {watching && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setWatching(null)}>
            <div className="w-full max-w-3xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-white font-bold">{watching.name}</p>
                <button onClick={() => setWatching(null)} className="text-brand-muted hover:text-white text-2xl leading-none">×</button>
              </div>
              <CamEmbed url={watching.stream_url} />
            </div>
          </div>
        )}

        {/* Feed list */}
        {loading ? (
          <div className="space-y-4">
            {[1,2].map(i => <div key={i} className="card shimmer h-24" />)}
          </div>
        ) : cams.length === 0 ? (
          <div className="card text-center py-16">
            <div className="text-5xl mb-4">📡</div>
            <p className="text-white font-bold mb-2">No feeds yet</p>
            <p className="text-brand-muted text-sm mb-5">Add your first camera feed above. Private or public — your choice.</p>
            <button onClick={() => setShowForm(true)} className="btn-primary">+ Add Your First Feed</button>
          </div>
        ) : (
          <div className="space-y-4">
            {cams.map(cam => (
              <div key={cam.id} className="card flex flex-col sm:flex-row gap-4">
                {/* Thumbnail / play button */}
                <button onClick={() => setWatching(cam)}
                  className="shrink-0 w-full sm:w-40 h-28 rounded-xl bg-brand-bg border border-brand-border flex flex-col items-center justify-center gap-2 hover:border-brand-green/40 transition group">
                  <div className="text-3xl group-hover:scale-110 transition">
                    {CAM_TYPES.find(t => t.value === cam.cam_type)?.icon || "📷"}
                  </div>
                  <span className="text-brand-green text-xs font-bold">▶ Watch</span>
                </button>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-white font-bold">{cam.name}</h3>
                    <span className={`pill text-[10px] ${cam.is_public ? "bg-brand-green/10 text-brand-green" : "bg-brand-border text-brand-muted"}`}>
                      {cam.is_public ? "🌍 Public" : "🔒 Private"}
                    </span>
                  </div>
                  {cam.description && <p className="text-brand-muted text-xs mb-2">{cam.description}</p>}
                  <p className="text-brand-muted text-xs truncate mb-3">{cam.stream_url}</p>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button onClick={() => setWatching(cam)} className="btn-primary text-xs py-1.5 px-3">Watch</button>
                    <button onClick={() => togglePublic(cam)}
                      className="btn-outline text-xs py-1.5 px-3">
                      {cam.is_public ? "Make Private" : "Make Public"}
                    </button>
                    <button onClick={() => deleteCam(cam.id)} className="text-red-500 hover:text-red-400 text-xs px-2 py-1.5 transition">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats bar */}
        {cams.length > 0 && (
          <div className="mt-6 flex items-center gap-4 text-xs text-brand-muted">
            <span>{cams.length} feed{cams.length !== 1 ? "s" : ""} total</span>
            <span>·</span>
            <span>{cams.filter(c => c.is_public).length} public</span>
            <span>·</span>
            <span>{cams.filter(c => !c.is_public).length} private</span>
            {cams.filter(c => c.is_public).length > 0 && (
              <><span>·</span><Link href="/live" className="text-brand-green hover:underline">View on /live →</Link></>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
