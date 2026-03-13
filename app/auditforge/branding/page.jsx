'use client';
import BackButton from '@/components/BackButton';

export default function AuditForgeBranding() {
  return (
    <div style={{ background: '#0D1B2A', minHeight: '100vh' }}>
      <BackButton />
      <iframe
        src="/preview/auditforge-brand-kit.html"
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
          display: 'block',
        }}
        title="AuditForge Brand Kit"
      />
    </div>
  );
}
