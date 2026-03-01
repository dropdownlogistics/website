'use client';

import { useState, useEffect, useRef } from 'react';

const PHASES = [
  {num:0,name:"Intent Anchoring",color:"#B23531",desc:"Define what the system is FOR before defining what it DOES. The intent statement constrains every downstream decision.",
    outputs:["Intent statement","Non-goals list","Audience declaration"],principles:["OBS-16: Intent Preservation Across Transforms","OBS-29: Non-Goals as Build Contract"]},
  {num:1,name:"Domain Decomposition",color:"#D4A053",desc:"Break the domain into its natural dimensions. Find the grain. Identify what a single row represents.",
    outputs:["Grain statement","Dimension inventory","Fact table sketch"],principles:["PRO-02: Star Schema as Default Architecture","OBS-22: Domain-Agnostic Pattern Application"]},
  {num:2,name:"Canonical Structure",color:"#7B8EC8",desc:"Lock the schema. Name every field, table, and relationship. The naming IS the governance.",
    outputs:["Schema definition","Field glossary","Relationship map"],principles:["REC-05: Canonical Naming as Governance","OBS-11: Fixed Schema, Variable Content"]},
  {num:3,name:"Constraint & Governance",color:"#0E6C25",desc:"Embed guardrails structurally. Validation, dropdowns, conditional formatting \u2014 the architecture enforces the rules.",
    outputs:["Validation rules","Governance layer spec","Error handling design"],principles:["OBS-05: Embedded Guardrail Enforcement","OBS-35: Operational Constraint as Architecture Filter"]},
  {num:4,name:"Generation & Assembly",color:"#8B5CF6",desc:"Build the artifact. The structure is locked \u2014 now fill it. Content generation follows the governed schema.",
    outputs:["Working artifact","Synthetic data (if applicable)","Initial test results"],principles:["OBS-37: Synthetic Data as Proof of Concept","OBS-01: Governance at Creation"]},
  {num:5,name:"Review / Iterate / Lock",color:"#E8A87C",desc:"Council review. Adversarial challenge. Stress test. If it survives, freeze it. If it breaks, fix the architecture, not the content.",
    outputs:["Council review packet","Iteration log","Frozen artifact"],principles:["OBS-27: Adversarial Review Before Lock","REC-15: Invariant Test Harness as Governance Proof"]},
  {num:6,name:"Reuse / Scale / Monetize",color:"#DC2626",desc:"The system is a product. Package it. Skin it for different audiences. The engine computes once; presentation varies.",
    outputs:["Packaged deliverable","Client-facing surface","Reuse documentation"],principles:["OBS-24: Audience-Surface Separation","OBS-10: Composition Over Customization"]},
];

const META_PRINCIPLES = [
  {name:"Chaos \u2192 Structured \u2192 Automated",desc:"Every system starts as chaos. Structure is the first product. Automation comes last, if at all."},
  {name:"The Grain is the Contract",desc:"Until you can state what one row represents, you don\u2019t have a system. You have a spreadsheet."},
  {name:"Governance at Creation, Not Retrofit",desc:"Build the changelog alongside the first formula. Documentation is a build artifact, not a post-build task."},
  {name:"Architecture \u2260 Domain",desc:"The same pattern builds audit engines, cocktail programs, and wedding planners. Architecture doesn\u2019t care about content."},
  {name:"Ship with Data, Not Specs",desc:"Clients react to working products. Synthetic data makes the demo real before the client\u2019s data arrives."},
];

