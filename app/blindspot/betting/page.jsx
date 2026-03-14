export default function BlindSpotBettingPage() {
  return (
    <>
      <style>{`
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        :root{
          --navy:#0D1B2A;--card:#10202f;--cream:#F5F1EB;--crimson:#B23531;
          --amber:#C49A3C;--green:#22C55E;--green-light:#86EFAC;
          --steel:#6B7B8D;--slate:#4A5568;
          --border:rgba(245,241,235,0.06);--border-amber:rgba(196,154,60,0.3);
        }
        body{font-family:'Space Grotesk',sans-serif;background:var(--navy);color:var(--cream);min-height:100vh}
        a{color:inherit;text-decoration:none}
        .page-nav{padding:24px 48px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px}
        .back-link{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--steel);letter-spacing:0.05em;transition:color 0.2s}
        .back-link:hover{color:var(--cream)}
        .nav-divider{color:var(--slate);font-size:10px}
        .nav-wing{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--green);letter-spacing:0.1em;text-transform:uppercase}
        .hero{max-width:860px;margin:0 auto;padding:80px 48px 64px}
        .hero-eyebrow{display:flex;align-items:center;gap:10px;margin-bottom:24px}
        .helix-badge{width:36px;height:36px;background:var(--card);border-radius:8px;border:1px solid rgba(34,197,94,0.3);display:flex;align-items:center;justify-content:center}
        .eyebrow-text{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--green);letter-spacing:0.15em;text-transform:uppercase}
        .hero h1{font-size:clamp(2.8rem,5vw,4.2rem);font-weight:700;line-height:1.1;letter-spacing:-0.03em;margin-bottom:20px}
        .hero h1 em{font-family:'Source Serif 4',serif;font-style:italic;font-weight:400;color:var(--green)}
        .hero-sub{font-size:1.1rem;color:var(--steel);line-height:1.7;max-width:620px;margin-bottom:24px;font-weight:400}
        .hero-statement{font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--green);line-height:1.8;max-width:600px;margin-bottom:40px;padding:20px;background:var(--card);border:1px solid rgba(34,197,94,0.2);border-radius:8px;border-left:3px solid var(--green)}
        .hero-ctas{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
        .btn-primary{background:var(--green);color:var(--navy);font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:12px;letter-spacing:0.05em;text-transform:uppercase;padding:12px 28px;border-radius:6px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:opacity 0.2s}
        .btn-primary:hover{opacity:0.9}
        .btn-secondary{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--steel);padding:12px 20px;border-radius:6px;border:1px solid var(--border);cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:all 0.2s}
        .btn-secondary:hover{border-color:rgba(34,197,94,0.3);color:var(--cream)}
        .product-badge{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--slate);letter-spacing:0.08em;margin-top:16px}
        .divider{border:none;border-top:1px solid var(--border);margin:0 48px}
        .stats-section{max-width:860px;margin:0 auto;padding:64px 48px}
        .section-eyebrow{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--amber);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:32px}
        .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:10px;overflow:hidden;margin-bottom:1px}
        .stats-grid-sm{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:10px;overflow:hidden}
        .stat-cell{background:var(--card);padding:28px 20px}
        .stat-num{font-size:2.2rem;font-weight:700;letter-spacing:-0.04em;color:var(--green);margin-bottom:6px}
        .stat-label{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--steel);letter-spacing:0.05em;line-height:1.5}
        .timeline-section{max-width:860px;margin:0 auto;padding:0 48px 64px}
        .timeline-header{margin-bottom:32px}
        .timeline-title{font-size:1.1rem;font-weight:600;letter-spacing:-0.01em;margin-bottom:4px}
        .timeline-sub{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--steel)}
        .timeline{display:flex;flex-direction:column;border-left:1px solid var(--border);margin-left:8px}
        .timeline-item{padding:0 0 28px 28px;position:relative}
        .timeline-item::before{content:'';position:absolute;left:-5px;top:6px;width:9px;height:9px;border-radius:50%;background:var(--navy);border:2px solid var(--border)}
        .timeline-item.green::before{border-color:var(--green);background:rgba(34,197,94,0.15)}
        .timeline-item:last-child{padding-bottom:0}
        .timeline-ts{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--green);letter-spacing:0.08em;margin-bottom:6px}
        .timeline-text{font-size:14px;color:var(--cream);line-height:1.6}
        .timeline-text em{font-family:'Source Serif 4',serif;font-style:italic;color:var(--green)}
        .features-section{max-width:860px;margin:0 auto;padding:0 48px 64px}
        .features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .feature-card{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:28px}
        .feature-card-label{font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--green);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:6px}
        .feature-card-title{font-size:14px;font-weight:700;margin-bottom:16px;letter-spacing:-0.01em}
        .feature-list{list-style:none;display:flex;flex-direction:column;gap:7px}
        .feature-list li{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--steel);padding-left:14px;position:relative;line-height:1.6}
        .feature-list li::before{content:'&#x2192;';position:absolute;left:0;color:var(--green);font-size:9px}
        .origin-section{max-width:860px;margin:0 auto;padding:0 48px 64px}
        .origin-card{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:36px;display:grid;grid-template-columns:1fr 1px 1fr;gap:32px}
        .origin-block h3{font-size:14px;font-weight:700;margin-bottom:12px}
        .origin-block p{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--steel);line-height:1.8}
        .origin-block p strong{color:var(--cream)}
        .origin-divider{background:var(--border)}
        .quote-section{max-width:860px;margin:0 auto;padding:0 48px 64px}
        .quote-card{background:var(--card);border:1px solid var(--border-amber);border-radius:8px;padding:40px;position:relative;overflow:hidden}
        .quote-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--amber),transparent)}
        .quote-text{font-family:'Source Serif 4',serif;font-size:1.2rem;font-style:italic;line-height:1.7;color:var(--cream);margin-bottom:20px}
        .quote-attr{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--steel);letter-spacing:0.08em}
        .quote-attr strong{color:var(--amber)}
        .close-section{max-width:860px;margin:0 auto;padding:0 48px 80px}
        .close-statement{font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--steel);line-height:1.8;margin-bottom:8px}
        .close-statement strong{color:var(--green)}
        .close-ctas{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
        .page-footer{border-top:1px solid var(--border);padding:24px 48px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
        .footer-left{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--steel)}
        .footer-left strong{color:var(--green)}
        .footer-right{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--slate)}
        @media(max-width:768px){
          .page-nav,.hero,.stats-section,.timeline-section,.features-section,.origin-section,.quote-section,.close-section{padding-left:24px;padding-right:24px}
          .divider{margin:0 24px}
          .stats-grid,.stats-grid-sm{grid-template-columns:1fr 1fr}
          .features-grid{grid-template-columns:1fr}
          .origin-card{grid-template-columns:1fr}
          .origin-divider{display:none}
          .page-footer{padding:24px}
        }
      `}</style>

      <nav className="page-nav">
        <a href="/blindspot" className="back-link">&#x2190; back</a>
        <span className="nav-divider">&#xB7;</span>
        <span className="nav-wing">D&amp;A &middot; BLINDSPOT &middot; BETTING ANALYTICS</span>
      </nav>

      <section className="hero">
        <div className="hero-eyebrow">
          <div className="helix-badge">
            <svg width="20" height="20" viewBox="0 0 26 26" fill="none">
              <path d="M9 3C9 3 17 7 17 10.5C17 14 9 16 9 19.5C9 23 17 24 17 24" stroke="#22C55E" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M17 3C17 3 9 7 9 10.5C9 14 17 16 17 19.5C17 23 9 24 9 24" stroke="#86EFAC" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="10" y1="7.5" x2="16" y2="7.5" stroke="#E2E8F0" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="10" y1="13" x2="16" y2="13" stroke="#E2E8F0" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="10" y1="18.5" x2="16" y2="18.5" stroke="#E2E8F0" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="eyebrow-text">D&amp;A Analytics &middot; blindspot.bet</span>
        </div>

        <h1>Sports betting<br />analytics. <em>Finally.</em></h1>

        <p className="hero-sub">
          The house doesn&apos;t have better odds. It has better data.<br />
          blindspot.bet is the data layer built for the other side of that equation.
        </p>

        <div className="hero-statement">
          signal &#x2192; structure &#x2192; edge<br />
          Track every bet. Reveal every pattern. Inform every decision with live context.<br />
          Built on the same schema thinking that built AuditForge.
        </div>

        <div className="hero-ctas">
          <a href="https://blindspot.bet" target="_blank" rel="noopener noreferrer" className="btn-primary">blindspot.bet &#x2197;</a>
          <a href="/blindspot" className="btn-secondary">&#x2190; BlindSpot Hub</a>
        </div>
        <div className="product-badge">A D&amp;A ANALYTICS PRODUCT &middot; DROPDOWN LOGISTICS</div>
      </section>

      <hr className="divider" />

      <section className="timeline-section">
        <div className="timeline-header">
          <div className="section-eyebrow">March 14, 2026 &mdash; The Receipts</div>
          <div className="timeline-title">One night. One domain. One thread.</div>
          <div className="timeline-sub">No code existed before 9pm CT.</div>
        </div>
        <div className="timeline">
          <div className="timeline-item green">
            <div className="timeline-ts">March 14 &middot; Evening</div>
            <div className="timeline-text">Concept scoped. The origin thread &mdash; a November 2023 ChatGPT session about a sports pick&apos;em tracker for fun &mdash; surfaced. Same vision. Better infrastructure.</div>
          </div>
          <div className="timeline-item green">
            <div className="timeline-ts">March 14 &middot; Late Evening</div>
            <div className="timeline-text"><em>blindspot.bet</em> registered on Cloudflare. $20.20. Available. The domain said exactly what the product does.</div>
          </div>
          <div className="timeline-item green">
            <div className="timeline-ts">March 14 &middot; Late Evening</div>
            <div className="timeline-text">Next.js scaffolded. D&amp;A brand applied. Helix mark in the nav. Ticker, stats grid, dashboard preview, waitlist &mdash; all live locally.</div>
          </div>
          <div className="timeline-item green">
            <div className="timeline-ts">March 14 &middot; Late Evening</div>
            <div className="timeline-text">Brand kit generated. Color system, typography, logo variants, voice principles, do/don&apos;t rules. Full D&amp;A spec on record.</div>
          </div>
          <div className="timeline-item">
            <div className="timeline-ts">Up Next</div>
            <div className="timeline-text">Vercel deploy. Domain wired. Schema: <em>Fact_Bets</em> at center, dimensions for sport, platform, bet type, market context. The Odds API for live lines.</div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      <section className="features-section">
        <div className="section-eyebrow">What It Does</div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-card-label">Track</div>
            <div className="feature-card-title">Every Bet. Every Platform.</div>
            <ul className="feature-list">
              <li>Moneyline, spread, O/U, props, parlays, live</li>
              <li>DraftKings, FanDuel, BetMGM, Caesars and more</li>
              <li>Cash-out and early exit tracked separately</li>
              <li>3-tap mobile entry &mdash; no friction at the pump</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-card-label">Reveal</div>
            <div className="feature-card-title">The Patterns You Miss.</div>
            <ul className="feature-list">
              <li>ROI by sport, bet type, platform, time of day</li>
              <li>Tilt detection &mdash; bet size spikes after losses</li>
              <li>Late-night variance flagged automatically</li>
              <li>12 behavioral patterns tracked from log data alone</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-card-label">Inform</div>
            <div className="feature-card-title">With Live Context.</div>
            <ul className="feature-list">
              <li>Live odds via The Odds API &mdash; legal, documented</li>
              <li>Line shopping across books before you log</li>
              <li>Market context notes &mdash; why you made the bet</li>
              <li>Parlay leg tracking with EV vs actual</li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="divider" />

      <section className="origin-section">
        <div className="section-eyebrow">Built By</div>
        <div className="origin-card">
          <div className="origin-block">
            <h3>D&amp;A Analytics</h3>
            <p>D&amp;A is the analytics sub-brand of Dropdown Logistics &mdash; built by <strong>Dave Kitchens</strong> and powered by data from <strong>Alex</strong>, a professional trader who sends daily setups, exits, and market context.<br /><br />The same schema thinking that built AuditForge applies here. <strong>Fact table at center. Dimensions around it. Behavior in the splits.</strong></p>
          </div>
          <div className="origin-divider" />
          <div className="origin-block">
            <h3>Why Betting</h3>
            <p>The origin thread dates to November 2023 &mdash; a pick&apos;em tracker for fun, built in ChatGPT before any of this infrastructure existed.<br /><br />The vision never changed. The infrastructure caught up. <strong>blindspot.bet is that project, built the way it always should have been.</strong></p>
          </div>
        </div>
      </section>

      <section className="quote-section">
        <div className="quote-card">
          <div className="quote-text">The house doesn&apos;t have better odds. It has better data. blindspot.bet is the data layer built for the other side of that equation.</div>
          <div className="quote-attr">Dave Kitchens &middot; <strong>Dropdown Logistics</strong> &middot; March 2026</div>
        </div>
      </section>

      <section className="close-section">
        <div className="close-statement"><strong>signal &#x2192; structure &#x2192; edge</strong><br />Early access open. Schema in progress. First build ships soon.</div>
        <div className="close-ctas">
          <a href="https://blindspot.bet" target="_blank" rel="noopener noreferrer" className="btn-primary">blindspot.bet &#x2197;</a>
          <a href="/blindspot" className="btn-secondary">&#x2190; BlindSpot Hub</a>
        </div>
      </section>

      <footer className="page-footer">
        <div className="footer-left"><strong>blindspot.bet</strong> &middot; D&amp;A Analytics &middot; A Dropdown Logistics Product</div>
        <div className="footer-right">built by two people who share actual DNA &middot; Chaos &#x2192; Structured &#x2192; Automated</div>
      </footer>
    </>
  );
}
