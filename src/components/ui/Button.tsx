"use client";

import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

interface CommonProps {
  /** which surface the button sits on — controls the resting border/text color */
  variant?: "light" | "dark";
  /** selected state (filter toggles) — always a solid accent fill, on either surface */
  active?: boolean;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;
type ButtonAsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & { href: string };

/**
 * Square, sharp-cornered utility button (relies on the site-wide zero-radius
 * reset in globals.css). Renders as <a> when `href` is passed, otherwise
 * <button>. "active" is always an accent fill + charcoal text regardless of
 * surface — the established pattern for the baby-blue accent on this site
 * (see PORTFOLIO_SPEC.md: accent is a fill/highlight, not running text on a
 * light surface, since pastel-on-cream fails contrast).
 */
export function Button(props: ButtonAsButton | ButtonAsAnchor) {
  const { variant = "light", active = false, children, className = "", ...rest } = props;

  const base =
    "inline-flex items-center justify-center gap-2 border px-4 py-2 font-mono text-[11px] uppercase transition-colors duration-200";

  const theme = active
    ? "border-accent bg-accent text-charcoal"
    : variant === "dark"
      ? "border-hairline-on-dark text-white hover:bg-white hover:text-charcoal"
      : "border-hairline-on-light text-charcoal hover:bg-charcoal hover:text-cream";

  const classes = `${base} ${theme} ${className}`;
  const style = { letterSpacing: "var(--tracking-wide)" };

  if ("href" in rest && rest.href) {
    return (
      <a className={classes} style={style} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} style={style} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
