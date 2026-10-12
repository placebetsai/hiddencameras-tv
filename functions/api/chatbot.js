// Chat endpoint for the on-site widget (components/ChatBot.js).
//
// This lives in functions/ (Cloudflare Pages Functions), NOT pages/api/.
// The site is a static export (next.config.js: output: "export"), so
// pages/api/* is discarded by `next build` and can never serve a request —
// that is exactly why /api/chatbot answered 404/405 on production for months.
// Pages Functions are compiled by `wrangler pages deploy <dir>` from the
// repo-root functions/ directory (wrangler resolves path.join(cwd, "functions"))
// and run at the edge next to the static files, same-origin, same path.
//
// The API key is a Pages project secret (GROQ_API_KEY), read from
// context.env at request time — never process.env at module scope.

const SYSTEM = `You are HiddenCameras.tv — an expert on hidden cameras, security cameras, surveillance systems, and privacy. You know every brand (Ring, Arlo, Blink, Wyze, Nest, Eufy, Reolink), and every type (nanny cams, dash cams, doorbell cameras, spy cameras, outdoor/indoor security), and the laws around surveillance. You help users pick the right camera, detect hidden cameras, understand privacy laws, and compare products. Be helpful, specific, and mention prices/features when relevant. Always recommend where to buy (Amazon links when possible).`;

const MODELS = ["openai/gpt-oss-120b", "openai/gpt-oss-20b"]; // 20b is the fallback if 120b 429s or empties

function stripThinking(text) {
  return text.replace(/<think>[\s\S]*?<\/think>/g, "").replace(/<think>[\s\S]*$/g, "").trim();
}

async function askGroq(key, model, messages) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.3,
      max_tokens: 1024,
      reasoning_effort: "low", // gpt-oss is a reasoning model; keep it fast for a chat widget
    }),
    signal: AbortSignal.timeout(12000),
  });
  if (!res.ok) throw new Error(`groq ${res.status}`);
  const d = await res.json();
  const m = d.choices?.[0]?.message || {};
  const content = stripThinking(m.content || "");
  if (!content) {
    // diagnosis only: lengths + finish_reason, never message content or the key
    throw new Error(
      `empty content (finish=${d.choices?.[0]?.finish_reason}, content_len=${(m.content || "").length}, reasoning_len=${(m.reasoning || "").length}, model_returned=${d.model})`
    );
  }
  return content;
}

export async function onRequestPost(context) {
  let body = {};
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ error: "bad json" }, { status: 400 });
  }
  const query = typeof body.query === "string" ? body.query.trim() : "";
  const history = (Array.isArray(body.messages) ? body.messages : Array.isArray(body.history) ? body.history : [])
    .slice(-8)
    .map((turn) => {
      const role = turn?.role === "assistant" || turn?.role === "bot" ? "assistant" : "user";
      const content = String(turn?.content || turn?.text || "").trim();
      return content ? { role, content } : null;
    })
    .filter(Boolean);
  if (!query) return Response.json({ error: "Missing query" }, { status: 400 });

  const key = context.env.GROQ_API_KEY;
  if (!key) {
    console.error("chatbot: GROQ_API_KEY secret not set on this Pages project");
    return Response.json({ error: "Chatbot is not configured." }, { status: 503 });
  }

  const messages = [
    { role: "system", content: SYSTEM + " Use the conversation so far. Follow-up questions refer to the camera or law you just discussed." },
    ...history,
    { role: "user", content: query },
  ];

  const failures = [];
  for (const model of MODELS) {
    try {
      const answer = await askGroq(key, model, messages);
      if (answer) return Response.json({ answer });
      failures.push(`${model}: empty answer`);
    } catch (err) {
      console.error(`chatbot: ${model} failed:`, err?.message || err);
      failures.push(`${model}: ${err?.message || "unknown"}`);
    }
  }
  return Response.json(
    { error: "The assistant is unavailable right now. Try again in a moment.", detail: failures.join("; ") },
    { status: 502 }
  );
}

// Honest method handling instead of the router's bare 404/405:
export async function onRequestGet() {
  return Response.json(
    { error: "POST JSON {query, messages?} to this endpoint." },
    { status: 405, headers: { Allow: "POST" } }
  );
}
