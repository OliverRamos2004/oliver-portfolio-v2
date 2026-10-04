"use client";

import { motion } from "motion/react";
import { ArrowDown, User } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroIntro() {
  return (
    <section className="relative flex flex-col items-center px-4 py-12 text-center md:px-8 md:py-16">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="mx-auto max-w-md font-sans text-lg font-medium text-charcoal md:text-2xl"
      >
        Developer &amp; consultant
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.78, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="mx-auto mt-3 max-w-md font-sans text-sm text-charcoal/70 md:text-base"
      >
        I design and build websites, storefronts and products for small businesses and founders. Based in Austin, TX.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="mt-8 flex flex-wrap items-center justify-center gap-2"
      >
        <Button variant="solid" href="#work">
          See work
          <ArrowDown size={13} strokeWidth={1.5} />
        </Button>
        <Button href="/about">
          <User size={13} strokeWidth={1.5} />
          About
        </Button>
      </motion.div>
    </section>
  );
}
