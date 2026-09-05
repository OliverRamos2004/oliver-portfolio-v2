"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

const EASE_CRISP = [0.76, 0, 0.24, 1] as const;
const EMAIL = "oliver78660@gmail.com";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/OliverRamos2004" },
  { label: "LinkedIn", href: "https://linkedin.com/in/oliverramos1" },
];

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard API unavailable — the mailto link above still works
    }
  }

  return (
    <section id="contact" className="bg-charcoal px-4 py-24 md:px-8 md:py-32">
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: EASE_CRISP }}
        className="block font-mono text-xs uppercase text-accent"
        style={{ letterSpacing: "var(--tracking-widest)" }}
      >
        Get In Touch
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: EASE_CRISP, delay: 0.1 }}
        className="mt-4 font-display font-black uppercase leading-[0.85] text-white"
        style={{ fontSize: "clamp(2.75rem, 9vw, 7rem)", letterSpacing: "var(--tracking-tightest)" }}
      >
        Let&rsquo;s build
        <br />
        something.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: EASE_CRISP, delay: 0.25 }}
        className="mt-10 flex flex-col gap-6 md:mt-14"
      >
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${EMAIL}`}
            className="group inline-flex items-center gap-3 font-sans text-2xl text-white transition-colors duration-200 hover:text-accent md:text-3xl"
          >
            {EMAIL}
            <ArrowUpRight
              size={26}
              strokeWidth={1.5}
              className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>

          <Button variant="dark" onClick={copyEmail} aria-label="Copy email address">
            {copied ? <Check size={13} strokeWidth={1.5} /> : <Copy size={13} strokeWidth={1.5} />}
            {copied ? "Copied" : "Copy Email"}
          </Button>
        </div>

        <nav className="flex flex-wrap gap-2">
          {SOCIALS.map((social) => (
            <Button key={social.href} variant="dark" href={social.href} target="_blank" rel="noopener noreferrer">
              {social.label}
            </Button>
          ))}
        </nav>
      </motion.div>

      <div className="hairline-t-dark mt-14 flex items-center gap-2 pt-6 font-mono text-[11px] uppercase text-white/40 md:mt-20" style={{ letterSpacing: "var(--tracking-wide)" }}>
        <span className="h-1.5 w-1.5 bg-accent" aria-hidden />
        Based in Austin, TX — open to select collaborations, 2026
      </div>
    </section>
  );
}
