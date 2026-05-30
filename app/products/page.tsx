import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse the full Gentelle collection — luxury skincare crafted with clean science for radiant, confident skin.",
};

const products = [
  {
    id: 1,
    name: "Gold Face Wash",
    description: "Gentle foaming cleanser enriched with 24K gold extract. Removes impurities while leaving skin luminous and refreshed.",
    price: "₹399",
    image: "/products/gold.png",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Hydrating Serum",
    description: "Lightweight hyaluronic acid serum that delivers 72-hour moisture. Plumps fine lines and gives skin an all-day glow.",
    price: "₹899",
    image: "/products/serum.png",
    badge: "New Launch",
  },
  {
    id: 3,
    name: "Night Repair Cream",
    description: "Peptide-rich night cream that works in sync with your skin's natural regeneration cycle for firmer, smoother skin by morning.",
    price: "₹1,299",
    image: "/products/gold.png",
    badge: undefined,
  },
  {
    id: 4,
    name: "Sunscreen SPF 50",
    description: "Invisible, non-greasy SPF 50 PA+++ sunscreen with blue-light protection. Ideal for Indian climate and daily urban use.",
    price: "₹599",
    image: "/products/gold.png",
    badge: "Coming Soon",
  },
  {
    id: 5,
    name: "Vitamin C Serum",
    description: "Stabilised 15% Vitamin C brightening serum that visibly fades dark spots and uneven skin tone in 4 weeks.",
    price: "₹999",
    image: "/products/serum.png",
    badge: "Coming Soon",
  },
  {
    id: 6,
    name: "Daily Moisturizer",
    description: "Lightweight, fast-absorbing moisturizer with ceramides and niacinamide to strengthen the skin barrier all day long.",
    price: "₹699",
    image: "/products/gold.png",
    badge: "Coming Soon",
  },
  {
    id: 7,
    name: "Rose Water Toner",
    description: "Alcohol-free rose water toner that balances pH, minimises pores, and primes skin for better serum absorption.",
    price: "₹499",
    image: "/products/gold.png",
    badge: "Coming Soon",
  },
  {
    id: 8,
    name: "Under Eye Cream",
    description: "Caffeine and retinol eye cream that visibly reduces dark circles, puffiness, and fine lines around the delicate eye area.",
    price: "₹799",
    image: "/products/gold.png",
    badge: "Coming Soon",
  },
  {
    id: 9,
    name: "Face Scrub",
    description: "Gentle walnut-shell exfoliant with glycolic acid. Buffs away dead cells to reveal instantly smoother, brighter skin.",
    price: "₹549",
    image: "/products/gold.png",
    badge: "Coming Soon",
  },
];

export default function ProductsPage() {
  return (
    <main className="bg-[#FAF7F2] min-h-screen">
      {/* Hero */}
      <section className="bg-[#F0EAE0] pt-36 pb-20 px-6 md:px-10 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-[#B8963E] mb-4">
          Our Collection
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-[#1A1A1A] leading-tight">
          Luxury Skincare
        </h1>
        <div className="section-divider mt-6" />
        <p className="mt-8 text-base md:text-lg text-[#6B6B6B] max-w-xl mx-auto leading-relaxed">
          Every product is formulated with a singular purpose — to make your skin
          healthier, more radiant, and completely confident.
        </p>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
              badge={product.badge}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
