import { Logo } from "@/components/logo";
import {
  contact,
  copyrightNotice,
  isPlaceholder,
  isPublicHttpUrl,
  meetingHostEmail,
  navLinks,
  socialLinks,
  ui,
} from "@/content/site";
import { realEmailAddress, realTelegramHref } from "@/lib/contact";
import type { ReactNode } from "react";

export function Footer() {
  const year = new Date().getFullYear();
  const social = socialLinks.filter((link) => isPublicHttpUrl(link.href));
  const email = footerEmail();
  const telegram = footerTelegram();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo variant="footer" />
          <p className="mt-3 text-sm text-muted">{copyrightNotice(year)}</p>
          <ul aria-label={contact.channels.label} className="mt-6 flex list-none flex-col gap-1">
            <li>
              <ContactChannel
                label={contact.channels.email.label}
                text={email.text}
                href={email.href}
                icon={<EmailIcon />}
              />
            </li>
            <li>
              <ContactChannel
                label={contact.channels.telegram.label}
                text={telegram.text}
                href={telegram.href}
                icon={<TelegramIcon />}
              />
            </li>
          </ul>
          {social.length > 0 ? (
            <ul aria-label={ui.socialNavLabel} className="mt-6 flex gap-2">
              {social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-label={`${link.label} (opens in a new tab)`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-11 items-center justify-center border border-muted text-ink"
                  >
                    <ShareIcon />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <nav aria-label={ui.footerNavLabel}>
          <ul className="flex flex-col gap-1 sm:flex-row sm:gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex h-11 items-center text-sm text-ink underline-offset-4 hover:underline sm:px-3"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

/**
 * Footer mailbox. A real contact address becomes a mailto link.
 * A TODO placeholder uses the stored meeting host so the footer never shows draft copy.
 */
function footerEmail(): { text: string; href?: string } {
  const value = contact.channels.email.value;
  const address = realEmailAddress(value);
  if (address) return { text: address, href: `mailto:${address}` };

  if (isPlaceholder(value)) {
    const host = realEmailAddress(meetingHostEmail);
    if (host) return { text: host, href: `mailto:${host}` };
  }

  return { text: value };
}

/** Same Telegram value as the contact section. Link only a real handle or t.me URL. */
function footerTelegram(): { text: string; href?: string } {
  const value = contact.channels.telegram.value;
  return { text: value, href: realTelegramHref(value) };
}

function ContactChannel({
  label,
  text,
  href,
  icon,
}: {
  label: string;
  text: string;
  href?: string;
  icon: ReactNode;
}) {
  const content = (
    <>
      {icon}
      <span className="min-w-0 text-left">
        <span className="block text-muted">{label}</span>
        <span className="mt-0.5 block font-mono break-words text-ink">{text}</span>
      </span>
    </>
  );

  if (!href) {
    return (
      <span className="inline-flex min-h-11 max-w-full items-center gap-3 py-1 text-sm">{content}</span>
    );
  }

  return (
    <a
      href={href}
      className="inline-flex min-h-11 max-w-full items-center gap-3 py-1 text-sm underline-offset-4 hover:underline"
    >
      {content}
    </a>
  );
}

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="size-6 shrink-0 text-accent-text"
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
      className="size-6 shrink-0 text-accent-text"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M7 16.5 26 8l-5.5 16.5-5.2-5.8L7 16.5Z" />
      <path d="M15.3 18.7 25.2 9.2" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="6" cy="12" r="2" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="16" cy="17" r="2" />
      <path d="M8 11.2 14.2 8.2M8 12.8l6.2 3" />
    </svg>
  );
}
