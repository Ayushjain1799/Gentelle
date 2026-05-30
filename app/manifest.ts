import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gentelle — Luxury Skincare",
    short_name: "Gentelle",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FBF9F5",
    theme_color: "#2F4A3A",
    categories: ["shopping", "lifestyle", "beauty"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
  };
}
