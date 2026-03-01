'use client';

import { useState } from 'react';

const SCALING_DATA = {
  flat:{label:"Flat Pool",tokens:26000,desc:"All agents receive full context. Linear token growth with agent count.",formula:"prompt_tokens \u00d7 num_agents = total_input_tokens"},
  hierarchical:{label:"Hierarchical",tokens:600,desc:"Two-hop routing. Orchestrator sends compressed context. Agents only see what they need.",formula:"compressed_context \u00d7 selected_agents = total_input_tokens"},
};

const CAPABILITIES = [
  {dim:"Reasoning Depth",agents:["Claude","DeepSeek","GPT-4"],desc:"Multi-step logical chains, mathematical proof, complex argument structure"},
  {dim:"Breadth / Coverage",agents:["Gemini","Perplexity","Meta AI"],desc:"Wide-ranging knowledge, cross-domain connections, comprehensive surveys"},
  {dim:"Code Generation",agents:["GPT-4","DeepSeek","Copilot"],desc:"Working code production, debugging, architecture design, testing"},
  {dim:"Creative / Divergent",agents:["Grok","Claude","LeChat"],desc:"Unconventional angles, metaphor, reframing, lateral thinking"},
  {dim:"Research / Citation",agents:["Perplexity","Gemini"],desc:"Real-time data, source attribution, fact verification"},
  {dim:"Adversarial / Red Team",agents:["Grey","Clayton"],desc:"Challenge assumptions, stress-test invariants, find failure modes"},
];

export default function CouncilScalingPage() {
  const [activeModel,setActiveModel]=useState<'flat'|'hierarchical'>('flat');

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=DM+Serif+Display&family=DM+Sans:wght@400;500;700&display=swap');
        .cs-root{background:#0d1117;color:#c9d1d9;font-family:'JetBrains Mono',monospace;min-height:100vh;}
        .cs-card{background:#161b22;border:1px solid #30363d;border-radius:8px;padding:24px;transition:all 0.3s;}
        .cs-card:hover{border-color:#58a6ff;}
      `}</style>

      <div className="cs-root" style={{paddingTop:60}}>
        <div style={{padding:'40px 48px'}}>
          <div style={{fontSize:11,letterSpacing:3,textTransform:'uppercase',color:'#8b949e',marginBottom:8}}>
            AutoCouncil Addendum</div>
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:36,color:'#f0f6fc',marginBottom:8}}>Scaling Constraints</h1>
          <p style={{fontSize:14,color:'#8b949e',maxWidth:700,lineHeight:1.6}}>
            Token economics, capability dimensions, and the dissolution thesis. How the council scales \u2014 and when it won&apos;t need to.</p>
        </div>

        <div style={{padding:'0 48px 80px',maxWidth:1000}}>
          {/* Token Math */}
          <h2 style={{fontFamily:"'DM Sans',sans-serif",fontSize:20,fontWeight:600,color:'#f0f6fc',marginBottom:16}}>Token Economics</h2>
          <div style={{display:'flex',gap:8,marginBottom:20}}>
            {(['flat','hierarchical'] as const).map(m=>(
              <button key={m} onClick={()=>setActiveModel(m)}
                style={{padding:'8px 16px',fontSize:12,border:'1px solid #30363d',borderRadius:6,cursor:'pointer',
                  background:activeModel===m?'#58a6ff':'transparent',color:activeModel===m?'#0d1117':'#8b949e'}}>{SCALING_DATA[m].label}</button>))}
          </div>
          <div className="cs-card" style={{marginBottom:40}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
              <h3 style={{fontFamily:"'DM Sans',sans-serif",fontSize:18,fontWeight:600,color:'#f0f6fc',margin:0}}>{SCALING_DATA[activeModel].label}</h3>
              <div style={{fontSize:28,fontWeight:700,color:'#58a6ff'}}>{SCALING_DATA[activeModel].tokens.toLocaleString()} <span style={{fontSize:12,color:'#8b949e'}}>tokens/run</span></div>
            </div>
            <p style={{fontSize:13,color:'#8b949e',lineHeight:1.6,marginBottom:12}}>{SCALING_DATA[activeModel].desc}</p>
            <div style={{background:'#0d1117',padding:12,borderRadius:4,fontSize:12,color:'#58a6ff'}}>{SCALING_DATA[activeModel].formula}</div>
            {activeModel==='flat'&&(
              <div style={{marginTop:16,padding:12,borderLeft:'3px solid #f85149',background:'rgba(248,81,73,0.05)',borderRadius:'0 4px 4px 0'}}>
                <div style={{fontSize:12,color:'#f85149',fontWeight:600,marginBottom:4}}>Scaling Problem</div>
                <div style={{fontSize:12,color:'#8b949e',lineHeight:1.5}}>At 12 agents with 4K context each = 48K input tokens per run. Cost compounds with turn count. Hierarchical routing reduces this by 97%.</div>
              </div>
            )}
            {activeModel==='hierarchical'&&(
              <div style={{marginTop:16,padding:12,borderLeft:'3px solid #3fb950',background:'rgba(63,185,80,0.05)',borderRadius:'0 4px 4px 0'}}>
                <div style={{fontSize:12,color:'#3fb950',fontWeight:600,marginBottom:4}}>Two-Hop Routing</div>
                <div style={{fontSize:12,color:'#8b949e',lineHeight:1.5}}>Orchestrator compresses context to ~50 tokens. Routes to 3\u20134 relevant agents instead of all 12. 97% token reduction. Same output quality.</div>
              </div>
            )}
          </div>

          {/* Capability Dimensions */}
          <h2 style={{fontFamily:"'DM Sans',sans-serif",fontSize:20,fontWeight:600,color:'#f0f6fc',marginBottom:16}}>Capability Dimensions</h2>
          <p style={{fontSize:13,color:'#8b949e',marginBottom:20,lineHeight:1.6}}>
            Agents mapped to capability dimensions. The orchestrator routes tasks based on dimensional fit, not round-robin distribution.</p>
          <div style={{display:'grid',gap:12,marginBottom:40}}>
            {CAPABILITIES.map(c=>(
              <div key={c.dim} className="cs-card" style={{padding:16}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
                  <h3 style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:600,color:'#f0f6fc',margin:0}}>{c.dim}</h3>
                  <div style={{display:'flex',gap:4}}>
                    {c.agents.map(a=><span key={a} style={{padding:'2px 8px',borderRadius:4,background:'rgba(88,166,255,0.1)',color:'#58a6ff',fontSize:10}}>{a}</span>)}
                  </div>
                </div>
                <p style={{fontSize:12,color:'#8b949e',margin:0,lineHeight:1.5}}>{c.desc}</p>
              </div>))}
          </div>

          {/* Dissolution Thesis */}
          <div className="cs-card" style={{borderColor:'#d29922'}}>
            <div style={{fontSize:10,letterSpacing:3,color:'#d29922',textTransform:'uppercase',marginBottom:12}}>THE DISSOLUTION THESIS</div>
            <p style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:'#f0f6fc',lineHeight:1.4,marginBottom:16}}>
              &ldquo;Agents will inherently start to get there as well.&rdquo;</p>
            <p style={{fontSize:13,color:'#8b949e',lineHeight:1.7}}>
              As foundation models converge in capability, the value of multi-agent orchestration shifts from capability diversity to perspective diversity. The council doesn&apos;t need 12 agents because they&apos;re different \u2014 it needs them because convergence from independent sources is the strongest validation signal available. When models become interchangeable, the architecture still works. The finding is in the agreement, not the disagreement.</p>
          </div>
        </div>
      </div>
    </>
  );
}
