'use client';
import { useState, useEffect, useCallback } from 'react';

// ═══════════════════════════════════════════════════════════
// CottageHumble Tokens
// ═══════════════════════════════════════════════════════════
const C = {
  navy: "#0D1B2A",
  card: "#10202f",
  cream: "#F5F1EB",
  creamHigh: "rgba(245,241,235,0.85)",
  creamMid: "rgba(245,241,235,0.55)",
  creamDim: "rgba(245,241,235,0.3)",
  creamGhost: "rgba(245,241,235,0.08)",
  border: "rgba(245,241,235,0.06)",
  green: "#4A9E6B",
  greenDim: "rgba(74,158,107,0.15)",
  amber: "#C49A3C",
  amberDim: "rgba(196,154,60,0.15)",
  steel: "#6B7B8D",
  crimson: "#B23531",
  crimsonDim: "rgba(178,53,49,0.15)",
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

// ═══════════════════════════════════════════════════════════
// Site names for loading skeleton
// ═══════════════════════════════════════════════════════════
const SITE_NAMES = [
  "mykidztoys.com", "fatbraintoys.com", "bonjourfete.com", "scheels.com",
  "toysandsweets.com", "christianbook.com", "playtherapysupply.com",
  "staples.com", "educationmakesthedifference.com", "pharmfavorites.com",
  "bingsdsm.com", "twirlsandtwigs.com", "booksamillion.com", "safariltd.com",
  "redballoon.com", "barnesandnoble.com", "theprizebooth.com",
  "shopsmallscreendesigns.com", "buttercuplynne.com",
];

// ═══════════════════════════════════════════════════════════
// Status badge styles
// ═══════════════════════════════════════════════════════════
const STATUS_STYLES = {
  IN_STOCK: { bg: C.green, text: "#fff", label: "IN STOCK \u2713" },
  OUT: { bg: C.steel, text: "#fff", label: "OUT OF STOCK" },
  CHECK_MANUALLY: { bg: "transparent", text: C.amber, border: C.amber, label: "CHECK MANUALLY" },
  ERROR: { bg: "transparent", text: C.crimson, border: C.crimson, label: "ERROR" },
  LOADING: { bg: C.creamGhost, text: C.creamDim, label: "CHECKING..." },
};

// ═══════════════════════════════════════════════════════════
// Components
// ═══════════════════════════════════════════════════════════

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.ERROR;
  return (
    <span style={{
      display: "inline-block", fontFamily: font.mono, fontSize: 10,
      fontWeight: 600, letterSpacing: "0.08em", padding: "4px 10px",
      borderRadius: 4, background: s.bg, color: s.text,
      border: s.border ? `1px solid ${s.border}` : "none",
    }}>
      {s.label}
    </span>
  );
}

function SiteTile({ site, loading }) {
  const status = loading ? "LOADING" : site?.status;

  return (
    <div style={{
      background: C.card, border: `1px solid ${C.border}`, borderRadius: 8,
      padding: "16px 14px 14px", display: "flex", flexDirection: "column",
      gap: 8, transition: "border-color 0.2s",
      borderColor: status === "IN_STOCK" ? "rgba(74,158,107,0.3)" : C.border,
    }}>
      <div style={{
        fontFamily: font.display, fontSize: 14, fontWeight: 700,
        color: C.creamHigh, lineHeight: 1.2,
      }}>
        {site?.name || "..."}
      </div>

      {site?.productName && (
        <div style={{
          fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.3,
        }}>
          {site.productName}
        </div>
      )}

      <StatusBadge status={status} />

      {site?.url && (
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: font.mono, fontSize: 10, color: C.steel,
            textDecoration: "none", marginTop: "auto",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = C.creamMid; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = C.steel; }}
        >
          visit site &#x2197;
        </a>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Page
// ═══���═══════════════════════════════════════════════════════
export default function NeedohWatch() {
  const [sites, setSites] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkedAt, setCheckedAt] = useState(null);
  const [error, setError] = useState(null);

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/needoh/");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSites(data.sites);
      setCheckedAt(data.checkedAt);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchStatus(); }, [fetchStatus]);

  const inStockSites = sites?.filter((s) => s.status === "IN_STOCK") || [];

  return (
    <>
      <meta httpEquiv="refresh" content="900" />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px 80px" }}>
        {/* Header */}
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <h1 style={{
            fontFamily: font.display, fontSize: 28, fontWeight: 700,
            color: C.cream, margin: "0 0 6px",
          }}>
            &#x1F419; Needoh Watch
          </h1>
          <p style={{
            fontFamily: font.body, fontSize: 14, color: C.creamDim, margin: "0 0 16px",
          }}>
            Emily&apos;s private stock tracker &middot; updates on refresh
          </p>

          {checkedAt && (
            <p style={{
              fontFamily: font.mono, fontSize: 11, color: C.creamDim, margin: "0 0 12px",
            }}>
              Last checked: {new Date(checkedAt).toLocaleString()}
            </p>
          )}

          <button
            onClick={fetchStatus}
            disabled={loading}
            style={{
              fontFamily: font.display, fontSize: 14, fontWeight: 600,
              padding: "10px 28px", borderRadius: 6, border: "none",
              background: loading ? C.amberDim : C.amber,
              color: loading ? C.creamDim : C.navy,
              cursor: loading ? "default" : "pointer",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            {loading ? "Checking..." : "Check Now"}
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div style={{
            background: C.crimsonDim, border: `1px solid ${C.crimson}`, borderRadius: 6,
            padding: "12px 16px", marginBottom: 20, fontFamily: font.mono,
            fontSize: 12, color: C.crimson, textAlign: "center",
          }}>
            Failed to fetch: {error}
          </div>
        )}

        {/* In-stock banner */}
        {inStockSites.length > 0 && (
          <div style={{
            background: C.greenDim, border: `1px solid ${C.green}`, borderRadius: 6,
            padding: "12px 16px", marginBottom: 20, fontFamily: font.display,
            fontSize: 14, fontWeight: 600, color: C.green, textAlign: "center",
          }}>
            &#x1F389; {inStockSites.map((s) => s.name).join(", ")} {inStockSites.length === 1 ? "has" : "have"} Needoh in stock!
          </div>
        )}

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 12,
        }}>
          {loading && !sites
            ? SITE_NAMES.map((name) => (
                <SiteTile key={name} site={{ name, url: null }} loading />
              ))
            : sites?.map((site) => (
                <SiteTile key={site.name} site={site} loading={loading} />
              ))
          }
        </div>

        {/* Footer */}
        <p style={{
          fontFamily: font.mono, fontSize: 10, color: C.creamDim,
          textAlign: "center", marginTop: 40, opacity: 0.5,
        }}>
          Watching 19 sites &middot; auto-refreshes every 15 min
        </p>
      </div>
    </>
  );
}
