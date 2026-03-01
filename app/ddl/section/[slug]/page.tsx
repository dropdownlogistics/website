import data from '@/data/ddl.json';
import SectionPageView from '@/components/SectionPageView';

export function generateStaticParams() {
  return (data.sections as { slug: string }[]).map((s) => ({ slug: s.slug }));
}

export default function DDLSectionPage({ params }: { params: { slug: string } }) {
  const sections = data.sections as { title: string; slug: string; preview: string; content: string }[];
  const section = sections.find((s) => s.slug === params.slug) ?? null;

  return (
    <SectionPageView
      section={section}
      parentTitle="DDL"
      parentPath="/ddl"
      accent="#B23531"
    />
  );
}