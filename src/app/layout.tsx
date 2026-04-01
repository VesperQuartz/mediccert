import "../lib/orpc.server";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AsyncProvider } from "@/providers/async";
import { LoadingProvider } from "@/providers/loader";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning={true}
      >
        <AsyncProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <LoadingProvider>
                <NuqsAdapter
                  defaultOptions={{
                    clearOnDefault: true,
                    limitUrlUpdates: {
                      method: "debounce",
                      timeMs: 50,
                    },
                    shallow: true,
                  }}
                >
                  {children}
                </NuqsAdapter>
              </LoadingProvider>
            </TooltipProvider>
          </ThemeProvider>
        </AsyncProvider>
        <Toaster />
      </body>
    </html>
  );
}
