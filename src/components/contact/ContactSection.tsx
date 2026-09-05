"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

const EASE_CRISP = [0.76, 0, 0.24, 1] as const;
const EMAIL = "oliver78660@gmail.com";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/OliverRamos2004" },
  { label: "LinkedIn", href: "https://linkedin.com/in/oliverramos1" },
  { label: "Instagram", href: "https://instagram.com/oliverramos2004" },
];

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzeprlal";

const inputClasses =
  "border border-hairline-on-dark bg-cream px-4 py-3 font-sans text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-accent";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard API unavailable — the mailto link above still works
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setFormStatus("submitting");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        form.reset();
        setFormStatus("success");
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
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

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: EASE_CRISP, delay: 0.35 }}
        className="hairline-t-dark mt-14 max-w-xl pt-10 md:mt-20"
      >
        <AnimatePresence mode="wait">
          {formStatus === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE_CRISP }}
              className="flex items-center gap-2 font-sans text-base text-white"
            >
              <span className="h-1.5 w-1.5 bg-accent" aria-hidden />
              Thanks — your message is in. I&rsquo;ll get back to you soon.
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              <span
                className="font-mono text-xs uppercase text-white/40"
                style={{ letterSpacing: "var(--tracking-widest)" }}
              >
                Or send a message directly
              </span>
              <div className="grid gap-4 sm:grid-cols-2">
                <input type="text" name="name" placeholder="Name" required className={inputClasses} />
                <input type="email" name="email" placeholder="Email" required className={inputClasses} />
              </div>
              <textarea name="message" placeholder="Message" required rows={5} className={inputClasses} />
              <div className="flex items-center gap-4">
                <Button
                  variant="dark"
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className={`self-start ${formStatus === "submitting" ? "opacity-50" : ""}`}
                >
                  {formStatus === "submitting" ? "Sending..." : "Send Message"}
                </Button>
                {formStatus === "error" && (
                  <span className="font-mono text-xs uppercase text-white/50">
                    Something went wrong — try again.
                  </span>
                )}
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="hairline-t-dark mt-14 flex items-center gap-2 pt-6 font-mono text-[11px] uppercase text-white/40 md:mt-20" style={{ letterSpacing: "var(--tracking-wide)" }}>
        <span className="h-1.5 w-1.5 bg-accent" aria-hidden />
        Based in Austin, TX — open to select collaborations, 2026
      </div>
    </section>
  );
}
