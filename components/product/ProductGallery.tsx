"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

/**
 * Client-side image slider for the product detail page.
 * Arrows + swipe to change slides, thumbnail strip to jump.
 */
export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + images.length) % images.length),
    [images.length],
  );

  if (images.length === 0) return null;

  return (
    <div>
      {/* Main slider */}
      <div
        className="group relative overflow-hidden rounded-3xl"
        style={{
          border: "1px solid var(--color-line)",
          boxShadow: "0 32px 70px -36px rgba(26,25,23,0.35)",
          background: "var(--color-surface)",
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {images.map((src, i) => (
            <div key={src} className="relative w-full shrink-0">
              <Image
                src={src}
                alt={`${alt} — image ${i + 1}`}
                width={840}
                height={840}
                priority={i === 0}
                sizes="(max-width: 768px) 90vw, 45vw"
                className="aspect-square h-auto w-full object-contain"
                style={{ background: "linear-gradient(160deg, #FBF7EE 0%, #F4ECDB 100%)" }}
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100"
              style={{
                background: "rgba(255,255,255,0.92)",
                border: "1px solid var(--color-line)",
                boxShadow: "0 6px 20px -6px rgba(26,25,23,0.25)",
                color: "var(--color-brand)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100"
              style={{
                background: "rgba(255,255,255,0.92)",
                border: "1px solid var(--color-line)",
                boxShadow: "0 6px 20px -6px rgba(26,25,23,0.25)",
                color: "var(--color-brand)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to image ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === index ? "1.5rem" : "0.5rem",
                    background: i === index ? "var(--color-gold)" : "rgba(255,255,255,0.85)",
                    border: "1px solid rgba(169,134,64,0.4)",
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Show image ${i + 1}`}
              onClick={() => setIndex(i)}
              className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl transition-all duration-300"
              style={{
                border: i === index ? "2px solid var(--color-gold)" : "1px solid var(--color-line)",
                opacity: i === index ? 1 : 0.65,
              }}
            >
              <Image
                src={src}
                alt=""
                width={160}
                height={160}
                sizes="80px"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
