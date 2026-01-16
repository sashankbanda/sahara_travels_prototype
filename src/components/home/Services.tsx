import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, MapPin, ShieldCheck, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import ShinyText from "@/components/animate-ui/ShinyText";

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
        link: "/transfers",
        features: ["Safe Drivers", "24/7 Support", "Zero Self-Drive"]
    }
];

export const Services = () => {
    const [activeTab, setActiveTab] = useState("tours");
    return (
        <section className="py-8 md:py-24 relative overflow-hidden">

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-8 md:mb-16">
                    <span className="text-primary text-[10px] uppercase tracking-[0.4em] block mb-3 md:mb-4 opacity-70">
                        Our Services
                    </span>
                    <h2 className="font-serif text-2xl md:text-5xl text-white/90 mb-4 md:mb-6">
                        Choose Your Journey
                    </h2>
                    <p className="text-white/50 max-w-2xl mx-auto font-light text-sm md:text-base">
                        We offer the best tour packages and taxi services for your travel needs.
                    </p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-5xl mx-auto">
                    <div className="flex justify-center mb-8 md:mb-12">
                        <TabsList className="bg-white/5 border border-white/10 p-1 rounded-full w-full md:w-auto grid grid-cols-2 md:flex h-auto">
                            <TabsTrigger
                                value="tours"
                                className="flex-1 md:flex-none px-6 py-3 rounded-full text-[10px] md:text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-black transition-all duration-300"
                            >
                                Tour Packages
                            </TabsTrigger>
                            <TabsTrigger
                                value="taxi"
                                className="flex-1 md:flex-none px-6 py-3 rounded-full text-[10px] md:text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-black transition-all duration-300"
                            >
                                Taxi Services
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === "tours" ? (
                            <motion.div
                                key="tours"
                                role="tabpanel"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="mt-0"
                            >
                                <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                                    {tourServices.map((service) => (
                                        <ServiceCard key={service.id} item={service} type="tour" />
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="taxi"
                                role="tabpanel"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="mt-0"
                            >
                                <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                                    {taxiServices.map((service) => (
                                        <ServiceCard key={service.id} item={service} type="taxi" />
                                    ))}
                                </div>

                                <div className="mt-12 flex flex-col items-center gap-6 text-white/60 text-sm font-light">
                                    <div className="flex flex-col md:flex-row justify-center gap-6">
                                        <span className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5">
                                            <UserCheck className="w-4 h-4 text-primary" />
                                            <ShinyText text="Driver Mandatory" disabled={false} speed={3} className="" />
                                        </span>
                                        <span className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5">
                                            <ShieldCheck className="w-4 h-4 text-primary" />
                                            <ShinyText text="No Self-Drive Rentals" disabled={false} speed={3} className="" />
                                        </span>
                                    </div>
                                    <p className="text-white/40 text-xs text-center border-t border-white/10 pt-4 mt-2 max-w-lg">
                                        Please note: We do not provide local point-to-point city rides within a single town. Our services are dedicated to inter-city transfers and multi-day packages.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Tabs>

                {/* Inclusive / Foreign Traveler Reassurance Block */}
                <div className="mt-16 md:mt-24 max-w-4xl mx-auto text-center border-t border-white/5 pt-8 md:pt-12">
                    <h3 className="font-serif text-lg md:text-2xl mb-3 md:mb-4">
                        <ShinyText text="First time in Northeast India?" disabled={false} speed={3} className="" />
                    </h3>
                    <p className="text-white/50 mb-6 md:mb-8 font-light leading-relaxed text-sm md:text-base">
                        We understand that traveling to a new region can be daunting. We are here to make it safe and simple.
                        Our drivers are verified locals who speak English, Hindi, and local dialects.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-[10px] md:text-sm text-white/60 font-mono uppercase tracking-wider">
                        <span className="px-4 py-2 bg-white/5 rounded-sm border border-white/10">
                            <ShinyText text="Pay 30% Advance" disabled={false} speed={3} className="" />
                        </span>
                        <span className="px-4 py-2 bg-white/5 rounded-sm border border-white/10">
                            <ShinyText text="English Support" disabled={false} speed={3} className="" />
                        </span>
                        <span className="px-4 py-2 bg-white/5 rounded-sm border border-white/10">
                            <ShinyText text="Local Drivers" disabled={false} speed={3} className="" />
                        </span>
                    </div>
                </div>

            </div>
        </section>
    );
};


import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const ServiceCard = ({ item, type }: { item: any, type: 'tour' | 'taxi' }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        setMousePosition({ x: e.clientX - left, y: e.clientY - top });
    };

    return (
        <HoverBorderGradient
            containerClassName="rounded-lg md:rounded-none p-0 w-full h-full border-0 bg-transparent"
            className="w-full h-full p-0 bg-transparent rounded-[inherit]"
            as="div"
            duration={1.5}
        >
            <Link
                to={item.link}
                onMouseMove={handleMouseMove}
                className="relative block w-full h-full aspect-[3/2] md:aspect-[16/10] overflow-hidden bg-black border border-transparent transition-all duration-700 rounded-[inherit]"
            >
                {/* Spotlight Effect */}
                {/* Image Layer (z-0) */}
                <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale-[30%] group-hover:grayscale-0 z-0"
                />

                {/* Gradient Overlay (z-10) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 md:via-black/20 to-transparent opacity-90 md:opacity-80 group-hover:opacity-60 transition-opacity duration-700 z-10" />

                {/* Spotlight Effect (z-20) - Needs to be ON TOP of image/gradient to be seen as a sheen */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 mix-blend-overlay"
                    style={{
                        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15), transparent 40%)`,
                    }}
                />

                {item.badge && (
                    <div className="absolute top-4 right-4 z-30">
                        <span className="bg-primary/90 text-black text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-sm shadow-lg">
                            <ShinyText text={item.badge} disabled={false} speed={3} className="" color="#000000" shineColor="#ffffff" />
                        </span>
                    </div>
                )}

                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8 z-30">
                    <div className="transform translate-y-0 md:translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="font-serif text-2xl md:text-3xl text-white mb-2 md:mb-3 group-hover:text-primary transition-colors leading-tight">
                            {item.title}
                        </h3>

                        <p className="text-white/80 md:text-white/70 text-xs md:text-sm font-light mb-4 md:mb-6 opacity-100 md:opacity-80 group-hover:opacity-100 transition-opacity line-clamp-2 md:line-clamp-none">
                            {item.description}
                        </p>

                        {type === 'taxi' && item.features && (
                            <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                                {item.features.map((feature: string) => (
                                    <span key={feature} className="text-[10px] uppercase tracking-wider text-white/70 border border-white/20 md:border-white/10 px-2 py-1 rounded-sm bg-black/20 md:bg-transparent">
                                        <ShinyText text={feature} disabled={false} speed={3} className="" />
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-[0.2em] font-medium opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 md:delay-75">
                            View Details <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </Link>
        </HoverBorderGradient>
    );
};
