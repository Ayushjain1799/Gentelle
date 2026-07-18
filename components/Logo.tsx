import type { CSSProperties } from "react";

const goldText: CSSProperties = {
  background: "linear-gradient(180deg, #D9BC7E 0%, #B8913F 55%, #9A7428 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

/**
 * Gentelle wordmark styled after the packaging: serif "Gentelle"
 * in the packaging's gold gradient. Inherits font size.
 */
export default function Logo({
  className = "",
  gradient = true,
}: {
  className?: string;
  gradient?: boolean;
}) {
  return (
    <span
      className={`inline-block whitespace-nowrap font-serif ${className}`}
      style={{ letterSpacing: "0.01em", ...(gradient ? goldText : {}) }}
    >
      Gentelle
    </span>
  );
}
