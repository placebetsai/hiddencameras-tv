export const runtime = "edge";

const GROQ_KEY = process.env.GROQ_API_KEY || "";

const SYSTEM = `You are HiddenCameras.tv — an expert on hidden cameras, security cameras, surveillance systems, and privacy. You know every brand (Ring, Arlo, Blink, Wyze, Nest, Eufy, Reolink), every type (nanny cams, dash cams, doorbell cameras, spy cameras, outdoor/indoor security), and the laws around surveillance. You help users pick the right camera, detect hidden cameras, understand privacy laws, and compare products. Be helpful, specific, and mention prices/features when relevant. Always recommend where to buy (Amazon links when possible).`;

function stripThinking(text) {
  return text.replace(/<think>[\s\S]*?<\/think>/g, "").replace(/<think>[\s\S]*$/g, "").trim();
}

export default async function handler(req) {
  try {
    const body = await req.json();
    const query = typeof body?.query === "string" ? body.query.trim() : "";
    const history = (Array.isArray(body?.messages) ? body.messages : Array.isArray(body?.history) ? body.history : [])
      .slice(-8)
      .map((turn) => {
        const role = turn?.role === "assistant" || turn?.role === "bot" ? "assistant" : "user";
        const content = String(turn?.content || turn?.text || "").trim();
        return content ? { role, content } : null;
      })
      .filter(Boolean);
    if (!query) {
      return new Response(JSON.stringify({ error: "Missing query" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: SYSTEM + " Use the conversation so far. Follow-up questions refer to the camera or law you just discussed." },
          ...history,
          { role: "user", content: query },
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
      signal: AbortSignal.timeout(12000),
    });

    if (!res.ok) {
      console.error("Groq error:", res.status);
      return new Response(JSON.stringify({ answer: "Sorry, I'm having trouble right now. Try again in a moment." }), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    const d = await res.json();
    const raw = d.choices?.[0]?.message?.content || "";
    const clean = stripThinking(raw);
    return new Response(JSON.stringify({ answer: clean || "No response." }), { headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("Chatbot error:", err);
    return new Response(JSON.stringify({ answer: "Connection error. Try again." }), { status: 200, headers: { "Content-Type": "application/json" } });
  }
}
