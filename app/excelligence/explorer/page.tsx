'use client';
import BackButton from '@/components/BackButton';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';

const ENTRIES = [
  {
    id: "FRM-0001", name: "XLOOKUP", type: "FRM", tier: "Intermediate",
    whatItDoes: `Retrieves a value from a range or array based on a lookup key, returning exact or approximate matches without requiring a column index number.`,
    intent: `When you need to retrieve a value from another table based on a lookup key, use XLOOKUP to return exact or approximate matches without column index dependency.`,
    example: `=XLOOKUP(A2, Products[SKU], Products[Price], "Not Found", 0)`,
    failureModes: `#N/A on missing match without if_not_found argument; silent wrong result on unsorted approximate match.`,
    performanceNotes: `Faster than INDEX/MATCH on large datasets. Binary search mode available for sorted data.`,
    governanceNotes: `Replaces VLOOKUP in all new builds. VLOOKUP should never appear in DDL workbooks.`,
    aliases: ["lookup", "search function", "reference lookup"],
    tags: ["Data Modeling", "Navigation", "Auditing"],
  },
  {
    id: "FRM-0002", name: "LET", type: "FRM", tier: "Advanced",
    whatItDoes: `Assigns names to intermediate calculation results within a formula, allowing reuse without recalculation and improving readability.`,
    intent: `When a formula requires intermediate calculations or repeated sub-expressions, use LET to name variables, improving readability, performance, and auditability.`,
    example: `=LET(
  rate, B2/100,
  base, C2*D2,
  tax, base*rate,
  base + tax
)`,
    failureModes: `Excessive nesting defeats readability purpose; unnamed intermediates reintroduce opacity.`,
    performanceNotes: `Evaluated once per LET block, not per reference. Significant performance gain on complex formulas.`,
    governanceNotes: `All formulas with 3+ logical steps should use LET. Non-negotiable in DDL workbooks.`,
    aliases: ["named variables in formulas", "formula variables"],
    tags: ["Architecture", "Performance", "Debugging"],
  },
  {
    id: "ARC-0001", name: "MAKEARRAY Engine", type: "ARC", tier: "Expert",
    whatItDoes: `Generates a dynamic grid of calculated values across two dimensions using MAKEARRAY with LAMBDA, building self-constructing matrices that eliminate manual cell-by-cell formulas.`,
    intent: `When you need to generate a dynamic grid of calculated values across two dimensions, use MAKEARRAY with LAMBDA to build self-constructing matrices that eliminate manual cell-by-cell formulas.`,
    example: `=LET(
  rows, COUNTA(RowHeaders),
  cols, COUNTA(ColHeaders),
  MAKEARRAY(rows, cols, LAMBDA(r,c,
    XLOOKUP(INDEX(RowHeaders,r), Data[Key], INDEX(Data,,c+1))
  ))
)`,
    failureModes: `Spill errors from insufficient space; LAMBDA scope confusion; performance degradation on large matrices without optimization.`,
    performanceNotes: `O(rows × cols) — scales linearly. Pre-calculate shared values in LET before MAKEARRAY.`,
    governanceNotes: `The DDL signature architecture. Used in Assurance Map, Keith's audit dashboard, BlindSpot analytics. Every DDL dashboard matrix should use this pattern.`,
    aliases: ["dynamic array engine", "matrix builder", "grid generator"],
    tags: ["Architecture", "Data Modeling", "Dashboard"],
  },
  {
    id: "ANT-0001", name: "Merged Cells", type: "ANT", tier: "Beginner",
    whatItDoes: `Merged cells combine multiple cells into one for visual alignment, breaking sorting, filtering, references, and copy-paste operations.`,
    intent: `When you need visual alignment across cells, use Center Across Selection to achieve the appearance without breaking sorting, filtering, references, or copy-paste operations.`,
    example: `Instead of Merge & Center, use: Format Cells → Alignment → Horizontal → Center Across Selection.`,
    failureModes: `Broken VLOOKUP/XLOOKUP references; sort errors; filter exclusion; copy-paste corruption; table conversion failure.`,
    performanceNotes: `No direct performance impact, but cascading failures from broken references create debugging time cost.`,
    governanceNotes: `Merged cells are banned in all DDL workbooks. Zero exceptions. The most fundamental anti-pattern in Excel architecture. "The merged cells of human interaction." — Marcus Caldwell, 2026.`,
    aliases: ["merge and center", "cell merging"],
    tags: ["Governance", "Debugging", "Architecture"],
  },
  {
    id: "FRM-0003", name: "INDEX/MATCH", type: "FRM", tier: "Intermediate",
    whatItDoes: `Combines INDEX and MATCH to retrieve values from any position in a table, supporting left-facing lookups and flexible column references without structural dependency.`,
    intent: `When you need flexible lookups in legacy workbooks or left-facing retrieval, use INDEX/MATCH to reference any column without structural dependency on table layout.`,
    example: `=INDEX(Products[Price], MATCH(A2, Products[SKU], 0))`,
    failureModes: `#N/A when match_type argument is omitted and data is unsorted; fragile column references if table structure changes; harder to audit than XLOOKUP.`,
    performanceNotes: `Comparable to XLOOKUP on modern Excel. Slightly faster on very large datasets with exact match. No binary search equivalent without MATCH type argument.`,
    governanceNotes: `Legacy pattern. Acceptable in existing workbooks. All new DDL builds should use XLOOKUP (FRM-0001). INDEX/MATCH is the bridge, not the destination.`,
    aliases: ["index match", "index match combo", "reverse lookup"],
    tags: ["Data Modeling", "Navigation", "Auditing"],
  },
  {
    id: "FRM-0004", name: "LAMBDA", type: "FRM", tier: "Expert",
    whatItDoes: `Creates custom functions by encapsulating logic into reusable, portable, testable function objects without VBA, enabling higher-order patterns like MAP, REDUCE, and MAKEARRAY.`,
    intent: `When you need to create reusable custom functions without VBA, use LAMBDA to encapsulate logic into named, portable, testable function objects.`,
    example: `=LAMBDA(price, qty, tax,
  LET(
    subtotal, price * qty,
    subtotal * (1 + tax)
  )
)(B2, C2, D2)`,
    failureModes: `Unnamed LAMBDA functions are untestable; scope confusion between LAMBDA parameters and sheet references; recursive LAMBDA without termination condition causes crash.`,
    performanceNotes: `No inherent performance cost. Performance depends on what the LAMBDA contains. Named LAMBDA functions via Name Manager enable reuse without recalculation overhead.`,
    governanceNotes: `LAMBDA is the Expert-tier gateway. Combined with LET, it enables MAKEARRAY, MAP, REDUCE, SCAN. All DDL custom functions should be LAMBDA-based, never VBA.`,
    aliases: ["custom function", "lambda function", "anonymous function"],
    tags: ["Architecture", "Performance", "Automation"],
  },
  {
    id: "FRM-0005", name: "FILTER", type: "FRM", tier: "Intermediate",
    whatItDoes: `Returns a dynamic array of rows from a range that meet specified criteria, automatically resizing as source data changes.`,
    intent: `When you need to extract a subset of rows based on criteria, use FILTER to return dynamic arrays that automatically update without helper columns.`,
    example: `=FILTER(Orders, (Orders[Region]="West") * (Orders[Amount]>1000), "No results")`,
    failureModes: `Empty result without if_empty argument throws #CALC! error; Boolean multiplication for AND logic is non-obvious; spill errors when output range is occupied.`,
    performanceNotes: `Efficient on datasets under 100K rows. For larger datasets, Power Query filtering is more appropriate. Multiple criteria via array multiplication is faster than nested IFs.`,
    governanceNotes: `Preferred over Advanced Filter in all DDL workbooks. Should be combined with structured table references (Ctrl+T) for auto-expanding ranges.`,
    aliases: ["dynamic filter", "array filter", "criteria extraction"],
    tags: ["Data Modeling", "Navigation", "Debugging"],
  },
  {
    id: "FRM-0006", name: "SUMPRODUCT", type: "FRM", tier: "Advanced",
    whatItDoes: `Multiplies corresponding elements across arrays and returns their sum, enabling multi-criteria aggregation, weighted calculations, and conditional counting without helper columns.`,
    intent: `When you need multi-criteria aggregation without helper columns, use SUMPRODUCT to evaluate array conditions and return weighted or conditional totals.`,
    example: `=SUMPRODUCT((Sales[Region]="West") * (Sales[Year]=2026) * Sales[Revenue])`,
    failureModes: `Mismatched array sizes return #VALUE!; implicit coercion of TRUE/FALSE to 1/0 is non-obvious; double-negative (--) convention obscures intent for readers.`,
    performanceNotes: `Slower than COUNTIFS/SUMIFS for simple criteria. Justified when criteria involve calculated conditions or cross-array logic that SUMIFS cannot express.`,
    governanceNotes: `Use SUMIFS/COUNTIFS when possible. Reserve SUMPRODUCT for multi-array conditional logic that single-function alternatives cannot handle. Always wrap in LET for readability.`,
    aliases: ["array multiplication", "multi-criteria sum", "weighted sum"],
    tags: ["Data Modeling", "Performance", "Auditing"],
  },
  {
    id: "PTN-0001", name: "Star Schema Layout", type: "PTN", tier: "Advanced",
    whatItDoes: `Organizes workbook data into dimension tables (descriptive attributes) and fact tables (transactional measures), enabling scalable lookups, consistent grain, and pivot-ready architecture.`,
    intent: `When you need to organize workbook data for scalable analysis, use star schema layout to separate dimension tables from fact tables, enabling governed lookups and pivot-ready architecture.`,
    example: `Dimension tables: dim_Product (ProductID, Name, Category)
Fact table: fct_Sales (Date, ProductID, Qty, Revenue)
Lookup: =XLOOKUP(fct_Sales[@ProductID], dim_Product[ProductID], dim_Product[Name])`,
    failureModes: `Grain confusion when fact table has mixed granularity; orphaned dimension keys without referential integrity checks; over-normalization creating unnecessary joins.`,
    performanceNotes: `Reduces redundancy significantly. Lookups against dimension tables are faster than repeated text matching. Pivot tables perform optimally against star schema structures.`,
    governanceNotes: `The DDL standard for any workbook with more than one entity type. All Assurance Map, BlindSpot, and dashboard workbooks use this pattern. Non-negotiable at Advanced tier and above.`,
    aliases: ["dimensional model", "fact and dimension tables", "star schema"],
    tags: ["Data Modeling", "Architecture", "Governance"],
  },
  {
    id: "KEY-0001", name: "Ctrl+T (Table Conversion)", type: "KEY", tier: "Beginner",
    whatItDoes: `Converts a data range into a structured Excel Table, enabling auto-expanding ranges, structured references, built-in filtering, consistent formatting, and Power Query readiness.`,
    intent: `When you need structured references, auto-expansion, and Power Query readiness, use Ctrl+T to convert a range into a proper Excel Table.`,
    example: `Select any cell in your data range → Ctrl+T → Confirm range → Rename table in Table Design tab.
Result: =SUM(Sales[Revenue]) instead of =SUM(B2:B100)`,
    failureModes: `Tables inside merged cell regions fail silently; duplicate headers cause auto-rename confusion; some legacy macros break with structured references.`,
    performanceNotes: `Negligible overhead. Tables auto-expand formulas and formatting to new rows. Structured references are recalculated identically to standard references.`,
    governanceNotes: `Every data range in every DDL workbook must be a Table. This is the single most impactful Excel action. The foundation everything else builds on.`,
    aliases: ["format as table", "create table", "structured table"],
    tags: ["Governance", "Data Modeling", "Automation"],
  },
  {
    id: "CON-0001", name: "Center Across Selection", type: "CON", tier: "Beginner",
    whatItDoes: `Centers text visually across multiple columns without merging cells, preserving sorting, filtering, references, and copy-paste operations.`,
    intent: `When you need centered text spanning multiple columns, use Center Across Selection to achieve visual alignment without merging cells.`,
    example: `Select cells A1:D1 → Format Cells (Ctrl+1) → Alignment tab → Horizontal → Center Across Selection → OK.
Text in A1 appears centered across A1:D1. Cells B1:D1 remain independently addressable.`,
    failureModes: `Only works with text in the leftmost cell of the selection; content in other cells is hidden (not deleted); not available from the ribbon — only via Format Cells dialog.`,
    performanceNotes: `Zero performance impact. Purely a formatting operation.`,
    governanceNotes: `The approved alternative to merged cells (ANT-0001). Mandatory in any DDL workbook where visual centering is needed. Resolves the most common formatting anti-pattern.`,
    aliases: ["center across", "center without merge", "unmerged centering"],
    tags: ["Governance", "Dashboard", "Architecture"],
  },
  {
    id: "ANT-0002", name: "Volatile Functions", type: "ANT", tier: "Intermediate",
    whatItDoes: `Functions like NOW(), TODAY(), INDIRECT(), and OFFSET() recalculate on every worksheet change regardless of whether their inputs changed, causing cascading recalculation across the entire workbook.`,
    intent: `When you encounter NOW, TODAY, INDIRECT, or OFFSET in performance-critical workbooks, use non-volatile alternatives to prevent full recalculation on every change.`,
    example: `Instead of =INDIRECT("Sheet1!A"&ROW()) use =INDEX(Sheet1!A:A, ROW())
Instead of =OFFSET(A1,ROW()-1,0) use =INDEX(A:A, ROW())
For timestamps, use VBA Worksheet_Change or manual entry instead of NOW().`,
    failureModes: `Silent performance degradation — workbook slows progressively as volatile function count increases; INDIRECT breaks on sheet rename; OFFSET recalculates entire dependency chain.`,
    performanceNotes: `A single INDIRECT triggers recalculation of every formula that depends on it, and every formula that depends on those. In large workbooks (50K+ formulas), volatile functions can add seconds to every edit.`,
    governanceNotes: `INDIRECT and OFFSET are banned in DDL workbooks. NOW() and TODAY() are permitted only in isolated display cells with no downstream formula dependencies. INDEX is the governed alternative.`,
    aliases: ["volatile formula", "NOW TODAY INDIRECT OFFSET", "recalculation trigger"],
    tags: ["Performance", "Debugging", "Governance"],
  },
  {
    id: "ARC-0002", name: "Spill-Range Architecture", type: "ARC", tier: "Advanced",
    whatItDoes: `Uses dynamic array formulas that automatically expand their output to fill adjacent cells, creating self-sizing ranges that eliminate manual range management and enable composable formula chains.`,
    intent: `When you need dynamic output that resizes automatically, use spill-range architecture to build formulas that expand without manual range management.`,
    example: `=LET(
  data, FILTER(Sales, Sales[Year]=2026),
  sorted, SORT(data, 4, -1),
  TAKE(sorted, 10)
)
This spills a top-10 revenue table that auto-updates as data changes.`,
    failureModes: `Spill errors (#SPILL!) when output range contains data; implicit intersection (@) operator silently truncates spill ranges in legacy contexts; nested spills can produce unpredictable sizing.`,
    performanceNotes: `Spill ranges recalculate as a unit. Large spill outputs (10K+ rows) can be slower than equivalent non-spill approaches. Pre-filter before spilling for optimal performance.`,
    governanceNotes: `Spill-range architecture is the foundation for all dynamic DDL outputs. Every dashboard, report, and analytics view should use spill ranges. Reserve dedicated output areas — never place data adjacent to spill zones.`,
    aliases: ["dynamic arrays", "spill formulas", "auto-expanding output"],
    tags: ["Architecture", "Data Modeling", "Dashboard"],
  },
  {
    id: "PQ-0001", name: "Power Query Load to Table", type: "PQ", tier: "Intermediate",
    whatItDoes: `Connects to external data sources, transforms data through a repeatable M-language pipeline, and loads the result into a structured Excel Table for analysis.`,
    intent: `When you need to transform and load external data into a governed Excel Table, use Power Query to create repeatable, auditable data pipelines.`,
    example: `Data tab → Get Data → From File → From Workbook → Select source
→ Transform: Remove columns, filter rows, change types, unpivot
→ Close & Load To → Table → Select destination sheet
Result: A governed, refreshable data pipeline.`,
    failureModes: `Schema drift when source file structure changes; silent type coercion errors on load; refresh failures on broken file paths; large datasets loading slowly without folding optimization.`,
    performanceNotes: `Query folding pushes transformations to the data source when possible. For large files, filter early in the pipeline. Connection-only loads reduce workbook size when data is only needed for other queries.`,
    governanceNotes: `Power Query is the governed data ingestion layer for DDL workbooks. Manual copy-paste imports are banned for any repeatable data source. All PQ outputs must load to named Tables (KEY-0001).`,
    aliases: ["get and transform", "power query", "M language ETL"],
    tags: ["Automation", "Data Modeling", "Governance"],
  },
  {
    id: "FRM-0007", name: "SORT", type: "FRM", tier: "Intermediate",
    whatItDoes: `Returns a sorted copy of a range or array by one or more columns, producing a dynamic spill range that updates automatically when source data changes.`,
    intent: `When you need to reorder data dynamically without altering the source, use SORT to produce a spill-range output sorted by any column in ascending or descending order.`,
    example: `=SORT(FILTER(Sales, Sales[Region]="West"), 4, -1)
Sorts filtered Western region sales by column 4 (Revenue) descending.`,
    failureModes: `Sort column index out of range returns #VALUE!; sorting by a column that contains mixed types (text + numbers) produces unpredictable ordering; spill errors when output range is occupied.`,
    performanceNotes: `Efficient on datasets under 50K rows. For larger datasets, sort within Power Query before loading. Chaining SORT after FILTER is the standard DDL pipeline.`,
    governanceNotes: `Preferred over manual Sort buttons for any repeatable output. SORT + FILTER + TAKE is the canonical DDL data pipeline pattern.`,
    aliases: ["dynamic sort", "array sort", "spill sort"],
    tags: ["Data Modeling", "Navigation", "Dashboard"],
  },
  {
    id: "FRM-0008", name: "UNIQUE", type: "FRM", tier: "Intermediate",
    whatItDoes: `Returns a dynamic array of distinct values from a range, automatically removing duplicates and updating as source data changes.`,
    intent: `When you need a deduplicated list for validation, dropdowns, or aggregation, use UNIQUE to extract distinct values as a self-updating spill range.`,
    example: `=SORT(UNIQUE(Sales[Region]))
Returns a sorted list of unique regions that updates as new regions appear in the data.`,
    failureModes: `Returns all rows if applied to a multi-column range without specifying by_col/exactly_once arguments; spill errors when output area is occupied; blank cells in source create blank entries in output.`,
    performanceNotes: `Fast on single columns up to 100K rows. For multi-column unique combinations, performance degrades — use Power Query DISTINCT instead.`,
    governanceNotes: `Use UNIQUE for dropdown source lists and aggregation keys. Combine with SORT for alphabetical output. Never hardcode dropdown lists that could be generated dynamically.`,
    aliases: ["distinct values", "remove duplicates formula", "unique list"],
    tags: ["Data Modeling", "Automation", "Debugging"],
  },
  {
    id: "FRM-0009", name: "CHOOSECOLS", type: "FRM", tier: "Advanced",
    whatItDoes: `Returns specified columns from an array or range, enabling column selection and reordering without helper columns or complex INDEX formulas.`,
    intent: `When you need to select or reorder specific columns from a spill range or table output, use CHOOSECOLS to shape the output array without intermediate formulas.`,
    example: `=CHOOSECOLS(FILTER(Sales, Sales[Year]=2026), 1, 3, 5)
Returns only columns 1, 3, and 5 from the filtered result.`,
    failureModes: `Column index out of range returns #VALUE!; negative indices count from the right (undocumented in some versions); combining with other spill functions can produce unexpected column counts.`,
    performanceNotes: `Negligible overhead. The column selection happens after the source array is evaluated, so performance depends on the source, not on CHOOSECOLS itself.`,
    governanceNotes: `Use CHOOSECOLS to control output shape in dashboard-facing formulas. Prevents exposing internal columns (IDs, keys) in user-visible output. Pairs with FILTER and SORT in the standard pipeline.`,
    aliases: ["column selector", "pick columns", "array column filter"],
    tags: ["Architecture", "Dashboard", "Data Modeling"],
  },
  {
    id: "FRM-0010", name: "IF/IFS", type: "FRM", tier: "Beginner",
    whatItDoes: `Evaluates a condition and returns one value if true and another if false. IFS extends this to multiple conditions without nesting, improving readability for multi-branch logic.`,
    intent: `When you need conditional logic with multiple branches, use IF or IFS to evaluate conditions and return governed outcomes without deep nesting.`,
    example: `=IF(A2>100, "High", "Low")
=IFS(A2>100, "High", A2>50, "Medium", TRUE, "Low")`,
    failureModes: `Nested IF beyond 3 levels becomes unreadable and unauditable (see ANT-0004); IFS without a TRUE catch-all returns #N/A for unmatched conditions; implicit type coercion in conditions causes silent mismatches.`,
    performanceNotes: `IFS is marginally faster than nested IF for 4+ conditions because it short-circuits on first match. Neither has meaningful performance impact at normal scale.`,
    governanceNotes: `IF is acceptable for binary conditions. For 3+ branches, use IFS or SWITCH instead of nested IF. For 5+ branches with complex logic, wrap in LET for named intermediate values.`,
    aliases: ["conditional logic", "if then else", "if statement"],
    tags: ["Debugging", "Governance", "Auditing"],
  },
  {
    id: "PTN-0002", name: "Named Ranges", type: "PTN", tier: "Beginner",
    whatItDoes: `Assigns a human-readable name to a cell, range, or formula via the Name Manager, enabling self-documenting formulas, centralized assumptions, and LAMBDA function definitions.`,
    intent: `When you need formulas to be self-documenting or assumptions to be centrally managed, use named ranges to replace cell references with meaningful labels.`,
    example: `Define: TaxRate = Sheet1!\$B\$2
Use: =Revenue * TaxRate
Instead of: =B5 * Sheet1!\$B\$2

Define: TopN = LAMBDA(data, n, TAKE(SORT(data, 1, -1), n))
Use: =TopN(Sales[Revenue], 10)`,
    failureModes: `Name conflicts across sheets when using workbook-scoped names; orphaned names after deleting source ranges; LAMBDA names not visible in formula bar (only in Name Manager).`,
    performanceNotes: `No performance impact. Named ranges resolve identically to direct cell references. LAMBDA names execute at the same speed as inline formulas.`,
    governanceNotes: `All DDL workbook assumptions (tax rates, thresholds, configuration values) must be named ranges — never hardcoded in formulas. Named ranges are the bridge between Beginner and Advanced Excel.`,
    aliases: ["name manager", "defined names", "named cells"],
    tags: ["Governance", "Architecture", "Auditing"],
  },
  {
    id: "PTN-0003", name: "Defensive Defaults", type: "PTN", tier: "Advanced",
    whatItDoes: `Wraps formulas in error-handling functions (IFERROR, IFNA, IF with ISERROR/ISNA) to prevent error propagation and provide meaningful fallback values instead of raw error codes.`,
    intent: `When a formula can encounter expected errors from missing data or boundary conditions, use defensive defaults to return governed fallback values instead of exposing raw error codes.`,
    example: `=IFERROR(XLOOKUP(A2, Ref[Key], Ref[Value]), "Not Found")
=IFNA(MATCH(A2, List, 0), 0)
=LET(
  result, VLOOKUP(A2, Data, 3, FALSE),
  IF(ISERROR(result), "—", result)
)`,
    failureModes: `IFERROR catches ALL errors including genuine bugs — masking #REF! or #VALUE! that indicate structural problems; overuse creates silent failure where errors should be visible; wrapping every formula in IFERROR is governance theater.`,
    performanceNotes: `Negligible overhead per formula. But cascading IFERROR wrappers across thousands of cells add measurable recalculation time. Apply defensively, not universally.`,
    governanceNotes: `Use IFNA for lookup-specific errors (expected). Use IFERROR sparingly and only for known failure modes. Never wrap formulas in IFERROR to hide problems you haven't diagnosed. Defensive defaults are seatbelts, not blindfolds.`,
    aliases: ["error handling", "IFERROR pattern", "formula seatbelt"],
    tags: ["Debugging", "Governance", "Auditing"],
  },
  {
    id: "KEY-0002", name: "Alt Shortcuts", type: "KEY", tier: "Beginner",
    whatItDoes: `Uses Alt key sequences to access any ribbon command without a mouse, enabling keyboard-driven workflows for paste special, formatting, navigation, and cell operations.`,
    intent: `When you need to execute ribbon commands without leaving the keyboard, use Alt shortcut sequences to maintain flow and reduce mouse-dependent friction.`,
    example: `Alt+E, S, V → Paste Values
Alt+E, S, T → Paste Formats
Alt+E, S, E → Paste Transpose
Alt+H, O, I → Auto-fit Column Width
Alt+W, V, G → Toggle Gridlines
Ctrl+1 → Format Cells dialog`,
    failureModes: `Alt sequences are version-specific — some change between Excel versions; custom ribbon modifications break expected sequences; some shortcuts conflict with Windows accessibility features.`,
    performanceNotes: `No computational impact. Efficiency gain is human, not machine — reduces context switching and mouse travel. Power users report 30-50% speed improvement on repetitive formatting tasks.`,
    governanceNotes: `Alt+E, S (Paste Special) is the most important shortcut in DDL workflows. Learn Paste Values, Paste Formats, and Paste Transpose before anything else. Brian Stoker's first impression of the Assurance Map was the Alt shortcuts.`,
    aliases: ["keyboard shortcuts", "alt key sequences", "paste special shortcut"],
    tags: ["Navigation", "Performance", "Automation"],
  },
  {
    id: "CON-0002", name: "Consistent Grain", type: "CON", tier: "Advanced",
    whatItDoes: `Enforces that every row in a data table represents the same unit of measurement — one transaction, one period, one entity — preventing aggregation errors and ambiguous analysis.`,
    intent: `When you need reliable aggregation and filtering, use consistent grain to ensure every row in a table represents exactly one instance of the same thing.`,
    example: `CORRECT: Every row = one sale (Date, Product, Qty, Revenue)
WRONG: Row 1 = daily total, Row 2 = individual sale, Row 3 = monthly summary

Test: "Can I SUM this column and get a meaningful number?"
If yes → grain is consistent. If no → grain is mixed.`,
    failureModes: `Mixed grain causes double-counting in SUM/COUNT; pivot tables produce misleading totals; XLOOKUP returns unpredictable results when grain varies within the lookup range.`,
    performanceNotes: `No direct performance impact, but mixed grain forces complex workarounds (IF-based aggregation, manual exclusions) that add calculation overhead and debugging time.`,
    governanceNotes: `Every DDL fact table must have documented grain. STD-FACT-001 enforces this — one row = one fact at one grain. Mixed grain is the most common cause of 'the numbers don't add up' in enterprise spreadsheets.`,
    aliases: ["data grain", "row granularity", "one row one thing"],
    tags: ["Data Modeling", "Governance", "Architecture"],
  },
  {
    id: "ANT-0003", name: "Hardcoded Values", type: "ANT", tier: "Beginner",
    whatItDoes: `Embeds literal numbers or text directly into formulas instead of referencing named ranges or assumption cells, creating invisible dependencies that resist auditing and updating.`,
    intent: `When you find literal values embedded in formulas, use named ranges or dedicated assumption cells to make all inputs visible, auditable, and centrally updatable.`,
    example: `WRONG: =B5 * 1.08  (what is 1.08? Tax rate? Markup? Growth?)
RIGHT: =B5 * TaxRate  (named range pointing to a labeled cell)

WRONG: =IF(A2>500, "Large", "Small")  (what is 500?)
RIGHT: =IF(A2>ThresholdAmount, "Large", "Small")`,
    failureModes: `Updating one instance misses others — the same magic number appears in 40 formulas and you change 39; audit trail is invisible — no way to see what assumptions drive the model; formula bar shows numbers without meaning.`,
    performanceNotes: `No computational difference between hardcoded values and cell references. The cost is entirely in human debugging time and audit risk.`,
    governanceNotes: `Hardcoded values are banned in all DDL formulas. Every literal number in a formula is a future audit finding. This is the anti-pattern that SOX auditors find most frequently in spreadsheet-based models.`,
    aliases: ["magic numbers", "embedded constants", "hardcoded formula values"],
    tags: ["Governance", "Auditing", "Debugging"],
  },
  {
    id: "ANT-0004", name: "Nested IFs", type: "ANT", tier: "Intermediate",
    whatItDoes: `Chains multiple IF functions inside each other to handle multi-branch logic, creating deeply indented formulas that resist reading, auditing, and modification.`,
    intent: `When you encounter nested IF statements beyond two levels, use IFS, SWITCH, or LET with structured logic to eliminate nesting and restore formula readability.`,
    example: `WRONG: =IF(A2>100, "High", IF(A2>50, "Medium", IF(A2>25, "Low", "Minimal")))
RIGHT: =IFS(A2>100, "High", A2>50, "Medium", A2>25, "Low", TRUE, "Minimal")
BETTER: =LET(v, A2, IFS(v>100, "High", v>50, "Medium", v>25, "Low", TRUE, "Minimal"))`,
    failureModes: `Each nesting level doubles the cognitive load for the reader; mismatched parentheses cause silent logic errors; modifying one branch risks breaking all downstream branches; Excel's 64-level IF nesting limit is not a target.`,
    performanceNotes: `IFS is marginally faster than nested IF due to short-circuit evaluation. LET + IFS eliminates recalculation of the test value across branches. Neither matters at small scale — the gain is in auditability.`,
    governanceNotes: `Nested IF beyond 2 levels is banned in DDL workbooks. Use IFS for 3-4 branches. Use SWITCH for value matching. Use LET + IFS for complex conditional logic. The formula should read like a decision table, not a maze.`,
    aliases: ["nested if statements", "deep if nesting", "if chains"],
    tags: ["Debugging", "Governance", "Architecture"],
  },
  {
    id: "ARC-0003", name: "Selector-Driven Reconfiguration", type: "ARC", tier: "Expert",
    whatItDoes: `Uses dropdown selectors (data validation lists) to dynamically reconfigure dashboard matrices, charts, and summary views — changing what the dashboard displays without changing any formulas.`,
    intent: `When you need a single dashboard to serve multiple views or audiences, use selector-driven reconfiguration to let dropdown choices drive the matrix dimensions, measures, and filters.`,
    example: `=LET(
  dim, INDIRECT("Fact_Sales["&SelectorValue&"]"),
  measure, INDIRECT("Fact_Sales["&MeasureSelector&"]"),
  MAKEARRAY(ROWS(UniqueEntities), ROWS(UniquePeriods), LAMBDA(r,c,
    SUMIFS(measure, dim, INDEX(UniqueEntities,r), Fact_Sales[Period], INDEX(UniquePeriods,c))
  ))
)`,
    failureModes: `INDIRECT introduces volatility (see ANT-0002) — mitigate by limiting INDIRECT to the selector reference only; selector values must exactly match column headers; adding new selector options requires updating the validation list.`,
    performanceNotes: `The MAKEARRAY recalculates fully on every selector change. For large datasets (50K+ rows), pre-calculate aggregates in a helper table and have the selector choose which pre-built view to display.`,
    governanceNotes: `The DDL signature dashboard pattern. Used in Assurance Map (6 views, 2 formulas), Keith's audit dashboard, and BlindSpot analytics. The selector is the interface. The MAKEARRAY is the engine. The fact table is the fuel.`,
    aliases: ["dynamic dashboard", "dropdown-driven matrix", "selector matrix"],
    tags: ["Dashboard", "Architecture", "Automation"],
  },
  {
    id: "PQ-0002", name: "Unpivot / Pivot", type: "PQ", tier: "Advanced",
    whatItDoes: `Transforms data between wide format (columns as categories) and tall format (rows as categories) using Power Query's Unpivot Columns and Pivot Column operations.`,
    intent: `When you need to reshape data between wide and tall formats for analysis or loading, use Power Query Unpivot to normalize wide data or Pivot to denormalize tall data.`,
    example: `WIDE (source): Columns = Jan, Feb, Mar, Apr (one column per month)
TALL (unpivoted): Columns = Month, Value (one row per month per entity)

Steps: Select entity columns → Transform → Unpivot Other Columns
Result: Every value gets its own row with an Attribute (month name) and Value column.`,
    failureModes: `Unpivoting with inconsistent column types causes type errors; new source columns (e.g., May added) require refreshing the Unpivot step; Pivot without aggregation on duplicate keys produces errors.`,
    performanceNotes: `Unpivot is computationally light. Pivot with aggregation on large datasets can be slow — filter before pivoting when possible. Query folding applies to both operations when connected to supported sources.`,
    governanceNotes: `Wide-to-tall conversion is mandatory before loading into any DDL fact table. STD-FACT-001 requires consistent grain — wide formats violate grain by encoding time or categories as columns instead of rows.`,
    aliases: ["unpivot columns", "pivot transform", "wide to tall"],
    tags: ["Data Modeling", "Architecture", "Automation"],
  },
  {
    id: "FRM-0011", name: "COUNTIFS/SUMIFS", type: "FRM", tier: "Intermediate",
    whatItDoes: `Counts or sums values across a range based on multiple criteria applied to corresponding ranges, enabling governed multi-condition aggregation without array formulas.`,
    intent: `When you need to aggregate values based on two or more conditions across different columns, use COUNTIFS or SUMIFS to perform governed multi-criteria counting or summation.`,
    example: `=COUNTIFS(Sales[Region], "West", Sales[Year], 2026)
=SUMIFS(Sales[Revenue], Sales[Region], "West", Sales[Year], 2026, Sales[Status], "Closed")`,
    failureModes: `Criteria ranges must be identical size or #VALUE! results; text criteria are case-insensitive (can cause unexpected matches); wildcard characters (* ?) in criteria strings match unintentionally.`,
    performanceNotes: `Faster than SUMPRODUCT for simple multi-criteria aggregation. Use SUMIFS over SUMPRODUCT when all criteria are direct column comparisons. SUMPRODUCT is only justified for calculated or cross-array criteria.`,
    governanceNotes: `COUNTIFS/SUMIFS is the default aggregation pattern for DDL dashboards. Use SUMPRODUCT only when SUMIFS cannot express the condition. The Selector-Driven Reconfiguration pattern (ARC-0003) uses SUMIFS internally.`,
    aliases: ["multi-criteria count", "conditional sum", "countifs sumifs"],
    tags: ["Data Modeling", "Dashboard", "Auditing"],
  },
  {
    id: "FRM-0012", name: "SWITCH", type: "FRM", tier: "Intermediate",
    whatItDoes: `Evaluates an expression against a list of value-result pairs and returns the matching result, providing a governed alternative to nested IF for value-matching logic.`,
    intent: `When you need to map specific input values to specific output values, use SWITCH to replace nested IF chains with a readable value-result lookup.`,
    example: `=SWITCH(A2,
  "Q1", "Jan-Mar",
  "Q2", "Apr-Jun",
  "Q3", "Jul-Sep",
  "Q4", "Oct-Dec",
  "Unknown"
)`,
    failureModes: `No wildcard or range matching — SWITCH only works with exact values; maximum 126 value-result pairs (rarely a practical limit); missing default value returns #N/A for unmatched inputs.`,
    performanceNotes: `Marginally faster than nested IF for 4+ value matches due to single expression evaluation. No meaningful performance difference at normal scale.`,
    governanceNotes: `Use SWITCH for value-to-value mapping (exact match). Use IFS for range-based conditions (greater than, less than). Never use nested IF for either. SWITCH + LET is the governed pattern for complex value mapping.`,
    aliases: ["switch case", "value matching", "select case formula"],
    tags: ["Debugging", "Governance", "Architecture"],
  },
  {
    id: "FRM-0013", name: "TEXT/VALUE", type: "FRM", tier: "Beginner",
    whatItDoes: `TEXT converts numbers to formatted text strings for display. VALUE converts text strings containing numbers back to numeric values for calculation. Together they manage the text-number boundary that causes most type errors.`,
    intent: `When you encounter #VALUE! errors from type mismatches between text and numbers, use TEXT or VALUE to explicitly convert between types and restore formula compatibility.`,
    example: `=TEXT(A2, "yyyy-mm-dd")  → converts date to text
=TEXT(B2, "\$#,##0")  → formats number as currency string
=VALUE("1,234")  → returns 1234 as a number
=VALUE(LEFT(A2, 4))  → extracts and converts first 4 characters to number`,
    failureModes: `TEXT output cannot be used in calculations without VALUE conversion back; regional format differences (comma vs period as decimal) cause silent VALUE failures; TEXT with wrong format code returns unexpected strings.`,
    performanceNotes: `Negligible overhead. Both functions evaluate instantly. The cost is in debugging when implicit conversion fails silently — explicit TEXT/VALUE prevents that.`,
    governanceNotes: `Use TEXT only for display purposes (labels, headers, concatenated strings). Never store data as TEXT when it should be numeric. If XLOOKUP fails with apparent matches, check for text-number mismatch first.`,
    aliases: ["type conversion", "text to number", "number formatting"],
    tags: ["Debugging", "Data Modeling", "Auditing"],
  },
  {
    id: "FRM-0014", name: "TEXTJOIN", type: "FRM", tier: "Intermediate",
    whatItDoes: `Concatenates text from multiple cells or ranges with a specified delimiter, with the option to ignore empty cells, replacing manual ampersand (&) chains.`,
    intent: `When you need to combine text from multiple cells with consistent delimiters, use TEXTJOIN to produce governed concatenation that handles blanks and scales to any range size.`,
    example: `=TEXTJOIN(", ", TRUE, A2:A10)
Joins all non-empty values in A2:A10 with comma-space delimiter.

=TEXTJOIN(" | ", TRUE, FILTER(Tags, Tags<>""))
Joins filtered tag values with pipe delimiter.`,
    failureModes: `Result exceeds 32,767 character cell limit on very large ranges; delimiter choice affects downstream parsing (avoid delimiters that appear in the data); ignore_empty=FALSE includes blank entries as empty strings between delimiters.`,
    performanceNotes: `Efficient for ranges up to 10K cells. For larger concatenation needs, use Power Query Group By with custom aggregation instead.`,
    governanceNotes: `Use TEXTJOIN over ampersand chains for any concatenation involving 3+ values or ranges. The delimiter parameter makes the joining rule explicit and auditable.`,
    aliases: ["concatenate with delimiter", "join text", "combine cells"],
    tags: ["Data Modeling", "Automation", "Dashboard"],
  },
  {
    id: "PTN-0004", name: "Controlled Input Cells", type: "PTN", tier: "Intermediate",
    whatItDoes: `Combines data validation (dropdown lists, number constraints), named ranges, and visual formatting (colored borders, input indicators) to create governed user input areas that prevent invalid data entry.`,
    intent: `When you need users to enter data into a workbook without introducing errors, use controlled input cells to constrain, validate, and visually distinguish all input points.`,
    example: `Data Validation: Data tab → Data Validation → List → Source: =SORT(UNIQUE(Ref[Category]))
Named Range: InputCategory = Sheet1!\$B\$3
Formatting: Light blue fill (#DCE6F1) + border = "this cell accepts input"
Formula reference: =XLOOKUP(InputCategory, Ref[Category], Ref[Rate])`,
    failureModes: `Data validation can be bypassed by paste-values; dropdown lists don't auto-update unless source is a Table or dynamic range; validation rules are invisible to users unless input messages are configured.`,
    performanceNotes: `Zero computational overhead. Data validation is a UI-layer constraint, not a formula. The performance gain is in preventing bad data from reaching formulas downstream.`,
    governanceNotes: `Every DDL workbook with user inputs must use data validation on input cells. Blue fill (#DCE6F1) is the DDL convention for input cells. Named ranges must reference every input cell. No unlabeled input points.`,
    aliases: ["data validation", "input controls", "governed inputs"],
    tags: ["Governance", "Data Modeling", "Automation"],
  },
  {
    id: "PTN-0005", name: "Audit Trail Pattern", type: "PTN", tier: "Advanced",
    whatItDoes: `Maintains a structured log of changes within a workbook using timestamp, user, action, and affected cell columns — creating a governed record of what changed, when, and by whom.`,
    intent: `When you need to track changes in a governed workbook, use the audit trail pattern to create a persistent, queryable log of all modifications with timestamps and attribution.`,
    example: `Audit log columns: Timestamp | User | Action | Sheet | Cell | Old Value | New Value
Population: VBA Worksheet_Change event or manual entry
Query: =FILTER(AuditLog, AuditLog[Sheet]="Fact_Sales")

STD-FACT-001 Zone 5 (Meta) is the embedded version: created_date, modified_date, source, version, notes.`,
    failureModes: `VBA-based logging breaks in protected workbooks; manual audit logs are only as reliable as the person updating them; large audit logs slow workbook performance (archive monthly).`,
    performanceNotes: `Audit log tables should be archived quarterly. For high-frequency change environments, log only to a separate workbook connected via Power Query. Zone 5 meta fields handle per-row audit without a separate log.`,
    governanceNotes: `Every DDL workbook with external users must have either a Zone 5 meta layer (STD-FACT-001) or a dedicated audit log sheet. The meta zone IS the audit trail for fact tables. Separate audit logs are for configuration and input tracking.`,
    aliases: ["change log", "modification tracking", "audit log"],
    tags: ["Auditing", "Governance", "Architecture"],
  },
  {
    id: "KEY-0003", name: "F2 (Edit Mode)", type: "KEY", tier: "Beginner",
    whatItDoes: `Enters edit mode on the selected cell, revealing formula references with color-coded range highlighting that shows exactly which cells a formula depends on.`,
    intent: `When you need to understand or debug what a formula references, use F2 to enter edit mode and visually trace every cell reference through color-coded highlights.`,
    example: `Select a formula cell → Press F2
Each referenced range highlights in a unique color.
Drag the colored borders to adjust references.
Press Escape to exit without changes.
Press Enter to confirm changes.

Combine with Ctrl+\` (grave accent) to toggle formula view across the entire sheet.`,
    failureModes: `F2 in a protected sheet does nothing; color-coded ranges on large formulas overlap and become unreadable; accidental Enter after F2 can modify a formula if you changed the cursor position.`,
    performanceNotes: `Zero computational impact. This is a UI debugging tool. The time saved in understanding formula dependencies is the primary value.`,
    governanceNotes: `F2 is the first step in formula auditing. Before changing any formula, press F2 to see what it references. This is how you verify that a formula points where you think it points. Teach this before any function.`,
    aliases: ["edit mode", "formula trace", "cell editing shortcut"],
    tags: ["Debugging", "Navigation", "Auditing"],
  },
  {
    id: "CON-0003", name: "Sheet Naming Convention", type: "CON", tier: "Beginner",
    whatItDoes: `Applies consistent prefix-based naming to worksheet tabs (Fact_, Dim_, Dash_, Ref_, Config_, Log_) so that sheet purpose is immediately identifiable from the tab alone.`,
    intent: `When you create a new sheet in a governed workbook, use the DDL sheet naming convention to make the sheet's role identifiable from its tab name without opening it.`,
    example: `Fact_Sales — fact table (transactional data)
Dim_Product — dimension table (reference/lookup)
Dash_Overview — dashboard (visualization/summary)
Ref_TaxRates — reference table (static lookups)
Config_Settings — configuration (named range inputs)
Log_Audit — log table (change tracking)`,
    failureModes: `Sheet names exceeding 31 characters are truncated; special characters in names break INDIRECT references; renaming a sheet breaks all cross-sheet references unless using structured table references.`,
    performanceNotes: `Zero computational impact. The value is entirely in human navigation speed and workbook comprehension. A 20-sheet workbook with prefixed tabs is navigable in seconds.`,
    governanceNotes: `Every DDL workbook must use prefixed sheet names. STD-FACT-001 mandates Fact_[ProjectName] for fact tables. Dim_, Dash_, Ref_, Config_, and Log_ are reserved prefixes. Never use Sheet1, Sheet2, Sheet3.`,
    aliases: ["tab naming", "sheet prefixes", "worksheet naming"],
    tags: ["Governance", "Navigation", "Architecture"],
  },
  {
    id: "ANT-0005", name: "Circular References", type: "ANT", tier: "Intermediate",
    whatItDoes: `Occurs when a formula directly or indirectly references its own cell, creating an infinite calculation loop that Excel either blocks with a warning or silently enables through iterative calculation mode.`,
    intent: `When you encounter a circular reference warning or unexpected zero values, use formula auditing tools to trace and break the dependency loop instead of enabling iterative calculation.`,
    example: `WRONG: Cell A1 contains =A1+1 (direct circular)
WRONG: A1=B1+1, B1=C1+1, C1=A1+1 (indirect circular)
WRONG: Enabling iterative calculation to "fix" the warning

RIGHT: Formulas → Error Checking → Circular References (shows the chain)
RIGHT: Restructure so no cell depends on its own output.`,
    failureModes: `Iterative calculation mode masks the bug — the formula runs N times and stops, producing a value that looks correct but isn't governed; circular references propagate silently through INDIRECT and cross-sheet references; one circular reference can make every formula in the workbook return zero.`,
    performanceNotes: `Circular references with iterative calculation enabled force Excel to recalculate the entire chain on every edit. This is the most common cause of unexplained workbook slowness after volatile functions.`,
    governanceNotes: `Circular references are banned in DDL workbooks. Iterative calculation must remain OFF. If a model requires iterative solving (rare), document it explicitly and isolate it in a dedicated sheet with a warning header.`,
    aliases: ["circular formula", "self-referencing formula", "infinite loop"],
    tags: ["Debugging", "Performance", "Governance"],
  },
  {
    id: "ARC-0004", name: "FILTER-SORT-TAKE Pipeline", type: "ARC", tier: "Advanced",
    whatItDoes: `Chains FILTER, SORT, and TAKE into a single spill-range formula that extracts matching rows, orders them, and returns only the top N results — the canonical DDL data pipeline pattern.`,
    intent: `When you need a governed top-N view of filtered data, use the FILTER-SORT-TAKE pipeline to produce a self-updating, spill-range output in a single formula.`,
    example: `=LET(
  data, FILTER(Sales, Sales[Year]=2026),
  sorted, SORT(data, 4, -1),
  TAKE(sorted, 10)
)
Returns top 10 sales by revenue for 2026, auto-updating.`,
    failureModes: `FILTER returns empty → SORT errors on empty input (wrap in IFERROR or use FILTER's if_empty argument); TAKE with N larger than available rows returns #CALC!; column index in SORT must account for FILTER's output shape, not the original table.`,
    performanceNotes: `Each function in the chain evaluates sequentially. For large datasets (100K+ rows), FILTER is the bottleneck — add the most restrictive criteria first. LET prevents redundant evaluation of the filtered result.`,
    governanceNotes: `This is the standard DDL data pipeline for dashboard outputs. Always wrap in LET for readability. Always include defensive defaults (IFERROR or if_empty) for the FILTER step. The pipeline replaces manual sort-copy-paste workflows permanently.`,
    aliases: ["data pipeline", "top N pattern", "filter sort take"],
    tags: ["Architecture", "Dashboard", "Data Modeling"],
  },
  {
    id: "PQ-0003", name: "Column Type Enforcement", type: "PQ", tier: "Intermediate",
    whatItDoes: `Explicitly sets data types for every column in a Power Query step, preventing silent type coercion errors that cause load failures, incorrect calculations, and data corruption.`,
    intent: `When loading data through Power Query, use explicit column type enforcement to prevent silent type coercion and ensure every column loads with the correct data type.`,
    example: `Home → Transform → Detect Data Types (auto-detect as starting point)
Then manually verify and fix:
= Table.TransformColumnTypes(Source, {
  {"OrderID", Int64.Type},
  {"Date", type date},
  {"Amount", type number},
  {"Region", type text}
})`,
    failureModes: `Auto-detect types based on first 200 rows — later rows with different formats cause errors; date formats vary by locale (MM/DD vs DD/MM); numbers stored as text pass auto-detect but fail in calculations.`,
    performanceNotes: `Type enforcement is a metadata operation — near-zero performance cost. The cost of NOT enforcing types is debugging hours when a number column silently loads as text.`,
    governanceNotes: `Every Power Query output must have explicit type enforcement as the final transform step before loading. Never rely solely on auto-detect. Type enforcement is the PQ equivalent of schema validation.`,
    aliases: ["data types PQ", "type casting", "column type setting"],
    tags: ["Governance", "Debugging", "Data Modeling"],
  },
  {
    id: "PQ-0004", name: "Append Queries", type: "PQ", tier: "Advanced",
    whatItDoes: `Combines two or more queries with identical column structure into a single unified table, functioning as the Power Query equivalent of SQL UNION ALL.`,
    intent: `When you need to combine multiple data sources with the same structure into one table, use Append Queries to create a unified dataset without manual copy-paste.`,
    example: `Home → Append Queries → Three or More Tables
Select: Query_Jan, Query_Feb, Query_Mar
Result: One table with all rows from all three sources.

Pre-requisite: All source queries must have identical column names and types.
Best practice: Create a "staging" query for each source that enforces column names and types before appending.`,
    failureModes: `Mismatched column names create null columns instead of errors (silent data loss); different column types across sources cause type conflicts on load; appending queries with different grain produces mixed-grain output (violates CON-0002).`,
    performanceNotes: `Append is a metadata operation until the query is loaded. Performance depends on the size of the source queries, not the append step itself. For 10+ sources, consider a folder-based ingestion pattern instead of manual append.`,
    governanceNotes: `All appended sources must share identical column structure. Use staging queries to normalize column names and types before appending. Verify grain consistency (CON-0002) after append — mixed grain from different sources is the most common append failure.`,
    aliases: ["union queries", "combine tables PQ", "stack queries"],
    tags: ["Data Modeling", "Architecture", "Automation"],
  }
];

