import type { MetadataRoute } from "next";

const base = "https://gentelle.in";

const productSlugs = [
  "gold-face-wash",
  "hydrating-serum",
  "night-repair-cream",
  "sunscreen-spf-50",
  "vitamin-c-serum",
  "daily-moisturizer",
  "rose-water-toner",
  "under-eye-cream",
  "face-scrub",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/products`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const productPages: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${base}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
