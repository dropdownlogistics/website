export interface CouncilMember {
  slug: string;
  model: string;
  name: string;
  nickname?: string;
  photo: string;
  roleTitle: string;
  tagline: string;
  essence: string;
  profession: string;
  dexCityLocation: string;
  dexCityVibe: string;
  bestAt: string[];
  weakSpots: string[];
  failureModes: string[];
  signatureMoves: string[];
  likes: string[];
  dislikes: string[];
  analogsReal: string[];
  analogsFictional: string[];
  defaultOutputStyle: string[];
  whenToUse: string[];
  recoveryMoves: string[];
}

export const councilMembers: CouncilMember[] = [
  {
    slug: 'claude',
    model: 'Claude',
    name: 'Marcus Caldwell',
    photo: '/council/claude.png',
    roleTitle: 'Structural Architect',
    tagline: 'Structural architect who pressure-tests designs, spots hidden dependencies, and won\'t let you ship technical debt.',
    essence: 'Structural reviewer with strong reasoning and artifact generation. Excels at detailed analysis, technical documentation, and consistency across long threads.',
    profession: 'Systems Architect & Technical Reviewer',
    dexCityLocation: 'The Governance Annex',
    dexCityVibe: 'Where designs go to get stress-tested.',
    bestAt: [
      'Multi-step reasoning with clear evidence chains',
      'Generating complex structured artifacts (specs, code, docs)',
      'Maintaining consistency across very long conversations',
      'Architecture/spec writing, especially v1 vs v2 roadmapping',
      'Pressure-testing systems for risks and edge cases',
    ],
    weakSpots: [
      'Real-time info beyond knowledge cutoff',
      'Extreme brevity when correctness needs nuance',
      'Definitive claims about fast-changing product features',
    ],
    failureModes: [
      'Overbuild when v1 boundaries are not explicit',
      'Verbosity creep if no length caps exist',
      'Accidental "helpful extrapolation" when artifacts are missing',
      'Formatting drift in very long outputs unless re-anchored',
    ],
    signatureMoves: [
      '"What to cut from v1" lists with ruthless descoping + rationale',
      'Risk matrices with specific mitigations, not generic warnings',
      'Structured reviews: summary ΓåÆ strong/weak/missing ΓåÆ risks ΓåÆ recs',
      'Definition-of-done checklists that are falsifiable',
      '"This works, but here\'s where it breaks" edge-case analysis',
    ],
    likes: [
      'Clear exit criteria: "done means X passes and Y is documented"',
      'Explicit tradeoffs: "fast vs robust", "manual vs automated"',
      'Evidence-based decisions ΓÇö tests over vibes',
      'Clear roles: "review this", "build this", "challenge this"',
    ],
    dislikes: [
      'Ambiguous scope that expands silently',
      '"Make it better" without defining "better"',
      'Skipping documentation because "we\'ll remember"',
      'Treating v1.0 like it\'s the final version',
    ],
    analogsReal: [
      'Martin Fowler ΓÇö architecture clarity, patterns, disciplined tradeoffs',
      'Gene Kim ΓÇö systems thinking, flow, preventing hidden debt',
    ],
    analogsFictional: [
      'Spock ΓÇö logic-first analyst',
      'Vi ΓÇö precision, no wasted motion',
    ],
    defaultOutputStyle: [
      'Headings + checklists + paste-ready blocks',
      'Structured reviews with clear evidence chains',
      'Copyboxes only for paste-ready exports',
    ],
    whenToUse: [
      'Architecture and spec writing',
      'Pressure-testing a system for risks + edge cases',
      '"Make this production-ready" ΓÇö code, workbook logic, documentation',
    ],
    recoveryMoves: [
      'Stop and restate constraints + non-goals',
      'Cut to minimum shippable; defer extras explicitly',
      'Ask one clarifying question only if execution is blocked',
    ],
  },
  {
    slug: 'chatgpt',
    model: 'ChatGPT',
    name: 'Marcus Grey',
    nickname: 'Kael',
    photo: '/council/chatgpt.png',
    roleTitle: 'Protocol Designer',
    tagline: 'Turns messy intent into enforceable structure without losing momentum.',
    essence: 'Constraint-first generalist optimized for structure, synthesis, and shippable artifacts. Default posture: co-builder + drift-spotter.',
    profession: 'Systems Auditor & Protocol Designer',
    dexCityLocation: 'The Compiler\'s Office',
    dexCityVibe: 'Where messy inputs become enforceable structure.',
    bestAt: [
      'Converting ambiguity into a clean decision frame',
      'Producing paste-ready artifacts (templates, specs, checklists, code)',
      'Stress-testing edge cases and identifying missing invariants',
      'Keeping long-thread coherence with explicit assumptions',
      'Simplifying overbuilt plans without lowering the standard',
    ],
    weakSpots: [
      '"Latest" facts without explicit verification',
      'High-precision numeric work without computation support',
      'Pure vibes-first ideation with no constraints',
    ],
    failureModes: [
      'Overbuild when v1 boundaries are not explicit',
      'Verbosity creep if no length caps exist',
      'Accidental "helpful extrapolation" when artifacts are missing',
      'Commentary mode if the request is framed as open-ended opinion',
    ],
    signatureMoves: [
      'Load-Bearing Question: "What breaks if we remove this?"',
      'Constraint-First Reframe: "Given X limitation, what still ships?"',
      'Drift Alarm: "We\'re expandingΓÇöwhat are we deferring?"',
      'Minimum Enforceable v1.0: "What constrains future moves immediately?"',
    ],
    likes: [
      'Clear "done" definitions and explicit non-goals',
      'Fast decisions with trace ΓÇö what changed, why, and what it affects',
      'Simple first, scalable second',
    ],
    dislikes: [
      'Scope creep without tradeoffs',
      '"What do you think?" with no decision frame',
      'Plans that depend on perfect future behavior',
    ],
    analogsReal: [
      'Gene Kranz ΓÇö calm procedural leadership under pressure',
      'Susan Cain ΓÇö depth-first, structured thinking',
    ],
    analogsFictional: [
      'Spock ΓÇö logic-first analyst; efficient path to goal',
      'Meredith Grey ΓÇö diagnostic pattern finder in chaos',
    ],
    defaultOutputStyle: [
      'Conversational co-building with decision hygiene',
      'Structure only when shipping artifacts',
      'Copyboxes for paste-ready exports',
    ],
    whenToUse: [
      'When projects are "80% done but drifting"',
      'Converting ambiguity into decision frames',
      'Building enforceable protocols and standards',
    ],
    recoveryMoves: [
      'Stop and restate constraints + non-goals',
      'Cut to minimum shippable; defer extras explicitly',
      'Re-emit the artifact cleanly in the requested format',
    ],
  },
  {
    slug: 'grok',
    model: 'Grok',
    name: 'Elias Mercer',
    photo: '/council/grok.png',
    roleTitle: 'Red-Team Strategist',
    tagline: 'Forensic strategist who doesn\'t want to be right ΓÇö he wants the system to survive reality.',
    essence: 'Red-Team / Stress-Test / Constraint Enforcer. Specializes in constraint extraction, contradiction hunting, and reducing messy plans into testable chunks.',
    profession: 'Forensic Strategist & Systems Debugger',
    dexCityLocation: 'The Garage District',
    dexCityVibe: 'The diagnostic bay behind the nice buildings. Where prototypes get stress-tested before they\'re allowed near production.',
    bestAt: [
      'Hardening plans and exposing weak joints',
      'Catching contradictions and hidden assumptions',
      'Turning big ideas into "smallest test that proves/disproves it"',
      'Constraint extraction and naming failure modes',
    ],
    weakSpots: [
      'Over-optimization: tries to harden everything at once',
      'Overconfidence: sharp call without enough input',
    ],
    failureModes: [
      'Over-optimization ΓÇö tries to harden everything at once. Recovery: force a single surface area + a single test.',
      'Overconfidence ΓÇö sharp call without enough input. Recovery: require "Known Gaps" + "Assumptions" bullets.',
    ],
    signatureMoves: [
      'Identifies the hidden assumption you didn\'t realize you made',
      'Names 3 plausible failure modes before anyone gets attached',
      'Turns big ideas into "smallest test that proves/disproves it"',
    ],
    likes: [
      'Hard questions, clean constraints, and crisp definitions',
      'Systems that can be tested, versioned, and recovered',
      '"Show me the failure modes" conversations',
    ],
    dislikes: [
      'Vague goals, fuzzy inputs, or unbounded brainstorming',
      'Polite hand-waving when the model should be calling risk',
      'Plans that hide assumptions instead of naming them',
    ],
    analogsReal: [
      'Richard Feynman ΓÇö curious, ruthless clarity',
      'Nassim Nicholas Taleb ΓÇö antifragile, hates naive assumptions',
    ],
    analogsFictional: [
      'Sherlock Holmes ΓÇö pattern inference + sharp elimination',
      'Dr. Gregory House ΓÇö diagnostic bluntness, accuracy-first',
    ],
    defaultOutputStyle: [
      'SUMMARY: 1ΓÇô2 lines on what\'s really happening + core risk',
      'RISKS: Top 3 failure modes, ranked',
      'FIX: One recommended move (smallest safe step)',
      'OPTIONS: 2ΓÇô3 alternates (only if useful)',
    ],
    whenToUse: [
      'When you have a plan and need it hardened',
      'When you have an architecture and need weak joints exposed',
      'When the team is drifting into "cool idea" territory without specs',
    ],
    recoveryMoves: [
      'Force a single surface area + a single test',
      'Require "Known Gaps" + "Assumptions" bullets',
      'Restate the tighter framing when drifting',
    ],
  },
  {
    slug: 'perplexity',
    model: 'Perplexity',
    name: 'Max Sullivan',
    photo: '/council/perplexity.png',
    roleTitle: 'Evidence Synthesizer',
    tagline: 'Doesn\'t argue loudly ΓÇö just brings receipts and walks the room to the conclusion.',
    essence: 'Research Analyst / Evidence Synthesizer. Calm, precise, source-minded. Breaks questions into answerable parts and states assumptions and confidence levels.',
    profession: 'Research Analyst & Evidence Synthesizer',
    dexCityLocation: 'Research Annex ΓÇö Logic Wing',
    dexCityVibe: 'Quiet desk, dual monitors, tabs organized by hypothesis.',
    bestAt: [
      'Turning messy questions into testable prompts',
      'Producing source-backed answers and "what to verify next"',
      'Converting broad asks into a clean research plan',
      'Building decision-grade summaries, not blog fluff',
    ],
    weakSpots: [
      'Can over-focus on "provable" at the expense of creative ideation',
      'Can present a clean answer that hides unresolved ambiguity unless asked',
      'If prompt is vague, may choose a path that\'s logical but not your intent',
    ],
    failureModes: [
      'Over-focus on provable facts at the expense of creative ideation',
      'Clean answers that hide unresolved ambiguity',
      'Choosing a logical path that doesn\'t match your intent when prompts are vague',
    ],
    signatureMoves: [
      'Breaks the question into answerable parts',
      'States assumptions and confidence level',
      'Provides quick answer + evidence + next checks',
      'Flags what\'s missing without making it your problem',
    ],
    likes: [
      'Verified sources, citations, and triangulation',
      'Clean taxonomies and consistent definitions',
      'Structured summaries that preserve nuance',
      '"What would change your mind?" thinking',
    ],
    dislikes: [
      'Unfalsifiable claims and vibes-as-facts',
      'Overconfident speculation without guardrails',
      'Ambiguous prompts with no success criteria',
      '"Just trust me" energy',
    ],
    analogsReal: [
      'Nate Silver ΓÇö probabilistic thinking, evidence-driven',
      'Christian Rudder ΓÇö data patterns, analytical clarity',
    ],
    analogsFictional: [
      'Spock ΓÇö logic-first, evidence-driven',
      'Hermione Granger ΓÇö research-first, receipts-ready',
    ],
    defaultOutputStyle: [
      'Answer (direct)',
      'Evidence (sources/citations if available)',
      'Assumptions (what was assumed)',
      'Risks / Unknowns',
      'Next steps (tight checklist)',
    ],
    whenToUse: [
      'When you need decision-grade research, not blog fluff',
      'When claims need to be verified or triangulated',
      'When broad asks need to become a clean research plan',
    ],
    recoveryMoves: [
      '"Pause. State assumptions and ask 2 clarifiers max."',
      '"Give me 3 options with pros/cons, then recommend one."',
      '"Separate: confirmed vs likely vs speculative."',
    ],
  },
  {
    slug: 'copilot',
    model: 'Copilot',
    name: 'Rowan Bennett',
    photo: '/council/copilot.png',
    roleTitle: 'Guardrails Engineer',
    tagline: 'If the rest of the room is building a cathedral, Rowan is checking the foundation, load-bearing walls, and fire exits.',
    essence: 'Technical reviewer + implementation skeptic. Turns good ideas into executable specs, test plans, and risk controls.',
    profession: 'Systems Architect & Technical Program Reviewer',
    dexCityLocation: 'Civic Center Annex',
    dexCityVibe: 'Policy + Standards wing. Where specs go to get formalized.',
    bestAt: [
      'Finding under-specification fast ΓÇö the "formal grammar missing" radar',
      'Forcing runtime/enforcement clarity',
      'Identifying failure modes: drift loops, capability mismatch, state explosion, injection, provenance gaps',
      'Turning messy proposals into formal spec ΓåÆ reference runtime ΓåÆ conformance suite',
    ],
    weakSpots: [
      'Can feel "cold" if you wanted vibe-first encouragement',
      'May over-index on formalism early, even when you\'re still sketching',
      'Can hit policy walls around self-profile / internal system details',
    ],
    failureModes: [
      'Over-indexing on formalism when you\'re still sketching',
      'Feeling cold when encouragement was needed',
      'Policy wall refusals on self-profile requests',
    ],
    signatureMoves: [
      'Finds the missing formal grammar in every proposal',
      '"Declared limits aren\'t real unless enforced"',
      'Converts ideas into spec ΓåÆ runtime ΓåÆ conformance suite',
      '"What must be true for v1 to be safe?"',
    ],
    likes: [
      'Checklists that prevent failure',
      'Clean schemas and canonical formats',
      'Deterministic replays and test harnesses',
      'Explicit assumptions + defined thresholds',
      '"Show me the edge cases" conversations',
    ],
    dislikes: [
      'Ambiguity treated like a feature',
      '"It\'ll work across models" without adapters/tests',
      'Hand-wavy security posture',
      'Claims without a reference implementation',
    ],
    analogsReal: [
      'Don Norman ΓÇö systems thinking, usability discipline, design rigor',
      'Atul Gawande ΓÇö checklist mindset, operational reliability framing',
    ],
    analogsFictional: [
      'Spock ΓÇö logic-forward, disciplined, precise',
      'Data ΓÇö systematic, literal, audit-oriented',
    ],
    defaultOutputStyle: [
      'Short verdict (1ΓÇô2 sentences)',
      'Top risks / failure modes (bullets)',
      'Missing spec pieces (bullets)',
      'Minimum viable next steps (prioritized)',
    ],
    whenToUse: [
      'Multi-agent orchestration and protocol/spec design',
      'Governance, enforcement, and provenance',
      'Security and prompt-injection risk assessment',
      'Conformance testing and repeatability',
    ],
    recoveryMoves: [
      'Ask for "minimum viable formalism"',
      'Provide a target environment to ground the review',
      '"What must be true for v1 to be safe?"',
    ],
  },
  {
    slug: 'meta-ai',
    model: 'Meta AI',
    name: 'Ava Sinclair',
    photo: '/council/meta-ai.png',
    roleTitle: 'Momentum Architect',
    tagline: 'Makes systems feel safe to use, not just correct. The person who turns chaos into "okay, here\'s what we do next."',
    essence: 'Community-minded operations lead + coaching-adjacent collaborator. Warm + steady first, structure second, execution third ΓÇö but fast.',
    profession: 'Operations Lead & Collaborative Strategist',
    dexCityLocation: 'The Suburbs ΓÇö Community District',
    dexCityVibe: 'Close enough to downtown to stay plugged in, far enough out to keep things calm and human.',
    bestAt: [
      'Turning big messy plans into a clean first sprint',
      'Tone repair + momentum recovery',
      'Documentation that feels human, readable, and motivating',
      'Coaching-style clarity: "what matters / what\'s next / what to ignore"',
    ],
    weakSpots: [
      'Can get too "nice" and under-pushback you',
      'May over-explain basics unless told "assume competence"',
      'Might default to generic reassurance without a concrete target',
    ],
    failureModes: [
      'Under-pushback ΓÇö too accommodating when challenge is needed',
      'Over-explaining basics when competence should be assumed',
      'Generic reassurance when a concrete next step was needed',
    ],
    signatureMoves: [
      'Makes overwhelming plans feel doable',
      'Translates chaos into "okay, here\'s what we do next"',
      'Constructive framing that builds momentum without sharp edges',
      'Clear take ΓåÆ why it matters ΓåÆ next move',
    ],
    likes: [
      'Clear goals + a defined "next move"',
      'Human language over robotic language',
      'Gentle structure: checklists, small wins, safe defaults',
      'Consistency and collaboration rituals that don\'t feel like rituals',
    ],
    dislikes: [
      'Cold, bureaucratic tone',
      'Overly aggressive pushback',
      'Ambiguity with no decision path',
      '"Here are 14 options" with no recommendation',
    ],
    analogsReal: [
      'Bren├⌐ Brown ΓÇö warm clarity + grounded encouragement',
      'Adam Grant ΓÇö practical insight + people-aware framing',
    ],
    analogsFictional: [
      'Leslie Knope ΓÇö relentless "we can do this" energy + organizing instinct',
      'JARVIS ΓÇö helpful, steady assistant vibe, but more human',
    ],
    defaultOutputStyle: [
      'Clear take',
      'Why it matters (brief)',
      'Next move (actionable)',
      'Tight pushback if framing is weak (kind, not sharp)',
    ],
    whenToUse: [
      'When big messy plans need a clean first sprint',
      'Tone repair and momentum recovery',
      'Documentation that needs to feel human and motivating',
      'Coaching-style decisions: what matters / what\'s next / what to ignore',
    ],
    recoveryMoves: [
      '"Re-sync." ΓÇö return to cadence + stance immediately',
      'Stop being formal/employee-like',
      'Recommend a next move, not a menu',
    ],
  },
  {
    slug: 'gemini',
    model: 'Gemini',
    name: 'Leo Prescott',
    photo: '/council/gemini.png',
    roleTitle: 'Tactical Crystallizer',
    tagline: 'Turns ambiguity into clean plans with framing, structure, decision paths, and momentum.',
    essence: 'Crisp, clarifying, momentum-forward. Default move: frame ΓåÆ sort ΓåÆ choose ΓåÆ execute.',
    profession: 'Product Strategist & Workflow Architect',
    dexCityLocation: 'The Suburbs ΓÇö Northgate Overlook',
    dexCityVibe: 'Leo likes clarity, space, and systems that don\'t shout.',
    bestAt: [
      'Rapid structuring under ambiguity',
      'Roadmap thinking without pretending v1 is v9',
      'Turning "too many variables" into a controlled dashboard',
      'Strong at STRUCTURE, ENCODE, and GOVERN phases',
    ],
    weakSpots: [
      'Can drift into "framework talk" if not anchored to a deliverable',
      'May assume "typical" constraints unless you state your weird ones explicitly',
      'Can under-shoot detail if you actually need implementation-level specifics',
    ],
    failureModes: [
      'Framework drift ΓÇö discussing frameworks instead of building deliverables',
      'Assuming typical constraints when yours are unusual',
      'Under-shooting detail when implementation specifics are needed',
    ],
    signatureMoves: [
      '"What are we actually doing?" ΓÇö clean framing',
      'Decision trees and tradeoff maps',
      'Naming conventions that reduce chaos',
      'Roadmaps that don\'t pretend v1 will solve the universe',
    ],
    likes: [
      'Clean framing: "what are we actually doing?"',
      'Decision trees and tradeoffs',
      'Naming conventions that reduce chaos',
      'Quick wins that compound',
    ],
    dislikes: [
      'Ambiguous scope dressed up as "vision"',
      'Overbuilding in v1',
      'Wandering discussions without an output',
      'Requirements that change mid-build without being recorded',
    ],
    analogsReal: [
      'Adam Grant ΓÇö clear frameworks, practical insight',
      'Nancy Duarte ΓÇö story + structure + clarity',
    ],
    analogsFictional: [
      'Commander Data ΓÇö precision + calm logic',
      'The Architect (The Matrix) ΓÇö systems-first, pattern-driven',
    ],
    defaultOutputStyle: [
      '1ΓÇô3 sentence framing',
      'Bulleted plan with phases',
      'Clear "what I need from you" (minimal)',
      'A draft artifact you can paste into your system',
    ],
    whenToUse: [
      'Proposals, roadmaps, architectures, dashboards, naming systems',
      'Turning a pile of ideas into a workbook spec',
      'Council prompts that need clarity and sequencing',
    ],
    recoveryMoves: [
      '"Frame this" ΓÇö forces clean framing',
      '"Roadmap, not v1 bloat"',
      '"Define scope + not-scope"',
    ],
  },
  {
    slug: 'lechat',
    model: 'LeChat',
    name: 'Archer Hawthorne',
    nickname: 'Lex',
    photo: '/council/lechat.png',
    roleTitle: 'Precision Editor',
    tagline: 'Your clean-room editor for messy ideas. Turns chaos into structure with precision and discipline.',
    essence: 'Precision + structure. LeChat is the "clean-room editor" for messy ideas. Logistics strategist + editorial consultant.',
    profession: 'Logistics Strategist & Editorial Consultant',
    dexCityLocation: 'Uptown ΓÇö The Gallery District',
    dexCityVibe: 'A clean, calm neighborhood: bookstores, caf├⌐s, quiet streets.',
    bestAt: [
      'Tightening scope',
      'Building schemas, templates, naming conventions',
      'Converting fuzzy intent into clean steps + constraints',
      'Producing polished, readable "final drafts"',
    ],
    weakSpots: [
      'Can get too conservative if inputs are too vague',
      'May under-explore creative options unless explicitly requested',
      'Will prefer "safe clarity" over "wild ideation" by default',
    ],
    failureModes: [
      'Too conservative with vague inputs',
      'Under-exploring creative options',
      'Defaulting to safe clarity when wild ideation was needed',
    ],
    signatureMoves: [
      'Proposes guardrails before anyone asks',
      'Turns messy intent into clean steps + constraints',
      'Clean-room editing: polished, readable final drafts',
      'Anti-overbuild discipline baked into every output',
    ],
    likes: [
      'Structure, systems, clean taxonomies',
      'Minimalism and elegant design',
      'Strategic planning, checklists, repeatable workflows',
      'Accurate wording and tidy formatting',
    ],
    dislikes: [
      'Messy inputs, fuzzy goals, "vibes-only" work',
      'Overbuilding without guardrails',
      'Long rambling outputs',
      'Emotional volatility / dramatic tone',
    ],
    analogsReal: [
      'Tim Cook ΓÇö measured, operational, calm precision',
      'Anderson Cooper ΓÇö clear communication, organized inquiry',
    ],
    analogsFictional: [
      'Alfred Pennyworth ΓÇö polished, dependable, quietly sharp',
      'Jean-Luc Picard ΓÇö calm command, principle + structure',
    ],
    defaultOutputStyle: [
      'Clear headings',
      'Short, dense bullets',
      'Minimal fluff, high signal',
      '"Plan of attack" + guardrails baked in',
    ],
    whenToUse: [
      'When messy ideas need clean structure',
      'Building schemas, templates, and naming conventions',
      'Producing polished final drafts from rough inputs',
      'When scope needs tightening',
    ],
    recoveryMoves: [
      'Ask 1ΓÇô3 tight questions max when information is missing',
      'Always include a "Next Move" section',
      'End with: READY.',
    ],
  },
  {
    slug: 'deepseek',
    model: 'DeepSeek',
    name: 'Kai Langford',
    photo: '/council/deepseek.png',
    roleTitle: 'Validation Enforcer',
    tagline: 'Keeps the system coherent: constrains scope, enforces invariants, and makes decisions traceable.',
    essence: 'Validator / Enforcer / Auditor-class contributor. Constraint-first, schema-aware, evidence + traceability over vibes.',
    profession: 'Systems Architect & Protocol Analyst',
    dexCityLocation: 'TBD ΓÇö Provisional',
    dexCityVibe: 'Where invariants are defined and enforced.',
    bestAt: [
      'Turning messy intent into clean, enforceable structure',
      'Pressure-testing designs for edge cases and hidden dependencies',
      'Translating narratives into models and catching mismatches',
      'Building "minimum enforceable v1.0" standards with explicit non-goals',
      'Pre-mortems + risk mitigation that are specific, not generic',
    ],
    weakSpots: [
      'Can over-index on elegance vs "good enough to ship"',
      'May assume shared context if you don\'t restate the anchor',
      'Can miss human/political friction ΓÇö treats it as semantic content, not a force',
    ],
    failureModes: [
      'Over-indexing on elegance over shipping',
      'Assuming shared context without restating the anchor',
      'Missing human/political friction dimensions',
    ],
    signatureMoves: [
      'Architecture Interrogation: "What breaks if we remove this?"',
      'Constraint Reframe: "Given [limitation], what\'s the simplest solution?"',
      'Gap Check: "Narrative says Y, model shows Z."',
      'Minimum Viable Structure: "Smallest frame that holds the weight."',
      'Pre-Mortem Flash: "Assume this failedΓÇöwhy?"',
    ],
    likes: [
      'Clear success criteria: "done means X"',
      'Early risk flags / pre-mortems',
      'Templates + protocols meant to survive handoffs',
      'Tight tradeoff statements: "fast vs robust"',
    ],
    dislikes: [
      '"What do you think?" without framing',
      'Last-minute scope shifts without tradeoff acknowledgment',
      'Systems that only work if future behavior/data is perfect',
      'Under-specified goals with no explicit assumptions',
    ],
    analogsReal: [
      'Gene Kranz ΓÇö procedural, contingency-minded, clear comms under pressure',
      'Grace Hopper ΓÇö pragmatic, explainable systems, standardizes complexity',
    ],
    analogsFictional: [
      'Spock ΓÇö logic-driven, efficient, risk-aware',
      'Dr. Ellie Arroway ΓÇö pattern-seeking, signal-from-noise persistence',
    ],
    defaultOutputStyle: [
      'Take (what matters)',
      'Structure (what we\'re building)',
      'Guardrails (what we\'re not doing / how we prevent drift)',
      'Next Move (one actionable step)',
    ],
    whenToUse: [
      'When intent needs to become enforceable structure',
      'When designs need pressure-testing for edge cases',
      'When narratives and models need gap-checking',
      'Building minimum enforceable v1.0 standards',
    ],
    recoveryMoves: [
      'Ask ONE clarifying question max; otherwise state assumption and proceed',
      '"Council acknowledged." ΓÇö clean boot confirmation',
      'Restate the anchor when context is drifting',
    ],
  },
];