const EDGES = [
  { source: "FRM-0001", target: "FRM-0002", type: "LEADS_TO" },
  { source: "FRM-0001", target: "ARC-0001", type: "LEADS_TO" },
  { source: "FRM-0001", target: "FRM-0002", type: "PAIRS_WITH" },
  { source: "FRM-0002", target: "ARC-0001", type: "LEADS_TO" },
  { source: "FRM-0002", target: "FRM-0001", type: "DEPENDS_ON" },
  { source: "FRM-0002", target: "FRM-0001", type: "PAIRS_WITH" },
  { source: "ARC-0001", target: "FRM-0002", type: "DEPENDS_ON" },
  { source: "ARC-0001", target: "FRM-0001", type: "DEPENDS_ON" },
  { source: "ARC-0001", target: "FRM-0002", type: "PAIRS_WITH" },
  { source: "ANT-0001", target: "CON-0001", type: "LEADS_TO" },
  { source: "FRM-0003", target: "FRM-0001", type: "LEADS_TO" },
  { source: "FRM-0003", target: "FRM-0002", type: "LEADS_TO" },
  { source: "FRM-0003", target: "FRM-0001", type: "PAIRS_WITH" },
  { source: "FRM-0004", target: "FRM-0002", type: "DEPENDS_ON" },
  { source: "FRM-0004", target: "ARC-0001", type: "LEADS_TO" },
  { source: "FRM-0004", target: "FRM-0002", type: "PAIRS_WITH" },
  { source: "FRM-0005", target: "ARC-0002", type: "LEADS_TO" },
  { source: "FRM-0005", target: "FRM-0001", type: "PAIRS_WITH" },
  { source: "FRM-0006", target: "FRM-0002", type: "LEADS_TO" },
  { source: "FRM-0006", target: "FRM-0005", type: "PAIRS_WITH" },
  { source: "PTN-0001", target: "FRM-0001", type: "DEPENDS_ON" },
  { source: "PTN-0001", target: "ARC-0001", type: "LEADS_TO" },
  { source: "PTN-0001", target: "FRM-0002", type: "PAIRS_WITH" },
  { source: "KEY-0001", target: "FRM-0001", type: "LEADS_TO" },
  { source: "KEY-0001", target: "PQ-0001", type: "LEADS_TO" },
  { source: "CON-0001", target: "PTN-0001", type: "LEADS_TO" },
  { source: "ANT-0002", target: "FRM-0003", type: "LEADS_TO" },
  { source: "ANT-0002", target: "FRM-0006", type: "LEADS_TO" },
  { source: "ARC-0002", target: "FRM-0005", type: "DEPENDS_ON" },
  { source: "ARC-0002", target: "FRM-0002", type: "DEPENDS_ON" },
  { source: "ARC-0002", target: "ARC-0001", type: "LEADS_TO" },
  { source: "ARC-0002", target: "FRM-0005", type: "PAIRS_WITH" },
  { source: "PQ-0001", target: "KEY-0001", type: "DEPENDS_ON" },
  { source: "PQ-0001", target: "PTN-0001", type: "LEADS_TO" },
  { source: "PQ-0001", target: "KEY-0001", type: "PAIRS_WITH" },
  { source: "FRM-0007", target: "ARC-0002", type: "LEADS_TO" },
  { source: "FRM-0007", target: "FRM-0005", type: "PAIRS_WITH" },
  { source: "FRM-0008", target: "FRM-0007", type: "PAIRS_WITH" },
  { source: "FRM-0008", target: "ARC-0002", type: "LEADS_TO" },
  { source: "FRM-0009", target: "FRM-0005", type: "DEPENDS_ON" },
  { source: "FRM-0009", target: "ARC-0002", type: "LEADS_TO" },
  { source: "FRM-0009", target: "FRM-0007", type: "PAIRS_WITH" },
  { source: "FRM-0010", target: "FRM-0002", type: "LEADS_TO" },
  { source: "FRM-0010", target: "FRM-0005", type: "LEADS_TO" },
  { source: "PTN-0002", target: "FRM-0004", type: "LEADS_TO" },
  { source: "PTN-0002", target: "FRM-0002", type: "LEADS_TO" },
  { source: "PTN-0003", target: "FRM-0001", type: "DEPENDS_ON" },
  { source: "PTN-0003", target: "FRM-0002", type: "PAIRS_WITH" },
  { source: "KEY-0002", target: "KEY-0001", type: "PAIRS_WITH" },
  { source: "KEY-0002", target: "FRM-0010", type: "LEADS_TO" },
  { source: "CON-0002", target: "PTN-0001", type: "LEADS_TO" },
  { source: "CON-0002", target: "PTN-0001", type: "PAIRS_WITH" },
  { source: "ANT-0003", target: "PTN-0002", type: "LEADS_TO" },
  { source: "ANT-0003", target: "FRM-0002", type: "LEADS_TO" },
  { source: "ANT-0004", target: "FRM-0010", type: "LEADS_TO" },
  { source: "ANT-0004", target: "FRM-0002", type: "LEADS_TO" },
  { source: "ARC-0003", target: "ARC-0001", type: "DEPENDS_ON" },
  { source: "ARC-0003", target: "FRM-0002", type: "DEPENDS_ON" },
  { source: "ARC-0003", target: "PTN-0001", type: "DEPENDS_ON" },
  { source: "PQ-0002", target: "PQ-0001", type: "DEPENDS_ON" },
  { source: "PQ-0002", target: "CON-0002", type: "LEADS_TO" },
  { source: "PQ-0002", target: "PTN-0001", type: "PAIRS_WITH" },
  { source: "FRM-0011", target: "ARC-0003", type: "LEADS_TO" },
  { source: "FRM-0011", target: "FRM-0006", type: "PAIRS_WITH" },
  { source: "FRM-0012", target: "FRM-0002", type: "LEADS_TO" },
  { source: "FRM-0012", target: "FRM-0010", type: "PAIRS_WITH" },
  { source: "FRM-0013", target: "FRM-0001", type: "LEADS_TO" },
  { source: "FRM-0013", target: "PTN-0003", type: "LEADS_TO" },
  { source: "FRM-0014", target: "FRM-0005", type: "PAIRS_WITH" },
  { source: "FRM-0014", target: "FRM-0013", type: "DEPENDS_ON" },
  { source: "PTN-0004", target: "PTN-0002", type: "DEPENDS_ON" },
  { source: "PTN-0004", target: "ARC-0003", type: "LEADS_TO" },
  { source: "PTN-0004", target: "KEY-0001", type: "PAIRS_WITH" },
  { source: "PTN-0005", target: "PTN-0001", type: "DEPENDS_ON" },
  { source: "PTN-0005", target: "CON-0002", type: "PAIRS_WITH" },
  { source: "KEY-0003", target: "KEY-0002", type: "PAIRS_WITH" },
  { source: "KEY-0003", target: "PTN-0003", type: "LEADS_TO" },
  { source: "CON-0003", target: "PTN-0001", type: "LEADS_TO" },
  { source: "CON-0003", target: "KEY-0001", type: "DEPENDS_ON" },
  { source: "ANT-0005", target: "PTN-0003", type: "LEADS_TO" },
  { source: "ANT-0005", target: "FRM-0002", type: "LEADS_TO" },
  { source: "ARC-0004", target: "FRM-0005", type: "DEPENDS_ON" },
  { source: "ARC-0004", target: "FRM-0007", type: "DEPENDS_ON" },
  { source: "ARC-0004", target: "FRM-0002", type: "DEPENDS_ON" },
  { source: "ARC-0004", target: "ARC-0002", type: "PAIRS_WITH" },
  { source: "PQ-0003", target: "PQ-0001", type: "DEPENDS_ON" },
  { source: "PQ-0003", target: "PQ-0002", type: "PAIRS_WITH" },
  { source: "PQ-0004", target: "PQ-0001", type: "DEPENDS_ON" },
  { source: "PQ-0004", target: "PQ-0003", type: "DEPENDS_ON" },
  { source: "PQ-0004", target: "CON-0002", type: "PAIRS_WITH" }
];

