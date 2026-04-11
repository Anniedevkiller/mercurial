import type { Metadata } from "next";
import { Playfair_Display, Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/ui/Navigation";
import GlobalCanvas from "@/components/3d/GlobalCanvas";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${bebas.variable} h-full antialiased`}
    >
      <body className="font-inter bg-background text-foreground antialiased h-full w-full overflow-hidden">
        <div className="fixed inset-0 w-full h-full overflow-hidden">
          <GlobalCanvas />
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}
