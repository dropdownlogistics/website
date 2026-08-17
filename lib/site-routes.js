/**
 * site-routes — the DDL site's own route map, as data.
 *
 * Lifted out of app/sitemap/page.jsx on 2026-08-17. It had lived there since
 * the sitemap page was built, which made it presentation rather than data and
 * meant nothing else could count it.
 *
 * That blocked a specific thing for the whole of STANDARDIZATION-001:
 * METRICS.DDL_ROUTES could only ever be a hand-written constant CHECKED against
 * this array (SD-004), never DERIVED from it. A checked constant is better than
 * an unchecked one and still worse than a number that cannot be wrong --
 * `DDL_ROUTES: '160+'` sat published against a real 200 until something
 * recounted it.
 *
 * The blocker was the colour: entries read `color: C.crimson`, pointing at the
 * sitemap page's local palette. Moving the array as-is would have dragged
 * presentation into lib/. So colours are stored here as TOKEN NAMES and the
 * page resolves them against its own palette. Data here, presentation there.
 *
 * WHAT THIS LIST IS, AND IS NOT
 *
 * It is the site's CURATED map -- the routes the site chooses to present as its
 * own surface. It is NOT an exhaustive enumeration of every route Next builds.
 * That distinction is why DDL_ROUTES renders with a "+": the count below is a
 * floor that is actually counted, not a rounded guess.
 *
 * Adding a route here is what makes it counted. Nothing recounts the filesystem.
 */
