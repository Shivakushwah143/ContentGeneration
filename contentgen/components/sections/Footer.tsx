import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background/70 backdrop-blur">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <div className="text-xl font-semibold tracking-tight">
              SoleScript
            </div>
            <p className="text-sm text-muted-foreground">
              Production-ready content creation for teams, creators, and brands.
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Product
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/home" className="hover:text-foreground text-muted-foreground">Overview</Link>
              <Link href="/pricing" className="hover:text-foreground text-muted-foreground">Pricing</Link>
              <Link href="/UsersReview" className="hover:text-foreground text-muted-foreground">Reviews</Link>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Resources
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/dashbord" className="hover:text-foreground text-muted-foreground">Dashboard</Link>
              <Link href="/" className="hover:text-foreground text-muted-foreground">Generator</Link>
              <Link href="/signin" className="hover:text-foreground text-muted-foreground">Sign in</Link>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>© 2026 SoleScript. All rights reserved.</div>
          <div className="flex gap-4">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
