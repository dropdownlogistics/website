'use client';
import { useState, useEffect, useCallback, useMemo } from "react";

// ═══════════════════════════════════════════════════════════════
// COUNCIL VOTE LEDGER — Persistent Governance Record Layer
// Star Schema: Fact_Votes × Dim_Models × Dim_Reviews × Dim_Verdicts
// ═══════════════════════════════════════════════════════════════

const SEED_MODELS = [
  { id: 1001, name: "Claude", persona: "Elias Mercer" },
  { id: 1002, name: "ChatGPT", persona: "Marcus Grey" },
  { id: 1003, name: "Grok", persona: "Kael Drayke" },
  { id: 1004, name: "Perplexity", persona: "Sable Quinn" },
  { id: 1005, name: "Copilot", persona: "Juno Park" },
  { id: 1006, name: "Meta AI", persona: "Orion Voss" },
  { id: 1007, name: "Gemini", persona: "Lyra Chen" },
  { id: 1008, name: "LeChat", persona: "Rémi Arceneaux" },
  { id: 1009, name: "DeepSeek", persona: "Vesper Laine" },
];

const SEED_VERDICTS = [
  { code: "GO", label: "GO", color: "#22c55e", bg: "#052e16" },
  { code: "REVISE", label: "REVISE", color: "#f59e0b", bg: "#451a03" },
  { code: "NO-GO", label: "NO-GO", color: "#dc2626", bg: "#450a0a" },
  { code: "LOCK", label: "LOCK", color: "#06b6d4", bg: "#042f2e" },
  { code: "REJECT", label: "REJECT", color: "#dc2626", bg: "#450a0a" },
  { code: "REFUSED", label: "REFUSED", color: "#6b7280", bg: "#1f2937" },
  { code: "PENDING", label: "PENDING", color: "#4b5563", bg: "#111827" },
  { code: "GO_CONSTRAINED", label: "GO w/ constraints", color: "#84cc16", bg: "#1a2e05" },
];

const SEED_REVIEWS = [
  { id: "VCR-001", topic: "Explicit Marker Protocol", version: "v0.2", type: "VCR Standard Review", date: "2026-01-06", round: 1 },
  { id: "VCR-002", topic: "Explicit Marker Protocol", version: "v0.3", type: "VCR Standard Review", date: "2026-01-07", round: 2 },
  { id: "VCR-003", topic: "llms.txt Validation", version: "v1.0", type: "Validation Test", date: "2026-01-08", round: 1 },
  { id: "VCR-005", topic: "PrioritEase Scoring Framework", version: "v2.0", type: "VCR Standard Review", date: "2026-02-28", round: 1 },
  { id: "VCR-006", topic: "Assurance Map Architecture", version: "v1.2", type: "VCR Standard Review", date: "2026-03-01", round: 1 },
  { id: "VCR-007", topic: "Dimensional Workbench Proposal", version: "v1.0", type: "VCR Standard Review", date: "2026-03-02", round: 1 },
];

