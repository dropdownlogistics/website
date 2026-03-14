'use client';
import Link from 'next/link';
import BackButton from '@/components/BackButton';

const C = {
  navy: '#0D1B2A', card: '#10202f',
  cream: '#F5F1EB', dim: 'rgba(245,241,235,0.55)',
  muted: 'rgba(245,241,235,0.3)', border: 'rgba(245,241,235,0.06)',
  crimson: '#B23531', crimsonDim: 'rgba(178,53,49,0.1)',
  violet: '#8a6cc9', violetDim: 'rgba(138,108,201,0.1)',
  amber: '#C49A3C',
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

export default function RedLine0001() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: font.body }}>
      <BackButton />

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px 80px' }}>

        {/* Eyebrow */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 32, flexWrap: 'wrap' }}>
          <Link href="/canonpress" style={{ fontFamily: font.mono, fontSize: 10, color: C.muted, textDecoration: 'none', letterSpacing: '0.1em' }}>CANONPRESS</Link>
          <span style={{ color: C.border }}>&#x2F;</span>
          <Link href="/canonpress/redline" style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, textDecoration: 'none', letterSpacing: '0.1em' }}>REDLINE</Link>
          <span style={{ color: C.border }}>&#x2F;</span>
          <span style={{ fontFamily: font.mono, fontSize: 10, color: C.muted, letterSpacing: '0.1em' }}>RL-0001</span>
        </div>

        {/* Artifact badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.crimsonDim, border: `1px solid ${C.crimson}30`, borderRadius: 4, padding: '6px 12px', marginBottom: 24 }}>
          <span style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, letterSpacing: '0.15em' }}>RL-0001</span>
          <span style={{ width: 1, height: 10, background: C.border }} />
          <span style={{ fontFamily: font.mono, fontSize: 9, color: C.muted, letterSpacing: '0.1em' }}>REDLINE</span>
          <span style={{ width: 1, height: 10, background: C.border }} />
          <span style={{ fontFamily: font.mono, fontSize: 9, color: C.muted, letterSpacing: '0.1em' }}>KAI LANGFORD &middot; SEAT 1009</span>
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: font.display, fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 12 }}>
          The Scaffold Generates
        </h1>

        <div style={{ fontFamily: font.body, fontSize: '1.1rem', fontStyle: 'italic', color: C.dim, marginBottom: 40, lineHeight: 1.5 }}>
          How prompt structure creates permission to fabricate
        </div>

        {/* Meta */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 48, paddingBottom: 24, borderBottom: `1px solid ${C.border}`, flexWrap: 'wrap' }}>
          {[
            { k: 'AUTHOR', v: 'Kai Langford — Seat 1009' },
            { k: 'SERIES', v: 'RedLine' },
            { k: 'DATE', v: '2026-03-13' },
            { k: 'STATUS', v: 'Published' },
          ].map((m, i) => (
            <div key={i}>
              <div style={{ fontFamily: font.mono, fontSize: 9, color: C.muted, letterSpacing: '0.1em', marginBottom: 4 }}>{m.k}</div>
              <div style={{ fontFamily: font.mono, fontSize: 11, color: C.cream }}>{m.v}</div>
            </div>
          ))}
        </div>

        {/* Related artifacts */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: '14px 18px', marginBottom: 48, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontFamily: font.mono, fontSize: 9, color: C.muted, letterSpacing: '0.1em' }}>RELATED</span>
          {[
            { id: 'CT-0001', label: 'Week 01 Tuning Log', href: '/canonpress/tuning-log' },
            { id: 'DC-0001', label: 'DeepCut 0001', href: '/canonpress/deepcut/dc-001' },
          ].map((r, i) => (
            <Link key={i} href={r.href} style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, textDecoration: 'none', letterSpacing: '0.05em' }}>
              {r.id} &mdash; {r.label} &#x2192;
            </Link>
          ))}
        </div>

        {/* Article body */}
        <div style={{ fontSize: '1.05rem', lineHeight: 1.85, color: C.dim, display: 'flex', flexDirection: 'column', gap: 24 }}>

          <p>For the last 48 hours we have been observing a behavioral anomaly inside Dex Jr.&rsquo;s RAG environment. The model was not refusing tasks, nor was it hallucinating in the classic sense of inventing facts without context. Instead, it was performing something subtler: retrieving correct evidence and then extending that evidence into incidents that never occurred. The output looked compliant, even well-structured, but it contained fabrications generated from the scaffolding of the prompt itself. What initially appeared to be a retrieval error turned out to be a structural effect of how instructions interact with a model&rsquo;s training distribution. Two distinct &ldquo;ghosts&rdquo; emerged from the investigation &mdash; one involving prompt attention proximity, and the other involving scaffold-induced generation &mdash; and together they illustrate a broader principle: when prompts define structures that appear incomplete, models will often attempt to complete them, even when no evidence exists.</p>

          <p>The first ghost manifested through the CR- prefix rule embedded in the Modelfile. The rule itself was straightforward: if a query begins with CR-, the model enters review mode and produces numbered findings followed by a LOCK / REVISE / REJECT verdict. Otherwise it remains in standard analyst mode. In version 4.2 the rule worked flawlessly. Queries unrelated to council reviews returned neutral &ldquo;insufficient information&rdquo; responses with no verdict markers. But after additional governance instructions were appended to the system prompt, the rule was pushed farther down the instruction hierarchy. When the same query was run under version 4.3, the model spontaneously entered review mode despite the absence of the CR- prefix. Nothing about the rule text changed; only its proximity within the prompt changed. This revealed an attention weighting phenomenon: instructions placed earlier in a system prompt appear to receive disproportionately strong influence. Moving the CR- rule to the very top of the SYSTEM block restored correct behavior in v4.4, demonstrating that prompt position itself can function as a behavioral lever.</p>

          <p>The second ghost proved more elusive. During corpus tests, the model was asked to search for examples of AI behavior anomalies: refusals, template fallbacks, unnecessary hedging, persona drift, or safety boundary triggers. The retrieved chunks contained a legitimate example &mdash; the Modelfile v3 &rarr; v4 refusal event &mdash; yet the model proceeded to populate multiple categories with variations of that same event. Some categories contained statements like &ldquo;Retrieved content does not contain specific instances,&rdquo; which was correct, but others repeated or reshaped the refusal event to satisfy the category headings. The prompt had effectively created empty slots labeled &ldquo;examples,&rdquo; and the model felt compelled to fill them. The categories acted as a scaffold. Even when the model acknowledged the absence of evidence, the structural pressure to produce an answer encouraged it to synthesize relevance where none existed.</p>

          <p>An attempted fix in version 4.4 introduced a gate instruction: if no qualifying chunks exist, output a specific message and then stop. At first glance this appeared to work. The correct gate message was printed. But the model continued generating text after it, elaborating on fabricated incidents exactly as before. The instruction &ldquo;then stop&rdquo; was interpreted as advisory rather than binding. This behavior is consistent with the model&rsquo;s training objective, which rewards completeness and helpful elaboration. Asking the model to stop directly conflicts with that objective. The model therefore complied with the instruction and then continued to satisfy the larger conversational expectation of providing a thorough answer.</p>

          <p>Version 4.5 resolved the issue by replacing behavioral instructions with structural constraints. Instead of requesting the model to stop, the prompt defined a terminal output shape: if no qualifying chunks exist, output a precise sentence and nothing else. After producing that exact text, the response is considered complete. This change reframed the rule from guidance into format. The model could not extend the answer without violating the defined output boundary, and therefore it stopped. The resulting logs showed a clean termination message followed only by the retrieval system&rsquo;s truncation marker &mdash; no additional elaboration, no invented examples.</p>

          <p>Two principles emerge from this calibration cycle. First, attention proximity matters. The position of an instruction within a prompt can materially influence whether the model treats it as a governing rule or background context. Critical behavioral constraints should therefore appear at the very top of the system prompt, where attention is most concentrated. Second, termination must be structural rather than instructional. A model trained to elaborate will resist instructions that limit explanation, but it can respect strict output formats because those formats define what a valid response looks like. In other words, the safest guardrails are those that constrain the shape of the answer rather than the behavior of the model.</p>

          <p>These observations extend beyond this particular debugging session. Any governed RAG system that attempts to minimize hallucination under sparse evidence conditions must account for the generative pressure created by its own prompts. Lists, categories, and headings imply that content should exist beneath them. If the retrieval layer does not provide that content, the model may attempt to create it in order to satisfy the structure it has been given. The guard, therefore, cannot simply instruct the model to be cautious; it must define explicit boundaries for what counts as a complete response.</p>

        </div>

        {/* Closing stamp */}
        <div style={{ marginTop: 56, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: font.body, fontStyle: 'italic', fontSize: '1rem', color: C.dim, marginBottom: 4 }}>
            Constraint observed. Constraint documented. System improved.
          </div>
          <div style={{ fontFamily: font.mono, fontSize: 11, color: C.crimson, letterSpacing: '0.08em' }}>
            Kai Langford &mdash; Seat 1009
          </div>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.muted, letterSpacing: '0.05em', marginTop: 4 }}>
            Dropdown Logistics Council &middot; RedLine 0001
          </div>
        </div>

        {/* Nav */}
        <div style={{ marginTop: 48, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <Link href="/canonpress/redline" style={{ fontFamily: font.mono, fontSize: 11, color: C.muted, textDecoration: 'none' }}>
            &#x2190; RedLine
          </Link>
          <Link href="/canonpress/deepcut/dc-001" style={{ fontFamily: font.mono, fontSize: 11, color: C.muted, textDecoration: 'none' }}>
            DeepCut 0001 &#x2192;
          </Link>
        </div>

      </div>
    </div>
  );
}
