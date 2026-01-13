import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Package } from "@/lib/store";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    destination: z.string().min(2, {
        message: "Destination must be at least 2 characters.",
    }),
    duration: z.string().min(2, {
        message: "Duration is required (e.g. 3 Days / 2 Nights).",
    }),
    price: z.coerce.number().min(1, {
        message: "Price must be a positive number.",
    }),
    description: z.string().optional(),
    image: z.string().url({
        message: "Please enter a valid image URL.",
    }).optional().or(z.literal('')),
    status: z.enum(["active", "draft", "inactive"]),
});

interface PackageFormProps {
    initialData?: Package;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
    isSubmitting?: boolean;
}

export function PackageForm({ initialData, onSubmit, isSubmitting }: PackageFormProps) {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || "",
            destination: initialData?.destination || "",
            duration: initialData?.duration || "",
            price: initialData?.price || 0,
            description: initialData?.description || "",
            image: initialData?.image || "https://images.unsplash.com/photo-1469474968028-56623f02e42e", // Default placeholder
            status: initialData?.status || "draft",
        },
    });

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6">
                <Button variant="ghost" onClick={() => navigate("/packages")} className="gap-2 pl-0 hover:pl-2 transition-all">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Packages
                </Button>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-xl">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Package Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Desert Safari" {...field} className="input-dark" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="destination"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Destination</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Jaisalmer" {...field} className="input-dark" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="duration"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Duration</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. 3 Days / 2 Nights" {...field} className="input-dark" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price (₹)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="0.00" {...field} className="input-dark" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="input-dark">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Detailed description of the tour package..."
                                            className="min-h-[120px] input-dark"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://..." {...field} className="input-dark" />
                                    </FormControl>
                                    <FormDescription>
                                        Provide a direct link to an image.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="pt-4 flex justify-end gap-4">
                            <Button type="button" variant="outline" onClick={() => navigate("/packages")}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting} className="bg-primary text-primary-foreground hover:bg-primary/90">
                                {initialData ? "Update Package" : "Create Package"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
