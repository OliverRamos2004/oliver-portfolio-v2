import { ArrowRight } from "lucide-react";
import { Wayfinding } from "@/components/layout/Wayfinding";
import { HeroManifesto } from "@/components/hero/HeroManifesto";
import { HeroIntro } from "@/components/hero/HeroIntro";
import { ProjectIndexTable } from "@/components/index/ProjectIndexTable";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { PmSection } from "@/components/pm/PmSection";
import { ResumeSection } from "@/components/resume/ResumeSection";
import { GallerySection } from "@/components/gallery/GallerySection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Colophon } from "@/components/layout/Colophon";
import { Button } from "@/components/ui/Button";
import { SectionCta, JumpButton } from "@/components/ui/SectionCta";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { galleryPhotos } from "@/data/gallery";
import { prds } from "@/data/prds";
import { SOCIALS } from "@/data/socials";

export default function Home() {
  return (
    <>
      <Wayfinding />
      <main>
        <HeroManifesto />
        <HeroIntro />
        <ProjectIndexTable projects={projects} />

        <SectionCta>
          <JumpButton target="#contact">
            Let&apos;s build something
            <ArrowRight size={13} strokeWidth={1.5} />
          </JumpButton>
        </SectionCta>

        <SkillsSection categories={skillCategories} dividerTop={false} />
        <PmSection prds={prds} />

        <SectionCta>
          {SOCIALS.map((social) => (
            <Button key={social.href} href={social.href} target="_blank" rel="noopener noreferrer">
              {social.label}
            </Button>
          ))}
        </SectionCta>

        {/* Smaller Builds section temporarily unrendered — Oliver wants it hidden for now, not deleted */}
        <ResumeSection dividerTop={false} />

        <GallerySection photos={galleryPhotos} />
        <ContactSection />
      </main>
      <Colophon />
    </>
  );
}
