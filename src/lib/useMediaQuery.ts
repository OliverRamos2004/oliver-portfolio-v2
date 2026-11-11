"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query. False on the server and during hydration,
 * so anything gated on it (the custom cursor) only appears on the client.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** A mouse or trackpad: hover exists and the pointer is precise. */
export const FINE_POINTER = "(hover: hover) and (pointer: fine)";
