import PageShell from '@/components/PageShell';

const tenets = [
  { num: '01', title: 'Governance at Creation', desc: 'Every system is governed from the moment it\'s built, not retrofitted later.' },
  { num: '02', title: 'Artifact-First Documentation', desc: 'The artifact is the documentation. Build it right and it explains itself.' },
  { num: '03', title: 'Mechanical Over Magical', desc: 'Prefer transparent, repeatable processes over black-box solutions.' },
  { num: '04', title: 'Dimensional Architecture', desc: 'Structure everything into star schemas, fact tables, and dimensional models.' },
  { num: '05', title: 'Adaptive Precision', desc: 'Match the precision of the solution to the precision required by the problem.' },
  { num: '06', title: 'Convergent Analysis', desc: 'Use multiple independent perspectives to find signal in the overlap.' },
  { num: '07', title: 'Portability Over Lock-in', desc: 'Build on open standards. Own your data. Avoid vendor dependency.' },
  { num: '08', title: 'Compound Decisions', desc: 'Optimize for decisions that create value over time, not one-shot wins.' },
];

const timeline = [
  { period: 'Early 2024', event: 'First AI collaboration threads', detail: 'Basic ChatGPT interactions evolve into structured methodology' },
  { period: 'Mid 2024', event: 'DDL methodology formalized', detail: '8 tenets codified. Chaos → Structured → Automated becomes the operating model' },
  { period: 'Late 2024', event: 'Council established', detail: 'Nine-model convergent analysis methodology. First council reviews run.' },
  { period: 'Early 2025', event: 'Systems & Standards registries', detail: '44 systems and 65 standards documented, governed, and cross-referenced' },
  { period: 'Mid 2025', event: 'Memoir written', detail: '52,595 words. Little to Know Experience. Weekly Substack publication begins.' },
  { period: 'Late 2025', event: '200+ council reviews', detail: '4.57 million words of AI collaboration. Excelligence, IntegrityOS, ACE Protocol built.' },
  { period: '2026', event: 'dropdownlogistics.com', detail: 'The artifact registry becomes navigable. The site is the system made visible.' },
];

export default function AboutPage() {
  return (
    <PageShell
      label="About"
      title="Dave Kitchens"
      description="Senior Staff Auditor. CPA. 10+ years in internal audit. Builder of governed systems, dimensional architectures, and automation frameworks. Operator of Dropdown Logistics."
    >
      {/* Who */}
      <div className="mb-16 max-w-2xl mx-auto">
        <p className="font-body text-base text-ddl-muted-light leading-relaxed mb-4">
          DDL is a one-person operations studio that builds systems to institutional standards. It started as a personal need — structure where chaos lived — and matured into a methodology that applies audit-grade governance to creative and technical work.
        </p>
        <p className="font-body text-base text-ddl-muted-light leading-relaxed">
          Everything here was built during evening hours, on a phone, in collaboration with AI models. The council reviews, the dimensional architectures, the memoir — all of it came from treating complex problems with the same rigor as an audit engagement. Document first. Govern at creation. Automate what compounds.
        </p>
      </div>

      {/* Tenets */}
      <div className="mb-16">
        <h2 className="font-heading text-xl font-semibold text-ddl-cream mb-8 text-center">The 8 Tenets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tenets.map((t) => (
            <div key={t.num} className="flex gap-5 items-start p-5 bg-ddl-navy-light/30 border border-ddl-muted/15 rounded-sm">
              <span className="font-mono text-sm font-bold text-ddl-crimson shrink-0">{t.num}</span>
              <div>
                <div className="font-heading text-base font-semibold text-ddl-cream mb-1">{t.title}</div>
                <div className="font-body text-sm text-ddl-muted leading-relaxed">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-16">
        <h2 className="font-heading text-xl font-semibold text-ddl-cream mb-8 text-center">Timeline</h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-ddl-muted/20 md:left-1/2 md:-translate-x-px" />

          <div className="space-y-6">
            {timeline.map((t, i) => (
              <div key={i} className="relative pl-8 md:pl-0">
                {/* Dot */}
                <div className="absolute left-0 top-2 w-4 h-4 rounded-full border-2 border-ddl-crimson bg-ddl-navy md:left-1/2 md:-translate-x-1/2" />

                <div className={`md:w-5/12 ${i % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                  <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-ddl-crimson mb-1">{t.period}</div>
                  <div className="font-heading text-base font-semibold text-ddl-cream mb-1">{t.event}</div>
                  <div className="font-body text-sm text-ddl-muted leading-relaxed">{t.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="text-center">
        <div className="ddl-section-label">Connect</div>
        <div className="flex gap-6 justify-center mt-4">
          {[
            { label: 'Substack', href: 'https://substack.com' },
            { label: 'GitHub', href: 'https://github.com/dropdownlogistics' },
            { label: 'Reddit', href: 'https://reddit.com' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.72rem] tracking-[0.1em] uppercase text-ddl-muted-light no-underline hover:text-ddl-crimson transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="ddl-dex-insight mt-16">
        <div className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-ddl-wine mb-3">
          DexInsight
        </div>
        <p className="font-body italic text-base text-ddl-muted-light leading-relaxed">
          Medicated, calibrated, and defrictionated. The systems aren&apos;t abstractions — they&apos;re the architecture of a life rebuilt. Every tenet came from a lesson learned the hard way. Every standard exists because the unstructured version failed first.
        </p>
      </div>
    </PageShell>
  );
}
