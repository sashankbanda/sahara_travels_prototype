"use client";

import { PackageForm } from "@/components/packages/PackageForm";
import { useStore } from "@/lib/store";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function EditTourPage() {
    const { id } = useParams();
    const router = useRouter();
    const { packages, updatePackage } = useStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const packageData = mounted ? packages.find((p) => p.id === Number(id)) : undefined;

    useEffect(() => {
        if (mounted && !packageData && id) {
            toast.error("Package not found");
            router.push("/admin/tours");
        }
    }, [packageData, id, router, mounted]);

    const handleSubmit = (values: any) => {
        try {
            updatePackage(Number(id), values);
            toast.success("Package updated successfully");
            router.push("/admin/tours");
        } catch (error) {
            toast.error("Failed to update package");
            console.error(error);
        }
    };

    if (!packageData) return null;

    return (
        <div className="p-6 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="text-3xl font-bold text-foreground mb-8">Edit Package</h1>
                <PackageForm initialData={packageData} onSubmit={handleSubmit} />
            </motion.div>
        </div>
    );
}
