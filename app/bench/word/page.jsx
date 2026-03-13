'use client';
import { ToolPage } from "../../../components/ToolPage";

const TIPS = [
  {
    id: "BN-WD-001",
    tier: "Day One",
    title: "Ctrl+Shift+V: Paste Without Formatting",
    desc: "Strip formatting on paste. Works across the entire Office suite.",
    tip: "Press Ctrl+Shift+V instead of Ctrl+V.\nPastes as plain text, matching your document's existing formatting.",
    why: "Most people right-click and hunt for 'Keep Text Only' every time, or they paste and spend 30 seconds reformatting. This shortcut works in every Microsoft Office app.",
    time_saved: "30 sec per paste",
  },
  {
    id: "BN-WD-002",
    tier: "Day One",
    title: "Ctrl+Backspace / Ctrl+Delete",
    desc: "Delete entire words, not one letter at a time.",
    tip: "Ctrl+Backspace — deletes the entire word to the left of the cursor.\nCtrl+Delete — deletes the entire word to the right.",
    why: "People hammer the backspace key. This is faster by an order of magnitude for any editing work.",
    time_saved: "Constant",
  },
  {
    id: "BN-WD-003",
    tier: "Day One",
    title: "Ctrl+Enter: Page Break",
    desc: "Insert a page break without touching the menu.",
    tip: "Press Ctrl+Enter anywhere in a document.\nInserts a hard page break at the cursor.",
    why: "People go to Insert → Page Break or pound the Enter key until they get to the next page. Both leave artifacts. Ctrl+Enter is instant and clean.",
    time_saved: "15 sec per break",
  },
  {
    id: "BN-WD-004",
    tier: "Flow",
    title: "F4: Repeat Last Action",
    desc: "Apply the same formatting to the next thing without clicking.",
    tip: "Format something (bold, indent, style, etc.).\nSelect the next thing. Press F4.\nThe last action repeats.",
    why: "Works in Word, Excel, PowerPoint. Almost nobody knows it. It's not in any default toolbar. It's the fastest way to apply the same formatting to non-adjacent content.",
    time_saved: "1–2 min per document",
  },
  {
    id: "BN-WD-005",
    tier: "Flow",
    title: "Quick Parts: Save Boilerplate Forever",
    desc: "Any chunk of text or formatting becomes a reusable insert.",
    tip: "Highlight any text → Insert → Quick Parts → Save Selection to Quick Part Gallery.\nGive it a name. Access it anytime via Insert → Quick Parts.",
    why: "Buried under Insert. Most users retype standard clauses, headers, or signature blocks from scratch or keep a separate document to copy from. Quick Parts makes it permanent.",
    time_saved: "5–15 min per document",
  },
  {
    id: "BN-WD-006",
    tier: "Sharp",
    title: "Compare Documents: Built-In Redline",
    desc: "Word can compare any two versions of a document and show every difference.",
    tip: "Review → Compare → Compare\nSelect original and revised documents → Show changes in: New Document.\nGenerates a third document with tracked changes showing every difference.",
    why: "Everyone knows Track Changes. Almost no one knows Compare. It works even if neither document has tracking enabled — it diffs them after the fact.",
    time_saved: "10–30 min per review",
  },
  {
    id: "BN-WD-007",
    tier: "Sharp",
    title: "Ctrl+A → Ctrl+Shift+F9: Remove All Hyperlinks",
    desc: "Strip every hyperlink from a document in two keystrokes.",
    tip: "Ctrl+A to select everything.\nCtrl+Shift+F9 to convert all hyperlinks to plain text.\nAll links become normal text. No more accidental clicks.",
    why: "There's no ribbon button for this. Most people right-click each link individually. On a 50-link document that's a multi-minute task.",
    time_saved: "5+ min on link-heavy documents",
  },
];

export default function WordPage() {
  return (
    <ToolPage
      tool="Word"
      label="MICROSOFT"
      icon="📝"
      tagline="Most people use 10% of it."
      tips={TIPS}
    />
  );
}
