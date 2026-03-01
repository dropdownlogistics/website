'use client';

import { useState } from 'react';

const LAYERS = [
  {name:"User Input",color:"#58a6ff",icon:"\u276F",desc:"Raw prompt from the operator. Unrefined intent that needs decomposition before distribution."},
  {name:"Refiner Agent",color:"#d29922",icon:"\u2699",desc:"Transforms raw input into structured, distributable prompts. Adds context, constraints, and output format requirements."},
  {name:"Orchestrator Loop",color:"#f85149",icon:"\u21BB",desc:"Distributes refined prompts to the agent pool. Manages turn sequencing, error isolation, and parallel execution with 0.5s delay."},
  {name:"Agent Pool (12+)",color:"#3fb950",icon:"\u25A3",desc:"Independent agents with different model backends. Each produces a response in isolation. No cross-contamination between agents."},
  {name:"Micro Summarizer",color:"#bc8cff",icon:"\u2261",desc:"Compresses each agent\u2019s response into a governed micro-summary. Separates living doc (running context) from primary doc (final output)."},
  {name:"Reviewer Agent",color:"#f0883e",icon:"\u2713",desc:"Synthesizes micro-summaries into governed output. Identifies convergence, divergence, and gaps. The finding IS the value."},
];

const AGENTS = [
  {name:"Claude",model:"Sonnet/Opus",role:"Primary analytical engine"},
  {name:"GPT-4",model:"GPT-4o",role:"Structured reasoning, code generation"},
  {name:"DeepSeek",model:"V3",role:"Technical depth, mathematical rigor"},
  {name:"Grok",model:"Grok-2",role:"Pattern recognition, unconventional angles"},
  {name:"Gemini",model:"1.5 Pro",role:"Breadth, multimodal context"},
  {name:"Perplexity",model:"Sonar",role:"Real-time research, citation-heavy analysis"},
  {name:"Copilot",model:"GPT-4 variant",role:"Microsoft ecosystem integration"},
  {name:"Meta AI",model:"Llama 3.1",role:"Open-source perspective, different training distribution"},
  {name:"LeChat",model:"Mistral Large",role:"European perspective, multilingual capability"},
  {name:"Dex Jr.",model:"Local (Planned)",role:"Local inference, privacy-sensitive tasks"},
  {name:"Grey",model:"Adversarial",role:"Red team. Challenges assumptions and invariants"},
  {name:"Clayton",model:"Builder",role:"Architecture review, scaling analysis"},
];

