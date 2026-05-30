import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-5 font-serif text-4xl font-semibold text-ink md:text-6xl">
        This page slipped away
      </h1>
      <p className="mt-5 max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to your ritual.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-brand px-8 py-3.5 text-sm tracking-widest text-white transition-colors hover:bg-gold"
        >
          Back Home
        </Link>
        <Link
          href="/products"
          className="rounded-full border border-brand px-8 py-3.5 text-sm tracking-widest text-brand transition-all hover:bg-brand hover:text-white"
        >
          Shop Products
        </Link>
      </div>
    </div>
  );
}
