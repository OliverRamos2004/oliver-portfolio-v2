import { Wayfinding } from "@/components/layout/Wayfinding";
import { HeroManifesto } from "@/components/hero/HeroManifesto";
import { ProjectIndexTable } from "@/components/index/ProjectIndexTable";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { VisualExplorationsGrid } from "@/components/explorations/VisualExplorationsGrid";
import { GallerySection } from "@/components/gallery/GallerySection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Colophon } from "@/components/layout/Colophon";
import { projects } from "@/data/projects";
import { artifacts } from "@/data/artifacts";
import { skillCategories } from "@/data/skills";
import { galleryPhotos } from "@/data/gallery";

export default function Home() {
  return (
    <>
      <Wayfinding />
      <main>
        <HeroManifesto />
        <ProjectIndexTable projects={projects} />
        <SkillsSection categories={skillCategories} />
        <VisualExplorationsGrid artifacts={artifacts} />
        <GallerySection photos={galleryPhotos} />
        <ContactSection />
      </main>
      <Colophon />
    </>
  );
}
