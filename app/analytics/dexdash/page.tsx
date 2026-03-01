'use client';

import { useState, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const C = ["Todd","Emily","Family","Christian","Drew","Sergio","Parents","Bret","Austin","Cool Kids"];
const CLR: Record<string, string> = {Todd:"#14b8a6",Emily:"#f472b6",Family:"#a78bfa",Christian:"#fb923c",Drew:"#3b82f6",Sergio:"#22c55e",Parents:"#facc15",Bret:"#f87171",Austin:"#38bdf8","Cool Kids":"#c084fc"};
const ML = ["Mar'23","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan'24","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan'25","Feb","Mar","Apr","May"];

const MD: Record<string, number[][]> = {
Todd:[[0,0,0,0],[16,193,9,7],[555,6668,256,299],[851,9800,366,485],[838,8442,315,523],[1410,14671,630,780],[623,7047,292,331],[963,10490,411,552],[1565,15462,720,845],[742,8593,284,458],[930,10928,440,490],[167,2182,67,100],[554,6660,230,324],[572,11287,226,346],[1294,17358,489,805],[401,5914,182,219],[825,11562,339,486],[551,6436,235,316],[482,5705,183,299],[2704,24510,1212,1492],[821,7740,362,459],[715,8134,261,454],[425,5525,161,264],[1673,18115,723,950],[420,4595,159,261],[586,8815,218,368],[282,4560,108,174]],
Emily:[[93,1162,48,45],[852,13485,433,419],[739,12888,394,345],[570,8146,293,277],[475,6979,248,227],[569,7489,304,265],[431,4596,211,220],[626,8114,367,259],[508,6543,292,216],[353,5049,195,158],[439,5814,243,196],[403,5295,210,193],[431,6815,238,193],[344,6163,197,147],[454,6793,264,190],[569,10360,337,232],[456,7780,263,193],[526,6987,285,241],[323,3385,176,147],[557,7706,321,236],[513,7055,267,246],[422,6053,225,197],[315,3470,172,143],[417,5330,228,189],[215,2831,125,90],[465,7552,253,212],[373,7808,210,163]],
Family:[[114,872,21,93],[995,9629,222,773],[76,556,9,67],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[542,4424,52,490],[933,6698,160,773],[666,5135,89,577],[460,4260,116,344],[315,1981,23,292],[244,1648,13,231],[610,5718,56,554],[330,2445,42,288],[585,4226,70,515],[351,2557,26,325],[343,2343,40,303],[385,2337,45,340],[491,3092,27,464],[405,2502,48,357],[563,4281,43,520],[330,2355,51,279],[263,1929,14,249],[169,1152,25,144],[283,2180,54,229]],
Christian:[[0,0,0,0],[10,72,6,4],[7,214,2,5],[183,2015,102,81],[167,2537,71,96],[1018,11003,543,475],[741,7777,367,374],[470,5244,266,204],[2757,26199,1438,1319],[635,7504,340,295],[421,5818,238,183],[438,4793,225,213],[1592,17206,810,782],[247,5446,118,129],[68,1156,36,32],[59,811,31,28],[178,3227,79,99],[88,1004,42,46],[5,54,2,3],[35,1065,15,20],[0,0,0,0],[0,0,0,0],[0,0,0,0],[86,1944,37,49],[11,311,3,8],[35,720,17,18],[14,132,7,7]],
Drew:[[0,0,0,0],[225,6142,130,95],[48,671,30,18],[175,4528,96,79],[107,2928,60,47],[395,8592,211,184],[147,3819,80,67],[150,4221,89,61],[1006,17106,537,469],[87,1458,50,37],[59,1353,33,26],[57,1186,35,22],[18,456,9,9],[53,834,24,29],[134,4456,65,69],[150,3424,64,86],[0,0,0,0],[696,14698,367,329],[421,8159,218,203],[1088,21251,573,515],[709,14302,370,339],[15,213,10,5],[27,1099,16,11],[1809,27555,941,868],[229,5960,107,122],[26,264,15,11],[39,860,22,17]],
Sergio:[[11,80,6,5],[344,5338,189,155],[128,1664,70,58],[80,1475,48,32],[516,7172,278,238],[389,3720,227,162],[32,390,21,11],[106,880,68,38],[327,3261,176,151],[183,1793,101,82],[216,2465,116,100],[116,1481,60,56],[73,2004,39,34],[28,943,15,13],[8,289,5,3],[292,3402,155,137],[1160,14086,646,514],[555,7987,299,256],[561,6443,285,276],[338,4647,192,146],[258,2460,125,133],[348,3802,179,169],[377,5049,193,184],[343,3950,192,151],[191,1904,98,93],[515,7105,293,222],[100,1173,53,47]],
Parents:[[11,475,5,6],[923,21073,540,383],[983,22026,574,409],[456,7053,239,217],[262,3910,132,130],[329,4821,170,159],[180,2936,94,86],[137,1387,68,69],[151,1722,87,64],[170,2432,83,87],[27,300,12,15],[78,790,39,39],[72,1475,32,40],[59,1255,20,39],[338,5837,167,171],[193,2587,91,102],[92,1480,45,47],[14,191,5,9],[96,1604,35,61],[59,1105,30,29],[182,2132,77,105],[136,1925,66,70],[95,1387,38,57],[197,2779,93,104],[29,311,14,15],[91,1025,41,50],[86,1057,37,49]],
Bret:[[0,0,0,0],[4,54,2,2],[104,1963,54,50],[441,6564,242,199],[434,6619,234,200],[253,3821,134,119],[132,2285,65,67],[138,2355,73,65],[377,4463,229,148],[415,5466,226,189],[371,6000,183,188],[356,5971,190,166],[229,2973,115,114],[80,1592,37,43],[125,2480,69,56],[63,860,38,25],[16,163,10,6],[250,3178,127,123],[174,2121,89,85],[230,3480,133,97],[133,1681,72,61],[51,913,28,23],[83,1522,35,48],[303,3507,189,114],[127,2057,67,60],[38,558,19,19],[10,100,7,3]],
Austin:[[92,1521,50,42],[396,5671,228,168],[238,3251,137,101],[158,2356,89,69],[296,5555,159,137],[61,460,30,31],[156,2530,74,82],[56,1149,27,29],[155,1583,84,71],[105,1063,52,53],[130,2167,67,63],[57,1423,28,29],[107,1496,51,56],[156,4321,70,86],[357,6332,175,182],[295,3170,160,135],[197,1835,95,102],[224,2401,116,108],[179,1599,90,89],[56,398,27,29],[18,196,12,6],[91,747,49,42],[144,1683,66,78],[459,9991,215,244],[134,1577,63,71],[128,1246,71,57],[98,1019,56,42]],
"Cool Kids":[[6,35,3,3],[31,309,5,26],[56,749,28,28],[14,172,6,8],[22,212,13,9],[22,221,2,20],[183,3201,47,136],[52,500,25,27],[78,843,27,51],[97,850,34,63],[116,1617,46,70],[59,694,15,44],[118,1747,32,86],[143,1981,54,89],[111,1869,27,84],[99,1467,35,64],[55,455,26,29],[233,3090,114,119],[379,5425,171,208],[418,6863,171,247],[204,2288,93,111],[55,764,19,36],[75,781,25,50],[634,8726,304,330],[76,920,35,41],[327,5573,125,202],[160,2498,57,103]],
};

const STATS = [
{c:"Todd",t:20965,s:8878,r:12087,w:241392,aw:11.5,sa:14.5,ra:9.3,d:631,sub:"Brother",pk:"Oct'24",pkn:2704},
{c:"Emily",t:12438,s:6799,r:5639,w:181648,aw:14.6,sa:13.1,ra:16.4,d:739,sub:"Wife",pk:"Apr'23",pkn:852},
{c:"Family",t:9453,s:1246,r:8207,w:72320,aw:7.7,sa:11.5,ra:7.1,d:522,sub:"Group Chat",pk:"Apr'23",pkn:995},
{c:"Christian",t:9265,s:4795,r:4470,w:106252,aw:11.5,sa:12.8,ra:10.0,d:277,sub:"Online → IRL Jan'26",pk:"Nov'23",pkn:2757},
{c:"Drew",t:7870,s:4152,r:3718,w:155535,aw:19.8,sa:14.7,ra:25.4,d:269,sub:"Work Friend",pk:"Feb'25",pkn:1809},
{c:"Sergio",t:7595,s:4129,r:3466,w:94963,aw:12.5,sa:11.8,ra:13.4,d:456,sub:"Childhood Friend",pk:"Jul'24",pkn:1160},
{c:"Parents",t:5446,s:2834,r:2612,w:95075,aw:17.5,sa:21.0,ra:13.7,d:407,sub:"Lynn + Jim",pk:"May'23",pkn:983},
{c:"Bret",t:4937,s:2667,r:2270,w:72746,aw:14.7,sa:14.9,ra:14.5,d:379,sub:"Pool Friend (~2 yrs)",pk:"Jun'23",pkn:441},
{c:"Austin",t:4543,s:2341,r:2202,w:66740,aw:14.7,sa:15.3,ra:14.0,d:424,sub:"Childhood Friend",pk:"Feb'25",pkn:459},
{c:"Cool Kids",t:3823,s:1539,r:2284,w:53850,aw:14.1,sa:13.1,ra:14.8,d:306,sub:"Emily's Family",pk:"Feb'25",pkn:634},
];

const HOURLY: Record<string, number[]> = {Todd:[275,111,54,21,7,20,91,130,362,1086,1542,2031,1621,1805,1708,1513,1315,1378,1270,1550,1065,980,655,375],Emily:[101,48,31,45,131,143,217,361,614,848,1050,1068,928,1004,775,825,745,702,715,590,622,466,267,142],Family:[49,11,13,13,29,70,80,164,339,528,711,699,760,688,745,634,600,750,650,679,573,396,192,80],Christian:[142,838,1086,720,292,114,55,21,52,33,112,157,282,409,495,527,393,500,588,563,682,689,469,46],Drew:[191,8,3,4,4,20,39,213,387,566,635,542,745,788,568,560,425,378,308,309,435,311,251,180],Sergio:[342,208,135,92,108,67,66,45,44,95,163,292,530,640,645,623,772,505,358,444,379,375,392,275],Parents:[16,7,13,11,28,106,261,407,401,457,406,479,430,321,363,285,315,252,261,246,188,103,69,21],Bret:[156,41,40,6,3,16,28,62,194,230,302,381,377,323,340,270,324,357,340,267,237,306,199,138],Austin:[64,44,16,11,16,26,125,241,284,255,332,399,370,420,243,216,223,232,209,234,184,176,112,111],"Cool Kids":[67,24,2,2,1,1,12,45,87,227,355,269,239,203,233,243,281,317,332,298,203,138,140,104]};
const DOWDATA: Record<string, number[]> = {Todd:[2607,3177,3174,3265,3152,3154,2436],Emily:[1556,1922,1875,2116,1875,1844,1250],Family:[1264,1205,1346,1178,1671,1521,1268],Christian:[1303,811,1355,1102,1834,1510,1350],Drew:[926,994,1245,1410,1783,1130,382],Sergio:[958,1083,1037,1092,1433,965,1027],Parents:[758,757,829,866,767,693,776],Bret:[610,547,810,561,1003,867,539],Austin:[716,600,527,662,716,657,665],"Cool Kids":[394,531,385,495,737,675,606]};
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const HRS = ["12a","1a","2a","3a","4a","5a","6a","7a","8a","9a","10a","11a","12p","1p","2p","3p","4p","5p","6p","7p","8p","9p","10p","11p"];

const fmt = (n: number) => n>=1e6?(n/1e6).toFixed(1)+"M":n>=1e4?(n/1e3).toFixed(0)+"K":n>=1e3?(n/1e3).toFixed(1)+"K":String(n);
const totalMsgs = STATS.reduce((a,s)=>a+s.t,0);
const totalWords = STATS.reduce((a,s)=>a+s.w,0);

const Tip = ({active,payload,label}: any) => {
  if(!active||!payload?.length) return null;
  return <div style={{background:"#1a1a2e",border:"1px solid #2a2a4a",borderRadius:8,padding:"10px 14px",fontSize:12,color:"#e0e0e0",maxWidth:260}}>
    <div style={{fontWeight:700,marginBottom:4,color:"#fff"}}>{label}</div>
    {payload.filter((p: any)=>p.value>0).map((p: any,i: number)=><div key={i} style={{display:"flex",gap:8,alignItems:"center"}}>
      <div style={{width:8,height:8,borderRadius:"50%",background:p.color||p.fill,flexShrink:0}}/>
      <span style={{color:"#aaa",flex:1}}>{p.name}:</span>
      <span style={{fontWeight:600,color:p.color||p.fill}}>{typeof p.value==="number"&&p.value>999?fmt(p.value):p.value}</span>
    </div>)}
  </div>;
};

const TabBtn = ({active,onClick,children}: {active: boolean; onClick: () => void; children: React.ReactNode}) => <button onClick={onClick} style={{
  background:active?"linear-gradient(135deg,#0f766e,#14b8a6)":"transparent",
  color:active?"#fff":"#8892b0",border:active?"none":"1px solid #2a2a4a",
  borderRadius:8,padding:"8px 18px",fontSize:13,fontWeight:600,cursor:"pointer",transition:"all 0.2s",
}}>{children}</button>;

const Card = ({label,value,sub,color,icon}: {label: string; value: string; sub?: string; color: string; icon?: string}) => <div style={{
  background:"linear-gradient(135deg,#1a1a2e,#16213e)",borderRadius:12,padding:"18px 22px",
  border:"1px solid #2a2a4a",position:"relative",overflow:"hidden",minWidth:0,
}}>
  {icon && <div style={{position:"absolute",top:-10,right:-10,fontSize:56,opacity:0.06,color}}>{icon}</div>}
  <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:1.5,color:"#8892b0",marginBottom:6,fontWeight:600}}>{label}</div>
  <div style={{fontSize:28,fontWeight:800,color,lineHeight:1,fontFamily:"'JetBrains Mono',monospace"}}>{value}</div>
  {sub&&<div style={{fontSize:11,color:"#5a6a8a",marginTop:5}}>{sub}</div>}
