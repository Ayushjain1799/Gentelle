/**
 * Public, client-safe configuration.
 * Only reads NEXT_PUBLIC_* variables — never secrets.
 */

const fallbackSite = "https://gentelle.in";

export const siteConfig = {
  name: "Gentelle",
  tagline: "Gentle Care. Elevated Ritual.",
  description:
    "Gentelle crafts premium skincare rooted in clean ingredients, modern science, and timeless elegance.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || fallbackSite,
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917509400769",
  instagramHandle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "gentelle_skincare",
  razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
} as const;

/** True when the public Razorpay key is present (checkout can be attempted). */
export const isPaymentsEnabled = Boolean(siteConfig.razorpayKeyId);

export const instagramUrl = `https://instagram.com/${siteConfig.instagramHandle}`;

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
