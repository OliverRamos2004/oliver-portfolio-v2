import type { Metadata } from "next";
import { Anton, Archivo } from "next/font/google";
import { NoiseOverlay } from "@/components/layout/NoiseOverlay";
import "./globals.css";

// Display face: a variable grotesque. Loading the width axis lets headlines
// run condensed (font-stretch ~65%) without a second font file.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
});

// The home hover titles: a tall, heavy condensed face, stretched to fill the
// screen (FillWord). Only one weight exists.
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fill",
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
      className={`${archivo.variable} ${anton.variable}`}
    >
      <body>
        <NoiseOverlay />
        {children}
        {modal}
      </body>
    </html>
  );
}
