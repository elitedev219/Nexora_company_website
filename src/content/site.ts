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

/** Service types that may be named in structured data. These sections are not rendered yet. */
export const serviceTypes = [
  "AI Training Platform Support",
  "Remote Job Hunting Support",
] as const;

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
