'use client';

import data from '@/data/dexos.json';
import SectionPageView from '@/components/SectionPageView';
import { useParams } from 'next/navigation';

export default function DexOSSectionPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const sections = data.sections as { title: string; slug: string; preview: string; content: string }[];
  const section = sections.find((s) => s.slug === slug) ?? null;

  return (
    <SectionPageView
      section={section}
      parentTitle="DexOS"
      parentPath="/dexos"
      accent="#97072F"
    />
  );
}
