import type { Metadata } from "next";
import { Playfair_Display, Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import GlobalCanvasWrapper from "@/components/3d/GlobalCanvasWrapper";
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Mercurial Sports Imperial",
  description: "Premium immersive sports agency website.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import AutoTourController from "@/components/AutoTourController";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${bebas.variable} antialiased`}
    >
      <body className="font-inter text-foreground antialiased h-screen overflow-hidden">
        <GlobalCanvasWrapper />
        <AutoTourController />
        <Navigation />
        <main className="h-full w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
