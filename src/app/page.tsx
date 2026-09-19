import { Wayfinding } from "@/components/layout/Wayfinding";
import { HeroManifesto } from "@/components/hero/HeroManifesto";
import { ProjectIndexTable } from "@/components/index/ProjectIndexTable";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { PmSection } from "@/components/pm/PmSection";
import { VisualExplorationsGrid } from "@/components/explorations/VisualExplorationsGrid";
import { SideProjectsSection } from "@/components/side-projects/SideProjectsSection";
import { ResumeSection } from "@/components/resume/ResumeSection";
import { GallerySection } from "@/components/gallery/GallerySection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Colophon } from "@/components/layout/Colophon";
import { projects } from "@/data/projects";
import { artifacts } from "@/data/artifacts";
import { sideProjects } from "@/data/sideProjects";
import { skillCategories } from "@/data/skills";
import { galleryPhotos } from "@/data/gallery";
import { prds } from "@/data/prds";

export default function Home() {
  return (
    <>
      <Wayfinding />
      <main>
        <HeroManifesto />
        <ProjectIndexTable projects={projects} />
        <SkillsSection categories={skillCategories} />
        <PmSection prds={prds} />
        <VisualExplorationsGrid artifacts={artifacts} />
        <SideProjectsSection projects={sideProjects} />
        <ResumeSection />
        <GallerySection photos={galleryPhotos} />
        <ContactSection />
      </main>
      <Colophon />
    </>
  );
}
