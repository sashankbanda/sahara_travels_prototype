"use client";

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
    ArrowRight,
} from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const statusColors = {
    active: "bg-success/10 text-success border-success/20",
    inactive: "bg-muted text-muted-foreground border-border",
    draft: "bg-warning/10 text-warning border-warning/20",
};

export default function ToursPage() {
    // Fix hydration issues by loading store data only on client
    const [mounted, setMounted] = useState(false);
    const { packages, deletePackage } = useStore();
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDelete = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this package?")) {
            deletePackage(id);
            toast.success("Package deleted successfully");
        }
    };

    if (!mounted) return null;

    return (
        <div className="p-6 md:p-8 space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-row items-center justify-between gap-4 mb-6 sm:mb-8"
            >
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">Tour Packages</h1>
                    <p className="text-muted-foreground hidden sm:block">
                        Manage your tour packages and offerings
                    </p>
                </div>
                <Button
                    className="gap-2 bg-gradient-gold text-primary-foreground hover:opacity-90 shadow-lg hover:shadow-primary/20 transition-all duration-300"
                    onClick={() => router.push("/admin/tours/new")}
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {packages.map((pkg: any, index: number) => (
                    <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="h-full"
                    >
                        <HoverBorderGradient
                            containerClassName="rounded-xl md:rounded-2xl w-full h-[350px] p-[1px] border-0"
                            className="w-full h-full p-0 bg-transparent rounded-[inherit]"
                            as="div"
                            duration={2}
                        >
                            <div
                                className="relative w-full h-full overflow-hidden rounded-[inherit] group cursor-pointer"
                                onClick={() => router.push(`/admin/tours/${pkg.id}`)}
                            >
                                {/* Hero Image - Full Background */}
                                <div className="absolute inset-0 w-full h-full">
                                    <img
                                        src={pkg.image}
                                        alt={pkg.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                </div>

                                {/* Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 z-0" />

                                {/* Admin Controls - Top Layer */}
                                <div className="absolute top-4 left-4 z-20">
                                    <Badge
                                        className={`badge-premium backdrop-blur-md shadow-lg ${statusColors[pkg.status as keyof typeof statusColors]
                                            }`}
                                    >
                                        {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)}
                                    </Badge>
                                </div>

                                <div className="absolute top-4 right-4 z-20">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="bg-black/40 backdrop-blur-md hover:bg-black/60 text-white border border-white/10 rounded-full w-10 h-10 shadow-lg"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <MoreVertical className="w-5 h-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-40 bg-zinc-900/95 backdrop-blur-xl border-white/10 text-white">
                                            <DropdownMenuItem className="gap-2 focus:bg-primary/10 focus:text-primary" onClick={(e) => {
                                                e.stopPropagation();
                                                router.push(`/admin/tours/${pkg.id}`);
                                            }}>
                                                <Eye className="w-4 h-4" />
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="gap-2 focus:bg-primary/10 focus:text-primary" onClick={(e) => {
                                                e.stopPropagation();
                                                router.push(`/admin/tours/${pkg.id}/edit`);
                                            }}>
                                                <Edit className="w-4 h-4" />
                                                Edit Package
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="gap-2 text-red-400 focus:text-red-400 focus:bg-red-400/10" onClick={(e) => handleDelete(pkg.id, e)}>
                                                <Trash2 className="w-4 h-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                {/* Content - Bottom Layer */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                                    <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <h3 className="font-serif text-2xl lg:text-3xl text-white mb-2 leading-tight drop-shadow-xl line-clamp-2 mix-blend-plus-lighter">
                                            {pkg.title}
                                        </h3>

                                        <div className="flex flex-wrap items-center gap-2 text-white/90 text-xs font-light mb-4">
                                            <span className="flex items-center gap-1 bg-white/10 backdrop-blur-md py-1 px-2.5 rounded-full border border-white/10 shadow-sm">
                                                <MapPin className="w-3 h-3 text-primary" />
                                                <span className="tracking-wide">{pkg.destination}</span>
                                            </span>
                                            <span className="flex items-center gap-1 bg-white/10 backdrop-blur-md py-1 px-2.5 rounded-full border border-white/10 shadow-sm">
                                                <Clock className="w-3 h-3 text-primary" />
                                                <span className="tracking-wide">{pkg.duration}</span>
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between border-t border-white/20 pt-4 mt-2">
                                            <div className="flex flex-col">
                                                <span className="text-white/60 text-[10px] uppercase tracking-widest font-medium mb-0.5">
                                                    Starting From
                                                </span>
                                                <span className="text-xl font-medium text-primary tracking-tight shadow-black drop-shadow-md">
                                                    ₹{pkg.price.toLocaleString()}
                                                </span>
                                            </div>

                                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-300 shadow-lg">
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </HoverBorderGradient>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
