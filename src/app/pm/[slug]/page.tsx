import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prds } from "@/data/prds";
import { PrdPage } from "@/components/pm/PrdPage";
import { Wayfinding } from "@/components/layout/Wayfinding";

export function generateStaticParams() {
  return prds.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const prd = prds.find((p) => p.id === slug);
  if (!prd) return {};
  return {
    title: `${prd.title} PRD — Oliver Ramos`,
    description: prd.summary,
  };
}

export default async function PmSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prd = prds.find((p) => p.id === slug);
  if (!prd) notFound();

  return (
    <>
      <Wayfinding variant="dark" />
      <PrdPage prd={prd} />
    </>
  );
}
