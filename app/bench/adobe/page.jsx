'use client';
import { ToolPage } from "../../../components/ToolPage";

const TIPS = [
  {
    id: "BN-AD-001",
    tier: "Day One",
    title: "Ctrl+Shift+F: Search Across Multiple PDFs",
    desc: "Search inside every PDF in a folder at once.",
    tip: "Press Ctrl+Shift+F (not Ctrl+F).\nSet the search location to a folder.\nAcrobat searches all PDFs in that folder and returns results with page numbers.",
    why: "Ctrl+F only searches the open document. Ctrl+Shift+F is the advanced search — almost no one knows it exists. Essential for searching a folder of reports, contracts, or policy documents.",
    time_saved: "10+ min per multi-doc search",
  },
  {
    id: "BN-AD-002",
    tier: "Day One",
    title: "OCR a Scanned PDF",
    desc: "Turn a scanned image-PDF into searchable, selectable text.",
    tip: "Tools → Enhance Scans → Recognize Text → In This File → Start.\nAcrobat runs OCR and makes the text selectable and searchable.",
    why: "Most people think OCR requires a separate tool. Acrobat has done this for years. The feature is buried under 'Enhance Scans' — not the intuitive place to look.",
    time_saved: "Entire workflow unlocked",
  },
  {
    id: "BN-AD-003",
    tier: "Flow",
    title: "Compare Two PDFs Visually",
    desc: "Acrobat diffs two PDF versions and shows every change.",
    tip: "Tools → Compare Files\nSelect old and new versions.\nAcrobat generates a side-by-side redline with every difference highlighted.",
    why: "Hidden under Tools, not in the File menu where people look. Most users print both versions and compare by eye, or use a paid third-party service. It's already in Acrobat.",
    time_saved: "10–30 min per comparison",
  },
  {
    id: "BN-AD-004",
    tier: "Flow",
    title: "Ctrl+Shift+N: Open Same PDF in Second Window",
    desc: "View two pages of the same document simultaneously.",
    tip: "With a PDF open, press Ctrl+Shift+N.\nThe same file opens in a second Acrobat window.\nArrange side by side to compare pages or cross-reference sections.",
    why: "Nobody realizes you can open the same file twice. It's faster than toggling between bookmarks when you need to reference two sections simultaneously.",
    time_saved: "5+ min per cross-reference session",
  },
  {
    id: "BN-AD-005",
    tier: "Flow",
    title: "Extract All Images at Once",
    desc: "Get every image out of a PDF without taking screenshots.",
    tip: "Tools → Export PDF → Image → JPEG (or PNG)\nChoose 'All Pages' → Export.\nEvery image in the PDF exports to a folder.",
    why: "Most people screenshot images one at a time. This exports them all at full resolution in one operation.",
    time_saved: "5 min per image-heavy document",
  },
  {
    id: "BN-AD-006",
    tier: "Sharp",
    title: "Ctrl+Shift+D: Document Properties and Metadata",
    desc: "See everything embedded in a PDF — fonts, security, author, version.",
    tip: "Press Ctrl+Shift+D.\nShows the Document Properties dialog: title, author, creation date, fonts used, security settings, and PDF version.",
    why: "Hidden metadata. Useful for auditing received documents — who made it, what tools were used, whether it's encrypted, which fonts are embedded. Not discoverable from the menus without hunting.",
    time_saved: "10 min of investigation",
  },
  {
    id: "BN-AD-007",
    tier: "Sharp",
    title: "Password-Protect Without Save As",
    desc: "Add a password to an open PDF in two clicks.",
    tip: "File → Protect Using Password\nSet open password (required to view) or permissions password (required to edit/print).\nNo 'Save As' required — applies to the current file.",
    why: "People go to File → Save As and look for security options there. The direct path is File → Protect Using Password, which most users have never seen.",
    time_saved: "2 min of menu hunting",
  },
];

export default function AdobePage() {
  return (
    <ToolPage
      tool="Acrobat"
      label="ADOBE"
      icon="📄"
      tagline="It's not just a PDF viewer."
      tips={TIPS}
    />
  );
}
