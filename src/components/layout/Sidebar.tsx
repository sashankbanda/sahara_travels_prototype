import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  CreditCard,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X
} from "lucide-react";
import logo from "@/assets/logo.jpeg";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Package, label: "Packages", href: "/packages" },
  { icon: MessageSquare, label: "Enquiries", href: "/enquiries" },
  { icon: CreditCard, label: "Payments", href: "/payments" },
  { icon: Users, label: "Users", href: "/users" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isMobile: boolean;
}

export function Sidebar({ isMobileOpen, onMobileClose, collapsed, setCollapsed, isMobile }: SidebarProps) {
  const location = useLocation();

  const sidebarWidth = isMobile ? 280 : (collapsed ? 80 : 280);

  return (
    <motion.aside
      initial={false}
      animate={{
        width: sidebarWidth,
        x: isMobile ? (isMobileOpen ? 0 : -280) : 0
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col z-50 shadow-2xl md:shadow-none`}
    >
      {/* Logo */}
      <div className={`p-4 flex items-center ${collapsed && !isMobile ? 'justify-center' : 'justify-between'} border-b border-sidebar-border`}>
        <Link to="/dashboard" className="flex items-center gap-3" onClick={isMobile ? onMobileClose : undefined}>
          <img
            src={logo}
            alt="Sahara Journeys"
            className="w-10 h-10 rounded-lg object-cover"
          />
          <AnimatePresence>
            {(!collapsed || isMobile) && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <h1 className="font-semibold text-foreground whitespace-nowrap">
                  Sahara
                </h1>
                <p className="text-xs text-muted-foreground whitespace-nowrap">
                  Tours & Travels
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onMobileClose}>
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={isMobile ? onMobileClose : undefined}
              className={`nav-link ${isActive ? "active" : ""} ${collapsed && !isMobile ? 'justify-center px-2' : ''}`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {(!collapsed || isMobile) && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <button className={`nav-link w-full text-left text-destructive hover:text-destructive hover:bg-destructive/10 ${collapsed && !isMobile ? 'justify-center px-2' : ''}`}>
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence>
            {(!collapsed || isMobile) && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap overflow-hidden"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="nav-link w-full justify-center"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </motion.aside>
  );
}
