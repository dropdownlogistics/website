'use client';

import data from '@/data/dexos.json';
import SectionExplorer from '@/components/SectionExplorer';

export default function DexOSPage() {
  const sections = data.sections as { title: string; slug: string; preview: string; content: string }[];
  return (
    <SectionExplorer
      title="DexOS"
      subtitle="The behavior-first operating schema — modes, runtime, relay, and the nine-model council."
      accent="#97072F"
      basePath="/dexos"
      sections={sections}
    />
  );
}
