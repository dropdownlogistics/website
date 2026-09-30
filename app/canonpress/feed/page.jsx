// CanonPress Feed — the render side of `canonpress-renderable/1`.
//
// CANONPRESS-RENDER-BOUNDARY-v1.md (Demi Strand / DDL-3011, 2026-08-16) named
// this seat as the one building the render side against the frozen contract.
// Built 2026-09-30 per Reed Vane (DDL-2004) relaying the Operator's direct go
// ("she should build one"). Data comes from data/canonpress-snapshot.json,
// generated at build time by scripts/generate-canonpress-snapshot.mjs — this
// page never talks to canonpress.py directly, and never reads a live source.
//
// The six rules from the boundary doc, and where each is held in THIS file:
//   1. Empty artifacts = correct result, never a fallback.  -> EmptyState
//   2. Read failure = fail loud, no degraded partial output. -> UnavailableState
//   3. `exposure` is not in the payload and is never rendered. (nothing to do
//      here — the snapshot script already strips it if it ever reappears)
//   4. `withheldCount` is logged, never rendered. It is read from the
//      snapshot ONLY inside a server-side console.log below, never passed
//      into JSX. Grep this file for "withheldCount" if that claim needs
//      checking later — it should appear exactly once, in a console.log.
//   5. `author_claimed` renders with its qualification intact — see
//      <Byline>, which renders the raw field, never a tidied "by X" form.
//   6. `body_markdown` already excludes the RULE B attribution line
//      (stripped upstream); this file does not attempt to re-strip one.
'use client';
import Link from 'next/link';
import BackButton from '@/components/BackButton';
import { C as PALETTE } from '@/lib/canonpress-palette';
import snapshot from '@/data/canonpress-snapshot.json';

const C = { ...PALETTE, crimsonDim: 'rgba(178,53,49,0.12)' };

// Rule 4, held here: this is the one and only place withheldCount is read,
// and it goes to the server console at build time, never into JSX. If this
// number ever changes unexpectedly between builds, that's worth someone
// noticing — just not from the rendered page.
if (typeof window === 'undefined' && snapshot?.available) {
  console.log(
    `[canonpress-feed] rendering ${snapshot.artifacts.length} public artifact(s); ` +
    `${snapshot.withheldCount} withheld (server-log only, per boundary Rule 4)`
  );
}

// ---------------------------------------------------------------- markdown
//
// Deliberately hand-written, not a dependency. The actual body_markdown
// content in this contract uses a small, known set of constructs — #/##
// headings, **bold**, *italic*, `inline code`, and "- " list items. No
// blockquotes, no tables, no nested lists appear in real data as of this
// build. Adding a general-purpose markdown library for six constructs is
// exactly the kind of dependency this repo (12 total, deliberately lean)
// doesn't carry elsewhere. If the contract starts emitting something this
// renderer doesn't handle, that shows up as literal `**` or `#` characters
// on the page — visibly wrong, not silently wrong, and cheap to extend here
// when it actually happens rather than guessed at now.

