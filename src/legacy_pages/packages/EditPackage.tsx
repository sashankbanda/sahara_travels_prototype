import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PackageForm } from "@/components/packages/PackageForm";
import { useStore } from "@/lib/store";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function EditPackage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { packages, updatePackage } = useStore();

    const packageData = packages.find((p) => p.id === Number(id));

    useEffect(() => {
        if (!packageData && id) {
            toast.error("Package not found");
            navigate("/packages");
        }
    }, [packageData, id, navigate]);

    const handleSubmit = (values: any) => {
        try {
            updatePackage(Number(id), values);
            toast.success("Package updated successfully");
            navigate("/packages");
        } catch (error) {
            toast.error("Failed to update package");
            console.error(error);
        }
    };

    if (!packageData) return null;

    return (
        <DashboardLayout>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="text-3xl font-bold text-foreground mb-8">Edit Package</h1>
                <PackageForm initialData={packageData} onSubmit={handleSubmit} />
            </motion.div>
        </DashboardLayout>
    );
}
