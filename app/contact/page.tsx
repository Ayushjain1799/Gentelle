import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="pt-24">

      {/* HERO */}

      <section className="bg-[#f7f1e8] py-24">

        <div className="max-w-5xl mx-auto px-8 text-center">

          <p className="uppercase tracking-[0.35em] text-[#c89b3c]">
            Contact Us
          </p>

          <h1 className="text-6xl md:text-7xl font-bold mt-6">
            We'd Love To Hear
            <br />
            From You
          </h1>

          <p className="mt-8 text-xl text-neutral-600 max-w-3xl mx-auto leading-9">
            Questions, orders, collaborations or feedback —
            our team is always happy to help.
          </p>

        </div>

      </section>

      {/* CONTACT CARDS */}

      <section className="py-24 bg-white">

        <div className="max-w-6xl mx-auto px-8">

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-neutral-50 p-8 rounded-3xl shadow-lg text-center">

              <h3 className="text-2xl font-bold">
                WhatsApp
              </h3>

              <p className="mt-4 text-neutral-600">
                Chat directly with us.
              </p>

              <a
                href="https://wa.me/917509400769"
                target="_blank"
                className="inline-block mt-6 px-6 py-3 bg-green-500 text-white rounded-full"
              >
                Message Us
              </a>

            </div>

            <div className="bg-neutral-50 p-8 rounded-3xl shadow-lg text-center">

              <h3 className="text-2xl font-bold">
                Email
              </h3>

              <p className="mt-4 text-neutral-600">
                gentelleskincare@gmail.com
              </p>

            </div>

            <div className="bg-neutral-50 p-8 rounded-3xl shadow-lg text-center">

              <h3 className="text-2xl font-bold">
                Instagram
              </h3>

              <p className="mt-4 text-neutral-600">
                Follow our journey.
              </p>

              <a
                href="https://instagram.com/gentelle_skincare"
                target="_blank"
                className="inline-block mt-6 px-6 py-3 bg-black text-white rounded-full"
              >
                Visit Instagram
              </a>

            </div>

          </div>

        </div>

      </section>

      {/* CONTACT FORM */}

      <section className="py-24 bg-neutral-50">

        <div className="max-w-3xl mx-auto px-8">

          <h2 className="text-5xl font-bold text-center">
            Send Us A Message
          </h2>

          <form className="mt-12 space-y-6">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 rounded-xl border"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 rounded-xl border"
            />

            <textarea
              placeholder="Your Message"
              rows={6}
              className="w-full p-4 rounded-xl border"
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-xl"
            >
              Send Message
            </button>

          </form>

        </div>

      </section>

    </main>
  );
}