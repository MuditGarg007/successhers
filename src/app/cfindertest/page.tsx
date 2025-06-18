"use client"

import React, {useState} from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState<{ prompt: string; script: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState(0);

  // Animated dots effect
  React.useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => setDots(d => (d + 1) % 4), 400);
    return () => clearInterval(interval);
  }, [loading]);

  const generateScript = async () => {
    setLoading(true);
    const response = await fetch('/api/cfinder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    setResults(prev => [
      ...prev,
      { prompt, script: data.script }
    ]);
    setPrompt('');
    setLoading(false);
    setDots(0);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Search Company</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your company here"
        rows={5}
        style={{ width: '100%', marginBottom: '1rem' }}
        disabled={loading}
      />
      <button
        onClick={generateScript}
        style={{
          padding: '0.5rem 1rem',
          background: loading ? '#64748b' : '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s',
          outline: 'none',
        }}
        disabled={loading}
        onMouseDown={e => (e.currentTarget.style.background = '#1e40af')}
        onMouseUp={e => (e.currentTarget.style.background = '#2563eb')}
        onMouseLeave={e => (e.currentTarget.style.background = loading ? '#64748b' : '#2563eb')}
        onMouseOver={e => { if (!loading) e.currentTarget.style.background = '#1d4ed8'; }}
      >
        {loading ? "Searching..." : "Find"}
      </button>
      {loading && (
        <div style={{ marginTop: '1rem', color: '#a3e635', fontWeight: 600, fontSize: '1.1rem' }}>
          Searching for company data{".".repeat(dots)}
        </div>
      )}
      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {results.map((result, idx) => (
          <div key={idx} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '1rem',
            background: '#18181b',
            color: '#fff'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Search: {result.prompt}
            </div>
            <pre style={{
              background: '#222',
              color: '#a3e635',
              padding: '1rem',
              borderRadius: '6px',
              overflowX: 'auto'
            }}>
              {(() => {
                try {
                  return JSON.stringify(JSON.parse(result.script), null, 2);
                } catch {
                  return result.script;
                }
              })()}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
