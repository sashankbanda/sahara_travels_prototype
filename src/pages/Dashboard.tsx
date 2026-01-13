import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentEnquiries } from "@/components/dashboard/RecentEnquiries";
import { motion } from "framer-motion";
import {
  Package,
  MessageSquare,
  CreditCard,
  TrendingUp,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      {/* Header */}
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-row items-center justify-between gap-4 mb-6 sm:mb-8"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground hidden sm:block">
            Welcome back! Here's what's happening with your tours.
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <Button
            variant="outline"
            className="hidden sm:flex gap-2 hover:bg-white/5 hover:text-primary transition-colors"
            onClick={() => navigate('/enquiries')}
          >
            <MessageSquare className="w-4 h-4" />
            View Enquiries
          </Button>
          <Button
            size="icon"
            className="sm:w-auto sm:px-4 sm:py-2 gap-2 bg-gradient-gold text-primary-foreground hover:opacity-90 shadow-lg hover:shadow-primary/20 transition-all duration-300"
            onClick={() => navigate('/packages/new')}
          >
            <Plus className="w-5 h-5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">New Package</span>
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid - Swipeable on mobile */}
      <div className="flex overflow-x-auto pb-6 -mx-6 px-6 gap-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 sm:gap-6 mb-8 scrollbar-none">
        <StatCard
          title="Total Bookings"
          value="124"
          change="+12%"
          changeType="positive"
          icon={Package}
          delay={0}
        />
        <StatCard
          title="New Enquiries"
          value="28"
          change="+5"
          changeType="positive"
          icon={MessageSquare}
          delay={0.1}
        />
        <StatCard
          title="Revenue (This Month)"
          value="₹7.2L"
          change="+18%"
          changeType="positive"
          icon={CreditCard}
          delay={0.2}
        />
        <StatCard
          title="Conversion Rate"
          value="32%"
          change="-2%"
          changeType="negative"
          icon={TrendingUp}
          delay={0.3}
        />
      </div>

      {/* Charts and Enquiries */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>
        <div className="xl:col-span-1">
          <RecentEnquiries />
        </div>
      </div>
    </DashboardLayout>
  );
}
