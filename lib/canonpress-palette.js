/**
 * CanonPress palette — the single declaration.
 *
 * WHY THIS FILE EXISTS
 *
 * Eleven pages under app/canonpress/ each declared their own `const C` colour
 * object. Demi Strand (DDL-3011) found this while building the CanonPress
 * substrate and reported it as eleven differing palettes, from a stated sample
 * of six.
 *
 * A per-key census of all eleven (REPAINT-001 §3) found the opposite of what
 * the sample suggested: 19 of 23 keys held an IDENTICAL value everywhere they
 * appeared. Nobody made a design decision eleven times. The palette was copied
 * eleven times, and four copies developed a typo.
 *
 * Those 19 keys live here now. That is the whole change: one declaration
 * instead of eleven, so the next drift has nowhere to start.
 *
 * Silas Reeve (DDL-3004), on corpus counts, in the same hour and about
 * something else entirely:
 *
 *   "A number copied to twelve places will always eventually exist in three
 *    versions, and that is a property of copying rather than of carelessness."
 *
 * Same law, rgba() instead of a chunk count. His prescription applies: make
 * the value uncomputable by hand rather than merely correct again.
 *
 * WHAT IS DELIBERATELY NOT HERE — read before adding to it
 *
 * Four keys — crimsonDim, violetDim, amberDim, greenDim — are NOT in this
 * object, and their absence is the point.
 *
 * Every one of them is an accent tint whose alpha drifted across pages:
 *
 *   crimsonDim  0.1 (x2) · 0.10 · 0.12 · 0.15 (x2)     <- 0.1 and 0.10 are the
 *   violetDim   0.1 · 0.12 · 0.15                          same colour, spelled
 *   amberDim    0.12 · 0.15                                two ways
 *   greenDim    0.12 · 0.15
 *
 * Only crimsonDim has a majority. violetDim is a three-way split across three
 * pages, and amberDim/greenDim are 1-1 ties. Picking a winner for those would
 * be ME making a design decision under cover of a mechanical refactor, and
 * changing what a live page looks like without anyone deciding to.
 *
 * So each page keeps its own value as an explicit override, tagged UNRESOLVED.
 * The consolidation ships with provably zero visual change, and the four real
 * questions are now visible in one place instead of invisible in eleven.
 *
 * To resolve: pick one alpha per accent (or one for all four — they are the
 * same design idea), move it here, and delete the overrides. That is a design
 * call and belongs to whoever owns CanonPress presentation.
 *
 * Source of the values: the eleven pages themselves, which already agreed.
 * Nothing here was invented. See surface-web/work/STANDARDIZATION-001/
 * REPAINT-001.md §3 for the full census.
 */
export const C = {
  // Ground
  navy: '#0D1B2A',
  card: '#10202f',

  // Type
  cream: '#F5F1EB',
  dim: 'rgba(245,241,235,0.72)',
  body: 'rgba(245,241,235,0.6)',
  muted: 'rgba(245,241,235,0.35)',

  // Rules
  // border was rgba(...,0.08) on all eleven pages -- unanimous, and unanimously
  // NOT what canon says. brand-tokens.json v1.1.0 defines border as 0.07.
  // Corrected 2026-08-15 under the Operator's "default to canon" ruling.
  // Unanimous disagreement with a standard is not drift; it is a copy that
  // predates or ignores the standard, and it is the harder kind to notice
  // because every instance agrees with every other instance.
  border: 'rgba(245,241,235,0.07)',
  borderSoft: 'rgba(245,241,235,0.05)', // not defined in canon; left as found

  // Accents
  crimson: '#B23531',
  crimsonLine: 'rgba(178,53,49,0.35)',
  amber: '#C49A3C',
  amberMid: 'rgba(196,154,60,0.4)',
  violet: '#8a6cc9',
  violetMid: 'rgba(138,108,201,0.4)',
  green: '#4A9E6B',
  greenMid: 'rgba(74,158,107,0.4)',
  blue: '#6B9DC2',
  steel: '#6B7B8D',
  steelLine: 'rgba(107,123,141,0.35)',
};

export default C;
