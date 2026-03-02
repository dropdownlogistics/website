import { useState } from "react";

// ═══════════════════════════════════════════════════════════
// CottageHumble Tokens
// ═══════════════════════════════════════════════════════════
const C = {
  navy: "#0D1B2A",
  card: "#10202f",
  cardHover: "#162538",
  crimson: "#B23531",
  crimsonDim: "rgba(178,53,49,0.2)",
  crimsonFaint: "rgba(178,53,49,0.08)",
  cream: "#F5F1EB",
  creamHigh: "rgba(245,241,235,0.85)",
  creamMid: "rgba(245,241,235,0.55)",
  creamDim: "rgba(245,241,235,0.3)",
  creamGhost: "rgba(245,241,235,0.08)",
  border: "rgba(245,241,235,0.06)",
  borderMed: "rgba(245,241,235,0.1)",
  green: "#4A9E6B",
  amber: "#C49A3C",
  amberDim: "rgba(196,154,60,0.15)",
  blue: "#6B9DC2",
  violet: "#8a6cc9",
  violetDim: "rgba(138,108,201,0.15)",
  rose: "#c94a6e",
  ember: "#c98a4a",
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

// ═══════════════════════════════════════════════════════════
// Primitives
// ═══════════════════════════════════════════════════════════
function PullQuote({ children, color = C.crimson }) {
  return (
    <div style={{
      borderLeft: `3px solid ${color}`, padding: "16px 24px",
      background: color + "10", borderRadius: "0 6px 6px 0",
      margin: "32px 0",
    }}>
      <p style={{
        fontFamily: font.body, fontSize: 17, fontStyle: "italic",
        color: C.creamHigh, lineHeight: 1.7, margin: 0,
      }}>{children}</p>
    </div>
  );
}

function InsightCallout({ label, children, color = C.amber }) {
  return (
    <div style={{
      padding: "14px 18px", background: C.card,
      border: `1px solid ${C.border}`, borderRadius: 6,
      margin: "24px 0",
    }}>
      <div style={{
        fontFamily: font.mono, fontSize: 9, color, letterSpacing: "0.12em",
        textTransform: "uppercase", marginBottom: 6,
      }}>{label}</div>
      <div style={{ fontFamily: font.mono, fontSize: 11, color: C.creamMid, lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

function StatInline({ label, value, color = C.creamMid }) {
  return (
    <span style={{ fontFamily: font.mono, fontSize: 12 }}>
      <span style={{ color: C.creamDim }}>{label}: </span>
      <span style={{ color }}>{value}</span>
    </span>
  );
}

// ═══════════════════════════════════════════════════════════
// Timeline Moment — the giant numeral + narrative block
// ═══════════════════════════════════════════════════════════
function Moment({ year, age, title, instrument, color, children }) {
  return (
    <div style={{ marginBottom: 64, position: "relative" }}>
      {/* Giant numeral */}
      <div style={{
        fontFamily: font.mono, fontSize: 96, fontWeight: 700,
        color: color + "12", lineHeight: 0.85, marginBottom: -20,
        userSelect: "none", position: "relative", zIndex: 0,
      }}>
        {year}
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, paddingLeft: 4 }}>
        {/* Date + age */}
        <div style={{
          fontFamily: font.mono, fontSize: 11, color,
          letterSpacing: "0.08em", marginBottom: 6,
        }}>
          Age {age} · {instrument}
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: font.body, fontSize: 24, fontWeight: 400, fontStyle: "italic",
          color: C.cream, margin: "0 0 16px 0", lineHeight: 1.3,
        }}>
          {title}
        </h2>

        {/* Crimson divider */}
        <div style={{ height: 2, width: 40, background: color, opacity: 0.4, marginBottom: 20 }} />

        {/* Narrative body */}
        <div style={{
          maxWidth: 680, fontFamily: font.body, fontSize: 15, color: C.creamMid,
          lineHeight: 1.8, letterSpacing: "0.01em",
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Transition — connective tissue between moments
// ═══════════════════════════════════════════════════════════
function Transition({ children }) {
  return (
    <div style={{
      textAlign: "center", padding: "20px 0 32px",
      fontFamily: font.mono, fontSize: 10, color: C.creamDim,
      letterSpacing: "0.15em",
    }}>
      <div style={{ width: 1, height: 32, background: C.creamDim, opacity: 0.2, margin: "0 auto 12px" }} />
      {children}
      <div style={{ width: 1, height: 32, background: C.creamDim, opacity: 0.2, margin: "12px auto 0" }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════
export default function ChronicleArc() {
  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream, fontFamily: font.body }}>
      {/* Noise */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 740, margin: "0 auto", padding: "64px 24px 80px" }}>
        {/* Template tag */}
        <div style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 40 }}>
          DDL · CHRONICLE · The Measurement Arc
        </div>

        {/* Date label */}
        <div style={{ fontFamily: font.mono, fontSize: 12, color: C.crimson, letterSpacing: "0.1em", marginBottom: 8 }}>
          2001 – 2025
        </div>

        {/* H1 */}
        <h1 style={{
          fontFamily: font.body, fontSize: 42, fontWeight: 400, fontStyle: "italic",
          color: C.cream, margin: "0 0 8px 0", lineHeight: 1.15,
          letterSpacing: "-0.01em",
        }}>
          The Measurement Arc
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: font.body, fontSize: 17, fontStyle: "italic", color: C.creamMid,
          margin: "0 0 4px 0", lineHeight: 1.5,
        }}>
          Eight instruments measured the same person across twenty-four years.
          Every one of them was correct. None of them told the whole story.
        </p>

        {/* Metadata */}
        <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, marginBottom: 8, marginTop: 12 }}>
          Cross-reference: <span style={{ color: C.violet }}>DOSSIER: The Operator</span> · <span style={{ color: C.amber }}>CONSOLE: Dimensional Map</span> · <span style={{ color: C.amber }}>CONSOLE: Catnip Map</span>
        </div>

        {/* Crimson divider */}
        <div style={{ height: 2, width: 48, background: C.crimson, marginTop: 16, marginBottom: 56, opacity: 0.5 }} />

        {/* ═══════════════════════════════════════════════ */}
        {/* PROLOGUE */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{
          maxWidth: 680, fontFamily: font.body, fontSize: 15, color: C.creamMid,
          lineHeight: 1.8, marginBottom: 48,
        }}>
          <p style={{ margin: "0 0 16px 0" }}>
            Standardized tests don't know they're part of a story. They measure a single variable at a single moment 
            and produce a number that enters a file. The file goes in a drawer. The person who sat for the test 
            walks out of the room and keeps becoming whoever they're becoming, 
            and nobody checks whether the number and the person still match.
          </p>
          <p style={{ margin: 0 }}>
            This is what it looks like when you open the drawer twenty-four years later and lay all the numbers on the same table.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* 2001 — PSAT SOPHOMORE */}
        {/* ═══════════════════════════════════════════════ */}
        <Moment year="2001" age="15" title="The Baseline Nobody Looked At" instrument="PSAT/NMSQT · Sophomore Administration" color={C.blue}>
          <p style={{ margin: "0 0 16px 0" }}>
            Olathe South High School. A Tuesday morning in October. A fifteen-year-old fills in bubbles with 
            a number two pencil because the school told him to, and nobody — not him, not the counselor who files the report, 
            not the parents who glance at the envelope — understands that the numbers contain a prediction.
          </p>

          <InsightCallout label="The Numbers" color={C.blue}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              <StatInline label="Verbal" value="49/80 · 63rd %ile" />
              <StatInline label="Math" value="56/80 · 81st %ile" color={C.green} />
              <StatInline label="Writing" value="54/80 · 76th %ile" />
            </div>
          </InsightCallout>

          <p style={{ margin: "0 0 16px 0" }}>
            Math leads. Verbal trails. Writing sits in the middle. The selection index is 159 — 67th percentile. 
            Solid but not spectacular. Under "major," the form says <em>undecided</em>. 
            Under "career," the form says <em>undecided</em>. The numbers have an opinion about this. 
            Nobody asks them.
          </p>
          <p style={{ margin: 0 }}>
            That math score — 81st percentile, not even his best year yet — is the beginning of a line 
            that will arc upward, peak, and then fall in a way that only makes sense if you also have 
            a document from 2005 that doesn't exist yet.
          </p>
        </Moment>

        <Transition>ONE YEAR LATER</Transition>

        {/* ═══════════════════════════════════════════════ */}
        {/* 2002 — PSAT JUNIOR */}
        {/* ═══════════════════════════════════════════════ */}
        <Moment year="2002" age="16" title="The Peak He Didn't Know Was a Peak" instrument="PSAT/NMSQT · Junior Administration" color={C.blue}>
          <p style={{ margin: "0 0 16px 0" }}>
            Same school. Same Tuesday-morning pencil ritual. But the numbers have moved.
          </p>

          <InsightCallout label="Year-Over-Year" color={C.blue}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              <StatInline label="Verbal" value="59/80 · 83rd %ile (+20)" color={C.blue} />
              <StatInline label="Math" value="65/80 · 92nd %ile (+11)" color={C.green} />
              <StatInline label="Writing" value="53/80 · 64th %ile (-12)" />
            </div>
          </InsightCallout>

          <p style={{ margin: "0 0 16px 0" }}>
            Math has climbed to the 92nd percentile. Top decile. The SAT equivalent range is 610–700. 
            Verbal jumped twenty percentile points to the 83rd. Writing flatlined, but everything else surged. 
            Selection index: 177 — 85th percentile. Under "major," the form now says <em>business</em>. 
            Under "career," it says <em>business/admin</em>.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            Here is a sixteen-year-old in the 92nd percentile for math who has decided — or been decided for — 
            that business is the direction. Not engineering. Not computer science. Not anything that would keep 
            the math line climbing. Business.
          </p>
          <p style={{ margin: 0 }}>
            He doesn't know this is the peak. The 92nd percentile in math will never come back. 
            Something else will have to explain why.
          </p>
        </Moment>

        <Transition>THREE YEARS LATER</Transition>

        {/* ═══════════════════════════════════════════════ */}
        {/* 2005 — STRONG INTEREST INVENTORY */}
        {/* ═══════════════════════════════════════════════ */}
        <Moment year="2005" age="18" title="The Instrument That Named Everything" instrument="Strong Interest Inventory · College Edition" color={C.amber}>
          <p style={{ margin: "0 0 16px 0" }}>
            February 19, 2005. University of Kansas. An eighteen-year-old freshman sits for a vocational interest 
            inventory — hundreds of questions about what he likes, what he'd choose, what sounds appealing. 
            Not what he's good at. What he <em>wants</em>.
          </p>

          <PullQuote color={C.amber}>
            Theme Code: CES — Conventional, Enterprising, Social. Top match: Accountant. 
            The instrument looked at a teenager and said: you will process data, manage systems, 
            and work with people in structured environments. It was right about the next twenty years.
          </PullQuote>

          <p style={{ margin: "0 0 16px 0" }}>
            Computer Activities scored Very High — the single strongest basic interest scale on the entire inventory. 
            Higher than anything in Conventional, higher than Organizational Management, higher than Religious Activities 
            (which came in second at 63). The instrument said: you love computers.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            But Computer Programmer/Systems Analyst scored 19. Dissimilar. The inventory was drawing a distinction 
            that would hold for two decades: you love working with computers, but not the way programmers do. 
            You love it the way accountants and office managers do. Data processing, not software engineering.
          </p>

          <InsightCallout label="The Floor Scores" color={C.rose}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              <StatInline label="Artistic (theme)" value="31 · Very Little Interest" color={C.rose} />
              <StatInline label="Writing" value="31 · Very Little Interest" color={C.rose} />
              <StatInline label="Art" value="33 · Very Little Interest" color={C.rose} />
              <StatInline label="Math Interest" value="51 · Average" color={C.creamDim} />
            </div>
          </InsightCallout>

          <p style={{ margin: "0 0 16px 0" }}>
            Writing: 31. Art: 33. Overall Artistic: 31. The floor. The instrument concluded that this person 
            had virtually no interest in creative expression. A person who would eventually write a memoir, 
            launch a Substack, build a publication-quality website, and design a six-template content architecture 
            scored at the absolute bottom for creative interest at eighteen.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            And Math — the domain where the PSAT had measured him at the 92nd percentile just three years earlier — 
            came in at 51. Dead average. The aptitude was still there. The interest was already leaving.
          </p>
          <p style={{ margin: 0 }}>
            The Strong Interest Inventory was correct about everything it measured. It was measuring 
            what an eighteen-year-old wanted. It could not measure what a thirty-eight-year-old would build.
          </p>
        </Moment>

        <Transition>THREE YEARS LATER</Transition>

        {/* ═══════════════════════════════════════════════ */}
        {/* 2008 — GMAT */}
        {/* ═══════════════════════════════════════════════ */}
        <Moment year="2008" age="21" title="The Inversion" instrument="GMAT · Unofficial Score Report" color={C.green}>
          <p style={{ margin: "0 0 16px 0" }}>
            April 25, 2008. The GMAT. The last standardized aptitude test he will ever take. 
            And the numbers have crossed.
          </p>

          <InsightCallout label="The Crossover" color={C.green}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              <StatInline label="Verbal" value="75th %ile" color={C.blue} />
              <StatInline label="Quantitative" value="35 scaled · 44th %ile" color={C.crimson} />
              <StatInline label="Total" value="650 · 82nd %ile" color={C.green} />
            </div>
          </InsightCallout>

          <p style={{ margin: "0 0 16px 0" }}>
            Quantitative: 44th percentile. Down from the 92nd at sixteen. A forty-eight-point drop in five years. 
            Verbal: 75th percentile. Up from the 63rd at fifteen. The lines have crossed. 
            The math brain and the verbal brain have switched positions, and nobody notices because the total — 
            650, 82nd percentile — is perfectly fine. Perfectly fine hides the inversion.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            The Strong Interest Inventory, taken right in the middle of this arc, explains the mechanism. 
            Math interest was average at eighteen. The aptitude was present; the interest was not. 
            Aptitude follows interest the way a river follows gravity — not overnight, not obviously, 
            but inevitably. By twenty-one, the math score has fallen to match the math interest. 
            Verbal, meanwhile, was being used constantly — in essays, case studies, accounting memos, 
            the daily grammar of a business school education — and it climbed.
          </p>

          <PullQuote color={C.green}>
            The score report went to the University of Kansas Graduate School of Business, 
            program: Masters in Accounting and Information Systems. The literal intersection of 
            the two highest-scoring interest domains from the Strong. Nobody planned that. 
            But the instruments agree.
          </PullQuote>
        </Moment>

        <Transition>2004 – 2009 · THE TRANSCRIPT</Transition>

        {/* ═══════════════════════════════════════════════ */}
        {/* 2004-2009 — KU TRANSCRIPT */}
        {/* ═══════════════════════════════════════════════ */}
        <Moment year="2009" age="23" title="Where the GPA Spikes" instrument="University of Kansas · Official Transcript" color={C.green}>
          <p style={{ margin: "0 0 16px 0" }}>
            Five years of coursework. Two degrees. 141 credit hours. The undergraduate GPA settles at 3.35. 
            The graduate GPA: 3.69. The improvement isn't random. It tracks exactly one variable: 
            how closely the coursework aligns with the CES interest profile.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            The early semesters — liberal arts prerequisites, general education, courses that don't yet map 
            to any particular identity — hover around 3.0. The business core stabilizes in the low 3.3s. 
            But the graduate courses, where the curriculum narrows to exactly the intersection 
            the Strong predicted — accounting, information systems, fraud examination, systems analysis — 
            that's where the transcript finds its ceiling.
          </p>

          <InsightCallout label="Peak Courses" color={C.green}>
            Fraud Examination/Forensic Accounting: A · Systems Analysis and Design: A · 
            Business Computer Networking: A · Contemporary IT Topics: A · 
            Specialized Accounting Practices: A · Risk Analysis: A · Basketball: A, A
          </InsightCallout>

          <p style={{ margin: 0 }}>
            The A's cluster where accounting meets technology. The B's cluster where they don't. 
            IT Project Management: B. Information Security: B. These are technology courses 
            without the accounting anchor. The transcript is drawing the same line the Strong drew — 
            Computer Activities: Very High, but not like a programmer. Like an accountant.
          </p>
        </Moment>

        <Transition>ELEVEN YEARS LATER</Transition>

        {/* ═══════════════════════════════════════════════ */}
        {/* 2020 — NEUROFEEDBACK */}
        {/* ═══════════════════════════════════════════════ */}
        <Moment year="2020" age="33" title="The Brain Map" instrument="qEEG Neurofeedback Baseline" color={C.ember}>
          <p style={{ margin: "0 0 16px 0" }}>
            May 1, 2020. Two years sober. The fog hasn't fully lifted. A neurofeedback practitioner 
            runs a quantitative EEG and produces the first document in this collection 
            that looks at the brain directly rather than at what comes out of it.
          </p>

          <PullQuote color={C.ember}>
            The brain is over-aroused. Excessive High Beta in the Parietal region, possibly linked 
            to a head injury at seventeen. There are no ADD/ADHD indicators in the ratios. 
            The cognitive fog is caused by anxiety, not attention deficit.
          </PullQuote>

          <p style={{ margin: "0 0 16px 0" }}>
            This is the first time the mechanism gets named. The brain spins — anxiety creates a loop 
            that processes and reprocesses until the system exhausts itself, producing depressive symptoms 
            that look like depression but are actually the aftermath of anxiety. 
            Stress-precipitated depression, not chemical depression. The practitioner's note about Adderall 
            is blunt: "like giving Red Bull to a bull."
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            But there are two other findings that won't make sense until the rest of the instruments arrive. 
            First: the brain is left-hemisphere dominant in the Temporal area. Logic over emotive. 
            May present as introversion or social awkwardness. Second: elevated Alpha in the Occipital lobe. 
            High creativity.
          </p>
          <p style={{ margin: 0 }}>
            The practitioner pauses on this. The creativity, they note, doesn't manifest through traditional 
            artistic channels. It manifests through coping strategies, high adaptability, creative use of technology, 
            pattern recognition, and connecting dots — "which seems to validate his skills in accounting/auditing." 
            The Strong scored Artistic at 31. The brain scan found creativity running through the exact channels 
            the vocational inventory couldn't see.
          </p>
        </Moment>

        <Transition>THREE YEARS LATER</Transition>

        {/* ═══════════════════════════════════════════════ */}
        {/* 2023 — PSYCH EVAL */}
        {/* ═══════════════════════════════════════════════ */}
        <Moment year="2023" age="37" title="The Full Architecture" instrument="Sharpe Psychological Services · Comprehensive Evaluation" color={C.rose}>
          <p style={{ margin: "0 0 16px 0" }}>
            July and August of 2023. Two sessions. Eleven assessments. The most comprehensive measurement 
            event in the collection — the one that maps everything the other instruments could only gesture at.
          </p>

          <InsightCallout label="Diagnoses" color={C.rose}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <StatInline label="F31.81" value="Bipolar II Disorder" color={C.rose} />
              <StatInline label="F90.0" value="ADHD — Predominantly Inattentive" color={C.rose} />
            </div>
          </InsightCallout>

          <p style={{ margin: "0 0 16px 0" }}>
            The neurofeedback baseline said no ADHD. This evaluation says yes — seven of nine inattentive criteria met. 
            They agree on the core mechanism: an over-aroused brain producing anxiety that cascades into depression, 
            with cognitive fog downstream. They disagree on whether the inattention is the disease or the symptom.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            The Brown Executive Function scales settle it functionally, if not diagnostically. 
            Focus: T=74, 98th percentile for dysfunction. Activation: T=70, 95th percentile. 
            Memory: T=70, 95th percentile. Five of six domains above the threshold for significant problems. 
            The total composite sits at the 95th percentile for executive function impairment. 
            Whatever you call it — ADHD, anxiety-driven over-arousal, both — the functional deficit is real 
            and it is comprehensive.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            The IVA Continuous Performance Test adds a dimension the other instruments missed. 
            Auditory response control: 82 — mild impairment. Visual: 107 — average. 
            Auditory attention: 91. Visual: 110. The brain processes better through the eyes than through the ears. 
            The Vineland confirms it from the other direction: Expressive communication — speaking — 
            is a significant weakness at the 10th base rate percentile. Receptive and Written are both fine.
          </p>

          <PullQuote color={C.rose}>
            Sensation Avoiding: 50/75. Much More Than Most People. The only sensory quadrant 
            at the extreme classification. The operator actively structures environments 
            to reduce stimulation. The DDL aesthetic — dark backgrounds, controlled palettes, 
            monospaced type, structured hierarchy — is not a design preference. 
            It is a functional expression of a documented sensory processing pattern.
          </PullQuote>

          <p style={{ margin: "0 0 16px 0" }}>
            And then the Vineland's strangest finding: Daily Living Skills at the 13th percentile, 
            with Personal self-sufficiency at the 2nd. But Socialization at the 68th percentile — 
            the strongest domain. Community functioning is a strength. Coping Skills are a strength.
          </p>
          <p style={{ margin: 0 }}>
            The profile that emerges is someone who struggles with the mundane architecture of personal maintenance 
            but excels at navigating systems and social structures. Someone who would need to build external systems 
            to compensate for what the internal ones can't sustain. Someone who would eventually describe himself as 
            "medicated, calibrated, and defrictionated" — not as a tagline, but as a literal description 
            of a compensatory architecture for a documented adaptive behavior gap.
          </p>
        </Moment>

        <Transition>TWO YEARS LATER</Transition>

        {/* ═══════════════════════════════════════════════ */}
        {/* 2025 — APPLE MUSIC */}
        {/* ═══════════════════════════════════════════════ */}
        <Moment year="2025" age="38" title="The Instrument He Chose" instrument="Apple Music Replay · Full Year" color={C.violet}>
          <p style={{ margin: "0 0 16px 0" }}>
            Every instrument before this one was administered. A proctor, a clinician, a practitioner 
            with a clipboard decided what to measure and when. The subject sat and answered. 
            This is the first instrument in the collection that the subject generated himself, 
            9,400 minutes at a time, without knowing he was being measured at all.
          </p>

          <InsightCallout label="The Signal" color={C.violet}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              <StatInline label="ILLENIUM" value="9,400 min · 156.7 hours · 43.8%" color={C.crimson} />
              <StatInline label="Polyphia" value="2,534 min · 42.2 hours" color={C.violet} />
              <StatInline label="Combined" value="55.6% of all artist time" color={C.amber} />
            </div>
          </InsightCallout>

          <p style={{ margin: "0 0 16px 0" }}>
            ILLENIUM is melodic bass. Structured builds that arc from tension to release. 
            Dense layered sound that fills the entire auditory field. Predictable emotional payoff — 
            you always know the drop is coming, you always know it will resolve to harmony. 
            For a brain documented as over-aroused with Sensation Avoiding at 50/75, 
            this isn't enjoyment. It's functional regulation. The wall of sound displaces chaotic environmental input. 
            The build-drop-resolve compresses the Bipolar II affective cycle into four minutes of controlled catharsis. 
            The high BPM provides external activation energy for a system where Activation sits at the 95th percentile 
            for dysfunction.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            Polyphia is math rock. Odd time signatures, polyrhythmic interlocking, technically complex 
            but structurally precise. No lyrics — which means no language processing through 
            the mildly impaired auditory channel. The Occipital Alpha creativity that the neurofeedback found — 
            pattern recognition, connecting dots, creative technology use — Polyphia is that exact neural pathway 
            expressed as music. It is the auditory equivalent of building a star schema.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            And then there are six pop-punk artists in the top twenty — Good Charlotte, New Found Glory, 
            Yellowcard, The All-American Rejects, Simple Plan, Angels & Airwaves. All from the 2001–2005 window. 
            The years when the PSATs were being taken and the Strong was being administered. 
            The formative measurement period. The music that was playing when the numbers were being generated 
            is still playing twenty years later, anchoring a temporal emotional baseline.
          </p>

          <PullQuote color={C.violet}>
            The listening architecture is heavily curated. Self-built playlists. A personal station 
            at 15,750 minutes. The operator does not passively receive music. 
            He builds auditory environments the same way he builds governance systems — 
            structured, controlled, optimized for a specific cognitive outcome.
          </PullQuote>
        </Moment>

        {/* ═══════════════════════════════════════════════ */}
        {/* EPILOGUE */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ marginTop: 48 }}>
          <div style={{
            height: 1, background: C.crimson, opacity: 0.2, marginBottom: 40,
          }} />

          <div style={{
            maxWidth: 680, fontFamily: font.body, fontSize: 16, color: C.creamHigh,
            lineHeight: 1.8,
          }}>
            <p style={{ margin: "0 0 20px 0" }}>
              Fourteen documents. Eight instruments. Twenty-four years.
            </p>
            <p style={{ margin: "0 0 20px 0" }}>
              The PSAT said the math was exceptional. The Strong said the interest was average. 
              The GMAT confirmed the aptitude had followed the interest down. 
              The transcript showed the GPA rising as the coursework narrowed to match the interest profile. 
              The neurofeedback found creativity running through channels no vocational inventory could measure. 
              The psych eval mapped the executive function deficits that explained why 
              externalized systems weren't optional. And the music — the only instrument the subject chose — 
              showed the brain self-selecting exactly the sonic architecture its neurology required.
            </p>
            <p style={{ margin: "0 0 20px 0", fontStyle: "italic" }}>
              Every instrument was correct about what it measured. 
              None of them could see what the others saw. 
              The life that connected them was the only document that held all the data.
            </p>
            <p style={{ margin: 0 }}>
              MindFrame is the framework that governs the system the measurements explain. 
              Dropdown Logistics is the studio that builds the tools the framework requires. 
              The methodology — Chaos → Structured → Automated — is what happens 
              when a Conventional-Enterprising-Social operator with markedly atypical executive function, 
              high pattern-recognition creativity, and extreme sensation avoidance 
              decides to stop compensating unconsciously and start engineering consciously.
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* TIMELINE INDEX */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ marginTop: 56 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
            Measurement Timeline
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { year: "2001", label: "PSAT Sophomore", type: "Aptitude", color: C.blue },
              { year: "2002", label: "PSAT Junior", type: "Aptitude", color: C.blue },
              { year: "2005", label: "Strong Interest Inventory", type: "Vocational", color: C.amber },
              { year: "2008", label: "GMAT", type: "Aptitude", color: C.blue },
              { year: "2004–09", label: "KU Transcript", type: "Academic", color: C.green },
              { year: "2020", label: "Neurofeedback Baseline", type: "Neurological", color: C.ember },
              { year: "2023", label: "Psych Evaluation (Sharpe)", type: "Clinical", color: C.rose },
              { year: "2025", label: "Apple Music Replay", type: "Behavioral", color: C.violet },
            ].map((m, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 16, padding: "10px 0",
                borderBottom: i < 7 ? `1px solid ${C.border}` : "none",
              }}>
                <span style={{ fontFamily: font.mono, fontSize: 13, fontWeight: 600, color: m.color, width: 60 }}>{m.year}</span>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.color, opacity: 0.6, flexShrink: 0 }} />
                <span style={{ fontFamily: font.body, fontSize: 14, color: C.cream, flex: 1 }}>{m.label}</span>
                <span style={{
                  fontFamily: font.mono, fontSize: 9, padding: "2px 8px", borderRadius: 3,
                  background: m.color + "18", color: m.color,
                }}>{m.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════ */}
        {/* ACCENT FOOTER */}
        {/* ═══════════════════════════════════════════════ */}
        <div style={{ marginTop: 56 }}>
          <div style={{
            height: 2, borderRadius: 1, marginBottom: 12,
            background: `linear-gradient(90deg, ${C.blue}, ${C.amber}, ${C.green}, ${C.ember}, ${C.rose}, ${C.violet})`,
          }} />
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em" }}>
              Dropdown Logistics · CHRONICLE · The Measurement Arc
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>
              dropdownlogistics.com · 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
