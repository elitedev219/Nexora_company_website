/**
 * All site copy and known public facts live in this module.
 * TODO comments mark draft or missing values that must be replaced before launch.
 */

export const siteName = "NEXORA";

/** Language of the page copy currently in this file. */
export const documentLanguage = "en";

/**
 * TODO: Confirm the Open Graph locale (language_REGION). Region was not provided,
 * so og:locale is omitted until then.
 */
export const openGraphLocale: string | undefined = undefined;

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#showcase", label: "Showcase" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export const hero = {
  /** TODO: Draft headline awaiting approval. Replace with the approved headline. */
  headline:
    "Operational support for AI training platforms and remote job search.",
  /** TODO: Draft value proposition awaiting approval. Replace with the approved one-line value proposition. */
  valueProposition:
    "An independent consulting practice expanding into the US market.",
  primaryCta: {
    label: "Book a call",
    href: "#contact",
  },
  secondaryCta: {
    label: "See our work",
    href: "#showcase",
  },
} as const;

export const ui = {
  skipToContent: "Skip to content",
  openMenu: "Menu",
  closeMenu: "Close",
  toggleTheme: "Toggle color theme",
  primaryNavLabel: "Primary",
  footerNavLabel: "Footer",
} as const;

/**
 * TODO: Add real social profile URLs here as { label, href } before rendering icons.
 * Do not invent profiles. Leave this empty and omit social icons until URLs exist.
 */
export const socialLinks: readonly {
  readonly label: string;
  readonly href: string;
}[] = [];

/** Service types named in structured data and as the services card titles. */
export const serviceTypes = [
  "AI Training Platform Support",
  "Remote Job Hunting Support",
] as const;

/**
 * TODO: Draft services sentences for Anatolii to replace.
 * Each `description` array is the two drafted sentences for that card.
 * Bullets stay inside the same specified scope.
 */
export const services = {
  id: "services",
  heading: "Services",
  items: [
    {
      title: serviceTypes[0],
      icon: "platform",
      description: [
        "Support covers onboarding and ramp-up for annotation and evaluation platforms.",
        "It also covers task authoring, quality and rubric design, and throughput and acceptance-rate improvement.",
      ],
      points: [
        "Onboarding and ramp-up for annotation and evaluation platforms",
        "Task authoring",
        "Quality and rubric design",
        "Throughput and acceptance-rate improvement",
      ],
    },
    {
      title: serviceTypes[1],
      icon: "search",
      description: [
        "Support covers resume and profile positioning for remote and US-based roles.",
        "It also covers job sourcing and application tracking, interview preparation, and offer negotiation.",
      ],
      points: [
        "Resume and profile positioning",
        "Job sourcing and application tracking",
        "Interview preparation",
        "Offer negotiation for remote and US-based roles",
      ],
    },
  ],
} as const;

/**
 * Showcase figures and case details.
 * Every TODO string is a placeholder for Anatolii to replace.
 * None of these values are measured outcomes.
 */
