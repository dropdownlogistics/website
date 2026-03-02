import { useState } from "react";

const C = {
  navy: "#0D1B2A", card: "#10202f", crimson: "#B23531", crimsonDim: "rgba(178,53,49,0.2)",
  crimsonFaint: "rgba(178,53,49,0.08)", cream: "#F5F1EB", creamHigh: "rgba(245,241,235,0.85)",
  creamMid: "rgba(245,241,235,0.55)", creamDim: "rgba(245,241,235,0.3)",
  creamGhost: "rgba(245,241,235,0.08)", border: "rgba(245,241,235,0.06)",
  green: "#4A9E6B", greenDim: "rgba(74,158,107,0.15)", amber: "#C49A3C", amberDim: "rgba(196,154,60,0.15)",
  blue: "#6B9DC2", blueDim: "rgba(107,157,194,0.15)", violet: "#8a6cc9", violetDim: "rgba(138,108,201,0.15)",
  rose: "#c94a6e", roseDim: "rgba(201,74,110,0.15)", ember: "#c98a4a", emberDim: "rgba(201,138,74,0.15)",
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

function Tag({ label, color = C.blue }) {
  return (<span style={{ fontFamily: font.mono, fontSize: 9, padding: "3px 8px", borderRadius: 3, background: color + "18", color, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{label}</span>);
}

function PullQuote({ children, color = C.crimson }) {
  return (
    <div style={{ borderLeft: `3px solid ${color}`, padding: "14px 20px", background: color + "10", borderRadius: "0 6px 6px 0", margin: "24px 0" }}>
      <p style={{ fontFamily: font.body, fontSize: 15, fontStyle: "italic", color: C.creamHigh, lineHeight: 1.7, margin: 0 }}>{children}</p>
    </div>
  );
}

function MeasurementBridge({ label, connections, color }) {
  return (
    <div style={{ padding: "14px 18px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, margin: "20px 0" }}>
      <div style={{ fontFamily: font.mono, fontSize: 9, color, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
      {connections.map((c, i) => (
        <div key={i} style={{ padding: "8px 0", borderBottom: i < connections.length - 1 ? `1px solid ${C.border}` : "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3, flexWrap: "wrap", gap: 4 }}>
            <span style={{ fontFamily: font.mono, fontSize: 10, fontWeight: 600, color: c.color }}>{c.instrument}</span>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: c.color }}>{c.score}</span>
          </div>
          <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamMid, lineHeight: 1.6 }}>{c.bridge}</div>
        </div>
      ))}
    </div>
  );
}

function SessionCard({ date, number, title, color, moodReport, medChanges, keyMoments, measurements, children }) {
  return (
    <div style={{ marginBottom: 64, position: "relative" }}>
      {/* Giant numeral */}
      <div style={{ fontFamily: font.mono, fontSize: 80, fontWeight: 700, color: color + "10", lineHeight: 0.85, marginBottom: -16, userSelect: "none" }}>
        {String(number).padStart(2, "0")}
      </div>

      <div style={{ position: "relative", zIndex: 1, paddingLeft: 4 }}>
        {/* Date + session label */}
        <div style={{ fontFamily: font.mono, fontSize: 11, color, letterSpacing: "0.08em", marginBottom: 6 }}>
          {date} · Session {number} of 4
        </div>

        <h2 style={{ fontFamily: font.body, fontSize: 24, fontWeight: 400, fontStyle: "italic", color: C.cream, margin: "0 0 14px 0", lineHeight: 1.3 }}>
          {title}
        </h2>

        <div style={{ height: 2, width: 40, background: color, opacity: 0.4, marginBottom: 16 }} />

        {/* Status row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 14px", flex: "1 1 200px" }}>
            <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>Mood Report</div>
            <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamHigh }}>{moodReport}</div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 14px", flex: "1 1 200px" }}>
            <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>Med Changes</div>
            <div style={{ fontFamily: font.mono, fontSize: 11, color: C.creamMid }}>{medChanges}</div>
          </div>
        </div>

        {/* Key moments */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16 }}>
          {keyMoments.map(m => <Tag key={m} label={m} color={color} />)}
        </div>

        {/* Narrative */}
        <div style={{ maxWidth: 680, fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8 }}>
          {children}
        </div>

        {/* Measurement bridges */}
        <MeasurementBridge
          label="What the Instruments Already Knew"
          connections={measurements}
          color={color}
        />
      </div>
    </div>
  );
}

function Transition({ children }) {
  return (
    <div style={{ textAlign: "center", padding: "12px 0 24px", fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.15em" }}>
      <div style={{ width: 1, height: 24, background: C.creamDim, opacity: 0.2, margin: "0 auto 10px" }} />
      {children}
      <div style={{ width: 1, height: 24, background: C.creamDim, opacity: 0.2, margin: "10px auto 0" }} />
    </div>
  );
}

export default function LambertArc() {
  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream, fontFamily: font.body }}>
      <div style={{ position: "fixed", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "200px" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 740, margin: "0 auto", padding: "48px 24px 64px" }}>
        {/* Header */}
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.rose, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 6 }}>
          🔒 PRIVATE · NOT FOR PUBLICATION
        </div>
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 32 }}>
          DDL · CHRONICLE · The Lambert Arc
        </div>

        <div style={{ fontFamily: font.mono, fontSize: 12, color: C.crimson, letterSpacing: "0.1em", marginBottom: 8 }}>
          September 2025 – February 2026
        </div>

        <h1 style={{ fontFamily: font.body, fontSize: 38, fontWeight: 400, fontStyle: "italic", color: C.cream, margin: "0 0 8px 0", lineHeight: 1.15 }}>
          The Lambert Arc
        </h1>
        <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.6, margin: "0 0 4px 0" }}>
          Four psychiatric sessions. Six months. Crisis to actualization. 
          Every development the psychiatrist observed was already predicted 
          by instruments administered before the arc began.
        </p>
        <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>
          Cross-ref: <span style={{ color: C.violet }}>DOSSIER</span> · <span style={{ color: C.amber }}>Dimensional Map</span> · <span style={{ color: C.rose }}>The Convergence (Bryce)</span>
        </div>

        <div style={{ height: 2, width: 48, background: C.crimson, marginTop: 12, marginBottom: 40, opacity: 0.5 }} />

        {/* Prologue */}
        <div style={{ maxWidth: 680, fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8, marginBottom: 48 }}>
          <p style={{ margin: "0 0 16px 0" }}>
            Dr. Lambert is a psychiatrist. He manages medication, monitors mood, checks labs, 
            and asks the standard questions: sleep, appetite, concentration, energy. 
            He does not have the psychometric data. He hasn't seen the PSAT scores, 
            the Strong Interest Inventory, the neurofeedback baseline, or the Sensory Profile. 
            He has the clinical evaluation from 2023 and his own observations over time.
          </p>
          <p style={{ margin: 0 }}>
            Every clinical observation he makes across these four sessions 
            maps to an instrument he hasn't read. 
            The arc he's watching unfold was already documented. 
            He just didn't have the file.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* SESSION 1 */}
        {/* ═══════════════════════════════════════════════ */}
        <SessionCard
          date="September 16, 2025" number={1} title="The Michele Session" color={C.rose}
          moodReport="Anxious. Not crisis-level, but persistent workplace anxiety dominant."
          medChanges="Lamotrigine restart (had lapsed). Lithium unchanged. Considering guanfacine increase."
          keyMoments={["MICHELE TRIGGER", "DISCLOSURE DECISION", "ACCOMMODATIONS", "GOALPOST-MOVING", "FORGETFULNESS", "WORK ANXIETY"]}
          measurements={[
            { instrument: "MCMI-IV — Avoidant Pattern", score: "BR 82", color: C.rose,
              bridge: "The entire session is the Avoidant pattern in real-time. Wants connection and competence at work. Encounters someone who provides neither safety nor consistency. The approach-withdrawal cycle is visible in the transcript: 'I can work for her, I just need some grace' — approach. 'I told her things that are difficult and it didn't work' — withdrawal. Disclosure is the systemized version of seeking safety." },
            { instrument: "MCMI-IV — Compulsive Pattern", score: "BR 69", color: C.rose,
              bridge: "Michele 'moves the goalposts.' For a Compulsive personality approaching threshold, goalpost-moving is a governance violation — the rules changed after the work was done. The activation isn't about the work being wrong. It's about the standard being unstable. Lambert notes: 'There is no medicine on Earth that's going to take away all the anxiety you're describing in this particular work situation. What's going to be the most helpful is if you didn't have to work with this person.' He's right." },
            { instrument: "Brown EF/A — Focus + Memory", score: "Focus T=74 · Memory T=70", color: C.crimson,
              bridge: "'I just forget things often. Not often, constantly.' Stated matter-of-factly to a psychiatrist who manages the medication but doesn't have the Brown EF/A scores. Focus at the 98th percentile for dysfunction. Memory at the 95th. The forgetfulness isn't a complaint. It's a clinical measurement presenting as a work problem." },
            { instrument: "Sensory Profile — Sensation Avoiding", score: "50/75 · Much More", color: C.crimson,
              bridge: "Michele's micromanagement is a Sensation Avoiding trigger — unpredictable input from an uncontrolled source. 'She was even worse when I was at home because she couldn't see me, so she had to keep bugging me.' The remote work environment should reduce stimulation. Michele's behavior overrides the environmental accommodation." },
          ]}
        >
          <p style={{ margin: "0 0 16px 0" }}>
            The session opens with a crisis that isn't a crisis. Dave is functional, employed, 
            medicated, stable. But a project manager named Michele is making work unbearable — 
            not through overt hostility but through goalpost-moving, micromanagement, 
            and a communication style that specifically activates every pattern in the MCMI-IV profile.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            Lambert asks the right question: what specific accommodations would help? 
            And Dave gives the honest answer: he doesn't know. Because the real accommodation 
            isn't about deadlines or workload. It's about not working with someone 
            whose operating style violates the Conventional governance architecture 
            and the Avoidant safety requirements simultaneously.
          </p>
          <p style={{ margin: 0 }}>
            She gave him a 1 out of 3 on his work product evaluation. 
            The man who would solve his director's six-year problem in three days 
            received the lowest possible score from a project manager 
            whose goalposts moved after the work was done. 
            Lambert doesn't know that yet. The next session is when the Assurance Map happens.
          </p>
        </SessionCard>

        <Transition>87 DAYS LATER</Transition>

        {/* ═══════════════════════════════════════════════ */}
        {/* SESSION 2 */}
        {/* ═══════════════════════════════════════════════ */}
        <SessionCard
          date="December 12, 2025" number={2} title="The Flow State" color={C.amber}
          moodReport="Very good. Elevated but grounded. Self-monitoring for mania."
          medChanges="Lithium reduction to 300mg (creatinine rising). Switch to immediate release."
          keyMoments={["ASSURANCE MAP", "6-YEAR PROBLEM / 3 DAYS", "FLOW STATE VS MANIA", "CAE PRESENTATION", "CREATININE RISING", "LITHIUM REDUCTION"]}
          measurements={[
            { instrument: "qEEG — Occipital Alpha / Over-arousal", score: "Elevated Alpha · Excessive High Beta", color: C.ember,
              bridge: "'It was like 9 AM and before I know it was 2 PM and then 8 PM and it didn't feel like any time had passed.' Lambert's differential: mania would scatter focus across 25 projects. This was sustained, single-task, productive focus. The qEEG explains the mechanism — the over-aroused brain, when fed a task that engages the Occipital Alpha pattern-recognition pathway, doesn't need to scatter. The arousal is consumed by the task. Hyperfocus isn't mania. It's an over-aroused pattern-recognition system that found the right substrate." },
            { instrument: "Strong Interest Inventory — Computer Activities", score: "Very High · Highest BIS", color: C.amber,
              bridge: "The Assurance Map is a data visualization and analytics project. Computer Activities was the single highest basic interest scale on the entire Strong. The flow state isn't anomalous. It's the predicted engagement level when the Conventional/Computer Activities profile encounters exactly the work it was designed for." },
            { instrument: "Brown EF/A — Activation", score: "T=70 · 95th %ile dysfunction", color: C.crimson,
              bridge: "Lambert asks: 'Can you concentrate when you want to?' Answer: 'More than I've ever been able to.' Activation deficit at the 95th percentile — meaning the executive function system struggles to initiate. But when the task provides its own activation energy (intrinsic motivation + novelty + pattern recognition), the deficit is bypassed. The Assurance Map activated itself." },
            { instrument: "PSAT Junior → GMAT (The Crossover)", score: "Math 92nd → 44th", color: C.blue,
              bridge: "Dave describes Lambert's reaction: 'How often do you turn around a project in a week that your director couldn't do after six years?' Lambert recognizes exceptional output. The measurement arc explains why it was dormant: math aptitude at the 92nd percentile was redirected by declining interest into business/accounting, where it was underutilized for 13 years. The Assurance Map is the aptitude finding its correct application — seventeen years late." },
          ]}
        >
          <p style={{ margin: "0 0 16px 0" }}>
            Three months after the Michele session. The tone has shifted entirely. 
            Dave walks into the appointment having just solved a problem his director 
            had been unable to solve for six years. In a weekend. In a flow state 
            so deep that nine hours passed without registering.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            Lambert's clinical job here is to determine whether this is mania. 
            He concludes it's not — and his reasoning is precise: mania would scatter, 
            not focus. Manic energy starts 25 projects. This energy completed one. 
            He asks: "Can this really be happening?" And then answers himself: 
            "Of course it's happening."
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            But the session also surfaces a medical concern. Creatinine is rising — 
            kidney function declining — despite lowering the lithium dose. 
            Lambert expected the opposite. The lithium goes down to 300mg. 
            The conversation about stopping lithium altogether begins.
          </p>
          <p style={{ margin: 0 }}>
            Dave self-monitors: "It reminds me of when people told me I was manic 
            when all this happened. The similarities in terms of career progression, 
            it feels eerily similar. But in terms of how I'm handling it, 
            it's completely different." Lambert agrees. 
            The Compulsive self-audit is running in real time, 
            and this time the audit is accurate: this isn't mania. This is competence.
          </p>
        </SessionCard>

        <Transition>35 DAYS LATER</Transition>

        {/* ═══════════════════════════════════════════════ */}
        {/* SESSION 3 */}
        {/* ═══════════════════════════════════════════════ */}
        <SessionCard
          date="January 16, 2026" number={3} title="The Diagnosis That Explained the Diagnosis" color={C.green}
          moodReport="Very good. Anxiety manageable — using CBT skills to confront and evaluate."
          medChanges="No psychiatric changes. Metformin + Ozempic started (Type 2 Diabetes, A1C 8.9). CPAP incoming."
          keyMoments={["TYPE 2 DIABETES", "A1C 8.9", "KIDNEY = DIABETES NOT LITHIUM", "EMILY CONFIRMS IMPROVEMENT", "CBT SKILLS ACTIVE", "BUILDING FOR FUN"]}
          measurements={[
            { instrument: "Vineland — Coping Skills", score: "v=17 · Strength", color: C.green,
              bridge: "'I confront those anxieties and decide if this is actually something I need to care about.' Lambert names it: 'That's called cognitive behavioral therapy.' The Vineland measured Coping Skills as an elevated strength two years before Dave described the coping skill to his psychiatrist. The instrument predicted the competency before the therapy taught the technique." },
            { instrument: "Vineland — Daily Living Skills", score: "83 · 13th %ile · Weakness", color: C.green,
              bridge: "Type 2 Diabetes with an A1C of 8.9 — diagnosed after months of unmonitored glucose. 'He hadn't seen me in like 6 months.' Daily Living Skills at the 13th percentile, with Personal self-sufficiency at the 2nd. The Vineland predicted that medical self-maintenance would be the most likely deficit domain. A1C of 8.9 is the deficit in clinical terms." },
            { instrument: "Strong — Computer Activities", score: "Very High", color: C.amber,
              bridge: "'I've been working on some personal projects, trying to get maybe a side job going of building spreadsheets and things like that for people. And that is fun for me.' Lambert: 'The things you've been doing for fun.' The Strong's highest basic interest scale — Computer Activities: Very High — is now literally describing Dave's recreational activity. The interest inventory from age 18 predicted the hobby at age 39." },
            { instrument: "Psych Eval — Bipolar II + Lithium Management", score: "F31.81 · Low-dose stability", color: C.rose,
              bridge: "Lambert's clinical reasoning: kidney function declined despite lowering lithium. The most likely cause is uncontrolled diabetes, not lithium toxicity. 'I suspect it's more likely to be uncontrolled blood sugar levels.' The Bipolar II management remains stable at the lower lithium dose — meaning the mood stabilization is holding even with reduced medication. Lambert: 'Things are still pretty good at a lower dose. I would argue, let's keep any potential risk factor at a minimum.'" },
          ]}
        >
          <p style={{ margin: "0 0 16px 0" }}>
            Emily joins the session. Her observation covers the entire arc: 
            "Especially since September, October, I've noticed really great things in him, 
            just he's more game than I've seen him in the last three years or so."
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            The big medical news: Type 2 Diabetes, A1C at 8.9. 
            Lambert immediately connects it to the kidney mystery — 
            the creatinine that kept rising despite lowering lithium 
            was likely caused by uncontrolled blood sugar, not the medication. 
            A medical question that had driven a potentially dangerous lithium reduction 
            gets a new explanation from a different system entirely.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            Lambert sees a possibility: "When your blood sugar gets better controlled, 
            your mental health might feel even better. Sleep might improve too. 
            We might find that we're actually talking about trying to take medicine away."
          </p>

          <PullQuote color={C.green}>
            Dave: "I remember when I first started, one of my friends with bipolar 
            said something about finally knowing what it felt like to be normal. 
            And at that time I couldn't really comprehend what that meant 
            because I was better than I was, but it was like my baseline. 
            But now I can just go to work and work without stressing 
            about how much I have to do and getting into this loop. 
            Life is just easier than it ever has been."
          </PullQuote>
        </SessionCard>

        <Transition>42 DAYS LATER</Transition>

        {/* ═══════════════════════════════════════════════ */}
        {/* SESSION 4 */}
        {/* ═══════════════════════════════════════════════ */}
        <SessionCard
          date="February 27, 2026" number={4} title="The Actualization" color={C.amber}
          moodReport="Very good. Anxiety lowest it's ever been. Sleep normalized."
          medChanges="No changes. All medications stable. 20 lbs lost since mid-December."
          keyMoments={["NEW POSITION", "COMMISSION ANALYST II", "MARCH 9 START", "MICHELE GONE", "ANXIETY LOWEST EVER", "BILLABLE HOURS GONE", "BROTHER RELAPSE", "ACCOUNTABILITY", "RECURSIVE THINKING AWARENESS", "FLOW STATE = JOB"]}
          measurements={[
            { instrument: "Strong Interest Inventory — CES + Computer Activities", score: "C=75 · Comp: Very High", color: C.amber,
              bridge: "'A friend approached me about an internal position in data analytics... they want me to just come in and build stuff.' The Strong's prediction, twenty-one years later, is now his job description. Not Accountant — that was the #1 match, and he's been doing it for 13 years. Data analytics is Computer Activities: Very High meets Conventional: 75 in a role that builds systems. DDL's methodology is now his paycheck." },
            { instrument: "Brown EF/A — Activation", score: "T=70 · 95th %ile", color: C.crimson,
              bridge: "'This job is doing what I do on the weekend for fun and I don't experience time the same. When I look up it's 5 hours later.' Lambert: 'That's the conventional wisdom — get a job doing what you love to do.' The Activation deficit (95th %ile dysfunction) is bypassed when the work provides intrinsic activation. The deficit is real. The compensation is environmental: match the task to the brain instead of forcing the brain to match the task." },
            { instrument: "Sensory Profile — Sensation Avoiding", score: "50/75 · Much More", color: C.crimson,
              bridge: "'This weight has been lifted... she's no longer in the picture. I'm going to a whole different team, a different floor, everything.' The Sensation Avoiding profile doesn't just need less stimulation. It needs predictable stimulation from controllable sources. Michele was an uncontrollable source of unpredictable input. Removing her didn't just remove a coworker — it removed the primary Sensation Avoiding trigger from the entire work environment." },
            { instrument: "Vineland — Coping Skills + Community", score: "v=17 · Both Strengths", color: C.green,
              bridge: "Brother relapsed. Family pushback. Dave's response: 'I'm sorry I snapped, but I don't apologize for calling out the behavior or telling you to go to rehab.' Lambert: 'That's a real fundamental lesson. Acknowledge you made a mistake.' The Coping Skills strength and the Community functioning strength are both visible in real-time — he handled a family crisis with accountability, maintained the relationship, and didn't spiral. The Vineland measured this capacity two years ago." },
            { instrument: "qEEG — Over-arousal + Pattern Recognition", score: "Excessive High Beta · High Alpha", color: C.ember,
              bridge: "'I've started to understand what recursive thinking is and kind of how that plays into how I operate. I'm having quick thoughts, but it's more like I'm observing those thoughts. It's not out of control.' Lambert: 'That's one of the roles of therapy — recognize those patterns of thinking and step away and be an observer.' The over-aroused brain produces recursive thoughts. The pattern-recognition system can observe the recursion. The observation is the system auditing itself. Lambert is watching the qEEG profile learn to govern itself in real-time." },
          ]}
        >
          <p style={{ margin: "0 0 16px 0" }}>
            Six months after the Michele session. Different team. Different floor. 
            Different role. A position that didn't exist when the arc began, 
            created because the Assurance Map demonstrated capabilities 
            the organization didn't know it had.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            Lambert asks about concentration: "When I look up, it's 5 hours later." 
            About anxiety: "As low as it's been." About the billable hours 
            that produced 13 years of performance anxiety: "That's gone."
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            The brother relapse is the session's emotional weight. 
            Dave responded with anger, then accountability, then boundary-setting. 
            His aunt's response — "When do you see your counselor next?" — 
            lands as dismissal, not support. Lambert validates: 
            "You're not the fundamental problem here." 
            The Avoidant pattern detects the deflection. 
            The Compulsive pattern insists on naming the real issue. 
            The Coping Skills strength holds the response together.
          </p>
          <p style={{ margin: 0 }}>
            Lambert's closing: "Congratulations on your new position." 
            Dave: "It's crazy how far it's come since we first started seeing each other." 
            Lambert: "Life seems to work like that."
          </p>
        </SessionCard>

        {/* ═══════════════════════════════════════════════ */}
        {/* THE ARC SUMMARY */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ marginTop: 16 }}>
          <div style={{ height: 1, background: C.crimson, opacity: 0.2, marginBottom: 40 }} />

          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            The Six-Month Arc
          </div>

          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px" }}>
            {[
              { date: "Sept '25", item: "Michele crisis · Disclosure decision · Accommodation request", status: "Anxiety dominant", color: C.rose },
              { date: "Dec '25", item: "Assurance Map breakthrough · Flow state · Lithium reduction", status: "Elevated but grounded", color: C.amber },
              { date: "Jan '26", item: "Diabetes diagnosis · Kidney mystery solved · Emily confirms improvement", status: "Very good · CBT active", color: C.green },
              { date: "Feb '26", item: "New position · Michele gone · Anxiety lowest ever · Recursive awareness", status: "Actualization", color: C.amber },
            ].map((s, i) => (
              <div key={s.date} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none", alignItems: "baseline" }}>
                <span style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 600, color: s.color, width: 60, flexShrink: 0 }}>{s.date}</span>
                <span style={{ fontFamily: font.body, fontSize: 13, color: C.cream, flex: 1 }}>{s.item}</span>
                <span style={{ fontFamily: font.mono, fontSize: 9, color: s.color, flexShrink: 0 }}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Closing */}
        <div style={{ marginTop: 32, borderLeft: `3px solid ${C.crimson}`, padding: "16px 24px", background: C.crimsonFaint, borderRadius: "0 6px 6px 0" }}>
          <div style={{ fontFamily: font.body, fontSize: 15, color: C.creamHigh, lineHeight: 1.8 }}>
            <p style={{ margin: "0 0 14px 0" }}>
              Four sessions. Six months. The psychiatrist watched a patient move 
              from workplace crisis to professional actualization. 
              He observed the flow state, questioned whether it was mania, and correctly concluded it wasn't. 
              He managed the lithium reduction. He connected the kidney numbers to a diabetes diagnosis. 
              He validated the brother-relapse response. He watched the recursive thinking 
              shift from uncontrolled to observed.
            </p>
            <p style={{ margin: "0 0 14px 0" }}>
              He did all of this without the measurement stack. 
              Without knowing that the flow state was the Occipital Alpha pathway 
              finding its substrate. Without knowing that Michele's goalpost-moving 
              was a Compulsive-pattern governance violation. Without knowing that 
              the data analytics position was the Strong's Computer Activities prediction 
              arriving twenty-one years late. Without knowing that the recursive thinking 
              awareness was the over-aroused brain learning to audit itself.
            </p>
            <p style={{ margin: 0 }}>
              The instruments and the psychiatrist arrived at the same conclusions independently. 
              One had the data. The other had the patient. 
              The arc only becomes fully legible when both are on the same table.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 48 }}>
          <div style={{ height: 2, borderRadius: 1, marginBottom: 12, background: `linear-gradient(90deg, ${C.rose}, ${C.amber}, ${C.green}, ${C.ember})` }} />
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em", textAlign: "center" }}>
            🔒 Dropdown Logistics · CHRONICLE · The Lambert Arc · Private · 4 sessions · 6 months · 6 instruments
          </div>
        </div>
      </div>
    </div>
  );
}
