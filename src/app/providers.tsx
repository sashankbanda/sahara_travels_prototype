"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem={false}
                disableTransitionOnChange
            >
                <AuthProvider>
                    <TooltipProvider>{children}</TooltipProvider>
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
