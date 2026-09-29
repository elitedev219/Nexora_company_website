import Image from "next/image";

const LOGO_WIDTH = 997;
const LOGO_HEIGHT = 712;

const variants = {
  header: {
    className: "h-11 w-auto",
    sizes: "64px",
    fetchPriority: "high" as const,
  },
  hero: {
    className: "h-24 w-auto sm:h-28",
    sizes: "(min-width: 640px) 157px, 134px",
    fetchPriority: "high" as const,
  },
  footer: {
    className: "h-10 w-auto",
    sizes: "56px",
    fetchPriority: undefined,
  },
};

export function Logo({ variant }: { variant: keyof typeof variants }) {
  const { className, sizes, fetchPriority } = variants[variant];

  return (
    <span className="logo-lockup">
      <Image
        src="/brand/nexora-logo.png"
        alt="NEXORA"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        sizes={sizes}
        fetchPriority={fetchPriority}
        className={`logo-light ${className}`}
      />
      <Image
        src="/brand/nexora-logo-dark.png"
        alt="NEXORA"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        sizes={sizes}
        fetchPriority={fetchPriority}
        className={`logo-dark ${className}`}
      />
    </span>
  );
}
