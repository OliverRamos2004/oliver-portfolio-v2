import { Wayfinding } from "@/components/layout/Wayfinding";
import { HeroManifesto } from "@/components/hero/HeroManifesto";
import { HeroIntro } from "@/components/hero/HeroIntro";
import { FeaturedWork } from "@/components/featured/FeaturedWork";
import { ProjectIndexTable } from "@/components/index/ProjectIndexTable";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ResumeSection } from "@/components/resume/ResumeSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Colophon } from "@/components/layout/Colophon";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";

export default function Home() {
  return (
    <>
      <Wayfinding />
      <main>
        <HeroManifesto />
        <HeroIntro />
        <FeaturedWork projects={projects} />
        <ProjectIndexTable projects={projects} />
        <SkillsSection categories={skillCategories} dividerTop={false} />
        {/* Unrendered, not deleted (2026-10-04 critique: say each thing once): Product → "Read PRD" link in each
            project drawer; Connect bento → socials already live in Contact; Gallery → /about. Smaller Builds
            is still hidden by Oliver's earlier call. */}
        <ResumeSection dividerTop={false} />
        <ContactSection />
      </main>
      <Colophon />
    </>
  );
}
