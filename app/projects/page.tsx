'use client';

import { useState } from 'react';

const PROJECTS = [
  {id:"DVP-001",name:"VetSchedule",client:"Nichole",status:"v1.0 Delivered",domain:"Veterinary / Analytics",
    desc:"Vet clinic scheduling analytics. Provider utilization, no-shows, wait times, revenue from existing appointment data.",
    schemas:["SYS-030","PRO-02","OBS-37","OBS-24"],stats:{records:"7,331",type:"appointments"},
    deliverables:["Working xlsx engine","HTML landing page","7,331 synthetic appointments"]},
  {id:"DVP-002",name:"Drinks-O-System",client:"Serge",status:"v0.1 Delivered",domain:"Hospitality / Analytics",
    desc:"Cocktail intelligence engine. 127 recipes, pour cost/margin, creative gap analysis, ingredient network. IP security by architecture.",
    schemas:["SYS-031","OBS-36","OBS-30","OBS-24"],stats:{records:"127",type:"recipes"},
    deliverables:["Interactive dashboard","Marketing flyer","IP security documentation"]},
  {id:"DVP-003",name:"GrantTracker",client:"Spay/Neuter Clinics",status:"v1.0 Delivered",domain:"Nonprofit / Compliance",
    desc:"Grant compliance for low-cost spay/neuter clinics. Fund balances, expenditures, compliance deadlines. Strongest product-market fit in the DexVerse.",
    schemas:["SYS-032","PRO-02","PRO-03","OBS-05"],stats:{records:"N/A",type:"expenditures"},
    deliverables:["Working xlsx engine","HTML dashboard","Service model pitch"]},
  {id:"DVP-004",name:"BlindSpot: Trading",client:"Alex",status:"Active",domain:"Finance / Analytics",
    desc:"Dimensional analytics for active trading \u2014 surfacing blind spots in decision-making that pen-and-paper can\u2019t reveal.",
    schemas:["SYS-027","OBS-30","OBS-08","PRO-02"],stats:{records:"117%",type:"return tracking"},
    deliverables:["Trading analytics engine","Gap detection reports"]},
  {id:"DVP-005",name:"PayGuard",client:"Sophia",status:"Dashboard Delivered",domain:"HR / Payroll Compliance",
    desc:"Benefits compliance engine. Duplicate deductions, 401k gaps, enrollment mismatches. Sophia described an audit program without knowing the vocabulary.",
    schemas:["SYS-033","OBS-30","OBS-05"],stats:{records:"N/A",type:"deductions"},
    deliverables:["payguard.html dashboard"]},
  {id:"DVP-006",name:"GetSum",client:"Personal",status:"Dashboard Delivered",domain:"Personal Finance",
    desc:"Deterministic capital analysis. Every variance classified: Environmental, Execution, Structural. No motivational tone.",
    schemas:["SYS-034","OBS-08","PRO-02"],stats:{records:"N/A",type:"transactions"},
    deliverables:["getsum.html terminal dashboard"]},
];

const STATUS_C: Record<string,string> = {
  "v1.0 Delivered":"#66BB6A","v0.1 Delivered":"#66BB6A","Active":"#64B5F6","Dashboard Delivered":"#FFB74D",
};

