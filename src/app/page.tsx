import { Wayfinding } from "@/components/layout/Wayfinding";
import { HeroManifesto } from "@/components/hero/HeroManifesto";
import { HeroIntro } from "@/components/hero/HeroIntro";
import { ProjectIndexTable } from "@/components/index/ProjectIndexTable";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { PmSection } from "@/components/pm/PmSection";
import { ConnectBento } from "@/components/connect/ConnectBento";
import { ResumeSection } from "@/components/resume/ResumeSection";
import { GallerySection } from "@/components/gallery/GallerySection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Colophon } from "@/components/layout/Colophon";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { galleryPhotos } from "@/data/gallery";
import { prds } from "@/data/prds";

export default function Home() {
  return (
    <>
      <Wayfinding />
      <main>
        <HeroManifesto />
        <HeroIntro />
        <ProjectIndexTable projects={projects} />
        <SkillsSection categories={skillCategories} dividerTop={false} />
        <PmSection prds={prds} />
        <ConnectBento />

        {/* Smaller Builds section temporarily unrendered — Oliver wants it hidden for now, not deleted */}
        <ResumeSection dividerTop={false} />

        <GallerySection photos={galleryPhotos} />
        <ContactSection />
      </main>
      <Colophon />
    </>
  );
}
