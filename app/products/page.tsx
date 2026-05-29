import ProductCard from "@/components/ProductCard";

const products = [
  {
    id: 1,
    name: "Gold Face Wash",
    description: "Gentle cleansing for refreshed skin.",
    price: "₹399",
    image: "/products/gold.png",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Hydrating Serum",
    description: "Gentle cleansing for refreshed skin.",
    price: "₹899",
    image: "/products/serum.png",
    badge: "New Launch",
  },
  {
    id: 3,
    name: "Night Repair Cream",
    description: "Gentle cleansing for refreshed skin.",
    price: "₹1299",
    image: "/products/gold.png",
    badge: "Coming Soon",
  },
  {
    id: 4,
    name: "Sunscreen SPF 50",
    description: "Gentle cleansing for refreshed skin.",
    price: "₹599",
    image: "/products/gold.png",
    badge: "Coming Soon",
  },
  {
    id: 5,
    name: "Vitamin C Serum",
    description: "Gentle cleansing for refreshed skin.",
    price: "₹999",
    image: "/products/serum.png",
    badge: "Coming Soon",
  },
  {
    id: 6,
    name: "Daily Moisturizer",
    description: "Gentle cleansing for refreshed skin.",
    price: "₹699",
    image: "/products/gold.png",
    badge: "Coming Soon",
  },
  {
    id: 7,
    name: "Rose Water Toner",
    description: "Gentle cleansing for refreshed skin.",
    price: "₹499",
    image: "/products/gold.png",
    badge: "Coming Soon",
  },
  {
    id: 8,
    name: "Under Eye Cream",
    description: "Gentle cleansing for refreshed skin.",
    price: "₹799",
    image: "/products/gold.png",
    badge: "Coming Soon",
  },
  {
    id: 9,
    name: "Face Scrub",
    price: "₹549",
    description: "Gentle cleansing for refreshed skin.",
    image: "/products/gold.png",
    badge: "Coming Soon",
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-neutral-100 px-8 py-32">

      <div className="max-w-7xl mx-auto">

        <div className="text-center">

          <p className="uppercase tracking-[0.3em] text-sm text-gray-500">
            Our Collection
          </p>

          <h1 className="mt-6 text-5xl md:text-7xl font-bold">
            Luxury Skincare
          </h1>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          ))}

        </div>

      </div>

    </main>
  );
}