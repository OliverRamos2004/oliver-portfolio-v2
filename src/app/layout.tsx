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

// Headers site-wide (--font-head) and the home fill word, stretched to fill the
// screen (FillWord). Only one weight exists.
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fill",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oliver-portfolio-v2.vercel.app"),
  title: "Oliver Ramos",
  description: "I build systems for small businesses, and I make things. Based in Austin, TX.",
  openGraph: {
    title: "Oliver Ramos",
    description: "I build systems for small businesses, and I make things.",
    url: "/",
    siteName: "Oliver Ramos",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oliver Ramos",
    description: "I build systems for small businesses, and I make things.",
  },
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
