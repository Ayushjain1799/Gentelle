"use client";

import { useEffect } from "react";

/**
 * Last-resort boundary for errors thrown in the root layout itself.
 * Must render its own <html>/<body>. Kept self-contained with inline
 * styles so it works even if global CSS failed to load.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error", { message: error.message, digest: error.digest });
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FBF9F5",
          color: "#1C1B19",
          fontFamily: "Inter, system-ui, sans-serif",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <p style={{ letterSpacing: "0.32em", textTransform: "uppercase", fontSize: "0.7rem", color: "#A9863F" }}>
          Something went wrong
        </p>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "2.25rem", margin: "1rem 0 0.5rem" }}>
          We&apos;ll be right back
        </h1>
        <p style={{ color: "#6E6A62", maxWidth: "28rem" }}>
          An unexpected error occurred. Please refresh to continue.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "2rem",
            border: "none",
            borderRadius: "9999px",
            background: "#2F4A3A",
            color: "#fff",
            padding: "0.875rem 2rem",
            fontSize: "0.875rem",
            letterSpacing: "0.1em",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
