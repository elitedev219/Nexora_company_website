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
  socialNavLabel: "Social",
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
        "Handle tasks instead of the account owner 24/7",
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
        "Live support on the technical interview session",
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
      value: "25+",
    },
    {
      id: "platforms-supported",
      label: "Platforms supported",
      value: "5+",
    },
    {
      id: "years-of-experience",
      label: "Years of experience",
      value: "3+",
    },
  ],
  platformGroup: {
    id: "showcase-platforms",
    heading: "AI training platforms",
    /** Specified grouping. Not a description of work performed. */
    engagement: "AI training platform engagement",
    cards: [
       {
        id: "snorkel-ai",
        name: "Snorkel AI",
        context: "Snorkel AI needed expert-authored task packages and evaluation rubrics to benchmark frontier models on real professional work, and needed them produced at volume without losing quality.",
        work: "Work on the Geranium product, Geranium Refinement, and Terminus 3 projects",
        result: "Delivered across Geranium, Geranium Refinement, and Terminus 3",
      },
      {
        id: "dataannotation",
        name: "DataAnnotation",
        context: "DataAnnotation needed skilled contributors to work across a wide mix of coding, writing, and evaluation projects, with consistent quality and fast turnaround on each one.",
        work: "Handled hundreds of projects in the platform",
        result: "Hundreds of projects delivered across coding, writing, and evaluation tasks with a consistently high quality rating.",
      },
      // {
      //   id: "platform-placeholder-1",
      //   name: "TODO: platform name",
      //   context: "TODO",
      //   work: "TODO",
      //   result: "TODO",
      // },
      // {
      //   id: "platform-placeholder-2",
      //   name: "TODO: platform name",
      //   context: "TODO",
      //   work: "TODO",
      //   result: "TODO",
      // },
    ],
  },
  placementGroup: {
    id: "showcase-placements",
    heading: "Job placement",
    cards: [
      {
        id: "us-market",
        market: "US market",
        name: "TODO: client name",
        role: "TODO",
        region: "TODO",
        timeToOffer: "TODO",
        context: "TODO",
        work: "TODO",
        result: "TODO",
      },
      {
        id: "other-market-1",
        market: "TODO: market",
        name: "TODO: client name",
        role: "TODO",
        region: "TODO",
        timeToOffer: "TODO",
        context: "TODO",
        work: "TODO",
        result: "TODO",
      },
      {
        id: "other-market-2",
        market: "TODO: market",
        name: "TODO: client name",
        role: "TODO",
        region: "TODO",
        timeToOffer: "TODO",
        context: "TODO",
        work: "TODO",
        result: "TODO",
      },
    ],
  },
} as const;

/**
 * About section copy.
 * Team introduction, member details, vision, and mission were not provided.
 * Every TODO string is a placeholder for Anatolii to replace.
 * None of these values are real people, roles, bios, or company statements.
 */
