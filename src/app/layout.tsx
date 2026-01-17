import type { Metadata } from "next";
import { Providers } from "./providers";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { WhatsAppButton } from "@/components/home/WhatsAppButton";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import ScrollToTop from "@/components/shared/ScrollToTop"; // Assuming this is client component
import "./globals.css";

export const metadata: Metadata = {
    title: "Sahara Journeys - Luxury Travel Experience",
    description: "Experience the world's most exclusive destinations with Sahara Journeys.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased min-h-screen bg-black text-white">
                <Providers>
                    <div className="relative min-h-screen w-full">
                        <BackgroundBeams className="fixed inset-0 z-0 pointer-events-none" />
                        <div className="relative z-10">
                            {children}
                        </div>
                        {/* These interactive elements should handle their own 'use client' directives or be safe */}
                        <ScrollToTop />
                        <WhatsAppButton />
                        <Toaster />
                        <Sonner />
                    </div>
                </Providers>
            </body>
        </html>
    );
}
