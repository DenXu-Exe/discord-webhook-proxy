// pages/api/webhook.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { webhookUrl, content, username, avatar_url } = req.body;

  if (!webhookUrl || !content) {
    return res.status(400).json({ error: 'Missing webhookUrl or content' });
  }

  try {
    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        username: username || 'Delta Proxy',
        avatar_url: avatar_url || '',
      }),
    });

    if (!discordResponse.ok) {
      const errorText = await discordResponse.text();
      throw new Error(`Discord error: ${discordResponse.status} - ${errorText}`);
    }

    res.status(200).json({ success: true, message: 'Sent to Discord!' });
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ error: error.message });
  }
}
