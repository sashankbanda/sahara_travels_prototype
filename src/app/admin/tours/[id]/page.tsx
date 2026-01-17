"use client";

import { useStore } from "@/lib/store";
import { useRouter, useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, MapPin, IndianRupee, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";

export default function TourDetailsPage({ params }: { params: { id: string } }) {
    // Note: params is a promise in recent Next.js versions, but for client components usually we unwrap it or use useParams().
    // However, since this is a page component, we can use the prop. Let's use useParams() for client-side consistency.
    const router = useRouter();
    const { id } = useParams();
    const { packages, deletePackage } = useStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const pkg = packages.find((p) => p.id === Number(id));

    if (!pkg) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
                <h2 className="text-2xl font-bold text-white">Package not found</h2>
                <Button onClick={() => router.push("/admin/tours")}>Back to Tours</Button>
            </div>
        );
    }

    const handleDelete = () => {
        deletePackage(Number(id));
        toast.success("Package deleted successfully");
        router.push("/admin/tours");
    };

    const statusColors = {
        active: "bg-success/10 text-success border-success/20",
        inactive: "bg-muted text-muted-foreground border-border",
        draft: "bg-warning/10 text-warning border-warning/20",
    };

    return (
        <div className="p-6 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-5xl mx-auto"
            >
                <div className="flex items-center justify-between mb-8">
                    <Button variant="ghost" onClick={() => router.push("/admin/tours")} className="gap-2 pl-0 hover:pl-2 transition-all">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Tours
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => router.push(`/admin/tours/${id}/edit`)} className="gap-2">
                            <Edit className="w-4 h-4" />
                            Edit
                        </Button>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="gap-2">
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the tour package.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="glass-card rounded-xl overflow-hidden aspect-video relative border border-white/10">
                            <img
                                src={pkg.image}
                                alt={pkg.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4">
                                <Badge className={statusColors[pkg.status as keyof typeof statusColors]}>
                                    {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground mb-4">{pkg.title}</h1>
                            <div className="flex flex-wrap gap-4 text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    {pkg.destination}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-primary" />
                                    {pkg.duration}
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-xl space-y-4 border border-white/10 bg-black/40">
                            <div className="flex justify-between items-center text-lg">
                                <span className="text-muted-foreground">Price per person</span>
                                <span className="font-bold text-2xl text-primary flex items-center gap-1">
                                    <IndianRupee className="w-5 h-5" />
                                    {pkg.price.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t border-border">
                                <span className="text-muted-foreground">Total Bookings</span>
                                <span className="font-mono text-lg">{pkg.bookings}</span>
                            </div>
                        </div>

                        {pkg.description && (
                            <div className="prose prose-invert max-w-none text-white/80">
                                <h3 className="text-xl font-semibold mb-2 text-white">About this Tour</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {pkg.description}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
