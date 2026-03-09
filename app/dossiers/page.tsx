export const metadata = { title: 'CottageHumble Dossiers - DDL' };

const dossiers = [
  { href: '/dossiers/merrick', name: 'Merrick', sub: 'Elf Mage L5 - Divinity: OS2', game: 'divinity', color: '#dc2626' },
  { href: '/dossiers/feliciano', name: 'Feliciano', sub: 'Dragonborn Paladin L14 - D&D 5e', game: 'dnd', color: '#f59e0b' },
  { href: '/dossiers/hillie', name: 'Hillie', sub: 'Elf/Drow Warlock L14 - D&D 5e', game: 'dnd', color: '#f59e0b' },
  { href: '/dossiers/xuth-jr', name: 'Xuth Leafshadow Jr.', sub: 'Argonian L56 - Skyrim', game: 'skyrim', color: '#22c55e' },
  { href: '/dossiers/xuth-iii', name: 'Xuth Leafshadow III', sub: 'Argonian (reboot) - Skyrim', game: 'skyrim', color: '#22c55e' },
  { href: '/dossiers/xuth-sr', name: 'Xuth Leafshadow Sr.', sub: 'Daedric Ancestor L370+ - Skyrim', game: 'skyrim', color: '#22c55e' },
  { href: '/dossiers/riflen', name: 'Riflen', sub: 'Elf Fighter - Divinity: OS2', game: 'divinity', color: '#dc2626' },
  { href: '/dossiers/doc-rickets', name: 'Doc Rickets', sub: 'Undead Rogue - Divinity: OS2', game: 'divinity', color: '#dc2626' },
];

const supporting = [
  { href: '/dossiers/ash-snow-steel', name: 'Ash, Snow & Steel', sub: 'D&D 5e Party Registry', color: '#f59e0b' },
  { href: '/dossiers/fort-joy', name: 'Fort Joy Ledger', sub: 'Divinity: OS2 Party Registry', color: '#dc2626' },
  { href: '/dossiers/leafshadow-lineage', name: 'Leafshadow Lineage', sub: 'Three-generation chronicle', color: '#22c55e' },
  { href: '/dossiers/hal-style-lock', name: 'Hal Style Lock', sub: 'Portrait governance codex', color: '#67e8f9' },
  { href: '/dossiers/campaign-analytics', name: 'Campaign Analytics', sub: 'BlindSpot applied to RPG data', color: '#9B8EC4' },
  { href: '/dossiers/operator', name: 'The Operator', sub: 'D.K. Hale — full profile', color: '#B23531' },
  { href: '/dossiers/lego', name: 'The Collection', sub: 'Lego — 15 sets, 6,014 pieces', color: '#C49A3C' },
];

export default function DossiersPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1a', color: '#e2e8f0', padding: '48px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#dc2626', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
          CottageHumble Dossier Wing
        </p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
          Character Dossiers
        </h1>
        <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 15, color: '#94a3b8', marginBottom: 8 }}>
          Governance-grade documentation for RPG campaigns. The same rigor DDL applies to audit systems, applied to a 56-level Argonian's cheese wheel economy.
        </p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#94a3b8', marginBottom: 32 }}>
          Cottage -- Humble surface. Cathedral underneath.
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: '4px 10px', borderRadius: 4, background: 'rgba(220,38,38,0.15)', color: '#dc2626' }}>Divinity: OS2</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: '4px 10px', borderRadius: 4, background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>D&D 5e</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: '4px 10px', borderRadius: 4, background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>Skyrim</span>
        </div>

        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#94a3b8', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>Characters</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 36 }}>
          {dossiers.map(d => (
            <a key={d.href} href={d.href} style={{
              display: 'block', padding: '14px 18px', background: '#111827',
              border: '1px solid #1e293b', borderLeft: '3px solid ' + d.color, borderRadius: 6,
              textDecoration: 'none',
            }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, color: '#e2e8f0', marginBottom: 2 }}>{d.name}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#94a3b8' }}>{d.sub}</div>
            </a>
          ))}
        </div>

        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#94a3b8', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>Supporting Documents</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 36 }}>
          {supporting.map(s => (
            <a key={s.href} href={s.href} style={{
              display: 'block', padding: '14px 18px', background: '#111827',
              border: '1px solid #1e293b', borderLeft: '3px solid ' + s.color, borderRadius: 6,
              textDecoration: 'none',
            }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: '#e2e8f0', marginBottom: 2 }}>{s.name}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#94a3b8' }}>{s.sub}</div>
            </a>
          ))}
        </div>

        <div style={{ textAlign: 'center', borderTop: '2px solid #dc2626', paddingTop: 24 }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#94a3b8' }}>CottageHumble DOSSIER WING | dropdownlogistics.com</p>
        </div>
      </div>
    </div>
  );
}
