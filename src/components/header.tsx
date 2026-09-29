"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks, siteName, ui } from "@/content/site";
import { useEffect, useId, useRef, useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    firstLinkRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");

    function onChange() {
      if (desktop.matches) setOpen(false);
    }

    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  return (
    <header id="top" className="sticky top-0 z-40 border-b border-line bg-canvas">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#top"
          className="font-mono text-[0.8125rem] font-medium tracking-[0.22em] text-ink"
        >
          {siteName}
        </a>
        <nav aria-label={ui.primaryNavLabel} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex h-11 items-center px-3 text-sm text-ink underline-offset-4 hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-11 min-w-16 items-center justify-center px-2 font-mono text-xs tracking-wide text-ink md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? ui.closeMenu : ui.openMenu}
          </button>
        </div>
      </div>
      <nav
        id={menuId}
        aria-label={ui.primaryNavLabel}
        hidden={!open}
        className="border-t border-line px-5 py-2 md:hidden"
      >
        <ul>
          {navLinks.map((link, index) => (
            <li key={link.href}>
              <a
                ref={index === 0 ? firstLinkRef : undefined}
                href={link.href}
                className="flex h-12 items-center text-base text-ink"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
