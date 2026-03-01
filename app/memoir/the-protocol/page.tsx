'use client';

import { useState, useEffect, useRef } from 'react';

const PHASES = [
  {name:"Phase 1: First Contact",time:"4:45 AM",steps:[
    {n:1,text:"Alarm fires. Feet on floor within 10 seconds.",tag:null},
    {n:2,text:"Glasses on. Phone stays on nightstand.",tag:null},
    {n:3,text:"Bathroom. No scrolling.",tag:null},
  ]},
  {name:"Phase 2: Silent Boot",time:"4:50 AM",steps:[
    {n:4,text:"Kitchen. Lights stay off \u2014 Emily is sleeping.",tag:"emily"},
    {n:5,text:"Electric kettle on. Water pre-measured the night before.",tag:null},
    {n:6,text:"Medication. Two pills, same order every day.",tag:null},
    {n:7,text:"Tea bag in mug. Mug pre-positioned on counter.",tag:"emily"},
  ]},
  {name:"Phase 3: Thermal Calibration",time:"4:55 AM",steps:[
    {n:8,text:"Water boils. Pour. Timer starts \u2014 4 minutes for black tea.",tag:null},
    {n:9,text:"While steeping: pack lunch. Same container, same spot in fridge.",tag:null},
    {n:10,text:"Tea bag out at exactly 4 minutes. Splash of cream. Stir twice.",tag:null},
  ]},
  {name:"Phase 4: Morning Intel",time:"5:00 AM",steps:[
    {n:11,text:"Sit at desk. Open laptop. No email yet.",tag:null},
    {n:12,text:"Check weather. Adjust clothing decision if needed.",tag:null},
    {n:13,text:"Check calendar. Confirm day\u2019s structure.",tag:null},
    {n:14,text:"Substack draft or memoir edit \u2014 30 minutes of protected writing time.",tag:null},
  ]},
  {name:"Phase 5: The Writing Block",time:"5:05 \u2013 5:35 AM",steps:[
    {n:15,text:"Write. No research, no editing old work, no \u2018quick checks.\u2019",tag:null},
    {n:16,text:"If stuck: write about being stuck. The output is the point, not the quality.",tag:null},
    {n:17,text:"At 5:35, stop. Mid-sentence is fine. Save and close.",tag:null},
  ]},
  {name:"Phase 6: Physical Reset",time:"5:35 AM",steps:[
    {n:18,text:"Stretch routine. 5 minutes. Same sequence every day.",tag:null},
    {n:19,text:"Second cup of tea if needed. Same process as first.",tag:null},
  ]},
  {name:"Phase 7: System Check",time:"5:45 AM",steps:[
    {n:20,text:"Open work laptop. Check overnight emails \u2014 scan only, no replies yet.",tag:null},
    {n:21,text:"Review today\u2019s audit tasks. Identify the one thing that matters most.",tag:null},
    {n:22,text:"If Council review needed: draft prompt now, distribute during commute.",tag:null},
  ]},
  {name:"Phase 8: Emily Sequence",time:"6:15 AM",steps:[
    {n:23,text:"Emily\u2019s alarm fires. Bathroom is clear for her.",tag:"emily"},
    {n:24,text:"Start Emily\u2019s coffee. She doesn\u2019t ask \u2014 it\u2019s just there.",tag:"emily"},
    {n:25,text:"Brief morning check-in. How she slept, what her day looks like.",tag:"emily"},
    {n:26,text:"Dogs out. Feed dogs. Same order, same bowls, same spot.",tag:null},
  ]},
  {name:"Phase 9: Departure Prep",time:"6:30 AM",steps:[
    {n:27,text:"Shower. 8 minutes. Same product sequence.",tag:null},
    {n:28,text:"Dress. Clothes pre-selected the night before.",tag:null},
    {n:29,text:"Pack bag. Laptop, charger, badge, lunch. Checklist is physical habit, not written.",tag:null},
    {n:30,text:"Wallet, keys, phone. Triple-pat check.",tag:null},
  ]},
  {name:"Phase 10: Commute",time:"7:00 AM",steps:[
    {n:31,text:"Drive to office. Same route unless traffic forces adaptation.",tag:null},
    {n:32,text:"Podcast or audiobook. No music during commute \u2014 brain needs structured input.",tag:null},
    {n:33,text:"If Council prompt was drafted: voice-distribute to models via phone.",tag:"conditional"},
    {n:34,text:"Arrive. Same parking spot when possible. Reduce decisions.",tag:null},
  ]},
  {name:"Phase 11: Office Boot",time:"7:30 AM",steps:[
    {n:35,text:"Badge in. Desk setup: laptop docked, monitors on, water bottle filled.",tag:null},
    {n:36,text:"Email triage. Respond to anything under 2 minutes. Flag the rest.",tag:null},
    {n:37,text:"Begin primary audit task identified in Phase 7.",tag:null},
  ]},
  {name:"Phase 12: Evening Wind-Down",time:"5:30 PM",steps:[
    {n:38,text:"Commute home. Decompress podcast \u2014 lighter content than morning.",tag:null},
    {n:39,text:"Walk dogs. 20 minutes minimum. No phone.",tag:null},
    {n:40,text:"Dinner with Emily. No screens at table.",tag:"emily"},
    {n:41,text:"Evening DDL session if energy permits. 60\u201390 minutes max.",tag:"conditional"},
    {n:42,text:"If no DDL energy: gaming, reading, or TV with Emily. Rest is productive.",tag:"conditional"},
  ]},
  {name:"Phase 13: Shutdown",time:"9:30 PM",steps:[
    {n:43,text:"Pre-position tomorrow\u2019s mug, tea bag, and water level in kettle.",tag:null},
    {n:44,text:"Lay out tomorrow\u2019s clothes.",tag:null},
    {n:45,text:"Medication. Evening dose.",tag:null},
    {n:46,text:"Phone on nightstand. No scrolling in bed.",tag:null},
    {n:47,text:"Lights out by 10:00 PM. The protocol resets.",tag:null},
  ]},
];

