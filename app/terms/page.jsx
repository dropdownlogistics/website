export const metadata = { title: 'SMS Terms & Conditions | DDL' };

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

        <h1 style={{ fontFamily: font.display, fontSize: 34, fontWeight: 700, color: C.cream, margin: '24px 0 6px', letterSpacing: '-0.02em' }}>SMS Terms &amp; Conditions</h1>
        <div style={{ fontFamily: font.mono, fontSize: 11, color: C.gold, letterSpacing: '0.08em', marginBottom: 8 }}>Dropdown Logistics · Last updated 24 July 2026</div>
        <div style={{ height: 2, width: 48, background: C.gold, opacity: 0.5, margin: '0 0 28px' }} />

        <p style={p}>These Terms govern the Dropdown Logistics internal SMS notification program. Dropdown Logistics is a sole proprietorship operated by Dave Kitchens.</p>

        <h2 style={h2}>Program description</h2>
        <p style={p}>When the business owner or an authorized staff member of Dropdown Logistics provides their mobile number and consents, we send them internal operational text messages — alerts that a task needs review or approval, and status confirmations. This is a private internal program; it is not offered to the public and numbers are never purchased or collected from the public.</p>

        <h2 style={h2}>Consent</h2>
        <p style={p}>Recipients opt in verbally by providing their own mobile number during internal setup. By opting in, you agree to receive operational SMS messages from Dropdown Logistics at that number.</p>

        <h2 style={h2}>Message frequency</h2>
        <p style={p}>Message frequency varies based on operational activity.</p>

        <h2 style={h2}>Costs</h2>
        <p style={p}>Message and data rates may apply. Dropdown Logistics does not charge for the messages, but your mobile carrier&rsquo;s standard rates apply.</p>

        <h2 style={h2}>Opt-out and help</h2>
        <p style={p}>You can cancel at any time by texting STOP to the number. After you send STOP, we will send a confirmation and then stop sending messages; you may receive no further messages unless you re-enroll. For help, text HELP or contact us below.</p>

        <h2 style={h2}>Privacy</h2>
        <p style={p}>Your mobile information is handled per our <a href="/privacy/" style={{ color: C.gold }}>Privacy Policy</a>. We do not sell or share mobile numbers with third parties or affiliates for marketing purposes.</p>

        <h2 style={h2}>Contact</h2>
        <p style={p}><a href="mailto:dropdownlogistics@gmail.com" style={{ color: C.gold }}>dropdownlogistics@gmail.com</a>, Dropdown Logistics.</p>
      </div>
    </div>
  );
}
