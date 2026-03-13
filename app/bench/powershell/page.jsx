'use client';
import { ToolPage } from "../../../components/ToolPage";

const TIPS = [
  {
    id: "BN-PS-001",
    tier: "Day One",
    title: "Get-Command: Discover Commands by Pattern",
    desc: "Find any command without memorizing names.",
    tip: "Get-Command *process*\nGet-Command *file*\nGet-Command *network*\nLists every matching command. Use it before Googling.",
    why: "PowerShell has thousands of commands. Nobody memorizes them. Get-Command with a wildcard is the built-in discovery mechanism that most people skip in favor of search engines.",
    time_saved: "2 min per lookup",
  },
  {
    id: "BN-PS-002",
    tier: "Day One",
    title: "Select-Object -First N",
    desc: "Sample any output without flooding the screen.",
    tip: "Get-Process | Select-Object -First 10\nGet-ChildItem | Select-Object -First 5\nPipe anything to Select-Object -First N to preview it.",
    why: "PowerShell doesn't have 'head' like Linux. Select-Object -First is the equivalent. Essential for checking output before running something on a large dataset.",
    time_saved: "Prevents accidental mass operations",
  },
  {
    id: "BN-PS-003",
    tier: "Flow",
    title: "Out-GridView: Instant Interactive Table",
    desc: "Turn any command output into a sortable, filterable table.",
    tip: "Get-Process | Out-GridView\nGet-Service | Out-GridView\nGet-ChildItem | Out-GridView\nA GUI window opens with full sort and filter controls.",
    why: "This is one of PowerShell's most impressive features and one of its least-known. No third-party tools needed. Works with any object output.",
    time_saved: "5 min per analysis",
  },
  {
    id: "BN-PS-004",
    tier: "Flow",
    title: "Get-Member: Explore What You're Working With",
    desc: "Find every property and method of any object.",
    tip: "Get-Process | Get-Member\nGet-ChildItem | Get-Member\nShows all Properties and Methods of the objects being piped.",
    why: "PowerShell works with objects, not text. Get-Member reveals what's actually available to you. The difference between a beginner and an intermediate PowerShell user is knowing to run this first.",
    time_saved: "Eliminates documentation hunting",
  },
  {
    id: "BN-PS-005",
    tier: "Flow",
    title: "$? — Last Command Status",
    desc: "Check if the last command succeeded or failed.",
    tip: "Run a command.\nType: $?\n$true = the command succeeded.\n$false = it failed.\nUse in scripts: if ($?) { do next thing }",
    why: "Essential for scripting. Without $?, you're guessing whether each step succeeded. With it, you can build error-aware scripts that stop or branch on failure.",
    time_saved: "Prevents silent failures",
  },
  {
    id: "BN-PS-006",
    tier: "Sharp",
    title: "Get-Command -Syntax: The Fastest Syntax Reference",
    desc: "See the exact syntax of any command without opening documentation.",
    tip: "Get-Command Invoke-WebRequest -Syntax\nGet-Command Copy-Item -Syntax\nPrints the full parameter set. No browser required.",
    why: "Most people type -? or -help or open a browser. -Syntax is undocumented in most tutorials but it's the fastest way to check parameter names and structure.",
    time_saved: "20 sec per lookup",
  },
  {
    id: "BN-PS-007",
    tier: "Sharp",
    title: "Get-History + Invoke-History",
    desc: "Your session history is rerunnable by ID.",
    tip: "Get-History — shows numbered list of commands from this session.\nInvoke-History 7 — reruns command #7.\nInvoke-History 7 -WhatIf — previews it without running.",
    why: "PowerShell's history is richer than CMD's. Each command has an ID, a start time, and an end time. Invoke-History turns your session log into a replayable script.",
    time_saved: "15 sec per recall",
  },
];

export default function PowerShellPage() {
  return (
    <ToolPage
      tool="PowerShell"
      label="WINDOWS"
      icon="💙"
      tagline="More capable than you think."
      tips={TIPS}
    />
  );
}
