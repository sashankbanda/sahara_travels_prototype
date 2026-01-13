import { motion } from "framer-motion";
import { MessageSquare, Clock, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const enquiries = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    package: "Desert Safari Adventure",
    status: "new",
    date: "2 hours ago",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@example.com",
    package: "Oasis Retreat Tour",
    status: "contacted",
    date: "5 hours ago",
  },
  {
    id: 3,
    name: "John Smith",
    email: "john@example.com",
    package: "Night Sky Experience",
    status: "converted",
    date: "1 day ago",
  },
  {
    id: 4,
    name: "Maria Garcia",
    email: "maria@example.com",
    package: "Cultural Heritage Tour",
    status: "rejected",
    date: "2 days ago",
  },
];

const statusConfig = {
  new: { label: "New", variant: "default" as const, icon: MessageSquare },
  contacted: { label: "Contacted", variant: "secondary" as const, icon: Clock },
  converted: { label: "Converted", variant: "outline" as const, icon: CheckCircle },
  rejected: { label: "Rejected", variant: "destructive" as const, icon: XCircle },
};

export function RecentEnquiries() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Enquiries</h3>
          <p className="text-sm text-muted-foreground">Latest customer inquiries</p>
        </div>
        <a
          href="/enquiries"
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          View all →
        </a>
      </div>
      <div className="space-y-4">
        {enquiries.map((enquiry, index) => {
          const config = statusConfig[enquiry.status as keyof typeof statusConfig];
          return (
            <motion.div
              key={enquiry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {enquiry.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{enquiry.name}</p>
                  <p className="text-sm text-muted-foreground">{enquiry.package}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground hidden sm:block">
                  {enquiry.date}
                </span>
                <Badge
                  variant={config.variant}
                  className={
                    enquiry.status === "converted"
                      ? "bg-success/10 text-success border-success/20"
                      : enquiry.status === "new"
                      ? "bg-primary/10 text-primary border-primary/20"
                      : ""
                  }
                >
                  {config.label}
                </Badge>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