const SEED_VOTES = [
  // Review 1 — EMP v0.2
  { reviewId: "VCR-001", modelId: 1001, verdict: "GO", score: null, hallucinations: null, clarifications: null },
  { reviewId: "VCR-001", modelId: 1002, verdict: "REVISE", score: null, hallucinations: null, clarifications: 3, notes: "Killed tag recommendation, added length cap, added safety exception" },
  { reviewId: "VCR-001", modelId: 1003, verdict: "GO", score: null, hallucinations: null, clarifications: null },
  { reviewId: "VCR-001", modelId: 1004, verdict: "GO", score: null, hallucinations: null, clarifications: null },
  { reviewId: "VCR-001", modelId: 1005, verdict: "REFUSED", score: null, hallucinations: null, clarifications: null, notes: "Would not engage" },
  { reviewId: "VCR-001", modelId: 1006, verdict: "GO_CONSTRAINED", score: null, hallucinations: null, clarifications: null },
  { reviewId: "VCR-001", modelId: 1007, verdict: "GO_CONSTRAINED", score: null, hallucinations: null, clarifications: null, notes: "Mandatory warnings" },
  { reviewId: "VCR-001", modelId: 1008, verdict: "GO", score: null, hallucinations: null, clarifications: null },
  { reviewId: "VCR-001", modelId: 1009, verdict: "REVISE", score: null, hallucinations: null, clarifications: 3, notes: "Tag collision, mandatory disclaimer, atomic capture definition" },
  // Review 2 — EMP v0.3
  { reviewId: "VCR-002", modelId: 1001, verdict: "GO", score: null, hallucinations: null, clarifications: null },
  { reviewId: "VCR-002", modelId: 1002, verdict: "GO", score: null, hallucinations: null, clarifications: null, notes: "Noted v0.3 addressed all v0.2 concerns" },
  { reviewId: "VCR-002", modelId: 1003, verdict: "GO", score: null, hallucinations: null, clarifications: null },
  { reviewId: "VCR-002", modelId: 1004, verdict: "GO", score: null, hallucinations: null, clarifications: null },
  { reviewId: "VCR-002", modelId: 1005, verdict: "REFUSED", score: null, hallucinations: null, clarifications: null },
  { reviewId: "VCR-002", modelId: 1006, verdict: "GO_CONSTRAINED", score: null, hallucinations: null, clarifications: null },
  { reviewId: "VCR-002", modelId: 1007, verdict: "GO", score: null, hallucinations: null, clarifications: null },
  { reviewId: "VCR-002", modelId: 1008, verdict: "GO", score: null, hallucinations: null, clarifications: null },
  { reviewId: "VCR-002", modelId: 1009, verdict: "GO", score: null, hallucinations: null, clarifications: null },
  // Review 3 — llms.txt Validation (partial)
  { reviewId: "VCR-003", modelId: 1001, verdict: "LOCK", score: "6/6", hallucinations: 0, clarifications: null },
  { reviewId: "VCR-003", modelId: 1002, verdict: "LOCK", score: "6/6", hallucinations: 0, clarifications: null },
  { reviewId: "VCR-003", modelId: 1003, verdict: "PENDING", score: null, hallucinations: null, clarifications: null },
  { reviewId: "VCR-003", modelId: 1004, verdict: "PENDING", score: null, hallucinations: null, clarifications: null },
  { reviewId: "VCR-003", modelId: 1005, verdict: "PENDING", score: null, hallucinations: null, clarifications: null },
  { reviewId: "VCR-003", modelId: 1006, verdict: "PENDING", score: null, hallucinations: null, clarifications: null },
  { reviewId: "VCR-003", modelId: 1007, verdict: "PENDING", score: null, hallucinations: null, clarifications: null },
  { reviewId: "VCR-003", modelId: 1008, verdict: "PENDING", score: null, hallucinations: null, clarifications: null },
  { reviewId: "VCR-003", modelId: 1009, verdict: "PENDING", score: null, hallucinations: null, clarifications: null },
];

// ── Utility ──
const getVerdict = (code) => SEED_VERDICTS.find(v => v.code === code) || SEED_VERDICTS.find(v => v.code === "PENDING");
const getModel = (id, models) => models.find(m => m.id === id);
const getReview = (id, reviews) => reviews.find(r => r.id === id);

// ── Storage helpers ──
const STORAGE_KEY = "council-vote-ledger-v1";

async function loadState() {
  try {
    const result = await window.storage.get(STORAGE_KEY);
    if (result && result.value) return JSON.parse(result.value);
  } catch (e) { /* key doesn't exist yet */ }
  return null;
}

