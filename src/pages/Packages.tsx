import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Clock,
  IndianRupee,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/lib/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const statusColors = {
  active: "bg-success/10 text-success border-success/20",
  inactive: "bg-muted text-muted-foreground border-border",
  draft: "bg-warning/10 text-warning border-warning/20",
};

export default function Packages() {
  const { packages, deletePackage } = useStore();
  const navigate = useNavigate();

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this package?")) {
      deletePackage(id);
      toast.success("Package deleted successfully");
    }
  };

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
          <h1 className="text-2xl sm:text-3xl font-bold text-gradient-gold mb-1 sm:mb-2">Tour Packages</h1>
          <p className="text-muted-foreground hidden sm:block">
            Manage your tour packages and offerings
          </p>
        </div>
        <Button
          className="gap-2 bg-gradient-gold text-primary-foreground hover:opacity-90 shadow-lg hover:shadow-primary/20 transition-all duration-300"
          onClick={() => navigate("/packages/new")}
        >
          <Plus className="w-5 h-5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Add Package</span>
        </Button>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="premium-card p-4 mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search packages..."
              className="pl-10 input-dark"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="hover:bg-white/5 hover:text-primary transition-colors">
              All Status
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-white/5 hover:text-primary transition-colors">
              All Destinations
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg: any, index: number) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className="premium-card group cursor-pointer"
            onClick={() => navigate(`/packages/${pkg.id}`)}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              <Badge
                className={`absolute top-4 left-4 badge-premium ${statusColors[pkg.status as keyof typeof statusColors]
                  }`}
              >
                {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-black/40 backdrop-blur-md hover:bg-black/60 text-white border border-white/10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 bg-card/90 backdrop-blur-xl border-white/10">
                  <DropdownMenuItem className="gap-2 focus:bg-primary/10 focus:text-primary" onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/packages/${pkg.id}`);
                  }}>
                    <Eye className="w-4 h-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 focus:bg-primary/10 focus:text-primary" onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/packages/${pkg.id}/edit`);
                  }}>
                    <Edit className="w-4 h-4" />
                    Edit Package
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-destructive focus:bg-destructive/10" onClick={(e) => handleDelete(pkg.id, e)}>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {pkg.title}
              </h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  {pkg.destination}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  {pkg.duration}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-1 text-lg font-bold text-gradient-gold">
                  <IndianRupee className="w-4 h-4 text-primary" />
                  {pkg.price.toLocaleString()}
                </div>
                <span className="text-sm text-muted-foreground">
                  {pkg.bookings} bookings
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
}
