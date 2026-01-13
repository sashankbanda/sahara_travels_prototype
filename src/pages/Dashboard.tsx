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

export default function Dashboard() {
  return (
    <DashboardLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your tours.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 hover:bg-white/5 hover:text-primary transition-colors">
            <MessageSquare className="w-4 h-4" />
            View Enquiries
          </Button>
          <Button className="gap-2 bg-gradient-gold text-primary-foreground hover:opacity-90 shadow-lg hover:shadow-primary/20 transition-all duration-300">
            <Plus className="w-4 h-4" />
            New Package
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