const TC: Record<string,{bg:string}> = {
  FRM:{bg:"#2563EB"},PTN:{bg:"#059669"},KEY:{bg:"#D97706"},CON:{bg:"#7C3AED"},ARC:{bg:"#DC2626"},ANT:{bg:"#6B7280"},PQ:{bg:"#0891B2"},
};
const TIER_Y: Record<string,number> = {Beginner:0,Intermediate:1,Advanced:2,Expert:3};
const TIER_C: Record<string,string> = {Beginner:"#10B981",Intermediate:"#3B82F6",Advanced:"#8B5CF6",Expert:"#EF4444"};
const EC: Record<string,string> = {LEADS_TO:"#2563EB",DEPENDS_ON:"#DC2626",PAIRS_WITH:"#9CA3AF"};
const EL: Record<string,string> = {LEADS_TO:"leads to",DEPENDS_ON:"depends on",PAIRS_WITH:"pairs with"};

function findPath(s: string, e: string): string[]|null {
  if(s===e)return[s];
  const adj: Record<string,string[]>={};
  ENTRIES.forEach(x=>{adj[x.id]=[];});
  EDGES.forEach(x=>{if(x.type==="LEADS_TO")adj[x.source]?.push(x.target);if(x.type==="DEPENDS_ON")adj[x.target]?.push(x.source);});
  const q:string[][]=[[s]];const v=new Set([s]);
  while(q.length>0){const p=q.shift()!;const c=p[p.length-1];if(c===e)return p;for(const n of(adj[c]||[])){if(!v.has(n)){v.add(n);q.push([...p,n]);}}}
  return null;
}

