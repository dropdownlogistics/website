import PageShell from '@/components/PageShell';

export default function ExcelligencePage() {
  return (
    <PageShell
      label="Knowledge Graph"
      title="Excelligence Graph Explorer"
      description="Force-directed knowledge graph mapping the connections between DDL systems, standards, and concepts. Explore mode for discovery. Path Finder for shortest routes between nodes."
    >
      <div className="ddl-dex-insight mt-8">
        <div className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-ddl-wine mb-3">
          DexInsight
        </div>
        <p className="font-body italic text-base text-ddl-muted-light leading-relaxed">
          The Excelligence Graph Explorer is a governed pattern registry for Excel rendered as an interactive force-directed graph. Filterable by tier, type, and edge type. The interactive artifact is being integrated in Phase 2.
        </p>
      </div>

      <div className="mt-12 flex justify-center">
        <div className="bg-ddl-navy-light/40 border border-ddl-muted/20 rounded-sm p-12 text-center max-w-md">
          <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-ddl-crimson mb-4">Coming in Phase 2</div>
          <div className="font-heading text-xl text-ddl-cream mb-3">Interactive Graph</div>
          <p className="font-body text-sm text-ddl-muted leading-relaxed">
            Explore mode • Path Finder (BFS) • Tier filtering • Type filtering • Edge type filtering • Click-to-inspect nodes
          </p>
        </div>
      </div>
    </PageShell>
  );
}
