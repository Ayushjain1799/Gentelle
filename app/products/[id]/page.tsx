import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

const products: Record<
  string,
  { name: string; tagline: string; description: string; price: string; image: string; benefits: string[] }
> = {
  "gold-face-wash": {
    name: "Gold Face Wash",
    tagline: "24K Gold Enriched Cleanser",
    description:
      "A luxurious foaming cleanser that harnesses the power of 24K gold extract alongside gentle surfactants to deeply cleanse pores without disrupting the skin's moisture barrier. Formulated for all skin types, it leaves skin feeling refreshed, balanced, and visibly luminous with every wash.",
    price: "₹399",
    image: "/products/gold.png",
    benefits: ["Removes excess oil and impurities", "Maintains skin's natural pH", "Gold extract for a luminous finish", "Suitable for daily use"],
  },
  "hydrating-serum": {
    name: "Hydrating Serum",
    tagline: "72-Hour Hyaluronic Complex",
    description:
      "A multi-molecular hyaluronic acid serum that hydrates at multiple skin depths. The lightweight, water-gel formula absorbs instantly and provides sustained moisture release for up to 72 hours — plumping fine lines and delivering a glass-skin effect.",
    price: "₹899",
    image: "/products/serum.png",
    benefits: ["72-hour hydration complex", "Plumps fine lines visibly", "Non-comedogenic formula", "Layerable under moisturizer"],
  },
  "night-repair-cream": {
    name: "Night Repair Cream",
    tagline: "Peptide & Ceramide Night Formula",
    description:
      "While you sleep, this peptide-rich night cream works in harmony with your skin's circadian rhythm. Ceramides rebuild the moisture barrier, retinol accelerates cell renewal, and bakuchiol soothes — so you wake up to firmer, smoother, more even-toned skin.",
    price: "₹1,299",
    image: "/products/gold.png",
    benefits: ["Peptide-driven cell renewal", "Ceramide barrier repair", "Retinol + Bakuchiol blend", "Clinically tested overnight results"],
  },
};

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products[id];
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.tagline,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = products[id];

  if (!product) {
    return (
      <main className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-[#B8963E] mb-4">Not Found</p>
          <h1 className="font-serif text-4xl text-[#1A1A1A] mb-6">Product not found</h1>
          <Link href="/products">
            <button className="bg-[#2C4A35] text-white text-sm tracking-widest px-8 py-3.5 rounded-full hover:bg-[#B8963E] transition-colors duration-300">
              View All Products
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6B6B6B] mb-12">
          <Link href="/" className="hover:text-[#2C4A35] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#2C4A35] transition-colors">Products</Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Product image */}
          <div className="relative bg-[#F0EAE0] rounded-[40px] p-12 flex items-center justify-center min-h-[440px]">
            <div className="absolute inset-0 rounded-[40px] overflow-hidden">
              <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-[#B8963E]/10 blur-3xl" />
            </div>
            <Image
              src={product.image}
              alt={product.name}
              width={440}
              height={440}
              priority
              sizes="(max-width: 768px) 90vw, 45vw"
              className="relative object-contain drop-shadow-xl"
            />
          </div>

          {/* Details */}
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#B8963E] mb-4">
              {product.tagline}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A1A] leading-tight mb-4">
              {product.name}
            </h1>
            <div className="w-10 h-px bg-[#B8963E] mb-8" />

            <p className="text-sm text-[#6B6B6B] leading-8 mb-8">{product.description}</p>

            {/* Benefits */}
            <ul className="space-y-3 mb-10">
              {product.benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-[#1A1A1A]">
                  <span className="w-4 h-4 rounded-full border border-[#B8963E] flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8963E]" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-6 mb-10">
              <span className="font-serif text-3xl font-semibold text-[#2C4A35]">{product.price}</span>
              <span className="text-xs text-[#6B6B6B] tracking-wide">Incl. all taxes · Free shipping above ₹499</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/917509400769"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-[#2C4A35] text-white text-sm tracking-widest px-8 py-4 rounded-full hover:bg-[#B8963E] transition-colors duration-300">
                  Buy via WhatsApp
                </button>
              </a>
              <Link href="/contact">
                <button className="border border-[#2C4A35] text-[#2C4A35] text-sm tracking-widest px-8 py-4 rounded-full hover:bg-[#2C4A35] hover:text-white transition-all duration-300">
                  Ask a Question
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
