import { RunningHead } from "@/components/layout/RunningHead";
import { Cover } from "@/components/cover/Cover";
import { Contents } from "@/components/contents/Contents";
import { Part } from "@/components/part/Part";
import { PartOpener } from "@/components/part/PartOpener";
import { FeatureSpread } from "@/components/part/FeatureSpread";
import { Bento } from "@/components/part/Bento";
import { Turn } from "@/components/part/Turn";
import { Fragment } from "react";
import { PART_ORDER, featuresFor, bentoFor } from "@/lib/monograph";
import { Credits } from "@/components/credits/Credits";

export default function Home() {
  return (
    <>
      <RunningHead />
      <main>
        <Cover />
        <Contents />
        {PART_ORDER.map((part) => (
          <Fragment key={part}>
            {/* The turn sits on the seam, between the two parts. */}
            {part === "craft" && <Turn />}
            <Part part={part}>
              <PartOpener part={part} />
              {featuresFor(part).map((project, i) => (
                <FeatureSpread key={project.id} project={project} index={i} lead={part === "systems" && i === 0} />
              ))}
              <Bento part={part} items={bentoFor(part)} />
            </Part>
          </Fragment>
        ))}
        <Credits />
      </main>
    </>
  );
}
