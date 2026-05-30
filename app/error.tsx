"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Route-level error boundary. Catches render/runtime errors in pages and
 * presents a branded recovery screen instead of a raw stack trace.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaces in the server/Vercel logs for diagnosis.
    console.error("Route error", { message: error.message, digest: error.digest });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="mt-5 font-serif text-4xl font-semibold text-ink md:text-5xl">
        A small imperfection
      </h1>
      <p className="mt-5 max-w-md text-muted">
        We hit an unexpected error. Please try again — your cart is safe.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-brand px-8 py-3.5 text-sm tracking-widest text-white transition-colors hover:bg-gold"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="rounded-full border border-brand px-8 py-3.5 text-sm tracking-widest text-brand transition-all hover:bg-brand hover:text-white"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}
