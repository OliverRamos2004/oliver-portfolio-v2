"use client";

import Image from "next/image";
import { motion } from "motion/react";

const LINES = ["CREATIVE", "TECHNOLOGIST", "& ARTIST"];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const line = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] as const },
  },
};

export function HeroManifesto() {
  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden px-4 pb-16 pt-32 md:px-8 md:pb-24">
      <Image
        src="/hero/clouds.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-cream/40" />

      <motion.h1
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative font-display leading-[0.82] font-black uppercase text-charcoal"
        style={{ letterSpacing: "var(--tracking-tightest)" }}
      >
        {LINES.map((text, i) => (
          <span key={text} className="block overflow-hidden">
            <motion.span
              variants={line}
              className="block"
              style={{
                fontSize: "clamp(3.2rem, 12vw, 10.5rem)",
                transform: i === 1 ? "scaleX(0.92) scaleY(1.08)" : undefined,
                transformOrigin: "left center",
              }}
            >
              {text}
            </motion.span>
          </span>
        ))}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="relative mt-8 max-w-md font-sans text-sm text-charcoal/70 md:text-base"
      >
        My name is Oliver. I blend
        production software with generative art, and love to build things that are both functional and beautiful.
        Based in Austin, TX.
      </motion.p>

      <div className="hairline-t absolute inset-x-4 bottom-0 pt-0 md:inset-x-8" />
    </section>
  );
}
