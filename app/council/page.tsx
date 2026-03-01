import PageShell from '@/components/PageShell';

const councilMembers = [
  { name: 'Claude', org: 'Anthropic', role: 'Lead Architect & Primary Build Partner', color: '#B23531' },
  { name: 'GPT-4o', org: 'OpenAI', role: 'Strategic Analysis & Framework Validation', color: '#74AA9C' },
  { name: 'Gemini', org: 'Google', role: 'Synthesis & Cross-Domain Integration', color: '#4285F4' },
  { name: 'Grok', org: 'xAI', role: 'Pattern Disruption & Assumption Testing', color: '#1DA1F2' },
  { name: 'DeepSeek', org: 'DeepSeek', role: 'Deep Analysis & Technical Rigor', color: '#6366F1' },
  { name: 'Copilot', org: 'Microsoft', role: 'Enterprise Integration & Accessibility', color: '#00BCF2' },
  { name: 'Llama', org: 'Meta', role: 'Open Source Perspective & Scalability', color: '#0668E1' },
  { name: 'Mistral', org: 'Mistral AI', role: 'European Standards & Efficiency', color: '#FF7000' },
  { name: 'Perplexity', org: 'Perplexity', role: 'Research Synthesis & Source Validation', color: '#20B2AA' },
];

export default function CouncilPage() {
  return (
    <PageShell
      label="The DDL Council"
      title="Nine Models. Convergent Analysis."
      description="Every major decision, architecture, and deliverable passes through the DDL Council — nine AI models providing independent analysis that converges on actionable consensus."
    >
      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-16">
        {[
          { value: '200+', label: 'Council Reviews' },
          { value: '4.57M', label: 'Words Processed' },
          { value: '9', label: 'Active Models' },
        ].map((s) => (
          <div key={s.label} className="text-center p-6 bg-ddl-navy-light/40 border border-ddl-muted/20 rounded-sm">
            <div className="font-mono text-3xl font-bold text-ddl-crimson">{s.value}</div>
            <div className="font-body text-sm text-ddl-muted-light mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Methodology */}
      <div className="mb-16">
        <h2 className="font-heading text-xl font-semibold text-ddl-cream mb-6">How It Works</h2>
        <div className="space-y-4">
          {[
            { step: '01', title: 'Prompt Distribution', desc: 'The same prompt is sent to all nine models independently. No model sees another\'s output.' },
            { step: '02', title: 'Independent Analysis', desc: 'Each model responds from its own architecture, training, and reasoning style.' },
            { step: '03', title: 'Convergence Mapping', desc: 'The Operator maps where models agree (signal) and where they diverge (investigation points).' },
            { step: '04', title: 'Synthesis', desc: 'Convergent themes become decisions. Divergent themes become follow-up prompts or blind spot documentation.' },
          ].map((s) => (
            <div key={s.step} className="flex gap-6 items-start p-5 bg-ddl-navy-light/20 border-l-2 border-ddl-crimson/30">
              <div className="font-mono text-sm font-bold text-ddl-crimson shrink-0">{s.step}</div>
              <div>
                <div className="font-heading text-base font-semibold text-ddl-cream mb-1">{s.title}</div>
                <div className="font-body text-sm text-ddl-muted-light leading-relaxed">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Council Members */}
      <h2 className="font-heading text-xl font-semibold text-ddl-cream mb-6">Council Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {councilMembers.map((m) => (
          <div key={m.name} className="bg-ddl-navy-light/40 border border-ddl-muted/20 p-6 rounded-sm hover:border-ddl-muted/40 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 rounded-full shrink-0" style={{ background: m.color }} />
              <div className="font-heading text-lg font-semibold text-ddl-cream">{m.name}</div>
            </div>
            <div className="font-mono text-[0.65rem] text-ddl-muted-light uppercase tracking-[0.1em] mb-2">{m.org}</div>
            <div className="font-body text-sm text-ddl-muted leading-relaxed">{m.role}</div>
          </div>
        ))}
      </div>

      <div className="ddl-dex-insight mt-12">
        <div className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-ddl-wine mb-3">
          DexInsight
        </div>
        <p className="font-body italic text-base text-ddl-muted-light leading-relaxed">
          The Council is not a gimmick. It&apos;s a methodology. When nine architecturally distinct models converge on the same conclusion without coordination, that convergence carries more weight than any single model&apos;s confidence. The signal is in the overlap.
        </p>
      </div>
    </PageShell>
  );
}
