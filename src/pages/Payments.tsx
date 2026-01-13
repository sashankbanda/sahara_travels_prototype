import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { Search, Filter, Plus, IndianRupee, CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const payments = [
  {
    id: "PAY-001",
    customer: "Rajesh Kumar",
    package: "Desert Safari Adventure",
    amount: 45000,
    method: "UPI",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "PAY-002",
    customer: "John Smith",
    package: "Night Sky Experience",
    amount: 36000,
    method: "Credit Card",
    status: "completed",
    date: "2024-01-14",
  },
  {
    id: "PAY-003",
    customer: "Ahmed Hassan",
    package: "Desert Safari Adventure",
    amount: 180000,
    method: "Bank Transfer",
    status: "pending",
    date: "2024-01-15",
  },
  {
    id: "PAY-004",
    customer: "Lisa Chen",
    package: "Camel Trek Expedition",
    amount: 56000,
    method: "Credit Card",
    status: "failed",
    date: "2024-01-13",
  },
  {
    id: "PAY-005",
    customer: "Priya Sharma",
    package: "Oasis Retreat Tour",
    amount: 124000,
    method: "UPI",
    status: "completed",
    date: "2024-01-12",
  },
  {
    id: "PAY-006",
    customer: "Maria Garcia",
    package: "Cultural Heritage Tour",
    amount: 85000,
    method: "PayPal",
    status: "pending",
    date: "2024-01-11",
  },
];

const statusConfig = {
  completed: { label: "Completed", color: "bg-success/10 text-success border-success/20", icon: CheckCircle },
  pending: { label: "Pending", color: "bg-warning/10 text-warning border-warning/20", icon: Clock },
  failed: { label: "Failed", color: "bg-destructive/10 text-destructive border-destructive/20", icon: XCircle },
};

export default function Payments() {
  const totalRevenue = payments
    .filter((p) => p.status === "completed")
    .reduce((acc, p) => acc + p.amount, 0);
  const pendingAmount = payments
    .filter((p) => p.status === "pending")
    .reduce((acc, p) => acc + p.amount, 0);

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
          <h1 className="text-3xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground">
            Track and manage all payment transactions
          </p>
        </div>
        <Button className="gap-2 bg-gradient-gold text-primary-foreground hover:opacity-90">
          <Plus className="w-4 h-4" />
          Record Payment
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
      >
        <div className="glass-card rounded-xl p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Revenue</p>
          <p className="text-3xl font-bold text-success flex items-center gap-1">
            <IndianRupee className="w-6 h-6" />
            {totalRevenue.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground mt-2">This month</p>
        </div>
        <div className="glass-card rounded-xl p-6">
          <p className="text-sm text-muted-foreground mb-2">Pending Payments</p>
          <p className="text-3xl font-bold text-warning flex items-center gap-1">
            <IndianRupee className="w-6 h-6" />
            {pendingAmount.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground mt-2">2 transactions</p>
        </div>
        <div className="glass-card rounded-xl p-6">
          <p className="text-sm text-muted-foreground mb-2">Success Rate</p>
          <p className="text-3xl font-bold text-foreground">83%</p>
          <p className="text-sm text-muted-foreground mt-2">5 of 6 completed</p>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="glass-card rounded-xl p-4 mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by ID, customer, or package..."
              className="pl-10 input-dark"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="glass-card rounded-xl overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Payment ID</TableHead>
              <TableHead className="text-muted-foreground">Customer</TableHead>
              <TableHead className="text-muted-foreground hidden md:table-cell">Package</TableHead>
              <TableHead className="text-muted-foreground">Amount</TableHead>
              <TableHead className="text-muted-foreground hidden lg:table-cell">Method</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground hidden md:table-cell">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment, index) => {
              const config = statusConfig[payment.status as keyof typeof statusConfig];
              const StatusIcon = config.icon;
              return (
                <motion.tr
                  key={payment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className="table-row"
                >
                  <TableCell className="font-mono text-sm text-foreground">
                    {payment.id}
                  </TableCell>
                  <TableCell className="text-foreground">{payment.customer}</TableCell>
                  <TableCell className="text-muted-foreground hidden md:table-cell">
                    {payment.package}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 font-semibold text-foreground">
                      <IndianRupee className="w-4 h-4" />
                      {payment.amount.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden lg:table-cell">
                    {payment.method}
                  </TableCell>
                  <TableCell>
                    <Badge className={`gap-1.5 ${config.color}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {config.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden md:table-cell">
                    {payment.date}
                  </TableCell>
                </motion.tr>
              );
            })}
          </TableBody>
        </Table>
      </motion.div>
    </DashboardLayout>
  );
}
