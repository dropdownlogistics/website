'use client';
import { ToolPage } from "../../../components/ToolPage";

const TIPS = [
  {
    id: "BN-VS-001",
    tier: "Day One",
    title: "F2: Edit Shape Text Without Double-Clicking",
    desc: "Select a shape, press F2, start typing.",
    tip: "Click any shape to select it.\nPress F2 to enter text edit mode.\nNo double-clicking required.",
    why: "Double-clicking works but it's imprecise — you often drag the shape instead. F2 is instant and consistent. Saves repeated frustration on complex diagrams.",
    time_saved: "Constant",
  },
  {
    id: "BN-VS-002",
    tier: "Flow",
    title: "Ctrl+Wheel: Zoom Centered on Cursor",
    desc: "Zoom toward where you're looking, not the page center.",
    tip: "Hold Ctrl and scroll the mouse wheel.\nZooms centered on the cursor position, not the page center.",
    why: "Default Visio zoom centers on the page. When you're working on a corner or detail, it zooms you away from your work. Ctrl+Wheel keeps you oriented.",
    time_saved: "Navigation friction eliminated",
  },
  {
    id: "BN-VS-003",
    tier: "Flow",
    title: "Layer Visibility Toggles",
    desc: "Assign shapes to layers. Toggle entire groups visible or hidden.",
    tip: "Home → Layers → assign shapes to named layers.\nToggle layer visibility from the Layers panel.\nPresent a simplified view without deleting anything.",
    why: "Most users delete shapes when they want to hide them, then recreate them. Layers let you maintain multiple presentation states in one file.",
    time_saved: "20+ min per diagram version",
  },
  {
    id: "BN-VS-004",
    tier: "Sharp",
    title: "Data-Linked Diagrams: Live Updates from Excel",
    desc: "Shapes update automatically when the spreadsheet changes.",
    tip: "Data → Link Data to Shapes.\nConnect an Excel file. Drag column values onto shapes.\nWhen the Excel data changes, refresh the diagram.",
    why: "Looks like a static import. It's live. Almost no one knows Visio can be data-driven. Turns org charts, process maps, and network diagrams into living documents.",
    time_saved: "30+ min per update cycle",
  },
  {
    id: "BN-VS-005",
    tier: "Sharp",
    title: "Export as SVG",
    desc: "Scalable export that doesn't blur at any size.",
    tip: "File → Save As → SVG format.\nOpens in any browser. Scales to any size without loss.\nEmbed in web pages, documentation, or presentations.",
    why: "Most people export as PNG or PDF. SVG is infinitely scalable and editable in any vector tool. Buried in the file type dropdown — not in the obvious export locations.",
    time_saved: "Eliminates re-export cycles",
  },
];

export default function VisioPage() {
  return (
    <ToolPage
      tool="Visio"
      label="MICROSOFT"
      icon="🗂️"
      tagline="It does more than boxes and arrows."
      tips={TIPS}
    />
  );
}