export const WINGS = [
  {
    label: 'DDL', colorToken: 'crimson', tag: 'Framework',
    tagline: 'Governance, methodology, council, memoir.',
    routes: [
      { href: '/', label: 'Landing' },
      { href: '/ddl', label: 'DDL Studio Hub' },
      { href: '/ddl/operator', label: 'Operator Profile' },
      { href: '/ddl/council', label: 'Council Hub' },
      { href: '/ddl/council/hawthorne', label: 'Seat 1001 \u2014 Archer Hawthorne' },
      { href: '/ddl/council/caldwell', label: 'Seat 1002 \u2014 Marcus Caldwell' },
      { href: '/ddl/council/mercer', label: 'Seat 1003 \u2014 Elias Mercer' },
      { href: '/ddl/council/sullivan', label: 'Seat 1004 \u2014 Max Sullivan' },
      { href: '/ddl/council/bennett', label: 'Seat 1005 \u2014 Rowan Bennett' },
      { href: '/ddl/council/sinclair', label: 'Seat 1006 \u2014 Ava Sinclair' },
      { href: '/ddl/council/prescott', label: 'Seat 1007 \u2014 Leo Prescott' },
      { href: '/ddl/council/grey', label: 'Seat 1008 \u2014 Marcus Grey' },
      { href: '/ddl/council/langford', label: 'Seat 1009 \u2014 Kai Langford' },
      { href: '/ddl/council/dex-jr', label: 'Seat 1010 \u2014 Dex Jr.' },
      { href: '/ddl/reference', label: 'Reference' },
      { href: '/ddl/site-growth', label: 'Site Growth' },
      { href: '/backend', label: 'BackEnd' },
      { href: '/brand', label: 'Brand Identity' },
      { href: '/brand/admitone', label: 'AdmitOne Brand Kit' },
      { href: '/branding', label: 'CottageHumble Brand Hub' },
      { href: '/markers', label: 'Ecosystem Markers' },
      { href: '/legacy', label: 'Operator Manifest (Legacy)' },
      { href: '/system-stack', label: 'System Stack' },
      { href: '/governance', label: 'Governance' },
      { href: '/ddl/charter', label: 'Charter' },
      { href: '/dexverse', label: 'DexVerse' },
      { href: '/dexverse/dex-jr', label: 'Dex Jr. (Seat 1010)' },
      { href: '/knowledge-vault', label: 'Knowledge Vault' },
      { href: '/methodology', label: 'Methodology' },
      { href: '/methodology/operator-loop', label: 'Operator Loop' },
      { href: '/methodology/governed-iteration', label: 'Governed Iteration' },
      { href: '/methodology/palette', label: 'Template Palette' },
      { href: '/methodology/palette/narrative', label: 'Palette Narrative' },
      { href: '/registry', label: 'Full Registry' },
      { href: '/systems', label: 'Systems Registry' },
      { href: '/standards', label: 'Standards Registry' },
      { href: '/excelligence', label: 'Excelligence' },
      { href: '/excelligence/explorer', label: 'Excelligence Explorer' },
      { href: '/council', label: 'Council Hub' },
      { href: '/council/profiles', label: 'All Council Profiles' },
      { href: '/council/profiles/claude', label: 'Claude \u2014 Seat 1002' },
      { href: '/council/profiles/chatgpt', label: 'ChatGPT \u2014 Seat 1008' },
      { href: '/council/profiles/grok', label: 'Grok \u2014 Seat 1003' },
      { href: '/council/profiles/gemini', label: 'Gemini \u2014 Seat 1007' },
      { href: '/council/profiles/perplexity', label: 'Perplexity \u2014 Seat 1004' },
      { href: '/council/profiles/copilot', label: 'Copilot \u2014 Seat 1005' },
      { href: '/council/profiles/meta-ai', label: 'Meta AI \u2014 Seat 1006' },
      { href: '/council/profiles/lechat', label: 'LeChat \u2014 Seat 1001' },
      { href: '/council/profiles/deepseek', label: 'DeepSeek \u2014 Seat 1009' },
      { href: '/council/1010', label: 'Seat 1010 \u2014 Dex Jr.' },
      { href: '/council/auto-council', label: 'AutoCouncil' },
      { href: '/council/scaling', label: 'Scaling' },
      { href: '/council/review-system', label: 'Review System' },
      { href: '/council/faq', label: 'FAQ' },
      { href: '/mindframe', label: 'MindFrame' },
      { href: '/mindframe/session', label: 'MindFrame Session' },
      { href: '/dexos', label: 'DexOS' },
      { href: '/framework/pss', label: 'Prompt Strategy System' },
      { href: '/framework/vibe-coding', label: 'Vibe Coding with Governance' },
      { href: '/guides/llm', label: 'LLM Setup Guide' },
      { href: '/projects', label: 'All Projects' },
      { href: '/projects/drinks-o-system', label: 'Drinks-O-System' },
      { href: '/projects/graceful-beauty', label: 'Graceful Beauty' },
      { href: '/projects/integrityos', label: 'IntegrityOS' },
      { href: '/projects/nomadic-notary', label: 'Nomadic Notary' },
      { href: '/projects/sprinkles', label: 'Sprinkles & Co' },
      { href: '/chronicle/the-consolidation', label: 'The Consolidation' },
      { href: '/knowledge/glossary', label: 'Trademark Glossary' },
      { href: '/knowledge/map', label: 'Knowledge Map' },
      { href: '/about', label: 'Operator Profile' },
      { href: '/social', label: 'Social Hub' },
      { href: '/ai', label: 'AI Overview' },
      { href: '/sitemap', label: 'Site Map' },
    ],
  },
  {
    label: 'D&A', colorToken: 'amber', tag: 'Analytics',
    tagline: 'Analytics hub, dashboards, recaps.',
    routes: [
      { href: '/analytics', label: 'Analytics Hub' },
      { href: '/analytics/grammarly', label: 'Grammarly \u2014 4.57M Words' },
      { href: '/analytics/tone', label: 'Tone Analysis' },
      { href: '/analytics/memoir', label: 'Memoir Analytics' },
      { href: '/analytics/dexdash', label: 'DexDash' },
      { href: '/analytics/catnip-map', label: 'Catnip Map' },
      { href: '/analytics/sensory-diet', label: 'Sensory Diet' },
      { href: '/analytics/dimensional-map', label: 'Dimensional Map' },
      { href: '/analytics/build-log', label: 'Build Log' },
      { href: '/analytics/callback-engine', label: 'Callback Engine' },
      { href: '/analytics/interview', label: 'Interview Analytics' },
      { href: '/analytics/sonic-thread', label: 'Sonic Thread' },
      { href: '/analytics/vehicle-fuel', label: 'Vehicle & Fuel' },
      { href: '/recaps', label: 'Year-End Recaps' },
      { href: '/recaps/apple-music', label: 'Apple Music Replay' },
      { href: '/recaps/annual-signal', label: 'Annual Signal Report' },
      { href: '/recaps/predictions', label: 'Prediction Audit' },
      { href: '/recaps/fast-and-furious', label: 'Fast & Furious' },
      { href: '/recaps/sons-of-anarchy', label: 'Sons of Anarchy' },
      { href: '/recaps/duolingo', label: 'Duolingo' },
      { href: '/excelligence', label: 'Excelligence \u2014 Landing' },
      { href: '/excelligence/explorer', label: 'Excelligence \u2014 Graph Explorer' },
    ],
  },
  {
    label: 'BlindSpot', colorToken: 'daGreen', tag: 'Products',
    tagline: 'Sports betting analytics. blindspot.bet.',
    routes: [
      { href: '/blindspot', label: 'BlindSpot Hub' },
      { href: '/blindspot/betting', label: 'blindspot.bet \u2014 Betting Analytics' },
      { href: '/blindspot/trading', label: 'Trading Dashboard' },
      { href: '/blindspot/steam', label: 'Steam Library Analytics' },
      { href: '/blindspot/campaign', label: 'D&D Campaign Analytics' },
      { href: '/blindspot/betting', label: 'Betting' },
      { href: '/blindspot/backtest', label: 'Backtest' },
      { href: '/blindspot/llm', label: 'LLM Setup' },
      { href: '/positionbook', label: 'PositionBook \u2014 D&A Sister Product' },
      { href: '/slopestat', label: 'SlopeStat \u2014 Rider Card' },
    ],
  },
  {
    label: 'DexVerse', colorToken: 'violet', tag: 'Lore',
    tagline: 'Origin stories, companions, lore, glossary.',
    routes: [
      { href: '/dexlore', label: 'DexLore Hub' },
      { href: '/dexlore/continuum', label: 'The Continuum' },
      { href: '/dexlore/council', label: 'Companions' },
      { href: '/dexverse/origin', label: 'DexVerse Origin' },
      { href: '/dexverse/build-log', label: 'Build Log' },
      { href: '/dexverse/howlround', label: 'Howlround' },
      { href: '/dexverse/lotr', label: 'Council of the DexVerse' },
      { href: '/mindframe', label: 'MindFrame' },
      { href: '/mindframe/session', label: 'MindFrame Session' },
      { href: '/mindframe/recursive', label: 'Recursive' },
      { href: '/mindframe/what-are-you-feeling', label: 'What Are You Feeling' },
      { href: '/knowledge/glossary', label: 'Canon Glossary' },
      { href: '/knowledge/map', label: 'Knowledge Map' },
      { href: '/methodology/palette', label: 'Template Palette' },
      { href: '/methodology/palette/narrative', label: 'Palette Narrative' },
      { href: '/other-works', label: 'Other Works' },
      { href: '/forewords', label: 'Foreword Convergence' },
    ],
  },
  {
    label: 'Story', colorToken: 'crimson', tag: 'Memoir',
    tagline: 'Little to Know Experience. Weekly on Substack.',
    routes: [
      { href: '/memoir', label: 'Little to Know Experience' },
      { href: '/memoir/reading-room', label: 'Reading Room' },
      { href: '/memoir/architecture', label: 'How the Memoir Was Built' },
      { href: '/memoir/dashboard', label: 'Memoir Dashboard' },
      { href: '/memoir/braid', label: 'The Braid' },
      { href: '/memoir/two-doors', label: 'Two Doors' },
      { href: '/memoir/basement', label: 'The Basement' },
      { href: '/memoir/false-summit', label: 'False Summit' },
      { href: '/memoir/reckoning', label: 'The Reckoning' },
      { href: '/memoir/reconciliation', label: 'Reconciliation' },
      { href: '/memoir/cleanest-day', label: 'The Cleanest Day' },
      { href: '/memoir/quiet-and-chase', label: 'Quiet and Chase' },
      { href: '/memoir/spiral-and-turning', label: 'Spiral and Turning' },
      { href: '/memoir/mask-and-cracks', label: 'Mask and Cracks' },
      { href: '/memoir/the-protocol', label: 'The Protocol' },
      { href: '/memoir/informed-patient', label: 'The Informed Patient' },
      { href: '/memoir/clinical-instrument', label: 'Clinical Instrument' },
      { href: '/memoir/psychometric-archaeology', label: 'Psychometric Archaeology' },
      { href: '/memoir/measurement-arc', label: 'Measurement Arc' },
      { href: '/memoir/substack', label: 'Substack' },
      { href: '/memoir/calendar', label: 'Release Calendar' },
      { href: '/forewords', label: 'Foreword Convergence' },
      { href: '/other-works', label: 'Other Works' },
    ],
  },
  {
    label: 'Dossiers', colorToken: 'green', tag: 'Characters',
    tagline: 'Character archive across three universes.',
    routes: [
      { href: '/dossiers', label: 'All Dossiers' },
      { href: '/dossiers/operator', label: 'The Operator' },
      { href: '/dossiers/lego', label: 'The Collection' },
      { href: '/dossiers/merrick', label: 'Merrick' },
      { href: '/dossiers/feliciano', label: 'Feliciano' },
      { href: '/dossiers/hillie', label: 'Hillie' },
      { href: '/dossiers/xuth-jr', label: 'Xuth Leafshadow Jr.' },
      { href: '/dossiers/xuth-iii', label: 'Xuth Leafshadow III' },
      { href: '/dossiers/xuth-sr', label: 'Xuth Leafshadow Sr.' },
      { href: '/dossiers/riflen', label: 'Riflen' },
      { href: '/dossiers/doc-rickets', label: 'Doc Rickets' },
      { href: '/dossiers/ash-snow-steel', label: 'Ash, Snow & Steel' },
      { href: '/dossiers/fort-joy', label: 'Fort Joy Ledger' },
      { href: '/dossiers/leafshadow-lineage', label: 'Leafshadow Lineage' },
      { href: '/dossiers/hal-style-lock', label: 'Hal Style Lock' },
      { href: '/dossiers/campaign-analytics', label: 'Campaign Analytics' },
    ],
  },
  {
    label: 'The Bench', colorToken: 'steel', tag: 'Tools',
    tagline: 'Software tips. OneNote to PowerShell.',
    routes: [
      { href: '/bench', label: 'The Bench \u2014 Landing' },
      { href: '/bench/onenote', label: 'OneNote' },
      { href: '/bench/excel', label: 'Excel' },
      { href: '/bench/word', label: 'Word' },
      { href: '/bench/visio', label: 'Visio' },
      { href: '/bench/cmd', label: 'CMD' },
      { href: '/bench/powershell', label: 'PowerShell' },
      { href: '/bench/adobe', label: 'Adobe Acrobat' },
    ],
  },
  {
    label: 'CanonPress', colorToken: 'crimson', tag: 'Publication',
    tagline: 'Governed publication. Four series.',
    routes: [
      { href: '/canonpress', label: 'CanonPress Hub' },
      { href: '/canonpress/converge', label: 'Converge' },
      { href: '/canonpress/converge/schedule', label: 'Schedule' },
      { href: '/canonpress/converge/tuning-log', label: 'Tuning Log' },
      { href: '/canonpress/redline', label: 'RedLine' },
      { href: '/canonpress/redline/rl-001', label: 'RL-001' },
      { href: '/canonpress/deepcut', label: 'DeepCut' },
      { href: '/canonpress/deepcut/dc-001', label: 'DC-001 \u2014 The Recursion Problem' },
      { href: '/canonpress/groundtruth', label: 'GroundTruth' },
      { href: '/canonpress/groundtruth/gt-002', label: "GT-002 \u2014 The Outfit Doesn't Kill the Idea" },
      { href: '/canonpress/inside-insights', label: 'InsideInsights' },
    ],
  },
  {
    label: 'AuditForge', colorToken: 'teal', tag: 'Product',
    tagline: 'Governed audit document generation.',
    routes: [
      { href: '/auditforge', label: 'AuditForge Landing' },
      { href: '/auditforge/current', label: 'Current Build' },
      { href: '/auditforge/branding', label: 'Brand Kit' },
      { href: '/auditforge/pricing', label: 'Pricing' },
    ],
  },
  {
    label: 'WorkBench', colorToken: 'crimson', tag: 'Modular OS',
    tagline: 'The modular business OS. 17 modules. One substrate.',
    routes: [
      { href: '/workbench', label: 'WorkBench Wing' },
      { href: '/workbench/pricing', label: 'Pricing' },
    ],
  },
  {
    label: 'Ledger', colorToken: 'amber', tag: 'Credentials',
    tagline: 'The verified credential layer.',
    routes: [
      { href: '/ledger', label: 'Ledger Wing' },
      { href: '/ledger/pricing', label: 'Pricing' },
    ],
  },
  {
    label: 'Excelligence', colorToken: 'amber', tag: 'Knowledge',
    tagline: 'Excel knowledge, governed and graphed.',
    routes: [
      { href: '/excelligence', label: 'Excelligence Wing' },
      { href: '/excelligence/explorer', label: 'Graph Explorer' },
      { href: '/excelligence/poster', label: 'Poster' },
      { href: '/excelligence/pricing', label: 'Pricing' },
    ],
  },
  {
    label: 'Products', colorToken: 'blue', tag: 'Concepts',
    tagline: 'Concept products and design mockups.',
    routes: [
      { href: '/products/behavioral-intelligence', label: 'Behavioral Intelligence' },
      { href: '/products/behavioral-intelligence/story', label: 'The Story Behind It' },
      { href: '/products/behavioral-intelligence/exec', label: 'Executive Concept' },
      { href: '/products/behavioral-intelligence/brief', label: 'Product Brief' },
      { href: '/prioritease', label: 'PrioritEase' },
      { href: '/work/rexcel', label: 'r/Excel' },
    ],
  },
  {
    label: 'About', colorToken: 'muted', tag: 'Info',
    tagline: 'Operator profile and social hub.',
    routes: [
      { href: '/about', label: 'Operator Profile' },
      { href: '/social', label: 'Social Hub' },
    ],
  },
];

