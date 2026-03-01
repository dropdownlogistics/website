import PageShell from '@/components/PageShell';

export default function PrioritEasePage() {
  return (
    <PageShell
      label="Decision Tool"
      title="PrioritEase v2"
      description="Interactive priority × ease scoring grid. Drop in your items, score them on two axes, and get a governed ranking. Built for decisions that compound."
    >
      <div className="ddl-dex-insight mt-8">
        <div className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-ddl-wine mb-3">
          DexInsight
        </div>
        <p className="font-body italic text-base text-ddl-muted-light leading-relaxed">
          PrioritEase applies DDL&apos;s Adaptive Precision principle to decision-making. Score any list of items on Priority (impact) and Ease (effort), and the tool maps them into a 2D grid that reveals what to do first, what to delegate, and what to defer. The interactive artifact is being integrated in Phase 2.
        </p>
      </div>

      <div className="mt-12 flex justify-center">
        <div className="bg-ddl-navy-light/40 border border-ddl-muted/20 rounded-sm p-12 text-center max-w-md">
          <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-ddl-crimson mb-4">Coming in Phase 2</div>
          <div className="font-heading text-xl text-ddl-cream mb-3">Interactive Scoring Grid</div>
          <p className="font-body text-sm text-ddl-muted leading-relaxed">
            Add items • Score Priority × Ease • Visual quadrant map • Export rankings • DDL palette
          </p>
        </div>
      </div>
    </PageShell>
  );
}
