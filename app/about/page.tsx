import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="pt-24">

      {/* HERO */}

      <section className="bg-[#f7f1e8] py-24">

        <div className="max-w-6xl mx-auto px-8 text-center">

          <p className="uppercase tracking-[0.35em] text-[#c89b3c]">
            About Gentelle
          </p>

          <h1 className="text-6xl md:text-7xl font-bold mt-6">
            Luxury Skincare
            <br />
            Crafted With Purpose
          </h1>

          <p className="mt-8 text-xl text-neutral-600 max-w-3xl mx-auto leading-9">
            Gentelle was created with a simple mission:
            to make premium skincare accessible,
            effective, and elegant.
          </p>

        </div>

      </section>

      {/* STORY */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-8">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>

              <h2 className="text-5xl font-bold">
                Our Story
              </h2>

              <p className="mt-8 text-lg text-neutral-600 leading-9">
                At Gentelle, we believe skincare should be
                more than a routine. It should be a moment
                of self-care and confidence.

                We focus on creating products that combine
                premium ingredients, modern formulations,
                and elegant design to deliver an exceptional
                skincare experience.
              </p>

            </div>

            <div className="flex justify-center">

              <Image
                src="/products/mainpage.png"
                alt="Gentelle"
                width={500}
                height={500}
                className="object-contain"
              />

            </div>

          </div>

        </div>

      </section>

      {/* VALUES */}

      <section className="py-24 bg-neutral-50">

        <div className="max-w-7xl mx-auto px-8">

          <div className="text-center">

            <p className="uppercase tracking-[0.35em] text-[#c89b3c]">
              Our Values
            </p>

            <h2 className="text-5xl font-bold mt-4">
              What We Stand For
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-10 mt-16">

            <div className="bg-white p-8 rounded-3xl shadow-lg">

              <h3 className="text-2xl font-bold">
                Quality
              </h3>

              <p className="mt-4 text-neutral-600">
                Carefully selected ingredients and
                premium formulations.
              </p>

            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg">

              <h3 className="text-2xl font-bold">
                Simplicity
              </h3>

              <p className="mt-4 text-neutral-600">
                Skincare that is easy to use and
                effective every day.
              </p>

            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg">

              <h3 className="text-2xl font-bold">
                Trust
              </h3>

              <p className="mt-4 text-neutral-600">
                Honest products designed with
                customer confidence in mind.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}