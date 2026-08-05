export const metadata = { title: 'SMS Opt-In | Dropdown Logistics' };

const C = {
  navy: '#0D1B2A', cream: '#F5F1EB', creamMid: 'rgba(245,241,235,0.72)',
  gold: '#C49A3C', dim: 'rgba(245,241,235,0.3)', border: 'rgba(245,241,235,0.12)',
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  body: "'Source Serif 4', Georgia, serif",
  mono: "'JetBrains Mono', monospace",
};
const h2 = { fontFamily: font.display, fontSize: 20, fontWeight: 700, color: C.cream, margin: '32px 0 8px' };
const p = { fontFamily: font.body, fontSize: 15, lineHeight: 1.75, color: C.creamMid, margin: '0 0 12px' };

export default function Page() {
  return (
    <div style={{ minHeight: '100vh', background: C.navy, color: C.cream }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '56px 24px 80px' }}>
        <a href="/" style={{ fontFamily: font.mono, fontSize: 11, color: C.dim, textDecoration: 'none', letterSpacing: '0.06em' }}>← Dropdown Logistics</a>

        <h1 style={{ fontFamily: font.display, fontSize: 34, fontWeight: 700, color: C.cream, margin: '24px 0 6px', letterSpacing: '-0.02em' }}>SMS Opt-In</h1>
        <div style={{ fontFamily: font.mono, fontSize: 11, color: C.gold, letterSpacing: '0.08em', marginBottom: 8 }}>Dropdown Logistics · Last updated 4 August 2026</div>
        <div style={{ height: 2, width: 48, background: C.gold, opacity: 0.5, margin: '0 0 28px' }} />

        <h2 style={h2}>Who is sending</h2>
        <p style={p}>Dropdown Logistics — a logistics and operations studio. SMS messages are sent directly from Dropdown Logistics systems; no third-party sender is involved.</p>

        <h2 style={h2}>What messages are sent</h2>
        <p style={p}>Operational alerts from Dropdown Logistics internal systems: status notifications when a task or workflow needs attention, escalation alerts when an action is required, and service confirmations when a process completes. These are operational messages only; no marketing messages are sent through this program.</p>

        <h2 style={h2}>Message frequency</h2>
        <p style={p}>Message frequency varies based on operational activity.</p>

        <h2 style={h2}>Costs and opt-out</h2>
        <p style={p}>Message and data rates may apply. Reply STOP to opt out. Reply HELP for help.</p>

        <h2 style={h2}>Policies</h2>
        <p style={p}>
          By signing up you agree to our{' '}
          <a href="/terms/" style={{ color: C.gold }}>SMS Terms &amp; Conditions</a>
          {' '}and{' '}
          <a href="/privacy/" style={{ color: C.gold }}>Privacy Policy</a>.
          Mobile opt-in data and consent are never shared with third parties.
        </p>

        <div style={{ height: 1, background: C.border, margin: '36px 0' }} />

        <h2 style={{ ...h2, margin: '0 0 20px' }}>Sign up to receive SMS alerts</h2>

        <form action="#" method="post" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label htmlFor="phone" style={{ fontFamily: font.mono, fontSize: 11, color: C.dim, letterSpacing: '0.06em' }}>MOBILE NUMBER</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="+1 (555) 000-0000"
              style={{
                background: 'rgba(245,241,235,0.06)',
                border: `1px solid ${C.border}`,
                borderRadius: 4,
                padding: '10px 14px',
                fontFamily: font.mono,
                fontSize: 14,
                color: C.cream,
                outline: 'none',
                width: '100%',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}>
            <input
              type="checkbox"
              name="consent"
              style={{ marginTop: 3, flexShrink: 0, accentColor: C.gold }}
            />
            <span style={{ fontFamily: font.body, fontSize: 14, lineHeight: 1.6, color: C.creamMid }}>
              I agree to receive operational SMS alerts from Dropdown Logistics at the number provided. Message and data rates may apply. Message frequency varies. Reply STOP to opt out.
            </span>
          </label>

          <button
            type="submit"
            style={{
              alignSelf: 'flex-start',
              background: C.gold,
              color: C.navy,
              border: 'none',
              borderRadius: 4,
              padding: '10px 24px',
              fontFamily: font.display,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '0.02em',
            }}
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
