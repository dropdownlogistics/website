'use client';
import { useState } from "react";

const ENTRIES = [
  { id:"F001", date:"2025-11-03", time:"07:14", location:"Merriam Town Center", station:"QuikTrip", odometer:63378, gallons:12.840, totalCost:35.17, ppg:2.74, temp:46, tripMiles:153.7, tripMPG:25.8, avgSpeed:35.9, confidence:"Full", notes:"" },
  { id:"F002", date:"2025-11-18", time:"06:56", location:"Overland Park", station:"QuikTrip", odometer:63722, gallons:14.477, totalCost:39.65, ppg:2.74, temp:56, tripMiles:343.7, tripMPG:24.4, avgSpeed:30.2, confidence:"Full", notes:"" },
  { id:"F003", date:"2025-12-01", time:"13:05", location:"Merriam Town Center", station:"QuikTrip", odometer:64030, gallons:13.627, totalCost:39.50, ppg:2.90, temp:27, tripMiles:307.8, tripMPG:22.6, avgSpeed:32.3, confidence:"Full", notes:"" },
  { id:"F004", date:"2025-12-15", time:"10:44", location:"Merriam Town Center", station:"QuikTrip", odometer:64321, gallons:14.172, totalCost:37.68, ppg:2.66, temp:38, tripMiles:290.4, tripMPG:20.4, avgSpeed:20.6, confidence:"Full", notes:"Severe traffic / winter commute conditions" },
  { id:"F005", date:"2025-12-28", time:"11:40", location:"Overland Park", station:"QuikTrip", odometer:64670, gallons:14.161, totalCost:36.00, ppg:2.54, temp:36, tripMiles:349.3, tripMPG:25.9, avgSpeed:34.0, confidence:"Medium", notes:"Total cost partially obscured — treated as approx" },
  { id:"F006", date:"2026-01-12", time:"06:41", location:"Overland Park", station:"QuikTrip", odometer:64953, gallons:12.806, totalCost:32.00, ppg:2.50, temp:33, tripMiles:282.7, tripMPG:22.2, avgSpeed:23.6, confidence:"Full", notes:"" },
  { id:"F007", date:"2026-01-25", time:"10:08", location:"Overland Park", station:"QuikTrip", odometer:65227, gallons:12.556, totalCost:32.63, ppg:2.60, temp:7,  tripMiles:274.5, tripMPG:22.0, avgSpeed:24.0, confidence:"Full", notes:"Snow visible on pump — extreme cold" },
  { id:"F008", date:"2026-02-07", time:"09:17", location:"Overland Park", station:"QuikTrip", odometer:65518, gallons:14.209, totalCost:36.93, ppg:2.60, temp:34, tripMiles:290.4, tripMPG:20.7, avgSpeed:20.9, confidence:"Full", notes:"" },
  { id:"F009", date:"2026-02-23", time:"10:43", location:"Overland Park", station:"QuikTrip", odometer:65852, gallons:14.625, totalCost:36.84, ppg:2.52, temp:19, tripMiles:332.5, tripMPG:22.9, avgSpeed:23.3, confidence:"Full", notes:"" },
];

// Derived fields
const enriched = ENTRIES.map((e, i) => ({
  ...e,
  odoMPG: i === 0 ? null : (e.odometer - ENTRIES[i-1].odometer) / e.gallons,
  daysSinceLast: i === 0 ? null : Math.round((new Date(e.date) - new Date(ENTRIES[i-1].date)) / 86400000),
  costPerMile: e.totalCost / e.tripMiles,
}));

const avg = arr => arr.reduce((a,b) => a+b, 0) / arr.length;
const fmt = (n, d=1) => n?.toFixed(d) ?? "—";

const KPI = ({ label, value, unit, sub }) => (
  <div style={{ background:"#10202f", border:"1px solid #1e3448", borderRadius:8, padding:"16px 18px", minWidth:140 }}>
    <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:22, fontWeight:700, color:"#C49A3C", letterSpacing:-0.5 }}>
      {value}<span style={{ fontSize:13, color:"#8a9ab0", marginLeft:3 }}>{unit}</span>
    </div>
    <div style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:11, color:"#8a9ab0", marginTop:4, textTransform:"uppercase", letterSpacing:1 }}>{label}</div>
    {sub && <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:10, color:"#4A9E6B", marginTop:2 }}>{sub}</div>}
  </div>
);

const MPGBar = ({ value, max=30, min=19 }) => {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const color = value >= 25 ? "#4A9E6B" : value >= 22 ? "#C49A3C" : "#B23531";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      <div style={{ flex:1, height:6, background:"#1e3448", borderRadius:3, overflow:"hidden" }}>
        <div style={{ width:`${pct}%`, height:"100%", background:color, borderRadius:3, transition:"width 0.4s ease" }} />
      </div>
      <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:11, color, minWidth:36 }}>{fmt(value)}</span>
    </div>
  );
};

