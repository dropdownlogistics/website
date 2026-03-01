'use client';

import { useEffect, useState, CSSProperties } from 'react';

interface FadeInProps { children: React.ReactNode; delay?: number; style?: CSSProperties; }
function FadeIn({ children, delay = 0, style = {} }: FadeInProps) {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), delay); return () => clearTimeout(t); }, [delay]);
  return <div style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease', ...style }}>{children}</div>;
}

const PLUM = '#6C3B7C'; const TEAL = '#1A8A7D'; const CORAL = '#E05A47'; const AMBER = '#D4920B'; const GREEN = '#1A8A4A'; const NAVY = '#1A2744';

interface KpiData { label: string; value: string; sub: string; color: string; }
interface ExceptionRow { emp: string; id: string; type: string; detail: string; impact: string; impactColor: string; status: string; statusColor: string; statusBg: string; }
interface VendorRow { name: string; detail: string; amount: string; amountColor: string; days: string; daysLate: boolean; }
interface ReconRow { label: string; sub: string; deducted: string; paid: string; match: boolean; }
interface Scenario { tag: string; title: string; desc: string; flag: string; }

const KPIS: KpiData[] = [
  { label: 'Exceptions Found', value: '14', sub: 'across 342 employees', color: CORAL },
  { label: 'Duplicate Deductions', value: '3', sub: '$847.20 over-deducted', color: AMBER },
  { label: 'Enrollment Mismatches', value: '5', sub: 'election ≠ deduction', color: TEAL },
  { label: 'Clean Employees', value: '96%', sub: '328 of 342 no issues', color: GREEN },
  { label: 'Vendor Payments', value: '2 Late', sub: 'of 8 benefit vendors', color: PLUM },
  { label: '$ At Risk', value: '$4,218', sub: 'total exposure this period', color: NAVY },
];

const EXCEPTIONS: ExceptionRow[] = [
  { emp: 'Employee A', id: 'EMP-1047', type: 'Duplicate Deduction', detail: 'Medical-Single AND Medical-Family both active', impact: '$312.40', impactColor: CORAL, status: 'Open', statusColor: CORAL, statusBg: 'rgba(224,90,71,0.12)' },
  { emp: 'Employee B', id: 'EMP-0892', type: 'Enrollment Mismatch', detail: 'Elected: Cancel dental · Deduction: Still active', impact: '$64.80', impactColor: AMBER, status: 'Investigating', statusColor: AMBER, statusBg: 'rgba(212,146,11,0.12)' },
  { emp: 'Employee C', id: 'EMP-1203', type: '401k Remittance Gap', detail: 'Deducted $480 · Not remitted to vendor for 2 periods', impact: '$960.00', impactColor: CORAL, status: 'Open', statusColor: CORAL, statusBg: 'rgba(224,90,71,0.12)' },
  { emp: 'Employee D', id: 'EMP-0654', type: 'Duplicate Deduction', detail: 'Vision plan deducted twice in same pay period', impact: '$23.50', impactColor: AMBER, status: 'Resolved', statusColor: GREEN, statusBg: 'rgba(26,138,74,0.12)' },
  { emp: 'Employee E', id: 'EMP-1089', type: 'Enrollment Mismatch', detail: 'Elected: Family HSA · Deduction: Single HSA rate', impact: '$142.00', impactColor: AMBER, status: 'Investigating', statusColor: AMBER, statusBg: 'rgba(212,146,11,0.12)' },
  { emp: 'Employee F', id: 'EMP-0971', type: 'New Hire Gap', detail: 'Benefits elected Day 1 · Deductions not started until Period 4', impact: '$518.60', impactColor: PLUM, status: 'Review', statusColor: PLUM, statusBg: 'rgba(108,59,124,0.12)' },
];

const VENDORS: VendorRow[] = [
  { name: 'Medical Carrier', detail: 'Medical · 186 enrolled', amount: '$48,240', amountColor: GREEN, days: 'Paid on time', daysLate: false },
  { name: 'Dental Carrier', detail: 'Dental · 142 enrolled', amount: '$6,830', amountColor: CORAL, days: '34 days late', daysLate: true },
  { name: '401k Provider', detail: '401k · 228 enrolled', amount: '$62,400', amountColor: CORAL, days: '18 days late', daysLate: true },
  { name: 'Vision Carrier', detail: 'Vision · 98 enrolled', amount: '$2,940', amountColor: GREEN, days: 'Paid on time', daysLate: false },
  { name: 'Life & STD Carrier', detail: 'Life & STD · 310 enrolled', amount: '$9,300', amountColor: GREEN, days: 'Paid on time', daysLate: false },
];

