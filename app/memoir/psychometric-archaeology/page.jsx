'use client';
import { useState } from "react";

const C = {
  navy: "#0D1B2A", card: "#10202f", crimson: "#B23531", crimsonDim: "rgba(178,53,49,0.2)",
  crimsonFaint: "rgba(178,53,49,0.08)", cream: "#F5F1EB", creamHigh: "rgba(245,241,235,0.85)",
  creamMid: "rgba(245,241,235,0.55)", creamDim: "rgba(245,241,235,0.3)",
  creamGhost: "rgba(245,241,235,0.08)", border: "rgba(245,241,235,0.06)",
  green: "#4A9E6B", amber: "#C49A3C", amberDim: "rgba(196,154,60,0.15)",
  blue: "#6B9DC2", violet: "#8a6cc9", violetDim: "rgba(138,108,201,0.15)",
  rose: "#c94a6e", ember: "#c98a4a", emberDim: "rgba(201,138,74,0.15)",
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

function InsightCallout({ label, children, color = C.amber }) {
  return (
    <div style={{ padding: "14px 18px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, margin: "24px 0" }}>
      <div style={{ fontFamily: font.mono, fontSize: 9, color, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.7 }}>{children}</div>
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

export default function PsychometricArchaeology() {
  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream, fontFamily: font.body }}>
      <div style={{ position: "fixed", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "200px" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 740, margin: "0 auto", padding: "64px 24px 80px" }}>
        {/* Template tag */}
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 40 }}>
          DDL · CHRONICLE · Psychometric Archaeology
        </div>

        {/* Date label */}
        <div style={{ fontFamily: font.mono, fontSize: 12, color: C.crimson, letterSpacing: "0.1em", marginBottom: 8 }}>
          March 2026
        </div>

        <h1 style={{ fontFamily: font.body, fontSize: 42, fontWeight: 400, fontStyle: "italic", color: C.cream, margin: "0 0 8px 0", lineHeight: 1.15, letterSpacing: "-0.01em" }}>
          Psychometric Archaeology
        </h1>

        <p style={{ fontFamily: font.body, fontSize: 17, fontStyle: "italic", color: C.creamMid, margin: "0 0 4px 0", lineHeight: 1.5 }}>
          What happens when you open every drawer, lay every test on the same table, 
          and treat your life as the document that connects them.
        </p>

        <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginTop: 12 }}>
          D.K. Hale · Dropdown Logistics · dropdownlogistics.com
        </div>

        <div style={{ height: 2, width: 48, background: C.crimson, marginTop: 16, marginBottom: 56, opacity: 0.5 }} />

        {/* ═══════════════════════════════════════════════ */}
        {/* PROLOGUE */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ maxWidth: 680, fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8, marginBottom: 48 }}>
          <p style={{ margin: "0 0 16px 0" }}>
            Most people have been measured more than they realize.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            There are standardized test scores in a high school counselor's file. 
            A vocational inventory from a college career center. A transcript in a registrar's office. 
            Maybe a clinical evaluation in a therapist's filing cabinet. 
            Maybe a neurological baseline on a practitioner's hard drive. 
            A streaming platform knows what you listened to for ten thousand hours.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            Each of these documents was created in isolation, for its own purpose, 
            by an instrument that didn't know the other instruments existed. 
            The PSAT didn't know there would be a GMAT. 
            The vocational inventory didn't know there would be a brain scan. 
            The brain scan didn't know there would be a psych eval. 
            The psych eval didn't know the streaming data would corroborate its sensory profile.
          </p>
          <p style={{ margin: 0 }}>
            Nobody puts them on the same table. That's what this project did.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* THE METHOD */}
        {/* ═══════════════════════════════════════════════ */}

        <Moment number={1} title="Collect Everything" color={C.blue}>
          <p style={{ margin: "0 0 16px 0" }}>
            The first step was gathering every document that had ever measured something about me. 
            Not just the obvious ones — not just the diagnosis or the degree. Everything. 
            Standardized tests from high school. Interest inventories from freshman year. 
            Graduate school transcripts. Neurofeedback baselines. 
            Clinical evaluations with eleven sub-assessments. 
            And one unconventional instrument: a year's worth of streaming data.
          </p>
          <p style={{ margin: 0 }}>
            The collection covered twenty-four years, from age fifteen to age thirty-eight. 
            Eight distinct instruments. Fourteen individual documents. 
            Most of them hadn't been opened since the day they were filed.
          </p>

          <InsightCallout label="The Collection" color={C.blue}>
            The inventory is more extensive than most people expect when they start looking.
            School records, career center files, medical records, streaming data — 
            the documents exist. They're just in separate drawers.
          </InsightCallout>
        </Moment>

        <Transition>THEN</Transition>

        <Moment number={2} title="Catalog by Instrument, Not by Conclusion" color={C.amber}>
          <p style={{ margin: "0 0 16px 0" }}>
            The temptation is to jump to what each document "means." Resist that. 
            The first pass is mechanical: what instrument was used, what it measured, 
            what scores it produced, and what date it was administered. 
            No interpretation. No narrative. Just the data.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            This matters because the instruments don't share a language. 
            A PSAT reports percentiles. A vocational inventory reports interest codes. 
            A neurofeedback baseline reports brainwave frequencies. 
            A psych eval reports T-scores, base rate scores, adaptive behavior composites, 
            and sensory quadrant classifications. 
            A streaming service reports minutes.
          </p>
          <p style={{ margin: 0 }}>
            You can't compare them if you're already interpreting them. 
            Catalog first. Connect later.
          </p>
        </Moment>

        <Transition>THEN</Transition>

        <Moment number={3} title="Lay Them on the Same Table" color={C.green}>
          <p style={{ margin: "0 0 16px 0" }}>
            This is the step that doesn't happen in clinical practice, 
            in education, or in any other context where these instruments are administered. 
            Nobody puts the PSAT next to the vocational inventory 
            next to the neurofeedback baseline next to the psych eval 
            next to the streaming data and asks: do these agree?
          </p>

          <PullQuote color={C.green}>
            The instruments were never designed to talk to each other. 
            But the person they measured is the same person. 
            If the instruments are accurate, they should converge — 
            not because they're looking for the same thing, 
            but because they're looking at the same thing from different angles.
          </PullQuote>

          <p style={{ margin: 0 }}>
            The table is the breakthrough. Not the data. The table.
          </p>
        </Moment>

        <Transition>THEN</Transition>

        <Moment number={4} title="Look for Lines That Cross" color={C.ember}>
          <p style={{ margin: "0 0 16px 0" }}>
            Once the instruments are on the same surface, patterns appear 
            that no single instrument could have produced on its own.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            In my case, a standardized test from age sixteen showed math aptitude at the 92nd percentile. 
            An interest inventory from age eighteen showed math interest at average. 
            A graduate admissions test from age twenty-one showed math aptitude 
            had fallen to the 44th percentile. Three instruments. Three different purposes. 
            One finding: aptitude followed interest downward over five years.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            No single instrument contained that finding. 
            The PSAT didn't know about the interest inventory. 
            The interest inventory didn't know about the GMAT. 
            The GMAT didn't know it was the third data point in a trajectory. 
            The finding only exists because all three documents are on the same table.
          </p>
          <p style={{ margin: 0 }}>
            I found eight throughlines like this. 
            Eight connections that span multiple instruments 
            and only become visible when the instruments are laid side by side. 
            Each one explains something about who I am that no individual document could.
          </p>
        </Moment>

        <Transition>THEN</Transition>

        <Moment number={5} title="Add the Behavioral Data" color={C.violet}>
          <p style={{ margin: "0 0 16px 0" }}>
            The clinical and educational instruments measure you from the outside. 
            Someone else designed the test, administered it, scored it, and filed the result. 
            You sat in a chair and answered questions.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            The behavioral data is different. Nobody designed it. Nobody administered it. 
            You generated it yourself, through years of choosing — what to listen to, 
            what to watch, what to play, what to rewatch at 2 AM when you can't sleep. 
            Streaming platforms collect this data automatically. 
            It's the only instrument in the collection where the subject chose the measurement 
            without knowing they were being measured.
          </p>
          <p style={{ margin: 0 }}>
            When I mapped my listening data against my clinical sensory profile, 
            the matches were specific and structural. 
            Not "I like this music because it sounds good." 
            Rather: "This sonic architecture maps to this neurological measurement 
            through this functional mechanism." 
            The same turned out to be true for television, film, and games. 
            The entire media diet — every selection, every rewatch, every repeat — 
            is a behavioral signature of the same brain the instruments measured.
          </p>

          <InsightCallout label="The Key Insight" color={C.violet}>
            Behavioral data is the only instrument the subject generates themselves.
            It doesn't measure what you can do or what you prefer when asked.
            It measures what you actually choose when nobody's watching.
            That makes it the highest-fidelity signal in the collection.
          </InsightCallout>
        </Moment>

        <Transition>THEN</Transition>

        <Moment number={6} title="Check Against Self-Knowledge" color={C.rose}>
          <p style={{ margin: "0 0 16px 0" }}>
            There's one more layer, and it's the one that changed everything for me.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            Before I did any of this — before I opened the drawers, before I cataloged the instruments, 
            before I found the throughlines — I had already written down what I'd learned about myself 
            through years of therapy, reflection, and self-examination. 
            Insights about how my mind works, what I fear, 
            why certain things land hard and others don't.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            When I mapped those self-reported insights against the instruments, 
            every single one was independently corroborated by at least one measurement. 
            My self-knowledge and the instruments had converged on the same findings 
            through entirely different methods.
          </p>

          <PullQuote color={C.rose}>
            The instruments measured me from the outside. 
            My own reflection measured me from the inside. 
            They found the same person. 
            That convergence — between what you know about yourself 
            and what the instruments can prove — is the most meaningful finding 
            in the entire project.
          </PullQuote>

          <p style={{ margin: 0 }}>
            This step isn't about the instruments validating you. 
            It's about discovering that your self-knowledge was already accurate — 
            and that the instruments provide the external evidence 
            your own cognitive architecture might not let you believe without proof.
          </p>
        </Moment>

        <Transition>THEN</Transition>

        <Moment number={7} title="Build the Artifacts" color={C.amber}>
          <p style={{ margin: "0 0 16px 0" }}>
            Data in a drawer is inert. Data on a table is interesting. 
            Data in a system is useful.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            I used my existing content architecture — a six-template system I'd built 
            for unrelated projects — to turn the findings into navigable, interactive artifacts. 
            A profile that holds every measurement. 
            Visualization surfaces that chart the trajectories. 
            Narrative documents that tell the story chronologically. 
            Point-by-point maps that connect specific media selections to specific measurements. 
            An interactive constellation where you can click through the instruments 
            and watch the connections appear.
          </p>
          <p style={{ margin: 0 }}>
            The artifacts aren't the findings. They're the system that makes the findings legible. 
            The same principle that applies to audit documentation, 
            to data architecture, to governance systems: 
            the value isn't in having the information. 
            It's in making the information accessible to the person who needs it — 
            which, in this case, is you.
          </p>
        </Moment>

        <Transition>THE RESULT</Transition>

        <Moment number={8} title="What You Get" color={C.crimson}>
          <p style={{ margin: "0 0 16px 0" }}>
            A complete, cross-referenced, longitudinal self-profile. 
            Not a diagnosis. Not a score. Not a label. 
            A dimensional map of who you are, built from every instrument 
            that ever measured any part of you, connected by the throughlines 
            that only become visible when the instruments talk to each other.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            It includes things no single document could contain: 
            how an aptitude trajectory explains a career arc. 
            How a vocational interest inventory predicted a life that hadn't happened yet. 
            How a brain scan found creativity running through channels 
            an interest inventory scored at the floor. 
            How a sensory profile explains a website's color palette, 
            a music library, and a sleep routine simultaneously.
          </p>
          <p style={{ margin: 0 }}>
            And it includes the convergence with self-knowledge — 
            the discovery that the person who lived the life 
            already knew what the instruments would find, 
            and needed the instruments to believe their own accuracy.
          </p>
        </Moment>

        {/* ═══════════════════════════════════════════════ */}
        {/* THE PRINCIPLE */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ marginTop: 16 }}>
          <div style={{ height: 1, background: C.crimson, opacity: 0.2, marginBottom: 40 }} />

          <div style={{ maxWidth: 680, fontFamily: font.body, fontSize: 16, color: C.creamHigh, lineHeight: 1.8 }}>
            <p style={{ margin: "0 0 20px 0" }}>
              The principle behind psychometric archaeology is simple: 
              you have more data about yourself than you think you do, 
              and nobody has ever put it together.
            </p>
            <p style={{ margin: "0 0 20px 0" }}>
              The instruments exist. The documents are in drawers. 
              The behavioral data is on servers. The self-knowledge is in your head. 
              The connections between them are waiting to be found.
            </p>
            <p style={{ margin: "0 0 20px 0" }}>
              All you have to do is open every drawer, lay everything on the same table, 
              and look for lines that cross.
            </p>
            <p style={{ margin: "0 0 20px 0", fontStyle: "italic" }}>
              The life you lived is the document that connects them. 
              The instruments just measured different sections of it.
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* THE METHOD SUMMARY */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ marginTop: 40, background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "24px" }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.amber, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            The Method — Summary
          </div>
          {[
            { step: "01", label: "Collect", desc: "Gather every document that ever measured you — test scores, inventories, transcripts, evaluations, streaming data", color: C.blue },
            { step: "02", label: "Catalog", desc: "Record instrument, date, scores, and what was measured — no interpretation, just data", color: C.amber },
            { step: "03", label: "Table", desc: "Lay all instruments on the same surface — this is the step nobody does", color: C.green },
            { step: "04", label: "Connect", desc: "Look for throughlines that span multiple instruments — findings that only exist at the intersection", color: C.ember },
            { step: "05", label: "Behavioral", desc: "Add the data you generated yourself — listening, watching, playing, choosing — the highest-fidelity signal", color: C.violet },
            { step: "06", label: "Converge", desc: "Check against self-knowledge — find where the instruments and your own understanding independently agree", color: C.rose },
            { step: "07", label: "Build", desc: "Turn findings into navigable artifacts — the value is in making the information accessible", color: C.amber },
            { step: "08", label: "Use", desc: "The result is a dimensional self-map built from every instrument, connected by the life that links them", color: C.crimson },
          ].map((s, i) => (
            <div key={s.step} style={{
              display: "flex", alignItems: "baseline", gap: 14, padding: "10px 0",
              borderBottom: i < 7 ? `1px solid ${C.border}` : "none",
            }}>
              <span style={{ fontFamily: font.mono, fontSize: 16, fontWeight: 700, color: s.color, opacity: 0.5, width: 28, flexShrink: 0 }}>{s.step}</span>
              <span style={{ fontFamily: font.display, fontSize: 14, fontWeight: 600, color: C.cream, width: 80, flexShrink: 0 }}>{s.label}</span>
              <span style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.5 }}>{s.desc}</span>
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* WHAT THIS PROJECT PRODUCED */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ marginTop: 40, background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "24px" }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            What This Project Produced — One Session
          </div>
          {[
            { file: "The Operator", template: "DOSSIER", desc: "Longitudinal self-profile: 14 documents, 8 instruments, 24 years, 8 throughlines" },
            { file: "The Dimensional Map", template: "CONSOLE", desc: "8-panel analytical visualization surface charting every measurement domain" },
            { file: "The Measurement Arc", template: "CHRONICLE", desc: "Atmospheric narrative spine — the 24-year story told chronologically" },
            { file: "Catnip Map", template: "CONSOLE", desc: "Point-by-point mapping of listening data to psychometric measurements" },
            { file: "The Sensory Diet", template: "CONSOLE", desc: "All four media categories against the measurement stack — 7 cross-media patterns" },
            { file: "The Callback Engine", template: "CONSOLE", desc: "9 comedies, 9 recursion architectures, each mapped to a cognitive pathway" },
            { file: "The Sonic Thread", template: "CONSOLE", desc: "Musical DNA across every media selection, 6 sonic functions, 10 soundtracks" },
            { file: "The Reconciliation", template: "Interactive", desc: "Constellation visualization — 8 instrument nodes, 12 connection lines, progressive reveal" },
            { file: "The Convergence", template: "CONSOLE", desc: "Self-knowledge mapped to instrument findings — every insight independently corroborated" },
            { file: "This document", template: "CHRONICLE", desc: "The methodology — how to do this for yourself" },
          ].map((f, i) => (
            <div key={f.file} style={{
              display: "flex", alignItems: "baseline", gap: 12, padding: "8px 0",
              borderBottom: i < 9 ? `1px solid ${C.border}` : "none",
            }}>
              <span style={{ fontFamily: font.body, fontSize: 13, color: C.cream, flex: "1 1 160px" }}>{f.file}</span>
              <span style={{ fontFamily: font.mono, fontSize: 9, color: C.amber, width: 70, flexShrink: 0 }}>{f.template}</span>
              <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, flex: "2 1 200px" }}>{f.desc}</span>
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* FOOTER */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ marginTop: 48 }}>
          <div style={{ height: 2, borderRadius: 1, marginBottom: 12, background: `linear-gradient(90deg, ${C.blue}, ${C.amber}, ${C.green}, ${C.ember}, ${C.rose}, ${C.violet})` }} />
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em" }}>
              Dropdown Logistics · CHRONICLE · Psychometric Archaeology
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>D.K. Hale · dropdownlogistics.com · 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
}

