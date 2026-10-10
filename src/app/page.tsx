import { RunningHead } from "@/components/layout/RunningHead";
import { Cover } from "@/components/cover/Cover";
import { Contents } from "@/components/contents/Contents";
import { Part } from "@/components/part/Part";
import { PartOpener } from "@/components/part/PartOpener";
import { FeatureSpread } from "@/components/part/FeatureSpread";
import { ShortTakes } from "@/components/part/ShortTakes";
import { PART_ORDER, featuresFor, shortTakesFor } from "@/lib/monograph";
import { Credits } from "@/components/credits/Credits";

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
        <Credits />
      </main>
    </>
  );
}
