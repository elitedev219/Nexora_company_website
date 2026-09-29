"use client";

import { contact, getBookingUrl } from "@/content/site";
import {
  realEmailAddress,
  realTelegramHref,
  validateContactSubmission,
  type ContactField,
  type ContactFieldErrors,
} from "@/lib/contact";
import { useEffect, useId, useRef, useState, type CSSProperties, type FormEvent, type ReactNode, type RefObject } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const bookingUrl = getBookingUrl();

  return (
    <section
      id={contact.id}
      aria-labelledby="contact-heading"
      className="border-t border-line px-5 sm:px-8"
    >
      <div className="mx-auto max-w-6xl py-20 sm:py-28">
        <Reveal className="max-w-2xl">
          <div className="h-px w-10 bg-accent" aria-hidden="true" />
          <h2
            id="contact-heading"
            className="mt-8 text-3xl font-medium tracking-tight text-ink sm:text-4xl"
          >
            {contact.heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{contact.lead}</p>
        </Reveal>

        <div className="mt-14 grid gap-16 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <h3 className="text-2xl font-medium tracking-tight text-ink">{contact.booking.heading}</h3>
            {bookingUrl ? (
              <iframe
                title={contact.booking.iframeTitle}
                src={bookingUrl}
                className="mt-6 h-[32rem] w-full border border-line bg-canvas sm:h-[36rem]"
                loading="lazy"
              />
            ) : (
              <p className="mt-6 border border-line px-8 py-10 font-mono text-sm text-ink">
                {contact.booking.missing}
              </p>
            )}
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal>
              <Channels />
            </Reveal>
            <Reveal className="mt-12" delayMs={80}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Channels() {
  const email = realEmailAddress(contact.channels.email.value);
  const telegramHref = realTelegramHref(contact.channels.telegram.value);

  return (
    <ul aria-label={contact.channels.label} className="flex list-none flex-col gap-6">
      <li className="flex items-start gap-4">
        <EmailIcon />
        <div>
          <p className="text-sm text-muted">{contact.channels.email.label}</p>
          {email ? (
            <a
              href={`mailto:${email}`}
              className="mt-1 inline-flex font-mono text-sm text-ink underline-offset-4 hover:underline"
            >
              {email}
            </a>
          ) : (
            <p className="mt-1 font-mono text-sm text-ink">{contact.channels.email.value}</p>
          )}
        </div>
      </li>
      <li className="flex items-start gap-4">
        <TelegramIcon />
        <div>
          <p className="text-sm text-muted">{contact.channels.telegram.label}</p>
          {telegramHref ? (
            <a
              href={telegramHref}
              className="mt-1 inline-flex font-mono text-sm text-ink underline-offset-4 hover:underline"
            >
              {contact.channels.telegram.value}
            </a>
          ) : (
            <p className="mt-1 font-mono text-sm text-ink">{contact.channels.telegram.value}</p>
          )}
        </div>
      </li>
    </ul>
  );
}

function ContactForm() {
  const formId = useId();
  const nameId = `${formId}-name`;
  const emailId = `${formId}-email`;
  const messageId = `${formId}-message`;
  const honeypotId = `${formId}-website`;
  const nameErrorId = `${nameId}-error`;
  const emailErrorId = `${emailId}-error`;
  const messageErrorId = `${messageId}-error`;
  const statusId = `${formId}-status`;

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "success" || status === "error") statusRef.current?.focus();
  }, [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const formData = new FormData(event.currentTarget);
    const submittedName = String(formData.get("name") ?? "");
    const submittedEmail = String(formData.get("email") ?? "");
    const submittedMessage = String(formData.get("message") ?? "");
    const submittedHoneypot = String(formData.get("hp_website") ?? "");

    if (submittedHoneypot.trim()) {
      setFieldErrors({});
      setName("");
      setEmail("");
      setMessage("");
      setStatus("success");
      return;
    }

    const { errors } = validateContactSubmission({
      name: submittedName,
      email: submittedEmail,
      message: submittedMessage,
    });
    if (errors.name || errors.email || errors.message) {
      setFieldErrors(errors);
      setStatus("idle");
      focusField(errors, { nameRef, emailRef, messageRef });
      return;
    }

    setFieldErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: submittedName,
          email: submittedEmail,
          message: submittedMessage,
          hp_website: submittedHoneypot,
        }),
      });
      const payload: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        const fields = readFieldErrors(payload);
        if (fields) {
          setFieldErrors(fields);
          setStatus("idle");
          focusField(fields, { nameRef, emailRef, messageRef });
          return;
        }
        setStatus("error");
        return;
      }
      setName("");
      setEmail("");
      setMessage("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const statusText =
    status === "success" ? contact.form.success : status === "error" ? contact.form.error : "";

  return (
    <form
      className="relative"
      method="post"
      action="/api/contact"
      noValidate
      onSubmit={onSubmit}
      aria-busy={status === "submitting"}
    >
      <h3 className="text-2xl font-medium tracking-tight text-ink">{contact.form.heading}</h3>
      <div aria-hidden="true" className="absolute left-0 top-0 h-px w-px overflow-hidden opacity-0">
        <label htmlFor={honeypotId}>{contact.form.honeypotLabel}</label>
        <input
          id={honeypotId}
          name="hp_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-6 space-y-5">
        <Field
          id={nameId}
          label={contact.form.nameLabel}
          error={fieldErrors.name}
          errorId={nameErrorId}
        >
          <input
            ref={nameRef}
            id={nameId}
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            aria-required="true"
            aria-invalid={fieldErrors.name ? true : undefined}
            aria-describedby={fieldErrors.name ? nameErrorId : undefined}
            className={fieldClass}
          />
        </Field>
        <Field
          id={emailId}
          label={contact.form.emailLabel}
          error={fieldErrors.email}
          errorId={emailErrorId}
        >
          <input
            ref={emailRef}
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            aria-required="true"
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? emailErrorId : undefined}
            className={fieldClass}
          />
        </Field>
        <Field
          id={messageId}
          label={contact.form.messageLabel}
          error={fieldErrors.message}
          errorId={messageErrorId}
        >
          <textarea
            ref={messageRef}
            id={messageId}
            name="message"
            rows={6}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            aria-required="true"
            aria-invalid={fieldErrors.message ? true : undefined}
            aria-describedby={fieldErrors.message ? messageErrorId : undefined}
            className={`${fieldClass} resize-y`}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-12 items-center justify-center bg-accent px-5 text-sm font-medium text-accent-foreground hover:bg-accent-hover disabled:cursor-wait"
        >
          {status === "submitting" ? contact.form.sending : contact.form.submit}
        </button>
        <p
          ref={statusRef}
          id={statusId}
          tabIndex={statusText ? -1 : undefined}
          role="status"
          aria-live="polite"
          className="text-sm text-ink"
        >
          {statusText}
        </p>
      </div>
      <noscript>
        <p className="mt-4 text-sm text-ink">{contact.form.noscript}</p>
      </noscript>
    </form>
  );
}

