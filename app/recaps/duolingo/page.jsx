'use client';
import { useState } from "react";

const C = {
  navy: "#0D1B2A", card: "#10202f", cardHover: "#162538",
  crimson: "#B23531", crimsonDim: "rgba(178,53,49,0.2)",
  cream: "#F5F1EB", creamHigh: "rgba(245,241,235,0.85)", creamMid: "rgba(245,241,235,0.55)",
  creamDim: "rgba(245,241,235,0.3)", creamGhost: "rgba(245,241,235,0.08)",
  border: "rgba(245,241,235,0.06)", borderMed: "rgba(245,241,235,0.1)",
  green: "#58CC02", greenDim: "rgba(88,204,2,0.15)",
  amber: "#FF9600", amberDim: "rgba(255,150,0,0.15)",
  blue: "#1CB0F6", blueDim: "rgba(28,176,246,0.15)",
  violet: "#8549BA", violetDim: "rgba(133,73,186,0.15)",
  rose: "#FF4B4B", roseDim: "rgba(255,75,75,0.15)",
  teal: "#2DCFCF", tealDim: "rgba(45,207,207,0.15)",
  diamond: "#A5D8FF", diamondDim: "rgba(165,216,255,0.15)",
};
const font = { display: "'Space Grotesk', system-ui, sans-serif", mono: "'JetBrains Mono', monospace", body: "'Source Serif 4', Georgia, serif" };

