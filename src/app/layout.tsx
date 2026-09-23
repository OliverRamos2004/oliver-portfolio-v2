import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { NoiseOverlay } from "@/components/layout/NoiseOverlay";
import { BackToTop } from "@/components/layout/BackToTop";
import "./globals.css";

// Also serves as the display face (--font-display) — every section heading
// site-wide uses font-bold/font-black, hence loading those weights too.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "700", "900"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Oliver Ramos — Creative Technologist & Artist",
  description:
    "Portfolio of Oliver Ramos: software systems and generative art at the seam between engineering and craft.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plexMono.variable}`}
    >
      <body>
        <SmoothScrollProvider>
          <NoiseOverlay />
          {children}
          {modal}
          <BackToTop />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
