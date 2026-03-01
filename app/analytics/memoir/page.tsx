'use client';

import { useState, useMemo } from "react";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const EX: any[] = [
[1,"Perspective",1143,"Frame",null,6,["sobriety","quiet","identity"],"FRAME"],
[2,"Lake Night",1724,"Origin",2004,4,["first-drink","quiet","friendship","Austin"],"ORIGIN"],
[3,"The Coming Storm",1807,"Origin",2004,5,["escalation","storm","consequence","blackout"],"ORIGIN"],
[4,"3 South",1634,"Descent",2005,6,["college","blackout","limits","denial"],"DESCENT"],
[5,"Drink Drink Drink",1048,"Descent",2005,4,["keg","belonging","permission","RA"],"DESCENT"],
[6,"The Dance (Garage)",1517,"Descent",2006,5,["productivity","garage","routine","ADHD-mask"],"DESCENT"],
[7,"The Dance (Ritual)",987,"Descent",2006,6,["ritual","choreography","kitchen","muscle-memory"],"DESCENT"],
[8,"Loneliness or Freedom?",860,"Descent",2007,7,["isolation","texting","deletion","alone"],"DESCENT"],
[9,"GMAT",832,"Descent",2008,4,["avoidance","winging-it","procrastination","Matt"],"DESCENT"],
[10,"21",965,"Descent",2008,5,["birthday","prairie-fire","Kristen","denial"],"DESCENT"],
[11,"The Hill",1198,"Transition",2009,6,["graduation","KU","pride","mourning"],"TRANSITION"],
[12,"Tulsa",1287,"Descent",2009,6,["new-city","ONEOK","cohort","stairs","isolation"],"DESCENT"],
[13,"The First Hiding",1419,"Descent",2009,8,["hiding","game-day","hangover","shame"],"FREEFALL"],
[14,"Liberty Tower, 13J",1358,"Descent",2010,5,["condo","Cole","freedom","identity"],"DESCENT"],
[15,"Pre-game",1221,"Descent",2010,5,["pregame","walking","downtown","baseline"],"DESCENT"],
[16,"October 2009 (Train Shot)",826,"Descent",2009,4,["girlfriend","bar","train-shot"],"DESCENT"],
[17,"CPA",1665,"Freefall",2012,7,["CPA","failure","avoidance","Skyrim"],"FREEFALL"],
[18,"KC / First Breakup",1162,"Freefall",2013,8,["breakup","parents","relief"],"FREEFALL"],
[19,"August 2011 (The Dewey)",1566,"Freefall",2011,9,["DUI","arrest","jail","nurse","shame"],"FREEFALL"],
[20,"The Aftermath",1607,"Freefall",2011,7,["aftermath","lawyer","diversion"],"FREEFALL"],
[21,"Working, Until It Wasn't",1536,"Freefall",2014,7,["Stinnett","Kendra","confrontation"],"FREEFALL"],
[22,"My Second Job",1346,"Freefall",2015,8,["liquor-store","daily","blackout"],"FREEFALL"],
[23,"The Second First Drink",1549,"Relapse",2016,8,["relapse","Cherry-Street","60-days"],"RELAPSE"],
[24,"Basement / Vacation Home",1604,"Freefall",2016,9,["parents-basement","hiding","empties"],"FREEFALL"],
[25,"The Median",1100,"Rock Bottom",2017,10,["crash","median","highway","denial"],"ROCK_BOTTOM"],
[26,"Here We Go Again",629,"Attempt",2017,7,["vow","church","fire","relapse"],"ATTEMPT"],
[27,"The Third First Drink",427,"Relapse",2018,9,["desk-drinking","suicidal-ideation"],"RELAPSE"],
[28,"The Walrus",1483,"Recovery",2018,8,["sobriety-day","detox","hallucination"],"RECOVERY"],
[29,"I'm CEO, Bitch",815,"Recovery",2018,5,["consulting","independence","sobriety"],"RECOVERY"],
[30,"Emily",1640,"Recovery",2018,7,["dating","Coffee-Meets-Bagel","sushi","hope"],"RECOVERY"],
[31,"The Road",1207,"Construction",2019,6,["travel","hourly","COVID","Emily-support"],"CONSTRUCTION"],
[32,"Quarterly SOX Reporting",936,"Construction",2020,7,["proposal","D&D","COVID","ring"],"CONSTRUCTION"],
[33,"Mondo Condo",1597,"Construction",2020,6,["Austin","house","fired","consulting"],"CONSTRUCTION"],
[34,"Loose Ends",1712,"Recovery",2019,10,["Matt","death","grief","jacket"],"RECOVERY"],
[35,"Benched",1218,"Construction",2021,5,["unemployment","pool","hospital-startup"],"CONSTRUCTION"],
[36,"Our People",2132,"Construction",2021,8,["wedding","Emily","brother","sparklers"],"CONSTRUCTION"],
[37,"Material Weakness",1276,"Construction",2022,7,["controller","fog","payroll","fraud"],"CONSTRUCTION"],
[38,"Going Concern",881,"Construction",2022,5,["unemployment","Kendra","divine-intervention"],"CONSTRUCTION"],
[39,"To The Moon",866,"Construction",2023,6,["data-analytics","raise","Alteryx"],"CONSTRUCTION"],
[40,"Whiplash",1618,"Freefall2",2023,8,["reprimand","Tampa","politics","betrayal"],"FREEFALL2"],
[41,"Overclocked",1201,"Freefall2",2023,9,["mania","insomnia","spending","panic"],"FREEFALL2"],
[42,"The Audit",1502,"Arrival",2023,8,["diagnosis","Bipolar-II","ADHD","relief"],"ARRIVAL"],
[43,"Trendline (The Ramp)",872,"Freefall2",2023,7,["ramp","Diablo","mania"],"FREEFALL2"],
[44,"Catastrophic Failure",1607,"Freefall2",2024,10,["bed","disability","denial","certified-mail"],"FREEFALL2"],
[45,"Dinner for Two",862,"Recovery2",2024,6,["job-search","AI-interview","hope"],"RECOVERY2"],
[46,"Return to Office",940,"Recovery2",2024,6,["first-day","Psych","coffee","belonging"],"RECOVERY2"],
[47,"Internal Control",1344,"Arrival",2024,6,["audit","manager","process","controls"],"ARRIVAL"],
[48,"Unqualified Opinion",719,"Arrival",2025,5,["normal","calibrated","work","peace"],"ARRIVAL"],
[49,"Reasonable Assurance",1889,"Arrival",2025,7,["peace","quiet","Christmas","Phoenix","Emily"],"ARRIVAL"],
];

