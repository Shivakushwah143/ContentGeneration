
// "use client"
// import Link from "next/link"
// import { ThemeToggle } from "@/components/ui/theme-toggle"
// import { Button } from "@/components/ui/button"
// import { UserButton, useAuth } from "@clerk/nextjs"

// export function Header() {
//   const { isSignedIn } = useAuth()

//   return (
//     <header className="sticky top-0 z-50 w-full border-b ">
//       <div className="container flex h-16 items-center justify-between px-4 md:px-8">
//         {/* Logo */}
//         <Link href="/" className="flex items-center space-x-2">
//           <span className="text-2xl font-bold">
//             <span className="text-indigo-600">Sole</span>
//             <span className="text-purple-600">Script</span>
//           </span>
//         </Link>

//         {/* Navigation */}
//         <nav className="hidden md:flex items-center gap-8">
//           <Link href="/dashbord" className="text-sm font-medium hover:text-primary transition-colors">
//             My Collection
//           </Link>
//           <Link href="/home" className="text-sm font-medium hover:text-primary transition-colors">
//             AI Stylist
//           </Link>
//           <Link href="/discover" className="text-sm font-medium hover:text-primary transition-colors">
//             Discover
//           </Link>
//         </nav>

//         {/* Auth Section */}
//         <div className="flex items-center gap-4">
//           <ThemeToggle />
//           {isSignedIn ? (
//             <UserButton afterSignOutUrl="/" />
//           ) : (
//             <Button asChild size="sm">
//               <Link href="/signin">Get Started</Link>
//             </Button>
//           )}
//         </div>
//       </div>
//     </header>
//   )
// }
"use client";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { isSignedIn } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-sky-600" />
          <div className="text-lg font-semibold tracking-tight">SoleScript</div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/home" className="text-sm font-medium text-muted-foreground hover:text-foreground">Overview</Link>
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">Generator</Link>
          <Link href="/dashbord" className="text-sm font-medium text-muted-foreground hover:text-foreground">Dashboard</Link>
          <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">Pricing</Link>
          <Link href="/UsersReview" className="text-sm font-medium text-muted-foreground hover:text-foreground">Reviews</Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Button asChild size="sm" className="hidden md:inline-flex">
              <Link href="/signup">Get Started</Link>
            </Button>
          )}
          <button
            className="inline-flex items-center justify-center rounded-md border border-border/60 p-2 md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border/60 bg-background/95 md:hidden">
          <div className="container mx-auto flex flex-col gap-4 px-4 py-6 text-sm">
            <Link href="/home" className="text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>Overview</Link>
            <Link href="/" className="text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>Generator</Link>
            <Link href="/dashbord" className="text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>Dashboard</Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>Pricing</Link>
            <Link href="/UsersReview" className="text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>Reviews</Link>
            {!isSignedIn ? (
              <Button asChild size="sm" className="w-full">
                <Link href="/signup" onClick={() => setOpen(false)}>Get Started</Link>
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
