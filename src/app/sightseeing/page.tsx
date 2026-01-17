"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { MapPin, Clock, IndianRupee, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import BlurText from "@/components/animate-ui/BlurText";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

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
            <section className="py-24 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sightseeing.map((pkg, index) => (
                            <motion.div
                                key={pkg.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <HoverBorderGradient
                                    containerClassName="rounded-sm p-0 w-full h-full border-0 bg-transparent"
                                    className="w-full h-full p-0 bg-transparent rounded-[inherit]"
                                    as="div"
                                    duration={1.5}
                                >
                                    <Link href={`/packages/${pkg.id}`} className="relative block bg-zinc-900 overflow-hidden border border-transparent hover:border-transparent transition-colors duration-500 rounded-[inherit] h-full w-full">
                                        <div className="relative h-[300px] overflow-hidden">
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500 z-10" />
                                            <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-110">
                                                <Image
                                                    src={pkg.image}
                                                    alt={pkg.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    priority={index < 4}
                                                />
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
                                                <h3 className="font-serif text-2xl text-white mb-2">{pkg.title}</h3>
                                                <div className="flex items-center gap-4 text-sm text-white/70">
                                                    <span className="flex items-center gap-1.5">
                                                        <MapPin className="w-3.5 h-3.5 text-primary" />
                                                        {pkg.destination}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Clock className="w-3.5 h-3.5 text-primary" />
                                                        {pkg.duration}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 flex justify-between items-center border-t border-white/5 bg-zinc-900 group-hover:bg-zinc-800/50 transition-colors">
                                            <div className="text-lg font-medium text-primary flex items-center gap-1">
                                                <span className="text-xs text-white/40 font-normal uppercase tracking-wider mr-2">Per Person</span>
                                                <IndianRupee className="w-4 h-4" />
                                                {pkg.price.toLocaleString()}
                                            </div>
                                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-300">
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </Link>
                                </HoverBorderGradient>
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
