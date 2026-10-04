import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { prds } from "@/data/prds";
import { ProjectDrawer } from "@/components/drawer/ProjectDrawer";
import { Wayfinding } from "@/components/layout/Wayfinding";

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
  const prdHref = prds.some((p) => p.id === project.id) ? `/pm/${project.id}` : undefined;

  return (
    <>
      <Wayfinding variant="dark" />
      <ProjectDrawer project={project} isOverlay={false} prdHref={prdHref} />
    </>
  );
}
