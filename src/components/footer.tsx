import { copyrightNotice, isPublicHttpUrl, navLinks, siteName, socialLinks, ui } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  const social = socialLinks.filter((link) => isPublicHttpUrl(link.href));

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[0.8125rem] font-medium tracking-[0.22em] text-ink">
            {siteName}
          </p>
          <p className="mt-3 text-sm text-muted">{copyrightNotice(year)}</p>
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
