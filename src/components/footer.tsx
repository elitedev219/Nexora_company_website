import { copyrightNotice, navLinks, siteName, ui } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[0.8125rem] font-medium tracking-[0.22em] text-ink">
            {siteName}
          </p>
          <p className="mt-3 text-sm text-muted">{copyrightNotice(year)}</p>
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