export default function ExcelligencePage() {
  const [selected,setSelected]=useState<string|null>(null);
  const [pathStart,setPathStart]=useState<string|null>(null);
  const [pathEnd,setPathEnd]=useState<string|null>(null);
  const [activePath,setActivePath]=useState<string[]|null>(null);
  const [filterTier,setFilterTier]=useState("All");
  const [filterType,setFilterType]=useState("All");
  const [edgeFilter,setEdgeFilter]=useState("All");
  const [mode,setMode]=useState<"explore"|"pathfind">("explore");
  const [hovered,setHovered]=useState<string|null>(null);
  const W=900,H=560;

  const [pos,setPos]=useState<Record<string,{x:number;y:number}>>(()=>{
    const p:Record<string,{x:number;y:number}>={};
    const tg:Record<number,string[]>={};
    ENTRIES.forEach(e=>{const t=TIER_Y[e.tier]??1;if(!tg[t])tg[t]=[];tg[t].push(e.id);});
    Object.keys(tg).forEach(tier=>{const g=tg[parseInt(tier)];const tn=parseInt(tier);const yB=80+tn*((H-160)/3);
      g.forEach((id,i)=>{const x=80+(i+0.5)*((W-160)/g.length);p[id]={x:x+(Math.random()-0.5)*40,y:yB+(Math.random()-0.5)*30};});});
    return p;
  });

  useEffect(()=>{
    let frame:number;let iter=0;const mx=200;
    const ps:Record<string,{x:number;y:number;vx:number;vy:number}>={};
    Object.keys(pos).forEach(k=>{ps[k]={...pos[k],vx:0,vy:0};});
    function step(){
      if(iter>=mx)return;iter++;const d=1-iter/mx;const ids=Object.keys(ps);
      for(let i=0;i<ids.length;i++){for(let j=i+1;j<ids.length;j++){
        const a=ps[ids[i]],b=ps[ids[j]];let dx=b.x-a.x,dy=b.y-a.y;let dist=Math.sqrt(dx*dx+dy*dy)||1;
        const f=8000/(dist*dist);const fx=(dx/dist)*f*d;const fy=(dy/dist)*f*d;a.vx-=fx;a.vy-=fy;b.vx+=fx;b.vy+=fy;}}
      EDGES.forEach(e=>{if(!ps[e.source]||!ps[e.target])return;const a=ps[e.source],b=ps[e.target];
        let dx=b.x-a.x,dy=b.y-a.y;let dist=Math.sqrt(dx*dx+dy*dy)||1;const f=(dist-120)*0.01*d;
        const fx=(dx/dist)*f;const fy=(dy/dist)*f;a.vx+=fx;a.vy+=fy;b.vx-=fx;b.vy-=fy;});
      ENTRIES.forEach(e=>{const p=ps[e.id];if(!p)return;const ty=70+(TIER_Y[e.tier]??1)*((H-140)/3);p.vy+=(ty-p.y)*0.03*d;});
      ids.forEach(id=>{const p=ps[id];p.vx*=0.6;p.vy*=0.6;p.x=Math.max(50,Math.min(W-50,p.x+p.vx));p.y=Math.max(40,Math.min(H-40,p.y+p.vy));});
      if(iter%5===0||iter===mx-1){const snap:Record<string,{x:number;y:number}>={};ids.forEach(id=>{snap[id]={x:ps[id].x,y:ps[id].y};});setPos(snap);}
      frame=requestAnimationFrame(step);}
    frame=requestAnimationFrame(step);return()=>cancelAnimationFrame(frame);
  },[]);

  const filtered=useMemo(()=>ENTRIES.filter(e=>(filterTier==="All"||e.tier===filterTier)&&(filterType==="All"||e.type===filterType)),[filterTier,filterType]);
  const fids=useMemo(()=>new Set(filtered.map(e=>e.id)),[filtered]);
  const vedges=useMemo(()=>EDGES.filter(e=>fids.has(e.source)&&fids.has(e.target)&&(edgeFilter==="All"||e.type===edgeFilter)),[fids,edgeFilter]);
  const pathSet=useMemo(()=>new Set(activePath||[]),[activePath]);
  const pathEdgeSet=useMemo(()=>{if(!activePath||activePath.length<2)return new Set<string>();const s=new Set<string>();for(let i=0;i<activePath.length-1;i++)s.add(`${activePath[i]}\u2192${activePath[i+1]}`);return s;},[activePath]);

  const handleClick=useCallback((id:string)=>{
    if(mode==="pathfind"){if(!pathStart){setPathStart(id);setPathEnd(null);setActivePath(null);}
      else if(!pathEnd&&id!==pathStart){setPathEnd(id);setActivePath(findPath(pathStart,id));}
      else{setPathStart(id);setPathEnd(null);setActivePath(null);}}
    else{setSelected(selected===id?null:id);}
  },[mode,pathStart,pathEnd,selected]);

  const clearPath=()=>{setPathStart(null);setPathEnd(null);setActivePath(null);};
  const sel=ENTRIES.find(e=>e.id===selected);
  const conEdges=selected?EDGES.filter(e=>e.source===selected||e.target===selected):[];

  function epath(src:string,tgt:string){const s=pos[src],t=pos[tgt];if(!s||!t)return"";const dx=t.x-s.x,dy=t.y-s.y,dist=Math.sqrt(dx*dx+dy*dy)||1,r=22;
    const sx=s.x+(dx/dist)*r,sy=s.y+(dy/dist)*r,tx=t.x-(dx/dist)*r,ty=t.y-(dy/dist)*r;return`M ${sx} ${sy} Q ${(sx+tx)/2+dy*0.15} ${(sy+ty)/2-dx*0.15} ${tx} ${ty}`;}

  return(
    <div style={{fontFamily:"'Inter','Arial',sans-serif",background:"#0F172A",color:"#E2E8F0",minHeight:"100vh",padding:"100px 24px 32px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,flexWrap:"wrap",gap:8}}>
        <div><h1 style={{margin:0,fontSize:22,fontWeight:700,color:"#F8FAFC",letterSpacing:-0.5}}>EXCELLIGENCE <span style={{color:"#64748B",fontWeight:400,fontSize:14}}>Graph Explorer</span></h1>
          <p style={{margin:"2px 0 0",fontSize:12,color:"#64748B"}}>{ENTRIES.length} entries &middot; {EDGES.length} edges &middot; v0.1.1</p></div>
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>{setMode("explore");clearPath();}} style={{padding:"6px 14px",fontSize:12,fontWeight:600,borderRadius:6,border:"none",cursor:"pointer",background:mode==="explore"?"#2563EB":"#1E293B",color:mode==="explore"?"#FFF":"#94A3B8"}}>Explore</button>
          <button onClick={()=>{setMode("pathfind");setSelected(null);clearPath();}} style={{padding:"6px 14px",fontSize:12,fontWeight:600,borderRadius:6,border:"none",cursor:"pointer",background:mode==="pathfind"?"#DC2626":"#1E293B",color:mode==="pathfind"?"#FFF":"#94A3B8"}}>Path Finder</button>
        </div>
      </div>

      <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap",alignItems:"center"}}>
        <span style={{fontSize:11,color:"#64748B",fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>Filter:</span>
        <select value={filterTier} onChange={e=>setFilterTier(e.target.value)} style={{background:"#1E293B",color:"#E2E8F0",border:"1px solid #334155",borderRadius:6,padding:"4px 8px",fontSize:12}}>
          <option value="All">All Tiers</option>{Object.keys(TIER_Y).map(t=><option key={t} value={t}>{t}</option>)}</select>
        <select value={filterType} onChange={e=>setFilterType(e.target.value)} style={{background:"#1E293B",color:"#E2E8F0",border:"1px solid #334155",borderRadius:6,padding:"4px 8px",fontSize:12}}>
          <option value="All">All Types</option>{Object.keys(TC).map(t=><option key={t} value={t}>{t}</option>)}</select>
        <select value={edgeFilter} onChange={e=>setEdgeFilter(e.target.value)} style={{background:"#1E293B",color:"#E2E8F0",border:"1px solid #334155",borderRadius:6,padding:"4px 8px",fontSize:12}}>
          <option value="All">All Edges</option><option value="LEADS_TO">LEADS_TO</option><option value="DEPENDS_ON">DEPENDS_ON</option><option value="PAIRS_WITH">PAIRS_WITH</option></select>
        <div style={{marginLeft:"auto",display:"flex",gap:10,alignItems:"center"}}>
          {Object.entries(TIER_C).map(([t,c])=>(<span key={t} style={{fontSize:10,display:"flex",alignItems:"center",gap:3}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:c,display:"inline-block"}}/><span style={{color:"#94A3B8"}}>{t}</span></span>))}
        </div>
      </div>

      {mode==="pathfind"&&(<div style={{background:"#1E293B",borderRadius:8,padding:"10px 14px",marginBottom:10,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
        <span style={{fontSize:12,color:"#94A3B8"}}>{!pathStart?"Click a start node":!pathEnd?"Click a target node":"Path calculated"}</span>
        {pathStart&&<span style={{fontSize:12,padding:"3px 8px",background:TC[ENTRIES.find(e=>e.id===pathStart)?.type||"FRM"]?.bg,borderRadius:4,color:"#FFF",fontWeight:600}}>{pathStart}</span>}
        {pathStart&&<span style={{color:"#64748B",fontSize:14}}>&rarr;</span>}
        {pathEnd&&<span style={{fontSize:12,padding:"3px 8px",background:TC[ENTRIES.find(e=>e.id===pathEnd)?.type||"FRM"]?.bg,borderRadius:4,color:"#FFF",fontWeight:600}}>{pathEnd}</span>}
        {activePath===null&&pathEnd&&<span style={{fontSize:12,color:"#EF4444",fontWeight:600}}>No path found</span>}
        {activePath&&<span style={{fontSize:12,color:"#10B981",fontWeight:600}}>{activePath.length-1} step{activePath.length-1!==1?"s":""}</span>}
        <button onClick={clearPath} style={{marginLeft:"auto",background:"#334155",color:"#94A3B8",border:"none",borderRadius:4,padding:"4px 10px",fontSize:11,cursor:"pointer"}}>Reset</button>
      </div>)}

      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        <div style={{flex:"1 1 600px",background:"#1E293B",borderRadius:10,overflow:"hidden",position:"relative"}}>
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display:"block",width:"100%",height:"auto"}}>
            <defs>
              <marker id="al" viewBox="0 0 10 6" refX="9" refY="3" markerWidth="8" markerHeight="6" orient="auto"><path d="M0,0 L10,3 L0,6 Z" fill="#2563EB"/></marker>
              <marker id="ad" viewBox="0 0 10 6" refX="9" refY="3" markerWidth="8" markerHeight="6" orient="auto"><path d="M0,0 L10,3 L0,6 Z" fill="#DC2626"/></marker>
              <marker id="ap" viewBox="0 0 10 6" refX="9" refY="3" markerWidth="8" markerHeight="6" orient="auto"><path d="M0,0 L10,3 L0,6 Z" fill="#FBBF24"/></marker>
            </defs>
            {Object.entries(TIER_Y).map(([tier,idx])=>{const bH=(H-40)/4;const y=20+idx*bH;return(<g key={tier}>
              <rect x={0} y={y} width={W} height={bH} fill={idx%2===0?"rgba(255,255,255,0.02)":"transparent"}/>
              <text x={12} y={y+16} fontSize="10" fill="#475569" fontWeight="600" fontFamily="Inter,Arial">{tier}</text></g>);})}
            {vedges.map((e,i)=>{const onP=pathEdgeSet.has(`${e.source}\u2192${e.target}`)||pathEdgeSet.has(`${e.target}\u2192${e.source}`);
              const hi=selected&&(e.source===selected||e.target===selected);const dim=(activePath&&!onP)||(selected&&!hi);
              const col=onP?"#FBBF24":EC[e.type];const mk=onP?"url(#ap)":e.type==="LEADS_TO"?"url(#al)":e.type==="DEPENDS_ON"?"url(#ad)":"";
              return<path key={i} d={epath(e.source,e.target)} fill="none" stroke={col} strokeWidth={onP?3:hi?2:1.2}
                strokeOpacity={dim?0.1:onP?1:0.5} strokeDasharray={e.type==="PAIRS_WITH"?"4,3":"none"}
                markerEnd={e.type!=="PAIRS_WITH"?mk:""}/>;})}
            {filtered.map(entry=>{const p=pos[entry.id];if(!p)return null;const tc=TC[entry.type];
              const onP=pathSet.has(entry.id);const isSel=selected===entry.id||entry.id===pathStart||entry.id===pathEnd;
              const isH=hovered===entry.id;const dim=activePath&&!onP&&!isSel;const r=isSel?24:isH?22:20;
              return(<g key={entry.id} onClick={()=>handleClick(entry.id)} onMouseEnter={()=>setHovered(entry.id)} onMouseLeave={()=>setHovered(null)}
                style={{cursor:"pointer"}} opacity={dim?0.15:1}>
                {(onP||isSel)&&<circle cx={p.x} cy={p.y} r={r+6} fill="none" stroke={onP?"#FBBF24":tc.bg} strokeWidth={2} strokeOpacity={0.4}/>}
                <circle cx={p.x} cy={p.y} r={r} fill={tc.bg} stroke={onP?"#FBBF24":isSel?"#FFF":tc.bg} strokeWidth={isSel||onP?2.5:1}/>
                <text x={p.x} y={p.y-4} textAnchor="middle" fontSize="8" fontWeight="700" fill="rgba(255,255,255,0.7)" fontFamily="Inter,Arial">{entry.type}</text>
                <text x={p.x} y={p.y+7} textAnchor="middle" fontSize="8" fontWeight="600" fill="#FFF" fontFamily="Inter,Arial">
                  {entry.name.length>12?entry.name.slice(0,11)+"\u2026":entry.name}</text>
                <circle cx={p.x+r-4} cy={p.y-r+4} r={4} fill={TIER_C[entry.tier]} stroke="#1E293B" strokeWidth={1.5}/></g>);})}
          </svg>
          <div style={{position:"absolute",bottom:8,right:12,display:"flex",gap:12,fontSize:10}}>
            <span style={{display:"flex",alignItems:"center",gap:3}}><svg width={20} height={6}><line x1={0} y1={3} x2={20} y2={3} stroke="#2563EB" strokeWidth={2}/></svg><span style={{color:"#64748B"}}>leads_to</span></span>
            <span style={{display:"flex",alignItems:"center",gap:3}}><svg width={20} height={6}><line x1={0} y1={3} x2={20} y2={3} stroke="#DC2626" strokeWidth={2}/></svg><span style={{color:"#64748B"}}>depends_on</span></span>
            <span style={{display:"flex",alignItems:"center",gap:3}}><svg width={20} height={6}><line x1={0} y1={3} x2={20} y2={3} stroke="#9CA3AF" strokeWidth={2} strokeDasharray="4,3"/></svg><span style={{color:"#64748B"}}>pairs_with</span></span>
          </div>
        </div>

        <div style={{flex:"0 0 280px",maxWidth:300}}>
          {activePath&&activePath.length>1&&(<div style={{background:"#1E293B",borderRadius:10,padding:14,marginBottom:10}}>
            <h3 style={{margin:"0 0 10px",fontSize:13,fontWeight:700,color:"#FBBF24",letterSpacing:-0.3}}>Diagnostic Path ({activePath.length-1} step{activePath.length-1!==1?"s":""})</h3>
            {activePath.map((id,i)=>{const e=ENTRIES.find(en=>en.id===id)!;const tc=TC[e.type];return(<div key={id} style={{marginBottom:i<activePath.length-1?4:0}}>
              <div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 8px",background:"rgba(251,191,36,0.08)",borderRadius:6}}>
                <span style={{width:20,height:20,borderRadius:"50%",background:tc.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:"#FFF",flexShrink:0}}>{i+1}</span>
                <div><div style={{fontSize:11,fontWeight:700,color:"#F8FAFC"}}>{e.name}</div><div style={{fontSize:9,color:"#94A3B8"}}>{e.id} &middot; {e.tier}</div></div>
              </div>{i<activePath.length-1&&<div style={{textAlign:"center",fontSize:10,color:"#FBBF24",padding:"2px 0"}}>&darr;</div>}</div>);})}</div>)}

          {sel&&mode==="explore"&&(<div style={{background:"#1E293B",borderRadius:10,padding:14}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <span style={{padding:"3px 8px",background:TC[sel.type].bg,borderRadius:4,fontSize:11,fontWeight:700,color:"#FFF"}}>{sel.type}</span>
              <span style={{padding:"3px 8px",background:TIER_C[sel.tier],borderRadius:4,fontSize:11,fontWeight:600,color:"#FFF"}}>{sel.tier}</span></div>
            <h3 style={{margin:"0 0 4px",fontSize:16,fontWeight:700,color:"#F8FAFC"}}>{sel.name}</h3>
            <p style={{margin:"0 0 4px",fontSize:11,color:"#64748B",fontFamily:"monospace"}}>{sel.id}</p>
            <p style={{margin:"0 0 12px",fontSize:12,color:"#CBD5E1",lineHeight:1.5}}>{sel.intent}</p>
            {conEdges.length>0&&(<div><h4 style={{margin:"0 0 6px",fontSize:11,fontWeight:700,color:"#64748B",textTransform:"uppercase",letterSpacing:0.5}}>Connections</h4>
              {conEdges.map((edge,i)=>{const oid=edge.source===selected?edge.target:edge.source;const o=ENTRIES.find(e=>e.id===oid);const dir=edge.source===selected?"\u2192":"\u2190";
                return<div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 0",fontSize:11}}>
                  <span style={{color:EC[edge.type],fontWeight:600,width:80,flexShrink:0,fontSize:10}}>{EL[edge.type]}</span>
                  <span style={{color:"#64748B"}}>{dir}</span><span style={{color:"#E2E8F0",fontWeight:500}}>{o?.name||oid}</span></div>;})}</div>)}</div>)}

          {!sel&&!activePath&&(<div style={{background:"#1E293B",borderRadius:10,padding:14,textAlign:"center"}}>
            <p style={{fontSize:13,color:"#64748B",margin:0}}>{mode==="explore"?"Click a node to see details and connections.":"Click start node, then target to trace the path."}</p></div>)}

          <div style={{background:"#1E293B",borderRadius:10,padding:12,marginTop:10}}>
            <h4 style={{margin:"0 0 8px",fontSize:11,fontWeight:700,color:"#64748B",textTransform:"uppercase",letterSpacing:0.5}}>Types</h4>
            <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
              {Object.entries(TC).map(([type,c])=><span key={type} style={{padding:"2px 8px",background:c.bg,borderRadius:4,fontSize:10,fontWeight:700,color:"#FFF"}}>{type}</span>)}</div></div>
        </div>
      </div>
      <div style={{marginTop:10,textAlign:"center",fontSize:10,color:"#475569"}}>Excelligence v0.1.1 &middot; Dropdown Logistics &middot; Chaos &rarr; Structured &rarr; Automated</div>
    </div>
  );
}
