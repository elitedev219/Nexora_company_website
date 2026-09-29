import { contact } from "@/content/site";
import {
  isHoneypotTripped,
  realEmailAddress,
  validateContactSubmission,
  type ContactFieldErrors,
} from "@/lib/contact";
import { Resend } from "resend";

export const runtime = "nodejs";

const NO_STORE = { "cache-control": "no-store" } as const;

/**
 * TODO: Replace this sandbox sender after a domain is verified in Resend.
 * No sender domain was provided. Do not invent one.
 */
const RESEND_FROM = "NEXORA <onboarding@resend.dev>";

/**
 * Forwards a contact submission through Resend.
 * The message is not written to a database, file, or log.
 */
export async function POST(request: Request) {
  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > 32_000) {
    return failure(400);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return failure(400);
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return failure(400);
  }

  const body = payload as Record<string, unknown>;

  if (isHoneypotTripped(body.hp_website)) {
    return Response.json({ ok: true }, { status: 200, headers: NO_STORE });
  }

  const { value, errors } = validateContactSubmission({
    name: body.name,
    email: body.email,
    message: body.message,
  });

  if (!value) return fieldFailure(errors);

  const apiKey = readSecret("RESEND_API_KEY");
  const to = realEmailAddress(process.env.CONTACT_TO_EMAIL ?? "");
  if (!apiKey || !to) return failure(500);

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: RESEND_FROM,
      to: [to],
      replyTo: value.email,
      subject: "NEXORA contact form",
      text: textBody(value),
      html: htmlBody(value),
    });
    if (result.error) return failure(500);
  } catch {
    return failure(500);
  }

  return Response.json({ ok: true }, { status: 200, headers: NO_STORE });
}

function readSecret(name: string): string | undefined {
  const value = process.env[name]?.trim() ?? "";
  if (!value || /^todo\b/i.test(value) || /\s/.test(value)) return undefined;
  return value;
}

function textBody(value: { name: string; email: string; message: string }): string {
  return `Name: ${value.name}\nEmail: ${value.email}\n\n${value.message}`;
}

function htmlBody(value: { name: string; email: string; message: string }): string {
  return `<p><strong>Name:</strong> ${escapeHtml(value.name)}</p><p><strong>Email:</strong> ${escapeHtml(value.email)}</p><p>${escapeHtml(value.message).replaceAll("\n", "<br>")}</p>`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function failure(status: number) {
  return Response.json(
    { ok: false, message: contact.form.error },
    { status, headers: NO_STORE },
  );
}

function fieldFailure(fields: ContactFieldErrors) {
  return Response.json(
    { ok: false, message: contact.form.error, fields },
    { status: 400, headers: NO_STORE },
  );
}
