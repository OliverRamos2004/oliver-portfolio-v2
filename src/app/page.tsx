import { RunningHead } from "@/components/layout/RunningHead";
import { Cover } from "@/components/cover/Cover";
import { Contents } from "@/components/contents/Contents";
import { FeaturedWork } from "@/components/featured/FeaturedWork";
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
      <RunningHead />
      <main>
        <Cover />
        <Contents />
        {/* Stage 3+ replaces everything below (SPEC §5 rollout). */}
        <FeaturedWork projects={projects} />
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
