import './globals.css'
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import type { Metadata } from "next";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rent n' Snap - Camera Rental Management",
  description: "Streamline your camera rental business with our powerful platform",
};

// This is the root layout that will be server-side rendered
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://js.paymongo.com/v1"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
