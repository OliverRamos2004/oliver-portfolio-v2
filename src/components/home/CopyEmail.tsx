"use client";

import { useEffect, useState } from "react";
import styles from "./home.module.css";

/** The giant email: click copies it. Falls back to opening the mail app if the clipboard is blocked. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const at = email.indexOf("@");

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <>
      <button
        type="button"
        className={`display ${styles.mail}`}
        onClick={copy}
        data-copied={copied}
        data-cursor={copied ? "COPIED ✓" : "COPY"}
        aria-label={`Copy ${email}`}
      >
        {email.slice(0, at)}
        <br />
        {email.slice(at)}
      </button>
      <span className="sr-only" role="status">
        {copied ? "Email copied" : ""}
      </span>
    </>
  );
}
