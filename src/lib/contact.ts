import { contact, isPlaceholder, isPublicHttpUrl } from "@/content/site";

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const CONTACT_LIMITS = {
  name: 120,
  email: 254,
  message: 5000,
} as const;

export type ContactField = "name" | "email" | "message";

export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export type ContactSubmission = {
  name: string;
  email: string;
  message: string;
};

export function isHoneypotTripped(value: unknown): boolean {
  if (typeof value === "string") return value.trim().length > 0;
  return value != null;
}

export function validateContactSubmission(input: {
  name: unknown;
  email: unknown;
  message: unknown;
}): { value?: ContactSubmission; errors: ContactFieldErrors } {
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const message = typeof input.message === "string" ? input.message.trim() : "";
  const errors: ContactFieldErrors = {};

  if (!name) errors.name = contact.form.errors.nameRequired;
  else if (name.length > CONTACT_LIMITS.name) errors.name = contact.form.errors.nameLong;

  if (!email) errors.email = contact.form.errors.emailRequired;
  else if (email.length > CONTACT_LIMITS.email || !EMAIL_PATTERN.test(email)) {
    errors.email = contact.form.errors.emailInvalid;
  }

  if (!message) errors.message = contact.form.errors.messageRequired;
  else if (message.length > CONTACT_LIMITS.message) {
    errors.message = contact.form.errors.messageLong;
  }

  if (errors.name || errors.email || errors.message) return { errors };
  return { errors, value: { name, email, message } };
}

/** A real mailbox. Placeholder copy such as "TODO: email" is not an address. */
export function realEmailAddress(value: string): string | undefined {
  const trimmed = value.trim();
  if (isPlaceholder(trimmed)) return undefined;
  if (trimmed.length > CONTACT_LIMITS.email || !EMAIL_PATTERN.test(trimmed)) return undefined;
  return trimmed;
}

/**
 * A real Telegram destination. Placeholder copy stays unlinked.
 * Accepts an https t.me URL or a public handle.
 */
export function realTelegramHref(value: string): string | undefined {
  const trimmed = value.trim();
  if (isPlaceholder(trimmed)) return undefined;

  if (isPublicHttpUrl(trimmed)) {
    const url = new URL(trimmed);
    const host = url.hostname.toLowerCase();
    if (host === "t.me" || host === "telegram.me") return url.toString();
    return undefined;
  }

  const handle = trimmed.replace(/^@/, "");
  if (!/^[A-Za-z0-9_]{5,32}$/.test(handle)) return undefined;
  return `https://t.me/${handle}`;
}
