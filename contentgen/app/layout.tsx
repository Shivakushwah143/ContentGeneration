
// import "./globals.css"
// import { ClerkProvider } from '@clerk/nextjs'
// import { ThemeProvider } from "@/components/ui/theme-provider"
// import { Header } from "@/components/sections/Header"
// import { Hero } from "@/components/sections/Hero"
// import { FeaturesSection } from "@/components/sections/Features"


// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <ClerkProvider>
//       <html lang="en" suppressHydrationWarning>
//         <body>
//           <ThemeProvider>
//             <Header />
//           {/* <Hero/> */}
//           <FeaturesSection/>
//             <main className="container py-6">{children}</main>
//           </ThemeProvider>
//         </body>
//       </html>
//     </ClerkProvider>
//   )
// }

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { DM_Sans, Space_Grotesk } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${dmSans.variable} ${spaceGrotesk.variable} min-h-screen`}>
          <ThemeProvider>
            <Header />
            <main className="min-h-[70vh]">{children}</main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
