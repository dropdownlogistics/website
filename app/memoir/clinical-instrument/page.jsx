'use client'

import { useState } from "react";

const C = {
  navy: "#0D1B2A", card: "#10202f", crimson: "#B23531", crimsonDim: "rgba(178,53,49,0.2)",
  cream: "#F5F1EB", creamHigh: "rgba(245,241,235,0.85)",
  creamMid: "rgba(245,241,235,0.55)", creamDim: "rgba(245,241,235,0.3)",
  creamGhost: "rgba(245,241,235,0.08)", border: "rgba(245,241,235,0.06)",
  green: "#4A9E6B", amber: "#C49A3C", amberDim: "rgba(196,154,60,0.15)",
  blue: "#6B9DC2", violet: "#8a6cc9", violetDim: "rgba(138,108,201,0.15)",
  rose: "#c94a6e", roseDim: "rgba(201,74,110,0.15)", ember: "#c98a4a",
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

function PullQuote({ children, color = C.amber }) {
  return (
    <div style={{ borderLeft: `3px solid ${color}`, padding: "16px 24px", background: color + "10", borderRadius: "0 6px 6px 0", margin: "32px 0" }}>
      <p style={{ fontFamily: font.body, fontSize: 17, fontStyle: "italic", color: C.creamHigh, lineHeight: 1.7, margin: 0 }}>{children}</p>
    </div>
  );
}

function Moment({ number, title, color, children }) {
  return (
    <div style={{ marginBottom: 56, position: "relative" }}>
      <div style={{ fontFamily: font.mono, fontSize: 72, fontWeight: 700, color: color + "12", lineHeight: 0.85, marginBottom: -14, userSelect: "none" }}>
        {String(number).padStart(2, "0")}
      </div>
      <div style={{ position: "relative", zIndex: 1, paddingLeft: 4 }}>
        <h2 style={{ fontFamily: font.body, fontSize: 22, fontWeight: 400, fontStyle: "italic", color: C.cream, margin: "0 0 14px 0", lineHeight: 1.3 }}>{title}</h2>
        <div style={{ height: 2, width: 36, background: color, opacity: 0.4, marginBottom: 18 }} />
        <div style={{ maxWidth: 680, fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8 }}>{children}</div>
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

export default function ClinicalInstrument() {
  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream, fontFamily: font.body }}>
      <div style={{ position: "fixed", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "200px" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 740, margin: "0 auto", padding: "64px 24px 80px" }}>
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 40 }}>
          DDL · CHRONICLE · The Clinical Instrument
        </div>

        <div style={{ fontFamily: font.mono, fontSize: 12, color: C.amber, letterSpacing: "0.1em", marginBottom: 8 }}>
          March 2026
        </div>

        <h1 style={{ fontFamily: font.body, fontSize: 42, fontWeight: 400, fontStyle: "italic", color: C.cream, margin: "0 0 8px 0", lineHeight: 1.15, letterSpacing: "-0.01em" }}>
          The Clinical Instrument
        </h1>

        <p style={{ fontFamily: font.body, fontSize: 17, fontStyle: "italic", color: C.creamMid, margin: "0 0 4px 0", lineHeight: 1.5 }}>
          What happens when you add your psychiatrist's observations 
          to the same table as every other instrument that ever measured you.
        </p>

        <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginTop: 12 }}>
          D.K. Hale · Dropdown Logistics · dropdownlogistics.com
        </div>

        <div style={{ height: 2, width: 48, background: C.amber, marginTop: 16, marginBottom: 56, opacity: 0.5 }} />

        {/* ═══════════════════════════════════════════════ */}
        {/* PROLOGUE */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ maxWidth: 680, fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8, marginBottom: 48 }}>
          <p style={{ margin: "0 0 16px 0" }}>
            In psychometric archaeology, the instruments are the documents you collect from drawers: 
            standardized tests, interest inventories, brain scans, clinical evaluations. 
            Each one measures you from the outside, at a fixed point in time, 
            using a methodology designed by someone who never met you.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            But there's another instrument most people overlook: 
            the ongoing clinical relationship.
          </p>
          <p style={{ margin: 0 }}>
            A psychiatrist who sees you every six weeks asks the same questions every time. 
            Mood. Sleep. Anxiety. Focus. Appetite. Energy. 
            They're running a longitudinal instrument — the same measurement battery, 
            repeated across time, with clinical judgment as the scoring mechanism. 
            And if you record those sessions, you have something 
            no standardized test can produce: a time-series dataset 
            of how the same person changes across months and years.
          </p>
        </div>

        <Moment number={1} title="The Standard Battery" color={C.blue}>
          <p style={{ margin: "0 0 16px 0" }}>
            Every psychiatric check-in follows roughly the same protocol. 
            The clinician asks a set of questions that map to the domains 
            they're managing: mood stability, anxiety level, sleep quality, 
            concentration, appetite, energy. They note changes. 
            They adjust medications if needed. They schedule the next appointment.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            This is a measurement instrument. It's just not treated like one.
          </p>
          <p style={{ margin: 0 }}>
            The questions are standardized. The domains are consistent. 
            The clinician applies professional judgment to score the responses — 
            not with numbers, but with clinical assessment. 
            And if you have four sessions over six months, 
            you have four data points across the same domains, 
            observed by the same scorer, using the same methodology.
          </p>

          <PullQuote color={C.blue}>
            A standardized test measures you once with high precision. 
            A clinical relationship measures you repeatedly with high context. 
            Both belong on the table.
          </PullQuote>
        </Moment>

        <Transition>THE DISCOVERY</Transition>

        <Moment number={2} title="What the Clinician Sees That the Instruments Can't" color={C.amber}>
          <p style={{ margin: "0 0 16px 0" }}>
            My psychiatrist doesn't know about the psychometric archaeology project. 
            He doesn't know I mapped my listening data to my sensory profile 
            or that a vocational inventory from 2005 predicted my career trajectory 
            or that eight instruments converge on the same throughlines.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            He's observing me through a different window: medication response, 
            symptom trajectory, functional capacity. 
            He asks if I can concentrate. He asks about my sleep. 
            He differentiates flow states from mania. 
            He notices when my anxiety drops and asks what changed.
          </p>
          <p style={{ margin: 0 }}>
            When I laid his observations on the same table as the instruments, 
            every clinical finding mapped to a psychometric measurement. 
            The flow state he confirmed was the creativity pattern 
            a brain scan had documented five years earlier. 
            The anxiety he traced to a specific environmental trigger 
            was the personality pattern a clinical evaluation had measured two years before. 
            The focus improvement he noted was an executive function deficit 
            resolving when the task matched the interest profile 
            a vocational inventory had predicted twenty years ago.
          </p>
        </Moment>

        <Transition>THE ARC</Transition>

        <Moment number={3} title="What Changes Between Appointments" color={C.green}>
          <p style={{ margin: "0 0 16px 0" }}>
            The power of the clinical instrument isn't in any single session. 
            It's in the delta between sessions.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            A standardized test gives you a snapshot. 
            The clinical relationship gives you a trajectory. 
            Over six months and four sessions, I watched the same domains — 
            mood, anxiety, sleep, focus, appetite — shift from one state to another. 
            Not dramatically. Not in a single leap. 
            In the kind of gradual, compounding way that's invisible from the inside 
            but legible from the clinician's chair.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            The clinician sees the arc. The patient lives it. 
            Neither one can see it the same way the other does. 
            But when you lay the clinician's observations next to the instruments, 
            you get something neither could produce alone: 
            a trajectory with both shape and explanation.
          </p>
          <p style={{ margin: 0 }}>
            The clinical data says: here's what changed. 
            The instruments say: here's why it was always going to.
          </p>

          <PullQuote color={C.green}>
            In my case, a vocational inventory administered at eighteen 
            predicted the career move that eliminated the anxiety 
            my psychiatrist had been managing for years. 
            The instrument knew the destination. 
            The clinician tracked the journey. 
            Neither one had the other's information. 
            They converged anyway.
          </PullQuote>
        </Moment>

        <Transition>THE METHOD</Transition>

        <Moment number={4} title="How to Add the Clinical Instrument" color={C.ember}>
          <p style={{ margin: "0 0 16px 0" }}>
            If you're doing psychometric archaeology and you have an ongoing clinical relationship — 
            psychiatry, therapy, any recurring assessment — you can add it to the table.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            The method is simple. Record the sessions, with consent. 
            Transcribe them. Extract the standard domains: 
            what did the clinician ask, what did you report, 
            what did the clinician observe, what changed since last time. 
            Lay those observations next to the psychometric instruments 
            and look for the same convergences you'd look for between any two instruments.
          </p>
          <p style={{ margin: 0 }}>
            The clinical observations won't have scores. They won't have percentiles. 
            They'll have something the standardized instruments don't: 
            a human being who knows you, watching you over time, 
            applying professional judgment to the same domains the instruments measured once. 
            That's not less rigorous than a test score. It's a different kind of rigor.
          </p>
        </Moment>

        <Transition>THE CONVERGENCE</Transition>

        <Moment number={5} title="What You Find" color={C.violet}>
          <p style={{ margin: "0 0 16px 0" }}>
            What I found was that my psychiatrist's observations — made without knowledge 
            of the psychometric stack — independently confirmed findings 
            from instruments administered by entirely different practitioners 
            for entirely different purposes.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            He differentiated a flow state from mania. 
            A brain scan had already documented the neurological basis for that flow state. 
            He identified anxiety as environmental, not constitutional. 
            A personality assessment had already mapped the specific features 
            that make certain environments triggering. 
            He noticed focus improving. An executive function scale had already measured 
            the conditions under which focus would improve.
          </p>
          <p style={{ margin: 0 }}>
            None of these practitioners talked to each other. 
            The brain scan didn't know about the personality assessment. 
            The personality assessment didn't know about the psychiatrist. 
            The psychiatrist didn't know about either. 
            They converged because they were all measuring the same person.
          </p>
        </Moment>

        <Transition>THE INFORMANT</Transition>

        <Moment number={6} title="The Person Who Lives with You" color={C.rose}>
          <p style={{ margin: "0 0 16px 0" }}>
            One of my instruments — an adaptive behavior assessment — 
            was administered not to me, but to my spouse. 
            It's called an informant report: someone who observes you in daily life 
            provides their assessment of your functioning.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            Months later, that same spouse joined a psychiatric appointment 
            and volunteered an observation about visible improvement. 
            She was, without knowing it, providing an updated informant report 
            using the same methodology — personal observation, reported to a clinician — 
            that the formal instrument had used.
          </p>
          <p style={{ margin: 0 }}>
            The formal assessment measured the baseline. 
            The in-session observation measured the delta. 
            Same person, same methodology, same subject, different timepoint. 
            That's a longitudinal instrument hiding in plain sight.
          </p>

          <PullQuote color={C.rose}>
            The people who live with us are instruments. 
            Not in a reductive way — in a profound way. 
            They observe what no test can capture: 
            who we are when we're not being measured.
          </PullQuote>
        </Moment>

        <Transition>THE BODY</Transition>

        <Moment number={7} title="When the Infrastructure Speaks" color={C.blue}>
          <p style={{ margin: "0 0 16px 0" }}>
            One unexpected finding from the clinical arc: 
            a medical diagnosis — unrelated to mental health — 
            retrospectively explained lab values that had been attributed 
            to a psychiatric medication.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            The body is a system. When the infrastructure layer — metabolism, oxygenation, 
            blood sugar regulation — is impaired, the application layer — 
            mood, focus, energy, sleep — degrades. 
            My psychiatrist said something that reframed the entire project: 
            every neuropsychiatric symptom they were treating with medication 
            could improve if the underlying medical conditions were properly addressed.
          </p>
          <p style={{ margin: 0 }}>
            The psychometric instruments measured the cognitive and behavioral symptoms. 
            The medical labs measured the physiological substrate. 
            The clinical relationship connected them. 
            No single instrument contained the finding that the root cause 
            wasn't in the psychiatric layer but in the metabolic one. 
            That finding only emerged because all the data was on the same table.
          </p>
        </Moment>

        <Transition>THE PRINCIPLE</Transition>

        <Moment number={8} title="The Clinical Relationship as Instrument" color={C.amber}>
          <p style={{ margin: "0 0 16px 0" }}>
            The principle is this: if you're building a psychometric archaeology, 
            don't leave out the living instruments.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            The standardized tests measure you at fixed points with calibrated tools. 
            The clinical relationship measures you across time with human judgment. 
            The informant — the person who shares your life — measures you 
            in the space between appointments, in the mornings and evenings, 
            in the moments no clinician sees.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            All three belong on the table. 
            All three produce data. 
            All three converge on the same person.
          </p>
          <p style={{ margin: 0 }}>
            And when they converge — when the psychiatrist confirms what the brain scan predicted, 
            when the spouse reports what the adaptive behavior assessment measured, 
            when the medical labs explain what the personality inventory implied — 
            the resulting picture is more complete than any single instrument 
            could ever produce on its own.
          </p>
        </Moment>

        {/* ═══════════════════════════════════════════════ */}
        {/* CLOSING */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ marginTop: 16 }}>
          <div style={{ height: 1, background: C.amber, opacity: 0.2, marginBottom: 40 }} />

          <div style={{ maxWidth: 680, fontFamily: font.body, fontSize: 16, color: C.creamHigh, lineHeight: 1.8 }}>
            <p style={{ margin: "0 0 20px 0" }}>
              Four appointments. Six months. One arc.
            </p>
            <p style={{ margin: "0 0 20px 0" }}>
              The clinician tracked the trajectory. The instruments explained the substrate. 
              The informant confirmed the change. The medical labs revealed the infrastructure. 
              None of them had each other's data. All of them found the same person.
            </p>
            <p style={{ margin: "0 0 20px 0", fontStyle: "italic" }}>
              The standardized instruments tell you who you are. 
              The clinical relationship tells you who you're becoming. 
              Put them on the same table 
              and you can see both at once.
            </p>
          </div>
        </div>

        {/* Method addendum */}
        <div style={{ marginTop: 40, background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "24px" }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.amber, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            Adding the Clinical Instrument — Quick Reference
          </div>
          {[
            { step: "01", label: "Record", desc: "Record clinical sessions with consent. These are your data source.", color: C.blue },
            { step: "02", label: "Transcribe", desc: "Convert to searchable text. The raw dialogue is the raw data.", color: C.amber },
            { step: "03", label: "Extract", desc: "Pull the standard domains: mood, anxiety, sleep, focus, appetite, energy, clinician observations, changes since last visit.", color: C.green },
            { step: "04", label: "Chronology", desc: "Arrange sessions in order. The trajectory between sessions is the finding.", color: C.ember },
            { step: "05", label: "Map", desc: "Lay clinical observations next to instrument findings. Look for independent confirmation across different windows.", color: C.violet },
            { step: "06", label: "Informant", desc: "If a partner or family member joins sessions, their observations are an updated informant report. Treat them as data.", color: C.rose },
            { step: "07", label: "Infrastructure", desc: "Include medical labs and physical health data. The body is a system layer the psychiatric instruments can't see alone.", color: C.blue },
          ].map((s, i) => (
            <div key={s.step} style={{
              display: "flex", alignItems: "baseline", gap: 14, padding: "10px 0",
              borderBottom: i < 6 ? `1px solid ${C.border}` : "none",
            }}>
              <span style={{ fontFamily: font.mono, fontSize: 16, fontWeight: 700, color: s.color, opacity: 0.5, width: 28, flexShrink: 0 }}>{s.step}</span>
              <span style={{ fontFamily: font.display, fontSize: 14, fontWeight: 600, color: C.cream, width: 90, flexShrink: 0 }}>{s.label}</span>
              <span style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.5 }}>{s.desc}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 48 }}>
          <div style={{ height: 2, borderRadius: 1, marginBottom: 12, background: `linear-gradient(90deg, ${C.blue}, ${C.amber}, ${C.green}, ${C.rose}, ${C.violet})` }} />
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em" }}>
              DDL · CHRONICLE · The Clinical Instrument
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>D.K. Hale · dropdownlogistics.com · 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
}

