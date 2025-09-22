import { Card } from "@/components/ui/card";
import { Brain, Clock, Target, Shuffle, Sparkles, BarChart, ClipboardEdit } from "lucide-react";

const features = [
  {
    title: "AI-Powered Content",
    description: "Generate high-quality, platform-specific content with just a few clicks using advanced AI.",
    icon: Brain,
  },
  {
    title: "Multi-Platform Support",
    description: "Create optimized content for Twitter, LinkedIn, Instagram and more with tailored formatting.",
    icon: ClipboardEdit,
  },
  {
    title: "Time Saving",
    description: "Produce weeks worth of social media content in minutes instead of hours.",
    icon: Clock,
  },
  {
    title: "Engagement Boost",
    description: "Generate content proven to increase likes, shares, and follower growth.",
    icon: Target,
  },
  {
    title: "Content Variations",
    description: "Get multiple versions of your content to A/B test what works best.",
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
    <section className="py-20 px-4 md:px-8 bg-background" id="features">
      <div className=" mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Powerful Content Generation Features
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to create engaging, high-performing content effortlessly
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card 
              key={feature.title} 
              className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/30"
            >
              <div className="mb-4 bg-primary/10 p-3 rounded-lg w-fit">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}