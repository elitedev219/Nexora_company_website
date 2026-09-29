"use client";

import { about } from "@/content/site";
import { useEffect, useId, useRef, type CSSProperties, type ReactNode, type RefObject } from "react";

type Member = (typeof about.team.members)[number];
type StackGroup = (typeof about.stack.groups)[number];

export function About() {
  return (
    <section
      id={about.id}
      aria-labelledby="about-heading"
      tabIndex={-1}
      className="border-t border-line px-5 sm:px-8"
    >
      <div className="mx-auto max-w-6xl py-20 sm:py-28">
        <Reveal className="max-w-2xl">
          <div className="h-px w-10 bg-accent" aria-hidden="true" />
          <h2
            id="about-heading"
            className="mt-8 text-3xl font-medium tracking-tight text-ink sm:text-4xl"
          >
            {about.heading}
          </h2>
        </Reveal>

        <Team />
        <Stack />
        <VisionAndMission />
      </div>
    </section>
  );
}

function Team() {
  const { team } = about;
  const headingId = `${team.id}-heading`;

  return (
    <section aria-labelledby={headingId} className="mt-14">
      <Reveal>
        <h3 id={headingId} className="text-2xl font-medium tracking-tight text-ink">
          {team.heading}
        </h3>
        <p className="mt-4 max-w-2xl font-mono text-sm leading-6 text-ink">{team.introduction}</p>
      </Reveal>
      {/* <ul className="mt-10 grid list-none gap-6 sm:grid-cols-2 sm:gap-8">
        {team.members.map((member, index) => (
          <MemberCard key={member.id} member={member} delayMs={80 + index * 70} />
        ))}
      </ul> */}
    </section>
  );
}

function MemberCard({ member, delayMs }: { member: Member; delayMs: number }) {
  const titleId = useId();

  return (
    <RevealItem delayMs={delayMs} className="border border-line">
      <article aria-labelledby={titleId}>
        <PhotoPlaceholder label={about.team.photoPlaceholder} />
        <div className="p-8 sm:p-10">
          <h4 id={titleId} className="text-xl font-medium tracking-tight text-ink">
            {member.name}
          </h4>
          <p className="mt-3 font-mono text-sm leading-6 text-ink">{member.role}</p>
          <p className="mt-4 font-mono text-sm leading-6 text-muted">{member.bio}</p>
        </div>
      </article>
    </RevealItem>
  );
}

function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-40 items-center justify-center border-b border-line">
      <p className="font-mono text-xs tracking-wide text-muted">{label}</p>
    </div>
  );
}

function Stack() {
  const { stack } = about;
  const headingId = `${stack.id}-heading`;

  return (
    <section aria-labelledby={headingId} className="mt-20 sm:mt-24">
      <Reveal>
        <h3 id={headingId} className="text-2xl font-medium tracking-tight text-ink">
          {stack.heading}
        </h3>
      </Reveal>
      <ul className="mt-10 grid list-none gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12">
        {stack.groups.map((group, index) => (
          <StackGroupCard key={group.id} group={group} delayMs={40 + index * 60} />
        ))}
      </ul>
    </section>
  );
}

function StackGroupCard({ group, delayMs }: { group: StackGroup; delayMs: number }) {
  const headingId = useId();

  return (
    <RevealItem delayMs={delayMs}>
      <h4 id={headingId} className="text-base font-medium tracking-tight text-ink">
        {group.heading}
      </h4>
      <ul aria-labelledby={headingId} className="mt-4 flex list-none flex-wrap gap-2">
        {group.tools.map((tool) => (
          <li
            key={tool}
            className="inline-flex items-center border border-line px-3 py-1.5 font-mono text-sm leading-6 text-ink"
          >
            {tool}
          </li>
        ))}
      </ul>
    </RevealItem>
  );
}

function VisionAndMission() {
  return (
    <div className="mt-20 grid gap-6 sm:mt-24 md:grid-cols-2 md:gap-8">
      <StatementBlock
        id={about.vision.id}
        heading={about.vision.heading}
        statement={about.vision.statement}
        delayMs={40}
      />
      <StatementBlock
        id={about.mission.id}
        heading={about.mission.heading}
        statement={about.mission.statement}
        delayMs={110}
      />
    </div>
  );
}

function StatementBlock({
  id,
  heading,
  statement,
  delayMs,
}: {
  id: string;
  heading: string;
  statement: string;
  delayMs: number;
}) {
  const headingId = `${id}-heading`;

  return (
    <Reveal delayMs={delayMs}>
      <article aria-labelledby={headingId} className="border border-line p-8 sm:p-10">
        <h3 id={headingId} className="text-2xl font-medium tracking-tight text-ink">
          {heading}
        </h3>
        <p className="mt-4 font-mono text-sm leading-6 text-ink">{statement}</p>
      </article>
    </Reveal>
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