const fieldClass =
  "mt-2 w-full border border-muted bg-canvas px-3 py-3 text-base text-ink";

function Field({
  id,
  label,
  error,
  errorId,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  errorId: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label} <span className="font-normal text-muted">{contact.form.required}</span>
      </label>
      {children}
      {error ? (
        <p id={errorId} role="alert" className="mt-2 text-sm text-ink">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function focusField(
  errors: ContactFieldErrors,
  refs: {
    nameRef: RefObject<HTMLInputElement | null>;
    emailRef: RefObject<HTMLInputElement | null>;
    messageRef: RefObject<HTMLTextAreaElement | null>;
  },
) {
  const order: ContactField[] = ["name", "email", "message"];
  const target = order.find((field) => errors[field]);
  if (target === "name") refs.nameRef.current?.focus();
  else if (target === "email") refs.emailRef.current?.focus();
  else if (target === "message") refs.messageRef.current?.focus();
}

function readFieldErrors(data: unknown): ContactFieldErrors | null {
  if (!data || typeof data !== "object") return null;
  const fields = (data as { fields?: unknown }).fields;
  if (!fields || typeof fields !== "object") return null;
  const source = fields as Record<string, unknown>;
  const errors: ContactFieldErrors = {};
  for (const key of ["name", "email", "message"] as const) {
    const value = source[key];
    if (typeof value === "string" && value.trim() && value.length <= 200) errors[key] = value;
  }
  return errors.name || errors.email || errors.message ? errors : null;
}

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="size-8 shrink-0 text-accent-text"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="5" y="8" width="22" height="16" />
      <path d="M6 9.5 16 17l10-7.5" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="size-8 shrink-0 text-accent-text"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M7 16.5 26 8l-5.5 16.5-5.2-5.8L7 16.5Z" />
      <path d="M15.3 18.7 25.2 9.2" />
    </svg>
  );
}

function useScrollReveal<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let wasPending = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (!entry.isIntersecting) {
          node.dataset.reveal = "pending";
          wasPending = true;
          return;
        }
        if (wasPending) node.dataset.reveal = "shown";
        observer.disconnect();
      },
      { threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function Reveal({
  className,
  children,
  delayMs = 0,
}: {
  className?: string;
  children: ReactNode;
  delayMs?: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={className} style={delayStyle(delayMs)}>
      {children}
    </div>
  );
}

function delayStyle(delayMs: number): CSSProperties | undefined {
  if (delayMs <= 0) return undefined;
  return { animationDelay: `${delayMs}ms` };
}
