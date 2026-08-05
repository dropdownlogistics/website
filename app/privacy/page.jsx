export const metadata = { title: 'Privacy Policy | DDL' };

const C = {
  navy: '#0D1B2A', cream: '#F5F1EB', creamMid: 'rgba(245,241,235,0.72)',
  gold: '#C49A3C', dim: 'rgba(245,241,235,0.3)', border: 'rgba(245,241,235,0.1)',
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

        <h1 style={{ fontFamily: font.display, fontSize: 34, fontWeight: 700, color: C.cream, margin: '24px 0 6px', letterSpacing: '-0.02em' }}>Privacy Policy</h1>
        <div style={{ fontFamily: font.mono, fontSize: 11, color: C.gold, letterSpacing: '0.08em', marginBottom: 8 }}>Dropdown Logistics · Last updated 4 August 2026</div>
        <div style={{ height: 2, width: 48, background: C.gold, opacity: 0.5, margin: '0 0 28px' }} />

        <p style={p}>This Privacy Policy describes how Dropdown Logistics (&ldquo;we,&rdquo; &ldquo;us&rdquo;) handles information in connection with our internal SMS notification service. Dropdown Logistics is a sole proprietorship operated by Dave Kitchens.</p>

        <h2 style={h2}>Information we collect</h2>
        <p style={p}>Our SMS notification service is used only by the business owner and authorized internal staff of Dropdown Logistics. The only personal information we collect for this service is a mobile phone number, which each person provides directly and voluntarily so they can receive internal operational notifications.</p>

        <h2 style={h2}>How we use it</h2>
        <p style={p}>Mobile numbers are used solely to send internal operational messages — for example, alerts that a task requires the owner&rsquo;s review or approval, and status confirmations. We do not use them for marketing.</p>

        <h2 style={h2}>How we share it — we don&rsquo;t</h2>
        <p style={p}>We do not sell, rent, or share your mobile information with any third parties or affiliates for marketing or promotional purposes. Mobile opt-in data and consent are never shared with third parties. Information may only be disclosed if required by law.</p>

        <h2 style={h2}>Message frequency &amp; rates</h2>
        <p style={p}>Message frequency varies based on operational activity. Message and data rates may apply. You can opt out at any time by replying STOP; reply HELP for help.</p>

        <h2 style={h2}>Data retention &amp; security</h2>
        <p style={p}>We retain mobile numbers only for as long as the person remains an authorized recipient, and we apply reasonable safeguards to protect them.</p>

        <h2 style={h2}>Contact</h2>
        <p style={p}>Questions about this policy: <a href="mailto:dropdownlogistics@gmail.com" style={{ color: C.gold }}>dropdownlogistics@gmail.com</a>, Dropdown Logistics.</p>
      </div>
    </div>
  );
}
