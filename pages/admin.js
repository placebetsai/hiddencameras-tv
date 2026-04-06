import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { supabase } from "../lib/supabase";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [cams, setCams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
      if (data?.user) loadCams();
    });
    supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
      if (session?.user) loadCams();
    });
  }, []);

  useEffect(() => {
    if (user) loadCams();
  }, [filter]);

  async function loadCams() {
    setLoading(true);
    const q = supabase.from("submitted_cams").select("*").order("created_at", { ascending: false });
    if (filter !== "all") q.eq("status", filter);
    const { data } = await q;
    setCams(data || []);
    setLoading(false);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
  }

  async function updateStatus(id, status) {
    await supabase.from("submitted_cams").update({ status, reviewed_at: new Date().toISOString() }).eq("id", id);
    setCams(prev => prev.filter(c => c.id !== id));
  }

  async function deleteCam(id) {
    await supabase.from("submitted_cams").delete().eq("id", id);
    setCams(prev => prev.filter(c => c.id !== id));
  }

  async function updateField(id, field, value) {
    await supabase.from("submitted_cams").update({ [field]: value }).eq("id", id);
    setCams(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  }

  if (!user) {
    return (
      <Layout title="Admin — HiddenCameras.tv" canonical="https://hiddencameras.tv/admin">
        <div className="max-w-sm mx-auto px-4 py-20">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="card space-y-4">
            <div>
              <label className="label">Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="input" placeholder="admin@hiddencameras.tv" />
            </div>
            <div>
              <label className="label">Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="input" placeholder="••••••••" />
            </div>
            {authError && <p className="text-red-400 text-sm">{authError}</p>}
            <button type="submit" className="btn-primary w-full py-3">Sign In</button>
          </form>
        </div>
      </Layout>
    );
  }

  const pending = cams.filter(c => c.status === "pending").length;

  return (
    <Layout title="Admin — HiddenCameras.tv" canonical="https://hiddencameras.tv/admin">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Cam Moderation Queue</h1>
            <p className="text-brand-muted text-sm">{pending} pending · {user.email}</p>
          </div>
          <button onClick={() => supabase.auth.signOut()} className="btn-ghost text-xs">Sign Out</button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {["pending", "approved", "rejected", "all"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition capitalize ${filter === f ? "bg-brand-green text-black border-brand-green" : "border-brand-border text-gray-400 hover:border-brand-green hover:text-white"}`}>
              {f}
            </button>
          ))}
          <button onClick={loadCams} className="text-xs font-semibold px-3 py-1.5 rounded-full border border-brand-border text-gray-400 hover:text-white transition ml-auto">
            ↻ Refresh
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="card shimmer h-32" />)}</div>
        ) : cams.length === 0 ? (
          <div className="card text-center py-12 text-gray-500">No {filter} submissions.</div>
        ) : (
          <div className="space-y-3">
            {cams.map(cam => (
              <div key={cam.id} className={`card border ${cam.status === "approved" ? "border-brand-green/30" : cam.status === "rejected" ? "border-red-900/30" : "border-brand-border"}`}>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-white font-bold">{cam.flag} {cam.label}</span>
                      <span className={`pill text-xs ${cam.status === "approved" ? "pill-green" : cam.status === "rejected" ? "bg-red-900/30 text-red-400 border border-red-800" : "pill-gray"}`}>
                        {cam.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{cam.city}{cam.country ? `, ${cam.country}` : ""} · {cam.continent} · {cam.cam_type}</p>
                    <a href={cam.stream_url} target="_blank" rel="noopener noreferrer"
                      className="text-brand-green text-xs hover:underline break-all">{cam.stream_url}</a>
                    {cam.yt_id && <span className="text-gray-500 text-xs ml-2">· ytId: {cam.yt_id}</span>}
                    {cam.submitter_email && <p className="text-gray-600 text-xs mt-1">Submitted by: {cam.submitter_email}</p>}
                    <p className="text-gray-700 text-xs mt-1">{new Date(cam.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                  </div>

                  {/* Quick edit fields */}
                  <div className="flex flex-col gap-2 text-xs shrink-0">
                    <input defaultValue={cam.yt_id || ""} onBlur={e => updateField(cam.id, "yt_id", e.target.value)}
                      placeholder="YouTube ID (optional)" className="input text-xs py-1 px-2 w-48" />
                    <input defaultValue={cam.flag || "🌍"} onBlur={e => updateField(cam.id, "flag", e.target.value)}
                      placeholder="Flag emoji" className="input text-xs py-1 px-2 w-48" maxLength={4} />
                    <select defaultValue={cam.continent} onBlur={e => updateField(cam.id, "continent", e.target.value)} className="input text-xs py-1 px-2 w-48">
                      {["North America","Europe","Asia","Middle East","South America","Africa","Oceania","Other"].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4 pt-3 border-t border-brand-border">
                  {cam.status !== "approved" && (
                    <button onClick={() => updateStatus(cam.id, "approved")}
                      className="btn-primary text-xs py-1.5 px-4">✓ Approve</button>
                  )}
                  {cam.status !== "rejected" && (
                    <button onClick={() => updateStatus(cam.id, "rejected")}
                      className="btn-outline text-xs py-1.5 px-4">✗ Reject</button>
                  )}
                  {cam.status === "pending" && (
                    <a href={cam.stream_url} target="_blank" rel="noopener noreferrer"
                      className="btn-ghost text-xs py-1.5 px-3">▶ Preview</a>
                  )}
                  <button onClick={() => deleteCam(cam.id)} className="btn-ghost text-xs py-1.5 px-3 text-red-500 hover:text-red-400 ml-auto">🗑 Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
