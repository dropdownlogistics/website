import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 px-6 bg-ddl-navy border-t border-ddl-muted/10 mt-16">
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12">
        {/* Brand column */}
        <div>
          <div className="font-heading text-sm font-semibold tracking-[0.12em] uppercase mb-4">
            <span className="text-ddl-cream">DROP DOWN </span>
            <span className="text-ddl-crimson">LOGISTICS</span>
          </div>
          <p className="font-body text-sm text-ddl-muted leading-relaxed max-w-xs">
            One-person operations studio. Governed systems, dimensional architectures, and automation frameworks built to institutional standards.
          </p>
          <div className="font-mono text-[0.7rem] text-ddl-muted mt-6 flex items-center gap-2">
            Chaos <span className="text-ddl-crimson">→</span> Structured <span className="text-ddl-crimson">→</span> Automated
          </div>
        </div>

        {/* Navigate column */}
        <div>
          <div className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-ddl-muted-light mb-4">
            Navigate
          </div>
          {[
            { href: '/systems', label: 'Systems' },
            { href: '/standards', label: 'Standards' },
            { href: '/excelligence', label: 'Graph Explorer' },
            { href: '/forewords', label: 'Forewords' },
            { href: '/council', label: 'Council' },
            { href: '/memoir', label: 'Memoir' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block font-body text-sm text-ddl-muted no-underline py-1.5 hover:text-ddl-cream transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Connect column */}
        <div>
          <div className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-ddl-muted-light mb-4">
            Connect
          </div>
          {[
            { href: 'https://substack.com', label: 'Substack' },
            { href: 'https://github.com/dropdownlogistics', label: 'GitHub' },
            { href: 'https://reddit.com', label: 'Reddit' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-body text-sm text-ddl-muted no-underline py-1.5 hover:text-ddl-cream transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto mt-12 pt-6 border-t border-ddl-muted/10 flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="font-mono text-[0.6rem] text-ddl-muted tracking-wide">
          © 2026 Dropdown Logistics. All systems governed.
        </div>
        <div className="font-mono text-[0.6rem] text-ddl-muted tracking-wide">
          Built with governance-grade standards.
        </div>
      </div>
    </footer>
  );
}
