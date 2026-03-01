'use client';

import data from '@/data/ddl.json';
import SectionExplorer from '@/components/SectionExplorer';

export default function DDLPage() {
  const sections = data.sections as { title: string; slug: string; preview: string; content: string }[];
  return (
    <SectionExplorer
      title="DDL"
      subtitle="The operational methodology — charter, standards, governance, and tools."
      accent="#B23531"
      basePath="/ddl"
      sections={sections}
    />
  );
}
