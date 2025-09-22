
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

export function Header() {
  const { isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">
            <span className="dark:text-indigo-500 ">Sole</span>
            <span className="text-purple-600 dark:text-white">Script</span>
          </span>
        </Link>

        {/* Navigation - Center aligned */}
        <nav className="hidden md:flex items-center justify-center gap-6 absolute left-1/2 transform -translate-x-1/2">
          <Link 
            href="/dashbord" 
            className="text-sm  cursor-pointer font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            Dashbord
          </Link>
          <Link 
            href="/UsersReview" 
            className="text-sm cursor-pointer font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            users Review
          </Link>
          <Link 
            href="/pricing" 
            className="text-sm cursor-pointer font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            pricing
          </Link>
        </nav>

        {/* Auth Section - Right aligned */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Button asChild variant="default" size="sm">
              <Link href="/sign-in">Get Started</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}