'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// Config
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

// Change this to your Cloudflare Tunnel URL when ready
const API_URL = 'https://sciences-echo-tracked-rev.trycloudflare.com';
// For local testing: 'http://localhost:8787'

const C = {
  navy: '#0D1B2A',
  navyDeep: 'rgba(7,16,28,0.96)',
  card: '#10202f',
  cream: '#F5F1EB',
  creamHigh: 'rgba(245,241,235,0.85)',
  creamMid: 'rgba(245,241,235,0.55)',
  creamDim: 'rgba(245,241,235,0.35)',
  creamGhost: 'rgba(245,241,235,0.08)',
  border: 'rgba(245,241,235,0.06)',
  crimson: '#B23531',
  amber: '#C49A3C',
  green: '#4A9E6B',
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// Static Route Index (fallback when API is offline)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

const ROUTES = [
  { path: '/ddl', title: 'DDL Hub', desc: 'Core methodology, charter, and governance', wing: 'DDL' },
  { path: '/council', title: 'AI Council', desc: 'Nine-model independent review system', wing: 'DDL' },
  { path: '/council/profiles', title: 'Council Profiles', desc: 'All council member profiles', wing: 'DDL' },
  { path: '/standards', title: 'Standards', desc: 'Registry of all DDL standards', wing: 'DDL' },
  { path: '/systems', title: 'Systems', desc: 'Registry of all DDL systems', wing: 'DDL' },
  { path: '/excelligence', title: 'Excelligence', desc: 'Excel expertise knowledge graph', wing: 'DDL' },
  { path: '/methodology', title: 'Methodology', desc: 'DDL operational methodology', wing: 'DDL' },
  { path: '/mindframe', title: 'MindFrame', desc: 'AI calibration and persona system', wing: 'DDL' },
  { path: '/dexos', title: 'DexOS', desc: 'Multi-model orchestration system', wing: 'DDL' },
  { path: '/framework/pss', title: 'Prompt Strategy System', desc: 'Governed prompt engineering', wing: 'DDL' },
  { path: '/projects', title: 'Projects', desc: 'Client and partner work showcase', wing: 'DDL' },
  { path: '/about', title: 'Operator Profile', desc: 'Dave Kitchens â€” CPA, builder, operator', wing: 'DDL' },
  { path: '/memoir', title: 'Little to Know Experience', desc: 'Addiction recovery memoir', wing: 'DDL' },
  { path: '/memoir/architecture', title: 'Memoir Architecture', desc: 'How the memoir was built', wing: 'DDL' },
  { path: '/memoir/reading-room', title: 'Reading Room', desc: 'Selected excerpts in reading order', wing: 'DDL' },
  { path: '/forewords', title: 'Foreword Convergence', desc: 'Nine AI models write memoir forewords', wing: 'DDL' },
  { path: '/blindspot', title: 'BlindSpot', desc: 'Trading and campaign analytics hub', wing: 'D&A' },
  { path: '/blindspot/trading', title: 'BlindSpot Trading', desc: 'Market analytics dashboard', wing: 'D&A' },
  { path: '/blindspot/steam', title: 'BlindSpot Steam', desc: 'Gaming library analytics', wing: 'D&A' },
  { path: '/blindspot/campaign', title: 'BlindSpot Campaign', desc: 'D&D campaign analytics', wing: 'D&A' },
  { path: '/analytics', title: 'Analytics Hub', desc: 'All analytics dashboards', wing: 'D&A' },
  { path: '/analytics/grammarly', title: 'Grammarly Analytics', desc: '4.57M words analyzed', wing: 'D&A' },
  { path: '/analytics/tone', title: 'Tone Analysis', desc: 'Communication tone patterns', wing: 'D&A' },
  { path: '/analytics/memoir', title: 'Memoir Analytics', desc: 'Manuscript metrics and patterns', wing: 'D&A' },
  { path: '/recaps', title: 'Recaps', desc: 'Year-end data stories', wing: 'D&A' },
  { path: '/recaps/apple-music', title: 'Apple Music Recap', desc: 'Listening data analysis', wing: 'D&A' },
  { path: '/products/behavioral-intelligence', title: 'Behavioral Intelligence', desc: 'AI-driven behavioral profiling', wing: 'Products' },
  { path: '/dexlore', title: 'DexLore', desc: 'Five-era narrative mythology', wing: 'DexVerse' },
  { path: '/dexlore/continuum', title: 'Continuum', desc: 'Full timeline of the build', wing: 'DexVerse' },
  { path: '/dossiers', title: 'Dossiers', desc: 'CottageHumble RPG character profiles', wing: 'DexVerse' },
  { path: '/knowledge/glossary', title: 'Glossary', desc: 'Canon terms and definitions', wing: 'DexVerse' },
  { path: '/social', title: 'Social Hub', desc: 'Community and social links', wing: 'DDL' },
  { path: '/registry', title: 'Registry', desc: 'Full systems and standards registry', wing: 'DDL' },
];

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// Fuzzy match for static fallback
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function fuzzyMatch(query, routes) {
  const q = query.toLowerCase();
  const terms = q.split(/\s+/);
  return routes
    .map(r => {
      const haystack = `${r.title} ${r.desc} ${r.wing} ${r.path}`.toLowerCase();
      let score = 0;
      for (const term of terms) {
        if (haystack.includes(term)) score += 10;
        if (r.title.toLowerCase().includes(term)) score += 20;
        if (r.path.toLowerCase().includes(term)) score += 5;
      }
      return { ...r, score };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// Search Modal Component
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('route'); // 'route' | 'deep'
  const [apiOnline, setApiOnline] = useState(null);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const router = useRouter();
  const debounceRef = useRef(null);

  // Check API health on mount
  useEffect(() => {
    if (!isOpen) return;
    fetch(`${API_URL}/`, { signal: AbortSignal.timeout(3000) })
      .then(r => r.json())
      .then(d => setApiOnline(d.status === 'online'))
      .catch(() => setApiOnline(false));
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setResults([]);
      setSelected(0);
    }
  }, [isOpen]);

  // Search logic
  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (mode === 'deep' && apiOnline) {
        // RAG search via API
        setLoading(true);
        fetch(`${API_URL}/search?q=${encodeURIComponent(query)}&top=6`)
          .then(r => r.json())
          .then(data => {
            setResults(data.results.map(r => ({
              type: 'deep',
              title: r.source.split('\\').pop().split('/').pop(),
              desc: r.text.slice(0, 150) + '...',
              source: r.source,
              relevance: r.relevance,
            })));
            setLoading(false);
          })
          .catch(() => {
            setResults([]);
            setLoading(false);
          });
      } else {
        // Static route search
        const hits = fuzzyMatch(query, ROUTES);
        setResults(hits.map(r => ({
          type: 'route',
          title: r.title,
          desc: r.desc,
          path: r.path,
          wing: r.wing,
        })));
      }
      setSelected(0);
    }, 150);
  }, [query, mode, apiOnline]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected(s => Math.min(s + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected(s => Math.max(s - 1, 0));
    } else if (e.key === 'Enter' && results[selected]) {
      e.preventDefault();
      const r = results[selected];
      if (r.path) {
        router.push(r.path);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Tab' && apiOnline) {
      e.preventDefault();
      setMode(m => m === 'route' ? 'deep' : 'route');
    }
  }, [results, selected, router, onClose, apiOnline]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          animation: 'fadeIn 0.15s ease',
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed', top: '15%', left: '50%',
        transform: 'translateX(-50%)',
        width: '90%', maxWidth: 560,
        zIndex: 101,
        background: C.navyDeep,
        border: `1px solid ${C.creamGhost}`,
        borderRadius: 12,
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        overflow: 'hidden',
        animation: 'slideDown 0.15s ease',
      }}>
        <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideDown { from { opacity: 0; transform: translateX(-50%) translateY(-8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        `}</style>

        {/* Search Input */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '14px 18px',
          borderBottom: `1px solid ${C.border}`,
        }}>
          <span style={{ fontFamily: font.mono, fontSize: 14, color: C.creamDim }}>
            {mode === 'deep' ? 'ðŸ”¬' : 'ðŸ”'}
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={mode === 'deep' ? 'Deep search the archive...' : 'Search pages...'}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontFamily: font.body, fontSize: 16, color: C.cream,
              caretColor: C.crimson,
            }}
          />
          {apiOnline && (
            <button
              onClick={() => setMode(m => m === 'route' ? 'deep' : 'route')}
              style={{
                fontFamily: font.mono, fontSize: 9, letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: mode === 'deep' ? C.green : C.creamDim,
                background: mode === 'deep' ? C.green + '15' : C.creamGhost,
                border: `1px solid ${mode === 'deep' ? C.green + '30' : C.border}`,
                borderRadius: 4, padding: '4px 8px', cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {mode === 'deep' ? 'Deep' : 'Pages'}
            </button>
          )}
          <span style={{
            fontFamily: font.mono, fontSize: 10, color: C.creamDim,
            padding: '3px 6px', border: `1px solid ${C.border}`,
            borderRadius: 4,
          }}>
            ESC
          </span>
        </div>

        {/* Results */}
        <div style={{
          maxHeight: 400, overflowY: 'auto',
          padding: results.length > 0 ? '6px' : '0',
        }}>
          {loading && (
            <div style={{
              padding: '20px', textAlign: 'center',
              fontFamily: font.mono, fontSize: 11, color: C.creamDim,
            }}>
              Searching the archive...
            </div>
          )}

          {!loading && query.length >= 2 && results.length === 0 && (
            <div style={{
              padding: '20px', textAlign: 'center',
              fontFamily: font.mono, fontSize: 11, color: C.creamDim,
            }}>
              No results for "{query}"
            </div>
          )}

          {!loading && results.map((r, i) => (
            <div
              key={i}
              onClick={() => {
                if (r.path) { router.push(r.path); onClose(); }
              }}
              style={{
                padding: '10px 14px',
                borderRadius: 6,
                cursor: r.path ? 'pointer' : 'default',
                background: i === selected ? C.creamGhost : 'transparent',
                transition: 'background 0.1s',
              }}
              onMouseEnter={() => setSelected(i)}
            >
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3,
              }}>
                <span style={{
                  fontFamily: font.display, fontSize: 14, fontWeight: 500,
                  color: i === selected ? C.cream : C.creamHigh,
                }}>
                  {r.title}
                </span>
                {r.wing && (
                  <span style={{
                    fontFamily: font.mono, fontSize: 9, color: C.creamDim,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>
                    {r.wing}
                  </span>
                )}
                {r.relevance && (
                  <span style={{
                    fontFamily: font.mono, fontSize: 9, color: C.green,
                  }}>
                    {r.relevance}%
                  </span>
                )}
              </div>
              <div style={{
                fontFamily: font.body, fontSize: 13,
                color: C.creamDim, lineHeight: 1.4,
              }}>
                {r.desc}
              </div>
              {r.source && (
                <div style={{
                  fontFamily: font.mono, fontSize: 10, color: C.creamDim,
                  marginTop: 4, opacity: 0.6,
                }}>
                  {r.source}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: '8px 14px',
          borderTop: `1px solid ${C.border}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{
            fontFamily: font.mono, fontSize: 9, color: C.creamDim,
            display: 'flex', gap: 12,
          }}>
            <span>â†‘â†“ navigate</span>
            <span>â†µ open</span>
            {apiOnline && <span>tab toggle deep search</span>}
          </div>
          <div style={{
            fontFamily: font.mono, fontSize: 9,
            color: apiOnline ? C.green : C.creamDim,
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: apiOnline ? C.green : C.creamDim,
              display: 'inline-block',
            }} />
            {apiOnline ? 'Dex Jr. online' : 'Page search only'}
          </div>
        </div>
      </div>
    </>
  );
}


