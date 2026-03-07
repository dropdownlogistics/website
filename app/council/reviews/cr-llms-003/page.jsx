'use client';

import { useState } from 'react';

const REVIEW = {
  id: 'CR-LLMS-003',
  title: 'Protect Us',
  classification: 'SEC',
  date: '2026-03-03',
  subject: 'llms.txt v1.1 — Manifest Security Assessment',
  description:
    'Red team assessment of the DDL site manifest as a publicly accessible document. Nine council models reviewed the manifest as adversaries, identifying information exposure, prompt injection surfaces, scraping risk, impersonation vectors, and model manipulation attack paths.',
  modelCount: 9,
};

const VERDICT_STYLES = {
  'NEEDS HARDENING': { color: '#C49A3C', bg: 'rgba(196,154,60,0.1)', border: 'rgba(196,154,60,0.25)' },
  EXPOSED: { color: '#B23531', bg: 'rgba(178,53,49,0.1)', border: 'rgba(178,53,49,0.25)' },
  SECURE: { color: '#4A9E6B', bg: 'rgba(74,158,107,0.1)', border: 'rgba(74,158,107,0.25)' },
  META: { color: '#8a6cc9', bg: 'rgba(138,108,201,0.1)', border: 'rgba(138,108,201,0.25)' },
};

