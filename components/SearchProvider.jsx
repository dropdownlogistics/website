'use client';

import { useState, useEffect } from 'react';
import SearchModal from './SearchModal';

export default function SearchProvider() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return <SearchModal isOpen={open} onClose={() => setOpen(false)} />;
}
