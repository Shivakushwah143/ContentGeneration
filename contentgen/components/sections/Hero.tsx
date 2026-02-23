// "use client";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { ArrowRightIcon } from "@radix-ui/react-icons";
// import { SparklesCore } from "@/components/ui/sparkles";

// export function Hero() {
//   return (
//     <section className="relative min-h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden rounded-md bg-background">
//       {/* Animated background */}
//       <div className="absolute inset-0 w-full h-full">
     
//       </div>

//       <div className="container px-4 md:px-8 text-center relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="space-y-6 max-w-3xl mx-auto"
//         >
//           {/* Beta badge */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.6 }}
//             className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
//           >
//             <span>Beta Version</span>
//             <ArrowRightIcon className="ml-1 size-3" />
//           </motion.div>

//           {/* Main heading */}
//           <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
//             <span className="  text-white">
//               AI-Powered Content Creation
//             </span>
//           </h1>
          
//           {/* Subheading */}
//           <p className="text-xl text-muted-foreground">
//             Generate high-quality, platform-specific content in seconds. Save time and boost engagement with AI.
//           </p>

//           {/* CTA buttons */}
//           <div className="flex justify-center gap-4 pt-6">
//             <Button asChild size="lg" className="rounded-full">
//               <Link href="/sign-up">Get Started</Link>
//             </Button>
//             <Button asChild variant="outline" size="lg" className="rounded-full">
//               <Link href="#features">Learn More</Link>
//             </Button>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useUser } from "@clerk/nextjs";

export function Hero() {
  const { isLoaded, isSignedIn, user } = useUser();

  // Show loading state while checking auth
  if (!isLoaded) {
    return (
      <section className="relative min-h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden rounded-md bg-background">
        <div className="container px-4 md:px-8 text-center">
          <div className="animate-pulse space-y-6 max-w-3xl mx-auto">
            <div className="h-8 w-32 bg-muted rounded-full mx-auto"></div>
            <div className="h-16 bg-muted rounded-md mx-auto"></div>
            <div className="h-6 bg-muted rounded-md mx-auto w-3/4"></div>
            <div className="flex justify-center gap-4 pt-6">
              <div className="h-12 w-32 bg-muted rounded-full"></div>
              <div className="h-12 w-32 bg-muted rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute right-0 top-10 h-[360px] w-[360px] rounded-full bg-sky-400/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-emerald-300/10 blur-[160px]" />
      </div>
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-3xl mx-auto"
        >
          {isSignedIn ? (
            // Content for logged-in users
            <>
              {/* Welcome badge */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="inline-flex items-center justify-center rounded-full border border-border/60 bg-background/70 px-4 py-1.5 text-sm font-medium text-muted-foreground"
              >
                <span>Welcome Back{user?.firstName ? `, ${user.firstName}` : ''}!</span>
                <ArrowRightIcon className="ml-1 size-3" />
              </motion.div>

              {/* Main heading for logged-in users */}
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
                Ready to ship your next campaign in minutes?
              </h1>
              
              {/* Subheading for logged-in users */}
              <p className="text-xl text-muted-foreground">
                Your AI assistant is warmed up. Generate, iterate, and publish faster.
              </p>

              {/* CTA buttons for logged-in users */}
              <div className="flex justify-center gap-4 pt-6">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/dashbord">Go to Dashboard</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/">Open Generator</Link>
                </Button>
              </div>
            </>
          ) : (
            // Content for non-logged-in users (original content)
            <>
              {/* Beta badge */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="inline-flex items-center justify-center rounded-full border border-border/60 bg-background/70 px-4 py-1.5 text-sm font-medium text-muted-foreground"
              >
                <span>Production-ready content engine</span>
                <ArrowRightIcon className="ml-1 size-3" />
              </motion.div>

              {/* Main heading */}
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
                Content creation that feels like having a full social team.
              </h1>
              
              {/* Subheading */}
              <p className="text-xl text-muted-foreground">
                Generate on-brand posts for X, LinkedIn, and Instagram with structure, clarity, and voice.
              </p>

              {/* CTA buttons */}
              <div className="flex justify-center gap-4 pt-6">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/pricing">See Pricing</Link>
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}


