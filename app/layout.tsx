import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gentelle.in"),
  title: {
    default: "Gentelle — Luxury Skincare",
    template: "%s | Gentelle",
  },
  description:
    "Gentelle crafts premium skincare rooted in clean ingredients, modern science, and timeless elegance. Discover rituals designed for radiant, confident skin.",
  keywords: [
    "luxury skincare",
    "premium skincare India",
    "clean beauty",
    "Gentelle",
    "face wash",
    "serum",
    "moisturizer",
  ],
  authors: [{ name: "Gentelle" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Gentelle",
    title: "Gentelle — Luxury Skincare",
    description:
      "Premium skincare crafted with clean ingredients, modern science, and timeless elegance.",
    images: [
      {
        url: "/products/mainpage.png",
        width: 1200,
        height: 630,
        alt: "Gentelle Luxury Skincare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gentelle — Luxury Skincare",
    description: "Premium skincare crafted with clean ingredients and timeless elegance.",
    images: ["/products/mainpage.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        {children}
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
