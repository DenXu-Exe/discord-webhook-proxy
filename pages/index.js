import { useState } from 'react';

export default function Home() {
  const [webhook, setWebhook] = useState('');
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState('');

  const send = async () => {
    setStatus('Sending...');
    const res = await fetch('/api/webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        webhookUrl: webhook,
        content: msg,
        username: 'Test Bot',
      }),
    });
    const data = await res.json();
    setStatus(res.ok ? 'Success!' : `Error: ${data.error}`);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Discord Webhook Proxy (Vercel)</h1>
      <p><strong>Proxy URL:</strong> <code>{typeof window !== 'undefined' ? window.location.origin + '/api/webhook' : ''}</code></p>
      <input
        placeholder="https://discord.com/api/webhooks/..."
        value={webhook}
        onChange={(e) => setWebhook(e.target.value)}
        style={{ width: '100%', padding: 10, margin: '10px 0' }}
      />
      <input
        placeholder="Test message"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        style={{ width: '100%', padding: 10, margin: '10px 0' }}
      />
      <button onClick={send} style={{ padding: 10 }}>Send Test</button>
      <p><strong>{status}</strong></p>
    </div>
  );
}
