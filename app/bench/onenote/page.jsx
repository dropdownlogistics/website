'use client';
import { ToolPage } from "../../../components/ToolPage";

const TIPS = [
  {
    id: "BN-ON-001",
    tier: "Day One",
    title: "Paste Without the Mess",
    desc: "Ctrl+Shift+V strips formatting on paste. Every Microsoft app. Every time.",
    tip: "Press Ctrl+Shift+V instead of Ctrl+V.\nWorks in OneNote, Word, Excel, Outlook — the entire Office suite.",
    why: "The default paste pulls in fonts, colors, and backgrounds from whatever you copied. Especially brutal when pasting from web pages or emails. Most people right-click and hunt for 'Keep Text Only' every single time instead.",
    time_saved: "2 min/day",
  },
  {
    id: "BN-ON-002",
    tier: "Day One",
    title: "Kill Auto-Formatting on Day One",
    desc: "OneNote's defaults fight you. Turn them off immediately.",
    tip: "File → Options → Proofing → AutoCorrect Options → AutoFormat As You Type\nUncheck everything. All of it.",
    why: "OneNote auto-creates numbered lists, converts URLs to hyperlinks, and reformats text constantly. Most people fight this for months before discovering the setting exists. It's buried three menus deep by design.",
    time_saved: "5 min/day",
  },
  {
    id: "BN-ON-003",
    tier: "Day One",
    title: "Set a Default Notebook",
    desc: "Quick Notes is a graveyard. Route everything intentionally.",
    tip: "File → Options → Save & Backup → Default Notebook\nPick your real notebook. All captures go somewhere intentional.",
    why: "The 'Quick Notes' section is where OneNote dumps everything captured via shortcuts or clipping. It becomes a graveyard fast. By the time you have 200 unsorted clips, the organizational debt is too high to fix.",
    time_saved: "Hours of cleanup prevented",
  },
  {
    id: "BN-ON-004",
    tier: "Flow",
    title: "Dock to Desktop",
    desc: "OneNote as a persistent sidebar. No Alt-Tabbing.",
    tip: "View → Dock to Desktop\nOneNote snaps to the right side of your screen. Whatever you're working on in other apps, OneNote is visible.",
    why: "The View menu is the last place people look. 'Dock to Desktop' sounds like a display setting, not a productivity feature. Once you use it, you won't go back.",
    time_saved: "10 min/day",
  },
  {
    id: "BN-ON-005",
    tier: "Flow",
    title: "Search Inside Images",
    desc: "OneNote OCRs everything. Your screenshots are searchable.",
    tip: "Paste any screenshot. Press Ctrl+F and search for text that appears inside the image.\nOneNote runs OCR automatically in the background.",
    why: "Nobody reads the feature list. This has been there since 2010. It means any screenshot of a document, email, or report becomes a searchable note.",
    time_saved: "Varies — but it finds things",
  },
  {
    id: "BN-ON-006",
    tier: "Sharp",
    title: "Copy Link to Specific Paragraph",
    desc: "Link directly to a paragraph, not just a page.",
    tip: "Right-click on any paragraph or bullet → Copy Link to Paragraph\nShare it. They click and land exactly there.",
    why: "Everyone knows you can link to a OneNote page. Almost no one knows you can link to a specific paragraph within a page. Game-changer for shared notebooks.",
    time_saved: "Saves back-and-forth navigation",
  },
  {
    id: "BN-ON-007",
    tier: "Flex",
    title: "Linked Notes Capture Source Automatically",
    desc: "Your notes remember where they came from.",
    tip: "Dock OneNote → click 'Linked Notes' in the ribbon.\nEverything you type while viewing a document or web page automatically captures a link back to the source.",
    why: "This feature has existed since 2010 and Microsoft barely markets it. Most OneNote users don't know their notes can have provenance. Click the link icon next to any note later and it opens the exact page you were viewing.",
    time_saved: "15 min/session",
  },
];

export default function OneNotePage() {
  return (
    <ToolPage
      tool="OneNote"
      label="MICROSOFT"
      icon="📓"
      tagline="Stop fighting the app. Start using it."
      tips={TIPS}
    />
  );
}
