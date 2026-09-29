const LOGO_WIDTH = 997;
const LOGO_HEIGHT = 712;

const variants = {
  header: {
    className: "h-11 w-auto",
    fetchPriority: "high" as const,
  },
  hero: {
    className: "h-24 w-auto sm:h-28",
    fetchPriority: "high" as const,
  },
  footer: {
    className: "h-10 w-auto",
    fetchPriority: undefined,
  },
};

export function Logo({ variant }: { variant: keyof typeof variants }) {
  const { className, fetchPriority } = variants[variant];

  return (
    <span className="logo-lockup">
      <LogoImage
        src="/brand/nexora-logo.png"
        className={`logo-light ${className}`}
        fetchPriority={fetchPriority}
      />
      <LogoImage
        src="/brand/nexora-logo-dark.png"
        className={`logo-dark ${className}`}
        fetchPriority={fetchPriority}
      />
    </span>
  );
}

function LogoImage({
  src,
  className,
  fetchPriority,
}: {
  src: string;
  className: string;
  fetchPriority?: "high" | "low" | "auto";
}) {
  return (
    // next/image injects style color:transparent, which hydrates with an extra visibility value.
    // eslint-disable-next-line @next/next/no-img-element -- avoid next/image inline style hydration mismatch
    <img
      src={src}
      alt="NEXORA"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      decoding="async"
      loading="lazy"
      fetchPriority={fetchPriority}
      className={className}
    />
  );
}
