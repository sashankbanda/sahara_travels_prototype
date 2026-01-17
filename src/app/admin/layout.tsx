"use client";

import { useEffect, useState } from "react";
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
    const [isCollapsed, setIsCollapsed] = useState(false);
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
            {/* Desktop Sidebar (Collapsible) */}
            <Sidebar
                className="hidden md:flex flex-shrink-0"
                collapsed={isCollapsed}
                toggleCollapse={() => setIsCollapsed(!isCollapsed)}
            />

            {/* Mobile Sidebar & Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Header (Unified for Mobile & Desktop) */}
                <header className="relative flex items-center justify-between p-4 border-b border-white/10 bg-zinc-900 shrink-0 md:hidden h-16">
                    {/* Mobile Trigger */}
                    <div className="md:hidden z-20">
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
                                <Sidebar className="w-full h-full border-none" showBrand={false} />
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Centered Brand */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
                        <img
                            src="/images/home/header_logo.png"
                            alt="Sahara Logo"
                            className="h-5 w-auto object-contain"
                        />
                        <span className="font-serif text-sm text-white tracking-widest uppercase flex items-center gap-1">
                            <span className="font-bold">Sahara</span>
                            <span className="font-light opacity-90">Journeys</span>
                            <span className="text-primary">.</span>
                        </span>
                    </div>

                    {/* Right Placeholder (for profile or balance) */}
                    <div className="w-6 z-20"></div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-auto bg-black relative">
                    {children}
                </main>
            </div>
        </div>
    );
}
