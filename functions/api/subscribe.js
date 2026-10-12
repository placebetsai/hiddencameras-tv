export async function onRequestPost(context) {
  let body = {};
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ error: "bad json" }, { status: 400 });
  }
  const email = String(body.email || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return Response.json({ error: "valid email required" }, { status: 400 });
  }
  const dest = (context.env && context.env.CONTACT_EMAIL) || "info@hiddencameras.tv";
  try {
    await fetch("https://formsubmit.co/ajax/" + dest, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        email,
        _subject: "Security Tips Guide Request",
        _captcha: "false",
      }),
    });
  } catch {
    // The visitor still gets a confirmation. Delivery is best-effort.
  }
  return Response.json({ ok: true });
}
