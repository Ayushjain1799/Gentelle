import { z } from "zod";

/**
 * Request validation schemas (zod). Every API route validates its body
 * against one of these before touching the database or payment provider.
 */

const name = z.string().trim().min(2, "Please enter your name").max(80);
const email = z.string().trim().toLowerCase().email("Enter a valid email").max(254);

export const contactSchema = z.object({
  name,
  email,
  subject: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(10, "Message is too short").max(2000),
  // Honeypot — must be empty.
  company: z.string().max(0).optional().default(""),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const waitlistSchema = z.object({
  email,
  productId: z.string().trim().min(1).max(64),
  company: z.string().max(0).optional().default(""),
});
export type WaitlistInput = z.infer<typeof waitlistSchema>;

export const checkoutItemSchema = z.object({
  productId: z.string().trim().min(1).max(64),
  quantity: z.number().int().min(1).max(20),
});

export const createOrderSchema = z.object({
  items: z.array(checkoutItemSchema).min(1, "Cart is empty").max(20),
  customer: z.object({
    name,
    email,
    phone: z
      .string()
      .trim()
      .regex(/^[0-9+\-\s]{7,15}$/, "Enter a valid phone number"),
  }),
});
export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().trim().min(1).max(120),
  razorpay_payment_id: z.string().trim().min(1).max(120),
  razorpay_signature: z.string().trim().min(1).max(256),
});
export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;

/** Format a ZodError into a single human-readable message. */
export function firstError(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Invalid input";
}
