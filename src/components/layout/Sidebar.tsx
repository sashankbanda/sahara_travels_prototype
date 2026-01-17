import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";
import {
    LayoutDashboard,
    MessageSquare,
    Map,
    CreditCard,
    Users,
    Settings,
    LogOut,
    PanelLeft
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
    className?: string;
    collapsed?: boolean;
    toggleCollapse?: () => void;
}

export const Sidebar = memo(({ className, collapsed = false, toggleCollapse }: SidebarProps) => {
    const pathname = usePathname();
    const { logout } = useAuth();

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
        { name: 'Tours', href: '/admin/tours', icon: Map },
        { name: 'Payments', href: '/admin/payments', icon: CreditCard },
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <aside
            className={`bg-zinc-900 border-r border-white/10 flex flex-col transition-all duration-300 ${collapsed ? 'w-[80px]' : 'w-72'
                } ${className}`}
        >
            <div className={`h-24 flex items-center border-b border-white/5 ${collapsed ? 'justify-center p-0' : 'px-4 gap-2 md:px-6 md:gap-3'}`}>
                <img
                    src="/images/home/header_logo.png"
                    alt="Sahara Logo"
                    className="h-6 w-auto object-contain md:h-8"
                />
                {!collapsed && (
                    <span className="font-serif text-xs md:text-base text-white tracking-widest uppercase flex items-center gap-1 md:gap-1.5 whitespace-nowrap overflow-hidden">
                        <span className="font-bold">Sahara</span> <span className="font-light opacity-90">Journeys</span><span className="text-primary">.</span>
                    </span>
                )}
            </div>

            {/* Toggle Button (Desktop Only) */}
            {toggleCollapse && (
                <div className={`hidden md:flex items-center ${collapsed ? 'justify-center py-4' : 'px-8 py-4 justify-end'}`}>
                    <button
                        onClick={toggleCollapse}
                        className="text-white/40 hover:text-white transition-colors"
                    >
                        <PanelLeft className="w-5 h-5" />
                    </button>
                </div>
            )}

            <nav className={`flex-1 space-y-2 ${collapsed ? 'p-4' : 'p-6'}`}>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            title={collapsed ? item.name : undefined}
                            className={`flex items-center rounded-lg transition-all duration-200 group ${collapsed
                                ? 'justify-center w-12 h-12 mx-auto'
                                : 'px-4 py-3 gap-3'
                                } ${isActive
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary' : 'group-hover:text-white'}`} />
                            {!collapsed && <span className="text-base font-medium whitespace-nowrap overflow-hidden">{item.name}</span>}
                        </Link>
                    );
                })}
            </nav>

            <div className={`border-t border-white/5 ${collapsed ? 'p-4 space-y-4' : 'p-6 space-y-4'}`}>
                <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-4 px-4 py-3 bg-white/5 rounded-xl border border-white/5'}`}>
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-primary font-bold text-sm border border-white/10 shrink-0">
                        AD
                    </div>
                    {!collapsed && (
                        <div className="text-sm overflow-hidden">
                            <div className="font-medium text-white text-base truncate">Admin User</div>
                            <div className="text-xs text-white/40 truncate">admin@sahara.com</div>
                        </div>
                    )}
                </div>
                <button
                    onClick={logout}
                    className={`flex items-center text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors ${collapsed
                        ? 'justify-center w-12 h-12 mx-auto rounded-lg'
                        : 'w-full gap-3 px-4 py-3 rounded-lg'
                        }`}
                    title={collapsed ? "Logout" : undefined}
                >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && <span className="text-base whitespace-nowrap overflow-hidden">Logout</span>}
                </button>
            </div>
        </aside>
    );
});

Sidebar.displayName = "Sidebar";
