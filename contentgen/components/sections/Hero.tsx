"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { SparklesCore } from "@/components/ui/sparkles";

export function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden rounded-md bg-background">
      {/* Animated background */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="hero-sparkles"
          // background="transparent"
          // minSize={0.8}
          // maxSize={3}
          // particleDensity={500}
          // className="w-full h-full"
          // particleColor="#6366f1"
        />
      </div>

      <div className="container px-4 md:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-3xl mx-auto"
        >
          {/* Beta badge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <span>Beta Version</span>
            <ArrowRightIcon className="ml-1 size-3" />
          </motion.div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="  text-white">
              AI-Powered Content Creation
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl text-muted-foreground">
            Generate high-quality, platform-specific content in seconds. Save time and boost engagement with AI.
          </p>

          {/* CTA buttons */}
          <div className="flex justify-center gap-4 pt-6">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/sign-up">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}