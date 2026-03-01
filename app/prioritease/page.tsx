'use client';

import { useState } from 'react';

const PROJECTS = [
  {name:"PrioritEase v2",priority:"High",ease:"Easy",zone:"DO NOW",verdict:"Finalize, freeze, implement immediately",risk:null,step:1},
  {name:"CF Utility v0.1",priority:"High",ease:"Moderate",zone:"SCHEDULE",verdict:"Primary build candidate. Solves real friction \u2014 CF pain even for power users. Externally visible leverage.",risk:"Over-expanding into macro engine or LET generator",step:2},
  {name:"Dim Utility",priority:"High",ease:"Hard",zone:"PLAN",verdict:"Architecture mapping only \u2014 no build until CF Utility is validated.",risk:"Cathedral trigger. Easily balloons into generator framework",step:3},
  {name:"Unified Dim + CF Workbook",priority:"Medium",ease:"Hard",zone:"PARK",verdict:"Conceptually elegant but premature. No validation of independent modules yet.",risk:"Scope creep via premature integration",step:4},
  {name:"CodeAcademy Sandbox",priority:"Medium",ease:"Moderate",zone:"BACKLOG",verdict:"Personal capability engine. Enhance opportunistically when primary track pauses.",risk:"Infrastructure rabbit hole",step:5},
  {name:"Council Surface Scan",priority:"Medium",ease:"Easy",zone:"QUICK WIN",verdict:"Low friction clarity tool. Run sparingly \u2014 overuse becomes ideation treadmill.",risk:null,step:6},
];

const ZC: Record<string,string> = {"DO NOW":"#9B111E","SCHEDULE":"#D4A053","PLAN":"#7B8EC8","QUICK WIN":"#0E6C25","BACKLOG":"rgba(92,103,125,0.7)","PARK":"#5C677D"};

const GRID: [string,string,string][] = [
  ["DO NOW","SCHEDULE","PLAN"],
  ["QUICK WIN","BACKLOG","PARK"],
];
const EASE = ["Easy","Moderate","Hard"];
const PRIO = ["High","Medium"];

const RUBRIC_P = [
  {level:"High",color:"#9B111E",desc:"Unblocks other work, external leverage, solves active friction"},
  {level:"Medium",color:"#D4A053",desc:"Valuable but doesn\u2019t unblock. Personal capability or future-state"},
  {level:"Low",color:"#5C677D",desc:"Nice to have. No urgency. No dependency chain"},
];
const RUBRIC_E = [
  {level:"Easy",color:"#0E6C25",desc:"Bounded artifact. Clear scope. One session or less"},
  {level:"Moderate",color:"#D4A053",desc:"Clear v0.1 boundary possible. Multi-session but shippable"},
  {level:"Hard",color:"#9B111E",desc:"Cathedral risk. Deep spec required. Scope creep likely"},
];
const RUBRIC_Z = [
  {zone:"DO NOW",desc:"High Priority + Easy \u2014 Execute immediately. No scheduling needed."},
  {zone:"SCHEDULE",desc:"High Priority + Moderate \u2014 Primary build candidate. Bounded scope required."},
  {zone:"PLAN",desc:"High Priority + Hard \u2014 Architecture only. No build until prerequisites validated."},
  {zone:"QUICK WIN",desc:"Medium Priority + Easy \u2014 Low friction. Run sparingly to prevent drift."},
  {zone:"BACKLOG",desc:"Medium Priority + Moderate \u2014 Enhance opportunistically. Not primary track."},
  {zone:"PARK",desc:"Medium Priority + Hard \u2014 Log and revisit. Premature until dependencies resolved."},
];

