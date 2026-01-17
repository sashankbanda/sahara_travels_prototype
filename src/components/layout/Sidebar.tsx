"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

export const Sidebar = memo(() => {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/admin' },
        { name: 'Enquiries', href: '/admin/enquiries' },
        { name: 'Tours', href: '/admin/tours' },
        { name: 'Payments', href: '/admin/payments' },
        { name: 'Users', href: '/admin/users' },
        { name: 'Settings', href: '/admin/settings' },
    ];

    return (
        <aside className="w-64 bg-zinc-900 border-r border-white/10 hidden md:flex flex-col">
            <div className="p-6 h-16 flex items-center border-b border-white/5">
                <span className="font-serif text-xl font-bold text-white">Sahara<span className="text-primary">.</span></span>
            </div>
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
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
    );
});

Sidebar.displayName = "Sidebar";
