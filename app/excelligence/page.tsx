'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';

const ENTRIES = [
  {id:"FRM-0001",name:"XLOOKUP",type:"FRM",tier:"Intermediate",intent:"When you need to retrieve a value from another table based on a lookup key, use XLOOKUP to return exact or approximate matches without column index dependency."},
  {id:"FRM-0002",name:"LET",type:"FRM",tier:"Advanced",intent:"When a formula requires intermediate calculations or repeated sub-expressions, use LET to name variables, improving readability, performance, and auditability."},
  {id:"ARC-0001",name:"MAKEARRAY Engine",type:"ARC",tier:"Expert",intent:"When you need to generate a dynamic grid of calculated values across two dimensions, use MAKEARRAY with LAMBDA to build self-constructing matrices."},
  {id:"ANT-0001",name:"Merged Cells",type:"ANT",tier:"Beginner",intent:"When you need visual alignment across cells, use Center Across Selection to achieve the appearance without breaking sorting, filtering, references, or copy-paste."},
  {id:"FRM-0003",name:"INDEX/MATCH",type:"FRM",tier:"Intermediate",intent:"When you need flexible lookups in legacy workbooks or left-facing retrieval, use INDEX/MATCH to reference any column without structural dependency on table layout."},
  {id:"FRM-0004",name:"LAMBDA",type:"FRM",tier:"Expert",intent:"When you need to create reusable custom functions without VBA, use LAMBDA to encapsulate logic into named, portable, testable function objects."},
  {id:"FRM-0005",name:"FILTER",type:"FRM",tier:"Intermediate",intent:"When you need to extract a subset of rows based on criteria, use FILTER to return dynamic arrays that automatically update without helper columns."},
  {id:"FRM-0006",name:"SUMPRODUCT",type:"FRM",tier:"Advanced",intent:"When you need multi-criteria aggregation without helper columns, use SUMPRODUCT to evaluate array conditions and return weighted or conditional totals."},
  {id:"PTN-0001",name:"Star Schema Layout",type:"PTN",tier:"Advanced",intent:"When you need to organize workbook data for scalable analysis, use star schema layout to separate dimension tables from fact tables."},
  {id:"KEY-0001",name:"Ctrl+T (Table Convert)",type:"KEY",tier:"Beginner",intent:"When you need structured references, auto-expansion, and Power Query readiness, use Ctrl+T to convert a range into a proper Excel Table."},
  {id:"CON-0001",name:"Center Across Selection",type:"CON",tier:"Beginner",intent:"When you need centered text spanning multiple columns, use Center Across Selection to achieve visual alignment without merging cells."},
  {id:"ANT-0002",name:"Volatile Functions",type:"ANT",tier:"Intermediate",intent:"When you encounter NOW, TODAY, INDIRECT, or OFFSET in performance-critical workbooks, use non-volatile alternatives to prevent full recalculation."},
  {id:"ARC-0002",name:"Spill-Range Architecture",type:"ARC",tier:"Advanced",intent:"When you need dynamic output that resizes automatically, use spill-range architecture to build formulas that expand without manual range management."},
  {id:"PQ-0001",name:"Power Query Load",type:"PQ",tier:"Intermediate",intent:"When you need to transform and load external data into a governed Excel Table, use Power Query to create repeatable, auditable data pipelines."},
];

