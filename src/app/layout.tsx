import type { Metadata, Viewport } from "next";
import {
  Playfair_Display,
  Cormorant_Garamond,
  Space_Grotesk,
  Inter,
  Bebas_Neue,
} from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { GrainOverlay } from "@/components/shared/GrainOverlay";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Ultimate Barber · Alexandria, VA",
    template: "%s · The Ultimate Barber",
  },
  description:
    "The Ultimate Barber — Alexandria's premier barbershop. Precision fades, beard sculpting, hot towel shaves, and kids cuts. Where Precision Meets Prestige.",
  keywords: [
    "barbershop Alexandria VA",
    "barber Alexandria",
    "fade Alexandria VA",
    "hot towel shave",
    "beard trim Alexandria",
    "kids haircut Alexandria",
    "The Ultimate Barber",
  ],
  openGraph: {
    title: "The Ultimate Barber · Alexandria, VA",
    description: "Where Precision Meets Prestige. 492 Google reviews · 4.4★.",
    url: "https://theultimatebarber.com",
    siteName: "The Ultimate Barber",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${grotesk.variable} ${inter.variable} ${bebas.variable}`}
    >
      <body>
        <LenisProvider>
          <ScrollProgress />
          <GrainOverlay />
          <CustomCursor />
          <Navbar />
          <main className="relative z-10 min-h-screen">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
