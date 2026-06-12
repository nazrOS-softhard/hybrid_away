'use client'

import { useState } from 'react'

export default function TestKeyPage() {
  const [result, setResult] = useState('')
  const [key, setKey] = useState('')

  async function test() {
    setResult('Загрузка...')
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: 'anthropic/claude-sonnet-4-5',
          max_tokens: 50,
          messages: [{ role: 'user', content: 'hi' }],
        }),
      })
      const data = await res.json()
      setResult(`Status: ${res.status}\n\n${JSON.stringify(data, null, 2)}`)
    } catch (e: any) {
      setResult('Error: ' + e.message)
    }
  }

  return (
    <div style={{ padding: 40, fontFamily: 'monospace', background: '#000', color: '#0f0', minHeight: '100vh' }}>
      <h1>Test OpenRouter Key</h1>
      <input
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="sk-or-v1-..."
        style={{ width: 500, padding: 10, background: '#111', color: '#0f0', border: '1px solid #333' }}
      />
      <button onClick={test} style={{ marginLeft: 10, padding: 10 }}>Test</button>
      <pre style={{ marginTop: 20, whiteSpace: 'pre-wrap' }}>{result}</pre>
    </div>
  )
}
