import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#F4F8F2]/90 backdrop-blur-xl border-b border-[#DDE7DA]">

      <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">

        <Link
          href="/"
          className="text-2xl font-semibold tracking-[0.25em] text-[#2F4F3A]"
        >
          GENTELLE
        </Link>

        <div className="hidden md:flex items-center gap-12 text-[#2F4F3A]">

          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/products">Products</Link>
          <Link href="/contact">Contact</Link>

        </div>

        <Link href="/products">

          <button className="
            bg-[#4F6F52]
            text-white
            px-6
            py-3
            rounded-full
            hover:bg-[#3E5B42]
            transition
          ">
            Explore
          </button>

        </Link>

      </div>

    </nav>
  );
}