const PHASES: Record<string, {label: string; color: string; order: number}> = {
FRAME:{label:"Frame",color:"#64748b",order:0},ORIGIN:{label:"Origin Story",color:"#14b8a6",order:1},DESCENT:{label:"The Descent",color:"#f59e0b",order:2},TRANSITION:{label:"Transition",color:"#a78bfa",order:3},FREEFALL:{label:"Freefall",color:"#ef4444",order:4},RELAPSE:{label:"Relapse",color:"#f97316",order:5},ROCK_BOTTOM:{label:"Rock Bottom",color:"#dc2626",order:6},ATTEMPT:{label:"Attempt",color:"#eab308",order:7},RECOVERY:{label:"Recovery",color:"#22c55e",order:8},CONSTRUCTION:{label:"Construction",color:"#3b82f6",order:9},FREEFALL2:{label:"Second Crisis",color:"#e11d48",order:10},RECOVERY2:{label:"Second Recovery",color:"#10b981",order:11},ARRIVAL:{label:"Arrival",color:"#14b8a6",order:12},
};

const CLUSTERS: Record<string, {excerpts: number[]; color: string; desc: string}> = {
"The Quiet":{excerpts:[1,2,3,6,14,22,28,42,49],color:"#14b8a6",desc:"Silence as currency — first sought through alcohol, finally earned through sobriety"},
"The Kitchen":{excerpts:[7,8,13,15,22,24,27],color:"#f59e0b",desc:"The ritual choreography — freezer, counter, pour — appears in 7 excerpts"},
"The Hiding":{excerpts:[13,17,20,21,24,27],color:"#ef4444",desc:"Escalating concealment — from sneaking morning drinks to smuggling empties in backpacks"},
"Emily as System":{excerpts:[30,31,32,36,42,44,45,48,49],color:"#f472b6",desc:"Emily appears in 9 excerpts — never as savior, always as operational partner"},
"The Audit Mind":{excerpts:[1,17,20,42,44,47,48,49],color:"#3b82f6",desc:"Audit vocabulary applied to self — controls, findings, reasonable assurance"},
"Loss & Brotherhood":{excerpts:[2,9,12,34,36],color:"#8b5cf6",desc:"Male friendship as lifeline — Austin, Matt, Todd, Josh"},
"Work Identity":{excerpts:[6,9,17,21,29,33,35,37,38,39,40,47],color:"#22c55e",desc:"12 excerpts on career — work as both cage and proof of worth"},
};

