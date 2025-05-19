import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal Growth System",
  description: "Track and improve your life balance across key pillars",
};

// In a real app, this would be stored in your database
const ONBOARDING_COMPLETED_KEY = 'onboarding_completed';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // In a real app, this would be a server-side check
  const isOnboardingCompleted = typeof window !== 'undefined' 
    ? localStorage.getItem(ONBOARDING_COMPLETED_KEY) === 'true'
    : false;

  // Only show navigation if onboarding is completed
  const showNavigation = children && !children.toString().includes('onboarding');

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {showNavigation && <Navigation />}
          <main className="container mx-auto py-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
