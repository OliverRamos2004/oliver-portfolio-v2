import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export function AboutIntro() {
  return (
    <section className="pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="px-4 md:px-8">
        <Link
          href="/#index"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase text-charcoal/50 transition-colors duration-200 hover:text-charcoal"
          style={{ letterSpacing: "var(--tracking-wide)" }}
        >
          <ArrowLeft size={13} strokeWidth={1.5} />
          Index
        </Link>
      </div>

      <div className="mt-8 px-4 md:mt-10 md:px-8">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:gap-16">
          <div>
            <span
              className="font-mono text-xs uppercase text-charcoal/50"
              style={{ letterSpacing: "var(--tracking-widest)" }}
            >
              About
            </span>
            <h1
              className="mt-3 font-display font-black uppercase leading-[0.85] text-charcoal"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", letterSpacing: "var(--tracking-tightest)" }}
            >
              Hi My Name is
              <br />
              Oliver Ramos.
            </h1>
          </div>
          <p className="max-w-lg font-sans text-base leading-relaxed text-charcoal/70 md:self-end">
            I&rsquo;m Oliver, I have a Bachelor&rsquo;s in CS and an eye for art and design.
            I love to build things that are both functional and beautiful, and solve problems in a way that is both practical and efficient.
            My work is a reflection of my own personal journey.
          </p>
        </div>
      </div>

      <div className="mt-10 px-4 md:mt-14 md:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden border border-hairline-on-light">
          <Image
            src="/about/ramos-hero2.jpg"
            alt="Oliver Ramos"
            width={2000}
            height={1371}
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="block h-auto w-full object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
