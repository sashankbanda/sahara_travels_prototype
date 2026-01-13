import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { motion } from "framer-motion";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="ml-20 lg:ml-[280px] transition-all duration-300"
      >
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </motion.main>
    </div>
  );
}
