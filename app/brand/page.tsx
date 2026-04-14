'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BrandRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace('/branding'); }, [router]);

  return (
    <>
      <head>
        <meta httpEquiv="refresh" content="0; url=/branding" />
      </head>
      <div style={{
        background: '#0D1B2A', color: '#F5F1EB', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#6B7B8D', letterSpacing: '0.15em', marginBottom: 12 }}>
            REDIRECTING &rarr; /branding
          </div>
          <Link href="/branding" style={{ color: '#B23531', textDecoration: 'underline' }}>
            Continue to /branding
          </Link>
        </div>
      </div>
    </>
  );
}
