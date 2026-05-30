/**
 * Minimal structured logger. Emits single-line JSON so logs are queryable
 * in any platform (Vercel, CloudWatch, etc). Never logs secrets or full PII.
 */

type Level = "info" | "warn" | "error";

type Fields = Record<string, unknown>;

function emit(level: Level, message: string, fields?: Fields) {
  const entry = {
    level,
    message,
    ts: new Date().toISOString(),
    ...fields,
  };
  const line = JSON.stringify(entry);
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

export const logger = {
  info: (message: string, fields?: Fields) => emit("info", message, fields),
  warn: (message: string, fields?: Fields) => emit("warn", message, fields),
  error: (message: string, fields?: Fields) => emit("error", message, fields),
};

/** Redact an email for logs: jane@x.com → j***@x.com */
export function redactEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!domain) return "***";
  return `${user.slice(0, 1)}***@${domain}`;
}
