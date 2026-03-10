'use client';
import { useRouter } from 'next/navigation';

export default function BackButton({ href, label }) {
  const router = useRouter();
  const handleClick = () => href ? router.push(href) : router.back();

  return (
    <button
      onClick={handleClick}
      style={{
        position: 'fixed', top: 68, left: 16, zIndex: 50,
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '6px 10px',
        borderRadius: 4,
        opacity: 0.35,
        transition: 'opacity 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
      onMouseLeave={e => e.currentTarget.style.opacity = '0.35'}
    >
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#F5F1EB', letterSpacing: '0.05em' }}>
        ← {label || 'back'}
      </span>
    </button>
  );
}
