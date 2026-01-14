import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, MapPin, ShieldCheck, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const tourServices = [
    {
        id: "tours",
        title: "Best Tour Packages",
        description: "Explore the beautiful valleys of Arunachal Pradesh.",
        image: "/images/home/tours.png",
        link: "/tours",
        badge: "Most Popular"
    },
    {
        id: "sightseeing",
        title: "Sightseeing",
        description: "See beautiful monasteries and nature.",
        image: "/images/home/sightseeing.png",
        link: "/sightseeing",
        badge: "Must Visit"
    }
];

const taxiServices = [
    {
        id: "transfers",
        title: "Taxi Services",
        description: "Comfortable car travel between cities.",
        image: "/images/home/transfers.png",
        link: "/transfers",
        features: ["Driver Included", "One-way Drops", "Good Cars"]
    },
    {
        id: "outstation",
        title: "Long Distance Trips",
        description: "Safe travel for long journeys. Professional drivers for every trip.",
        image: "/images/home/privateduty.png",
        link: "/contact",
        features: ["Safe Drivers", "24/7 Support", "Zero Self-Drive"]
    }
];

export const Services = () => {
    return (
        <section className="py-24 bg-[#050505] text-white relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-primary text-[10px] uppercase tracking-[0.4em] block mb-4 opacity-70">
                        Our Services
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl text-white/90 mb-6">
                        Choose Your Journey
                    </h2>
                    <p className="text-white/50 max-w-2xl mx-auto font-light">
                        We offer the best tour packages and taxi services for your travel needs.
                    </p>
                </div>

                <Tabs defaultValue="tours" className="w-full max-w-5xl mx-auto">
                    <div className="flex justify-center mb-12">
                        <TabsList className="bg-white/5 border border-white/10 p-1 rounded-full">
                            <TabsTrigger
                                value="tours"
                                className="px-8 py-3 rounded-full text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-black transition-all duration-300"
                            >
                                Tour Packages
                            </TabsTrigger>
                            <TabsTrigger
                                value="taxi"
                                className="px-8 py-3 rounded-full text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-black transition-all duration-300"
                            >
                                Taxi Services
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <AnimatePresence mode="wait">
                        <TabsContent value="tours" className="mt-0">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="grid md:grid-cols-2 gap-8"
                            >
                                {tourServices.map((service) => (
                                    <ServiceCard key={service.id} item={service} type="tour" />
                                ))}
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="taxi" className="mt-0">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="grid md:grid-cols-2 gap-8"
                            >
                                {taxiServices.map((service) => (
                                    <ServiceCard key={service.id} item={service} type="taxi" />
                                ))}
                            </motion.div>

                            <div className="mt-12 flex flex-col md:flex-row justify-center gap-6 items-center text-white/60 text-sm font-light">
                                <span className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5">
                                    <UserCheck className="w-4 h-4 text-primary" />
                                    Driver Mandatory
                                </span>
                                <span className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5">
                                    <ShieldCheck className="w-4 h-4 text-primary" />
                                    No Self-Drive Rentals
                                </span>
                            </div>
                        </TabsContent>
                    </AnimatePresence>
                </Tabs>
            </div>
        </section>
    );
};

const ServiceCard = ({ item, type }: { item: any, type: 'tour' | 'taxi' }) => {
    return (
        <Link
            to={item.link}
            className="group relative block aspect-[16/10] overflow-hidden rounded-[2px] bg-zinc-900 border border-white/10 hover:border-primary/30 transition-colors duration-500"
        >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />

            <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
            />

            {item.badge && (
                <div className="absolute top-4 right-4 z-20">
                    <span className="bg-primary/90 text-black text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-sm">
                        {item.badge}
                    </span>
                </div>
            )}

            <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-serif text-3xl text-white mb-3 group-hover:text-primary transition-colors">
                        {item.title}
                    </h3>

                    <p className="text-white/70 text-sm font-light mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                        {item.description}
                    </p>

                    {type === 'taxi' && item.features && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {item.features.map((feature: string) => (
                                <span key={feature} className="text-[10px] uppercase tracking-wider text-white/60 border border-white/10 px-2 py-1 rounded-sm">
                                    {feature}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-[0.2em] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                        View Details <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </Link>
    );
};
