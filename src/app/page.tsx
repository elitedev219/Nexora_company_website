import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SkipLink } from "@/components/skip-link";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Showcase } from "@/components/sections/showcase";

export default function HomePage() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1">
        <Hero />
        <Services />
        <Showcase />
      </main>
      <Footer />
    </>
  );
}
