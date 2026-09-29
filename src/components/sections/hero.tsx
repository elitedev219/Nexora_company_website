import Image from "next/image";
import { Logo } from "@/components/logo";
import { hero } from "@/content/site";

const photos = {
  reviewing: {
    src: "/hero/reviewing-laptop.jpg",
    alt: "Person reviewing work on a laptop",
  },
  video: {
    src: "/hero/video-call.jpg",
    alt: "Remote video conversation on a laptop",
  },
  desk: {
    src: "/hero/desk-notes.jpg",
    alt: "Desk with notes and a laptop",
  },
  conversation: {
    src: "/hero/working-conversation.jpg",
    alt: "Two people in a quiet working conversation",
  },
} as const;

function HeroPhoto({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 280px, 46vw"
        className="hero-photo object-cover"
      />
    </div>
  );
}

function HeroCluster() {
  return (
    <div className="hero-cluster rise rise-delay-3">
      <div className="hero-cluster-col hero-cluster-col-a">
        <HeroPhoto {...photos.reviewing} className="hero-card hero-card-tall" />
        <HeroPhoto {...photos.video} className="hero-card hero-card-square-a" />
      </div>
      <div className="hero-cluster-col hero-cluster-col-b">
        <HeroPhoto {...photos.desk} className="hero-card hero-card-square-b" />
        <HeroPhoto {...photos.conversation} className="hero-card hero-card-taller" />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="px-5 sm:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-10 py-16 sm:py-20 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:content-center lg:gap-8 lg:py-16">
        <div>
          <div className="rise">
            <Logo variant="hero" />
          </div>
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
        <HeroCluster />
      </div>
    </section>
  );
}
