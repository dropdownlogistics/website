'use client';
import { useRef, useEffect } from 'react';

export default function PreviewFrame({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;

    const hideNav = () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;
        // Inject CSS to instantly hide nav elements — no flash
        const style = doc.createElement('style');
        style.textContent = `
          header, nav, .site-nav, .navbar,
          [class*="nav-"], [class*="Nav"],
          [style*="position: fixed"][style*="top: 0"],
          [style*="position:fixed"][style*="top:0"],
          [style*="position: sticky"][style*="top: 0"],
          [style*="position:sticky"][style*="top:0"] {
            display: none !important;
          }
        `;
        doc.head.appendChild(style);
      } catch (e) { /* cross-origin guard */ }
      // Fade in after cleanup
      iframe.style.opacity = '1';
    };

    iframe.addEventListener('load', hideNav);
    return () => iframe.removeEventListener('load', hideNav);
  }, [src]);

  return (
    <iframe
      ref={ref}
      src={src}
      title={title}
      style={{ width: '100%', height: '100vh', border: 'none', opacity: 0, transition: 'opacity 0.15s' }}
    />
  );
}
