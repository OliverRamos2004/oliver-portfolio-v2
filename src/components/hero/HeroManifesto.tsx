"use client";

import Image from "next/image";
import { motion } from "motion/react";

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
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center md:px-8">
      <Image
        src="/hero/gradient.jpg"
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
        className="relative font-hero leading-[0.9] font-black uppercase text-white"
      >
        <span className="block overflow-hidden">
          <motion.span
            variants={line}
            className="block"
            style={{ fontSize: "clamp(3rem, 9vw, 7rem)", letterSpacing: "-0.045em" }}
          >
            Oliver Ramos
          </motion.span>
        </span>
      </motion.h1>
    </section>
  );
}
