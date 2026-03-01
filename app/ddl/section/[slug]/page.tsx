'use client';

import data from '@/data/ddl.json';
import SectionPageView from '@/components/SectionPageView';
import { useParams } from 'next/navigation';

export default function DDLSectionPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const sections = data.sections as { title: string; slug: string; preview: string; content: string }[];
  const section = sections.find((s) => s.slug === slug) ?? null;

  return (
    <SectionPageView
      section={section}
      parentTitle="DDL"
      parentPath="/ddl"
      accent="#B23531"
    />
  );
}