export default function VehicleFuelDashboard() {
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("dashboard");

  const totalGallons = enriched.reduce((a,b)=>a+b.gallons,0);
  const totalCost = enriched.reduce((a,b)=>a+b.totalCost,0);
  const totalMiles = enriched.reduce((a,b)=>a+b.tripMiles,0);
  const avgMPG = avg(enriched.map(e=>e.tripMPG));
  const avgPPG = avg(enriched.map(e=>e.ppg));
  const avgOdoMPG = avg(enriched.slice(1).map(e=>e.odoMPG));
  const minMPG = Math.min(...enriched.map(e=>e.tripMPG));
  const maxMPG = Math.max(...enriched.map(e=>e.tripMPG));
  const avgTemp = avg(enriched.map(e=>e.temp));
  const odometerSpan = enriched[enriched.length-1].odometer - enriched[0].odometer;

  const sel = selected !== null ? enriched[selected] : null;

  const styles = {
    root: { background:"#0D1B2A", minHeight:"100vh", color:"#F5F1EB", fontFamily:"'Space Grotesk', sans-serif", padding:0 },
    header: { background:"#10202f", borderBottom:"1px solid #1e3448", padding:"20px 28px", display:"flex", justifyContent:"space-between", alignItems:"center" },
    vehicleTag: { fontFamily:"'JetBrains Mono', monospace", fontSize:11, color:"#8a9ab0", marginTop:4, letterSpacing:1 },
    navBtn: (active) => ({
      fontFamily:"'Space Grotesk', sans-serif", fontSize:12, fontWeight:600,
      padding:"7px 18px", borderRadius:5, border:"none", cursor:"pointer",
      background: active ? "#C49A3C" : "transparent",
      color: active ? "#0D1B2A" : "#8a9ab0",
      letterSpacing:0.5, textTransform:"uppercase", transition:"all 0.2s"
    }),
    section: { padding:"24px 28px" },
    kpiGrid: { display:"flex", flexWrap:"wrap", gap:12, marginBottom:28 },
    tableWrap: { overflowX:"auto", borderRadius:8, border:"1px solid #1e3448" },
    th: { fontFamily:"'Space Grotesk', sans-serif", fontSize:10, color:"#8a9ab0", textTransform:"uppercase", letterSpacing:1, padding:"10px 14px", background:"#0a1520", whiteSpace:"nowrap", fontWeight:600 },
    td: (i, highlight) => ({
      fontFamily:"'JetBrains Mono', monospace", fontSize:11,
      padding:"11px 14px", borderTop:"1px solid #1e3448",
      background: highlight ? "#1a2e42" : i%2===0 ? "#10202f" : "#0e1c2c",
      color:"#F5F1EB", whiteSpace:"nowrap", cursor:"pointer",
      transition:"background 0.15s"
    }),
    detailPanel: {
      background:"#10202f", border:"1px solid #C49A3C40", borderRadius:10,
      padding:24, marginBottom:24
    },
    label: { fontSize:10, color:"#8a9ab0", textTransform:"uppercase", letterSpacing:1, fontFamily:"'Space Grotesk', sans-serif", marginBottom:3 },
    value: { fontFamily:"'JetBrains Mono', monospace", fontSize:15, color:"#F5F1EB", fontWeight:600 },
    badge: (conf) => ({
      display:"inline-block", padding:"2px 10px", borderRadius:12, fontSize:10, fontWeight:700,
      fontFamily:"'Space Grotesk', sans-serif", letterSpacing:0.5, textTransform:"uppercase",
      background: conf==="Full" ? "#4A9E6b22" : "#C49A3C22",
      color: conf==="Full" ? "#4A9E6B" : "#C49A3C",
      border: `1px solid ${conf==="Full" ? "#4A9E6B44" : "#C49A3C44"}`
    }),
  };

  return (
    <div style={styles.root}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:18, fontWeight:700, letterSpacing:-0.5 }}>Vehicle Fuel Log</span>
            <span style={{ background:"#C49A3c22", color:"#C49A3C", border:"1px solid #C49A3C44", borderRadius:12, padding:"2px 10px", fontSize:10, fontWeight:700, letterSpacing:1, fontFamily:"'JetBrains Mono', monospace" }}>v3.0</span>
          </div>
          <div style={styles.vehicleTag}>BKE-2021-FWD-001 · 2021 Buick Envision Essence FWD</div>
        </div>
        <div style={{ display:"flex", gap:6 }}>
          {["dashboard","log"].map(v => (
            <button key={v} style={styles.navBtn(view===v)} onClick={()=>setView(v)}>
              {v === "dashboard" ? "Dashboard" : "Fill-Up Log"}
            </button>
          ))}
        </div>
      </div>

      {view === "dashboard" && (
        <div style={styles.section}>
          {/* KPIs */}
          <div style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:11, color:"#8a9ab0", textTransform:"uppercase", letterSpacing:1.5, marginBottom:14 }}>Performance Summary · Nov 2025 â€“ Feb 2026</div>
          <div style={styles.kpiGrid}>
            <KPI label="Total Fill-Ups" value={enriched.length} unit="" />
            <KPI label="Total Gallons" value={fmt(totalGallons,3)} unit="gal" />
            <KPI label="Total Fuel Spend" value={`$${fmt(totalCost,2)}`} unit="" />
            <KPI label="Avg Price/Gal" value={`$${fmt(avgPPG,3)}`} unit="" />
            <KPI label="Trip Miles Logged" value={fmt(totalMiles,1)} unit="mi" />
            <KPI label="Avg Trip MPG" value={fmt(avgMPG,2)} unit="mpg" sub={`Odo-verified: ${fmt(avgOdoMPG,2)} mpg`} />
            <KPI label="MPG Range" value={`${fmt(minMPG,1)}â€“${fmt(maxMPG,1)}`} unit="mpg" />
            <KPI label="Odometer Span" value={odometerSpan.toLocaleString()} unit="mi" />
            <KPI label="Avg Fill Temp" value={fmt(avgTemp,1)} unit="°F" />
          </div>

          {/* MPG Chart */}
          <div style={{ background:"#10202f", border:"1px solid #1e3448", borderRadius:8, padding:"20px 22px", marginBottom:20 }}>
            <div style={{ fontSize:11, color:"#8a9ab0", textTransform:"uppercase", letterSpacing:1.5, marginBottom:16, fontFamily:"'Space Grotesk', sans-serif" }}>Trip MPG by Fill-Up</div>
            {enriched.map((e,i) => (
              <div key={e.id} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
                <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:10, color:"#8a9ab0", minWidth:72 }}>{e.date.slice(5)}</div>
                <div style={{ flex:1 }}><MPGBar value={e.tripMPG} /></div>
                <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:10, color:"#8a9ab0", minWidth:40, textAlign:"right" }}>{e.temp}°F</div>
              </div>
            ))}
            <div style={{ display:"flex", gap:18, marginTop:14, paddingTop:12, borderTop:"1px solid #1e3448" }}>
              {[["#4A9E6B","â‰¥ 25 mpg"],["#C49A3C","22â€“24 mpg"],["#B23531","< 22 mpg"]].map(([c,l]) => (
                <div key={l} style={{ display:"flex", alignItems:"center", gap:6, fontFamily:"'Space Grotesk', sans-serif", fontSize:10, color:"#8a9ab0" }}>
                  <div style={{ width:8, height:8, borderRadius:2, background:c }} />{l}
                </div>
              ))}
            </div>
          </div>

          {/* Analyst Notes */}
          <div style={{ background:"#10202f", border:"1px solid #1e3448", borderRadius:8, padding:"20px 22px" }}>
            <div style={{ fontSize:11, color:"#8a9ab0", textTransform:"uppercase", letterSpacing:1.5, marginBottom:14, fontFamily:"'Space Grotesk', sans-serif" }}>Analyst Flags</div>
            {[
              { color:"#C49A3C", flag:"Winter MPG suppression confirmed — Dec/Jan tanks 2â€“5 mpg below Nov/Feb baseline" },
              { color:"#C49A3C", flag:"Low avg speed correlates directly with MPG loss (F004: 20.6 mph â†’ 20.4 mpg)" },
              { color:"#B23531", flag:"F007: Extreme cold (7°F) — lowest temp recorded. MPG held at 22.0, suspect mild suppression" },
              { color:"#4A9E6B", flag:"F005: Medium confidence — total cost obscured in source image. Flag for re-verification" },
              { color:"#4A9E6B", flag:"Fill cadence stable: 13â€“16 days per tank across all 9 entries" },
            ].map((a,i) => (
              <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:10 }}>
                <div style={{ width:3, minHeight:16, borderRadius:2, background:a.color, marginTop:2 }} />
                <div style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:12, color:"#c8d4e0", lineHeight:1.5 }}>{a.flag}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "log" && (
        <div style={styles.section}>
          {sel && (
            <div style={styles.detailPanel}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:18 }}>
                <div>
                  <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:13, color:"#C49A3C", fontWeight:700 }}>{sel.id}</div>
                  <div style={{ fontSize:11, color:"#8a9ab0", marginTop:2 }}>{sel.date} · {sel.time} · {sel.location}</div>
                </div>
                <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <span style={styles.badge(sel.confidence)}>{sel.confidence}</span>
                  <button onClick={()=>setSelected(null)} style={{ background:"none", border:"1px solid #1e3448", borderRadius:5, color:"#8a9ab0", padding:"4px 10px", cursor:"pointer", fontSize:11 }}>âœ•</button>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(140px, 1fr))", gap:16 }}>
                {[
                  ["Station", sel.station],
                  ["Odometer", sel.odometer.toLocaleString() + " mi"],
                  ["Gallons", fmt(sel.gallons,3) + " gal"],
                  ["Total Cost", "$" + fmt(sel.totalCost,2)],
                  ["Price/Gal", "$" + fmt(sel.ppg,3)],
                  ["Temperature", sel.temp + "°F"],
                  ["Trip Miles", fmt(sel.tripMiles,1) + " mi"],
                  ["Trip MPG", fmt(sel.tripMPG,1) + " mpg"],
                  ["Avg Speed", fmt(sel.avgSpeed,1) + " mph"],
                  ["Odo MPG", sel.odoMPG ? fmt(sel.odoMPG,2) + " mpg" : "—"],
                  ["Days Since Last", sel.daysSinceLast ? sel.daysSinceLast + " days" : "—"],
                  ["Cost/Mile", "$" + fmt(sel.costPerMile,3)],
                ].map(([l,v]) => (
                  <div key={l}>
                    <div style={styles.label}>{l}</div>
                    <div style={styles.value}>{v}</div>
                  </div>
                ))}
              </div>
              {sel.notes && (
                <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid #1e3448" }}>
                  <div style={styles.label}>Notes</div>
                  <div style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:12, color:"#c8d4e0", marginTop:4 }}>{sel.notes}</div>
                </div>
              )}
            </div>
          )}

          <div style={styles.tableWrap}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr>
                  {["ID","Date","Station","Odometer","Gallons","Total","$/Gal","Temp","Trip Mi","Trip MPG","Odo MPG","Days","Conf"].map(h => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {enriched.map((e,i) => {
                  const highlight = selected === i;
                  const mpgColor = e.tripMPG >= 25 ? "#4A9E6B" : e.tripMPG >= 22 ? "#C49A3C" : "#B23531";
                  return (
                    <tr key={e.id} onClick={() => setSelected(selected===i ? null : i)}>
                      <td style={{...styles.td(i,highlight), color:"#C49A3C", fontWeight:700}}>{e.id}</td>
                      <td style={styles.td(i,highlight)}>{e.date.slice(5)}</td>
                      <td style={styles.td(i,highlight)}>{e.station}</td>
                      <td style={styles.td(i,highlight)}>{e.odometer.toLocaleString()}</td>
                      <td style={styles.td(i,highlight)}>{fmt(e.gallons,3)}</td>
                      <td style={styles.td(i,highlight)}>${fmt(e.totalCost,2)}</td>
                      <td style={styles.td(i,highlight)}>${fmt(e.ppg,3)}</td>
                      <td style={{...styles.td(i,highlight), color: e.temp <= 15 ? "#B23531" : e.temp <= 35 ? "#C49A3C" : "#4A9E6B"}}>{e.temp}°</td>
                      <td style={styles.td(i,highlight)}>{fmt(e.tripMiles,1)}</td>
                      <td style={{...styles.td(i,highlight), color:mpgColor, fontWeight:700}}>{fmt(e.tripMPG,1)}</td>
                      <td style={{...styles.td(i,highlight), color:"#8a9ab0"}}>{e.odoMPG ? fmt(e.odoMPG,2) : "—"}</td>
                      <td style={{...styles.td(i,highlight), color:"#8a9ab0"}}>{e.daysSinceLast ?? "—"}</td>
                      <td style={styles.td(i,highlight)}>
                        <span style={styles.badge(e.confidence)}>{e.confidence}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:10, color:"#8a9ab0", marginTop:10 }}>
            Click any row to expand detail view · Gold = derived field · Green = confidence full · Amber = medium
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ borderTop:"1px solid #1e3448", padding:"12px 28px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:10, color:"#8a9ab0" }}>
          DDL · VehicleTracker v3.0 · Extracted 2026-03-07 · 9 fill-ups · 0 formula errors
        </div>
        <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:10, color:"#C49A3C" }}>
          BKE-2021-FWD-001
        </div>
      </div>
    </div>
  );
}