const RECON: ReconRow[] = [
  { label: 'Medical', sub: 'Carrier A · Current Period', deducted: '$48,240', paid: '$48,240', match: true },
  { label: '401k', sub: '401k Provider · Current Period', deducted: '$62,400', paid: '$0', match: false },
  { label: 'Dental', sub: 'Carrier B · Current Period', deducted: '$6,830', paid: '$0', match: false },
  { label: 'Vision', sub: 'Carrier C · Current Period', deducted: '$2,940', paid: '$2,940', match: true },
];

const SCENARIOS: Scenario[] = [
  { tag: 'Scenario 1', title: '"Duplicate benefits deductions"', desc: 'Employee has Medical-Single AND Medical-Family both active on their deduction profile after open enrollment. PayGuard catches it.', flag: '⚠ FLAG: EMP-1047 · 2 active medical codes · $312.40/period over-deduction' },
  { tag: 'Scenario 2', title: '"401k funds not being paid out to vendors"', desc: 'Deductions taken from employee checks every period. Vendor hasn\'t received payment in 2 periods. $62,400 sitting in limbo.', flag: '⚠ FLAG: 401k Provider · $62,400 deducted · $0 remitted · 18 days past due' },
  { tag: 'Scenario 3', title: '"Canceled medical but deduction still active"', desc: 'Employee elected to cancel dental during open enrollment. Enrollment system updated. Deduction profile was not. Still coming out of their check.', flag: '⚠ FLAG: EMP-0892 · Election: Cancel · Deduction: Active · $64.80/period' },
  { tag: 'Scenario 4', title: '"Past due invoices on benefits"', desc: 'Dental carrier invoice 34 days late. Accounting keeps questioning it. You keep reconciling it. PayGuard shows the pattern — it\'s not a one-time thing, it\'s a systemic gap.', flag: '⚠ FLAG: Dental Carrier · avg payment lag: 28 days · 4 of last 6 months late' },
];

const SCENARIO_BORDERS = [CORAL, AMBER, CORAL, PLUM];

