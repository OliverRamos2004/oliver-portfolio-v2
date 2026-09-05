import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ProjectDrawer } from "@/components/drawer/ProjectDrawer";

export default async function InterceptedWorkModal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  return <ProjectDrawer project={project} isOverlay />;
}
