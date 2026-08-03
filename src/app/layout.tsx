import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/navbar";
import { SessionProvider } from "next-auth/react";
import ReduxProvider from "@/redux/reduxProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Souq",
    template: "%s | Souq",
  },
  description: "The best place to find everything you need",
  keywords: [
    "Souq",
    "Shop",
    "Online Store",
    "E-commerce",
    "Best place to find everything",
  ],

  authors: [
    { name: "Abdallah Elzorkany", url: "https://github.com/AbdallhElzorkany" },
    { name: "Route Misr", url: "https://routeeg.com/" },
  ],
  category: "E-Commerce",
  creator: "Abdallah Elzorkany",
  publisher: "Abdallah Elzorkany",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        inter.variable,
        "dark",
      )}
    >
      <body className="min-h-screen">
        <SessionProvider>
          <ReduxProvider>
            <Navbar />
            {children}
            <Toaster />
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
