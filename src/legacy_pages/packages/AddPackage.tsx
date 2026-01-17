import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PackageForm } from "@/components/packages/PackageForm";
import { useStore } from "@/lib/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function AddPackage() {
    const addPackage = useStore((state) => state.addPackage);
    const navigate = useNavigate();

    const handleSubmit = (values: any) => {
        try {
            addPackage(values);
            toast.success("Package created successfully");
            navigate("/packages");
        } catch (error) {
            toast.error("Failed to create package");
            console.error(error);
        }
    };

    return (
        <DashboardLayout>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="text-3xl font-bold text-foreground mb-8">Create New Package</h1>
                <PackageForm onSubmit={handleSubmit} />
            </motion.div>
        </DashboardLayout>
    );
}
