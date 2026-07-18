import type { CSSProperties } from "react";
import { LeafIcon } from "@/components/icons";

const goldText: CSSProperties = {
  background: "linear-gradient(180deg, #D9BC7E 0%, #B8913F 55%, #9A7428 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

/**
 * Gentelle wordmark styled after the packaging: lowercase serif
 * "Gentélle" where the accent over the é is the brand's gold leaf.
 * Inherits font size; color defaults to the packaging gold gradient.
 */
export default function Logo({
  className = "",
  gradient = true,
}: {
  className?: string;
  gradient?: boolean;
}) {
  const seg = gradient ? goldText : undefined;
  return (
    <span
      className={`inline-block whitespace-nowrap font-serif ${className}`}
      style={{ letterSpacing: "0.01em" }}
    >
      <span style={seg}>Gent</span>
      <span className="relative inline-block">
        <LeafIcon
          aria-hidden
          className="absolute left-1/2"
          style={{
            top: "-0.42em",
            transform: "translateX(-38%) rotate(14deg)",
            width: "0.42em",
            height: "0.42em",
            color: gradient ? "#B8913F" : "currentColor",
            strokeWidth: 2.4,
          }}
        />
        <span style={seg}>e</span>
      </span>
      <span style={seg}>lle</span>
    </span>
  );
}
