// pages/api/webhook.js
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Use GET" });
  }

  const { url, content, username } = req.query;

  if (!url || !content) {
    return res.status(400).json({ error: "Missing url or content" });
  }

  try {
    await fetch(decodeURIComponent(url), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: decodeURIComponent(content),
        username: username ? decodeURIComponent(username) : "Delta Bot",
      }),
    });
    res.status(200).send("OK");
  } catch (e) {
    res.status(500).send("Error");
  }
}