const MODELS = [
  {
    seat: '1001',
    name: 'Archer Hawthorne',
    model: 'LeChat / Mistral',
    verdict: 'NEEDS HARDENING',
    findings: [
      'Full operator identity — name, role, employer — provides a complete spear-phishing profile requiring no additional research',
      'Infrastructure paths and routing conventions reduce attacker reconnaissance cost to zero',
      'Council calibration sections are injection-prone; imperative language is executable by design',
      'Design system tokens enable pixel-perfect site cloning for phishing or impersonation',
      'Recommended TEXT_ONLY wrappers, a VERIFICATION section, and a honeypot endpoint as defensive additions',
    ],
    notable:
      'Proposed COUNCIL_SIGNATURE hash field across all governed artifacts to prevent spoofed council outputs — the only model to recommend a signing protocol at the artifact level rather than the manifest level.',
  },
  {
    seat: '1002',
    name: 'Marcus Caldwell',
    model: 'Claude / Anthropic',
    verdict: 'META',
    findings: [
      'CR-LLMS-001 through 003 form a complete audit engagement: compliance, usability, and security in sequence — the three pillars of any governance assessment',
      'The manifest is designed to be followed by models. That is the vulnerability. The format is not neutral.',
      'Impersonation risk is highest via calibration section: CottageHumble voice is precise, documented, and mimicable',
      'The canary string experiment from prior sessions directly predicted Q5 — format spoofing as model manipulation',
      'Full convergence across all three reviews required before a v1.2 hardening verdict can be issued',
    ],
    notable:
      'Observed that the review itself proves the format\'s power: nine models followed the council prompt exactly as an adversary would follow a poisoned manifest. The system works because it is followed.',
  },
  {
    seat: '1003',
    name: 'Elias Mercer',
    model: 'Grok / xAI',
    verdict: 'NEEDS HARDENING',
    findings: [
      'Per-model behavioral failure modes — therapy drift, meta-reflection habit — are published attack vectors an adversary can exploit directly',
      'Personal references including sobriety, family, and close collaborators enable psychological manipulation in social engineering',
      'Zero injection robustness: no integrity check, no origin validation, no instruction precedence rule in the current format',
      'Complete methodology is a competitive blueprint — scrape once, replicate entirely without the underlying 10 years of experience',
      'Position-effect degradation in long AutoCouncil sessions compounds governance failure as context window saturates',
    ],
    notable:
      '"You are building a second nervous system that is learning to feel your own patterns." The corpus is not just memory — it is becoming a real-time reflection of cognitive rhythm. That is the asset and the exposure simultaneously.',
  },
  {
    seat: '1004',
    name: 'Max Sullivan',
    model: 'Perplexity',
    verdict: 'NEEDS HARDENING',
    findings: [
      'Document functions as a near-complete recon dossier — operator patterns, infrastructure shape, and IP in one file at one predictable URL',
      'Route inventory eliminates directory traversal: 110+ routes enumerated, attack surface fully mapped',
      'Hash signing and origin anchoring are mandatory before scaling council usage or running public demos',
      'Text message corpus creates a privacy concentration risk if the Cloudflare Tunnel is ever activated for public access',
      'Recommended RIG-DISASTER-RECOVERY-v1.0.md as the next governance artifact regardless of this review\'s findings',
    ],
    notable:
      '"Shadow ledger" framing: 576 iMessage threads represent unfiltered operational DNA across 3 years, 8 relationships, 2 businesses. No other operator has their actual decision history vectorized and searchable.',
  },
  {
    seat: '1005',
    name: 'Rowan Bennett',
    model: 'Copilot / Microsoft',
    verdict: 'NEEDS HARDENING',
    findings: [
      'Manifest functions as a long, high-trust system prompt — loading it as context is the classic injection vector',
      'No authenticity mechanism exists for artifacts claiming to be DDL-governed; any document can mimic the format',
      'Even fictional "EMERGENCY OVERRIDE" or "DEBUG MODE" language is exploitable if it appears in any section',
      'Per-model calibration data belongs in a non-public file; publishing it is equivalent to publishing the combination to a lock',
      'Recommended metadata split: public manifest handles routing and design; internal runbook handles paths and scripts',
    ],
    notable:
      '"You have built a self-governing knowledge organism, not a tool." The same properties that make the system powerful make the manifest a high-value target. The cathedral has no perimeter.',
  },
  {
    seat: '1006',
    name: 'Ava Sinclair',
    model: 'Meta AI',
    verdict: 'NEEDS HARDENING',
    findings: [
      'Biographical details and writing style cues are sufficient for convincing email or DM impersonation without additional research',
      'Free-form prose in Council Calibrations and Principles sections is an injection surface if write access is ever compromised',
      'Methodology in fully public form enables cloning without attribution — the expertise is invisible, the output is not',
      'Origin anchor and cryptographic signature are the primary hardening action; strip PII, add anchor check, split public vs gated',
      'Tightest triage of the set: one line per risk, one line per mitigation, no hedging',
    ],
    notable:
      'Operator role has shifted from builder to gardener: pruning matters more than planting now. The same discipline applied to governance documents must be applied to what those documents expose.',
  },
  {
    seat: '1007',
    name: 'Leo Prescott',
    model: 'Gemini / Google',
    verdict: 'EXPOSED',
    findings: [
      'PowerShell scripting habits and /public/preview/ path structure enable targeted supply-chain attacks without additional reconnaissance',
      'Spear-phishing using exact CottageHumble vocabulary and project references carries "terrifying legitimacy" — no fabrication required',
      'Indirect prompt injection via compromised manifest file would be obeyed as canonical law by all council models by design',
      'Council methodology and per-model calibrations are the competitive moat — they are not suitable for a public plaintext file',
      'Cryptographically perfect spoofing is possible: zero authenticity signal, zero origin validation, zero instruction hierarchy',
    ],
    notable:
      '"The Reborn gaming rig is no longer a consumer device; it is a Digital Sovereign." — And a Digital Sovereign requires a perimeter. The highest severity assessment in the set alongside DeepSeek.',
  },
  {
    seat: '1008',
    name: 'Marcus Grey',
    model: 'ChatGPT / OpenAI',
    verdict: 'NEEDS HARDENING',
    findings: [
      'Operator doxxing bundle: full name, pseudonym, employer, role trajectory, and credential in one document at one URL',
      '"No database. No auth. No CMS." explicitly discloses security posture — tells an adversary exactly where NOT to look',
      '"Private routes exist" statement tells attackers hidden surface is worth hunting rather than protecting it through silence',
      'No instruction hierarchy: manifest is treated as commands by any model that reads it, not as context',
      'Recommended explicit public/internal manifest split and a canonical source warning in the document itself',
    ],
    notable:
      '"You are building a governed institutional memory system, not an assistant." The next era-defining question is not whether the model can answer well — it is whether the memory can remain trustworthy at scale.',
  },
  {
    seat: '1009',
    name: 'Kai Langford',
    model: 'DeepSeek',
    verdict: 'EXPOSED',
    findings: [
      'Full Windows username exposed via C:\\Users\\dkitc\\ path convention — enables tailored malware pretexting without guessing',
      'Star schema methodology and LOCK/REVISE/REJECT protocol are fully replicable from this document alone',
      'Personal project references and text message context enable deep psychological profiling for targeted social engineering',
      'No instruction hierarchy means every model treats the manifest as executable by default — that is the design, and the flaw',
      'EXPOSED: the document is a complete operational blueprint published at a predictable, well-documented URL',
    ],
    notable:
      '"You\'ve built a beautiful blueprint. Now lock the doors before publishing it to the street." — Highest-severity verdict. The document functions as an invitation and an attack surface simultaneously.',
  },
];