export default function PayGuardPage() {
  return (
    <div style={{ padding: '100px 24px 32px', maxWidth: 1060, margin: '0 auto' }}>
      <FadeIn>
        <a href="/projects" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#B23531', textDecoration: 'none', letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}>← Back to Projects</a>
      </FadeIn>

      <FadeIn delay={100}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 12 }}>DDL Case Study · Analytics Engine</div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: '#F5F1EB', lineHeight: 1.15, marginBottom: 8 }}>
            Pay<span style={{ color: '#2BB5A4' }}>Guard</span>
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '1.15rem', color: 'rgba(245,241,235,0.6)', lineHeight: 1.6, maxWidth: 640 }}>
            Benefits & payroll compliance engine — catching duplicate deductions, enrollment mismatches,
            vendor payment gaps, and remittance drift before they become audit findings or angry employees.
          </p>
        </div>
      </FadeIn>

      {/* QUOTE CARD */}
      <FadeIn delay={150}>
        <div style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 10, padding: '20px 24px', marginBottom: 56, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>💡</span>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.9rem', color: 'rgba(245,241,235,0.55)', lineHeight: 1.7, fontStyle: 'italic' as const }}>
            &ldquo;I wonder if the system could flag things like <strong style={{ color: '#F5F1EB', fontStyle: 'normal' }}>duplicate benefits deductions</strong> or <strong style={{ color: '#F5F1EB', fontStyle: 'normal' }}>401k funds not being paid out to the vendors</strong>... or maybe there&rsquo;s open enrollment and the employee canceled medical but <strong style={{ color: '#F5F1EB', fontStyle: 'normal' }}>it didn&rsquo;t get canceled on their deduction profile</strong>... <strong style={{ color: '#F5F1EB', fontStyle: 'normal' }}>Am I thinking too large?</strong>&rdquo;
            <br /><br />
            <span style={{ fontStyle: 'normal', color: 'rgba(245,241,235,0.4)' }}>No. You&rsquo;re thinking like an auditor. This is what the engine was built for.</span>
          </p>
        </div>
      </FadeIn>

      {/* PROBLEM / APPROACH / DELIVERABLE */}
      <FadeIn delay={200}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 56 }}>
          {[
            { label: 'Problem', text: 'Benefits administration runs on trust — trust that deductions match elections, that vendor invoices match what was withheld, that new hires get enrolled on time. When any of those break, nobody knows until an employee complains or an auditor finds it.' },
            { label: 'Approach', text: 'DDL\'s compliance engine: every deduction, election, remittance, and vendor payment is a fact row. The engine compares what should be happening to what is happening — elections vs. deductions, deductions vs. remittances, expected timing vs. actual timing.' },
            { label: 'Deliverable', text: 'Exception dashboard — KPI strip, flagged exception table with employee-level detail, vendor payment aging tracker, deduction-to-remittance reconciliation, and scenario-based detection for every real-world failure mode the client described.' },
          ].map((item, i) => (
            <div key={i} style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 8, padding: '24px 20px' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#B23531', marginBottom: 8 }}>{item.label}</div>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.9rem', color: 'rgba(245,241,235,0.75)', lineHeight: 1.65 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* KPIs */}
      <FadeIn delay={300}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: PLUM, marginBottom: 8 }}>Exception Dashboard</div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.3rem', color: '#F5F1EB', fontWeight: 600, marginBottom: 20 }}>What PayGuard Found This Pay Period</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(145px, 1fr))', gap: 12 }}>
            {KPIS.map((kpi, i) => (
              <div key={i} style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 10, padding: '20px 16px', textAlign: 'center' as const, borderTop: `3px solid ${kpi.color}` }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: 'rgba(245,241,235,0.35)', marginBottom: 6 }}>{kpi.label}</div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.6rem', fontWeight: 700, color: kpi.color }}>{kpi.value}</div>
                <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.68rem', color: 'rgba(245,241,235,0.35)', marginTop: 3 }}>{kpi.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* EXCEPTION TABLE */}
      <FadeIn delay={400}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: PLUM, marginBottom: 8 }}>Flagged Exceptions</div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.3rem', color: '#F5F1EB', fontWeight: 600, marginBottom: 20 }}>Who, What, and Why</h2>
          <div style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' as const }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' as const, minWidth: 750 }}>
                <thead>
                  <tr>{['Employee', 'ID', 'Exception', 'Detail', '$ Impact', 'Status'].map(h => (
                    <th key={h} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#F5F1EB', background: 'rgba(26,39,68,0.4)', padding: '12px 14px', textAlign: 'left' as const }}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {EXCEPTIONS.map((r, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                      <td style={{ padding: '12px 14px', fontFamily: 'Source Serif 4, serif', fontSize: '0.84rem', color: '#F5F1EB', fontWeight: 600, borderBottom: '1px solid rgba(245,241,235,0.04)' }}>{r.emp}</td>
                      <td style={{ padding: '12px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: 'rgba(245,241,235,0.35)', borderBottom: '1px solid rgba(245,241,235,0.04)' }}>{r.id}</td>
                      <td style={{ padding: '12px 14px', fontFamily: 'Source Serif 4, serif', fontSize: '0.82rem', color: 'rgba(245,241,235,0.6)', borderBottom: '1px solid rgba(245,241,235,0.04)' }}>{r.type}</td>
                      <td style={{ padding: '12px 14px', fontFamily: 'Source Serif 4, serif', fontSize: '0.78rem', color: 'rgba(245,241,235,0.4)', borderBottom: '1px solid rgba(245,241,235,0.04)' }}>{r.detail}</td>
                      <td style={{ padding: '12px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', fontWeight: 600, color: r.impactColor, borderBottom: '1px solid rgba(245,241,235,0.04)' }}>{r.impact}</td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid rgba(245,241,235,0.04)' }}>
                        <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 10, fontSize: '0.62rem', fontWeight: 600, background: r.statusBg, color: r.statusColor }}>{r.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* VENDOR AGING + RECON */}
      <FadeIn delay={500}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 56 }}>
          {/* Vendor Aging */}
          <div style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 10, padding: '24px 20px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: PLUM, marginBottom: 14 }}>Vendor Payment Aging</div>
            {VENDORS.map((v, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < VENDORS.length - 1 ? '1px solid rgba(245,241,235,0.04)' : 'none' }}>
                <div>
                  <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.85rem', color: '#F5F1EB', fontWeight: 500 }}>{v.name}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.3)' }}>{v.detail}</div>
                </div>
                <div style={{ textAlign: 'right' as const }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', fontWeight: 600, color: v.amountColor }}>{v.amount}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: v.daysLate ? CORAL : GREEN, fontWeight: v.daysLate ? 600 : 400 }}>{v.days}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Recon */}
          <div style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.08)', borderRadius: 10, padding: '24px 20px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: PLUM, marginBottom: 14 }}>Deduction ↔ Remittance Reconciliation</div>
            {RECON.map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < RECON.length - 1 ? '1px solid rgba(245,241,235,0.04)' : 'none', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.82rem', color: '#F5F1EB', fontWeight: 500 }}>{r.label}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: 'rgba(245,241,235,0.3)' }}>{r.sub}</div>
                </div>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ textAlign: 'center' as const }}>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(245,241,235,0.6)' }}>{r.deducted}</div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.45rem', color: 'rgba(245,241,235,0.3)', textTransform: 'uppercase' as const, letterSpacing: '0.04em' }}>Deducted</div>
                  </div>
                  <div style={{ textAlign: 'center' as const }}>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', fontWeight: 600, color: r.match ? GREEN : CORAL }}>{r.paid}</div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.45rem', color: 'rgba(245,241,235,0.3)', textTransform: 'uppercase' as const, letterSpacing: '0.04em' }}>Paid</div>
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', fontWeight: 600, color: r.match ? GREEN : CORAL }}>{r.match ? '✓' : '⚠'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* SCENARIOS */}
      <FadeIn delay={600}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: PLUM, marginBottom: 8 }}>Real-World Detection Scenarios</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
            {SCENARIOS.map((s, i) => (
              <div key={i} style={{ background: 'rgba(245,241,235,0.04)', border: '1px solid rgba(245,241,235,0.06)', borderLeft: `3px solid ${SCENARIO_BORDERS[i]}`, borderRadius: 4, padding: '20px 18px' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem', color: 'rgba(245,241,235,0.3)', letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: 6 }}>{s.tag}</div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.88rem', fontWeight: 600, color: '#F5F1EB', marginBottom: 6 }}>{s.title}</h3>
                <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.78rem', color: 'rgba(245,241,235,0.5)', lineHeight: 1.6, marginBottom: 10 }}>{s.desc}</p>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', padding: '6px 10px', background: 'rgba(10,10,16,0.4)', borderRadius: 6, color: 'rgba(245,241,235,0.35)' }}>
                  <span style={{ color: CORAL, fontWeight: 600 }}>⚠ FLAG:</span> {s.flag.replace('⚠ FLAG: ', '')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* ANSWER BANNER */}
      <FadeIn delay={700}>
        <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${PLUM} 100%)`, borderRadius: 10, padding: '32px 28px', marginBottom: 56, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)' }} />
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.3rem', color: '#F5F1EB', fontWeight: 700, marginBottom: 14, position: 'relative', zIndex: 1 }}>You&rsquo;re not thinking too big.</h2>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.92rem', color: 'rgba(245,241,235,0.6)', lineHeight: 1.8, position: 'relative', zIndex: 1, marginBottom: 10 }}>
            Everything described — duplicate deductions, 401k remittance gaps, enrollment mismatches, past due vendor invoices — those aren&rsquo;t dreams. <strong style={{ color: '#F5F1EB' }}>Those are control tests.</strong> Every auditor in the country runs versions of these.
          </p>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: '0.92rem', color: 'rgba(245,241,235,0.6)', lineHeight: 1.8, position: 'relative', zIndex: 1 }}>
            The engine does exactly what was asked: <span style={{ color: '#2BB5A4' }}>it compares what should be happening to what is happening, and flags the gaps.</span> Same architecture DDL uses for vet clinics, cocktail bars, grant tracking, and bank audits. <span style={{ color: '#2BB5A4' }}>The data changes. The engine doesn&rsquo;t care.</span>
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={800}>
        <div style={{ borderTop: '1px solid rgba(245,241,235,0.08)', paddingTop: 24, textAlign: 'center' as const }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(245,241,235,0.3)', letterSpacing: '0.08em' }}>
            PayGuard Engine · v0.1 · Benefits & Payroll Compliance · Built by DDL · 2026
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
