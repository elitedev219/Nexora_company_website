import { ui } from "@/content/site";

export function SkipLink() {
  return (
    <a
      href="#main"
      className="absolute left-4 top-4 z-50 -translate-y-24 bg-ink px-4 py-3 text-sm font-medium text-canvas focus:translate-y-0"
    >
      {ui.skipToContent}
    </a>
  );
}