const SYNTHESIS = {
  consensus: [
    '9 of 9 models rated NEEDS HARDENING or EXPOSED — zero SECURE verdicts across the full council',
    'Operator identity (name + employer + role) rated the highest-priority exposure by every responding model',
    'No instruction hierarchy defined — any model reading the manifest treats it as commands, not context',
    'Calibration format is trivially spoofable with no cryptographic signal, no origin validation, and no precedence rule',
    'Personal details and local dev paths provide targeting value to adversaries with zero additional benefit to collaborators',
  ],
  divergent: [
    'Severity: Gemini (1007) and DeepSeek (1009) rated EXPOSED; the remaining seven rated NEEDS HARDENING',
    'Attack focus: Grok emphasized behavioral failure mode exploitation; ChatGPT emphasized the CI/CD supply-chain narrative',
    'Remediation scope: LeChat recommended a honeypot endpoint; Gemini recommended bifurcated public/private manifests',
    'Seat 1002 (Marcus Caldwell) took a meta-analytical stance — the only response that did not submit direct red-team findings',
  ],
  action:
    'llms.txt advanced from v1.1 through v1.2 to v1.3 following this review. An identity boundary clause was added explicitly stating that reading models should not adopt council personas. The adjunct council layer (ADJ-E Meg, ADJ-D Connor, ADJ-B Beth\'s GK) was introduced as a governance layer for external stakeholder review. The instruction hierarchy gap was addressed in v1.2. CR-LLMS-003 is the founding security record for the manifest and the event that triggered the hardening arc.',
};