const translations = {
  en: {
    flag: "ðŸ‡ºðŸ‡¸", label: "English",
    pageTitle: "Duolingo 2025", topBadge: "Top 2% Globally",
    subtitle: "Goal Crusher. Diamond League competitor. 8 courses, 330K lifetime XP, and a 152-day streak.",
    totalXp: "Total XP (2025)", minutes: "Minutes", streak: "Streak", italianScore: "Italian Score",
    diamondLeague: "Diamond League", chessXp: "Chess XP",
    allTimeCourses: "All-Time Courses", duoQuotes: "Duo Said It Best",
    personalRecords: "All-Time Personal Records", achievements: "Awards & Achievements",
    behavioralPattern: "Behavioral Pattern", contextNote: "Context Note",
    crossPlatform: "Cross-Platform Note", showAll: "Show All",
    resetLang: "Reset to English", topTwoPercent: "Top 2% of all learners",
    daysConsecutive: "days consecutive", primaryLang: "Primary (2025)",
    weeksCompeting: "weeks competing", sideQuest: "Side quest",
    hours: "hours", maxed: "maxed", new_: "new",
  },
  es: {
    flag: "ðŸ‡ªðŸ‡¸", label: "EspaÃ±ol",
    pageTitle: "Duolingo 2025", topBadge: "Top 2% Mundial",
    subtitle: "Destructor de metas. Competidor de la Liga Diamante. 8 cursos, 330K XP de por vida, y una racha de 152 dÃ­as.",
    totalXp: "XP Total (2025)", minutes: "Minutos", streak: "Racha", italianScore: "Punt. Italiano",
    diamondLeague: "Liga Diamante", chessXp: "XP Ajedrez",
    allTimeCourses: "Cursos de Siempre", duoQuotes: "Duo Lo Dijo Mejor",
    personalRecords: "RÃ©cords Personales", achievements: "Premios y Logros",
    behavioralPattern: "PatrÃ³n Conductual", contextNote: "Nota de Contexto",
    crossPlatform: "Nota Multiplataforma", showAll: "Mostrar Todo",
    resetLang: "Restablecer a InglÃ©s", topTwoPercent: "Top 2% de todos",
    daysConsecutive: "dÃ­as consecutivos", primaryLang: "Primario (2025)",
    weeksCompeting: "semanas compitiendo", sideQuest: "MisiÃ³n secundaria",
    hours: "horas", maxed: "completado", new_: "nuevo",
  },
  ru: {
    flag: "ðŸ‡·ðŸ‡º", label: "Ð ÑƒÑÑÐºÐ¸Ð¹",
    pageTitle: "Duolingo 2025", topBadge: "Ð¢Ð¾Ð¿ 2% Ð² Ð¼Ð¸Ñ€Ðµ",
    subtitle: "ÐŸÐ¾ÐºÐ¾Ñ€Ð¸Ñ‚ÐµÐ»ÑŒ Ñ†ÐµÐ»ÐµÐ¹. Ð£Ñ‡Ð°ÑÑ‚Ð½Ð¸Ðº ÐÐ»Ð¼Ð°Ð·Ð½Ð¾Ð¹ Ð»Ð¸Ð³Ð¸. 8 ÐºÑƒÑ€ÑÐ¾Ð², 330 Ñ‚Ñ‹ÑÑÑ‡ XP Ð·Ð° Ð²ÑÑ‘ Ð²Ñ€ÐµÐ¼Ñ, ÑÐµÑ€Ð¸Ñ 152 Ð´Ð½Ñ.",
    totalXp: "Ð’ÑÐµÐ³Ð¾ XP (2025)", minutes: "ÐœÐ¸Ð½ÑƒÑ‚Ñ‹", streak: "Ð¡ÐµÑ€Ð¸Ñ", italianScore: "Ð˜Ñ‚Ð°Ð». Ð±Ð°Ð»Ð»",
    diamondLeague: "ÐÐ»Ð¼Ð°Ð·Ð½Ð°Ñ Ð»Ð¸Ð³Ð°", chessXp: "XP Ð¨Ð°Ñ…Ð¼Ð°Ñ‚Ñ‹",
    allTimeCourses: "Ð’ÑÐµ ÐºÑƒÑ€ÑÑ‹", duoQuotes: "Ð”ÑƒÐ¾ ÑÐºÐ°Ð·Ð°Ð» Ð»ÑƒÑ‡ÑˆÐµ Ð²ÑÐµÑ…",
    personalRecords: "Ð›Ð¸Ñ‡Ð½Ñ‹Ðµ Ñ€ÐµÐºÐ¾Ñ€Ð´Ñ‹", achievements: "ÐÐ°Ð³Ñ€Ð°Ð´Ñ‹ Ð¸ Ð´Ð¾ÑÑ‚Ð¸Ð¶ÐµÐ½Ð¸Ñ",
    behavioralPattern: "ÐŸÐ¾Ð²ÐµÐ´ÐµÐ½Ñ‡ÐµÑÐºÐ¸Ð¹ Ð¿Ð°Ñ‚Ñ‚ÐµÑ€Ð½", contextNote: "ÐšÐ¾Ð½Ñ‚ÐµÐºÑÑ‚",
    crossPlatform: "ÐšÑ€Ð¾ÑÑ-Ð¿Ð»Ð°Ñ‚Ñ„Ð¾Ñ€Ð¼Ð°", showAll: "ÐŸÐ¾ÐºÐ°Ð·Ð°Ñ‚ÑŒ Ð²ÑÑ‘",
    resetLang: "Ð¡Ð±Ñ€Ð¾ÑÐ¸Ñ‚ÑŒ Ð½Ð° Ð°Ð½Ð³Ð»Ð¸Ð¹ÑÐºÐ¸Ð¹", topTwoPercent: "Ð¢Ð¾Ð¿ 2% Ð²ÑÐµÑ…",
    daysConsecutive: "Ð´Ð½ÐµÐ¹ Ð¿Ð¾Ð´Ñ€ÑÐ´", primaryLang: "ÐžÑÐ½Ð¾Ð²Ð½Ð¾Ð¹ (2025)",
    weeksCompeting: "Ð½ÐµÐ´ÐµÐ»ÑŒ", sideQuest: "ÐŸÐ¾Ð±Ð¾Ñ‡Ð½Ñ‹Ð¹ ÐºÐ²ÐµÑÑ‚",
    hours: "Ñ‡Ð°ÑÐ¾Ð²", maxed: "Ð¼Ð°ÐºÑ.", new_: "Ð½Ð¾Ð².",
  },
  de: {
    flag: "ðŸ‡©ðŸ‡ª", label: "Deutsch",
    pageTitle: "Duolingo 2025", topBadge: "Top 2% Weltweit",
    subtitle: "Zielbrecher. Diamant-Liga-Teilnehmer. 8 Kurse, 330K XP insgesamt, und eine 152-Tage-Serie.",
    totalXp: "Gesamt-XP (2025)", minutes: "Minuten", streak: "Serie", italianScore: "Ital. Punkt.",
    diamondLeague: "Diamant-Liga", chessXp: "Schach-XP",
    allTimeCourses: "Alle Kurse", duoQuotes: "Duo hat es am besten gesagt",
    personalRecords: "PersÃ¶nliche Rekorde", achievements: "Auszeichnungen",
    behavioralPattern: "Verhaltensmuster", contextNote: "Kontexthinweis",
    crossPlatform: "PlattformÃ¼bergreifend", showAll: "Alle anzeigen",
    resetLang: "Auf Englisch zurÃ¼cksetzen", topTwoPercent: "Top 2% aller",
    daysConsecutive: "aufeinanderfolgende Tage", primaryLang: "PrimÃ¤r (2025)",
    weeksCompeting: "Wochen", sideQuest: "Nebenquest",
    hours: "Stunden", maxed: "max.", new_: "neu",
  },
  it: {
    flag: "ðŸ‡®ðŸ‡¹", label: "Italiano",
    pageTitle: "Duolingo 2025", topBadge: "Top 2% Globale",
    subtitle: "Distruttore di obiettivi. Competitore della Lega Diamante. 8 corsi, 330K XP totali, e una serie di 152 giorni.",
    totalXp: "XP Totale (2025)", minutes: "Minuti", streak: "Serie", italianScore: "Punt. Italiano",
    diamondLeague: "Lega Diamante", chessXp: "XP Scacchi",
    allTimeCourses: "Tutti i Corsi", duoQuotes: "Duo l'ha detto meglio",
    personalRecords: "Record Personali", achievements: "Premi e Traguardi",
    behavioralPattern: "Schema Comportamentale", contextNote: "Nota di Contesto",
    crossPlatform: "Nota Cross-Platform", showAll: "Mostra Tutto",
    resetLang: "Ripristina in inglese", topTwoPercent: "Top 2% di tutti",
    daysConsecutive: "giorni consecutivi", primaryLang: "Primario (2025)",
    weeksCompeting: "settimane", sideQuest: "Missione secondaria",
    hours: "ore", maxed: "max.", new_: "nuovo",
  },
  da: {
    flag: "ðŸ‡©ðŸ‡°", label: "Dansk",
    pageTitle: "Duolingo 2025", topBadge: "Top 2% Globalt",
    subtitle: "MÃ¥lknuser. Diamantliga-deltager. 8 kurser, 330K XP i alt, og en 152-dages stime.",
    totalXp: "Samlet XP (2025)", minutes: "Minutter", streak: "Stime", italianScore: "Ital. Score",
    diamondLeague: "Diamantliga", chessXp: "Skak-XP",
    allTimeCourses: "Alle Kurser", duoQuotes: "Duo sagde det bedst",
    personalRecords: "Personlige Rekorder", achievements: "PrÃ¦mier og PrÃ¦stationer",
    behavioralPattern: "AdfÃ¦rdsmÃ¸nster", contextNote: "Kontekstnote",
    crossPlatform: "TvÃ¦rplatform Note", showAll: "Vis Alle",
    resetLang: "Nulstil til engelsk", topTwoPercent: "Top 2% af alle",
    daysConsecutive: "dage i trÃ¦k", primaryLang: "PrimÃ¦r (2025)",
    weeksCompeting: "uger", sideQuest: "Sidequest",
    hours: "timer", maxed: "maks.", new_: "ny",
  },
};

