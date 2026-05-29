import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  name: string;
  description: string;
  price: string;
  image: string;
};

export default function ProductCard({
  name,
  description,
  price,
  image,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${name.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="
        group
        bg-white
        rounded-[28px]
        overflow-hidden
        border
        border-[#E6ECE4]
        hover:border-[#4F6F52]
        hover:shadow-xl
        transition-all
        duration-500
      ">

        <div className="bg-[#F4F8F2] p-8">

          <Image
            src={image}
            alt={name}
            width={400}
            height={400}
            className="
              w-full
              h-[280px]
              object-contain
              group-hover:scale-105
              transition
              duration-700
            "
          />

        </div>

        <div className="p-8">

          <h2 className="text-2xl font-semibold text-[#1F1F1F]">
            {name}
          </h2>

          <p className="mt-4 text-[#5B665D] leading-7">
            {description}
          </p>

          <div className="mt-8 flex items-center justify-between">

            <p className="text-2xl font-semibold text-[#2F4F3A]">
              {price}
            </p>

            <span className="
              text-sm
              font-medium
              text-[#4F6F52]
            ">
              View →
            </span>

          </div>

        </div>

      </div>
    </Link>
  );
}