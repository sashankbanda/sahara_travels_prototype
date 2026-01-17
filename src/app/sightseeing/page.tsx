"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import BlurText from "@/components/animate-ui/BlurText";

export default function Sightseeing() {
    const { packages } = useStore();
    const sightseeing = packages.filter((pkg) => pkg.category === "sightseeing" && pkg.status === "active");

    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />

            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/home/sightseeing.png"
                        alt="Sightseeing Hero"
                        className="w-full h-full object-cover opacity-60"
                        onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=1600&h=900&fit=crop")}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
                </div>

                <div className="relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <BlurText
                            text="Day Trips"
                            className="text-primary text-xs uppercase tracking-[0.4em] mb-4 block"
                            delay={50}
                            animateBy="words"
                        />
                        <BlurText
                            text="Sightseeing"
                            className="font-serif text-5xl md:text-7xl mb-6"
                            delay={50}
                            animateBy="words"
                        />
                        <p className="text-white/70 max-w-xl mx-auto font-light text-lg">
                            Discover the timeless beauty of monasteries, lakes, and local life.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Grid */}
            <section className="py-24 px-3 md:px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                        {sightseeing.map((pkg, index) => (
                            <motion.div
                                key={pkg.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <PremiumCard
                                    id={pkg.id}
                                    title={pkg.title}
                                    image={pkg.image}
                                    destination={pkg.destination}
                                    duration={pkg.duration}
                                    price={pkg.price}
                                />
                            </motion.div>
                        ))}
                    </div>

                    {sightseeing.length === 0 && (
                        <div className="text-center py-20 text-white/40">
                            <p>No sightseeing packages available at the moment.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
