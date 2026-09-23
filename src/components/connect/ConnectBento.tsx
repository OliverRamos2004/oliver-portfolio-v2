import { ArrowUpRight, MapPin } from "lucide-react";
import { SOCIALS } from "@/data/socials";

const tileClass =
  "group relative flex flex-col justify-between border border-hairline-on-light p-5 transition-colors duration-200 hover:bg-charcoal hover:text-cream";

export function ConnectBento() {
  return (
    <div className="grid grid-cols-2 gap-3 px-4 py-16 md:grid-cols-4 md:px-8 md:py-24">
      <div className={`${tileClass} col-span-2 row-span-2 text-charcoal`}>
        <MapPin size={20} strokeWidth={1.5} />
        <div>
          <p
            className="font-mono text-xs uppercase opacity-50"
            style={{ letterSpacing: "var(--tracking-widest)" }}
          >
            Based in
          </p>
          <p className="mt-1 font-display text-2xl font-bold uppercase" style={{ letterSpacing: "var(--tracking-tight)" }}>
            Austin, TX
          </p>
        </div>
      </div>

      {SOCIALS.map((social) => (
        <a
          key={social.href}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${tileClass} text-charcoal`}
        >
          <ArrowUpRight
            size={16}
            strokeWidth={1.5}
            className="self-end transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
          <span className="font-mono text-xs uppercase" style={{ letterSpacing: "var(--tracking-wide)" }}>
            {social.label}
          </span>
        </a>
      ))}
    </div>
  );
}