export default function PrioritEasePage() {
  const [view,setView] = useState<'grid'|'sequence'|'rubric'>('grid');

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&display=swap');
        .pe-root{background:#0D1B2A;color:#F0EDE8;font-family:'Space Grotesk',sans-serif;min-height:100vh;}
        .pe-tab{font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#5C677D;background:none;border:none;padding:12px 24px;cursor:pointer;position:relative;transition:color 0.3s;}
        .pe-tab:hover{color:#F0EDE8;}.pe-tab.active{color:#F0EDE8;}
        .pe-tab.active::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:2px;background:#9B111E;}
        .pe-zone-card{background:rgba(27,38,59,0.5);border:1px solid rgba(92,103,125,0.15);border-radius:4px;padding:20px;min-height:140px;position:relative;transition:all 0.3s;}
        .pe-zone-card:hover{border-color:rgba(155,17,30,0.4);background:rgba(27,38,59,0.7);}
        .pe-proj{padding:12px 14px;border-radius:4px;background:rgba(15,27,42,0.6);cursor:pointer;transition:all 0.3s;}
        .pe-proj:hover{background:rgba(15,27,42,0.9);}
        @keyframes slideIn{from{opacity:0;transform:translateX(-20px);}to{opacity:1;transform:translateX(0);}}
      `}</style>

      <div className="pe-root" style={{paddingTop:60}}>
        <div style={{padding:'40px 48px 0'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:3,textTransform:'uppercase',color:'#5C677D'}}>
              Dropdown <span style={{color:'#9B111E'}}>Logistics</span></div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:2,background:'#9B111E',color:'#F0EDE8',padding:'3px 10px',borderRadius:2}}>v2.0 CANONICAL</div>
          </div>
          <h1 style={{fontSize:42,fontWeight:700,letterSpacing:-1,lineHeight:1.1,marginTop:12}}>Priorit<span style={{color:'#9B111E'}}>Ease</span></h1>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,color:'#5C677D',marginTop:8}}>Priority &times; Ease Scoring Framework &mdash; Frozen Artifact</div>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:14,color:'rgba(155,17,30,0.8)',marginTop:6,letterSpacing:1}}>Chaos &rarr; Structured &rarr; Automated</div>
          <div style={{borderBottom:'1px solid rgba(155,17,30,0.6)',marginTop:20}}/>
        </div>

        <div style={{display:'flex',gap:0,margin:'0 48px',borderBottom:'1px solid rgba(92,103,125,0.3)'}}>
          {(['grid','sequence','rubric'] as const).map(v=>(
            <button key={v} className={`pe-tab ${view===v?'active':''}`} onClick={()=>setView(v)}>
              {v==='grid'?'Priority Grid':v==='sequence'?'Build Sequence':'Scoring Rubric'}</button>))}
        </div>

        <div style={{padding:'40px 48px 80px'}}>
          {view==='grid'&&(
            <div>
              <h2 style={{fontSize:24,fontWeight:600,marginBottom:4}}>Priority &times; Ease Matrix</h2>
              <p style={{color:'#5C677D',fontSize:13,marginBottom:24}}>6 projects scored across two dimensions. Click any project for details.</p>
              <div style={{display:'grid',gridTemplateColumns:'80px 1fr 1fr 1fr',gap:3}}>
                <div/>{EASE.map(e=><div key={e} style={{textAlign:'center',fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:'#5C677D',padding:8}}>{e}</div>)}
                {PRIO.map((p,pi)=><>
                  <div key={p} style={{display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:'#5C677D',writingMode:'vertical-rl',transform:'rotate(180deg)'}}>{p}</div>
                  {GRID[pi].map(zone=>{const proj=PROJECTS.find(pr=>pr.zone===zone);return(
                    <div key={zone} className="pe-zone-card">
                      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:2,textTransform:'uppercase',color:ZC[zone],marginBottom:16}}>{zone}</div>
                      {proj&&(<div className="pe-proj" style={{borderLeft:`3px solid ${ZC[zone]}`}}>
                        <div style={{fontWeight:600,fontSize:15,marginBottom:4}}>{proj.name}</div>
                        <div style={{fontSize:12,color:'rgba(240,237,232,0.6)',lineHeight:1.5}}>{proj.verdict}</div>
                        {proj.risk&&<div style={{fontSize:11,color:'#9B111E',marginTop:8,fontFamily:"'JetBrains Mono',monospace"}}>&#9888; {proj.risk}</div>}
                      </div>)}
                    </div>);})}
                </>)}
              </div>
            </div>
          )}

          {view==='sequence'&&(
            <div>
              <h2 style={{fontSize:24,fontWeight:600,marginBottom:4}}>Build Sequence</h2>
              <p style={{color:'#5C677D',fontSize:13,marginBottom:24}}>Execution order based on scoring results. Each step unlocks the next.</p>
              <div style={{maxWidth:700}}>
                {PROJECTS.sort((a,b)=>a.step-b.step).map((p,i)=>(
                  <div key={p.name} style={{display:'flex',gap:20,marginBottom:i<PROJECTS.length-1?0:0,animation:`slideIn 0.5s ease ${i*0.1}s both`}}>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center',minWidth:40}}>
                      <div style={{width:32,height:32,borderRadius:'50%',background:ZC[p.zone],display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'JetBrains Mono',monospace",fontSize:14,fontWeight:700,color:'#F0EDE8',flexShrink:0}}>{p.step}</div>
                      {i<PROJECTS.length-1&&<div style={{width:1,flex:1,background:'rgba(92,103,125,0.3)',minHeight:40}}/>}
                    </div>
                    <div style={{background:'rgba(27,38,59,0.5)',border:'1px solid rgba(92,103,125,0.15)',borderRadius:4,padding:20,flex:1,marginBottom:12}}>
                      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                        <span style={{fontSize:17,fontWeight:600}}>{p.name}</span>
                        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:2,textTransform:'uppercase',color:ZC[p.zone],background:'rgba(0,0,0,0.2)',padding:'2px 8px',borderRadius:2}}>{p.zone}</span>
                      </div>
                      <div style={{fontSize:13,color:'rgba(240,237,232,0.7)',lineHeight:1.6}}>{p.verdict}</div>
                      <div style={{display:'flex',gap:12,marginTop:10,fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:'#5C677D'}}>
                        <span>Priority: <span style={{color:'#F0EDE8'}}>{p.priority}</span></span>
                        <span>Ease: <span style={{color:'#F0EDE8'}}>{p.ease}</span></span>
                      </div>
                    </div>
                  </div>))}
              </div>
            </div>
          )}

          {view==='rubric'&&(
            <div>
              <h2 style={{fontSize:24,fontWeight:600,marginBottom:4}}>Scoring Rubric</h2>
              <p style={{color:'#5C677D',fontSize:13,marginBottom:32}}>How Priority and Ease are evaluated and how zones are assigned.</p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,marginBottom:32}}>
                <div style={{background:'rgba(27,38,59,0.5)',border:'1px solid rgba(92,103,125,0.15)',borderRadius:4,padding:24}}>
                  <h3 style={{fontSize:14,fontWeight:600,marginBottom:16,fontFamily:"'JetBrains Mono',monospace",letterSpacing:1}}>PRIORITY LEVELS</h3>
                  {RUBRIC_P.map(r=>(<div key={r.level} style={{display:'flex',gap:12,marginBottom:12,alignItems:'flex-start'}}>
                    <div style={{width:8,height:8,borderRadius:'50%',background:r.color,marginTop:6,flexShrink:0}}/>
                    <div><div style={{fontWeight:600,fontSize:14,marginBottom:2}}>{r.level}</div><div style={{fontSize:12,color:'rgba(240,237,232,0.6)',lineHeight:1.5}}>{r.desc}</div></div>
                  </div>))}
                </div>
                <div style={{background:'rgba(27,38,59,0.5)',border:'1px solid rgba(92,103,125,0.15)',borderRadius:4,padding:24}}>
                  <h3 style={{fontSize:14,fontWeight:600,marginBottom:16,fontFamily:"'JetBrains Mono',monospace",letterSpacing:1}}>EASE LEVELS</h3>
                  {RUBRIC_E.map(r=>(<div key={r.level} style={{display:'flex',gap:12,marginBottom:12,alignItems:'flex-start'}}>
                    <div style={{width:8,height:8,borderRadius:'50%',background:r.color,marginTop:6,flexShrink:0}}/>
                    <div><div style={{fontWeight:600,fontSize:14,marginBottom:2}}>{r.level}</div><div style={{fontSize:12,color:'rgba(240,237,232,0.6)',lineHeight:1.5}}>{r.desc}</div></div>
                  </div>))}
                </div>
              </div>
              <div style={{background:'rgba(27,38,59,0.5)',border:'1px solid rgba(92,103,125,0.15)',borderRadius:4,padding:24}}>
                <h3 style={{fontSize:14,fontWeight:600,marginBottom:16,fontFamily:"'JetBrains Mono',monospace",letterSpacing:1}}>ZONE DEFINITIONS</h3>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                  {RUBRIC_Z.map(z=>(<div key={z.zone} style={{padding:14,borderLeft:`3px solid ${ZC[z.zone]}`,background:'rgba(15,27,42,0.5)',borderRadius:'0 4px 4px 0'}}>
                    <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:2,color:ZC[z.zone],marginBottom:6}}>{z.zone}</div>
                    <div style={{fontSize:12,color:'rgba(240,237,232,0.7)',lineHeight:1.5}}>{z.desc}</div>
                  </div>))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
