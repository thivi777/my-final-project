import type { Metadata } from "next";
import "./globals.scss";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
    title: "Sentira Wellness",
    description: "Your path to emotional wellness",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
<<<<<<< HEAD
        <html lang="en">
            <body>
=======
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
                <Providers>
                    <TooltipProvider>
                        {children}
                        <Toaster />
                        <Sonner />
                    </TooltipProvider>
                </Providers>
            </body>
        </html>
    );
}
