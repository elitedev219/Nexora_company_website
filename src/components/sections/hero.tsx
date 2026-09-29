import { hero, siteName } from "@/content/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="px-5 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col justify-center py-16 sm:py-24">
        <p className="rise font-mono text-[0.8125rem] font-medium tracking-[0.22em] text-ink">
          {siteName}
        </p>
        <div className="rise rise-delay-1 mt-8 h-px w-10 bg-accent" aria-hidden="true" />
        <h1
          id="hero-heading"
          className="rise rise-delay-1 mt-8 max-w-3xl text-4xl font-medium leading-[1.12] tracking-tight text-ink sm:text-5xl sm:leading-[1.08]"
        >
          {hero.headline}
        </h1>
        <p className="rise rise-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-muted">
          {hero.valueProposition}
        </p>
        <div className="rise rise-delay-3 mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href={hero.primaryCta.href}
            className="inline-flex h-12 items-center justify-center bg-accent px-5 text-sm font-medium text-accent-foreground hover:bg-accent-hover"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="inline-flex h-12 items-center justify-center border border-line px-5 text-sm font-medium text-ink hover:border-accent"
          >
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
