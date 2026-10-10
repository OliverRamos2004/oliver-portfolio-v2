import { RunningHead } from "@/components/layout/RunningHead";
import { Cover } from "@/components/cover/Cover";
import { Contents } from "@/components/contents/Contents";
import { Part } from "@/components/part/Part";
import { PartOpener } from "@/components/part/PartOpener";
import { FeatureSpread } from "@/components/part/FeatureSpread";
import { ShortTakes } from "@/components/part/ShortTakes";
import { PART_ORDER, featuresFor, shortTakesFor } from "@/lib/monograph";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { PmSection } from "@/components/pm/PmSection";
import { ConnectBento } from "@/components/connect/ConnectBento";
import { ResumeSection } from "@/components/resume/ResumeSection";
import { GallerySection } from "@/components/gallery/GallerySection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Colophon } from "@/components/layout/Colophon";
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
        {PART_ORDER.map((part) => (
          <Part key={part} part={part}>
            <PartOpener part={part} />
            {featuresFor(part).map((project, i) => (
              <FeatureSpread key={project.id} project={project} index={i} lead={part === "systems" && i === 0} />
            ))}
            <ShortTakes part={part} items={shortTakesFor(part)} />
          </Part>
        ))}
        {/* Stages 4–5 replace everything below (SPEC §5 rollout). */}
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