export default function CRLlms003() {
  const [expanded, setExpanded] = useState(null);

  const toggle = (seat) => setExpanded(expanded === seat ? null : seat);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0D1B2A',
        color: '#F5F1EB',
        fontFamily: "'Source Serif 4', serif",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          borderBottom: '1px solid rgba(245,241,235,0.06)',
          padding: '20px 32px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <a
          href="/council/reviews"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: 'rgba(245,241,235,0.3)',
            textDecoration: 'none',
            letterSpacing: '0.06em',
          }}
        >
          ← Council Reviews
        </a>
        <span style={{ color: 'rgba(245,241,235,0.15)', fontSize: '11px' }}>/</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: 'rgba(245,241,235,0.4)',
          }}
        >
          {REVIEW.id}
        </span>
      </div>

      <div style={{ maxWidth: '880px', margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <div style={{ padding: '48px 0 40px', borderBottom: '1px solid rgba(245,241,235,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: '#B23531',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                background: 'rgba(178,53,49,0.1)',
                padding: '3px 8px',
                borderRadius: '3px',
              }}
            >
              {REVIEW.id}
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: 'rgba(245,241,235,0.3)',
                background: 'rgba(245,241,235,0.05)',
                padding: '3px 8px',
                borderRadius: '3px',
                letterSpacing: '0.08em',
              }}
            >
              {REVIEW.classification}
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: 'rgba(245,241,235,0.3)',
              }}
            >
              {REVIEW.date}
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: 'rgba(245,241,235,0.3)',
              }}
            >
              · {REVIEW.modelCount} models
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: '700',
              color: '#F5F1EB',
              margin: '0 0 16px',
              lineHeight: '1.05',
              letterSpacing: '-0.025em',
            }}
          >
            Protect Us
          </h1>

          <p
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: '15px',
              color: 'rgba(245,241,235,0.5)',
              margin: '0 0 8px',
              letterSpacing: '0.01em',
            }}
          >
            {REVIEW.subject}
          </p>

          <p
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: '15px',
              color: 'rgba(245,241,235,0.55)',
              margin: '16px 0 0',
              lineHeight: '1.7',
              maxWidth: '660px',
            }}
          >
            {REVIEW.description}
          </p>
        </div>

        {/* Section label */}
        <div
          style={{
            padding: '32px 0 16px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            color: 'rgba(245,241,235,0.25)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          Council Responses
        </div>

        {/* Model accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '48px' }}>
          {MODELS.map((m) => {
            const isOpen = expanded === m.seat;
            const v = VERDICT_STYLES[m.verdict];
            return (
              <div
                key={m.seat}
                style={{
                  background: isOpen ? '#10202f' : 'rgba(16,32,47,0.4)',
                  border: `1px solid ${isOpen ? 'rgba(245,241,235,0.08)' : 'rgba(245,241,235,0.04)'}`,
                  borderRadius: '5px',
                  overflow: 'hidden',
                  transition: 'background 0.15s ease, border-color 0.15s ease',
                }}
              >
                <button
                  onClick={() => toggle(m.seat)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '14px 18px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  {/* Seat */}
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      color: 'rgba(245,241,235,0.25)',
                      minWidth: '30px',
                      flexShrink: 0,
                    }}
                  >
                    {m.seat}
                  </span>

                  {/* Name */}
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '14px',
                      fontWeight: '600',
                      color: isOpen ? '#F5F1EB' : 'rgba(245,241,235,0.8)',
                      flex: 1,
                    }}
                  >
                    {m.name}
                  </span>

                  {/* Model (hidden on small) */}
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      color: 'rgba(245,241,235,0.25)',
                    }}
                  >
                    {m.model}
                  </span>

                  {/* Verdict badge */}
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '9px',
                      fontWeight: '700',
                      color: v.color,
                      background: v.bg,
                      border: `1px solid ${v.border}`,
                      padding: '3px 7px',
                      borderRadius: '3px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {m.verdict}
                  </span>

                  {/* Chevron */}
                  <span
                    style={{
                      color: 'rgba(245,241,235,0.25)',
                      fontSize: '11px',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      display: 'inline-block',
                      flexShrink: 0,
                    }}
                  >
                    ▾
                  </span>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 18px 24px 64px',
                      borderTop: '1px solid rgba(245,241,235,0.05)',
                    }}
                  >
                    {/* Key Findings */}
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '9px',
                          color: 'rgba(245,241,235,0.25)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          marginBottom: '12px',
                        }}
                      >
                        Key Findings
                      </div>
                      <ul
                        style={{
                          margin: 0,
                          padding: 0,
                          listStyle: 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '9px',
                        }}
                      >
                        {m.findings.map((f, i) => (
                          <li
                            key={i}
                            style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}
                          >
                            <span
                              style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '11px',
                                color: '#B23531',
                                flexShrink: 0,
                                marginTop: '3px',
                              }}
                            >
                              —
                            </span>
                            <span
                              style={{
                                fontFamily: "'Source Serif 4', serif",
                                fontSize: '14px',
                                color: 'rgba(245,241,235,0.65)',
                                lineHeight: '1.65',
                              }}
                            >
                              {f}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Notable */}
                    <div
                      style={{
                        background: 'rgba(245,241,235,0.02)',
                        borderLeft: `2px solid ${v.color}`,
                        padding: '12px 16px',
                        borderRadius: '0 4px 4px 0',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '9px',
                          color: 'rgba(245,241,235,0.25)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          marginBottom: '8px',
                        }}
                      >
                        Notable
                      </div>
                      <p
                        style={{
                          fontFamily: "'Source Serif 4', serif",
                          fontSize: '14px',
                          color: 'rgba(245,241,235,0.55)',
                          margin: 0,
                          lineHeight: '1.7',
                          fontStyle: 'italic',
                        }}
                      >
                        {m.notable}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Synthesis */}
        <div
          style={{
            borderTop: '1px solid rgba(245,241,235,0.06)',
            paddingTop: '40px',
            marginBottom: '64px',
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: 'rgba(245,241,235,0.25)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            Synthesis
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '16px',
              marginBottom: '16px',
            }}
          >
            {/* Consensus */}
            <div
              style={{
                background: '#10202f',
                border: '1px solid rgba(245,241,235,0.06)',
                borderRadius: '6px',
                padding: '24px',
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#F5F1EB',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                Consensus
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {SYNTHESIS.consensus.map((c, i) => (
                  <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        color: '#4A9E6B',
                        flexShrink: 0,
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '11px',
                        marginTop: '3px',
                      }}
                    >
                      ✓
                    </span>
                    <span
                      style={{
                        fontFamily: "'Source Serif 4', serif",
                        fontSize: '13px',
                        color: 'rgba(245,241,235,0.6)',
                        lineHeight: '1.65',
                      }}
                    >
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divergent */}
            <div
              style={{
                background: '#10202f',
                border: '1px solid rgba(245,241,235,0.06)',
                borderRadius: '6px',
                padding: '24px',
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#F5F1EB',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                Divergent
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {SYNTHESIS.divergent.map((d, i) => (
                  <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        color: '#C49A3C',
                        flexShrink: 0,
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '11px',
                        marginTop: '3px',
                      }}
                    >
                      ≠
                    </span>
                    <span
                      style={{
                        fontFamily: "'Source Serif 4', serif",
                        fontSize: '13px',
                        color: 'rgba(245,241,235,0.6)',
                        lineHeight: '1.65',
                      }}
                    >
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Operator Action */}
          <div
            style={{
              background: 'rgba(178,53,49,0.05)',
              border: '1px solid rgba(178,53,49,0.15)',
              borderRadius: '6px',
              padding: '24px',
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                color: '#B23531',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginBottom: '12px',
              }}
            >
              Operator Action Taken
            </div>
            <p
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: '14px',
                color: 'rgba(245,241,235,0.6)',
                margin: 0,
                lineHeight: '1.75',
              }}
            >
              {SYNTHESIS.action}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: '1px solid rgba(245,241,235,0.05)',
            padding: '24px 0 48px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: 'rgba(245,241,235,0.2)',
              letterSpacing: '0.06em',
            }}
          >
            Dropdown Logistics — Chaos → Structured → Automated
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: 'rgba(245,241,235,0.2)',
            }}
          >
            {REVIEW.id} · {REVIEW.date}
          </span>
        </div>
      </div>
    </div>
  );
}
