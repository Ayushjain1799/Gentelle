export default function Footer() {
  return (
    <footer className="bg-[#2F4F3A] text-white">

      <div className="max-w-7xl mx-auto px-8 py-20">

        <div className="grid md:grid-cols-2 gap-16">

          <div>

            <h2 className="text-3xl tracking-[0.25em] font-semibold">
              GENTELLE
            </h2>

            <p className="mt-6 text-green-100 max-w-md leading-8">
              Premium skincare crafted with elegance,
              science and everyday care.
            </p>

          </div>

          <div className="md:text-right">

            <h3 className="font-medium text-xl">
              Connect
            </h3>

            <div className="mt-6 space-y-3 text-green-100">

              <p>Instagram</p>
              <p>WhatsApp</p>
              <p>support@gentelle.in</p>

            </div>

          </div>

        </div>

        <div className="border-t border-green-800 mt-16 pt-8 text-green-200">
          © 2026 Gentelle. All rights reserved.
        </div>

      </div>

    </footer>
  );
}