const EDGES = [
  {source:"FRM-0001",target:"FRM-0002",type:"LEADS_TO"},{source:"FRM-0001",target:"ARC-0001",type:"LEADS_TO"},
  {source:"FRM-0002",target:"ARC-0001",type:"LEADS_TO"},{source:"FRM-0002",target:"FRM-0001",type:"DEPENDS_ON"},
  {source:"ARC-0001",target:"FRM-0002",type:"DEPENDS_ON"},{source:"ARC-0001",target:"FRM-0001",type:"DEPENDS_ON"},
  {source:"ANT-0001",target:"CON-0001",type:"LEADS_TO"},{source:"FRM-0003",target:"FRM-0001",type:"LEADS_TO"},
  {source:"FRM-0004",target:"FRM-0002",type:"DEPENDS_ON"},{source:"FRM-0004",target:"ARC-0001",type:"LEADS_TO"},
  {source:"FRM-0005",target:"ARC-0002",type:"LEADS_TO"},{source:"FRM-0005",target:"KEY-0001",type:"DEPENDS_ON"},
  {source:"FRM-0006",target:"FRM-0002",type:"LEADS_TO"},{source:"PTN-0001",target:"KEY-0001",type:"DEPENDS_ON"},
  {source:"PTN-0001",target:"FRM-0001",type:"DEPENDS_ON"},{source:"PTN-0001",target:"ARC-0001",type:"LEADS_TO"},
  {source:"KEY-0001",target:"FRM-0001",type:"LEADS_TO"},{source:"KEY-0001",target:"PQ-0001",type:"LEADS_TO"},
  {source:"CON-0001",target:"PTN-0001",type:"LEADS_TO"},{source:"ANT-0002",target:"FRM-0006",type:"LEADS_TO"},
  {source:"ARC-0002",target:"FRM-0005",type:"DEPENDS_ON"},{source:"ARC-0002",target:"FRM-0002",type:"DEPENDS_ON"},
  {source:"ARC-0002",target:"ARC-0001",type:"LEADS_TO"},{source:"PQ-0001",target:"KEY-0001",type:"DEPENDS_ON"},
  {source:"PQ-0001",target:"PTN-0001",type:"LEADS_TO"},
  {source:"FRM-0001",target:"FRM-0002",type:"PAIRS_WITH"},{source:"FRM-0002",target:"FRM-0004",type:"PAIRS_WITH"},
  {source:"ARC-0001",target:"FRM-0002",type:"PAIRS_WITH"},{source:"FRM-0005",target:"FRM-0001",type:"PAIRS_WITH"},
  {source:"ARC-0002",target:"FRM-0005",type:"PAIRS_WITH"},{source:"PQ-0001",target:"KEY-0001",type:"PAIRS_WITH"},
];

const TC: Record<string,{bg:string}> = {
  FRM:{bg:"#2563EB"},PTN:{bg:"#059669"},KEY:{bg:"#D97706"},CON:{bg:"#7C3AED"},ARC:{bg:"#DC2626"},ANT:{bg:"#6B7280"},PQ:{bg:"#0891B2"},
};
const TIER_Y: Record<string,number> = {Beginner:0,Intermediate:1,Advanced:2,Expert:3};
const TIER_C: Record<string,string> = {Beginner:"#10B981",Intermediate:"#3B82F6",Advanced:"#8B5CF6",Expert:"#EF4444"};
const EC: Record<string,string> = {LEADS_TO:"#2563EB",DEPENDS_ON:"#DC2626",PAIRS_WITH:"#9CA3AF"};
const EL: Record<string,string> = {LEADS_TO:"leads to",DEPENDS_ON:"depends on",PAIRS_WITH:"pairs with"};

function findPath(s: string, e: string): string[]|null {
  if(s===e)return[s];
  const adj: Record<string,string[]>={};
  ENTRIES.forEach(x=>{adj[x.id]=[];});
  EDGES.forEach(x=>{if(x.type==="LEADS_TO")adj[x.source]?.push(x.target);if(x.type==="DEPENDS_ON")adj[x.target]?.push(x.source);});
  const q:string[][]=[[s]];const v=new Set([s]);
  while(q.length>0){const p=q.shift()!;const c=p[p.length-1];if(c===e)return p;for(const n of(adj[c]||[])){if(!v.has(n)){v.add(n);q.push([...p,n]);}}}
  return null;
}

