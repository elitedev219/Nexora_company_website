import { professionalServiceJsonLd } from "@/content/site";

export function JsonLd() {
  const json = JSON.stringify(professionalServiceJsonLd()).replace(
    /</g,
    "\\u003c",
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
