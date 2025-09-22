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
import React from "react";

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
    <section className="relative min-h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden rounded-md bg-background">
      <div className="container px-4 md:px-8 text-center relative z-10">
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
                className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
              >
                <span>Welcome Back{user?.firstName ? `, ${user.firstName}` : ''}!</span>
                <ArrowRightIcon className="ml-1 size-3" />
              </motion.div>

              {/* Main heading for logged-in users */}
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                <span className="text-white">
                  Ready to Create Amazing Content?
                </span>
              </h1>
              
              {/* Subheading for logged-in users */}
              <p className="text-xl text-muted-foreground">
                Start generating high-quality, platform-specific content instantly. Your AI assistant is ready!
              </p>

              {/* CTA buttons for logged-in users */}
              <div className="flex justify-center gap-4 pt-6">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/generate">Create Content</Link>
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
                className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
              >
                <span>Beta Version</span>
                <ArrowRightIcon className="ml-1 size-3" />
              </motion.div>

              {/* Main heading */}
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                <span className="text-white">
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
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}


