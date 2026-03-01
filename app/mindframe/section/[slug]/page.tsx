'use client';

import data from '@/data/mindframe.json';
import SectionPageView from '@/components/SectionPageView';
import { useParams } from 'next/navigation';

export default function MindFrameSectionPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const sections = data.sections as { title: string; slug: string; preview: string; content: string }[];
  const section = sections.find((s) => s.slug === slug) ?? null;

  return (
    <SectionPageView
      section={section}
      parentTitle="MindFrame"
      parentPath="/mindframe"
      accent="#B23531"
    />
  );
}
