import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 45000, bookings: 12 },
  { month: "Feb", revenue: 52000, bookings: 18 },
  { month: "Mar", revenue: 48000, bookings: 15 },
  { month: "Apr", revenue: 61000, bookings: 22 },
  { month: "May", revenue: 55000, bookings: 19 },
  { month: "Jun", revenue: 67000, bookings: 25 },
  { month: "Jul", revenue: 72000, bookings: 28 },
];

export function RevenueChart() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Revenue Overview</h3>
          <p className="text-sm text-muted-foreground">Monthly revenue and bookings</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-sm text-muted-foreground hidden sm:inline">Bookings</span>
          </div>
        </div>
      </div>
      <div className="h-[300px] -ml-4 sm:ml-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(41 52% 60%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(41 52% 60%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(207 70% 53%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(207 70% 53%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" vertical={!isMobile} horizontal={true} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(0 0% 53%)", fontSize: isMobile ? 10 : 12 }}
              interval={isMobile ? "preserveStartEnd" : 0}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(0 0% 53%)", fontSize: isMobile ? 10 : 12 }}
              tickFormatter={(value) => `₹${value / 1000}k`}
              width={isMobile ? 40 : 60}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0 0% 8%)",
                border: "1px solid hsl(0 0% 16%)",
                borderRadius: "8px",
                boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)",
              }}
              labelStyle={{ color: "hsl(0 0% 96%)" }}
              formatter={(value: number, name: string) => [
                name === "revenue" ? `₹${value.toLocaleString()}` : value,
                name === "revenue" ? "Revenue" : "Bookings",
              ]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(41 52% 60%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
