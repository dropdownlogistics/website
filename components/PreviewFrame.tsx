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
        // Hide any nav/header elements inside the iframe
        const selectors = 'header, nav, .site-nav, .navbar, [class*="nav-"], [class*="Nav"]';
        doc.querySelectorAll(selectors).forEach(el => {
          (el as HTMLElement).style.display = 'none';
        });
        // Also hide any fixed/sticky positioned elements at the top (likely navs)
        doc.querySelectorAll('*').forEach(el => {
          const style = window.getComputedStyle(el as Element);
          if (
            (style.position === 'fixed' || style.position === 'sticky') &&
            parseInt(style.top) <= 10
          ) {
            (el as HTMLElement).style.display = 'none';
          }
        });
      } catch (e) { /* cross-origin guard */ }
    };

    iframe.addEventListener('load', hideNav);
    return () => iframe.removeEventListener('load', hideNav);
  }, [src]);

  return (
    <iframe
      ref={ref}
      src={src}
      title={title}
      style={{ width: '100%', height: '100vh', border: 'none' }}
    />
  );
}