</div>;

const Panel = ({title,sub,children}: {title: string; sub?: string; children: React.ReactNode}) => <div style={{background:"#1a1a2e",borderRadius:14,padding:24,border:"1px solid #2a2a4a"}}>
  <h3 style={{margin:0,fontSize:16,fontWeight:700,color:"#e6edf3"}}>{title}</h3>
  {sub&&<div style={{fontSize:12,color:"#5a6a8a",marginTop:4}}>{sub}</div>}
  <div style={{marginTop:16}}>{children}</div>
</div>;

function Overview({onDrillDown}: {onDrillDown: (c: string) => void}) {
  return <div style={{display:"flex",flexDirection:"column",gap:24}}>
    <Panel title="Message Volume by Relationship" sub="Top 10 contacts — click any bar to deep dive">
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {STATS.map(s=>{const pct=s.t/STATS[0].t*100; return <div key={s.c} style={{display:"flex",alignItems:"center",gap:12,cursor:"pointer"}} onClick={()=>onDrillDown(s.c)}>
          <div style={{width:85,flexShrink:0}}>
            <div style={{fontSize:13,fontWeight:600,color:CLR[s.c]}}>{s.c}</div>
            <div style={{fontSize:10,color:"#5a6a8a"}}>{s.sub}</div>
          </div>
          <div style={{flex:1,height:28,background:"#0d1117",borderRadius:6,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${CLR[s.c]}66,${CLR[s.c]})`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:8}}>
              <span style={{fontSize:11,fontWeight:700,color:"#fff"}}>{fmt(s.t)}</span>
            </div>
          </div>
          <div style={{width:44,fontSize:12,color:"#5a6a8a",textAlign:"right",flexShrink:0}}>{(s.t/totalMsgs*100).toFixed(1)}%</div>
        </div>;})}
      </div>
    </Panel>
    <Panel title="Sent vs Received Balance">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={STATS.map(s=>({name:s.c,Sent:s.s,Received:s.r}))} barSize={14} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" horizontal={false}/>
          <XAxis type="number" stroke="#5a6a8a" fontSize={11} tickFormatter={fmt}/>
          <YAxis type="category" dataKey="name" stroke="#5a6a8a" fontSize={11} width={75}/>
          <Tooltip content={<Tip/>}/>
          <Legend wrapperStyle={{fontSize:12}}/>
          <Bar dataKey="Sent" fill="#14b8a6" radius={[0,4,4,0]} stackId="a"/>
          <Bar dataKey="Received" fill="#3b82f6" radius={[0,4,4,0]} stackId="a"/>
        </BarChart>
      </ResponsiveContainer>
    </Panel>
  </div>;
}

function Timeline() {
  const [metric,setMetric] = useState("msgs");
  const data = useMemo(()=>ML.map((label,i)=>{
    const row: Record<string, any> = {month:label};
    C.forEach(c=>{const d=MD[c][i];row[c]=metric==="msgs"?d[0]:d[1];});
    return row;
  }),[metric]);

  return <div style={{display:"flex",flexDirection:"column",gap:24}}>
    <div style={{display:"flex",gap:8}}>
      <TabBtn active={metric==="msgs"} onClick={()=>setMetric("msgs")}>Messages</TabBtn>
      <TabBtn active={metric==="words"} onClick={()=>setMetric("words")}>Words</TabBtn>
    </div>
    <Panel title={`Monthly ${metric==="msgs"?"Message":"Word"} Volume`} sub="All 10 relationships stacked over 27 months">
      <ResponsiveContainer width="100%" height={380}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a"/>
          <XAxis dataKey="month" stroke="#5a6a8a" fontSize={10} interval={2}/>
          <YAxis stroke="#5a6a8a" fontSize={11} tickFormatter={fmt}/>
          <Tooltip content={<Tip/>}/>
          <Legend wrapperStyle={{fontSize:11}}/>
          {C.map(c=><Area key={c} type="monotone" dataKey={c} stackId="1" stroke={CLR[c]} fill={CLR[c]+"88"} strokeWidth={1.5}/>)}
        </AreaChart>
      </ResponsiveContainer>
    </Panel>
    <Panel title="Individual Trajectories">
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a"/>
          <XAxis dataKey="month" stroke="#5a6a8a" fontSize={10} interval={2}/>
          <YAxis stroke="#5a6a8a" fontSize={11} tickFormatter={fmt}/>
          <Tooltip content={<Tip/>}/>
          <Legend wrapperStyle={{fontSize:11}}/>
          {C.map(c=><Line key={c} type="monotone" dataKey={c} stroke={CLR[c]} strokeWidth={1.5} dot={false}/>)}
        </LineChart>
      </ResponsiveContainer>
    </Panel>
  </div>;
}

function DeepDive({selected,setSelected}: {selected: string|null; setSelected: (c: string) => void}) {
  const sel = STATS.find(s=>s.c===selected);
  const monthly = selected ? MD[selected] : null;
  const heatData = useMemo(()=>{
    if(!selected) return null;
    const h=HOURLY[selected]; const mx=Math.max(...h);
    return h.map((v,i)=>({hour:HRS[i],count:v,pct:mx>0?v/mx:0}));
  },[selected]);
  const dowData = useMemo(()=>{
    if(!selected) return null;
    return DAYS.map((d,i)=>({day:d,count:DOWDATA[selected][i]}));
  },[selected]);

  return <div style={{display:"flex",flexDirection:"column",gap:24}}>
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
      {C.map(c=><button key={c} onClick={()=>setSelected(c)} style={{
        background:selected===c?CLR[c]:"transparent",color:selected===c?"#fff":"#8892b0",
        border:`1px solid ${selected===c?CLR[c]:"#2a2a4a"}`,borderRadius:8,padding:"6px 14px",
        fontSize:12,fontWeight:600,cursor:"pointer",transition:"all 0.2s",
      }}>{c}</button>)}
    </div>
    {sel && monthly ? <>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12}}>
        <Card label="Total Messages" value={fmt(sel.t)} color={CLR[sel.c]} icon="◆"/>
        <Card label="Sent / Received" value={`${fmt(sel.s)} / ${fmt(sel.r)}`} sub={`Ratio: ${(sel.s/sel.r).toFixed(2)}`} color={sel.s>sel.r?"#14b8a6":"#3b82f6"} icon="⇄"/>
        <Card label="Total Words" value={fmt(sel.w)} color="#f59e0b" icon="✦"/>
        <Card label="Avg Words/Msg" value={String(sel.aw)} sub={`You: ${sel.sa} · Them: ${sel.ra}`} color="#8b5cf6" icon="≡"/>
        <Card label="Active Days" value={String(sel.d)} color="#22c55e" icon="●"/>
        <Card label="Peak Month" value={sel.pk} sub={`${fmt(sel.pkn)} msgs`} color="#ef4444" icon="▲"/>
      </div>
      <Panel title={`${sel.c} — Monthly Volume`} sub={sel.sub}>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={monthly.map((d,i)=>({month:ML[i],Sent:d[2],Received:d[3]}))}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a"/>
            <XAxis dataKey="month" stroke="#5a6a8a" fontSize={10} interval={2}/>
            <YAxis stroke="#5a6a8a" fontSize={11}/>
            <Tooltip content={<Tip/>}/>
            <Legend wrapperStyle={{fontSize:12}}/>
            <Bar dataKey="Sent" stackId="a" fill="#14b8a6" radius={[3,3,0,0]}/>
            <Bar dataKey="Received" stackId="a" fill="#3b82f6" radius={[3,3,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </Panel>
      {heatData && <Panel title={`${sel.c} — Activity by Hour`}>
        <div style={{display:"flex",gap:2,alignItems:"flex-end",height:100}}>
          {heatData.map((h,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
            <div style={{width:"100%",background:CLR[selected!],opacity:0.12+h.pct*0.88,borderRadius:3,height:Math.max(4,h.pct*90),transition:"all 0.3s"}}/>
            <div style={{fontSize:8,color:"#5a6a8a",transform:"rotate(-45deg)",whiteSpace:"nowrap"}}>{h.hour}</div>
          </div>)}
        </div>
      </Panel>}
      {dowData && <Panel title={`${sel.c} — Day of Week`}>
        <ResponsiveContainer width="100%" height={170}>
          <BarChart data={dowData} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a"/>
            <XAxis dataKey="day" stroke="#5a6a8a" fontSize={12}/>
            <YAxis stroke="#5a6a8a" fontSize={11}/>
            <Tooltip content={<Tip/>}/>
            <Bar dataKey="count" fill={CLR[selected!]} radius={[4,4,0,0]} name="Messages"/>
          </BarChart>
        </ResponsiveContainer>
      </Panel>}
    </> : <div style={{textAlign:"center",padding:60,color:"#5a6a8a",fontSize:14}}>Select a contact above to explore</div>}
  </div>;
}

function Patterns() {
  return <div style={{display:"flex",flexDirection:"column",gap:24}}>
    <Panel title="Who Initiates?" sub="Sent/Received ratio per contact">
      <div style={{display:"flex",justifyContent:"center",gap:16,flexWrap:"wrap",marginBottom:16}}>
        {[...STATS].sort((a,b)=>(b.s/b.r)-(a.s/a.r)).map(s=>{const ratio=s.s/s.r; return <div key={s.c} style={{textAlign:"center",minWidth:70}}>
          <div style={{fontSize:22,fontWeight:800,fontFamily:"'JetBrains Mono',monospace",color:ratio>1?CLR[s.c]:"#5a6a8a"}}>{ratio.toFixed(2)}</div>
          <div style={{fontSize:10,color:CLR[s.c],fontWeight:600}}>{s.c}</div>
          <div style={{fontSize:9,color:"#3a4a6a"}}>{ratio>1?"Dave >":"Them >"}</div>
        </div>;})}
      </div>
    </Panel>
    <Panel title="Activity Heatmap — All Contacts by Hour" sub="Brightness = message density">
      <div style={{overflowX:"auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"75px repeat(24,1fr)",gap:2,minWidth:550}}>
          <div/>
          {HRS.map(h=><div key={h} style={{fontSize:8,color:"#5a6a8a",textAlign:"center"}}>{h}</div>)}
          {C.map(c=>{
            const h=HOURLY[c]; const mx=Math.max(...h);
            return [
              <div key={c+"l"} style={{fontSize:11,color:CLR[c],fontWeight:600,display:"flex",alignItems:"center"}}>{c}</div>,
              ...h.map((v,i)=><div key={c+i} style={{height:20,borderRadius:2,background:CLR[c],opacity:mx>0?0.08+v/mx*0.92:0.08}} title={`${HRS[i]}: ${v}`}/>)
            ];
          })}
        </div>
      </div>
    </Panel>
    <Panel title="Conversation Depth" sub="Average words per message">
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:12}}>
        {[...STATS].sort((a,b)=>b.aw-a.aw).map(s=><div key={s.c} style={{background:"#0d1117",borderRadius:10,padding:14,border:`1px solid ${CLR[s.c]}33`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <span style={{fontSize:13,fontWeight:600,color:CLR[s.c]}}>{s.c}</span>
            <span style={{fontSize:20,fontWeight:800,fontFamily:"'JetBrains Mono',monospace",color:"#e6edf3"}}>{s.aw}</span>
          </div>
          <div style={{fontSize:10,color:"#5a6a8a",marginBottom:6}}>words/msg</div>
          <div style={{display:"flex",gap:8}}>
            <div style={{flex:1}}><div style={{fontSize:9,color:"#14b8a6"}}>Dave</div><div style={{fontSize:13,fontWeight:700,fontFamily:"'JetBrains Mono',monospace",color:"#14b8a6"}}>{s.sa}</div></div>
            <div style={{flex:1}}><div style={{fontSize:9,color:"#f59e0b"}}>Them</div><div style={{fontSize:13,fontWeight:700,fontFamily:"'JetBrains Mono',monospace",color:"#f59e0b"}}>{s.ra}</div></div>
          </div>
        </div>)}
      </div>
    </Panel>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
      {[
        {title:"The Night Owl",color:"#fb923c",body:"Christian peaks at 2 AM — 1,086 messages between 2-3 AM alone. An 18-year online friendship with no time zone rules."},
        {title:"The Steady Pulse",color:"#f472b6",body:"Emily: 739 active days — most consistent thread in the dataset. Never a zero month. 1.21 sent/received ratio."},
        {title:"The Listener",color:"#a78bfa",body:"Family group: 0.15 sent/received ratio. Dave sends 1,246 vs receiving 8,207. He reads — he doesn't dominate."},
        {title:"The Deep Talker",color:"#3b82f6",body:"Drew averages 19.8 words/msg — highest density. Drew's replies average 25.4 words. Real conversations."},
      ].map((card,i)=><div key={i} style={{
        background:"linear-gradient(135deg,#1a1a2e,#16213e)",borderRadius:14,padding:24,border:"1px solid #2a2a4a",position:"relative",overflow:"hidden",
      }}>
        <div style={{position:"absolute",top:0,left:0,width:4,height:"100%",background:card.color,borderRadius:"4px 0 0 4px"}}/>
        <h4 style={{margin:"0 0 10px",fontSize:15,fontWeight:700,color:card.color}}>{card.title}</h4>
        <p style={{margin:0,fontSize:13,color:"#8892b0",lineHeight:1.6}}>{card.body}</p>
      </div>)}
    </div>
  </div>;
}

export default function DexDashPage() {
  const [tab,setTab] = useState("overview");
  const [selected,setSelected] = useState<string|null>(null);
  const drillDown = (contact: string) => { setSelected(contact); setTab("contact"); };

  return <div style={{fontFamily:"'Inter',-apple-system,sans-serif",background:"linear-gradient(180deg,#0d1117 0%,#161b22 50%,#0d1117 100%)",color:"#e6edf3",minHeight:"100vh",padding:"100px 24px 32px"}}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;700;800&display=swap');`}</style>
    <div style={{maxWidth:1100,margin:"0 auto"}}>
      <div style={{marginBottom:32,display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
        <div>
          <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:3,color:"#14b8a6",fontWeight:700,marginBottom:8}}>Communication Analytics</div>
          <h1 style={{fontSize:36,fontWeight:800,margin:0,background:"linear-gradient(135deg,#e6edf3,#8892b0)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>DexDash</h1>
          <div style={{color:"#5a6a8a",fontSize:14,marginTop:4}}>Mar 2023 — May 2025 · 293,746 messages · 790 contacts</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:42,fontWeight:800,color:"#14b8a6",lineHeight:1}}>86.3<span style={{fontSize:20,color:"#5a6a8a"}}>K</span></div>
          <div style={{fontSize:11,color:"#5a6a8a",marginTop:4}}>Top 10 Messages</div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:14,marginBottom:28}}>
        <Card label="Total Messages" value={fmt(totalMsgs)} sub="across Top 10" color="#14b8a6" icon="◆"/>
        <Card label="Words Exchanged" value={fmt(totalWords)} sub="1.14M total words" color="#3b82f6" icon="✦"/>
        <Card label="Longest Streak" value="739" sub="Emily — active days" color="#f472b6" icon="●"/>
        <Card label="#1 Volume" value="Todd" sub="20,965 msgs (24.3%)" color="#14b8a6" icon="▲"/>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:24,flexWrap:"wrap"}}>
        {([["overview","Overview"],["timeline","Timeline"],["contact","Deep Dive"],["patterns","Patterns"]] as const).map(([id,l])=>
          <TabBtn key={id} active={tab===id} onClick={()=>setTab(id)}>{l}</TabBtn>
        )}
      </div>
      {tab==="overview" && <Overview onDrillDown={drillDown}/>}
      {tab==="timeline" && <Timeline/>}
      {tab==="contact" && <DeepDive selected={selected} setSelected={setSelected}/>}
      {tab==="patterns" && <Patterns/>}
      <div style={{textAlign:"center",marginTop:40,padding:"20px 0",borderTop:"1px solid #2a2a4a",color:"#3a4a6a",fontSize:12}}>
        DexDash · Communication Analytics · 293,746 messages · Mar 2023 – May 2025
      </div>
    </div>
  </div>;
}
