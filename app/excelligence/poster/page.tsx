'use client';

import { useState, useEffect } from 'react';

const TAXONOMY = ["FRM \u2014 Formula","PTN \u2014 Pattern","KEY \u2014 Shortcut","CON \u2014 Convention","ARC \u2014 Architecture","ANT \u2014 Anti-Pattern","PQ \u2014 Power Query"];
const TIERS = ["Beginner","Intermediate","Advanced","Expert"];
const TIER_COLORS: Record<string,string> = {Beginner:"#10B981",Intermediate:"#3B82F6",Advanced:"#8B5CF6",Expert:"#EF4444"};

export default function CathedralPosterPage() {
  const [visible,setVisible]=useState(false);
  useEffect(()=>{setTimeout(()=>setVisible(true),100);},[]);

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .cath-root{background:#0A0E1A;color:#E8E4DC;font-family:'DM Sans',sans-serif;min-height:100vh;overflow-x:hidden;}
        .cath-root::before{content:'';position:fixed;inset:0;background:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");pointer-events:none;z-index:0;}
        .cath-root::after{content:'';position:fixed;inset:0;background:radial-gradient(ellipse at 50% 30%,rgba(178,53,49,0.08) 0%,transparent 60%);pointer-events:none;z-index:0;}
        @keyframes cathedralReveal{from{opacity:0;transform:translateY(60px) scale(0.95);}to{opacity:1;transform:translateY(0) scale(1);}}
        @keyframes glowPulse{0%,100%{text-shadow:0 0 40px rgba(178,53,49,0.3);}50%{text-shadow:0 0 80px rgba(178,53,49,0.5);}}
        .cath-reveal{opacity:0;animation:cathedralReveal 1.2s cubic-bezier(0.16,1,0.3,1) forwards;}
        .cath-glow{animation:glowPulse 4s ease-in-out infinite;}
        .cath-chip{display:inline-block;padding:6px 14px;border-radius:4px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:1px;background:rgba(178,53,49,0.1);border:1px solid rgba(178,53,49,0.2);color:rgba(232,228,220,0.8);margin:3px;transition:all 0.3s;}
        .cath-chip:hover{background:rgba(178,53,49,0.2);border-color:rgba(178,53,49,0.4);color:#E8E4DC;}
      `}</style>

      <div className="cath-root" style={{paddingTop:60}}>
        <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',textAlign:'center',padding:'60px 40px',position:'relative',zIndex:1}}>
          <div className={visible?'cath-reveal':''} style={{animationDelay:'0.2s'}}>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:6,textTransform:'uppercase',color:'rgba(178,53,49,0.6)',marginBottom:48}}>
              Dropdown Logistics Presents</div>
          </div>
          <div className={visible?'cath-reveal':''} style={{animationDelay:'0.5s'}}>
            <h1 className="cath-glow" style={{fontFamily:"'DM Serif Display',serif",fontSize:'clamp(56px,10vw,120px)',lineHeight:0.9,color:'#E8E4DC',letterSpacing:-2}}>
              Excelligence</h1>
          </div>
          <div className={visible?'cath-reveal':''} style={{animationDelay:'0.8s'}}>
            <p style={{fontSize:18,color:'rgba(232,228,220,0.5)',marginTop:16,maxWidth:500,lineHeight:1.6,fontStyle:'italic'}}>
              The governed pattern registry for Excel knowledge.</p>
          </div>
          <div className={visible?'cath-reveal':''} style={{animationDelay:'1.1s'}}>
            <div style={{display:'flex',gap:48,marginTop:56}}>
              {[{n:'9',l:'Council Models'},{n:'26',l:'Locked Decisions'},{n:'18',l:'Schema Fields'}].map(s=>(
                <div key={s.l}>
                  <div style={{fontFamily:"'DM Serif Display',serif",fontSize:48,color:'#B23531'}}>{s.n}</div>
                  <div style={{fontSize:10,letterSpacing:3,textTransform:'uppercase',color:'rgba(232,228,220,0.4)'}}>{s.l}</div>
                </div>))}
            </div>
          </div>
        </div>

        <div style={{padding:'0 48px 120px',maxWidth:900,margin:'0 auto',position:'relative',zIndex:1}}>
          <div className={visible?'cath-reveal':''} style={{animationDelay:'1.4s',marginBottom:60}}>
            <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:28,marginBottom:16}}>Taxonomy</h2>
            <div style={{display:'flex',flexWrap:'wrap',gap:0}}>
              {TAXONOMY.map(t=><span key={t} className="cath-chip">{t}</span>)}
            </div>
          </div>

          <div className={visible?'cath-reveal':''} style={{animationDelay:'1.6s',marginBottom:60}}>
            <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:28,marginBottom:16}}>Tier Flow</h2>
            <div style={{display:'flex',alignItems:'center',gap:0}}>
              {TIERS.map((t,i)=>(
                <div key={t} style={{display:'flex',alignItems:'center'}}>
                  <div style={{padding:'12px 24px',border:`1px solid ${TIER_COLORS[t]}44`,borderRadius:8,background:`${TIER_COLORS[t]}11`,textAlign:'center'}}>
                    <div style={{fontSize:13,fontWeight:600,color:TIER_COLORS[t]}}>{t}</div>
                  </div>
                  {i<TIERS.length-1&&<div style={{width:32,height:1,background:'rgba(178,53,49,0.3)'}}/>}
                </div>))}
            </div>
          </div>

          <div className={visible?'cath-reveal':''} style={{animationDelay:'1.8s',marginBottom:60}}>
            <div style={{padding:32,border:'1px solid rgba(178,53,49,0.15)',borderRadius:8,background:'rgba(178,53,49,0.03)'}}>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:3,color:'#B23531',marginBottom:12}}>COUNCIL QUOTE</div>
              <blockquote style={{fontFamily:"'DM Serif Display',serif",fontSize:24,lineHeight:1.5,color:'rgba(232,228,220,0.85)',margin:0,fontStyle:'italic'}}>
                &ldquo;Dave doesn&apos;t teach Excel. He governs it. Excelligence is the pattern registry that makes the difference between knowing a technique exists and knowing when to apply it.&rdquo;
              </blockquote>
              <div style={{fontSize:12,color:'rgba(232,228,220,0.4)',marginTop:16}}>&mdash; Council Synthesis, Excelligence Review</div>
            </div>
          </div>

          <div className={visible?'cath-reveal':''} style={{animationDelay:'2s',textAlign:'center'}}>
            <a href="/excelligence" style={{display:'inline-block',padding:'14px 32px',background:'#B23531',color:'#E8E4DC',borderRadius:6,fontSize:13,fontWeight:600,letterSpacing:1,textDecoration:'none',transition:'all 0.3s'}}>
              Enter the Graph Explorer &rarr;</a>
          </div>
        </div>
      </div>
    </>
  );
}