export default function ProjectsPage() {
  const [selected,setSelected]=useState<string|null>(null);
  const sel=PROJECTS.find(p=>p.id===selected);

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=DM+Sans:wght@400;500;700&display=swap');
        .proj-root{background:#0d1117;color:#c9d1d9;font-family:'JetBrains Mono',monospace;min-height:100vh;}
        .proj-card{background:#161b22;border:1px solid #30363d;border-radius:6px;padding:20px;cursor:pointer;transition:all 0.3s;}
        .proj-card:hover{border-color:#58a6ff;transform:translateY(-2px);}
        .proj-card.active{border-color:#58a6ff;background:#1c2128;}
        .proj-tag{display:inline-block;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:500;}
      `}</style>

      <div className="proj-root" style={{paddingTop:60}}>
        <div style={{padding:'40px 48px 0'}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
            <span style={{color:'#58a6ff'}}>~/</span>
            <span style={{fontSize:12,letterSpacing:2,textTransform:'uppercase',color:'#8b949e'}}>dexverse</span>
            <span style={{color:'#58a6ff'}}>/</span>
            <span style={{fontSize:12,letterSpacing:2,textTransform:'uppercase',color:'#c9d1d9'}}>projects</span>
          </div>
          <h1 style={{fontFamily:"'DM Sans',sans-serif",fontSize:36,fontWeight:700,color:'#f0f6fc',marginTop:8}}>
            DexVerse Project Registry</h1>
          <p style={{color:'#8b949e',fontSize:14,marginTop:8}}>
            Client projects built with DDL methodology. Same architecture, different domains.</p>
          <div style={{display:'flex',gap:24,marginTop:24,paddingBottom:20,borderBottom:'1px solid #30363d'}}>
            <div style={{textAlign:'center'}}><div style={{fontSize:28,fontWeight:700,color:'#58a6ff'}}>{PROJECTS.length}</div><div style={{fontSize:10,color:'#8b949e',letterSpacing:1}}>PROJECTS</div></div>
            <div style={{textAlign:'center'}}><div style={{fontSize:28,fontWeight:700,color:'#58a6ff'}}>{new Set(PROJECTS.map(p=>p.client)).size}</div><div style={{fontSize:10,color:'#8b949e',letterSpacing:1}}>CLIENTS</div></div>
            <div style={{textAlign:'center'}}><div style={{fontSize:28,fontWeight:700,color:'#58a6ff'}}>{new Set(PROJECTS.flatMap(p=>p.schemas)).size}</div><div style={{fontSize:10,color:'#8b949e',letterSpacing:1}}>DDL SCHEMAS</div></div>
          </div>
        </div>

        <div style={{display:'flex',gap:24,padding:'32px 48px 80px'}}>
          <div style={{flex:1,display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))',gap:16,alignContent:'start'}}>
            {PROJECTS.map(p=>(
              <div key={p.id} className={`proj-card ${selected===p.id?'active':''}`} onClick={()=>setSelected(selected===p.id?null:p.id)}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                  <span style={{fontSize:11,color:'#58a6ff'}}>{p.id}</span>
                  <span className="proj-tag" style={{background:`${STATUS_C[p.status]||'#8b949e'}22`,color:STATUS_C[p.status]||'#8b949e'}}>{p.status}</span>
                </div>
                <h3 style={{fontFamily:"'DM Sans',sans-serif",fontSize:18,fontWeight:700,color:'#f0f6fc',margin:'0 0 4px'}}>{p.name}</h3>
                <div style={{fontSize:11,color:'#8b949e',marginBottom:10}}>{p.domain} &middot; Client: {p.client}</div>
                <p style={{fontSize:12,color:'#8b949e',lineHeight:1.5,margin:0,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical' as any,overflow:'hidden'}}>{p.desc}</p>
                <div style={{display:'flex',gap:4,marginTop:12,flexWrap:'wrap'}}>
                  {p.schemas.map(s=><span key={s} style={{padding:'2px 6px',borderRadius:3,background:'rgba(88,166,255,0.1)',color:'#58a6ff',fontSize:10}}>{s}</span>)}
                </div>
              </div>))}
          </div>

          {sel&&(
            <div style={{width:340,flexShrink:0,background:'#161b22',border:'1px solid #30363d',borderRadius:6,padding:24,alignSelf:'start',position:'sticky',top:140}}>
              <div style={{fontSize:11,color:'#58a6ff',marginBottom:4}}>{sel.id}</div>
              <h2 style={{fontFamily:"'DM Sans',sans-serif",fontSize:22,fontWeight:700,color:'#f0f6fc',margin:'0 0 4px'}}>{sel.name}</h2>
              <div style={{fontSize:12,color:'#8b949e',marginBottom:16}}>{sel.domain} &middot; {sel.status}</div>
              <p style={{fontSize:13,color:'#c9d1d9',lineHeight:1.6,marginBottom:20}}>{sel.desc}</p>
              <div style={{marginBottom:16}}>
                <div style={{fontSize:10,letterSpacing:2,color:'#58a6ff',marginBottom:8}}>DELIVERABLES</div>
                {sel.deliverables.map(d=>(
                  <div key={d} style={{display:'flex',alignItems:'center',gap:8,padding:'4px 0',fontSize:12,color:'#c9d1d9'}}>
                    <span style={{color:'#58a6ff'}}>&#10003;</span>{d}</div>))}
              </div>
              <div>
                <div style={{fontSize:10,letterSpacing:2,color:'#58a6ff',marginBottom:8}}>DDL SCHEMAS</div>
                {sel.schemas.map(s=><span key={s} style={{display:'inline-block',padding:'3px 8px',borderRadius:3,background:'rgba(88,166,255,0.1)',color:'#58a6ff',fontSize:11,margin:'0 4px 4px 0'}}>{s}</span>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
