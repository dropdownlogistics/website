import PageShell from '@/components/PageShell';

export default function ForewordsPage() {
  return (
    <PageShell
      label="Foreword Convergence"
      title="Nine Models. One Thesis."
      description="Each member of the DDL Council wrote a foreword for Little to Know Experience — independently, without seeing the others. What emerged was convergence. This scrolling essay maps where they agree, where they diverge, and what that reveals."
    >
      <div className="ddl-dex-insight mt-8">
        <div className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-ddl-wine mb-3">
          DexInsight
        </div>
        <p className="font-body italic text-base text-ddl-muted-light leading-relaxed">
          The Foreword Convergence essay is a scroll-triggered interactive piece with nine council member sections, a convergence map, blind spot analysis, and DexInsights throughout. The full artifact is being integrated in Phase 2.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { name: 'Claude', role: 'Lead Architect', org: 'Anthropic' },
          { name: 'GPT-4o', role: 'Strategic Analyst', org: 'OpenAI' },
          { name: 'Gemini', role: 'Synthesis Engine', org: 'Google' },
          { name: 'Grok', role: 'Pattern Disruptor', org: 'xAI' },
          { name: 'DeepSeek', role: 'Deep Analyst', org: 'DeepSeek' },
          { name: 'Copilot', role: 'Integration Specialist', org: 'Microsoft' },
          { name: 'Llama', role: 'Open Source Voice', org: 'Meta' },
          { name: 'Mistral', role: 'European Perspective', org: 'Mistral AI' },
          { name: 'Perplexity', role: 'Research Synthesizer', org: 'Perplexity' },
        ].map((m) => (
          <div key={m.name} className="bg-ddl-navy-light/40 border border-ddl-muted/20 p-5 rounded-sm">
            <div className="font-heading text-base font-semibold text-ddl-cream">{m.name}</div>
            <div className="font-mono text-[0.65rem] text-ddl-crimson mt-1">{m.role}</div>
            <div className="font-body text-xs text-ddl-muted mt-0.5">{m.org}</div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
