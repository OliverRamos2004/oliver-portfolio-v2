"use client";

import { useState, type FormEvent } from "react";
import { EMAIL, FORMSPREE_ENDPOINT } from "@/data/contact";

type Status = "idle" | "submitting" | "success" | "error";

const label = "font-mono text-[length:var(--text-label)] uppercase tracking-[0.14em]";
const field =
  "w-full border border-rule-on-ink bg-transparent px-4 py-3 font-mono text-[15px] text-paper placeholder:text-paper-muted";
const stamp = "hover:bg-signal hover:text-ink focus-visible:bg-signal focus-visible:text-ink";

/**
 * Email (with copy) and the Formspree form, posted with fetch so the reply
 * shows inline instead of redirecting to Formspree's page.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard API unavailable — the mailto link still works
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const busy = status === "submitting";

  return (
    <div id="contact">
      <div className="flex flex-wrap items-center gap-3">
        <a href={`mailto:${EMAIL}`} className={`group inline-flex items-center gap-3 py-1 text-[clamp(1.125rem,2.2vw,1.75rem)] ${stamp}`}>
          {EMAIL}
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">↗</span>
        </a>
        <button type="button" onClick={copyEmail} className={`border border-rule-on-ink px-3 py-2 ${label} active:translate-y-px ${stamp}`}>
          {copied ? "Copied" : "Copy email"}
        </button>
      </div>

      <form onSubmit={onSubmit} className="mt-10 grid gap-4 md:grid-cols-2" aria-busy={busy}>
        <label className="grid gap-2">
          <span className={`${label} text-paper-muted`}>Name</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="grid gap-2">
          <span className={`${label} text-paper-muted`}>Email</span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
        <label className="grid gap-2 md:col-span-2">
          <span className={`${label} text-paper-muted`}>Message</span>
          <textarea name="message" required rows={5} className={`${field} resize-y`} />
        </label>
        <div className="flex flex-wrap items-center gap-4 md:col-span-2">
          <button
            type="submit"
            disabled={busy}
            className={`border border-paper px-5 py-3 ${label} active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40 ${busy ? "" : stamp}`}
          >
            {busy ? "Sending…" : "Send message →"}
          </button>
          {/* On ink, errors use signal (5.0:1) with a text prefix, never color alone. */}
          <p aria-live="polite" className={`${label} ${status === "error" ? "text-signal" : "text-paper"}`}>
            {status === "success" && "✓ Thanks — your message is in."}
            {status === "error" && `Error: it didn't send. Email ${EMAIL} instead.`}
          </p>
        </div>
      </form>
    </div>
  );
}
