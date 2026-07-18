import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CartDrawer from "@/components/cart/CartDrawer";
import JsonLd from "@/components/JsonLd";
import { CartProvider } from "@/lib/cart/CartContext";
import { siteConfig, instagramUrl } from "@/lib/config";

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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Gentelle — Luxury Skincare",
    template: "%s | Gentelle",
  },
  description: siteConfig.description,
  applicationName: "Gentelle",
  keywords: [
    "luxury skincare",
    "premium skincare India",
    "clean beauty",
    "Gentelle",
    "gold face wash",
    "hydrating serum",
    "face cleanser",
  ],
  authors: [{ name: "Gentelle" }],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: "Gentelle",
    title: "Gentelle — Luxury Skincare",
    description: siteConfig.description,
    images: [{ url: "/products/mainpage.png", width: 1200, height: 630, alt: "Gentelle Luxury Skincare" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gentelle — Luxury Skincare",
    description: siteConfig.description,
    images: ["/products/mainpage.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF9F5" },
    { media: "(prefers-color-scheme: dark)", color: "#16271D" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Gentelle",
  url: siteConfig.url,
  description: siteConfig.description,
  sameAs: [instagramUrl],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "support@gentelleskincare.com",
    areaServed: "IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <JsonLd data={organizationJsonLd} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <CartProvider>
          <Navbar />
          <main id="main">{children}</main>
          <CartDrawer />
          <WhatsAppButton />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
