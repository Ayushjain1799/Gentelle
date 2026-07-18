/**
 * Single source of truth for the Gentelle catalogue.
 * Used by listing pages, detail pages, cart, checkout, sitemap and JSON-LD.
 */

export type ProductStatus = "available" | "coming-soon";

export type Ingredient = { name: string; role: string };

export type Product = {
  /** URL slug + stable id */
  id: string;
  name: string;
  tagline: string;
  shortDescription: string;
  description: string;
  /** Display price, e.g. "₹399" */
  priceLabel: string;
  /** Price in paise for Razorpay (₹399 → 39900). null when not for sale. */
  priceInPaise: number | null;
  image: string;
  /** Accent color used for the product's framing gradient. */
  accent: string;
  badge?: string;
  status: ProductStatus;
  benefits: string[];
  ingredients: Ingredient[];
  howToUse: string[];
  category: string;
};

export const products: Product[] = [
  {
    id: "gold-face-wash",
    name: "Gold Glow Face Wash",
    tagline: "Radiance Boosting Daily Cleanser",
    shortDescription: "Everyday cleanse, everyday radiance — glow like gold.",
    description:
      "A radiance-boosting daily cleanser powered by Gold Powder, Niacinamide, Hyaluronic Acid and Vitamin-C. It deep-cleanses away pollution, oil and impurities while brightening skin and boosting its natural glow — 100% vegan, cruelty-free, dermatologically tested and suitable for all skin types.",
    priceLabel: "₹399",
    priceInPaise: 39900,
    image: "/products/gold.png",
    accent: "#C8A968",
    badge: "Best Seller",
    status: "available",
    benefits: [
      "Deep cleansing — lifts pollution, oil & impurities",
      "Brightens skin & reduces dullness",
      "Boosts natural radiant glow",
      "Hydrated, soft skin — for all skin types",
    ],
    ingredients: [
      { name: "Gold Powder", role: "Boosts natural radiance & healthy glow" },
      { name: "Niacinamide", role: "Improves skin tone, reduces dullness & blemishes" },
      { name: "Hyaluronic Acid", role: "Deeply hydrates, keeps skin soft & supple" },
      { name: "Vitamin-C", role: "Brightens skin & fights dullness" },
    ],
    howToUse: [
      "Massage a small amount onto damp skin.",
      "Work into a soft lather for 30 seconds.",
      "Rinse with lukewarm water, morning and night.",
    ],
    category: "Cleanser",
  },
  {
    id: "hydrating-serum",
    name: "Hydrating Serum",
    tagline: "72-Hour Hyaluronic Complex",
    shortDescription: "Multi-weight hyaluronic acid for plump, glass-skin hydration.",
    description:
      "A lightweight water-gel serum layered with multi-molecular hyaluronic acid that hydrates at several skin depths. Absorbs instantly and releases moisture for up to 72 hours, softening fine lines and delivering a dewy, glass-skin glow.",
    priceLabel: "₹899",
    priceInPaise: 89900,
    image: "/products/serum.png",
    accent: "#9FB6C4",
    status: "coming-soon",
    benefits: [
      "72-hour layered hydration",
      "Visibly plumps fine lines",
      "Non-comedogenic, weightless feel",
      "Layers under any moisturizer",
    ],
    ingredients: [
      { name: "Multi-Weight Hyaluronic Acid", role: "Deep + surface hydration" },
      { name: "Panthenol (B5)", role: "Barrier support" },
      { name: "Niacinamide", role: "Tone & texture" },
    ],
    howToUse: [
      "Apply 3–4 drops to clean, damp skin.",
      "Press gently until absorbed.",
      "Follow with moisturizer and SPF by day.",
    ],
    category: "Serum",
  },
  {
    id: "night-repair-cream",
    name: "Night Repair Cream",
    tagline: "Peptide & Ceramide Night Formula",
    shortDescription: "Overnight renewal with peptides, ceramides and bakuchiol.",
    description:
      "A rich yet breathable night cream that works in sync with your skin's overnight repair cycle. Ceramides rebuild the barrier, peptides support firmness, and gentle bakuchiol smooths texture — so you wake to softer, more even-toned skin.",
    priceLabel: "₹1,299",
    priceInPaise: 129900,
    image: "/products/gold.png",
    accent: "#B89DB8",
    status: "coming-soon",
    benefits: [
      "Peptide-supported overnight renewal",
      "Ceramide barrier repair",
      "Bakuchiol — gentle retinol alternative",
      "Wake to softer, even-toned skin",
    ],
    ingredients: [
      { name: "Signal Peptides", role: "Firmness & bounce" },
      { name: "Ceramide Complex", role: "Barrier repair" },
      { name: "Bakuchiol", role: "Smoothing, retinol-like" },
    ],
    howToUse: [
      "Warm a pea-sized amount between fingertips.",
      "Press over face and neck as the last night step.",
      "Use nightly for best results.",
    ],
    category: "Moisturizer",
  },
  {
    id: "vitamin-c-serum",
    name: "Vitamin C Serum",
    tagline: "15% Stabilised Brightening Serum",
    shortDescription: "Fades dark spots and evens tone with stabilised Vitamin C.",
    description:
      "A stabilised 15% Vitamin C serum that targets dark spots, dullness and uneven tone. Antioxidant protection by day, visible brightening over four weeks of consistent use.",
    priceLabel: "₹999",
    priceInPaise: 99900,
    image: "/products/serum.png",
    accent: "#D9A86C",
    status: "coming-soon",
    benefits: [
      "Fades dark spots in ~4 weeks",
      "Evens skin tone",
      "Antioxidant pollution defense",
      "Stabilised, non-irritating",
    ],
    ingredients: [
      { name: "15% Ethyl Ascorbic Acid", role: "Brightening" },
      { name: "Vitamin E", role: "Antioxidant synergy" },
      { name: "Ferulic Acid", role: "Stability & defense" },
    ],
    howToUse: [
      "Apply in the morning on clean skin.",
      "Allow to absorb, then apply SPF.",
      "Introduce slowly if new to actives.",
    ],
    category: "Serum",
  },
  {
    id: "daily-moisturizer",
    name: "Daily Moisturizer",
    tagline: "Ceramide + Niacinamide Hydrator",
    shortDescription: "Lightweight all-day moisture that strengthens the barrier.",
    description:
      "A fast-absorbing daily moisturizer with ceramides and niacinamide that locks in hydration and strengthens the skin barrier without any greasy residue.",
    priceLabel: "₹699",
    priceInPaise: 69900,
    image: "/products/gold.png",
    accent: "#A9C2A0",
    status: "coming-soon",
    benefits: [
      "All-day weightless hydration",
      "Strengthens skin barrier",
      "Niacinamide for clarity",
      "No greasy residue",
    ],
    ingredients: [
      { name: "Ceramide NP", role: "Barrier lipids" },
      { name: "Niacinamide", role: "Clarity & tone" },
      { name: "Squalane", role: "Lightweight moisture" },
    ],
    howToUse: [
      "Smooth over face and neck.",
      "Use morning and night.",
      "Layer over serums.",
    ],
    category: "Moisturizer",
  },
  {
    id: "rose-water-toner",
    name: "Rose Water Toner",
    tagline: "Alcohol-Free Balancing Mist",
    shortDescription: "pH-balancing rose toner that preps skin for serums.",
    description:
      "An alcohol-free rose water toner that rebalances pH, refines the look of pores and preps skin to absorb the rest of your ritual.",
    priceLabel: "₹499",
    priceInPaise: 49900,
    image: "/products/gold.png",
    accent: "#D8A7B0",
    status: "coming-soon",
    benefits: [
      "Balances skin pH",
      "Refines look of pores",
      "Preps skin for serums",
      "Alcohol-free & soothing",
    ],
    ingredients: [
      { name: "Damask Rose Water", role: "Soothing tone" },
      { name: "Glycerin", role: "Light hydration" },
      { name: "Allantoin", role: "Calming" },
    ],
    howToUse: [
      "Mist or sweep over cleansed skin.",
      "Follow with serum and moisturizer.",
      "Use morning and night.",
    ],
    category: "Toner",
  },
  {
    id: "sunscreen-spf-50",
    name: "Sunscreen SPF 50",
    tagline: "Invisible SPF 50 PA+++",
    shortDescription: "Weightless daily SPF with blue-light defense.",
    description:
      "An invisible, non-greasy SPF 50 PA+++ sunscreen with added blue-light protection — built for daily urban exposure and the Indian climate.",
    priceLabel: "₹599",
    priceInPaise: 59900,
    image: "/products/gold.png",
    accent: "#E2C36A",
    status: "coming-soon",
    benefits: [
      "Broad-spectrum SPF 50 PA+++",
      "No white cast, no grease",
      "Blue-light defense",
      "Daily urban protection",
    ],
    ingredients: [
      { name: "Hybrid UV Filters", role: "Broad-spectrum defense" },
      { name: "Niacinamide", role: "Tone support" },
      { name: "Vitamin E", role: "Antioxidant" },
    ],
    howToUse: [
      "Apply as the last morning step.",
      "Use two finger-lengths for the face.",
      "Reapply every 3–4 hours outdoors.",
    ],
    category: "Sunscreen",
  },
  {
    id: "under-eye-cream",
    name: "Under Eye Cream",
    tagline: "Caffeine + Peptide Eye Care",
    shortDescription: "De-puffs and brightens the delicate eye area.",
    description:
      "A cooling caffeine and peptide eye cream that visibly reduces puffiness, dark circles and fine lines around the delicate eye area.",
    priceLabel: "₹799",
    priceInPaise: 79900,
    image: "/products/gold.png",
    accent: "#9DB8C9",
    status: "coming-soon",
    benefits: [
      "De-puffs tired eyes",
      "Brightens dark circles",
      "Softens fine lines",
      "Cooling applicator feel",
    ],
    ingredients: [
      { name: "Caffeine", role: "De-puffing" },
      { name: "Peptides", role: "Firmness" },
      { name: "Hyaluronic Acid", role: "Hydration" },
    ],
    howToUse: [
      "Dab a rice-grain amount under each eye.",
      "Pat gently until absorbed.",
      "Use morning and night.",
    ],
    category: "Eye Care",
  },
  {
    id: "face-scrub",
    name: "Face Scrub",
    tagline: "Gentle Glycolic Polish",
    shortDescription: "Buffs away dullness for instantly smoother skin.",
    description:
      "A gentle exfoliating polish that combines smooth jojoba beads with a touch of glycolic acid to sweep away dead cells and reveal brighter, smoother skin.",
    priceLabel: "₹549",
    priceInPaise: 54900,
    image: "/products/gold.png",
    accent: "#C9B79B",
    status: "coming-soon",
    benefits: [
      "Sweeps away dull, dead cells",
      "Reveals instant smoothness",
      "Glycolic micro-exfoliation",
      "Gentle, non-abrasive beads",
    ],
    ingredients: [
      { name: "Jojoba Beads", role: "Physical polish" },
      { name: "Glycolic Acid", role: "Chemical renewal" },
      { name: "Aloe Vera", role: "Soothing" },
    ],
    howToUse: [
      "Massage onto damp skin in circles.",
      "Avoid the eye area.",
      "Use 2–3 times per week.",
    ],
    category: "Exfoliant",
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getAvailableProducts(): Product[] {
  return products.filter((p) => p.status === "available");
}

export const featuredProductIds = ["gold-face-wash", "hydrating-serum", "night-repair-cream"];

export function getFeaturedProducts(): Product[] {
  return featuredProductIds
    .map((id) => getProduct(id))
    .filter((p): p is Product => Boolean(p));
}
