"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import { Sidebar } from "@/components/layout/Sidebar";

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
        <div className="flex h-screen bg-black text-white selection:bg-primary/30 font-sans">
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto bg-black">
                {children}
            </main>
        </div>
    );
}