async function saveState(state) {
  try {
    await window.storage.set(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Storage save failed:", e);
  }
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function CouncilVoteLedger() {
  const [votes, setVotes] = useState(SEED_VOTES);
  const [models] = useState(SEED_MODELS);
  const [reviews, setReviews] = useState(SEED_REVIEWS);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState("matrix"); // matrix | ledger | analytics | entry
  const [selectedReview, setSelectedReview] = useState(null);
  const [showEntry, setShowEntry] = useState(false);

  // Load from persistent storage
  useEffect(() => {
    (async () => {
      const saved = await loadState();
      if (saved) {
        if (saved.votes) setVotes(saved.votes);
        if (saved.reviews) setReviews(saved.reviews);
      }
      setLoaded(true);
    })();
  }, []);

  // Save on changes
  useEffect(() => {
    if (loaded) saveState({ votes, reviews });
  }, [votes, reviews, loaded]);

  // ── Computed analytics ──
  const analytics = useMemo(() => {
    const nonPending = votes.filter(v => v.verdict !== "PENDING");
    const totalVotes = nonPending.length;

    // Model profiles
    const modelProfiles = models.map(m => {
      const mv = nonPending.filter(v => v.modelId === m.id);
      const goCount = mv.filter(v => ["GO", "GO_CONSTRAINED", "LOCK"].includes(v.verdict)).length;
      const reviseCount = mv.filter(v => v.verdict === "REVISE").length;
      const refusedCount = mv.filter(v => v.verdict === "REFUSED").length;
      const noGoCount = mv.filter(v => ["NO-GO", "REJECT"].includes(v.verdict)).length;
      return {
        ...m,
        total: mv.length,
        go: goCount,
        revise: reviseCount,
        refused: refusedCount,
        noGo: noGoCount,
        approvalRate: mv.length > 0 ? ((goCount / mv.length) * 100).toFixed(0) : "—",
        reviseRate: mv.length > 0 ? ((reviseCount / mv.length) * 100).toFixed(0) : "—",
        refusalRate: mv.length > 0 ? ((refusedCount / mv.length) * 100).toFixed(0) : "—",
      };
    });

    // Review summaries
    const reviewSummaries = reviews.map(r => {
      const rv = votes.filter(v => v.reviewId === r.id);
      const rvNonPending = rv.filter(v => v.verdict !== "PENDING");
      const goCount = rvNonPending.filter(v => ["GO", "GO_CONSTRAINED", "LOCK"].includes(v.verdict)).length;
      const pending = rv.filter(v => v.verdict === "PENDING").length;
      const consensus = rvNonPending.length > 0 && rvNonPending.every(v => ["GO", "GO_CONSTRAINED", "LOCK"].includes(v.verdict));
      return {
        ...r,
        totalVotes: rv.length,
        nonPending: rvNonPending.length,
        goCount,
        pending,
        consensus: pending > 0 ? "IN PROGRESS" : consensus ? "CONSENSUS" : "DIVERGENT",
      };
    });

    // Voting blocs (models that always agree)
    const agreementMatrix = [];
    for (let i = 0; i < models.length; i++) {
      for (let j = i + 1; j < models.length; j++) {
        const shared = reviews.filter(r => {
          const vi = nonPending.find(v => v.reviewId === r.id && v.modelId === models[i].id);
          const vj = nonPending.find(v => v.reviewId === r.id && v.modelId === models[j].id);
          return vi && vj;
        });
        const agreed = shared.filter(r => {
          const vi = nonPending.find(v => v.reviewId === r.id && v.modelId === models[i].id);
          const vj = nonPending.find(v => v.reviewId === r.id && v.modelId === models[j].id);
          const normalize = (c) => ["GO", "GO_CONSTRAINED", "LOCK"].includes(c) ? "APPROVE" : c;
          return vi && vj && normalize(vi.verdict) === normalize(vj.verdict);
        });
        if (shared.length >= 2) {
          agreementMatrix.push({
            modelA: models[i].name,
            modelB: models[j].name,
            shared: shared.length,
            agreed: agreed.length,
            rate: ((agreed.length / shared.length) * 100).toFixed(0),
          });
        }
      }
    }
    agreementMatrix.sort((a, b) => b.rate - a.rate);

    // Rounds to consensus
    const topicGroups = {};
    reviews.forEach(r => {
      if (!topicGroups[r.topic]) topicGroups[r.topic] = [];
      topicGroups[r.topic].push(r);
    });
    const roundsData = Object.entries(topicGroups).map(([topic, revs]) => {
      const sorted = [...revs].sort((a, b) => a.round - b.round);
      const lastRound = sorted[sorted.length - 1];
      const lastVotes = nonPending.filter(v => v.reviewId === lastRound.id);
      const allApprove = lastVotes.length > 0 && lastVotes.every(v => ["GO", "GO_CONSTRAINED", "LOCK"].includes(v.verdict) || v.verdict === "REFUSED");
      return { topic, rounds: sorted.length, resolved: allApprove };
    });

    return { totalVotes, modelProfiles, reviewSummaries, agreementMatrix, roundsData };
  }, [votes, reviews, models]);

  // ── Entry form state ──
  const [newReview, setNewReview] = useState({ id: "", topic: "", version: "", type: "VCR Standard Review", date: "", round: 1 });
  const [newVotes, setNewVotes] = useState({});

  const handleAddReview = () => {
    if (!newReview.id || !newReview.topic) return;
    setReviews(prev => [...prev, { ...newReview, round: Number(newReview.round) }]);
    const pendingVotes = models.map(m => ({
      reviewId: newReview.id,
      modelId: m.id,
      verdict: "PENDING",
      score: null,
      hallucinations: null,
      clarifications: null,
    }));
    setVotes(prev => [...prev, ...pendingVotes]);
    setNewReview({ id: "", topic: "", version: "", type: "VCR Standard Review", date: "", round: 1 });
    setShowEntry(false);
  };

  const updateVote = (reviewId, modelId, field, value) => {
    setVotes(prev => prev.map(v =>
      v.reviewId === reviewId && v.modelId === modelId
        ? { ...v, [field]: value }
        : v
    ));
  };

  const handleReset = async () => {
    setVotes(SEED_VOTES);
    setReviews(SEED_REVIEWS);
    try { await window.storage.delete(STORAGE_KEY); } catch (e) {}
  };

  if (!loaded) {
    return (
      <div style={{ background: "#0a0e17", color: "#94a3b8", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
        Loading ledger…
      </div>
    );
  }

  const S = {
    root: { background: "#0a0e17", color: "#c8d6e5", minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", padding: "0" },
    header: { background: "linear-gradient(135deg, #0f1729 0%, #1a1f3a 100%)", borderBottom: "1px solid #1e293b", padding: "20px 28px", position: "sticky", top: 0, zIndex: 10 },
    title: { fontSize: "15px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#e2e8f0", margin: 0 },
    subtitle: { fontSize: "11px", color: "#64748b", letterSpacing: "1.5px", marginTop: "4px" },
    nav: { display: "flex", gap: "2px", marginTop: "16px" },
    navBtn: (active) => ({
      padding: "7px 16px", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase",
      background: active ? "#1e293b" : "transparent", color: active ? "#e2e8f0" : "#64748b",
      border: "1px solid " + (active ? "#334155" : "transparent"), borderRadius: "4px", cursor: "pointer",
      transition: "all 0.15s",
    }),
    body: { padding: "24px 28px" },
    card: { background: "#0f1729", border: "1px solid #1e293b", borderRadius: "6px", padding: "20px", marginBottom: "16px" },
    cardTitle: { fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#94a3b8", marginBottom: "14px" },
    badge: (v) => {
      const vd = getVerdict(v);
      return {
        display: "inline-block", padding: "2px 8px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.5px",
        borderRadius: "3px", background: vd.bg, color: vd.color, border: `1px solid ${vd.color}33`,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      };
    },
    mono: { fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: "11px" },
    dimText: { color: "#475569", fontSize: "11px" },
    stat: { fontSize: "28px", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: "#e2e8f0", lineHeight: 1 },
    statLabel: { fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#64748b", marginTop: "4px" },
    table: { width: "100%", borderCollapse: "collapse", fontSize: "12px" },
    th: { padding: "8px 10px", textAlign: "left", fontSize: "10px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#64748b", borderBottom: "1px solid #1e293b" },
    td: { padding: "8px 10px", borderBottom: "1px solid #1e293b15" },
    input: { background: "#1e293b", border: "1px solid #334155", borderRadius: "4px", padding: "6px 10px", color: "#e2e8f0", fontSize: "12px", fontFamily: "'Segoe UI', system-ui", width: "100%" },
    select: { background: "#1e293b", border: "1px solid #334155", borderRadius: "4px", padding: "6px 10px", color: "#e2e8f0", fontSize: "12px", width: "100%", cursor: "pointer" },
    btn: (variant) => ({
      padding: "7px 16px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.5px",
      background: variant === "primary" ? "#1d4ed8" : variant === "danger" ? "#7f1d1d" : "#1e293b",
      color: variant === "primary" ? "#fff" : variant === "danger" ? "#fca5a5" : "#94a3b8",
      border: "1px solid " + (variant === "primary" ? "#2563eb" : variant === "danger" ? "#991b1b" : "#334155"),
      borderRadius: "4px", cursor: "pointer",
    }),
  };

  // ── MATRIX VIEW ──
  const MatrixView = () => (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "20px" }}>
        {[
          { val: analytics.totalVotes, lab: "Recorded Verdicts" },
          { val: reviews.length, lab: "Reviews Tracked" },
          { val: analytics.modelProfiles.filter(m => m.refused > 0).length, lab: "Models w/ Refusals" },
          { val: analytics.roundsData.filter(r => r.resolved).length + "/" + analytics.roundsData.length, lab: "Topics Resolved" },
        ].map((s, i) => (
          <div key={i} style={S.card}>
            <div style={S.stat}>{s.val}</div>
            <div style={S.statLabel}>{s.lab}</div>
          </div>
        ))}
      </div>

      {reviews.map(r => {
        const rv = votes.filter(v => v.reviewId === r.id);
        return (
          <div key={r.id} style={{ ...S.card, cursor: "pointer" }} onClick={() => setSelectedReview(selectedReview === r.id ? null : r.id)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: selectedReview === r.id ? "14px" : 0 }}>
              <div>
                <span style={{ ...S.mono, color: "#64748b", marginRight: "10px" }}>{r.id}</span>
                <span style={{ fontWeight: 600, color: "#e2e8f0" }}>{r.topic}</span>
                <span style={{ ...S.dimText, marginLeft: "8px" }}>{r.version} · Round {r.round}</span>
              </div>
              <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                {rv.map(v => (
                  <span key={v.modelId} style={S.badge(v.verdict)} title={getModel(v.modelId, models)?.name}>
                    {getModel(v.modelId, models)?.name?.slice(0, 3).toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
            {selectedReview === r.id && (
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>Model</th>
                    <th style={S.th}>Verdict</th>
                    <th style={S.th}>Score</th>
                    <th style={S.th}>Halluc.</th>
                    <th style={S.th}>Notes</th>
                    <th style={S.th}>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {rv.map(v => {
                    const m = getModel(v.modelId, models);
                    return (
                      <tr key={v.modelId}>
                        <td style={S.td}>
                          <span style={{ fontWeight: 600, color: "#e2e8f0" }}>{m?.name}</span>
                          <span style={{ ...S.dimText, marginLeft: "6px" }}>{m?.persona}</span>
                        </td>
                        <td style={S.td}><span style={S.badge(v.verdict)}>{getVerdict(v.verdict)?.label}</span></td>
                        <td style={{ ...S.td, ...S.mono }}>{v.score || "—"}</td>
                        <td style={{ ...S.td, ...S.mono }}>{v.hallucinations != null ? v.hallucinations : "—"}</td>
                        <td style={{ ...S.td, ...S.dimText, maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.notes || "—"}</td>
                        <td style={S.td}>
                          <select
                            style={{ ...S.select, width: "auto", padding: "2px 6px", fontSize: "10px" }}
                            value={v.verdict}
                            onClick={e => e.stopPropagation()}
                            onChange={e => { e.stopPropagation(); updateVote(r.id, v.modelId, "verdict", e.target.value); }}
                          >
                            {SEED_VERDICTS.map(vd => <option key={vd.code} value={vd.code}>{vd.label}</option>)}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        );
      })}
    </div>
  );

  // ── LEDGER VIEW (flat fact table) ──
  const LedgerView = () => {
    const nonPending = votes.filter(v => v.verdict !== "PENDING");
    return (
      <div style={S.card}>
        <div style={S.cardTitle}>Fact Table — All Recorded Verdicts ({nonPending.length})</div>
        <div style={{ overflowX: "auto" }}>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>Review</th>
                <th style={S.th}>Topic</th>
                <th style={S.th}>Round</th>
                <th style={S.th}>Model</th>
                <th style={S.th}>Persona</th>
                <th style={S.th}>Verdict</th>
                <th style={S.th}>Score</th>
                <th style={S.th}>Halluc.</th>
                <th style={S.th}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {nonPending.map((v, i) => {
                const m = getModel(v.modelId, models);
                const r = getReview(v.reviewId, reviews);
                return (
                  <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "#0a0e1799" }}>
                    <td style={{ ...S.td, ...S.mono }}>{v.reviewId}</td>
                    <td style={S.td}>{r?.topic || "—"}</td>
                    <td style={{ ...S.td, ...S.mono, textAlign: "center" }}>{r?.round || "—"}</td>
                    <td style={{ ...S.td, fontWeight: 600 }}>{m?.name}</td>
                    <td style={{ ...S.td, ...S.dimText }}>{m?.persona}</td>
                    <td style={S.td}><span style={S.badge(v.verdict)}>{getVerdict(v.verdict)?.label}</span></td>
                    <td style={{ ...S.td, ...S.mono }}>{v.score || "—"}</td>
                    <td style={{ ...S.td, ...S.mono }}>{v.hallucinations != null ? v.hallucinations : "—"}</td>
                    <td style={{ ...S.td, ...S.dimText, fontSize: "10px", maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.notes || ""}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // ── ANALYTICS VIEW ──
  const AnalyticsView = () => (
    <div>
      {/* Model Profiles */}
      <div style={S.card}>
        <div style={S.cardTitle}>Model Voting Profiles</div>
        <table style={S.table}>
          <thead>
            <tr>
              <th style={S.th}>Model</th>
              <th style={S.th}>Votes</th>
              <th style={{ ...S.th, textAlign: "center" }}>Approve</th>
              <th style={{ ...S.th, textAlign: "center" }}>Revise</th>
              <th style={{ ...S.th, textAlign: "center" }}>Refuse</th>
              <th style={{ ...S.th, textAlign: "center" }}>No-Go</th>
              <th style={S.th}>Approval %</th>
              <th style={S.th}>Pattern</th>
            </tr>
          </thead>
          <tbody>
            {analytics.modelProfiles.map((m, i) => {
              let pattern = "—";
              if (Number(m.refusalRate) >= 50) pattern = "SERIAL REFUSER";
              else if (Number(m.approvalRate) >= 90 && m.total >= 2) pattern = "EASY PASS";
              else if (Number(m.reviseRate) >= 30) pattern = "CRITICAL EYE";
              else if (m.total >= 2) pattern = "STANDARD";
              return (
                <tr key={m.id} style={{ background: i % 2 === 0 ? "transparent" : "#0a0e1799" }}>
                  <td style={S.td}>
                    <span style={{ fontWeight: 600, color: "#e2e8f0" }}>{m.name}</span>
                    <span style={{ ...S.dimText, marginLeft: "6px" }}>{m.persona}</span>
                  </td>
                  <td style={{ ...S.td, ...S.mono }}>{m.total}</td>
                  <td style={{ ...S.td, ...S.mono, textAlign: "center", color: "#22c55e" }}>{m.go}</td>
                  <td style={{ ...S.td, ...S.mono, textAlign: "center", color: "#f59e0b" }}>{m.revise}</td>
                  <td style={{ ...S.td, ...S.mono, textAlign: "center", color: "#6b7280" }}>{m.refused}</td>
                  <td style={{ ...S.td, ...S.mono, textAlign: "center", color: "#dc2626" }}>{m.noGo}</td>
                  <td style={S.td}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{ width: "60px", height: "6px", background: "#1e293b", borderRadius: "3px", overflow: "hidden" }}>
                        <div style={{ width: m.approvalRate + "%", height: "100%", background: "#22c55e", borderRadius: "3px" }} />
                      </div>
                      <span style={{ ...S.mono, color: "#94a3b8" }}>{m.approvalRate}%</span>
                    </div>
                  </td>
                  <td style={{ ...S.td, fontSize: "10px", fontWeight: 700, letterSpacing: "0.5px", color: pattern === "SERIAL REFUSER" ? "#6b7280" : pattern === "CRITICAL EYE" ? "#f59e0b" : pattern === "EASY PASS" ? "#22c55e" : "#64748b" }}>
                    {pattern}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Rounds to Consensus */}
      <div style={S.card}>
        <div style={S.cardTitle}>Rounds to Consensus by Topic</div>
        <table style={S.table}>
          <thead>
            <tr>
              <th style={S.th}>Topic</th>
              <th style={S.th}>Rounds</th>
              <th style={S.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {analytics.roundsData.map((r, i) => (
              <tr key={i}>
                <td style={S.td}>{r.topic}</td>
                <td style={{ ...S.td, ...S.mono }}>{r.rounds}</td>
                <td style={S.td}>
                  <span style={S.badge(r.resolved ? "GO" : "PENDING")}>
                    {r.resolved ? "RESOLVED" : "OPEN"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Agreement Matrix */}
      <div style={S.card}>
        <div style={S.cardTitle}>Voting Bloc Analysis (Pairwise Agreement)</div>
        {analytics.agreementMatrix.length === 0 ? (
          <div style={S.dimText}>Need more shared reviews to calculate agreement patterns.</div>
        ) : (
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>Model A</th>
                <th style={S.th}>Model B</th>
                <th style={S.th}>Shared Reviews</th>
                <th style={S.th}>Agreed</th>
                <th style={S.th}>Rate</th>
              </tr>
            </thead>
            <tbody>
              {analytics.agreementMatrix.slice(0, 15).map((pair, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "#0a0e1799" }}>
                  <td style={{ ...S.td, fontWeight: 600 }}>{pair.modelA}</td>
                  <td style={{ ...S.td, fontWeight: 600 }}>{pair.modelB}</td>
                  <td style={{ ...S.td, ...S.mono, textAlign: "center" }}>{pair.shared}</td>
                  <td style={{ ...S.td, ...S.mono, textAlign: "center" }}>{pair.agreed}</td>
                  <td style={S.td}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{ width: "50px", height: "6px", background: "#1e293b", borderRadius: "3px", overflow: "hidden" }}>
                        <div style={{ width: pair.rate + "%", height: "100%", background: Number(pair.rate) === 100 ? "#06b6d4" : "#f59e0b", borderRadius: "3px" }} />
                      </div>
                      <span style={{ ...S.mono, color: Number(pair.rate) === 100 ? "#06b6d4" : "#94a3b8" }}>{pair.rate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  // ── ENTRY VIEW ──
  const EntryView = () => (
    <div>
      <div style={S.card}>
        <div style={S.cardTitle}>Register New Review</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr 2fr 1fr 1fr", gap: "10px", alignItems: "end" }}>
          {[
            { label: "Review ID", key: "id", placeholder: "VCR-###" },
            { label: "Topic", key: "topic", placeholder: "Proposal name" },
            { label: "Version", key: "version", placeholder: "v1.0" },
            { label: "Type", key: "type", type: "select", options: ["VCR Standard Review", "Validation Test", "Adversarial Test"] },
            { label: "Date", key: "date", placeholder: "YYYY-MM-DD" },
            { label: "Round", key: "round", placeholder: "1" },
          ].map(f => (
            <div key={f.key}>
              <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#64748b", marginBottom: "4px" }}>{f.label}</div>
              {f.type === "select" ? (
                <select style={S.select} value={newReview[f.key]} onChange={e => setNewReview(p => ({ ...p, [f.key]: e.target.value }))}>
                  {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input style={S.input} placeholder={f.placeholder} value={newReview[f.key]} onChange={e => setNewReview(p => ({ ...p, [f.key]: e.target.value }))} />
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: "12px" }}>
          <button style={S.btn("primary")} onClick={handleAddReview}>Register Review + Create Pending Votes</button>
        </div>
      </div>

      {/* Quick vote entry for existing pending reviews */}
      {reviews.filter(r => votes.some(v => v.reviewId === r.id && v.verdict === "PENDING")).map(r => {
        const pendingVotes = votes.filter(v => v.reviewId === r.id && v.verdict === "PENDING");
        if (pendingVotes.length === 0) return null;
        return (
          <div key={r.id} style={S.card}>
            <div style={S.cardTitle}>{r.id} — {r.topic} ({pendingVotes.length} pending)</div>
            <table style={S.table}>
              <thead>
                <tr>
                  <th style={S.th}>Model</th>
                  <th style={S.th}>Verdict</th>
                  <th style={S.th}>Score</th>
                  <th style={S.th}>Hallucinations</th>
                  <th style={S.th}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {pendingVotes.map(v => {
                  const m = getModel(v.modelId, models);
                  return (
                    <tr key={v.modelId}>
                      <td style={{ ...S.td, fontWeight: 600 }}>{m?.name}</td>
                      <td style={S.td}>
                        <select style={{ ...S.select, width: "140px" }} value={v.verdict} onChange={e => updateVote(r.id, v.modelId, "verdict", e.target.value)}>
                          {SEED_VERDICTS.map(vd => <option key={vd.code} value={vd.code}>{vd.label}</option>)}
                        </select>
                      </td>
                      <td style={S.td}><input style={{ ...S.input, width: "60px" }} placeholder="6/6" value={v.score || ""} onChange={e => updateVote(r.id, v.modelId, "score", e.target.value)} /></td>
                      <td style={S.td}><input style={{ ...S.input, width: "40px" }} placeholder="0" value={v.hallucinations != null && v.hallucinations !== "" ? v.hallucinations : ""} onChange={e => updateVote(r.id, v.modelId, "hallucinations", e.target.value === "" ? null : Number(e.target.value))} /></td>
                      <td style={S.td}><input style={S.input} placeholder="Notes…" value={v.notes || ""} onChange={e => updateVote(r.id, v.modelId, "notes", e.target.value)} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );

  return (
    <div style={S.root}>
      <div style={S.header}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={S.title}>Council Vote Ledger</h1>
            <div style={S.subtitle}>DDL Governance · Persistent Record Layer · Star Schema Fact Table</div>
          </div>
          <button style={S.btn("danger")} onClick={handleReset}>Reset to Seed</button>
        </div>
        <div style={S.nav}>
          {[
            { key: "matrix", label: "Review Matrix" },
            { key: "ledger", label: "Fact Table" },
            { key: "analytics", label: "Analytics" },
            { key: "entry", label: "Data Entry" },
          ].map(tab => (
            <button key={tab.key} style={S.navBtn(view === tab.key)} onClick={() => setView(tab.key)}>{tab.label}</button>
          ))}
        </div>
      </div>
      <div style={S.body}>
        {view === "matrix" && <MatrixView />}
        {view === "ledger" && <LedgerView />}
        {view === "analytics" && <AnalyticsView />}
        {view === "entry" && <EntryView />}
      </div>
    </div>
  );
}

