import PageShell from '@/components/PageShell';

export default function StandardsPage() {
  return (
    <PageShell
      label="Standards Registry"
      title="65 Enforced Standards"
      description="The governance backbone. Organized by classification: Obligatory, Procedural, Recommended, and Vehicle. Every standard has a purpose, scope, and enforcement mechanism."
    >
      <div className="ddl-dex-insight mt-8">
        <div className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-ddl-wine mb-3">
          DexInsight
        </div>
        <p className="font-body italic text-base text-ddl-muted-light leading-relaxed">
          Standards aren&apos;t guidelines — they&apos;re load-bearing infrastructure. The interactive standards browser with OBS/PRO/REC/VEH tabs, search, and expandable records is being integrated in Phase 2.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        {[
          { type: 'OBS', label: 'Obligatory', count: 29, desc: 'Must follow' },
          { type: 'PRO', label: 'Procedural', count: 18, desc: 'How-to standards' },
          { type: 'REC', label: 'Recommended', count: 12, desc: 'Best practices' },
          { type: 'VEH', label: 'Vehicle', count: 6, desc: 'Delivery methods' },
        ].map((s) => (
          <div key={s.type} className="bg-ddl-navy-light/40 border border-ddl-muted/20 p-6 rounded-sm text-center">
            <div className="font-mono text-xs font-bold text-ddl-crimson tracking-[0.15em] mb-2">{s.type}</div>
            <div className="font-mono text-3xl font-bold text-ddl-cream">{s.count}</div>
            <div className="font-body text-sm text-ddl-muted mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
