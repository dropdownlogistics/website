import data from '@/data/dexos.json';
import SectionPageView from '@/components/SectionPageView';

export function generateStaticParams() {
  return (data.sections as { slug: string }[]).map((s) => ({ slug: s.slug }));
}

export default function DexOSSectionPage({ params }: { params: { slug: string } }) {
  const sections = data.sections as { title: string; slug: string; preview: string; content: string }[];
  const section = sections.find((s) => s.slug === params.slug) ?? null;

  return (
    <SectionPageView
      section={section}
      parentTitle="DexOS"
      parentPath="/dexos"
      accent="#97072F"
    />
  );
}
