import type { Metadata } from "next";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Securely complete your Gentelle order.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="wrap" style={{ maxWidth: "56rem", paddingTop: "7rem", paddingBottom: "5rem" }}>
      <CheckoutClient />
    </div>
  );
}