const courses = [
  { name: "Spanish", flag: "ðŸ‡ªðŸ‡¸", xp: 113801, lang: "es", color: "#FF4B4B" },
  { name: "Russian", flag: "ðŸ‡·ðŸ‡º", xp: 113600, lang: "ru", color: "#1CB0F6" },
  { name: "German", flag: "ðŸ‡©ðŸ‡ª", xp: 41294, lang: "de", color: "#FF9600" },
  { name: "Italian", flag: "ðŸ‡®ðŸ‡¹", xp: 34724, lang: "it", color: "#58CC02" },
  { name: "English", flag: "ðŸ‡ºðŸ‡¸", xp: 17850, lang: "en", color: "#1CB0F6" },
  { name: "Danish", flag: "ðŸ‡©ðŸ‡°", xp: 7430, lang: "da", color: "#FF4B4B" },
  { name: "Chess", flag: "â™Ÿï¸", xp: 1134, lang: null, color: C.teal },
  { name: "Math", flag: "ðŸ§®", xp: 262, lang: null, color: C.blue },
];
const totalLifetimeXp = courses.reduce((a, c) => a + c.xp, 0);
const maxCourseXp = courses[0].xp;

const achievements = [
  { name: "Quest Explorer", value: "750", progress: "10/10", isNew: true, color: C.amber },
  { name: "Cheerleader", value: "100", progress: "5/5", isNew: true, color: C.violet },
  { name: "Flawless Finisher", value: "100", progress: "5/5", isNew: false, color: C.amber },
  { name: "Legend", value: "250", progress: "10/10", isNew: false, color: C.blue },
  { name: "Sleepwalker", value: "200", progress: "10/10", isNew: false, color: C.violet },
  { name: "XP Olympian", value: "30K", progress: "10/10", isNew: false, color: C.amber },
  { name: "Mistake Mechanic", value: "1K", progress: "10/10", isNew: true, color: C.amber },
  { name: "Perfect Week", value: "10", progress: "4/9", isNew: true, color: C.rose },
  { name: "Early Riser", value: "200", progress: "10/10", isNew: true, color: C.amber },
  { name: "League MVP", value: null, progress: null, isNew: false, color: C.green },
  { name: "Speed Racer", value: "5K", progress: "5/5", isNew: false, color: C.rose },
  { name: "Social Butterfly", value: null, progress: null, isNew: false, color: C.rose },
  { name: "Rarest Diamond", value: null, progress: null, isNew: false, color: C.diamond },
];

