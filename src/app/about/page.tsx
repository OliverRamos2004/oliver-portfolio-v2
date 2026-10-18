import type { Metadata } from "next";
import { RunningHead } from "@/components/layout/RunningHead";
import { Profile } from "@/components/profile/Profile";

export const metadata: Metadata = {
  title: "About — Oliver Ramos",
  description: "Oliver Ramos, Austin, TX: a profile, the studio, and what happens outside it.",
};

export default function AboutPage() {
  return (
    <>
      <RunningHead />
      <main>
        <Profile />
      </main>
    </>
  );
}
