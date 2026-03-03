import { notFound } from "next/navigation";
import { eras, getEraBySlug } from "@/lib/dexlore-data";
import EraLayout from "@/components/dexlore/EraLayout";

export function generateStaticParams() {
  return eras.map((era) => ({ era: era.slug }));
}

export function generateMetadata({ params }: { params: { era: string } }) {
  const era = getEraBySlug(params.era);
  if (!era) return { title: "Era Not Found" };

  return {
    title: `Era ${era.numeral}: ${era.title} — DexLore`,
    description: era.subtitle,
  };
}

export default function EraPage({ params }: { params: { era: string } }) {
  const era = getEraBySlug(params.era);
  if (!era) notFound();

  const currentIndex = eras.findIndex((e) => e.slug === params.era);
  const nextEra = currentIndex < eras.length - 1 ? eras[currentIndex + 1] : undefined;

  return <EraLayout era={era} nextEra={nextEra} />;
}
