import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { prds } from "@/data/prds";
import { CaseFile } from "@/components/case/CaseFile";
import { caseName, caseNav } from "@/lib/caseNav";

export default async function InterceptedWorkModal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  const prd = project.prdId ? prds.find((p) => p.id === project.prdId) : undefined;
  return <CaseFile project={project} prd={prd} name={caseName(slug)} {...caseNav(slug)} isOverlay />;
}
