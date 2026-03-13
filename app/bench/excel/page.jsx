'use client';
import { ToolPage } from "../../../components/ToolPage";

const TIPS = [
  {
    id: "BN-XL-001",
    tier: "Day One",
    title: "Ctrl+T: Turn Any Range Into a Table",
    desc: "Tables auto-expand formulas. Columns get names. Everything downstream gets easier.",
    tip: "Select any data range → Ctrl+T → Enter.\nNew rows automatically inherit formulas. Formulas use column names like [Revenue] instead of C2:C100.",
    why: "Most people keep working with plain ranges. Tables are the foundation of every modern Excel pattern — XLOOKUP, Power Query, dynamic arrays all work better inside them.",
    time_saved: "Prevents hours of formula drag-down",
  },
  {
    id: "BN-XL-002",
    tier: "Day One",
    title: "Ctrl+` : Show All Formulas",
    desc: "Toggle between values and formulas. Audit your work in one keystroke.",
    tip: "Press Ctrl+` (grave accent, top-left of keyboard).\nToggles the entire sheet between showing values and showing formulas.",
    why: "Most people go to Formulas → Show Formulas in the ribbon. The shortcut is instant. Use it before sending any workbook — it catches hardcoded values hiding where formulas should be.",
    time_saved: "30 sec per audit",
  },
  {
    id: "BN-XL-003",
    tier: "Flow",
    title: "Double-Click the Fill Handle",
    desc: "Fill a formula to the end of your data without dragging.",
    tip: "Enter a formula. See the small square at the bottom-right corner of the cell.\nDouble-click it. Formula fills down to match the length of adjacent data.",
    why: "Everyone drags. Dragging on a 10,000-row dataset is miserable. Double-click fills instantly. Requires adjacent data in the next column to detect the range.",
    time_saved: "2 min per large dataset",
  },
  {
    id: "BN-XL-004",
    tier: "Flow",
    title: "Ctrl+Arrow: Jump to the Edge of Data",
    desc: "Navigate large datasets without scrolling.",
    tip: "From any cell: Ctrl+Arrow jumps to the last non-empty cell in that direction.\nCtrl+Shift+Arrow selects the entire range.",
    why: "People scroll. Scrolling in a 50,000-row file is a choice. Ctrl+Arrow gets you there in one keystroke. Ctrl+Shift+Arrow selects the range for copying, formatting, or formula application.",
    time_saved: "Constant",
  },
  {
    id: "BN-XL-005",
    tier: "Flow",
    title: "Flash Fill: Ctrl+E",
    desc: "Excel learns the pattern. You don't have to write a formula.",
    tip: "In the column next to your data, type the first example of what you want.\nPress Ctrl+E. Excel detects the pattern and fills the rest.",
    why: "Most tutorials tell you to use the Data tab. The shortcut is Ctrl+E. Works for name splitting, phone number formatting, email extraction — anything with a consistent pattern.",
    time_saved: "2 min per 100-row dataset",
  },
  {
    id: "BN-XL-006",
    tier: "Sharp",
    title: "Paste Special → Transpose",
    desc: "Rotate data. Turn a row into a column in three keystrokes.",
    tip: "Copy a row or column → Ctrl+Alt+V → check Transpose → OK.\nThe data rotates 90 degrees.",
    why: "People rekey data or build complicated formulas to transpose. Paste Special has always had it. Works on any range.",
    time_saved: "5–30 min per transpose",
  },
  {
    id: "BN-XL-007",
    tier: "Sharp",
    title: "LET(): Name Your Variables",
    desc: "Stop writing the same calculation three times in one formula.",
    tip: "=LET(myRange, A1:A100, filtered, FILTER(myRange, myRange>0), SUM(filtered))\nDefine variables once, use them throughout the formula.",
    why: "LET() landed in Excel 365 with no ribbon button and minimal fanfare. It eliminates helper columns and makes complex formulas readable. If you're nesting the same range reference five times, you need LET().",
    time_saved: "20 min per complex workbook",
  },
  {
    id: "BN-XL-008",
    tier: "Flex",
    title: "FORMULATEXT() + HYPERLINK(): Self-Documenting Workbooks",
    desc: "The formula explains itself. In the cell next to it.",
    tip: "=FORMULATEXT(C2) — returns the formula in C2 as a text string.\nCombine with =HYPERLINK() to create a clickable link back to the source cell.\nBuilds an auto-generated formula audit table.",
    why: "Requires knowing two obscure functions and thinking about documentation before anyone asks for it. The people who build this are the ones whose workbooks get maintained after they leave.",
    time_saved: "15 min per complex workbook — and hours for whoever inherits it",
  },
];

export default function ExcelPage() {
  return (
    <ToolPage
      tool="Excel"
      label="MICROSOFT"
      icon="📊"
      tagline="Where the real work happens."
      tips={TIPS}
    />
  );
}