const MOTIFS = [
{phrase:"that's the part",count:10,type:"structural"},{phrase:"permission / allowed",count:9,type:"cognitive"},{phrase:"the math / the trade",count:9,type:"cognitive"},{phrase:"quiet / silence",count:6,type:"theme"},{phrase:"Freezer. Counter. Pour.",count:5,type:"ritual"},{phrase:"muscle memory / dance",count:5,type:"physical"},{phrase:"shoe drop",count:4,type:"anxiety"},{phrase:"I didn't have language for",count:4,type:"metacognitive"},{phrase:"certified mail",count:2,type:"Emily-signature"},{phrase:"reasonable assurance",count:1,type:"title-concept"},
];

const totalWords = EX.reduce((a: number,e: any)=>a+e[2],0);
const fmt = (n: number) => n>=1e3?(n/1e3).toFixed(1)+"K":String(n);

const Tab = ({active,onClick,children}: {active: boolean; onClick: () => void; children: React.ReactNode}) => <button onClick={onClick} style={{
  background:active?"linear-gradient(135deg,#78350f,#b45309)":"transparent",
  color:active?"#fef3c7":"#a8a29e",border:active?"none":"1px solid #44403c",
  borderRadius:8,padding:"8px 16px",fontSize:13,fontWeight:600,cursor:"pointer",transition:"all 0.2s",
}}>{children}</button>;

function MasterIndex() {
  const [sort,setSort] = useState("narrative");
  const data = sort==="narrative" ? EX : [...EX].sort((a,b)=>(a[4]||0)-(b[4]||0));
  return <div style={{display:"flex",flexDirection:"column",gap:20}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12}}>
      {[
        {label:"Excerpts",value:"49",color:"#d97706"},{label:"Total Words",value:fmt(totalWords),color:"#f59e0b"},
        {label:"Avg Length",value:String(Math.round(totalWords/49)),color:"#b45309"},{label:"Timeline",value:"2004–2025",color:"#78350f"},
      ].map(c=><div key={c.label} style={{background:"linear-gradient(135deg,#1c1917,#292524)",borderRadius:12,padding:"16px 20px",border:"1px solid #44403c"}}>
        <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:1.5,color:"#78716c",fontWeight:600}}>{c.label}</div>
        <div style={{fontSize:26,fontWeight:800,color:c.color,lineHeight:1.1,marginTop:6,fontFamily:"monospace"}}>{c.value}</div>
      </div>)}
    </div>
    <div style={{background:"#1c1917",borderRadius:14,padding:24,border:"1px solid #44403c"}}>
      <h3 style={{margin:0,fontSize:16,fontWeight:700,color:"#e7e5e4"}}>Master Index</h3>
      <div style={{display:"flex",gap:8,margin:"12px 0 16px"}}>
        <Tab active={sort==="narrative"} onClick={()=>setSort("narrative")}>Narrative Order</Tab>
        <Tab active={sort==="chrono"} onClick={()=>setSort("chrono")}>Chronological</Tab>
      </div>
      <div style={{maxHeight:500,overflowY:"auto",display:"flex",flexDirection:"column",gap:4}}>
        {data.map((e: any)=><div key={e[0]} style={{display:"flex",gap:12,alignItems:"center",padding:"8px 12px",background:"#292524",borderRadius:8,borderLeft:`3px solid ${PHASES[e[8]]?.color||"#666"}`}}>
          <div style={{width:28,fontSize:14,fontWeight:800,color:"#78716c",fontFamily:"monospace",textAlign:"center"}}>{e[0]}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:13,fontWeight:600,color:"#e7e5e4",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{e[1]}</div>
            <div style={{fontSize:10,color:"#78716c",marginTop:2}}>{e[6].slice(0,3).join(" · ")}</div>
          </div>
          <div style={{fontSize:11,fontWeight:600,color:PHASES[e[8]]?.color,whiteSpace:"nowrap"}}>{PHASES[e[8]]?.label}</div>
          <div style={{fontSize:11,color:"#78716c",fontFamily:"monospace",width:50,textAlign:"right"}}>{e[2]}w</div>
        </div>)}
      </div>
    </div>
  </div>;
}

