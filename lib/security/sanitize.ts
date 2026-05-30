/**
 * Input sanitization helpers. Defense-in-depth alongside zod validation
 * and React's default output escaping.
 */

// Matches ASCII control characters (0x00-0x1F and 0x7F).
// Built from a string literal so no raw control bytes appear in source.
const CONTROL_CHARS = new RegExp("[\\x00-\\x1F\\x7F]", "g");
const COLLAPSE_WS = new RegExp("\\s{2,}", "g");

/** Collapse whitespace, strip control chars, and hard-cap length. */
export function cleanText(input: unknown, maxLength = 2000): string {
  if (typeof input !== "string") return "";
  return input
    .replace(CONTROL_CHARS, " ")
    .replace(COLLAPSE_WS, " ")
    .trim()
    .slice(0, maxLength);
}

/** Normalize an email for storage/compare. */
export function cleanEmail(input: unknown): string {
  if (typeof input !== "string") return "";
  return input.trim().toLowerCase().slice(0, 254);
}

/**
 * Detect honeypot submissions. A hidden field that real users never fill -
 * if it has a value, treat the request as a bot.
 */
export function isHoneypotTripped(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}
