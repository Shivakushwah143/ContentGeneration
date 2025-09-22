
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
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { FeaturesSection } from "@/components/sections/Features";
import PricingPage from "./pricing/page";
import MarqueeComponent from "@/components/sections/MarqueeComponent";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className=" flex flex-col">
          <ThemeProvider>
            <Header />
            <main className="">
              {/* Homepage sections */}
              <Hero />
              <MarqueeComponent/>
              <FeaturesSection />
              <PricingPage />
              
              {/* Content generation page will be injected here */}
              <div className=" py-8">
                {children}
              </div>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}