export default function ExcelligencePage() {
  const [selected,setSelected]=useState<string|null>(null);
  const [pathStart,setPathStart]=useState<string|null>(null);
  const [pathEnd,setPathEnd]=useState<string|null>(null);
  const [activePath,setActivePath]=useState<string[]|null>(null);
  const [filterTier,setFilterTier]=useState("All");
  const [filterType,setFilterType]=useState("All");
  const [edgeFilter,setEdgeFilter]=useState("All");
  const [mode,setMode]=useState<"explore"|"pathfind">("explore");
  const [hovered,setHovered]=useState<string|null>(null);
  const W=900,H=560;

  const [pos,setPos]=useState<Record<string,{x:number;y:number}>>(()=>{
    const p:Record<string,{x:number;y:number}>={};
    const tg:Record<number,string[]>={};
    ENTRIES.forEach(e=>{const t=TIER_Y[e.tier]??1;if(!tg[t])tg[t]=[];tg[t].push(e.id);});
    Object.keys(tg).forEach(tier=>{const g=tg[parseInt(tier)];const tn=parseInt(tier);const yB=80+tn*((H-160)/3);
      g.forEach((id,i)=>{const x=80+(i+0.5)*((W-160)/g.length);p[id]={x:x+(Math.random()-0.5)*40,y:yB+(Math.random()-0.5)*30};});});
    return p;
  });

  useEffect(()=>{
    let frame:number;let iter=0;const mx=200;
    const ps:Record<string,{x:number;y:number;vx:number;vy:number}>={};
    Object.keys(pos).forEach(k=>{ps[k]={...pos[k],vx:0,vy:0};});
    function step(){
      if(iter>=mx)return;iter++;const d=1-iter/mx;const ids=Object.keys(ps);
      for(let i=0;i<ids.length;i++){for(let j=i+1;j<ids.length;j++){
        const a=ps[ids[i]],b=ps[ids[j]];let dx=b.x-a.x,dy=b.y-a.y;let dist=Math.sqrt(dx*dx+dy*dy)||1;
        const f=8000/(dist*dist);const fx=(dx/dist)*f*d;const fy=(dy/dist)*f*d;a.vx-=fx;a.vy-=fy;b.vx+=fx;b.vy+=fy;}}
      EDGES.forEach(e=>{if(!ps[e.source]||!ps[e.target])return;const a=ps[e.source],b=ps[e.target];
        let dx=b.x-a.x,dy=b.y-a.y;let dist=Math.sqrt(dx*dx+dy*dy)||1;const f=(dist-120)*0.01*d;
        const fx=(dx/dist)*f;const fy=(dy/dist)*f;a.vx+=fx;a.vy+=fy;b.vx-=fx;b.vy-=fy;});
      ENTRIES.forEach(e=>{const p=ps[e.id];if(!p)return;const ty=70+(TIER_Y[e.tier]??1)*((H-140)/3);p.vy+=(ty-p.y)*0.03*d;});
      ids.forEach(id=>{const p=ps[id];p.vx*=0.6;p.vy*=0.6;p.x=Math.max(50,Math.min(W-50,p.x+p.vx));p.y=Math.max(40,Math.min(H-40,p.y+p.vy));});
      if(iter%5===0||iter===mx-1){const snap:Record<string,{x:number;y:number}>={};ids.forEach(id=>{snap[id]={x:ps[id].x,y:ps[id].y};});setPos(snap);}
      frame=requestAnimationFrame(step);}
    frame=requestAnimationFrame(step);return()=>cancelAnimationFrame(frame);
  },[]);

  const filtered=useMemo(()=>ENTRIES.filter(e=>(filterTier==="All"||e.tier===filterTier)&&(filterType==="All"||e.type===filterType)),[filterTier,filterType]);
  const fids=useMemo(()=>new Set(filtered.map(e=>e.id)),[filtered]);
  const vedges=useMemo(()=>EDGES.filter(e=>fids.has(e.source)&&fids.has(e.target)&&(edgeFilter==="All"||e.type===edgeFilter)),[fids,edgeFilter]);
  const pathSet=useMemo(()=>new Set(activePath||[]),[activePath]);
  const pathEdgeSet=useMemo(()=>{if(!activePath||activePath.length<2)return new Set<string>();const s=new Set<string>();for(let i=0;i<activePath.length-1;i++)s.add(`${activePath[i]}\u2192${activePath[i+1]}`);return s;},[activePath]);

  const handleClick=useCallback((id:string)=>{
    if(mode==="pathfind"){if(!pathStart){setPathStart(id);setPathEnd(null);setActivePath(null);}
      else if(!pathEnd&&id!==pathStart){setPathEnd(id);setActivePath(findPath(pathStart,id));}
      else{setPathStart(id);setPathEnd(null);setActivePath(null);}}
    else{setSelected(selected===id?null:id);}
  },[mode,pathStart,pathEnd,selected]);

  const clearPath=()=>{setPathStart(null);setPathEnd(null);setActivePath(null);};
  const sel=ENTRIES.find(e=>e.id===selected);
  const conEdges=selected?EDGES.filter(e=>e.source===selected||e.target===selected):[];

  function epath(src:string,tgt:string){const s=pos[src],t=pos[tgt];if(!s||!t)return"";const dx=t.x-s.x,dy=t.y-s.y,dist=Math.sqrt(dx*dx+dy*dy)||1,r=22;
    const sx=s.x+(dx/dist)*r,sy=s.y+(dy/dist)*r,tx=t.x-(dx/dist)*r,ty=t.y-(dy/dist)*r;return`M ${sx} ${sy} Q ${(sx+tx)/2+dy*0.15} ${(sy+ty)/2-dx*0.15} ${tx} ${ty}`;}

  return(
    <div style={{fontFamily:"'Inter','Arial',sans-serif",background:"#0F172A",color:"#E2E8F0",minHeight:"100vh",padding:"100px 24px 32px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,flexWrap:"wrap",gap:8}}>
        <div><h1 style={{margin:0,fontSize:22,fontWeight:700,color:"#F8FAFC",letterSpacing:-0.5}}>EXCELLIGENCE <span style={{color:"#64748B",fontWeight:400,fontSize:14}}>Graph Explorer</span></h1>
          <p style={{margin:"2px 0 0",fontSize:12,color:"#64748B"}}>{ENTRIES.length} entries &middot; {EDGES.length} edges &middot; v0.1.1</p></div>
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>{setMode("explore");clearPath();}} style={{padding:"6px 14px",fontSize:12,fontWeight:600,borderRadius:6,border:"none",cursor:"pointer",background:mode==="explore"?"#2563EB":"#1E293B",color:mode==="explore"?"#FFF":"#94A3B8"}}>Explore</button>
          <button onClick={()=>{setMode("pathfind");setSelected(null);clearPath();}} style={{padding:"6px 14px",fontSize:12,fontWeight:600,borderRadius:6,border:"none",cursor:"pointer",background:mode==="pathfind"?"#DC2626":"#1E293B",color:mode==="pathfind"?"#FFF":"#94A3B8"}}>Path Finder</button>
        </div>
      </div>

      <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap",alignItems:"center"}}>
        <span style={{fontSize:11,color:"#64748B",fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>Filter:</span>
        <select value={filterTier} onChange={e=>setFilterTier(e.target.value)} style={{background:"#1E293B",color:"#E2E8F0",border:"1px solid #334155",borderRadius:6,padding:"4px 8px",fontSize:12}}>
          <option value="All">All Tiers</option>{Object.keys(TIER_Y).map(t=><option key={t} value={t}>{t}</option>)}</select>
        <select value={filterType} onChange={e=>setFilterType(e.target.value)} style={{background:"#1E293B",color:"#E2E8F0",border:"1px solid #334155",borderRadius:6,padding:"4px 8px",fontSize:12}}>
          <option value="All">All Types</option>{Object.keys(TC).map(t=><option key={t} value={t}>{t}</option>)}</select>
        <select value={edgeFilter} onChange={e=>setEdgeFilter(e.target.value)} style={{background:"#1E293B",color:"#E2E8F0",border:"1px solid #334155",borderRadius:6,padding:"4px 8px",fontSize:12}}>
          <option value="All">All Edges</option><option value="LEADS_TO">LEADS_TO</option><option value="DEPENDS_ON">DEPENDS_ON</option><option value="PAIRS_WITH">PAIRS_WITH</option></select>
        <div style={{marginLeft:"auto",display:"flex",gap:10,alignItems:"center"}}>
          {Object.entries(TIER_C).map(([t,c])=>(<span key={t} style={{fontSize:10,display:"flex",alignItems:"center",gap:3}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:c,display:"inline-block"}}/><span style={{color:"#94A3B8"}}>{t}</span></span>))}
        </div>
      </div>

      {mode==="pathfind"&&(<div style={{background:"#1E293B",borderRadius:8,padding:"10px 14px",marginBottom:10,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
        <span style={{fontSize:12,color:"#94A3B8"}}>{!pathStart?"Click a start node":!pathEnd?"Click a target node":"Path calculated"}</span>
        {pathStart&&<span style={{fontSize:12,padding:"3px 8px",background:TC[ENTRIES.find(e=>e.id===pathStart)?.type||"FRM"]?.bg,borderRadius:4,color:"#FFF",fontWeight:600}}>{pathStart}</span>}
        {pathStart&&<span style={{color:"#64748B",fontSize:14}}>&rarr;</span>}
        {pathEnd&&<span style={{fontSize:12,padding:"3px 8px",background:TC[ENTRIES.find(e=>e.id===pathEnd)?.type||"FRM"]?.bg,borderRadius:4,color:"#FFF",fontWeight:600}}>{pathEnd}</span>}
        {activePath===null&&pathEnd&&<span style={{fontSize:12,color:"#EF4444",fontWeight:600}}>No path found</span>}
        {activePath&&<span style={{fontSize:12,color:"#10B981",fontWeight:600}}>{activePath.length-1} step{activePath.length-1!==1?"s":""}</span>}
        <button onClick={clearPath} style={{marginLeft:"auto",background:"#334155",color:"#94A3B8",border:"none",borderRadius:4,padding:"4px 10px",fontSize:11,cursor:"pointer"}}>Reset</button>
      </div>)}

      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        <div style={{flex:"1 1 600px",background:"#1E293B",borderRadius:10,overflow:"hidden",position:"relative"}}>
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display:"block",width:"100%",height:"auto"}}>
            <defs>
              <marker id="al" viewBox="0 0 10 6" refX="9" refY="3" markerWidth="8" markerHeight="6" orient="auto"><path d="M0,0 L10,3 L0,6 Z" fill="#2563EB"/></marker>
              <marker id="ad" viewBox="0 0 10 6" refX="9" refY="3" markerWidth="8" markerHeight="6" orient="auto"><path d="M0,0 L10,3 L0,6 Z" fill="#DC2626"/></marker>
              <marker id="ap" viewBox="0 0 10 6" refX="9" refY="3" markerWidth="8" markerHeight="6" orient="auto"><path d="M0,0 L10,3 L0,6 Z" fill="#FBBF24"/></marker>
            </defs>
            {Object.entries(TIER_Y).map(([tier,idx])=>{const bH=(H-40)/4;const y=20+idx*bH;return(<g key={tier}>
              <rect x={0} y={y} width={W} height={bH} fill={idx%2===0?"rgba(255,255,255,0.02)":"transparent"}/>
              <text x={12} y={y+16} fontSize="10" fill="#475569" fontWeight="600" fontFamily="Inter,Arial">{tier}</text></g>);})}
            {vedges.map((e,i)=>{const onP=pathEdgeSet.has(`${e.source}\u2192${e.target}`)||pathEdgeSet.has(`${e.target}\u2192${e.source}`);
              const hi=selected&&(e.source===selected||e.target===selected);const dim=(activePath&&!onP)||(selected&&!hi);
              const col=onP?"#FBBF24":EC[e.type];const mk=onP?"url(#ap)":e.type==="LEADS_TO"?"url(#al)":e.type==="DEPENDS_ON"?"url(#ad)":"";
              return<path key={i} d={epath(e.source,e.target)} fill="none" stroke={col} strokeWidth={onP?3:hi?2:1.2}
                strokeOpacity={dim?0.1:onP?1:0.5} strokeDasharray={e.type==="PAIRS_WITH"?"4,3":"none"}
                markerEnd={e.type!=="PAIRS_WITH"?mk:""}/>;})}
            {filtered.map(entry=>{const p=pos[entry.id];if(!p)return null;const tc=TC[entry.type];
              const onP=pathSet.has(entry.id);const isSel=selected===entry.id||entry.id===pathStart||entry.id===pathEnd;
              const isH=hovered===entry.id;const dim=activePath&&!onP&&!isSel;const r=isSel?24:isH?22:20;
              return(<g key={entry.id} onClick={()=>handleClick(entry.id)} onMouseEnter={()=>setHovered(entry.id)} onMouseLeave={()=>setHovered(null)}
                style={{cursor:"pointer"}} opacity={dim?0.15:1}>
                {(onP||isSel)&&<circle cx={p.x} cy={p.y} r={r+6} fill="none" stroke={onP?"#FBBF24":tc.bg} strokeWidth={2} strokeOpacity={0.4}/>}
                <circle cx={p.x} cy={p.y} r={r} fill={tc.bg} stroke={onP?"#FBBF24":isSel?"#FFF":tc.bg} strokeWidth={isSel||onP?2.5:1}/>
                <text x={p.x} y={p.y-4} textAnchor="middle" fontSize="8" fontWeight="700" fill="rgba(255,255,255,0.7)" fontFamily="Inter,Arial">{entry.type}</text>
                <text x={p.x} y={p.y+7} textAnchor="middle" fontSize="8" fontWeight="600" fill="#FFF" fontFamily="Inter,Arial">
                  {entry.name.length>12?entry.name.slice(0,11)+"\u2026":entry.name}</text>
                <circle cx={p.x+r-4} cy={p.y-r+4} r={4} fill={TIER_C[entry.tier]} stroke="#1E293B" strokeWidth={1.5}/></g>);})}
          </svg>
          <div style={{position:"absolute",bottom:8,right:12,display:"flex",gap:12,fontSize:10}}>
            <span style={{display:"flex",alignItems:"center",gap:3}}><svg width={20} height={6}><line x1={0} y1={3} x2={20} y2={3} stroke="#2563EB" strokeWidth={2}/></svg><span style={{color:"#64748B"}}>leads_to</span></span>
            <span style={{display:"flex",alignItems:"center",gap:3}}><svg width={20} height={6}><line x1={0} y1={3} x2={20} y2={3} stroke="#DC2626" strokeWidth={2}/></svg><span style={{color:"#64748B"}}>depends_on</span></span>
            <span style={{display:"flex",alignItems:"center",gap:3}}><svg width={20} height={6}><line x1={0} y1={3} x2={20} y2={3} stroke="#9CA3AF" strokeWidth={2} strokeDasharray="4,3"/></svg><span style={{color:"#64748B"}}>pairs_with</span></span>
          </div>
        </div>

        <div style={{flex:"0 0 280px",maxWidth:300}}>
          {activePath&&activePath.length>1&&(<div style={{background:"#1E293B",borderRadius:10,padding:14,marginBottom:10}}>
            <h3 style={{margin:"0 0 10px",fontSize:13,fontWeight:700,color:"#FBBF24",letterSpacing:-0.3}}>Diagnostic Path ({activePath.length-1} step{activePath.length-1!==1?"s":""})</h3>
            {activePath.map((id,i)=>{const e=ENTRIES.find(en=>en.id===id)!;const tc=TC[e.type];return(<div key={id} style={{marginBottom:i<activePath.length-1?4:0}}>
              <div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 8px",background:"rgba(251,191,36,0.08)",borderRadius:6}}>
                <span style={{width:20,height:20,borderRadius:"50%",background:tc.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:"#FFF",flexShrink:0}}>{i+1}</span>
                <div><div style={{fontSize:11,fontWeight:700,color:"#F8FAFC"}}>{e.name}</div><div style={{fontSize:9,color:"#94A3B8"}}>{e.id} &middot; {e.tier}</div></div>
              </div>{i<activePath.length-1&&<div style={{textAlign:"center",fontSize:10,color:"#FBBF24",padding:"2px 0"}}>&darr;</div>}</div>);})}</div>)}

          {sel&&mode==="explore"&&(<div style={{background:"#1E293B",borderRadius:10,padding:14}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <span style={{padding:"3px 8px",background:TC[sel.type].bg,borderRadius:4,fontSize:11,fontWeight:700,color:"#FFF"}}>{sel.type}</span>
              <span style={{padding:"3px 8px",background:TIER_C[sel.tier],borderRadius:4,fontSize:11,fontWeight:600,color:"#FFF"}}>{sel.tier}</span></div>
            <h3 style={{margin:"0 0 4px",fontSize:16,fontWeight:700,color:"#F8FAFC"}}>{sel.name}</h3>
            <p style={{margin:"0 0 4px",fontSize:11,color:"#64748B",fontFamily:"monospace"}}>{sel.id}</p>
            <p style={{margin:"0 0 12px",fontSize:12,color:"#CBD5E1",lineHeight:1.5}}>{sel.intent}</p>
            {conEdges.length>0&&(<div><h4 style={{margin:"0 0 6px",fontSize:11,fontWeight:700,color:"#64748B",textTransform:"uppercase",letterSpacing:0.5}}>Connections</h4>
              {conEdges.map((edge,i)=>{const oid=edge.source===selected?edge.target:edge.source;const o=ENTRIES.find(e=>e.id===oid);const dir=edge.source===selected?"\u2192":"\u2190";
                return<div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 0",fontSize:11}}>
                  <span style={{color:EC[edge.type],fontWeight:600,width:80,flexShrink:0,fontSize:10}}>{EL[edge.type]}</span>
                  <span style={{color:"#64748B"}}>{dir}</span><span style={{color:"#E2E8F0",fontWeight:500}}>{o?.name||oid}</span></div>;})}</div>)}</div>)}

          {!sel&&!activePath&&(<div style={{background:"#1E293B",borderRadius:10,padding:14,textAlign:"center"}}>
            <p style={{fontSize:13,color:"#64748B",margin:0}}>{mode==="explore"?"Click a node to see details and connections.":"Click start node, then target to trace the path."}</p></div>)}

          <div style={{background:"#1E293B",borderRadius:10,padding:12,marginTop:10}}>
            <h4 style={{margin:"0 0 8px",fontSize:11,fontWeight:700,color:"#64748B",textTransform:"uppercase",letterSpacing:0.5}}>Types</h4>
            <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
              {Object.entries(TC).map(([type,c])=><span key={type} style={{padding:"2px 8px",background:c.bg,borderRadius:4,fontSize:10,fontWeight:700,color:"#FFF"}}>{type}</span>)}</div></div>
        </div>
      </div>
      <div style={{marginTop:10,textAlign:"center",fontSize:10,color:"#475569"}}>Excelligence v0.1.1 &middot; Dropdown Logistics &middot; Chaos &rarr; Structured &rarr; Automated</div>
    </div>
  );
}
