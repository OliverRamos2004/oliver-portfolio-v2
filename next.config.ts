import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Lets the dev server accept requests from a phone on the same Wi-Fi
     (e.g. http://192.168.1.69:3000) — without this, Next.js 15+ blocks
     internal asset/image requests from any origin other than localhost,
     which can otherwise look like "images just don't load" on-device. */
  allowedDevOrigins: ["192.168.1.69"],
};

export default nextConfig;
