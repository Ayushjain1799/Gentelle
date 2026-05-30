import type { Metadata } from "next";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Securely complete your Gentelle order.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 pb-20 pt-28 md:px-10 md:pt-32">
      <CheckoutClient />
    </div>
  );
}