/**
 * Derived, not stated — and counting UNIQUE hrefs, which is the whole point.
 *
 * STD-DDL-PROPERTY-001 §2.3: a constant that cannot yet derive must be checked
 * and called checked. This one derives now.
 *
 * ── The thing that made deriving worth doing ────────────────────────
 *
 * A naive `reduce((n, w) => n + w.routes.length, 0)` returns **200**. There are
 * only **185 unique routes**. Thirteen hrefs are listed under more than one
 * wing — `/excelligence` appears under DDL, D&A and Excelligence;
 * `/blindspot/betting` is listed twice inside BlindSpot alone.
 *
 * The cross-listing is **correct as navigation** — a route genuinely belongs in
 * more than one wing's menu — so WINGS is left exactly as it is. But counting
 * entries answers "how many menu items"; the published number claims "how many
 * routes." Those are different questions.
 *
 * **SD-004 raised DDL_ROUTES from '160+' to '200+' on the grounds that 200 was
 * derived and therefore true. It was derived and still wrong.** Deriving from a
 * list with duplicates gives a count of entries. The figure happened to land
 * under the real total so nothing ever contradicted it — and **a value that is
 * accidentally true is exactly what this pass exists to eliminate.**
 *
 * ENTRY_COUNT is exported alongside so the two questions stay separable and
 * nobody has to rediscover the difference.
 */
const ALL_HREFS = WINGS.flatMap((w) => w.routes.map((r) => r.href));

export const ENTRY_COUNT = ALL_HREFS.length;          // menu items — 200
export const ROUTE_COUNT = new Set(ALL_HREFS).size;   // actual routes — 185
export const WING_COUNT = WINGS.length;