function renderInline(text, keyBase) {
  // Order matters: inline code first (so ** inside `code` isn't touched),
  // then bold, then italic.
  const parts = [];
  let rest = text;
  let i = 0;
  const pattern = /`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*/;
  while (rest.length) {
    const m = pattern.exec(rest);
    if (!m) { parts.push(rest); break; }
    if (m.index > 0) parts.push(rest.slice(0, m.index));
    if (m[1] !== undefined) {
      parts.push(<code key={`${keyBase}-${i++}`} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.88em', background: C.card, padding: '1px 5px', borderRadius: 3 }}>{m[1]}</code>);
    } else if (m[2] !== undefined) {
      parts.push(<strong key={`${keyBase}-${i++}`} style={{ color: C.cream, fontWeight: 700 }}>{m[2]}</strong>);
    } else if (m[3] !== undefined) {
      parts.push(<em key={`${keyBase}-${i++}`}>{m[3]}</em>);
    }
    rest = rest.slice(m.index + m[0].length);
  }
  return parts;
}

function renderMarkdown(md) {
  const lines = (md || '').split('\n');
  const blocks = [];
  let listBuf = [];
  const flushList = (key) => {
    if (!listBuf.length) return;
    blocks.push(
      <ul key={`ul-${key}`} style={{ margin: '0 0 18px', paddingLeft: 22, fontFamily: "'Source Serif 4', serif", fontSize: '1.02rem', color: C.dim, lineHeight: 1.75 }}>
        {listBuf.map((item, i) => <li key={i} style={{ marginBottom: 6 }}>{renderInline(item, `li-${key}-${i}`)}</li>)}
      </ul>
    );
    listBuf = [];
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      listBuf.push(trimmed.slice(2));
      return;
    }
    flushList(idx);
    if (!trimmed) return; // blank line: paragraph break, nothing to render
    if (trimmed.startsWith('## ')) {
      blocks.push(<h3 key={idx} style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.25rem', color: C.cream, letterSpacing: '-0.01em', margin: '28px 0 12px' }}>{renderInline(trimmed.slice(3), idx)}</h3>);
    } else if (trimmed.startsWith('# ')) {
      blocks.push(<h2 key={idx} style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.6rem', color: C.cream, letterSpacing: '-0.015em', margin: '0 0 16px' }}>{renderInline(trimmed.slice(2), idx)}</h2>);
    } else {
      blocks.push(<p key={idx} style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.02rem', color: C.dim, lineHeight: 1.75, margin: '0 0 18px' }}>{renderInline(trimmed, idx)}</p>);
    }
  });
  flushList('end');
  return blocks;
}

// ------------------------------------------------------------------- parts

function Byline({ artifact }) {
  // Rule 5, held here: `author_claimed` renders exactly as the contract
  // states it, including its qualification. Do not extract a name and drop
  // the rest — "Elias Mercer / Seat 1003" and "D.K. Hale (Operator)" are the
  // full claim, and per reasoning-record/1 §6-A1 a directory path is an
  // attribution, not a proof. This field says "claimed" for a reason.
  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: C.steel, letterSpacing: '0.06em', marginBottom: 6 }}>
      {artifact.series} {artifact.artifact_id} &middot; claimed: {artifact.author_claimed}
      {artifact.authored_at ? ` · ${artifact.authored_at}` : ''}
    </div>
  );
}

function ArtifactCard({ artifact }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `2px solid ${C.crimson}`, borderRadius: 8, padding: '32px 30px', marginBottom: 20 }}>
      <Byline artifact={artifact} />
      <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.5rem', color: C.cream, letterSpacing: '-0.015em', margin: '0 0 20px' }}>
        {artifact.title}
      </h2>
      <div>{renderMarkdown(artifact.body_markdown)}</div>
    </div>
  );
}

function EmptyState() {
  // Rule 1, held here: this is a CORRECT result, never a failure and never a
  // fallback to placeholder or cached content. Said as plainly on the page
  // as it is in the code.
  return (
    <div style={{ border: `1px dashed ${C.border}`, borderRadius: 8, padding: '48px 32px', textAlign: 'center' }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: C.steel, letterSpacing: '0.04em' }}>
        Nothing is currently cleared for publication.
      </div>
      <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.92rem', color: C.steel, marginTop: 10 }}>
        This is a correct, empty result — not an error, and not a placeholder for &ldquo;coming soon.&rdquo;
      </div>
    </div>
  );
}

function UnavailableState({ reason }) {
  // Rule 2, held here: the source could not be read at build time, and this
  // page says so explicitly rather than rendering nothing (indistinguishable
  // from Rule 1's honest empty state) or degrading to partial output.
  return (
    <div style={{ border: `1px solid ${C.crimson}`, borderRadius: 8, padding: '32px 28px', background: 'rgba(178,53,49,0.06)' }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.crimson, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
        Source unavailable at build time
      </div>
      <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.92rem', color: C.dim, lineHeight: 1.6 }}>
        {reason || 'No reason recorded.'}
      </div>
    </div>
  );
}

// -------------------------------------------------------------------- page

export default function CanonPressFeed() {
  const available = !!snapshot?.available;
  const artifacts = available ? (snapshot.artifacts || []) : [];

  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton href="/canonpress" label="canonpress" />

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '88px 24px 40px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.crimson, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 24 }}>
          CanonPress &middot; canonpress-renderable/1
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 20 }}>
          Feed
        </div>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.02rem', color: C.dim, lineHeight: 1.75, marginBottom: 8 }}>
          Every CanonPress artifact currently cleared for publication, rendered from one
          template against the governed contract — not one hand-authored page per artifact.
        </div>
        {snapshot?.capturedAt && (
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.steel, letterSpacing: '0.04em' }}>
            as of {snapshot.capturedAt}
          </div>
        )}
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px 100px' }}>
        {!available ? (
          <UnavailableState reason={snapshot?.reason} />
        ) : artifacts.length === 0 ? (
          <EmptyState />
        ) : (
          artifacts.map((a) => <ArtifactCard key={a.artifact_id} artifact={a} />)
        )}
      </div>

      <div style={{ borderTop: `1px solid ${C.border}`, maxWidth: 760, margin: '0 auto', padding: '24px', textAlign: 'center' }}>
        <Link href="/canonpress" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.steel, textDecoration: 'none', letterSpacing: '0.1em' }}>
          &larr; back to CanonPress
        </Link>
      </div>
    </div>
  );
}
