'use client';

import { useState, useRef, useEffect } from 'react';

const C = {
  navy: '#0D1B2A',
  navyDeep: '#070F1C',
  card: '#10202f',
  cream: '#F5F1EB',
  creamHigh: 'rgba(245,241,235,0.85)',
  creamMid: 'rgba(245,241,235,0.55)',
  creamDim: 'rgba(245,241,235,0.35)',
  creamGhost: 'rgba(245,241,235,0.08)',
  border: 'rgba(245,241,235,0.06)',
  crimson: '#B23531',
  green: '#4A9E6B',
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

// Change this when Cloudflare Tunnel is ready
const API_URL = 'https://sciences-echo-tracked-rev.trycloudflare.com';

export default function MindFrameSession() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [apiOnline, setApiOnline] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Check API on mount
  useEffect(() => {
    fetch(`${API_URL}/`, { signal: AbortSignal.timeout(3000) })
      .then(r => r.json())
      .then(d => setApiOnline(d.status === 'online'))
      .catch(() => setApiOnline(false));
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input
  useEffect(() => {
    if (started && inputRef.current) inputRef.current.focus();
  }, [started, loading]);

  const startSession = async () => {
    setStarted(true);
    setLoading(true);
    try {
      const resp = await fetch(`${API_URL}/mindframe/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [] }),
      });
      const data = await resp.json();
      setMessages([{ role: 'assistant', content: data.content }]);
    } catch (e) {
      setMessages([{ role: 'assistant', content: "I couldn't connect to MindFrame. Make sure Dex Jr. is running." }]);
    }
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const resp = await fetch(`${API_URL}/mindframe/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await resp.json();
      setMessages([...newMessages, { role: 'assistant', content: data.content }]);
    } catch (e) {
      setMessages([...newMessages, { role: 'assistant', content: "Connection lost. Try again?" }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Check if the profile has been generated (look for the marker)
  const hasProfile = messages.some(m =>
    m.role === 'assistant' && m.content.includes('MINDFRAME CALIBRATION PROFILE')
  );

  return (
    <div style={{
      maxWidth: 720, margin: '0 auto', padding: '40px 24px 120px',
      minHeight: 'calc(100vh - 120px)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{
          fontFamily: font.mono, fontSize: 9, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: C.crimson, marginBottom: 8,
        }}>
          MindFrame Calibration
        </div>
        <div style={{
          fontFamily: font.display, fontSize: 24, fontWeight: 600,
          color: C.cream, marginBottom: 8,
        }}>
          Who are you when you're not thinking about it?
        </div>
        <div style={{
          fontFamily: font.body, fontSize: 15, color: C.creamMid,
          lineHeight: 1.7,
        }}>
          A short conversation that maps how you think, communicate, and
          make decisions. Not a personality test — a calibration session.
          8-10 questions. All processed locally. Nothing leaves this machine.
        </div>
      </div>

      {/* Start button or chat */}
      {!started ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          {apiOnline === false && (
            <div style={{
              fontFamily: font.mono, fontSize: 12, color: C.crimson,
              marginBottom: 20, padding: '12px 16px',
              background: 'rgba(178,53,49,0.1)',
              border: '1px solid rgba(178,53,49,0.2)',
              borderRadius: 6,
            }}>
              Dex Jr. is offline. MindFrame requires the local AI to be running.
            </div>
          )}
          <button
            onClick={startSession}
            disabled={apiOnline === false}
            style={{
              fontFamily: font.display, fontSize: 16, fontWeight: 600,
              color: C.cream, background: apiOnline === false ? C.creamGhost : C.crimson,
              border: 'none', borderRadius: 8, padding: '16px 40px',
              cursor: apiOnline === false ? 'not-allowed' : 'pointer',
              boxShadow: apiOnline === false ? 'none' : `0 4px 20px ${C.crimson}30`,
              transition: 'all 0.2s',
            }}
          >
            Begin Calibration â†’
          </button>
          <div style={{
            fontFamily: font.mono, fontSize: 10, color: C.creamDim,
            marginTop: 16, display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 6,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: apiOnline ? C.green : apiOnline === false ? C.crimson : C.creamDim,
              display: 'inline-block',
            }} />
            {apiOnline ? 'Dex Jr. online — ready' : apiOnline === false ? 'Dex Jr. offline' : 'Checking...'}
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Messages */}
          <div style={{ flex: 1, marginBottom: 20 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: 16,
              }}>
                <div style={{
                  maxWidth: '80%',
                  padding: '14px 18px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user' ? C.crimson + '20' : C.card,
                  border: `1px solid ${msg.role === 'user' ? C.crimson + '30' : C.border}`,
                }}>
                  <div style={{
                    fontFamily: font.mono, fontSize: 9, letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: msg.role === 'user' ? C.crimson : C.creamDim,
                    marginBottom: 6,
                  }}>
                    {msg.role === 'user' ? 'You' : 'MindFrame'}
                  </div>
                  <div style={{
                    fontFamily: msg.content.includes('MINDFRAME CALIBRATION PROFILE') ? font.mono : font.body,
                    fontSize: msg.content.includes('MINDFRAME CALIBRATION PROFILE') ? 13 : 15,
                    color: C.creamHigh,
                    lineHeight: 1.7,
                    whiteSpace: 'pre-wrap',
                  }}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div style={{
                display: 'flex', justifyContent: 'flex-start', marginBottom: 16,
              }}>
                <div style={{
                  padding: '14px 18px', borderRadius: '16px 16px 16px 4px',
                  background: C.card, border: `1px solid ${C.border}`,
                }}>
                  <div style={{
                    fontFamily: font.mono, fontSize: 9, color: C.creamDim,
                    letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6,
                  }}>MindFrame</div>
                  <div style={{
                    fontFamily: font.body, fontSize: 15, color: C.creamDim,
                    fontStyle: 'italic',
                  }}>
                    Thinking...
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          {!hasProfile && (
            <div style={{
              position: 'sticky', bottom: 0,
              padding: '16px 0',
              background: `linear-gradient(transparent, ${C.navy} 20%)`,
            }}>
              <div style={{
                display: 'flex', gap: 10,
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: '4px 4px 4px 16px',
                alignItems: 'flex-end',
              }}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Share your thoughts..."
                  rows={1}
                  style={{
                    flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    fontFamily: font.body, fontSize: 15, color: C.cream,
                    resize: 'none', padding: '10px 0',
                    lineHeight: 1.5, caretColor: C.crimson,
                    maxHeight: 120, overflowY: 'auto',
                  }}
                  onInput={e => {
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  style={{
                    fontFamily: font.mono, fontSize: 12,
                    color: !input.trim() || loading ? C.creamDim : C.cream,
                    background: !input.trim() || loading ? C.creamGhost : C.crimson,
                    border: 'none', borderRadius: 8,
                    padding: '10px 16px', cursor: !input.trim() || loading ? 'default' : 'pointer',
                    transition: 'all 0.15s', flexShrink: 0,
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          )}

          {/* Profile complete state */}
          {hasProfile && (
            <div style={{
              textAlign: 'center', padding: '24px 0',
              borderTop: `1px solid ${C.border}`,
            }}>
              <div style={{
                fontFamily: font.mono, fontSize: 11, color: C.green,
                marginBottom: 8,
              }}>
                Calibration complete
              </div>
              <button
                onClick={() => { setMessages([]); setStarted(false); }}
                style={{
                  fontFamily: font.mono, fontSize: 12, color: C.creamMid,
                  background: C.creamGhost, border: `1px solid ${C.border}`,
                  borderRadius: 6, padding: '8px 20px', cursor: 'pointer',
                }}
              >
                Start New Session
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


