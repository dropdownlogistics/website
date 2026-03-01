interface PageShellProps {
  label: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function PageShell({ label, title, description, children }: PageShellProps) {
  return (
    <div className="min-h-screen pt-32 pb-16 px-6">
      <div className="max-w-[1000px] mx-auto">
        {/* Page header */}
        <div className="text-center mb-16">
          <div className="ddl-section-label">{label}</div>
          <h1 className="ddl-heading text-4xl mb-4">{title}</h1>
          {description && (
            <>
              <div className="ddl-divider mb-6" />
              <p className="ddl-body max-w-xl mx-auto">{description}</p>
            </>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
