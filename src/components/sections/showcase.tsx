"use client";

import { showcase } from "@/content/site";
import { useEffect, useId, useRef, type CSSProperties, type ReactNode, type RefObject } from "react";

type PlatformCardData = (typeof showcase.platformGroup.cards)[number];
type PlacementCardData = (typeof showcase.placementGroup.cards)[number];

export function Showcase() {
  return (
    <section
      id={showcase.id}
      aria-labelledby="showcase-heading"
      tabIndex={-1}
      className="border-t border-line px-5 sm:px-8"
    >
      <div className="mx-auto max-w-6xl py-20 sm:py-28">
        <Reveal className="max-w-2xl">
          <div className="h-px w-10 bg-accent" aria-hidden="true" />
          <h2
            id="showcase-heading"
            className="mt-8 text-3xl font-medium tracking-tight text-ink sm:text-4xl"
          >
            {showcase.heading}
          </h2>
        </Reveal>

        <Reveal className="mt-14" delayMs={40}>
          <dl className="grid border border-line sm:grid-cols-3">
            {showcase.stats.map((stat, index) => (
              <div
                key={stat.id}
                className={
                  index > 0
                    ? "flex flex-col border-t border-line px-6 py-8 sm:border-t-0 sm:border-l sm:px-8"
                    : "flex flex-col px-6 py-8 sm:px-8"
                }
              >
                <dt className="order-2 mt-3 text-sm text-muted">{stat.label}</dt>
                <dd className="order-1 font-mono text-3xl font-medium tracking-wide text-ink">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <PlatformGroup />
        <PlacementGroup />
      </div>
    </section>
  );
}

function PlatformGroup() {
  const { platformGroup } = showcase;
  const headingId = `${platformGroup.id}-heading`;

  return (
    <section aria-labelledby={headingId} className="mt-20 sm:mt-24">
      <Reveal>
        <h3 id={headingId} className="text-2xl font-medium tracking-tight text-ink">
          {platformGroup.heading}
        </h3>
      </Reveal>
      <ul className="mt-8 grid list-none gap-6 md:grid-cols-2 md:gap-8">
        {platformGroup.cards.map((card, index) => (
          <PlatformCard key={card.id} card={card} delayMs={80 + index * 70} />
        ))}
      </ul>
    </section>
  );
}

function PlacementGroup() {
  const { placementGroup } = showcase;
  const headingId = `${placementGroup.id}-heading`;

  return (
    <section aria-labelledby={headingId} className="mt-20 sm:mt-24">
      <Reveal>
        <h3 id={headingId} className="text-2xl font-medium tracking-tight text-ink">
          {placementGroup.heading}
        </h3>
      </Reveal>
      <ul className="mt-8 grid list-none gap-6 md:grid-cols-2 md:gap-8">
        {placementGroup.cards.map((card, index) => (
          <PlacementCard key={card.id} card={card} delayMs={80 + index * 70} />
        ))}
      </ul>
    </section>
  );
}

function PlatformCard({ card, delayMs }: { card: PlatformCardData; delayMs: number }) {
  const titleId = useId();

  return (
    <RevealItem delayMs={delayMs} className="border border-line p-8 sm:p-10">
      <article aria-labelledby={titleId}>
        <h4 id={titleId} className="text-xl font-medium tracking-tight text-ink">
          {card.name}
        </h4>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {showcase.platformGroup.engagement}
        </p>
        <CaseDetails context={card.context} work={card.work} result={card.result} />
      </article>
    </RevealItem>
  );
}

function PlacementCard({ card, delayMs }: { card: PlacementCardData; delayMs: number }) {
  const titleId = useId();
  const { labels } = showcase;

  return (
    <RevealItem delayMs={delayMs} className="border border-line p-8 sm:p-10">
      <article aria-labelledby={titleId}>
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
          {card.market}
        </p>
        <h4 id={titleId} className="mt-3 text-xl font-medium tracking-tight text-ink">
          {card.name}
        </h4>
        <dl className="mt-8 grid gap-6 sm:grid-cols-3">
          <TokenField label={labels.role} value={card.role} />
          <TokenField label={labels.region} value={card.region} />
          <TokenField label={labels.timeToOffer} value={card.timeToOffer} />
        </dl>
        <CaseDetails context={card.context} work={card.work} result={card.result} />
      </article>
    </RevealItem>
  );
}

function CaseDetails({
  context,
  work,
  result,
}: {
  context: string;
  work: string;
  result: string;
}) {
  const { labels } = showcase;

  return (
    <dl className="mt-8 space-y-6 border-t border-line pt-8">
      <div>
        <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
          {labels.context}
        </dt>
        <dd className="mt-2 font-mono text-sm leading-6 text-ink">{context}</dd>
      </div>
      <div>
        <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
          {labels.work}
        </dt>
        <dd className="mt-2 font-mono text-sm leading-6 text-ink">{work}</dd>
      </div>
      <div>
        <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
          {labels.result}
        </dt>
        <dd className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
          {/* <span className="inline-flex h-6 items-center border border-line px-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent-text">
            {labels.placeholder}
          </span> */}
          <span className="font-mono text-sm text-ink">{result}</span>
        </dd>
      </div>
    </dl>
  );
}

function TokenField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
        {label}
      </dt>
      <dd className="mt-2 font-mono text-sm leading-6 text-ink">{value}</dd>
    </div>
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
