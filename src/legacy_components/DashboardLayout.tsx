import { ReactNode, useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 768; // Mobile is now < 768px
      setIsMobile(mobile);

      // Auto-collapse on tablet (768-1024), expand on desktop (>=1024)
      if (!mobile) {
        if (width < 1024) {
          setCollapsed(true);
        } else {
          setCollapsed(false);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarWidth = collapsed ? "80px" : "280px";

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header - Visible only on mobile (<768px) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5 p-4 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileOpen(true)}
          className="mr-4"
        >
          <Menu className="w-6 h-6" />
        </Button>
        <span className="font-semibold text-lg">Sahara Admin</span>
      </div>

      <Sidebar
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isMobile={isMobile}
      />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="pt-20 md:pt-8 p-6 lg:p-8 ml-0 transition-all duration-300 max-w-[100vw] overflow-x-hidden"
        style={{ marginLeft: isMobile ? 0 : sidebarWidth }}
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </motion.main>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </div>
  );
}