export default function MethodologyPage() {
  const [activePhase,setActivePhase]=useState<number|null>(null);
  const [visiblePhases,setVisiblePhases]=useState<Set<number>>(new Set());
  const refs=useRef<(HTMLDivElement|null)[]>([]);

  useEffect(()=>{
    const obs=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{if(e.isIntersecting){const i=Number(e.target.getAttribute('data-idx'));
        setVisiblePhases(prev=>{const n=new Set(prev);n.add(i);return n;});}});
    },{threshold:0.2});
    refs.current.forEach(r=>{if(r)obs.observe(r);});
    return()=>obs.disconnect();
  },[]);

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .meth-root{background:#141F33;color:#F5F4F2;font-family:'DM Sans',sans-serif;min-height:100vh;}
        .meth-root::before{content:'';position:fixed;inset:0;background:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");pointer-events:none;z-index:1;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}
        .phase-block{opacity:0;transform:translateY(40px);transition:all 0.8s cubic-bezier(0.16,1,0.3,1);}
        .phase-block.visible{opacity:1;transform:translateY(0);}
        .phase-block:hover{background:rgba(245,244,242,0.03);}
        .principle-tag{display:inline-block;padding:4px 10px;border-radius:4px;font-size:11px;font-family:'JetBrains Mono',monospace;background:rgba(178,53,49,0.1);color:rgba(178,53,49,0.8);margin:2px 4px 2px 0;letter-spacing:0.5px;}
      `}</style>

      <div className="meth-root" style={{paddingTop:60}}>
        <div style={{minHeight:'50vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',textAlign:'center',padding:'60px 40px',position:'relative',zIndex:2}}>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:4,textTransform:'uppercase',color:'#5C677D',marginBottom:40,animation:'fadeUp 1s ease 0.2s both'}}>
            DDL Build Process</div>
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:'clamp(42px,7vw,80px)',lineHeight:1,animation:'fadeUp 1s ease 0.4s both'}}>
            Construction Flow</h1>
          <p style={{fontSize:16,color:'#8A8E94',marginTop:16,maxWidth:600,lineHeight:1.6,animation:'fadeUp 1s ease 0.6s both'}}>
            Seven phases from intent to delivery. The methodology that builds audit engines, cocktail programs, and everything in between.</p>
          <div style={{display:'flex',gap:12,marginTop:48,animation:'fadeUp 1s ease 0.8s both'}}>
            {PHASES.map(p=>(
              <div key={p.num} style={{display:'flex',alignItems:'center',gap:6,cursor:'pointer'}} onClick={()=>document.getElementById(`phase-${p.num}`)?.scrollIntoView({behavior:'smooth'})}>
                <div style={{width:28,height:28,borderRadius:'50%',background:p.color,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'JetBrains Mono',monospace",fontSize:11,fontWeight:700,color:'#FFF'}}>{p.num}</div>
                {p.num<6&&<div style={{width:20,height:1,background:'rgba(245,244,242,0.15)'}}/>}
              </div>))}
          </div>
        </div>

        <div style={{maxWidth:900,margin:'0 auto',padding:'0 40px 80px',position:'relative',zIndex:2}}>
          {PHASES.map((phase,i)=>(
            <div key={phase.num} id={`phase-${phase.num}`} ref={el=>{refs.current[i]=el;}} data-idx={i}
              className={`phase-block ${visiblePhases.has(i)?'visible':''}`}
              style={{marginBottom:60,padding:32,borderRadius:8,border:'1px solid rgba(245,244,242,0.05)',transitionDelay:`${i*0.08}s`,cursor:'pointer'}}
              onClick={()=>setActivePhase(activePhase===phase.num?null:phase.num)}>
              <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:16}}>
                <div style={{width:48,height:48,borderRadius:'50%',background:phase.color,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'JetBrains Mono',monospace",fontSize:18,fontWeight:700,color:'#FFF',flexShrink:0}}>{phase.num}</div>
                <div>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:3,textTransform:'uppercase',color:phase.color}}>Phase {phase.num}</div>
                  <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:28,margin:0,lineHeight:1.2}}>{phase.name}</h2>
                </div>
              </div>
              <p style={{fontSize:15,lineHeight:1.7,color:'rgba(245,244,242,0.75)',marginBottom:16}}>{phase.desc}</p>
              
              {(activePhase===phase.num)&&(
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginTop:20,paddingTop:20,borderTop:'1px solid rgba(245,244,242,0.06)'}}>
                  <div>
                    <h3 style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:3,color:phase.color,marginBottom:12}}>OUTPUTS</h3>
                    {phase.outputs.map(o=>(
                      <div key={o} style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
                        <div style={{width:4,height:4,borderRadius:'50%',background:phase.color,flexShrink:0}}/>
                        <span style={{fontSize:13,color:'rgba(245,244,242,0.7)'}}>{o}</span>
                      </div>))}
                  </div>
                  <div>
                    <h3 style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:3,color:phase.color,marginBottom:12}}>GOVERNING STANDARDS</h3>
                    {phase.principles.map(p=><span key={p} className="principle-tag">{p}</span>)}
                  </div>
                </div>
              )}
            </div>))}

          <div style={{marginTop:80,paddingTop:40,borderTop:'1px solid rgba(178,53,49,0.2)'}}>
            <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:28,marginBottom:24}}>Meta-Principles</h2>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              {META_PRINCIPLES.map(mp=>(
                <div key={mp.name} style={{padding:20,borderLeft:'3px solid #B23531',background:'rgba(245,244,242,0.02)',borderRadius:'0 8px 8px 0'}}>
                  <h3 style={{fontSize:15,fontWeight:600,marginBottom:6}}>{mp.name}</h3>
                  <p style={{fontSize:13,color:'rgba(245,244,242,0.6)',lineHeight:1.6,margin:0}}>{mp.desc}</p>
                </div>))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
