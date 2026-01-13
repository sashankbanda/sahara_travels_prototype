import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { Search, Filter, MessageSquare, Phone, Mail, Clock } from "lucide-react";
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

const enquiries = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    package: "Desert Safari Adventure",
    status: "new",
    date: "2024-01-15",
    notes: "Interested in group booking for 8 people",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 87654 32109",
    package: "Oasis Retreat Tour",
    status: "contacted",
    date: "2024-01-14",
    notes: "Follow up scheduled for tomorrow",
  },
  {
    id: 3,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 555 123 4567",
    package: "Night Sky Experience",
    status: "converted",
    date: "2024-01-13",
    notes: "Booked for 2 adults, Feb 20-22",
  },
  {
    id: 4,
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "+34 612 345 678",
    package: "Cultural Heritage Tour",
    status: "rejected",
    date: "2024-01-12",
    notes: "Budget constraints",
  },
  {
    id: 5,
    name: "Ahmed Hassan",
    email: "ahmed.hassan@email.com",
    phone: "+971 50 123 4567",
    package: "Desert Safari Adventure",
    status: "new",
    date: "2024-01-15",
    notes: "Corporate retreat for 20 people",
  },
  {
    id: 6,
    name: "Lisa Chen",
    email: "lisa.chen@email.com",
    phone: "+86 138 1234 5678",
    package: "Camel Trek Expedition",
    status: "contacted",
    date: "2024-01-11",
    notes: "Requested custom itinerary",
  },
];

const statusConfig = {
  new: { label: "New", color: "bg-primary/10 text-primary border-primary/20" },
  contacted: { label: "Contacted", color: "bg-accent/10 text-accent border-accent/20" },
  converted: { label: "Converted", color: "bg-success/10 text-success border-success/20" },
  rejected: { label: "Rejected", color: "bg-destructive/10 text-destructive border-destructive/20" },
};

export default function Enquiries() {
  return (
    <DashboardLayout>
      {/* Header */}
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Enquiries</h1>
          <p className="text-muted-foreground hidden sm:block">
            Manage customer inquiries and follow-ups
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="gap-2 py-2 px-4 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            3 New
          </Badge>
        </div>
      </motion.div>

      {/* Stats - Swipeable on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex overflow-x-auto pb-6 -mx-6 px-6 gap-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 md:grid-cols-4 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 sm:gap-4 mb-6 scrollbar-none"
      >
        {[
          { label: "Total", value: 156, color: "text-foreground" },
          { label: "New", value: 28, color: "text-primary" },
          { label: "Converted", value: 89, color: "text-success" },
          { label: "Pending", value: 39, color: "text-accent" },
        ].map((stat, index) => (
          <div key={stat.label} className="premium-card rounded-xl p-4 text-center min-w-[140px] snap-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="premium-card rounded-xl p-4 mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-10 input-dark"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="gap-2 flex-1 sm:flex-initial">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {enquiries.map((enquiry) => {
          const config = statusConfig[enquiry.status as keyof typeof statusConfig];
          return (
            <div key={enquiry.id} className="premium-card p-4 rounded-xl space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {enquiry.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{enquiry.name}</p>
                    <p className="text-xs text-muted-foreground">{enquiry.package}</p>
                  </div>
                </div>
                <Badge className={config.color}>{config.label}</Badge>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {enquiry.date}
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
                <Button variant="ghost" size="sm" className="h-8 w-8">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8">
                  <Mail className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 text-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/10">
                  <WhatsAppIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Desktop Table View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="premium-card rounded-xl overflow-hidden hidden md:block"
      >
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Customer</TableHead>
              <TableHead className="text-muted-foreground">Package</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground hidden md:table-cell">Date</TableHead>
              <TableHead className="text-muted-foreground hidden lg:table-cell">Notes</TableHead>
              <TableHead className="text-muted-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enquiries.map((enquiry, index) => {
              const config = statusConfig[enquiry.status as keyof typeof statusConfig];
              return (
                <motion.tr
                  key={enquiry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className="table-row"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {enquiry.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{enquiry.name}</p>
                        <p className="text-sm text-muted-foreground">{enquiry.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">{enquiry.package}</TableCell>
                  <TableCell>
                    <Badge className={config.color}>{config.label}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {enquiry.date}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden lg:table-cell max-w-[200px] truncate">
                    {enquiry.notes}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/10">
                        <WhatsAppIcon className="w-4 h-4" />
                      </Button>
                    </div>
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

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.231-.298.347-.497.116-.198.058-.371-.029-.544-.087-.174-.787-1.898-1.078-2.601-.284-.685-.576-.591-.792-.602-.206-.011-.442-.013-.678-.013-.236 0-.619.088-.943.441-.324.353-1.238 1.211-1.238 2.953 0 1.742 1.268 3.425 1.444 3.665.176.24 2.497 3.813 6.05 5.346 2.502 1.08 3.012.863 3.567.81.936-.089 1.758-.716 2.006-1.407.248-.691.248-1.284.174-1.407-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
