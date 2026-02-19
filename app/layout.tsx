import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { RouteProvider } from "@/providers/route-provider";
import { StoreProvider } from "@/stores/store-context";
import { ThemeProvider } from "@/providers/theme-provider";
import { ThemeSync } from "@/providers/theme-sync";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Console",
  description: "Console dashboard",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] antialiased">
        <NextTopLoader />
        <RouteProvider>
          <StoreProvider>
            <ThemeProvider>
              <ThemeSync />
              {children}
            </ThemeProvider>
          </StoreProvider>
        </RouteProvider>
      </body>
    </html>
  );
}
