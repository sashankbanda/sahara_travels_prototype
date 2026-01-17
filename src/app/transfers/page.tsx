"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { ShieldCheck, UserCheck, MapPin, Car, Calendar, ArrowRight, Search } from "lucide-react";
import { InquiryDialog } from "@/components/shared/InquiryDialog";
import { Button } from "@/components/ui/button";
import SpotlightCard from "@/components/animate-ui/SpotlightCard";
import BlurText from "@/components/animate-ui/BlurText";
import ShinyText from "@/components/animate-ui/ShinyText";
import { WhatsAppButton } from "@/components/home/WhatsAppButton";

export default function Transfers() {
    const routes = [
        { from: "Vijayawada", to: "Hyderabad Airport", price: "5,500", time: "5–6 hrs" },
        { from: "Kakinada", to: "Vijayawada Airport", price: "3,200", time: "3–4 hrs" },
        { from: "Rajahmundry", to: "Visakhapatnam", price: "4,000", time: "4–5 hrs" }
    ];

    const transferServices = [
        {
            title: "Airport Pickup / Drop",
            description: "Seamless door-to-door transfers for Vijayawada and Hyderabad airports.",
            price: "Custom",
            icon: Car
        },
        {
            title: "City to City Drops",
            description: "Premium one-way drops to major cities like Kakinada, Rajahmundry & Visakhapatnam.",
            price: "Per Trip",
            icon: MapPin
        },
        {
            title: "Chauffeur Service",
            description: "Hire a professional driver with a luxury car for your daily travel needs.",
            price: "Per Day",
            icon: UserCheck
        }
    ];

    return (
        <div className="bg-black min-h-screen text-white overflow-x-hidden selection:bg-primary/30">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
                {/* Background */}
                <img
                    src="/images/home/transfers.png"
                    alt="Luxury Travel"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />

                {/* Hero Content */}
                <div className="relative z-10 text-center max-w-3xl mx-auto mb-12">
                    <BlurText
                        text="Premium Transfers"
                        className="text-primary text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4"
                        delay={40}
                        animateBy="words"
                    />
                    <BlurText
                        text="Your Journey, Your Way"
                        className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6 tracking-tight"
                        delay={60}
                        animateBy="words"
                    />
                    <p className="text-white/70 max-w-lg mx-auto text-sm md:text-lg leading-relaxed font-light">
                        Experience credible, safe, and luxurious travel across Andhra Pradesh & Telangana.
                    </p>
                </div>

                {/* SEARCH WIDGET (User Preference First) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="relative z-20 w-full max-w-5xl"
                >
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 md:p-6 rounded-2xl shadow-2xl">
                        <div className="flex flex-col md:flex-row items-end gap-4">
                            {/* Origin */}
                            <div className="flex-1 w-full space-y-2">
                                <label className="text-[10px] uppercase tracking-wider text-white/50 font-medium pl-1">Pickup Location</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary opacity-70 group-focus-within:opacity-100 transition-opacity" />
                                    <input
                                        type="text"
                                        placeholder="Enter pick-up city..."
                                        className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-white/20"
                                    />
                                </div>
                            </div>

                            {/* Destination */}
                            <div className="flex-1 w-full space-y-2">
                                <label className="text-[10px] uppercase tracking-wider text-white/50 font-medium pl-1">Drop Location</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary opacity-70 group-focus-within:opacity-100 transition-opacity" />
                                    <input
                                        type="text"
                                        placeholder="Enter destination..."
                                        className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-white/20"
                                    />
                                </div>
                            </div>

                            {/* Date */}
                            <div className="w-full md:w-48 space-y-2">
                                <label className="text-[10px] uppercase tracking-wider text-white/50 font-medium pl-1">Travel Date</label>
                                <div className="relative group">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary opacity-70 group-focus-within:opacity-100 transition-opacity" />
                                    <input
                                        type="date"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white/80 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all [color-scheme:dark]"
                                    />
                                </div>
                            </div>

                            {/* Action */}
                            <div className="w-full md:w-auto mt-2 md:mt-0">
                                <InquiryDialog>
                                    <Button className="w-full md:w-auto h-[46px] px-8 bg-primary hover:bg-primary/90 text-black font-semibold tracking-wide shadow-lg shadow-primary/20 transition-all">
                                        Check Rates
                                    </Button>
                                </InquiryDialog>
                            </div>
                        </div>
                    </div>

                    {/* Security Badges */}
                    <div className="flex justify-center gap-8 mt-8 text-white/40">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-primary/60" />
                            <span className="text-[10px] uppercase tracking-widest">Verified Drivers</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Search className="w-4 h-4 text-primary/60" />
                            <span className="text-[10px] uppercase tracking-widest">Transparent Pricing</span>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* POPULAR ROUTES (Secondary) */}
            <section className="py-24 px-4 bg-zinc-900/30 border-t border-white/5 relative">
                {/* Decorative background blur */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h3 className="text-primary text-[10px] md:text-xs uppercase tracking-[0.3em] mb-2">
                                Popular Choices
                            </h3>
                            <h2 className="font-serif text-3xl md:text-4xl">
                                Sample Routes
                            </h2>
                        </div>
                        <Button variant="link" className="text-white/50 hover:text-primary hidden md:flex">
                            View All Routes <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                        {routes.map((route, i) => (
                            <SpotlightCard
                                key={i}
                                className="group p-3 md:p-6 bg-zinc-900/50 border-white/5 hover:border-primary/30 transition-all duration-300"
                                spotlightColor="rgba(205, 163, 104, 0.08)"
                            >
                                <div className="flex justify-between items-start mb-3 md:mb-6">
                                    <div className="p-1.5 md:p-2.5 rounded-lg bg-white/5 text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                                        <Car className="w-4 h-4 md:w-5 md:h-5" />
                                    </div>
                                    <div className="px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-white/5 border border-white/5 text-[9px] md:text-[10px] font-medium text-white/60">
                                        {route.time}
                                    </div>
                                </div>

                                <div className="space-y-0.5 md:space-y-1 mb-2 md:mb-4">
                                    <div className="text-[10px] md:text-sm text-white/50">From</div>
                                    <div className="text-sm md:text-lg font-medium leading-tight">{route.from}</div>
                                </div>

                                <div className="w-[1px] h-3 md:h-4 bg-gradient-to-b from-white/20 to-transparent ml-0.5 mb-1" />

                                <div className="space-y-0.5 md:space-y-1 mb-3 md:mb-6">
                                    <div className="text-[10px] md:text-sm text-white/50">To</div>
                                    <div className="text-sm md:text-lg font-medium text-white leading-tight">{route.to}</div>
                                </div>

                                <div className="flex flex-col md:flex-row md:items-center justify-between pt-3 md:pt-4 border-t border-white/5 gap-2 md:gap-0">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-white/40">Starts at</span>
                                        <span className="text-sm md:text-xl font-serif text-primary">₹{route.price}</span>
                                    </div>
                                    <InquiryDialog>
                                        <Button size="sm" variant="outline" className="w-full md:w-auto h-7 md:h-9 text-[10px] md:text-xs group-hover:bg-white group-hover:text-black transition-colors">
                                            Book
                                        </Button>
                                    </InquiryDialog>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="py-24 px-4 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-5xl mb-4">
                            Premium Fleet Services
                        </h2>
                        <p className="text-white/50 max-w-2xl mx-auto">
                            Whether you need a quick airport drop or a chauffeur for the day, we ensure a seamless experience.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {transferServices.map((service, index) => (
                            <SpotlightCard
                                key={index}
                                className="p-8 md:p-10 text-center border-white/5 bg-zinc-900/20 hover:bg-zinc-900/40"
                                spotlightColor="rgba(205, 163, 104, 0.15)"
                            >
                                <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-6">
                                    <service.icon className="w-8 h-8" />
                                </div>
                                <h3 className="font-serif text-2xl mb-3">{service.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed mb-6">
                                    {service.description}
                                </p>
                                <InquiryDialog>
                                    <Button variant="link" className="text-primary hover:text-white p-0 h-auto font-medium">
                                        Get a Quote <ArrowRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </InquiryDialog>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            <WhatsAppButton />
            <Footer />
        </div>
    );
}
