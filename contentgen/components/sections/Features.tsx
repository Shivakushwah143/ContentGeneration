import { Card } from "@/components/ui/card";
import { Brain, Clock, Target, Shuffle, BarChart, ClipboardEdit } from "lucide-react";

const features = [
  {
    title: "AI-Powered Content",
    description: "Generate high-quality, platform-specific content with a focused prompt and clear structure.",
    icon: Brain,
  },
  {
    title: "Multi-Platform Support",
    description: "Create optimized content for X, LinkedIn, Instagram and more with tailored formatting.",
    icon: ClipboardEdit,
  },
  {
    title: "Time Saving",
    description: "Produce weeks of social content in minutes instead of hours.",
    icon: Clock,
  },
  {
    title: "Engagement Boost",
    description: "Generate content built to increase likes, shares, and follower growth.",
    icon: Target,
  },
  {
    title: "Content Variations",
    description: "Spin up multiple versions to A/B test what works best.",
    icon: Shuffle,
  },
  {
    title: "Performance Analytics",
    description: "Track which generated content performs best across platforms.",
    icon: BarChart,
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold">
            Features built for real content teams
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to create engaging, high-performing content quickly.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group border-border/60 bg-background/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex items-center justify-center rounded-xl border border-border/60 bg-muted/40 p-3">
                <feature.icon className="h-6 w-6 text-foreground/80" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
              <div className="mt-4 h-1 w-10 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 opacity-0 transition-opacity group-hover:opacity-100" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