export const showcase = {
  id: "showcase",
  heading: "Showcase",
  labels: {
    context: "Context",
    work: "What we did",
    result: "Result",
    /** Visible marker so a result cannot be read as a real outcome. */
    placeholder: "Placeholder",
    role: "Role",
    region: "Region",
    timeToOffer: "Time to offer",
  },
  stats: [
    {
      id: "placements-made",
      label: "Placements made",
      /** TODO: Anatolii will replace the placements-made metric. */
      value: "TODO",
    },
    {
      id: "platforms-supported",
      label: "Platforms supported",
      /** TODO: Anatolii will replace the platforms-supported metric. */
      value: "TODO",
    },
    {
      id: "years-of-experience",
      label: "Years of experience",
      /** TODO: Anatolii will replace the years-of-experience metric. */
      value: "TODO",
    },
  ],
  platformGroup: {
    id: "showcase-platforms",
    heading: "AI training platforms",
    /** Specified grouping. Not a description of work performed. */
    engagement: "AI training platform engagement",
    cards: [
      {
        id: "dataannotation",
        name: "DataAnnotation",
        /** TODO: Anatolii will replace the context for the DataAnnotation engagement. */
        context: "TODO",
        /** TODO: Anatolii will replace what was done on the DataAnnotation engagement. */
        work: "TODO",
        /** TODO: Anatolii will replace the measurable result for the DataAnnotation engagement. */
        result: "TODO",
      },
      {
        id: "snorkel-ai",
        name: "Snorkel AI",
        /** TODO: Anatolii will replace the context for the Snorkel AI engagement. */
        context: "TODO",
        /** TODO: Anatolii will replace what was done on the Snorkel AI engagement. */
        work: "TODO",
        /** TODO: Anatolii will replace the measurable result for the Snorkel AI engagement. */
        result: "TODO",
      },
      {
        id: "platform-placeholder-1",
        /** TODO: Anatolii will replace this platform name. */
        name: "TODO: platform name",
        /** TODO: Anatolii will replace the context for this platform engagement. */
        context: "TODO",
        /** TODO: Anatolii will replace what was done on this platform engagement. */
        work: "TODO",
        /** TODO: Anatolii will replace the measurable result for this platform engagement. */
        result: "TODO",
      },
      {
        id: "platform-placeholder-2",
        /** TODO: Anatolii will replace this platform name. */
        name: "TODO: platform name",
        /** TODO: Anatolii will replace the context for this platform engagement. */
        context: "TODO",
        /** TODO: Anatolii will replace what was done on this platform engagement. */
        work: "TODO",
        /** TODO: Anatolii will replace the measurable result for this platform engagement. */
        result: "TODO",
      },
    ],
  },
  placementGroup: {
    id: "showcase-placements",
    heading: "Job placement",
    cards: [
      {
        id: "us-market",
        market: "US market",
        /** TODO: Anatolii will replace the client name for the US market placement. */
        name: "TODO: client name",
        /** TODO: Anatolii will replace the role for the US market placement. */
        role: "TODO",
        /** TODO: Anatolii will replace the region for the US market placement. */
        region: "TODO",
        /** TODO: Anatolii will replace the time to offer for the US market placement. */
        timeToOffer: "TODO",
        /** TODO: Anatolii will replace the context for the US market placement. */
        context: "TODO",
        /** TODO: Anatolii will replace what was done for the US market placement. */
        work: "TODO",
        /** TODO: Anatolii will replace the measurable result for the US market placement. */
        result: "TODO",
      },
      {
        id: "other-market-1",
        /** TODO: Anatolii will replace this market name. */
        market: "TODO: market",
        /** TODO: Anatolii will replace the client name for this placement. */
        name: "TODO: client name",
        /** TODO: Anatolii will replace the role for this placement. */
        role: "TODO",
        /** TODO: Anatolii will replace the region for this placement. */
        region: "TODO",
        /** TODO: Anatolii will replace the time to offer for this placement. */
        timeToOffer: "TODO",
        /** TODO: Anatolii will replace the context for this placement. */
        context: "TODO",
        /** TODO: Anatolii will replace what was done for this placement. */
        work: "TODO",
        /** TODO: Anatolii will replace the measurable result for this placement. */
        result: "TODO",
      },
      {
        id: "other-market-2",
        /** TODO: Anatolii will replace this market name. */
        market: "TODO: market",
        /** TODO: Anatolii will replace the client name for this placement. */
        name: "TODO: client name",
        /** TODO: Anatolii will replace the role for this placement. */
        role: "TODO",
        /** TODO: Anatolii will replace the region for this placement. */
        region: "TODO",
        /** TODO: Anatolii will replace the time to offer for this placement. */
        timeToOffer: "TODO",
        /** TODO: Anatolii will replace the context for this placement. */
        context: "TODO",
        /** TODO: Anatolii will replace what was done for this placement. */
        work: "TODO",
        /** TODO: Anatolii will replace the measurable result for this placement. */
        result: "TODO",
      },
    ],
  },
} as const;

export const areaServed = "United States";

/**
 * TODO: Draft meta description awaiting approval. Replace with the approved description.
 */
export const siteDescription =
  "An independent consulting practice expanding into the US market.";

/**
 * TODO: Add an approved Open Graph image path or absolute URL when artwork exists.
 * Omitted from metadata until then.
 */
export const ogImage: string | undefined = undefined;

/**
 * TODO: Set NEXT_PUBLIC_SITE_URL to the canonical production origin.
 * No production domain was provided. This localhost value is a local-dev
 * fallback only and must not be published as the real site URL.
 */
const LOCAL_DEV_SITE_URL = "http://localhost:3000";

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return LOCAL_DEV_SITE_URL;
  return configured.replace(/\/$/, "");
}

export function copyrightNotice(year: number): string {
  return `© ${year} ${siteName}`;
}

export function professionalServiceJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteName,
    url: getSiteUrl(),
    areaServed: {
      "@type": "Country",
      name: areaServed,
    },
    makesOffer: serviceTypes.map((serviceType) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: serviceType,
        serviceType,
      },
    })),
  };
}
