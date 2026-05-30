import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  name: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
};

export default function ProductCard({
  name,
  description,
  price,
  image,
  badge,
}: ProductCardProps) {
  return (
    <Link href={`/products/${name.toLowerCase().replace(/\s+/g, "-")}`} className="group block">
      <div className="bg-white rounded-3xl overflow-hidden border border-[#E4D9CC] hover:border-[#B8963E] hover:shadow-[0_8px_40px_rgba(184,150,62,0.12)] transition-all duration-500 h-full flex flex-col">
        {/* Image */}
        <div className="relative bg-[#F0EAE0] p-8">
          {badge && (
            <span className="absolute top-4 left-4 text-[10px] tracking-widest uppercase bg-[#2C4A35] text-white px-3 py-1 rounded-full z-10">
              {badge}
            </span>
          )}
          <Image
            src={image}
            alt={name}
            width={400}
            height={400}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="w-full h-60 object-contain group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Details */}
        <div className="p-6 flex flex-col flex-1">
          <h2 className="font-serif text-xl font-semibold text-[#1A1A1A]">{name}</h2>
          <p className="mt-2 text-sm text-[#6B6B6B] leading-relaxed flex-1">{description}</p>
          <div className="mt-6 flex items-center justify-between">
            <span className="font-serif text-xl font-semibold text-[#2C4A35]">{price}</span>
            <span className="text-xs tracking-widest text-[#B8963E] group-hover:translate-x-1 transition-transform duration-300">
              View →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
