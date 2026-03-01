import PageShell from '@/components/PageShell';

export default function SystemsPage() {
  return (
    <PageShell
      label="Systems Registry"
      title="44 Governed Systems"
      description="Every system documented at creation. Filterable by domain, searchable by function. Click any record to see purpose, status, dependencies, and DexInsights."
    >
      {/* DDL Registry Explorer artifact will be integrated here in Phase 2 */}
      <div className="ddl-dex-insight mt-8">
        <div className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-ddl-wine mb-3">
          DexInsight
        </div>
        <p className="font-body italic text-base text-ddl-muted-light leading-relaxed">
          The Systems Registry is the operational core of DDL. Each of the 44 systems has a governed record: what it does, why it exists, what it depends on, and what depends on it. The interactive explorer is being integrated — full search, domain filtering, and expandable records coming in Phase 2.
        </p>
      </div>

      {/* Teaser grid showing system domains */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        {[
          { domain: 'Governance', count: 12 },
          { domain: 'Analytics', count: 8 },
          { domain: 'Collaboration', count: 6 },
          { domain: 'Documentation', count: 7 },
          { domain: 'Automation', count: 5 },
          { domain: 'Architecture', count: 4 },
          { domain: 'Personal', count: 2 },
        ].map((d) => (
          <div key={d.domain} className="bg-ddl-navy-light/40 border border-ddl-muted/20 p-5 rounded-sm text-center">
            <div className="font-mono text-2xl font-bold text-ddl-crimson">{d.count}</div>
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-ddl-muted-light mt-1">{d.domain}</div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
