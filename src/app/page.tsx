import { RunningHead } from "@/components/layout/RunningHead";
import { Cover } from "@/components/cover/Cover";
import { Contents } from "@/components/contents/Contents";
import { Part } from "@/components/part/Part";
import { PartOpener } from "@/components/part/PartOpener";
import { FeatureSpread } from "@/components/part/FeatureSpread";
import { ShortTakes } from "@/components/part/ShortTakes";
import { Turn } from "@/components/part/Turn";
import { PhotoInterlude } from "@/components/interlude/PhotoInterlude";
import { INTERLUDES } from "@/data/interludes";
import { Fragment } from "react";
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
          <Fragment key={part}>
            {/* The turn sits on the seam, between the two parts. */}
            {part === "craft" && <Turn />}
            <Part part={part}>
              <PartOpener part={part} />
              {featuresFor(part).map((project, i) => (
                <FeatureSpread key={project.id} project={project} index={i} lead={part === "systems" && i === 0} />
              ))}
              {/* Part I closes on its photo; Part II sets its photo between features and takes. */}
              {part === "craft" && <PhotoInterlude photo={INTERLUDES.craft} />}
              <ShortTakes part={part} items={shortTakesFor(part)} />
              {part === "systems" && <PhotoInterlude photo={INTERLUDES.systems} />}
            </Part>
          </Fragment>
        ))}
        <Credits />
      </main>
    </>
  );
}
