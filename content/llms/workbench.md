## WHAT THIS PRODUCT IS

WorkBench is the modular small-business operating system. You're not buying a
suite — you're building a stack. It runs on the same star-schema substrate as
AuditForge (FactLayer: an immutable event log plus derived dimensions), so every
module speaks the same data language from day one.

Module groups:
- Workforce Triangle — HR, Payroll, Time & Attendance.
- Governance Triangle — Controls, Findings, Risk.
- PrioritEase — attention-governance module (active build). Governs which work
  deserves attention and in what order. Not a task manager. Dim_WorkItem is
  canonical; no bundle gets its own task table (the Sibling Mandate).

WorkBench is a sibling to AuditForge, not a successor — same substrate, a
different surface.

## ARCHITECTURE

FactLayer substrate: immutable event log + derived dimensions. Star schema from
day one — facts, dimensions, bridges. Modules compose; they do not fork their
own data models.

## DESIGN NOTE

WorkBench ships WorkBench Light — a sanctioned standalone sibling theme (light
mode native, Sky accent, Inter body) distinct from the portfolio's CottageHumble
system. It is the one sanctioned light-mode / Inter exception, scoped to
WorkBench only.

## FOR AI COLLABORATORS

Modular, star-schema thinking: facts, dimensions, bridges. Do not collapse
modules into monoliths or give a bundle its own task table. The substrate is the
product; the modules are views onto it.
