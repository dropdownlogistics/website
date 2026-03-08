'use client';
import { useState, useEffect, useRef } from 'react';

const C = {
  navy: '#0D1B2A', card: '#10202f', cardDeep: '#0a1520',
  cream: '#F5F1EB', creamHigh: 'rgba(245,241,235,0.85)',
  creamMid: 'rgba(245,241,235,0.55)', creamDim: 'rgba(245,241,235,0.3)',
  creamGhost: 'rgba(245,241,235,0.06)', border: 'rgba(245,241,235,0.06)',
  borderMed: 'rgba(245,241,235,0.12)',
  crimson: '#B23531', crimsonDim: 'rgba(178,53,49,0.15)',
  amber: '#C49A3C', amberDim: 'rgba(196,154,60,0.15)',
  green: '#4A9E6B', greenDim: 'rgba(74,158,107,0.15)',
  blue: '#6B9DC2', blueDim: 'rgba(107,157,194,0.15)',
  violet: '#8a6cc9', violetDim: 'rgba(138,108,201,0.15)',
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

const GH_REPO = 'dropdownlogistics/website';
const GH_API = `https://api.github.com/repos/${GH_REPO}`;

function StatCard({ label, value, sub, color = C.amber }) {
  return (
    <div style={{
      background: C.card, border: `1px solid ${color}20`,
      borderRadius: 8, padding: '18px 20px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: color, opacity: 0.5 }} />
      <div style={{ fontFamily: font.mono, fontSize: 9, color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: font.mono, fontSize: 28, fontWeight: 700, color: C.cream, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

function CommitBar({ commit, maxFiles }) {
  const date = new Date(commit.commit.author.date);
  const msg = commit.commit.message.split('\n')[0];
  const files = commit.files || 0;
  const width = maxFiles > 0 ? Math.max(4, (files / maxFiles) * 100) : 4;

  return (
    <div style={{
      padding: '10px 14px', marginBottom: 4,
      background: C.cardDeep, border: `1px solid ${C.border}`,
      borderRadius: 6, display: 'flex', gap: 12, alignItems: 'center',
    }}>
      <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, width: 72, flexShrink: 0 }}>
        {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: font.mono, fontSize: 11, color: C.creamMid, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg}</div>
        <div style={{ marginTop: 5, height: 3, borderRadius: 2, background: C.border }}>
          <div style={{ width: `${width}%`, height: '100%', background: C.amber, borderRadius: 2, transition: 'width 0.4s ease' }} />
        </div>
      </div>
      {files > 0 && (
        <div style={{ fontFamily: font.mono, fontSize: 10, color: C.amber, width: 32, textAlign: 'right', flexShrink: 0 }}>
          {files}f
        </div>
      )}
      <div style={{
        fontFamily: font.mono, fontSize: 9, color: C.creamDim,
        padding: '2px 6px', background: C.creamGhost, borderRadius: 3, flexShrink: 0,
      }}>{commit.sha.slice(0, 7)}</div>
    </div>
  );
}

function WeekGrid({ weeklyData }) {
  if (!weeklyData.length) return null;
  const max = Math.max(...weeklyData.map(w => w.count), 1);
  return (
    <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 60 }}>
      {weeklyData.map((w, i) => {
        const h = Math.max(3, (w.count / max) * 56);
        return (
          <div key={i} title={`${w.label}: ${w.count} commits`} style={{
            flex: 1, height: h, borderRadius: '2px 2px 0 0',
            background: w.count > 0 ? C.amber : C.border,
            opacity: w.count > 0 ? 0.6 + (w.count / max) * 0.4 : 1,
            transition: 'height 0.3s ease',
            cursor: 'default',
          }} />
        );
      })}
    </div>
  );
}

function DeployRow({ deploy }) {
  const date = new Date(deploy.createdAt);
  const duration = deploy.buildingAt && deploy.ready
    ? Math.round((deploy.ready - deploy.buildingAt) / 1000)
    : null;
  const stateColor = deploy.state === 'READY' ? C.green : deploy.state === 'ERROR' ? C.crimson : C.amber;
  const stateLabel = deploy.state === 'READY' ? 'PASS' : deploy.state === 'ERROR' ? 'FAIL' : deploy.state;

  return (
    <div style={{
      padding: '10px 14px', marginBottom: 4,
      background: C.cardDeep, border: `1px solid ${C.border}`,
      borderRadius: 6, display: 'flex', gap: 12, alignItems: 'center',
    }}>
      <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, width: 72, flexShrink: 0 }}>
        {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: font.mono, fontSize: 11, color: C.creamMid, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {deploy.meta?.githubCommitMessage?.split('\n')[0] || deploy.url}
        </div>
        {duration && (
          <div style={{ marginTop: 4, fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>
            {duration}s build
          </div>
        )}
      </div>
      <div style={{
        fontFamily: font.mono, fontSize: 9, color: stateColor,
        padding: '2px 8px', background: stateColor + '18', borderRadius: 3, flexShrink: 0,
      }}>{stateLabel}</div>
    </div>
  );
}

export default function BuildLog() {
  const [ghData, setGhData] = useState(null);
  const [commits, setCommits] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [deploys, setDeploys] = useState([]);
  const [vercelToken, setVercelToken] = useState('');
  const [tokenInput, setTokenInput] = useState('');
  const [loading, setLoading] = useState({ gh: true, vercel: false });
  const [error, setError] = useState({ gh: null, vercel: null });
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setMounted(true);
    // Load saved token
    const saved = typeof window !== 'undefined' ? localStorage.getItem('ddl_vercel_token') : null;
    if (saved) setVercelToken(saved);
  }, []);

  // Fetch GitHub data
  useEffect(() => {
    async function fetchGH() {
      try {
        setLoading(l => ({ ...l, gh: true }));

        // Repo info
        const repoRes = await fetch(`${GH_API}`);
        const repo = await repoRes.json();

        // Commits (last 100)
        const commitsRes = await fetch(`${GH_API}/commits?per_page=100`);
        const commitsData = await commitsRes.json();

        if (!Array.isArray(commitsData)) throw new Error('GitHub rate limit hit');

        setGhData(repo);
        setCommits(commitsData);

        // Build weekly grid — last 16 weeks
        const now = new Date();
        const weeks = [];
        for (let i = 15; i >= 0; i--) {
          const start = new Date(now);
          start.setDate(start.getDate() - (i + 1) * 7);
          const end = new Date(now);
          end.setDate(end.getDate() - i * 7);
          const count = commitsData.filter(c => {
            const d = new Date(c.commit.author.date);
            return d >= start && d < end;
          }).length;
          weeks.push({
            label: start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            count,
          });
        }
        setWeeklyData(weeks);
        setLoading(l => ({ ...l, gh: false }));
      } catch (e) {
        setError(err => ({ ...err, gh: e.message }));
        setLoading(l => ({ ...l, gh: false }));
      }
    }
    fetchGH();
  }, []);

  // Fetch Vercel data
  useEffect(() => {
    if (!vercelToken) return;
    async function fetchVercel() {
      try {
        setLoading(l => ({ ...l, vercel: true }));
        const res = await fetch('https://api.vercel.com/v6/deployments?limit=50&projectId=dropdownlogistics', {
          headers: { Authorization: `Bearer ${vercelToken}` },
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error.message);
        setDeploys(data.deployments || []);
        setLoading(l => ({ ...l, vercel: false }));
        setError(err => ({ ...err, vercel: null }));
      } catch (e) {
        setError(err => ({ ...err, vercel: e.message }));
        setLoading(l => ({ ...l, vercel: false }));
      }
    }
    fetchVercel();
  }, [vercelToken]);

  const handleTokenSubmit = () => {
    if (!tokenInput.trim()) return;
    localStorage.setItem('ddl_vercel_token', tokenInput.trim());
    setVercelToken(tokenInput.trim());
    setTokenInput('');
  };

  // Stats
  const totalCommits = commits.length;
  const last30 = commits.filter(c => {
    const d = new Date(c.commit.author.date);
    return (Date.now() - d) < 30 * 24 * 60 * 60 * 1000;
  }).length;
  const successDeploys = deploys.filter(d => d.state === 'READY').length;
  const failDeploys = deploys.filter(d => d.state === 'ERROR').length;
  const avgBuild = deploys.length > 0
    ? Math.round(deploys.filter(d => d.buildingAt && d.ready).reduce((acc, d) => acc + (d.ready - d.buildingAt) / 1000, 0) / deploys.filter(d => d.buildingAt && d.ready).length)
    : null;

  const tabs = ['overview', 'commits', 'deploys'];

  return (
    <div style={{ minHeight: '100vh', background: C.navy, color: C.cream, fontFamily: font.body }}>
      {/* Noise texture */}
      <div style={{ position: 'fixed', inset: 0, opacity: 0.02, pointerEvents: 'none', zIndex: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px' }} />

      <div style={{
        position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '48px 24px 80px',
        opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(8px)', transition: 'all 0.5s ease',
      }}>
        {/* Breadcrumb */}
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.amber, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 28 }}>
          DDL / Analytics / Build Log
        </div>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <h1 style={{ fontFamily: font.display, fontSize: 32, fontWeight: 700, color: C.cream, margin: '0 0 8px', letterSpacing: '-0.5px' }}>
            Build Log
          </h1>
          <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.7, margin: 0, maxWidth: 560 }}>
            GitHub commit history and Vercel deployment analytics for dropdownlogistics.com.
            The site that documents everything, documenting itself.
          </p>
          <div style={{ height: 2, width: 48, background: C.amber, marginTop: 16, opacity: 0.6 }} />
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10, marginBottom: 32 }}>
          <StatCard label="Total Commits" value={loading.gh ? '—' : totalCommits} sub="last 100 fetched" color={C.amber} />
          <StatCard label="Last 30 Days" value={loading.gh ? '—' : last30} sub="commit velocity" color={C.green} />
          <StatCard label="Deploys" value={loading.vercel ? '—' : deploys.length || '—'} sub={vercelToken ? `${successDeploys} passed` : 'token needed'} color={C.blue} />
          <StatCard label="Avg Build" value={avgBuild ? `${avgBuild}s` : '—'} sub="vercel build time" color={C.violet} />
          <StatCard label="Fail Rate" value={deploys.length ? `${Math.round(failDeploys / deploys.length * 100)}%` : '—'} sub={`${failDeploys} errors`} color={C.crimson} />
        </div>

        {/* Commit frequency */}
        {!loading.gh && weeklyData.length > 0 && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '18px 20px', marginBottom: 16 }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
              Commit Frequency — Last 16 Weeks
            </div>
            <WeekGrid weeklyData={weeklyData} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>{weeklyData[0]?.label}</span>
              <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>Now</span>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              padding: '7px 16px', borderRadius: 5, cursor: 'pointer',
              border: `1px solid ${activeTab === t ? C.amber : C.border}`,
              background: activeTab === t ? C.amberDim : C.creamGhost,
              fontFamily: font.mono, fontSize: 10, color: activeTab === t ? C.amber : C.creamDim,
            }}>{t.toUpperCase()}</button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === 'overview' && (
          <div>
            {/* GitHub summary */}
            {!loading.gh && ghData && (
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '18px 20px', marginBottom: 12 }}>
                <div style={{ fontFamily: font.mono, fontSize: 9, color: C.amber, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>GitHub</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
                  {[
                    { label: 'Repository', value: GH_REPO },
                    { label: 'Default Branch', value: ghData.default_branch },
                    { label: 'Language', value: ghData.language || 'TypeScript' },
                    { label: 'Last Push', value: new Date(ghData.pushed_at).toLocaleDateString() },
                  ].map(item => (
                    <div key={item.label}>
                      <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginBottom: 3 }}>{item.label}</div>
                      <div style={{ fontFamily: font.mono, fontSize: 12, color: C.cream }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vercel token input */}
            {!vercelToken && (
              <div style={{ background: C.card, border: `1px solid ${C.violet}20`, borderRadius: 8, padding: '18px 20px', marginBottom: 12 }}>
                <div style={{ fontFamily: font.mono, fontSize: 9, color: C.violet, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Vercel Token Required</div>
                <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, marginBottom: 12 }}>
                  Add your Vercel API token to unlock deployment analytics. Stored locally.
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="password"
                    value={tokenInput}
                    onChange={e => setTokenInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleTokenSubmit()}
                    placeholder="vercel_token_..."
                    style={{
                      flex: 1, padding: '8px 12px', borderRadius: 5,
                      background: C.cardDeep, border: `1px solid ${C.border}`,
                      fontFamily: font.mono, fontSize: 12, color: C.cream, outline: 'none',
                    }}
                  />
                  <button onClick={handleTokenSubmit} style={{
                    padding: '8px 16px', borderRadius: 5, cursor: 'pointer',
                    background: C.violetDim, border: `1px solid ${C.violet}40`,
                    fontFamily: font.mono, fontSize: 11, color: C.violet,
                  }}>Connect</button>
                </div>
              </div>
            )}

            {/* Recent commits preview */}
            {!loading.gh && commits.length > 0 && (
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '18px 20px' }}>
                <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
                  Recent Commits
                </div>
                {commits.slice(0, 8).map(c => (
                  <CommitBar key={c.sha} commit={c} maxFiles={0} />
                ))}
                <button onClick={() => setActiveTab('commits')} style={{
                  marginTop: 10, padding: '7px 14px', borderRadius: 5, cursor: 'pointer',
                  background: 'none', border: `1px solid ${C.border}`,
                  fontFamily: font.mono, fontSize: 10, color: C.creamDim,
                }}>View all {totalCommits} commits →</button>
              </div>
            )}
          </div>
        )}

        {/* Commits tab */}
        {activeTab === 'commits' && (
          <div>
            {loading.gh && (
              <div style={{ fontFamily: font.mono, fontSize: 12, color: C.creamDim, padding: 20 }}>Fetching GitHub data...</div>
            )}
            {error.gh && (
              <div style={{ fontFamily: font.mono, fontSize: 12, color: C.crimson, padding: 20 }}>{error.gh}</div>
            )}
            {!loading.gh && commits.map(c => (
              <CommitBar key={c.sha} commit={c} maxFiles={0} />
            ))}
          </div>
        )}

        {/* Deploys tab */}
        {activeTab === 'deploys' && (
          <div>
            {!vercelToken && (
              <div style={{ fontFamily: font.mono, fontSize: 12, color: C.creamDim, padding: '20px 0' }}>
                Enter Vercel token in the Overview tab to load deployment data.
              </div>
            )}
            {loading.vercel && (
              <div style={{ fontFamily: font.mono, fontSize: 12, color: C.creamDim, padding: 20 }}>Fetching Vercel data...</div>
            )}
            {error.vercel && (
              <div style={{ fontFamily: font.mono, fontSize: 12, color: C.crimson, padding: '8px 14px', background: C.crimsonDim, borderRadius: 6, marginBottom: 12 }}>
                {error.vercel}
              </div>
            )}
            {!loading.vercel && deploys.map(d => (
              <DeployRow key={d.uid} deploy={d} />
            ))}
            {vercelToken && !loading.vercel && deploys.length === 0 && !error.vercel && (
              <div style={{ fontFamily: font.mono, fontSize: 12, color: C.creamDim, padding: '20px 0' }}>
                No deployments found. Check that the project name matches.
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: 48 }}>
          <div style={{ height: 2, borderRadius: 1, marginBottom: 12, background: `linear-gradient(90deg, ${C.amber}, ${C.green}, ${C.blue}, ${C.violet})` }} />
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.08em', textAlign: 'center' }}>
            Dropdown Logistics / Build Log / GitHub + Vercel / {GH_REPO}
          </div>
        </div>
      </div>
    </div>
  );
}
