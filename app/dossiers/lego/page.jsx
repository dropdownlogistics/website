'use client';
import { useState, useRef } from 'react';

const C = {
  navy: '#0D1B2A', card: '#10202f',
  crimson: '#B23531', crimsonDim: 'rgba(178,53,49,0.2)',
  cream: '#F5F1EB', creamMid: 'rgba(245,241,235,0.55)', creamDim: 'rgba(245,241,235,0.3)',
  creamGhost: 'rgba(245,241,235,0.06)', border: 'rgba(245,241,235,0.06)',
  borderMed: 'rgba(245,241,235,0.1)',
  amber: '#C49A3C', green: '#4A9E6B', blue: '#6B9DC2', violet: '#8a6cc9',
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

const LEGO_SETS = [
  { id: 'mclaren', setNum: '10330', name: 'McLaren MP4/4 & Ayrton Senna', line: 'Icons', shelf: 'Formula 1', built: true, pieces: 693, hero: '/lego/mclaren_hero.jpg', builds: ['/lego/mcalaren_build_1.jpg','/lego/mcalaren_build_2.jpg','/lego/mcalaren_build_3.jpg','/lego/mcalaren_build_4.jpg','/lego/mcalaren_build_5.jpg','/lego/mcalaren_build_6.jpg','/lego/mcalaren_build_7.jpg'], complete: ['/lego/mcalaren_complete_1.jpg','/lego/mcalaren_complete_2.jpg','/lego/mcalaren_complete_3.jpg'], note: 'Senna minifig included. The only F1 car in the collection.', color: C.amber, ff: false },
  { id: 'supra', setNum: '42204', name: 'Toyota Supra MK4', line: 'Technic', shelf: 'Fast & Furious', built: true, pieces: 493, hero: '/lego/supra_hero.jpg', builds: ['/lego/supra_build_2.jpg','/lego/supra_build_3.jpg','/lego/supra_build_4.jpg','/lego/supra_build_5.jpg','/lego/supra_build_6.jpg','/lego/supra_build_8.jpg','/lego/supra_build_9.jpg','/lego/supra_build_12.jpg','/lego/supra_build_14.jpg','/lego/supra_build_15.jpg'], complete: ['/lego/supra_complete_1.jpg','/lego/supra_complete_3.jpg','/lego/supra_complete_4.jpg','/lego/supra_complete_5.jpg','/lego/supra_complete_6.jpg'], note: 'The most documented build in the collection. 25 photos.', color: C.crimson, ff: true },
  { id: 'charger', setNum: '76912', name: '1970 Dodge Charger R/T', line: 'Speed Champions', shelf: 'Fast & Furious', built: true, pieces: 345, hero: '/lego/dodg-charger_hero.jpg', builds: ['/lego/dodge-charger_build_1.jpg','/lego/dodge-charger_build_2.jpg','/lego/dodge-charger_build_3.jpg','/lego/dodge-charger_build_4.jpg','/lego/dodge-charger_build_5.jpg','/lego/dodge-charger_build_6.jpg'], complete: [], note: "Dom's car. The reason the F&F shelf exists.", color: C.crimson, ff: true },
  { id: 'skyline', setNum: '76917', name: 'Nissan Skyline GT-R (R34)', line: 'Speed Champions', shelf: 'Fast & Furious', built: true, pieces: 319, hero: '/lego/nissan-skyline_hero.jpg', builds: ['/lego/nissan-skyline_build_1.jpg','/lego/nissan-skyline_build_2.jpg','/lego/nissan-skyline_build_3.jpg','/lego/nissan-skyline_build_4.jpg','/lego/nissan-skyline_build_5.jpg','/lego/nissan-skyline_build_6.jpg','/lego/nissan-skyline_build_7.jpg','/lego/nissan-skyline_build_8.jpg','/lego/nissan-skyline_build_9.jpg'], complete: ['/lego/nissan-skyline_complete_1.jpg','/lego/nissan-skyline_complete_2.jpg','/lego/nissan-skyline_complete_3.jpg'], note: "Brian's car. Photographed next to the Charger.", color: C.blue, ff: true },
  { id: 's2000', setNum: '77241', name: 'Honda S2000', line: 'Speed Champions', shelf: 'Fast & Furious', built: true, pieces: 317, hero: '/lego/honda-s2000_hero.jpg', builds: ['/lego/honda-s2000_build_1.jpg','/lego/honda-s2000_build_2.jpg','/lego/honda-s2000_build_3.jpg','/lego/honda-s2000_build_4.jpg','/lego/honda-s2000_build_5.jpg','/lego/honda-s2000_build_6.jpg','/lego/honda-s2000_build_7.jpg','/lego/honda-s2000_build_8.jpg'], complete: ['/lego/honda-s2000_complete_1.jpg','/lego/honda-s2000_complete_2.jpg','/lego/honda-s2000_complete_3.jpg'], note: "Suki's car.", color: C.crimson, ff: true },
  { id: 'aston', setNum: '76911', name: 'Aston Martin DB5', line: 'Speed Champions', shelf: 'Icons', built: true, pieces: 298, hero: '/lego/aston-martin-db5_hero.jpg', builds: ['/lego/aston-martin-db5_build_1.jpg','/lego/aston-martin-db5_build_2.jpg','/lego/aston-martin-db5_build_3.jpg','/lego/aston-martin-db5_build_4.jpg'], complete: ['/lego/aston-martin-db5_complete_1.jpg','/lego/aston-martin-db5_complete_2.jpg','/lego/aston-martin-db5_complete_3.jpg'], note: 'Bond minifig with a wrench. TikTok documented.', color: C.amber, ff: false },
  { id: 'ferrari', setNum: '76934', name: 'Ferrari F40', line: 'Speed Champions', shelf: 'Legends', built: true, pieces: 318, hero: '/lego/ferrari_hero.jpg', builds: [], complete: [], note: 'Group shelf photo only.', color: C.crimson, ff: false },
  { id: 'pagani', setNum: '76915', name: 'Pagani Utopia', line: 'Speed Champions', shelf: 'Hypercars', built: true, pieces: 249, hero: '/lego/pagani_hero.jpg', builds: [], complete: [], note: 'Group shelf photo only.', color: C.violet, ff: false },
  { id: 'bugatti_vision', setNum: '77253', name: 'Bugatti Vision GT', line: 'Speed Champions', shelf: 'Hypercars', built: true, pieces: 261, hero: '/lego/bugatti_vision.jpg', builds: ['/lego/bugatti_vision_build_1.jpg','/lego/bugatti_vision_build_2.jpg','/lego/bugatti_vision_build_3.jpg','/lego/bugatti_vision_build_4.jpg'], complete: ['/lego/bugatti_vision_complete_1.jpg','/lego/bugatti_vision_complete_2.jpg','/lego/bugatti_vision_complete_3.jpg'], note: 'Concept car that never went to production.', color: C.violet, ff: false },
  { id: 'bugatti_cent', setNum: '77240', name: 'Bugatti Centodieci', line: 'Speed Champions', shelf: 'Hypercars', built: true, pieces: 261, hero: '/lego/bugatti_cent_hero.jpg', builds: [], complete: [], note: 'Group shelf photo only.', color: C.violet, ff: false },
  { id: 'lamborghini', setNum: '76923', name: 'Lamborghini Lambo V12 Vision GT', line: 'Speed Champions', shelf: 'Hypercars', built: true, pieces: 230, hero: '/lego/lamborghini_hero.jpg', builds: ['/lego/lamborghini-v12_build_1.jpg','/lego/lamborghini-v12_build_2.jpg','/lego/lamborghini-v12_build_3.jpg','/lego/lamborghini-v12_build_4.jpg','/lego/lamborghini-v12_build_5.jpg'], complete: ['/lego/lamborghini-v12_complete_1.jpg'], note: 'The hypercars shelf is all ghost cars.', color: C.violet, ff: false },
  { id: 'audi', setNum: '76921', name: 'Audi S1 e-tron quattro', line: 'Speed Champions', shelf: 'Motorsport', built: true, pieces: 274, hero: '/lego/audi_hero.jpg', builds: [], complete: [], note: 'Group shelf photo only.', color: C.green, ff: false },
  { id: 'mercedes_g63', setNum: '76924', name: 'Mercedes-AMG G 63', line: 'Speed Champions', shelf: 'AMG Duo', built: true, pieces: 382, hero: '/lego/mercedes_g63_hero.jpg', builds: ['/lego/mercedes-g63_build_1.jpg'], complete: ['/lego/mercedes-g63_complete_1.jpg','/lego/mercedes-g63_complete_2.jpg','/lego/mercedes-g63_complete_3.jpg','/lego/mercedes-g63_complete_4.jpg'], note: 'Dual build with the SL63.', color: C.blue, ff: false },
  { id: 'mercedes_sl63', setNum: '76924', name: 'Mercedes-AMG SL 63', line: 'Speed Champions', shelf: 'AMG Duo', built: true, pieces: 382, hero: '/lego/mercedes_sl63.jpg', builds: ['/lego/mercedes-sl63_build_1.jpg','/lego/mercedes-sl63_build_2.jpg','/lego/mercedes-sl63_build_3.jpg'], complete: ['/lego/mercedes-sl63_complete_1.jpg','/lego/mercedes-sl63_complete_2.jpg','/lego/mercedes-sl63_complete_3.jpg'], note: 'Built alongside the G63.', color: C.blue, ff: false },
];

const MAKE_SETS = [
  { id: 'alduin', setNum: '21340', name: 'Alduin the World Eater', line: 'MEGA', shelf: 'Unbuilt', built: false, pieces: 1192, hero: null, builds: [], complete: [], note: 'Skyrim dragon. Largest set in the collection. Still in the box.', color: C.violet, ff: false },
];

const FOCO_SETS = [
  { id: 'raiders_helmet', setNum: 'BRXLZ', name: 'Raiders Helmet', line: 'FOCO BRXLZ', shelf: 'Unbuilt', built: false, pieces: 1305, hero: null, builds: [], complete: [], note: 'Raiders black and silver. Goes with the football.', color: C.blue, ff: false },
  { id: 'raiders_football', setNum: 'BRXLZ', name: 'Raiders Football', line: 'FOCO BRXLZ', shelf: 'Unbuilt', built: false, pieces: 728, hero: null, builds: [], complete: [], note: 'Comes with a display base. Pair with the helmet.', color: C.blue, ff: false },
];

const LEGO_SHELVES = ['All', 'Fast & Furious', 'Hypercars', 'Icons', 'AMG Duo', 'Motorsport', 'Legends'];

function SetCard({ set }) {
  const [tab, setTab] = useState('hero');
  const [imgIdx, setImgIdx] = useState(0);
  const touchX = useRef(null);
  const currentImages = tab === 'hero' ? (set.hero ? [set.hero] : []) : tab === 'build' ? set.builds : set.complete;
  const currentImg = currentImages[imgIdx] || null;
  function switchTab(t) { setTab(t); setImgIdx(0); }
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{ position: 'relative', width: '100%', paddingBottom: '66%', background: '#0a1520', cursor: 'grab' }}
        onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          if (touchX.current === null) return;
          const diff = touchX.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) setImgIdx(i => diff > 0 ? Math.min(i+1, currentImages.length-1) : Math.max(i-1, 0));
          touchX.current = null;
        }}
        onMouseDown={e => { touchX.current = e.clientX; }}
        onMouseUp={e => {
          if (touchX.current === null) return;
          const diff = touchX.current - e.clientX;
          if (Math.abs(diff) > 40) setImgIdx(i => diff > 0 ? Math.min(i+1, currentImages.length-1) : Math.max(i-1, 0));
          touchX.current = null;
        }}
      >
        {currentImg ? (
          <img src={currentImg} alt={set.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.currentTarget.style.display = 'none'; }} />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontFamily: font.mono, fontSize: 28, color: C.creamDim }}>📦</div>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.1em' }}>STILL IN BOX</div>
          </div>
        )}
        <div style={{ position: 'absolute', top: 8, right: 8, fontFamily: font.mono, fontSize: 9, padding: '3px 7px', borderRadius: 3, background: set.built ? 'rgba(74,158,107,0.85)' : 'rgba(178,53,49,0.85)', color: C.cream, letterSpacing: '0.08em' }}>{set.built ? 'BUILT' : 'UNBUILT'}</div>
        {set.ff && <div style={{ position: 'absolute', top: 8, left: 8, fontFamily: font.mono, fontSize: 9, padding: '3px 7px', borderRadius: 3, background: 'rgba(178,53,49,0.85)', color: C.cream, letterSpacing: '0.08em' }}>F&F</div>}
        {currentImages.length > 1 && (
          <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 5 }}>
            {currentImages.map((_, i) => <button key={i} onClick={() => setImgIdx(i)} style={{ width: i === imgIdx ? 16 : 6, height: 6, borderRadius: 3, background: i === imgIdx ? C.cream : 'rgba(245,241,235,0.3)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.2s' }} />)}
          </div>
        )}
      </div>
      {(set.builds.length > 0 || set.complete.length > 0) && (
        <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}` }}>
          {[{ key: 'hero', label: 'HERO' }, ...(set.builds.length > 0 ? [{ key: 'build', label: `BUILD (${set.builds.length})` }] : []), ...(set.complete.length > 0 ? [{ key: 'complete', label: `DONE (${set.complete.length})` }] : [])].map(t => (
            <button key={t.key} onClick={() => switchTab(t.key)} style={{ flex: 1, padding: '6px 4px', fontFamily: font.mono, fontSize: 9, letterSpacing: '0.06em', background: tab === t.key ? C.creamGhost : 'transparent', color: tab === t.key ? C.cream : C.creamDim, border: 'none', borderBottom: tab === t.key ? `1px solid ${set.color}` : 'none', cursor: 'pointer', transition: 'all 0.15s' }}>{t.label}</button>
          ))}
        </div>
      )}
      <div style={{ padding: '12px 14px', flex: 1 }}>
        <div style={{ fontFamily: font.mono, fontSize: 9, color: set.color, letterSpacing: '0.1em', marginBottom: 4 }}>{set.setNum} · {set.line}</div>
        <div style={{ fontFamily: font.display, fontSize: 14, fontWeight: 600, color: C.cream, marginBottom: 6, lineHeight: 1.3 }}>{set.name}</div>
        <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamDim, lineHeight: 1.5, marginBottom: 10 }}>{set.note}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamMid }}>{set.pieces.toLocaleString()} pcs</span>
          <span style={{ fontFamily: font.mono, fontSize: 9, padding: '2px 7px', borderRadius: 3, background: C.creamGhost, color: C.creamDim }}>{set.shelf}</span>
        </div>
      </div>
    </div>
  );
}

function SectionDivider({ brand, count, pieces, color }) {
  return (
    <div style={{ margin: '48px 0 24px', paddingBottom: 16, borderBottom: `1px solid ${C.border}` }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, color }}>{brand}</div>
        <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.1em' }}>{count} {count === 1 ? 'set' : 'sets'} · {pieces.toLocaleString()} pcs</div>
      </div>
    </div>
  );
}

function GroupCard() {
  const [imgIdx, setImgIdx] = useState(0);
  const imgs = ['/lego/group_1.jpg','/lego/group_2.jpg','/lego/group_4.jpg','/lego/group_5.jpg','/lego/group_6.jpg','/lego/group_7.jpg','/lego/group_8.jpg','/lego/group_9.jpg','/lego/group_10.jpg','/lego/group_11.jpg','/lego/group_12.jpg'];
  return (
    <div style={{ background: C.card, border: `1px solid ${C.borderMed}`, borderRadius: 8, overflow: 'hidden', marginTop: 32 }}>
      <div style={{ position: 'relative', width: '100%', paddingBottom: '50%', background: '#0a1520' }}>
        <img src={imgs[imgIdx]} alt="The shelf" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.currentTarget.style.display = 'none'; }} />
        <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 5 }}>
          {imgs.map((_, i) => <button key={i} onClick={() => setImgIdx(i)} style={{ width: i === imgIdx ? 16 : 6, height: 6, borderRadius: 3, background: i === imgIdx ? C.cream : 'rgba(245,241,235,0.3)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.2s' }} />)}
        </div>
      </div>
      <div style={{ padding: '16px 20px' }}>
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.amber, letterSpacing: '0.1em', marginBottom: 6 }}>THE SHELF · GROUP SHOTS</div>
        <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamDim, lineHeight: 1.6 }}>11 photos of the full collection across build sessions and shelf arrangements.</div>
      </div>
    </div>
  );
}

export default function LegoDossier() {
  const [activeShelf, setActiveShelf] = useState('All');
  const filtered = activeShelf === 'All' ? LEGO_SETS : LEGO_SETS.filter(s => s.shelf === activeShelf);
  const allSets = [...LEGO_SETS, ...MAKE_SETS, ...FOCO_SETS];
  const totalSets = allSets.length;
  const totalPieces = allSets.reduce((a, s) => a + s.pieces, 0);
  const totalBuilt = allSets.filter(s => s.built).length;

  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 80px' }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: font.mono, fontSize: 11, color: C.crimson, letterSpacing: '0.12em', marginBottom: 12 }}>DOSSIER · D.K. HALE</div>
          <h1 style={{ fontFamily: font.display, fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 700, color: C.cream, margin: '0 0 16px', lineHeight: 1.1 }}>The Collection</h1>
          <p style={{ fontFamily: font.body, fontSize: 16, color: C.creamMid, maxWidth: 600, lineHeight: 1.7, margin: 0 }}>{totalSets} sets across three brands. {totalBuilt} built. The cars were top priority.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 1, background: C.border, border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', marginBottom: 40 }}>
          {[{ label: 'Total Sets', value: totalSets }, { label: 'Built', value: totalBuilt }, { label: 'Unbuilt', value: totalSets - totalBuilt }, { label: 'Total Pieces', value: totalPieces.toLocaleString() }].map(s => (
            <div key={s.label} style={{ background: C.card, padding: '20px 24px', textAlign: 'center' }}>
              <div style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700, color: C.cream, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.1em', marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.crimsonDim}`, borderLeft: `3px solid ${C.crimson}`, borderRadius: 8, padding: '20px 24px', marginBottom: 40 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: '0.12em', marginBottom: 8 }}>F&F SHELF · SPOTLIGHT</div>
          <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, margin: 0, lineHeight: 1.7 }}>Four cars from the Fast & Furious universe occupy their own dedicated shelf. Dom's Charger. Brian's Skyline. Suki's S2000. The Supra that started it all. They stay together.</p>
        </div>

        <SectionDivider brand="LEGO" count={LEGO_SETS.length} pieces={LEGO_SETS.reduce((a,s)=>a+s.pieces,0)} color={C.amber} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {LEGO_SHELVES.map(s => (
            <button key={s} onClick={() => setActiveShelf(s)} style={{ fontFamily: font.mono, fontSize: 11, letterSpacing: '0.06em', padding: '6px 14px', borderRadius: 4, background: activeShelf === s ? C.crimson : C.creamGhost, color: activeShelf === s ? C.cream : C.creamDim, border: activeShelf === s ? 'none' : `1px solid ${C.border}`, cursor: 'pointer', transition: 'all 0.15s' }}>
              {s}{s !== 'All' && <span style={{ marginLeft: 6, opacity: 0.6 }}>{LEGO_SETS.filter(x => x.shelf === s).length}</span>}
            </button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20, marginBottom: 16 }}>
          {filtered.map(set => <SetCard key={set.id} set={set} />)}
        </div>
        <GroupCard />

        <SectionDivider brand="MEGA" count={MAKE_SETS.length} pieces={MAKE_SETS.reduce((a,s)=>a+s.pieces,0)} color={C.violet} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {MAKE_SETS.map(set => <SetCard key={set.id} set={set} />)}
        </div>

        <SectionDivider brand="FOCO BRXLZ" count={FOCO_SETS.length} pieces={FOCO_SETS.reduce((a,s)=>a+s.pieces,0)} color={C.blue} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {FOCO_SETS.map(set => <SetCard key={set.id} set={set} />)}
        </div>

        <div style={{ marginTop: 64 }}>
          <div style={{ height: 2, borderRadius: 1, marginBottom: 24, background: `linear-gradient(90deg, ${C.crimson}, ${C.violet}, ${C.amber})` }} />
          <div style={{ fontFamily: font.body, fontSize: 15, fontStyle: 'italic', color: C.creamDim, textAlign: 'center', marginBottom: 24 }}>"I lived life a Fisher Price at a time."</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.08em' }}>Dropdown Logistics · DOSSIER · The Collection · {totalSets} sets</div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>dropdownlogistics.com · 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
}
