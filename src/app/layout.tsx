import type { Metadata } from "next";
import { Anton, Inter, IBM_Plex_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { NoiseOverlay } from "@/components/layout/NoiseOverlay";
import { BackToTop } from "@/components/layout/BackToTop";
import "./globals.css";

// Anton ships one weight (400) but is drawn as a heavy, blocky impact face —
// no need for multiple weights the way Big Shoulders needed them.
const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
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
    <html lang="en" className={`${anton.variable} ${inter.variable} ${plexMono.variable}`}>
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
