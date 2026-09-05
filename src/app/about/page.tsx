import type { Metadata } from "next";
import { Wayfinding } from "@/components/layout/Wayfinding";
import { Colophon } from "@/components/layout/Colophon";
import { AboutIntro } from "@/components/about/AboutIntro";
import { PhilosophySection } from "@/components/about/PhilosophySection";
import { TimelineSection } from "@/components/about/TimelineSection";
import { OutsideInterestsSection } from "@/components/about/OutsideInterestsSection";
import { Button } from "@/components/ui/Button";
import { timeline, interests, aboutPhotos } from "@/data/about";

export const metadata: Metadata = {
  title: "About — Oliver Ramos",
  description: "Creative technologist and artist based in Austin, TX — philosophy, timeline, and what happens outside the studio.",
};

export default function AboutPage() {
  return (
    <>
      <Wayfinding />
      <main>
        <AboutIntro />
        <PhilosophySection />
        <TimelineSection entries={timeline} />
        <OutsideInterestsSection interests={interests} photos={aboutPhotos} />

        <section className="hairline-t-dark bg-charcoal px-4 py-16 md:px-8 md:py-20">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <p
              className="font-display text-2xl font-bold uppercase text-white md:text-3xl"
              style={{ letterSpacing: "var(--tracking-tight)" }}
            >
              Curious about the work?
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="dark" href="/#index">
                View Work
              </Button>
              <Button variant="dark" href="/#contact">
                Get In Touch
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Colophon />
    </>
  );
}
