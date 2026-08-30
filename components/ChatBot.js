"use client";

import { useState, useRef, useEffect } from "react";

function stripThinking(text) {
  return text.replace(/<think>[\s\S]*?<\/think>/g, "").replace(/<think>[\s\S]*$/g, "").trim();
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const q = input.trim();
    if (!q || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: q }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      const d = await res.json();
      const clean = stripThinking(d.answer || "");
      setMessages((m) => [...m, { role: "bot", text: clean || "No response." }]);
    } catch {
      setMessages((m) => [...m, { role: "bot", text: "Connection error. Try again." }]);
    }
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed", bottom: "20px", right: "20px", zIndex: 1000,
          width: "56px", height: "56px", borderRadius: "50%",
          background: "#00d4ff", color: "#000", border: "none", cursor: "pointer",
          fontSize: "24px", fontWeight: "bold", boxShadow: "0 4px 20px rgba(0,212,255,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
        aria-label="Chat with us"
      >
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <div style={{
          position: "fixed", bottom: "90px", right: "20px", zIndex: 1000,
          width: "360px", maxWidth: "calc(100vw - 40px)", height: "480px",
          background: "#111", border: "1px solid #333", borderRadius: "16px",
          display: "flex", flexDirection: "column", overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
        }}>
          <div style={{
            padding: "14px 16px", background: "#0a0a0a", borderBottom: "1px solid #222",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div>
              <div style={{ fontWeight: 900, fontSize: "14px", color: "#fff" }}>HiddenCameras.tv</div>
              <div style={{ fontSize: "11px", color: "#888" }}>Ask about cameras &amp; security</div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {messages.length === 0 && (
              <div style={{ color: "#666", fontSize: "13px", textAlign: "center", marginTop: "60px" }}>
                Ask me about hidden cameras, security systems, Ring vs Arlo, nanny cams, or privacy laws...
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "85%", padding: "10px 14px", borderRadius: "12px", fontSize: "13px", lineHeight: "1.5",
                  background: m.role === "user" ? "rgba(0,212,255,0.15)" : "#1a1a1a",
                  color: m.role === "user" ? "#fff" : "#ddd",
                  borderBottomRightRadius: m.role === "user" ? "4px" : "12px",
                  borderBottomLeftRadius: m.role === "user" ? "12px" : "4px",
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ background: "#1a1a1a", color: "#888", padding: "10px 14px", borderRadius: "12px", fontSize: "13px", animation: "pulse 1.5s infinite" }}>
                  Thinking...
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); send(); }} style={{ borderTop: "1px solid #222", padding: "12px", display: "flex", gap: "8px" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about cameras..."
              style={{ flex: 1, padding: "10px 12px", borderRadius: "8px", border: "1px solid #333", background: "#1a1a1a", color: "#fff", fontSize: "13px", outline: "none" }}
            />
            <button type="submit" disabled={loading || !input.trim()} style={{
              padding: "10px 16px", borderRadius: "8px", border: "none",
              background: "#00d4ff", color: "#000", fontWeight: 900, fontSize: "13px",
              cursor: "pointer", opacity: loading || !input.trim() ? 0.4 : 1,
            }}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
