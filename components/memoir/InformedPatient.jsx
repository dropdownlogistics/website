import { useState } from "react";

const C = {
  navy: "#0D1B2A", card: "#10202f", crimson: "#B23531", crimsonDim: "rgba(178,53,49,0.2)",
  crimsonFaint: "rgba(178,53,49,0.08)", cream: "#F5F1EB", creamHigh: "rgba(245,241,235,0.85)",
  creamMid: "rgba(245,241,235,0.55)", creamDim: "rgba(245,241,235,0.3)",
  creamGhost: "rgba(245,241,235,0.08)", border: "rgba(245,241,235,0.06)",
  green: "#4A9E6B", amber: "#C49A3C", amberDim: "rgba(196,154,60,0.15)",
  blue: "#6B9DC2", violet: "#8a6cc9", rose: "#c94a6e", ember: "#c98a4a",
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

function PullQuote({ children, color = C.crimson }) {
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

export default function InformedPatient() {
  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream, fontFamily: font.body }}>
      <div style={{ position: "fixed", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "200px" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 740, margin: "0 auto", padding: "64px 24px 80px" }}>
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 40 }}>
          DDL · CHRONICLE · The Informed Patient
        </div>

        <div style={{ fontFamily: font.mono, fontSize: 12, color: C.crimson, letterSpacing: "0.1em", marginBottom: 8 }}>
          March 2026
        </div>

        <h1 style={{ fontFamily: font.body, fontSize: 42, fontWeight: 400, fontStyle: "italic", color: C.cream, margin: "0 0 8px 0", lineHeight: 1.15, letterSpacing: "-0.01em" }}>
          The Informed Patient
        </h1>
        <p style={{ fontFamily: font.body, fontSize: 17, fontStyle: "italic", color: C.creamMid, margin: "0 0 4px 0", lineHeight: 1.5 }}>
          What changes when you know your own architecture before you walk into the room.
        </p>
        <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginTop: 12 }}>
          D.K. Hale · Dropdown Logistics · dropdownlogistics.com
        </div>
        <div style={{ height: 2, width: 48, background: C.crimson, marginTop: 16, marginBottom: 56, opacity: 0.5 }} />

        {/* Prologue */}
        <div style={{ maxWidth: 680, fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8, marginBottom: 48 }}>
          <p style={{ margin: "0 0 16px 0" }}>
            Psychiatric medication management works like this: you see your doctor 
            every four to twelve weeks. They ask about mood, sleep, appetite, concentration, energy. 
            You answer. They adjust medications or keep them the same. 
            They schedule the next appointment.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            Each appointment is a snapshot. Thirty minutes. Five standard questions. 
            The doctor uses clinical judgment — pattern recognition honed over years of practice — 
            to interpret what you're telling them, compare it to the last snapshot, 
            and decide whether the pharmacological strategy is working.
          </p>
          <p style={{ margin: 0 }}>
            This system works. It keeps people stable, functional, alive. 
            But it operates on limited data — the snapshots the patient provides, 
            the labs the doctor orders, and whatever clinical history exists in the chart. 
            The doctor doesn't have the full measurement stack. Usually, neither does the patient.
          </p>
        </div>

        <Moment number={1} title="The Standard Model" color={C.blue}>
          <p style={{ margin: "0 0 16px 0" }}>
            In the standard psychiatric encounter, information flows in one direction: 
            patient reports symptoms, doctor interprets symptoms, doctor adjusts treatment. 
            The patient's job is to describe their experience accurately. 
            The doctor's job is to map that description onto a clinical framework 
            and make pharmacological decisions.
          </p>
          <p style={{ margin: 0 }}>
            This model has two structural limitations. 
            First, the patient may not have the vocabulary to describe what's happening precisely. 
            "I can't focus" could mean six different things — and the treatment differs for each. 
            Second, the doctor has no longitudinal psychometric data. 
            They don't know the patient's aptitude trajectory, interest profile, 
            sensory processing architecture, or adaptive behavior pattern. 
            They have a diagnosis and a medication list.
          </p>
        </Moment>

        <Transition>WHAT CHANGES</Transition>

        <Moment number={2} title="When the Patient Has the Dimensional Map" color={C.amber}>
          <p style={{ margin: "0 0 16px 0" }}>
            Psychometric archaeology changes the encounter. Not by replacing the doctor's expertise — 
            that remains essential — but by upgrading the quality of information the patient brings.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            When you know your own architecture, something shifts. 
            Instead of reporting "I'm anxious at work," you can report: 
            "My Sensation Avoiding profile is being triggered by unpredictable input 
            from a supervisor whose management style violates the Conventional governance architecture 
            my personality pattern requires." The psychiatrist doesn't need to know those terms. 
            But you do — because knowing them means you can describe the mechanism, 
            not just the symptom.
          </p>
          <p style={{ margin: 0 }}>
            Instead of "I got really focused on a project this weekend," you can say: 
            "I entered a sustained flow state that engaged my pattern-recognition pathway 
            for nine hours. I'm monitoring it because the energy level resembles 
            a previous manic episode, but the behavior pattern is different — 
            I stayed on one task, not twenty-five." 
            That's not just a better symptom report. It's a differential diagnosis 
            offered by the patient themselves.
          </p>

          <PullQuote color={C.amber}>
            The dimensional map doesn't replace the psychiatrist. 
            It makes the patient a better informant. 
            The data resolution of each snapshot increases 
            because the patient understands what they're reporting 
            and can contextualize it against their own baseline.
          </PullQuote>
        </Moment>

        <Transition>IN PRACTICE</Transition>

        <Moment number={3} title="The Self-Monitoring Upgrade" color={C.green}>
          <p style={{ margin: "0 0 16px 0" }}>
            Over a six-month period, I had four sessions with my psychiatrist. 
            In that window, I navigated a workplace crisis, experienced a breakthrough 
            professional achievement, received an unexpected medical diagnosis 
            that explained a medication side-effect mystery, 
            managed a family member's relapse, and transitioned to a new role.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            At each session, the standard questions were asked: mood, sleep, appetite, 
            concentration, energy. I answered accurately. 
            But because I had the measurement stack, I could also do something else — 
            I could flag for the doctor when a subjective experience 
            might be clinically significant versus when it was 
            a predictable expression of a documented pattern.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            When I told him I had worked for nine hours without noticing time passing, 
            and that it felt similar to a previous manic episode, 
            and that I was self-monitoring for mania but believed this was different — 
            he agreed. He said: "The way you're talking doesn't sound manic." 
            My self-assessment and his clinical assessment converged.
          </p>
          <p style={{ margin: 0 }}>
            I'm not saying I diagnosed myself. I'm saying I provided higher-resolution data 
            by knowing what to flag, what to compare, and what to differentiate — 
            because I had the longitudinal measurement context that the snapshot model 
            structurally can't provide.
          </p>
        </Moment>

        <Transition>THE MECHANISM</Transition>

        <Moment number={4} title="What the Psychiatrist Sees vs. What the Instruments Measured" color={C.rose}>
          <p style={{ margin: "0 0 16px 0" }}>
            A psychiatrist works from clinical observation and patient report. 
            The psychometric instruments work from standardized assessment. 
            They're looking at the same person from different angles — 
            and when both are on the same table, the picture sharpens.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            Over those four sessions, my psychiatrist observed me navigate 
            anxiety, flow states, medical complications, family crisis, 
            and professional transition. At each point, his clinical judgment 
            was accurate. He correctly identified what was mania-adjacent 
            versus what was genuine competence. He correctly connected 
            a kidney issue to a metabolic cause rather than a medication cause. 
            He correctly validated a family response as appropriate.
          </p>
          <p style={{ margin: 0 }}>
            What he didn't have — and what the measurement stack provides — 
            is the <em>why</em> underneath each of those observations. 
            Why the flow state was predictable given the interest profile. 
            Why the workplace trigger was specifically activating given the personality architecture. 
            Why the coping response worked given the adaptive behavior strengths. 
            The clinical observation is the what. The instruments provide the mechanism.
          </p>
        </Moment>

        <Transition>THE PRINCIPLE</Transition>

        <Moment number={5} title="Psychiatric Care as a Systems Problem" color={C.ember}>
          <p style={{ margin: "0 0 16px 0" }}>
            When you understand your own cognitive and emotional architecture, 
            psychiatric care becomes a systems collaboration rather than a one-way consultation. 
            The doctor still holds the pharmacological expertise. 
            The patient holds the operational data.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            This isn't about second-guessing your doctor or replacing clinical judgment 
            with self-assessment. It's about bringing better data to the encounter. 
            Every system runs better on better data.
          </p>

          <PullQuote color={C.ember}>
            The informed patient doesn't overrule the psychiatrist. 
            They upgrade the input. A doctor working from snapshots 
            makes good decisions. A doctor working from snapshots 
            where the patient understands their own baseline, 
            can flag deviations in context, 
            and can differentiate between a symptom and a pattern — 
            that doctor makes better decisions. 
            Because the data resolution is higher.
          </PullQuote>
        </Moment>

        <Transition>THE RESULT</Transition>

        <Moment number={6} title="What Six Months Looked Like" color={C.crimson}>
          <p style={{ margin: "0 0 16px 0" }}>
            At the beginning of the arc: workplace anxiety driven by a management conflict, 
            medication adjustments under consideration, 
            labs trending in a concerning direction, mood stable but strained.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            At the end of the arc: new role aligned with the documented interest profile, 
            anxiety at its lowest point in years, 
            medical mystery resolved through a diagnosis from a different specialty, 
            medication stable and effective at a lower dose, 
            a family crisis handled with accountability and appropriate boundaries.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            The psychiatrist's final observation: "It's crazy how far it's come since we first started seeing each other."
          </p>
          <p style={{ margin: 0 }}>
            The measurement stack's observation: every development in that six-month arc 
            was already implicit in the instruments. The flow state was predicted by the interest profile. 
            The workplace crisis was predicted by the personality architecture. 
            The coping strength was measured two years before it was tested. 
            The career transition was the twenty-one-year-old vocational prediction 
            finally arriving at the correct application.
          </p>
        </Moment>

        {/* Closing */}
        <div style={{ marginTop: 16 }}>
          <div style={{ height: 1, background: C.crimson, opacity: 0.2, marginBottom: 40 }} />

          <div style={{ maxWidth: 680, fontFamily: font.body, fontSize: 16, color: C.creamHigh, lineHeight: 1.8 }}>
            <p style={{ margin: "0 0 20px 0" }}>
              Psychiatric care is essential. Medication management is essential. 
              The snapshot model works — it has kept me stable, functional, and here.
            </p>
            <p style={{ margin: "0 0 20px 0" }}>
              But the snapshot model improves when the patient adds resolution. 
              When you know what your instruments measured, 
              you can contextualize what you're reporting. 
              When you understand your own patterns, 
              you can flag deviations that matter and normalize experiences that are predictable. 
              When you have the longitudinal data, 
              you can help your doctor see the trajectory between the snapshots.
            </p>
            <p style={{ margin: "0 0 20px 0" }}>
              The informed patient isn't a replacement for clinical expertise. 
              It's what happens when the person sitting in the chair 
              has done the archaeology — opened every drawer, laid every document on the same table, 
              found the throughlines, mapped the behavioral data, 
              and checked the instruments against their own self-knowledge.
            </p>
            <p style={{ margin: 0, fontStyle: "italic" }}>
              What changes is the data resolution. 
              What stays the same is the doctor's essential role. 
              What improves is everything between them.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 48 }}>
          <div style={{ height: 2, borderRadius: 1, marginBottom: 12, background: `linear-gradient(90deg, ${C.rose}, ${C.amber}, ${C.green}, ${C.ember}, ${C.crimson})` }} />
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em" }}>
              Dropdown Logistics · CHRONICLE · The Informed Patient
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>D.K. Hale · dropdownlogistics.com · 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
}