function NarrativeArc() {
  const arcData = EX.map((e: any)=>({name:`${e[0]}`,intensity:e[5],words:e[2],phase:PHASES[e[8]]?.label,title:e[1],color:PHASES[e[8]]?.color}));
  return <div style={{display:"flex",flexDirection:"column",gap:24}}>
    <div style={{background:"#1c1917",borderRadius:14,padding:24,border:"1px solid #44403c"}}>
      <h3 style={{margin:"0 0 16px",fontSize:16,fontWeight:700,color:"#e7e5e4"}}>Emotional Intensity Arc</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={arcData}>
          <defs><linearGradient id="arcGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d97706" stopOpacity={0.6}/><stop offset="100%" stopColor="#d97706" stopOpacity={0.05}/></linearGradient></defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#44403c"/>
          <XAxis dataKey="name" stroke="#78716c" fontSize={10} interval={2}/>
          <YAxis stroke="#78716c" fontSize={11} domain={[0,10]}/>
          <Tooltip content={({active,payload}: any)=>{
            if(!active||!payload?.length) return null;
            const d=payload[0].payload;
            return <div style={{background:"#1c1917",border:"1px solid #44403c",borderRadius:8,padding:12,fontSize:12,color:"#e7e5e4"}}>
              <div style={{fontWeight:700}}>#{d.name} — {d.title}</div>
              <div style={{color:d.color,marginTop:4}}>{d.phase}</div>
              <div style={{color:"#a8a29e",marginTop:2}}>Intensity: {d.intensity}/10 · {d.words} words</div>
            </div>;
          }}/>
          <Area type="monotone" dataKey="intensity" stroke="#d97706" fill="url(#arcGrad)" strokeWidth={2}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
    <div style={{background:"#1c1917",borderRadius:14,padding:24,border:"1px solid #44403c"}}>
      <h3 style={{margin:"0 0 16px",fontSize:16,fontWeight:700,color:"#e7e5e4"}}>The Double Arc</h3>
      {[
        {label:"Arc 1: Addiction",range:"E1–E28",color:"#d97706",desc:"Lake Night through The Walrus. 28 excerpts. The drinking story."},
        {label:"The Bridge",range:"E29–E36",color:"#3b82f6",desc:"Emily, wedding, consulting, Matt's death. Building the new life."},
        {label:"Arc 2: Mental Health",range:"E37–E49",color:"#14b8a6",desc:"Hospital fraud, mania, catastrophic failure, diagnosis, medication, peace."},
      ].map((a,i)=><div key={i} style={{background:"#292524",borderRadius:10,padding:16,borderLeft:`4px solid ${a.color}`,marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:14,fontWeight:700,color:a.color}}>{a.label}</div>
          <div style={{fontSize:11,color:"#78716c",fontFamily:"monospace"}}>{a.range}</div>
        </div>
        <div style={{fontSize:12,color:"#d6d3d1",marginTop:8,lineHeight:1.5}}>{a.desc}</div>
      </div>)}
    </div>
    <div style={{background:"#1c1917",borderRadius:14,padding:24,border:"1px solid #44403c"}}>
      <h3 style={{margin:"0 0 16px",fontSize:16,fontWeight:700,color:"#e7e5e4"}}>Pacing: Word Count by Excerpt</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={EX.map((e: any)=>({name:String(e[0]),words:e[2]}))}>
          <CartesianGrid strokeDasharray="3 3" stroke="#44403c"/>
          <XAxis dataKey="name" stroke="#78716c" fontSize={9} interval={2}/>
          <YAxis stroke="#78716c" fontSize={11}/>
          <Tooltip/>
          <Bar dataKey="words" fill="#d97706" radius={[3,3,0,0]}/>
        </BarChart>
      </ResponsiveContainer>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:12}}>
        <div style={{background:"#292524",borderRadius:8,padding:12}}>
          <div style={{fontSize:10,color:"#78716c",textTransform:"uppercase"}}>Longest</div>
          <div style={{fontSize:13,fontWeight:700,color:"#fbbf24",marginTop:4}}>E36: Our People — 2,132w</div>
          <div style={{fontSize:11,color:"#a8a29e",marginTop:2}}>The wedding. Maximum emotional investment.</div>
        </div>
        <div style={{background:"#292524",borderRadius:8,padding:12}}>
          <div style={{fontSize:10,color:"#78716c",textTransform:"uppercase"}}>Shortest</div>
          <div style={{fontSize:13,fontWeight:700,color:"#ef4444",marginTop:4}}>E27: Third First Drink — 427w</div>
          <div style={{fontSize:11,color:"#a8a29e",marginTop:2}}>The darkest moment. Fewest words.</div>
        </div>
      </div>
    </div>
  </div>;
}

