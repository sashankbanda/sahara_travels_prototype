"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import { Sidebar } from "@/components/layout/Sidebar";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isAuthenticated && pathname !== "/admin/login") {
            router.push("/admin/login");
        }
    }, [isAuthenticated, pathname, router]);

    // If on login page, just render children without sidebar structure
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    // If not authenticated (and not on login), show nothing while redirecting
    if (!isAuthenticated) {
        return null;
    }

    // Authenticated Layout (Sidebar + Content)
    return (
        <div className="flex h-screen bg-black text-white selection:bg-primary/30 font-sans overflow-hidden">
            {/* Desktop Sidebar */}
            <Sidebar className="hidden md:flex" />

            {/* Mobile Sidebar & Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center p-4 border-b border-white/10 bg-zinc-900">
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="p-2 -ml-2 text-white/70 hover:text-white">
                                <Menu className="w-6 h-6" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 border-r border-white/10 bg-zinc-900 w-64 text-white">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            <SheetDescription className="sr-only">
                                Mobile navigation menu for the admin dashboard.
                            </SheetDescription>
                            <Sidebar className="w-full h-full border-none" />
                        </SheetContent>
                    </Sheet>
                    <span className="ml-4 font-serif text-lg font-bold">Sahara Journeys</span>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-auto bg-black relative">
                    {children}
                </main>
            </div>
        </div>
    );
}
