'use client';

import data from '@/data/mindframe.json';
import SectionExplorer from '@/components/SectionExplorer';

export default function MindFramePage() {
  const sections = data.sections as { title: string; slug: string; preview: string; content: string }[];
  return (
    <SectionExplorer
      title="MindFrame"
      subtitle="The cognitive architecture — persona calibration, governance, and program execution."
      accent="#B23531"
      basePath="/mindframe"
      sections={sections}
    />
  );
}
