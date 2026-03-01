'use client';

import Link from 'next/link';

interface ArtifactCardProps {
  title: string;
  description: string;
  tag: string;
  href: string;
}

export default function ArtifactCard({ title, description, tag, href }: ArtifactCardProps) {
  return (
    <Link href={href} className="no-underline group">
      <div className="bg-ddl-navy-light/40 border border-ddl-muted/25 rounded-sm p-7 transition-all duration-300 group-hover:bg-ddl-navy-light group-hover:border-ddl-crimson group-hover:-translate-y-0.5">
        <div className="flex justify-between items-start mb-3">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ddl-crimson bg-ddl-crimson/10 px-2.5 py-1 rounded-sm">
            {tag}
          </span>
          <span className="text-ddl-muted group-hover:text-ddl-crimson transition-colors duration-300">
            →
          </span>
        </div>
        <h3 className="font-heading text-lg font-semibold text-ddl-cream mb-2 tracking-tight">
          {title}
        </h3>
        <p className="font-body text-sm text-ddl-muted-light leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
}
