'use client';

import data from '@/data/ddl.json';
import SectionExplorer from '@/components/SectionExplorer';

export default function DDLReferencePage() {
  const sections = data.sections as { title: string; slug: string; preview: string; content: string }[];
  return (
    <SectionExplorer
      title="DDL Reference"
      subtitle="The full operational methodology — charter, standards, governance, and tools."
      accent="#B23531"
      basePath="/ddl/reference"
      sections={sections}
    />
  );
}
