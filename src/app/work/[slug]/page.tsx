import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { prds } from "@/data/prds";
import { CaseSwitch } from "@/components/case/CaseSwitch";
import { caseName, caseNav } from "@/lib/caseNav";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Oliver Ramos`,
    description: project.summary,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  const prd = project.prdId ? prds.find((p) => p.id === project.prdId) : undefined;
  return <CaseSwitch project={project} prd={prd} name={caseName(slug)} {...caseNav(slug)} isOverlay={false} />;
}
