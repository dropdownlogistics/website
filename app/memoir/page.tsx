import Link from 'next/link';
import PageShell from '@/components/PageShell';

export default function MemoirPage() {
  return (
    <PageShell
      label="Little to Know Experience"
      title="A Memoir"
      description="52,595 words about sobriety, marriage, systems thinking, and the architecture of getting your life back. Written during evening hours. Published weekly on Substack."
    >
      {/* Featured quote */}
      <div className="text-center mb-16">
        <blockquote className="font-body text-3xl italic text-ddl-cream leading-relaxed relative inline-block">
          <span className="absolute -top-8 -left-4 text-6xl text-ddl-crimson/20 font-serif">&ldquo;</span>
          Sometimes love is certified mail.
          <span className="absolute -bottom-4 -right-4 text-6xl text-ddl-crimson/20 font-serif">&rdquo;</span>
        </blockquote>
      </div>

      {/* Book architecture */}
      <div className="mb-16">
        <h2 className="font-heading text-xl font-semibold text-ddl-cream mb-6">Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Total Words', value: '52,595' },
            { label: 'Writing Sessions', value: 'Evening hours' },
            { label: 'Distribution', value: 'Weekly on Substack' },
            { label: 'Council Forewords', value: '9 independent' },
            { label: 'Sobriety', value: '8 years' },
            { label: 'Core Thesis', value: 'Systems save lives' },
          ].map((item) => (
            <div key={item.label} className="flex justify-between items-center p-4 bg-ddl-navy-light/40 border border-ddl-muted/20 rounded-sm">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-ddl-muted-light">{item.label}</span>
              <span className="font-heading text-base font-semibold text-ddl-cream">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Themes */}
      <div className="mb-16">
        <h2 className="font-heading text-xl font-semibold text-ddl-cream mb-6">Themes</h2>
        <div className="space-y-3">
          {[
            'Recovery as systems architecture — building structure where chaos lived',
            'Marriage as collaboration protocol — two people, one governance framework',
            'AI as cognitive infrastructure — not replacement, but amplification',
            'Professional reinvention — from audit methodology to dimensional thinking',
            'The gap between knowing and experiencing — little to know experience',
          ].map((theme, i) => (
            <div key={i} className="flex gap-4 items-start p-4 border-l-2 border-ddl-wine/30">
              <span className="font-mono text-xs text-ddl-crimson shrink-0 mt-0.5">0{i + 1}</span>
              <span className="font-body text-sm text-ddl-muted-light leading-relaxed">{theme}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a
          href="https://substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.72rem] tracking-[0.1em] uppercase px-8 py-3.5 bg-ddl-crimson text-ddl-cream no-underline rounded-sm hover:bg-ddl-wine transition-colors"
        >
          Read on Substack
        </a>
        <Link
          href="/forewords"
          className="font-mono text-[0.72rem] tracking-[0.1em] uppercase px-8 py-3.5 bg-transparent text-ddl-muted-light no-underline rounded-sm border border-ddl-muted/30 hover:border-ddl-crimson hover:text-ddl-cream transition-all"
        >
          Read the Forewords
        </Link>
      </div>

      <div className="ddl-dex-insight mt-16">
        <div className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-ddl-wine mb-3">
          DexInsight
        </div>
        <p className="font-body italic text-base text-ddl-muted-light leading-relaxed">
          The memoir isn&apos;t separate from the systems. The systems <em>are</em> the memoir. Every governance framework, every dimensional architecture, every council review exists because someone needed structure to survive. The book documents the need. The site documents the solution.
        </p>
      </div>
    </PageShell>
  );
}
