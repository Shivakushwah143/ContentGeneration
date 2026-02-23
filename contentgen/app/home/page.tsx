import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { FeaturesSection } from "@/components/sections/Features";
import MarqueeComponent from "@/components/sections/MarqueeComponent";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <div className="py-8">
        <MarqueeComponent />
      </div>
      <FeaturesSection />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-cyan-500/10 via-sky-500/5 to-emerald-400/10 p-10 text-center shadow-xl">
            <h2 className="text-3xl font-semibold">Ready to publish your next 30 posts?</h2>
            <p className="mt-3 text-muted-foreground">
              Jump into the generator or explore pricing to unlock more credits.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/">Open Generator</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
