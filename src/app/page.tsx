import { HomeMenu } from "@/components/home/HomeMenu";
import { AboutSheet, ContactSheet, StudioSheet, WorkSheet } from "@/components/home/sheets";
import type { WorkRow } from "@/components/home/WorkList";
import { MENU, WORK } from "@/data/home";
import { projects } from "@/data/projects";

function workRows(): WorkRow[] {
  return WORK.map((w) => {
    const project = projects.find((p) => p.id === w.id);
    // Fail the build, not the visitor: a typo here would otherwise ship a dead link.
    if (!project) throw new Error(`data/home.ts WORK: no project with id "${w.id}"`);
    return { ...w, href: `/work/${project.id}`, year: project.year, status: project.status };
  });
}

export default function Home() {
  return (
    <HomeMenu
      items={MENU}
      sheets={{
        work: <WorkSheet rows={workRows()} />,
        studio: <StudioSheet />,
        about: <AboutSheet />,
        contact: <ContactSheet />,
      }}
    />
  );
}
