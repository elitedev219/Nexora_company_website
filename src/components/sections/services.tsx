"use client";

import { services } from "@/content/site";
import { useEffect, useRef, type CSSProperties, type ReactNode, type RefObject } from "react";

export function Services() {
  return (
    <section
      id={services.id}
      aria-labelledby="services-heading"
      className="border-t border-line px-5 sm:px-8"
    >
      <div className="mx-auto max-w-6xl py-20 sm:py-28">
        <Reveal className="max-w-2xl">
          <div className="h-px w-10 bg-accent" aria-hidden="true" />
          <h2
            id="services-heading"
            className="mt-8 text-3xl font-medium tracking-tight text-ink sm:text-4xl"
          >
            {services.heading}
          </h2>
        </Reveal>
        <ul className="mt-14 grid list-none gap-6 md:grid-cols-2 md:gap-8">
          {services.items.map((item, index) => (
            <RevealItem
              key={item.title}
              delayMs={80 + index * 70}
              className="border border-line p-8 sm:p-10"
            >
              <ServiceIcon name={item.icon} />
              <h3 className="mt-8 text-xl font-medium tracking-tight text-ink">
                {item.title}
              </h3>
              <div className="mt-4 space-y-3">
                {item.description.map((sentence) => (
                  <p key={sentence} className="text-base leading-relaxed text-muted">
                    {sentence}
                  </p>
                ))}
              </div>
              <ul className="mt-8 space-y-3">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-6 text-ink">
                    <span
                      aria-hidden="true"
                      className="mt-[0.55rem] size-1.5 shrink-0 bg-accent"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServiceIcon({ name }: { name: (typeof services.items)[number]["icon"] }) {
  if (name === "platform") return <PlatformIcon />;
  return <SearchIcon />;
}

function PlatformIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="size-8 text-accent-text"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M7 12V8h4M21 8h4v4M25 20v4h-4M11 24H7v-4" />
      <path d="M12 15h8M12 19h5" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="size-8 text-accent-text"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="5" y="6" width="12" height="16" />
      <path d="M8 11h6M8 15h5M8 19h4" />
      <path d="M20 12h7M20 16h6M20 20h4" />
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
      { threshold: 0.2 },
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

function RevealItem({
  className,
  children,
  delayMs = 0,
}: {
  className?: string;
  children: ReactNode;
  delayMs?: number;
}) {
  const ref = useScrollReveal<HTMLLIElement>();
  return (
    <li ref={ref} className={className} style={delayStyle(delayMs)}>
      {children}
    </li>
  );
}

function delayStyle(delayMs: number): CSSProperties | undefined {
  if (delayMs <= 0) return undefined;
  return { animationDelay: `${delayMs}ms` };
}
