import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  delay?: number;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  delay = 0,
  className = "",
}: StatCardProps) {
  const changeColors = {
    positive: "text-success",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`stat-card group min-w-[260px] snap-center ${className}`}
    >
      <div className="flex flex-col-reverse sm:block">
        <div className="flex items-center justify-between sm:mb-4">
          <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors hidden sm:block">
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="text-3xl font-bold text-foreground mb-1 sm:mb-0 block sm:hidden">{value}</h3>

          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors block sm:hidden">
              <Icon className="w-4 h-4" />
            </div>
            {change && (
              <span className={`text-sm font-medium ${changeColors[changeType]}`}>
                {change}
              </span>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-foreground mb-1 hidden sm:block">{value}</h3>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
    </motion.div>
  );
}