export const about = {
  id: "about",
  heading: "About",
  team: {
    id: "about-team",
    heading: "Team",
    /** TODO: Anatolii has not provided a team introduction. Replace this placeholder. Do not invent a company story. */
    introduction: "TODO: team introduction",
    /** Label for the empty photo slot. Not a caption of a person. */
    photoPlaceholder: "Photo placeholder",
    members: [
      {
        id: "member-1",
        name: "TODO: name",
        role: "TODO: role",
        bio: "TODO: one-line bio",
      },
      {
        id: "member-2",
        name: "TODO: name",
        role: "TODO: role",
        bio: "TODO: one-line bio",
      },
      {
        id: "member-3",
        name: "TODO: name",
        role: "TODO: role",
        bio: "TODO: one-line bio",
      },
      {
        id: "member-4",
        name: "TODO: name",
        role: "TODO: role",
        bio: "TODO: one-line bio",
      },
    ],
  },
  stack: {
    id: "about-stack",
    heading: "Tech stack",
    groups: [
      {
        id: "backend",
        heading: "Backend",
        tools: [
          "Python",
          "Django",
          "Django REST Framework",
          "PHP/Laravel",
          "CodeIgniter",
          "Node.js",
        ],
      },
      {
        id: "frontend",
        heading: "Frontend",
        tools: ["React", "Vue.js", "TypeScript", "Tailwind"],
      },
      {
        id: "data-ai",
        heading: "Data & AI",
        /**
         * TODO: Anatolii has not named Data & AI tools.
         * Replace this single placeholder chip. Do not invent libraries or model names.
         */
        tools: ["TODO: tools"],
      },
      {
        id: "cloud-devops",
        heading: "Cloud & DevOps",
        /**
         * TODO: Anatolii has not named Cloud & DevOps tools.
         * Replace this single placeholder chip. Do not invent AWS, Docker, or other tools.
         */
        tools: ["TODO: tools"],
      },
    ],
  },
  vision: {
    id: "about-vision",
    heading: "Vision",
    /** TODO: Anatolii has not provided a vision statement. Replace this placeholder. Do not draft one. */
    statement: "TODO: vision",
  },
  mission: {
    id: "about-mission",
    heading: "Mission",
    /** TODO: Anatolii has not provided a mission statement. Replace this placeholder. Do not draft one. */
    statement: "TODO: mission",
  },
} as const;

/**
 * Contact section copy.
 * Email, Telegram, and the booking link were not provided.
 * TODO strings are placeholders. Do not invent addresses or a calendar URL.
 */
export const contact = {
  id: "contact",
  heading: "Contact",
  lead: "Book a call, or send a message.",
  booking: {
    heading: "Book a call",
    iframeTitle: "Google Calendar appointments",
    /** Shown when NEXT_PUBLIC_BOOKING_URL is missing or not a real https URL. */
    missing: "TODO: booking link",
  },
  channels: {
    label: "Other ways to reach us",
    email: {
      label: "Email",
      /**
       * TODO: Anatolii has not provided an email address.
       * Render this as text. Do not use a mailto: link until the value is a real address.
       */
      value: "TODO: email",
    },
    telegram: {
      label: "Telegram",
      /**
       * TODO: Anatolii has not provided a Telegram handle or URL.
       * Render this as text. Do not use a t.me link until the value is a real address.
       */
      value: "TODO: telegram",
    },
  },
  form: {
    heading: "Send a message",
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Message",
    required: "(required)",
    submit: "Send message",
    sending: "Sending…",
    success: "Message sent.",
    error: "The message could not be sent. Try again.",
    noscript: "JavaScript is required to send this form.",
    honeypotLabel: "Website",
    errors: {
      nameRequired: "Enter your name.",
      nameLong: "Enter a shorter name.",
      emailRequired: "Enter your email address.",
      emailInvalid: "Enter a valid email address.",
      messageRequired: "Enter a message.",
      messageLong: "Enter a shorter message.",
    },
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

/** True for draft copy such as "TODO" or "TODO: email". */
export function isPlaceholder(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length === 0 || /^todo\b/i.test(trimmed);
}

/**
 * A real public https URL. Rejects empty values, TODO placeholders,
 * and example.com so the page never embeds a fake calendar.
 */
export function isPublicHttpUrl(value: string): boolean {
  const trimmed = value.trim();
  if (isPlaceholder(trimmed)) return false;

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return false;
  }

  if (url.protocol !== "https:") return false;
  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  if (host.length === 0 || host === "example.com" || host.endsWith(".example.com")) return false;
  if (host === "localhost" || host.endsWith(".localhost")) return false;
  return true;
}

/** Google Calendar appointment URL from NEXT_PUBLIC_BOOKING_URL, or nothing. */
export function getBookingUrl(): string | undefined {
  const configured = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() ?? "";
  if (!isPublicHttpUrl(configured)) return undefined;
  return configured;
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