export default function AutoCouncilPage() {
  const [activeLayer,setActiveLayer]=useState<number|null>(null);
  const [showAgents,setShowAgents]=useState(false);

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=DM+Serif+Display&family=DM+Sans:wght@400;500;700&display=swap');
        .ac-root{background:#0d1117;color:#c9d1d9;font-family:'JetBrains Mono',monospace;min-height:100vh;}
        .ac-layer{border:1px solid #30363d;border-radius:8px;padding:20px 24px;cursor:pointer;transition:all 0.3s;position:relative;overflow:hidden;}
        .ac-layer:hover{border-color:#58a6ff;background:#161b22;}
        .ac-layer.active{border-color:#58a6ff;background:#1c2128;}
        .ac-layer::before{content:'';position:absolute;top:0;left:0;bottom:0;width:3px;background:var(--lc);opacity:0;transition:opacity 0.3s;}
        .ac-layer.active::before,.ac-layer:hover::before{opacity:1;}
        .ac-agent{background:#161b22;border:1px solid #30363d;border-radius:6px;padding:12px 16px;transition:all 0.3s;}
        .ac-agent:hover{border-color:#30363d;background:#1c2128;}
        @keyframes flowPulse{0%{opacity:0.3;}50%{opacity:1;}100%{opacity:0.3;}}
      `}</style>

      <div className="ac-root" style={{paddingTop:60}}>
        <div style={{padding:'40px 48px'}}>
          <div style={{fontSize:11,letterSpacing:3,textTransform:'uppercase',color:'#8b949e',marginBottom:8}}>
            DDL Infrastructure / AI Orchestration</div>
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:42,color:'#f0f6fc',marginBottom:8}}>AutoCouncil</h1>
          <p style={{fontSize:14,color:'#8b949e',maxWidth:700,lineHeight:1.6}}>
            Multi-agent orchestration architecture. Write once, distribute to all, synthesize governed output. Six layers from raw intent to reviewed artifact.</p>
          <div style={{display:'flex',gap:24,marginTop:24}}>
            <div><span style={{fontSize:24,fontWeight:700,color:'#58a6ff'}}>6</span><span style={{fontSize:11,color:'#8b949e',marginLeft:6}}>LAYERS</span></div>
            <div><span style={{fontSize:24,fontWeight:700,color:'#58a6ff'}}>12+</span><span style={{fontSize:11,color:'#8b949e',marginLeft:6}}>AGENTS</span></div>
            <div><span style={{fontSize:24,fontWeight:700,color:'#58a6ff'}}>$0.21</span><span style={{fontSize:11,color:'#8b949e',marginLeft:6}}>PER RUN (REF)</span></div>
          </div>
        </div>

        <div style={{padding:'0 48px 80px'}}>
          <div style={{display:'flex',gap:8,marginBottom:32}}>
            <button onClick={()=>setShowAgents(false)} style={{padding:'8px 16px',fontSize:12,border:'1px solid #30363d',borderRadius:6,cursor:'pointer',background:!showAgents?'#58a6ff':'transparent',color:!showAgents?'#0d1117':'#8b949e'}}>Architecture</button>
            <button onClick={()=>setShowAgents(true)} style={{padding:'8px 16px',fontSize:12,border:'1px solid #30363d',borderRadius:6,cursor:'pointer',background:showAgents?'#58a6ff':'transparent',color:showAgents?'#0d1117':'#8b949e'}}>Agent Pool</button>
          </div>

          {!showAgents&&(
            <div style={{maxWidth:800}}>
              {LAYERS.map((layer,i)=>(
                <div key={i}>
                  <div className={`ac-layer ${activeLayer===i?'active':''}`}
                    style={{'--lc':layer.color} as any}
                    onClick={()=>setActiveLayer(activeLayer===i?null:i)}>
                    <div style={{display:'flex',alignItems:'center',gap:16}}>
                      <div style={{width:40,height:40,borderRadius:'50%',background:`${layer.color}22`,border:`1px solid ${layer.color}44`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,color:layer.color,flexShrink:0}}>{layer.icon}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:10,letterSpacing:2,color:layer.color,textTransform:'uppercase',marginBottom:2}}>Layer {i+1}</div>
                        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:17,fontWeight:600,color:'#f0f6fc'}}>{layer.name}</div>
                      </div>
                    </div>
                    {activeLayer===i&&(
                      <div style={{marginTop:16,paddingTop:16,borderTop:'1px solid #30363d'}}>
                        <p style={{fontSize:13,color:'#c9d1d9',lineHeight:1.6,margin:0}}>{layer.desc}</p>
                      </div>
                    )}
                  </div>
                  {i<LAYERS.length-1&&(
                    <div style={{display:'flex',justifyContent:'center',padding:'8px 0'}}>
                      <div style={{width:1,height:20,background:'#30363d',position:'relative'}}>
                        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',color:'#58a6ff',fontSize:10,animation:'flowPulse 2s infinite',animationDelay:`${i*0.3}s`}}>&darr;</div>
                      </div>
                    </div>
                  )}
                </div>))}
            </div>
          )}

          {showAgents&&(
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:12}}>
              {AGENTS.map(a=>(
                <div key={a.name} className="ac-agent">
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
                    <div style={{width:8,height:8,borderRadius:'50%',background:'#3fb950'}}/>
                    <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:600,color:'#f0f6fc'}}>{a.name}</span>
                  </div>
                  <div style={{fontSize:11,color:'#58a6ff',marginBottom:4}}>{a.model}</div>
                  <div style={{fontSize:12,color:'#8b949e',lineHeight:1.4}}>{a.role}</div>
                </div>))}
            </div>
          )}

          <div style={{marginTop:60,padding:24,background:'#161b22',border:'1px solid #30363d',borderRadius:8}}>
            <div style={{fontSize:10,letterSpacing:2,color:'#58a6ff',marginBottom:12}}>KEY ARCHITECTURE DECISIONS</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              {[{k:"Living Doc vs Primary Doc",v:"Running context (living) stays separate from final output (primary). No bleed."},
                {k:"Parallel Execution",v:"0.5s stagger delay. 8 agents complete in 1.01s wall time. 4\u00d7 speedup over sequential."},
                {k:"Error Isolation",v:"One agent failure doesn\u2019t cascade. Orchestrator skips and continues."},
                {k:"Self-Improvement",v:"Prompt tuning via automated evaluation. The system improves its own prompts."},
              ].map(d=>(
                <div key={d.k} style={{padding:12,borderLeft:'2px solid #30363d'}}>
                  <div style={{fontSize:12,fontWeight:600,color:'#f0f6fc',marginBottom:4}}>{d.k}</div>
                  <div style={{fontSize:12,color:'#8b949e',lineHeight:1.5}}>{d.v}</div>
                </div>))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
