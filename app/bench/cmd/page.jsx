'use client';
import { ToolPage } from "../../../components/ToolPage";

const TIPS = [
  {
    id: "BN-CMD-001",
    tier: "Day One",
    title: "Ctrl+C Doesn't Copy — It Kills",
    desc: "In CMD, Ctrl+C interrupts the running command. Copy/paste work differently.",
    tip: "Copy from CMD: Ctrl+Insert\nPaste into CMD: Shift+Insert\nKill running command: Ctrl+C",
    why: "Everyone tries Ctrl+C to copy and wonders why their command stopped. This is the single most common CMD confusion. The shortcuts are different from every other Windows context.",
    time_saved: "Prevents constant re-runs",
  },
  {
    id: "BN-CMD-002",
    tier: "Day One",
    title: "start . — Open Current Folder in Explorer",
    desc: "One command opens Explorer to wherever you are.",
    tip: "Type: start .\nExplorer opens to the current directory.\nNo navigating through folders — you're already there.",
    why: "People navigate to the folder in Explorer separately, losing their CMD context. start . bridges both windows instantly.",
    time_saved: "30 sec per use",
  },
  {
    id: "BN-CMD-003",
    tier: "Day One",
    title: "Tab Completion — and Shift+Tab",
    desc: "Tab cycles forward through matches. Shift+Tab cycles backward.",
    tip: "Start typing a file or folder name, press Tab to cycle through matches.\nPress Shift+Tab to go backward through the list.",
    why: "Everyone knows Tab in terminals. Almost no one knows Shift+Tab. When Tab overshoots, you don't have to start over.",
    time_saved: "Constant",
  },
  {
    id: "BN-CMD-004",
    tier: "Flow",
    title: "F7: Visual Command History",
    desc: "See a popup of your recent commands. Pick one and run it.",
    tip: "Press F7.\nA popup shows your command history for the session.\nArrow keys to select, Enter to run.",
    why: "Everyone uses the Up arrow to cycle through history one command at a time. F7 shows the full list at once. Faster when you ran a command 10 commands ago.",
    time_saved: "15 sec per recall",
  },
  {
    id: "BN-CMD-005",
    tier: "Flow",
    title: "| clip — Pipe Output to Clipboard",
    desc: "Any command's output goes straight to your clipboard.",
    tip: "Add | clip to the end of any command:\ndir | clip\nipconfig | clip\ntype file.txt | clip\nOutput is in your clipboard. Paste anywhere.",
    why: "No GUI equivalent. No selecting text and copying. Just pipe and paste. Works with any command that produces text output.",
    time_saved: "1 min per capture",
  },
  {
    id: "BN-CMD-006",
    tier: "Flow",
    title: "doskey /history — Dump Full Session History",
    desc: "Print everything you've run this session to the screen.",
    tip: "Type: doskey /history\nEvery command from the current session prints to the screen.\nPipe it: doskey /history | clip to get it all in your clipboard.",
    why: "When you've been working in CMD for an hour and need to document what you did, doskey /history saves you from retracing your steps.",
    time_saved: "Documentation time",
  },
  {
    id: "BN-CMD-007",
    tier: "Sharp",
    title: "findstr /s /i — Recursive Text Search",
    desc: "Search for text across all files in a folder and its subfolders.",
    tip: "findstr /s /i \"search term\" *.txt\n/s = recursive (search subfolders)\n/i = case-insensitive\nReplace *.txt with *.* for all file types.",
    why: "findstr documentation is dense and the flags are unintuitive. Most people use Windows Search or grep in other environments. findstr is already on every Windows machine.",
    time_saved: "5+ min per search",
  },
];

export default function CMDPage() {
  return (
    <ToolPage
      tool="CMD"
      label="WINDOWS"
      icon="⬛"
      tagline="The terminal that's already on your machine."
      tips={TIPS}
    />
  );
}