function Themes() {
  const [sel,setSel] = useState<string|null>(null);
  return <div style={{display:"flex",flexDirection:"column",gap:24}}>
    <div style={{background:"#1c1917",borderRadius:14,padding:24,border:"1px solid #44403c"}}>
      <h3 style={{margin:"0 0 16px",fontSize:16,fontWeight:700,color:"#e7e5e4"}}>Thematic Clusters</h3>
      {Object.entries(CLUSTERS).map(([name,c])=><div key={name} onClick={()=>setSel(sel===name?null:name)} style={{background:sel===name?"#292524":"transparent",borderRadius:10,padding:14,border:`1px solid ${sel===name?c.color+"66":"#44403c"}`,cursor:"pointer",marginBottom:8}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:14,fontWeight:700,color:c.color}}>{name}</div>
          <div style={{fontSize:12,color:"#78716c",fontFamily:"monospace"}}>{c.excerpts.length} excerpts</div>
        </div>
        <div style={{fontSize:12,color:"#a8a29e",marginTop:6,lineHeight:1.5}}>{c.desc}</div>
        {sel===name&&<div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:10}}>
          {c.excerpts.map(n=>{const e=EX.find((x: any)=>x[0]===n); return <div key={n} style={{background:c.color+"22",border:`1px solid ${c.color}44`,borderRadius:6,padding:"4px 10px",fontSize:11,color:c.color,fontWeight:600}}>E{n}: {e?e[1]:""}</div>;})}
        </div>}
      </div>)}
    </div>
    <div style={{background:"#1c1917",borderRadius:14,padding:24,border:"1px solid #44403c"}}>
      <h3 style={{margin:"0 0 16px",fontSize:16,fontWeight:700,color:"#e7e5e4"}}>Recurring Motifs</h3>
      {MOTIFS.sort((a,b)=>b.count-a.count).map((m,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
        <div style={{width:180,fontSize:12,fontWeight:600,color:"#e7e5e4",flexShrink:0}}>&ldquo;{m.phrase}&rdquo;</div>
        <div style={{flex:1,height:20,background:"#292524",borderRadius:4,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${m.count/10*100}%`,background:m.type==="ritual"?"#d97706":m.type==="cognitive"?"#3b82f6":"#14b8a6",borderRadius:4,display:"flex",alignItems:"center",paddingLeft:8}}>
            <span style={{fontSize:10,color:"#fff",fontWeight:700}}>{m.count}×</span>
          </div>
        </div>
        <div style={{width:60,fontSize:10,color:"#78716c",textAlign:"right"}}>{m.type}</div>
      </div>)}
    </div>
  </div>;
}

function Findings() {
  return <div style={{display:"flex",flexDirection:"column",gap:24}}>
    <div style={{background:"#1c1917",borderRadius:14,padding:24,border:"1px solid #44403c"}}>
      <h3 style={{margin:"0 0 16px",fontSize:16,fontWeight:700,color:"#e7e5e4"}}>Structural Findings</h3>
      {[
        {title:"The Double Arc is the structural signature",color:"#d97706",body:"Most addiction memoirs have one arc. This one has TWO complete crisis-recovery cycles. Arc 1 (addiction) and Arc 2 (undiagnosed mental health). The bridge between them isn't filler — it's the false summit."},
        {title:"Excerpt 27 is the structural black hole",color:"#ef4444",body:"At 427 words, it's the shortest excerpt. It contains suicidal ideation, desk drinking, and the Frank Costanza intervention. The compression is the point."},
        {title:"Emily is not a love interest — she's a control environment",color:"#f472b6",body:"In audit terms, Emily is the control that compensates for the deficiency. 'Sometimes love is certified mail' is the thesis statement of the relationship."},
        {title:"The Kitchen Sequence is the memoir's DNA",color:"#f59e0b",body:"Freezer → Counter → Pour appears across 7 excerpts spanning 10+ years. Tracking this single physical sequence IS the addiction story."},
        {title:"Audit vocabulary is the voice",color:"#3b82f6",body:"Internal Control, Material Weakness, Going Concern, Unqualified Opinion, Reasonable Assurance. These aren't clever word games. This is how Dave's brain processes experience."},
      ].map((f,i)=><div key={i} style={{background:"#292524",borderRadius:12,padding:20,borderLeft:`4px solid ${f.color}`,marginBottom:12}}>
        <h4 style={{margin:0,fontSize:14,fontWeight:700,color:f.color}}>{f.title}</h4>
        <p style={{margin:"10px 0 0",fontSize:13,color:"#d6d3d1",lineHeight:1.7}}>{f.body}</p>
      </div>)}
    </div>
    <div style={{background:"#292524",borderRadius:12,padding:24,borderLeft:"4px solid #14b8a6"}}>
      <div style={{fontSize:18,fontWeight:600,color:"#fef3c7",lineHeight:1.6,fontStyle:"italic"}}>&ldquo;Sometimes love is certified mail.&rdquo;</div>
      <div style={{fontSize:12,color:"#78716c",marginTop:12}}>Excerpt 49 — Reasonable Assurance</div>
      <div style={{fontSize:13,color:"#a8a29e",marginTop:12,lineHeight:1.7}}>In five words: love as execution, not sentiment. The entire book in a single gesture.</div>
    </div>
  </div>;
}

export default function MemoirAnalysisPage() {
  const [tab,setTab] = useState("index");
  return <div style={{fontFamily:"'Newsreader','Georgia',serif",background:"linear-gradient(180deg,#0c0a09 0%,#1c1917 50%,#0c0a09 100%)",color:"#e7e5e4",minHeight:"100vh",padding:"100px 24px 32px"}}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');`}</style>
    <div style={{maxWidth:1100,margin:"0 auto"}}>
      <div style={{marginBottom:32}}>
        <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:3,color:"#d97706",fontWeight:700,fontFamily:"monospace",marginBottom:8}}>Manuscript Analysis</div>
        <h1 style={{fontSize:38,fontWeight:800,margin:0,color:"#fef3c7",lineHeight:1.1}}>Little to Know Experience</h1>
        <div style={{color:"#78716c",fontSize:15,marginTop:8,fontStyle:"italic"}}>49 excerpts · 52,595 words · 21 years · 2 arcs · 1 kitchen</div>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:24,flexWrap:"wrap"}}>
        {([["index","Master Index"],["arc","Narrative Arc"],["themes","Themes & Motifs"],["findings","Findings"]] as const).map(([id,l])=>
          <Tab key={id} active={tab===id} onClick={()=>setTab(id)}>{l}</Tab>
        )}
      </div>
      {tab==="index" && <MasterIndex/>}
      {tab==="arc" && <NarrativeArc/>}
      {tab==="themes" && <Themes/>}
      {tab==="findings" && <Findings/>}
      <div style={{textAlign:"center",marginTop:40,padding:"20px 0",borderTop:"1px solid #44403c",color:"#57534e",fontSize:12,fontFamily:"monospace"}}>
        Memoir Analysis · Structural · Thematic · Findings · DDL
      </div>
    </div>
  </div>;
}
