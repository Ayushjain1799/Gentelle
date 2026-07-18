import { LeafIcon } from "@/components/icons";

/**
 * Gentelle wordmark with the brand's gold leaf accent above the middle "E",
 * mirroring the "Gentélle" mark on the product packaging.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-block whitespace-nowrap ${className}`}>
      GENT
      <span className="relative inline-block">
        <LeafIcon
          aria-hidden
          className="absolute left-1/2 text-gold"
          style={{
            top: "-0.62em",
            transform: "translateX(-72%) rotate(8deg)",
            width: "0.5em",
            height: "0.5em",
          }}
        />
        E
      </span>
      LLE
    </span>
  );
}