const records = [
  { label: "Longest Streak", value: "296", unit: "days", date: "Mar 31, 2024", color: C.amber },
  { label: "Highest League", value: "#1", unit: "Diamond", date: "Dec 11, 2023", color: C.diamond },
  { label: "Most XP", value: "14,648", unit: "in one day", date: "Apr 30, 2023", color: C.amber, manic: true },
  { label: "Perfect Lessons", value: "156", unit: "in one day", date: "Apr 30, 2023", color: C.green, manic: true },
];

const duoQuotes = [
  { text: "Now I'm intimidated by YOU", context: "Diamond League â€” 8 weeks", color: C.blue },
  { text: "Whew, that streak won't quit", context: "152-day streak", color: C.amber },
  { text: "It takes time to get this good", context: "1,673 minutes", color: C.violet },
  { text: "You put in the work, and it shows", context: "55,775 XP", color: C.amber },
  { text: "A grandmaster in the making!", context: "1,134 Chess XP", color: C.teal },
  { text: "What CAN'T you do?", context: "8 courses", color: C.blue },
];

export default function DuolingoRecap() {
  const [lang, setLang] = useState("en");
  const [showAllAch, setShowAllAch] = useState(false);
  const t = translations[lang] || translations.en;
  const maxedCount = achievements.filter(a => a.progress && !a.progress.includes("/9")).length;
  const newCount = achievements.filter(a => a.isNew).length;
  const displayAch = showAllAch ? achievements : achievements.slice(0, 9);

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap');
@keyframes pulse{0%,100%{opacity:0.6}50%{opacity:1}}`}</style>

      {/* Hero */}
      <div style={{ padding: "40px 24px 32px", background: `linear-gradient(180deg, ${C.green}15 0%, transparent 70%)`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.green, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 10 }}>DDL Â· CONSOLE Â· YEAR-END RECAPS</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 6, flexWrap: "wrap" }}>
            <h1 style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700, color: C.cream, lineHeight: 1.15 }}>{t.pageTitle}</h1>
            <span style={{ fontFamily: font.mono, fontSize: 9, padding: "3px 10px", borderRadius: 12, background: C.green + "20", color: C.green, border: `1px solid ${C.green}40` }}>{t.topBadge}</span>
            {lang !== "en" && (
              <button onClick={() => setLang("en")} style={{ padding: "3px 10px", borderRadius: 12, border: `1px solid ${C.borderMed}`, background: C.card, fontFamily: font.mono, fontSize: 9, color: C.creamMid, cursor: "pointer", marginLeft: "auto" }}>ðŸ‡ºðŸ‡¸ {t.resetLang}</button>
            )}
          </div>
          <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.6, fontStyle: "italic", maxWidth: 640 }}>{t.subtitle}</p>
        </div>
      </div>

      <div style={{ maxWidth: 920, margin: "0 auto", padding: "24px 24px 48px" }}>

        {/* KPIs */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { label: t.totalXp, value: "55,775", color: C.amber, sub: t.topTwoPercent },
            { label: t.minutes, value: "1,673", color: C.violet, sub: `â‰ˆ 27.9 ${t.hours}` },
            { label: t.streak, value: "152", color: C.amber, sub: t.daysConsecutive },
            { label: t.italianScore, value: "13", color: C.green, sub: t.primaryLang },
            { label: t.diamondLeague, value: "8", color: C.blue, sub: t.weeksCompeting },
            { label: t.chessXp, value: "1,134", color: C.teal, sub: t.sideQuest },
          ].map(k => (
            <div key={k.label} style={{ flex: "1 1 120px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "16px 14px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: k.color, opacity: 0.6 }} />
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{k.label}</div>
              <div style={{ fontFamily: font.mono, fontSize: 24, fontWeight: 700, color: C.cream }}>{k.value}</div>
              <div style={{ fontFamily: font.body, fontSize: 9, color: C.creamDim, fontStyle: "italic", marginTop: 2 }}>{k.sub}</div>
            </div>
          ))}
        </div>

        {/* â•â•â• All-Time Courses â€” THE SWITCHER â•â•â• */}
        <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase" }}>{t.allTimeCourses}</div>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.green }}>{totalLifetimeXp.toLocaleString()} XP</div>
          <div style={{ flex: 1, height: 1, background: C.border }} />
          {lang !== "en" && <span style={{ fontFamily: font.mono, fontSize: 8, color: C.green, animation: "pulse 2s infinite" }}>â— {translations[lang]?.label}</span>}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {courses.map((c, i) => {
            const pct = (c.xp / maxCourseXp) * 100;
            const isClickable = c.lang && translations[c.lang];
            const isActive = c.lang === lang;
            return (
              <div key={c.name} onClick={() => isClickable && setLang(c.lang)} style={{
                background: isActive ? c.color + "12" : C.card,
                border: `1px solid ${isActive ? c.color + "40" : C.border}`,
                borderRadius: 7, padding: "12px 16px",
                cursor: isClickable ? "pointer" : "default",
                transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <span style={{ fontSize: 20, width: 28, textAlign: "center", flexShrink: 0 }}>{c.flag}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontFamily: font.display, fontSize: 14, fontWeight: 600, color: C.cream }}>{c.name}</span>
                    {isClickable && (
                      <span style={{ fontFamily: font.mono, fontSize: 7, padding: "1px 5px", borderRadius: 3, background: isActive ? c.color + "30" : C.creamGhost, color: isActive ? c.color : C.creamDim }}>
                        {isActive ? "â— ACTIVE" : "click to translate"}
                      </span>
                    )}
                    {i === 0 && <span style={{ fontFamily: font.mono, fontSize: 7, padding: "1px 5px", borderRadius: 3, background: C.amberDim, color: C.amber }}>#1</span>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1, height: 6, background: C.creamGhost, borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: c.color, borderRadius: 3, transition: "width 0.5s ease" }} />
                    </div>
                    <span style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 600, color: c.color, flexShrink: 0, width: 85, textAlign: "right" }}>{c.xp.toLocaleString()} XP</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 10, padding: "10px 14px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 7 }}>
          <div style={{ fontFamily: font.mono, fontSize: 8, color: C.amber, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Near-Perfect Parity</div>
          <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>
            Spanish (113,801) and Russian (113,600) are separated by 201 XP â€” a 0.18% difference. Two entirely different alphabets, two entirely different language families, studied to virtually identical depth.
          </div>
        </div>

        {/* Duo Quotes */}
        <div style={{ marginTop: 28, fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>{t.duoQuotes}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
          {duoQuotes.map((q, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 7, padding: "14px", borderLeft: `3px solid ${q.color}` }}>
              <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamHigh, fontStyle: "italic", lineHeight: 1.5, marginBottom: 6 }}>"{q.text}"</div>
              <div style={{ fontFamily: font.mono, fontSize: 8, color: q.color }}>{q.context}</div>
            </div>
          ))}
        </div>

        {/* Personal Records */}
        <div style={{ marginTop: 28, fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>{t.personalRecords}</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {records.map(r => (
            <div key={r.label} style={{ flex: "1 1 160px", background: C.card, border: `1px solid ${r.manic ? C.amber + "15" : r.color + "20"}`, borderRadius: 7, padding: "16px", position: "relative", overflow: "hidden", opacity: r.manic ? 0.7 : 1 }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: r.color, opacity: 0.4 }} />
              {r.manic && <div style={{ fontFamily: font.mono, fontSize: 7, padding: "1px 5px", borderRadius: 2, background: C.amberDim, color: C.amber, display: "inline-block", marginBottom: 4 }}>MANIC EPISODE â€” ONE DAY</div>}
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{r.label}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontFamily: font.mono, fontSize: 28, fontWeight: 700, color: r.color }}>{r.value}</span>
                <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>{r.unit}</span>
              </div>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginTop: 4 }}>{r.date}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 10, padding: "12px 16px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 7 }}>
          <div style={{ fontFamily: font.mono, fontSize: 8, color: C.amber, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{t.contextNote}</div>
          <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>
            The April 30, 2023 records â€” 14,648 XP and 156 perfect lessons â€” were logged in a single day during a manic episode. They are data, not benchmarks. The 2025 numbers (55,775 XP across the year, 152-day streak, top 2% globally) are what sustained, regulated engagement looks like. Less explosive, more durable. That's the real achievement.
          </div>
        </div>

        {/* Achievements */}
        <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.12em", textTransform: "uppercase" }}>{t.achievements}</div>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ fontFamily: font.mono, fontSize: 8, padding: "1px 6px", borderRadius: 3, background: C.greenDim, color: C.green }}>{maxedCount} {t.maxed}</span>
            <span style={{ fontFamily: font.mono, fontSize: 8, padding: "1px 6px", borderRadius: 3, background: C.roseDim, color: C.rose }}>{newCount} {t.new_}</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8 }}>
          {displayAch.map(a => (
            <div key={a.name} style={{ background: C.card, border: `1px solid ${a.isNew ? a.color + "30" : C.border}`, borderRadius: 7, padding: "12px", position: "relative", overflow: "hidden" }}>
              {a.isNew && <div style={{ position: "absolute", top: 6, right: 6, fontFamily: font.mono, fontSize: 7, padding: "1px 4px", borderRadius: 2, background: C.roseDim, color: C.rose }}>{t.new_.toUpperCase()}</div>}
              <div style={{ fontFamily: font.display, fontSize: 11, fontWeight: 600, color: C.cream, marginBottom: 4 }}>{a.name}</div>
              {a.value && <div style={{ fontFamily: font.mono, fontSize: 16, fontWeight: 700, color: a.color, marginBottom: 2 }}>{a.value}</div>}
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.green }}>{a.progress || "Earned"} âœ“</div>
            </div>
          ))}
        </div>
        {!showAllAch && achievements.length > 9 && (
          <button onClick={() => setShowAllAch(true)} style={{ marginTop: 8, padding: "6px 16px", background: C.card, border: `1px solid ${C.borderMed}`, borderRadius: 5, cursor: "pointer", fontFamily: font.mono, fontSize: 10, color: C.creamMid }}>{t.showAll} {achievements.length}</button>
        )}

        {/* Behavioral Insight */}
        <div style={{ marginTop: 28, padding: "18px 20px", background: C.green + "08", border: `1px solid ${C.green}25`, borderRadius: 9, borderLeft: `3px solid ${C.green}` }}>
          <div style={{ fontFamily: font.mono, fontSize: 8, color: C.green, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>{t.behavioralPattern}</div>
          <div style={{ fontFamily: font.body, fontSize: 14, color: C.creamHigh, lineHeight: 1.7, marginBottom: 10 }}>
            Eight courses across six languages, chess, and math â€” but the real signal is the near-perfect parity between Spanish and Russian. 113,801 vs 113,600. Two completely different writing systems studied to identical depth. That's not dabbling. That's a controlled experiment with a sample size of one.
          </div>
          <div style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.7 }}>
            Italian is the 2025 focus (primary language, Score 13), but it's fourth all-time behind Spanish, Russian, and German. The pattern: intense early investment across multiple fronts, then narrowing to one sustained practice. The same cycle that produced 44 DDL systems â€” broad exploration, then governed specialization. Chaos â†’ Structured â†’ Automated, applied to language acquisition.
          </div>
        </div>

        {/* Cross-Platform */}
        <div style={{ marginTop: 16, padding: "14px 18px", borderLeft: `3px solid ${C.amber}`, background: C.amber + "06", borderRadius: "0 7px 7px 0" }}>
          <div style={{ fontFamily: font.mono, fontSize: 8, color: C.amber, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{t.crossPlatform}</div>
          <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>
            Platform six in the 2025 Signal Report. PlayStation (1,009 hrs), Xbox/Steam, YouTube (1,001 channels), Apple Music (23,013 min), and now Duolingo (330K lifetime XP across 8 courses). The same person across six data streams: deep commitment, systematic progression, and zero interest in doing things halfway.
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 48 }}>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${C.green}, ${C.amber}, ${C.blue}, ${C.violet}, ${C.teal})`, borderRadius: 1, marginBottom: 14 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em" }}>Dropdown Logistics Â· Cottage â€” Humble surface. Cathedral underneath.</div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>dropdownlogistics.com Â· 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
}

