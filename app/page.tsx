import Image from "next/image";
import Link from "next/link";

export default function Home() {
return ( <main className="bg-[#F4F8F2]">


  {/* HERO */}

  <section className="min-h-screen flex items-center pt-28">

    <div className="max-w-7xl mx-auto px-8 w-full">

      <div className="grid lg:grid-cols-2 gap-16 items-center">

        <div>

          <p className="uppercase tracking-[0.35em] text-[#4F6F52] font-medium">
            Luxury Skincare
          </p>

          <h1 className="mt-6 text-5xl md:text-7xl font-semibold text-[#1F1F1F] leading-tight">
            Gentle Care.
            <br />
            Elevated Ritual.
          </h1>

          <p className="mt-8 text-lg md:text-xl text-[#66706A] leading-9 max-w-xl">
            Premium skincare crafted for modern lifestyles.
            Thoughtfully designed formulations that blend
            elegance, science and everyday care.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">

            <Link href="/products">
              <button className="bg-[#4F6F52] text-white px-8 py-4 rounded-full hover:bg-[#3F5A42] transition">
                Explore Collection
              </button>
            </Link>

            <Link href="/about">
              <button className="border border-[#4F6F52] text-[#2F4F3A] px-8 py-4 rounded-full hover:bg-[#EAF1E7] transition">
                Our Story
              </button>
            </Link>

          </div>

        </div>

        <div className="flex justify-center">

          <Image
            src="/products/mainpage.png"
            alt="Gentelle"
            width={600}
            height={600}
            priority
            className="object-contain"
          />

        </div>

      </div>

    </div>

  </section>

  {/* WHY GENTELLE */}

  <section className="py-28 bg-[#EAF1E7]">

    <div className="max-w-6xl mx-auto px-8 text-center">

      <p className="uppercase tracking-[0.35em] text-[#4F6F52]">
        Why Gentelle
      </p>

      <h2 className="mt-5 text-4xl md:text-5xl font-semibold text-[#1F1F1F]">
        Skincare Designed For Everyday Confidence
      </h2>

      <p className="mt-8 text-lg md:text-xl text-[#66706A] leading-9 max-w-3xl mx-auto">
        We believe skincare should feel effortless,
        luxurious and effective. Every Gentelle product
        is designed to help you build a simple ritual
        that supports healthy and radiant skin.
      </p>

    </div>

  </section>

  {/* FEATURED PRODUCTS */}

  <section className="py-28 bg-[#F4F8F2]">

    <div className="max-w-7xl mx-auto px-8">

      <div className="text-center">

        <p className="uppercase tracking-[0.35em] text-[#4F6F52]">
          Featured Collection
        </p>

        <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-[#1F1F1F]">
          Discover Our Essentials
        </h2>

      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">

        <div className="bg-white rounded-[28px] overflow-hidden border border-[#DDE7DA]">

          <div className="bg-[#EAF1E7] p-8">

            <Image
              src="/products/gold.png"
              alt="Gold Face Wash"
              width={400}
              height={400}
              className="w-full h-[250px] object-contain"
            />

          </div>

          <div className="p-8">

            <h3 className="text-2xl font-semibold text-[#1F1F1F]">
              Gold Face Wash
            </h3>

            <p className="mt-3 text-[#66706A]">
              Gentle cleansing for refreshed and healthy skin.
            </p>

          </div>

        </div>

        <div className="bg-white rounded-[28px] overflow-hidden border border-[#DDE7DA]">

          <div className="bg-[#EAF1E7] p-8">

            <Image
              src="/products/serum.png"
              alt="Hydrating Serum"
              width={400}
              height={400}
              className="w-full h-[250px] object-contain"
            />

          </div>

          <div className="p-8">

            <h3 className="text-2xl font-semibold text-[#1F1F1F]">
              Hydrating Serum
            </h3>

            <p className="mt-3 text-[#66706A]">
              Lightweight hydration designed for daily care.
            </p>

          </div>

        </div>

        <div className="bg-white rounded-[28px] overflow-hidden border border-[#DDE7DA]">

          <div className="bg-[#EAF1E7] p-8">

            <Image
              src="/products/gold.png"
              alt="Night Repair Cream"
              width={400}
              height={400}
              className="w-full h-[250px] object-contain"
            />

          </div>

          <div className="p-8">

            <h3 className="text-2xl font-semibold text-[#1F1F1F]">
              Night Repair Cream
            </h3>

            <p className="mt-3 text-[#66706A]">
              Deep nourishment while your skin rests.
            </p>

          </div>

        </div>

      </div>

    </div>

  </section>

  {/* PHILOSOPHY */}

  <section className="py-28 bg-white">

    <div className="max-w-5xl mx-auto px-8 text-center">

      <p className="uppercase tracking-[0.35em] text-[#4F6F52]">
        Our Philosophy
      </p>

      <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-[#1F1F1F]">
        Beauty Through Simplicity
      </h2>

      <p className="mt-8 text-lg md:text-xl text-[#66706A] leading-9">
        Gentelle was created with a commitment to elegant,
        effective skincare. We focus on thoughtful
        formulations, premium ingredients and timeless design
        to create products that feel as beautiful as they perform.
      </p>

    </div>

  </section>

  {/* CTA */}

  <section className="py-28 bg-[#EAF1E7]">

    <div className="max-w-4xl mx-auto text-center px-8">

      <h2 className="text-4xl md:text-5xl font-semibold text-[#1F1F1F]">
        Begin Your Gentelle Journey
      </h2>

      <p className="mt-6 text-lg md:text-xl text-[#66706A]">
        Explore premium skincare designed to elevate
        your daily routine.
      </p>

      <Link href="/products">

        <button className="mt-10 bg-[#4F6F52] text-white px-10 py-4 rounded-full hover:bg-[#3F5A42] transition">
          Explore Products
        </button>

      </Link>

    </div>

  </section>

</main>


);
}
