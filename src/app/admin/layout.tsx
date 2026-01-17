"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

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
            {/* Placeholder for Sidebar - will integrate explicitly later */}
            <aside className="w-64 bg-zinc-900 border-r border-white/10 hidden md:flex flex-col">
                <div className="p-6 h-16 flex items-center border-b border-white/5">
                    <span className="font-serif text-xl font-bold text-white">Sahara<span className="text-primary">.</span></span>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {[
                        { name: 'Dashboard', href: '/admin' },
                        { name: 'Enquiries', href: '/admin/enquiries' },
                        { name: 'Tours', href: '/admin/tours' },
                        { name: 'Payments', href: '/admin/payments' },
                        { name: 'Users', href: '/admin/users' },
                        { name: 'Settings', href: '/admin/settings' },
                    ].map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`px-3 py-2 rounded-md text-sm transition-colors block ${isActive
                                    ? 'bg-primary/10 text-primary font-medium'
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-primary font-bold text-xs border border-white/10">AD</div>
                        <div className="text-sm">
                            <div className="font-medium text-white">Admin User</div>
                            <div className="text-xs text-white/40">admin@sahara.com</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto bg-black">
                {children}
            </main>
        </div>
    );
}
