import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { NoiseOverlay } from "@/components/layout/NoiseOverlay";
import "./globals.css";

// Display face: a variable grotesque. Loading the width axis lets headlines
// run condensed (font-stretch ~65%) without a second font file.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
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
      data-scroll-behavior="smooth"
      className={archivo.variable}
    >
      <body>
        <NoiseOverlay />
        {children}
        {modal}
      </body>
    </html>
  );
}