const STATS = {steps:47,emilyOpts:6,conditionalBranches:3,phases:13};

export default function TheProtocolPage() {
  const [visiblePhases, setVisiblePhases] = useState<Set<number>>(new Set());
  const phaseRefs = useRef<(HTMLDivElement|null)[]>([]);

  useEffect(()=>{
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const idx = Number(entry.target.getAttribute('data-idx'));
          setVisiblePhases(prev=>{const n=new Set(prev);n.add(idx);return n;});
        }
      });
    },{threshold:0.15});
    phaseRefs.current.forEach(ref=>{if(ref)obs.observe(ref);});
    return()=>obs.disconnect();
  },[]);

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .proto-root{background:#141F33;color:#F5F4F2;font-family:'DM Sans',sans-serif;min-height:100vh;}
        .proto-root::before{content:'';position:fixed;inset:0;background:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");pointer-events:none;z-index:1;}
        .proto-hero{min-height:60vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:80px 40px;position:relative;z-index:2;}
        .proto-hero::before{content:'';position:absolute;width:600px;height:600px;background:radial-gradient(circle,rgba(151,7,47,0.1) 0%,transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%);animation:pulse 8s ease-in-out infinite;}
        @keyframes pulse{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.6;}50%{transform:translate(-50%,-50%) scale(1.15);opacity:1;}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}
        @keyframes slideReveal{from{opacity:0;transform:translateX(-40px);}to{opacity:1;transform:translateX(0);}}
        .phase-card{opacity:0;transform:translateX(-40px);transition:all 0.8s cubic-bezier(0.16,1,0.3,1);}
        .phase-card.visible{opacity:1;transform:translateX(0);}
        .step-row{padding:12px 16px;border-radius:6px;transition:all 0.3s;position:relative;}
        .step-row:hover{background:rgba(245,244,242,0.04);}
        .tag-emily{color:#E8A87C;font-size:10px;letter-spacing:1px;text-transform:uppercase;font-weight:500;}
        .tag-conditional{color:#7B8EC8;font-size:10px;letter-spacing:1px;text-transform:uppercase;font-weight:500;}
      `}</style>

      <div className="proto-root" style={{paddingTop:60}}>
        <div className="proto-hero">
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:4,textTransform:'uppercase',color:'#5C677D',marginBottom:40,position:'relative',zIndex:2}}>
            From the memoir &ldquo;Little to Know Experience&rdquo;</div>
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:'clamp(42px,7vw,80px)',lineHeight:1,position:'relative',zIndex:2}}>The Protocol</h1>
          <p style={{fontSize:16,color:'#8A8E94',marginTop:16,maxWidth:560,lineHeight:1.6,position:'relative',zIndex:2}}>
            47 steps that turn a brain with ADHD and Bipolar II into a production system. Every morning. Every night. No exceptions.</p>
          <div style={{display:'flex',gap:40,marginTop:48,position:'relative',zIndex:2}}>
            {[{n:STATS.steps,l:'Steps'},{n:STATS.phases,l:'Phases'},{n:STATS.emilyOpts,l:'Emily Optimizations'},{n:STATS.conditionalBranches,l:'Conditional Branches'}].map(s=>(
              <div key={s.l} style={{textAlign:'center'}}>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:36,color:'#B23531'}}>{s.n}</div>
                <div style={{fontSize:10,letterSpacing:2,textTransform:'uppercase',color:'#8A8E94'}}>{s.l}</div>
              </div>))}
          </div>
        </div>

        <div style={{maxWidth:800,margin:'0 auto',padding:'0 40px 120px',position:'relative',zIndex:2}}>
          {PHASES.map((phase,pi)=>(
            <div key={pi} ref={el=>{phaseRefs.current[pi]=el;}} data-idx={pi}
              className={`phase-card ${visiblePhases.has(pi)?'visible':''}`}
              style={{marginBottom:48,transitionDelay:`${pi*0.05}s`}}>
              <div style={{display:'flex',alignItems:'baseline',gap:16,marginBottom:16}}>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:2,color:'#B23531',whiteSpace:'nowrap'}}>{phase.time}</div>
                <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:24,margin:0,lineHeight:1.2}}>{phase.name}</h2>
              </div>
              <div style={{borderLeft:'2px solid rgba(178,53,49,0.2)',marginLeft:8,paddingLeft:24}}>
                {phase.steps.map(step=>(
                  <div key={step.n} className="step-row">
                    <div style={{display:'flex',alignItems:'flex-start',gap:12}}>
                      <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:'rgba(178,53,49,0.6)',minWidth:24,flexShrink:0}}>{String(step.n).padStart(2,'0')}</span>
                      <span style={{fontSize:14,lineHeight:1.6,color:'rgba(245,244,242,0.85)'}}>{step.text}</span>
                    </div>
                    {step.tag==='emily'&&<span className="tag-emily" style={{marginLeft:36,display:'inline-block',marginTop:4}}>&#9829; Emily optimization</span>}
                    {step.tag==='conditional'&&<span className="tag-conditional" style={{marginLeft:36,display:'inline-block',marginTop:4}}>&#9670; Conditional branch</span>}
                  </div>))}
              </div>
            </div>))}

          <div style={{textAlign:'center',marginTop:80,paddingTop:40,borderTop:'1px solid rgba(178,53,49,0.2)'}}>
            <div style={{fontFamily:"'DM Serif Display',serif",fontSize:28,marginBottom:8}}>The protocol resets.</div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:'#5C677D',letterSpacing:2}}>Every day. No exceptions. That&apos;s the point.</div>
          </div>
        </div>
      </div>
    </>
  );
}
