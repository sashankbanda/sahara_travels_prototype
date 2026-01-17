"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { ShieldCheck, UserCheck, MapPin, Car } from "lucide-react";
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
            description: "Pickup and drop at Vijayawada and Hyderabad airports.",
            price: "Custom",
            icon: Car
        },
        {
            title: "City to City Drops",
            description: "One-way drops to cities like Kakinada, Gudivada and others.",
            price: "Per Trip",
            icon: MapPin
        },
        {
            title: "Driver Service",
            description: "Hire a driver for daily or long-distance travel needs.",
            price: "Per Day",
            icon: UserCheck
        }
    ];

    return (
        <div className="bg-black min-h-screen text-white overflow-x-hidden">
            <Navbar />

            {/* HERO */}
            <section className="relative h-[42vh] md:h-[60vh] lg:h-[70vh] min-h-[300px] flex items-center justify-center overflow-hidden">
                <img
                    src="/images/home/transfers.png"
                    alt="Transfers"
                    className="absolute inset-0 w-full h-full object-cover opacity-45"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black" />

                <div className="relative text-center px-4">
                    <BlurText
                        text="Comfort Travel"
                        className="text-primary text-[10px] uppercase tracking-[0.35em] mb-2"
                        delay={40}
                        animateBy="words"
                    />
                    <BlurText
                        text="Taxi & Transfers"
                        className="font-serif text-3xl md:text-6xl mb-3"
                        delay={40}
                        animateBy="words"
                    />
                    <p className="text-white/70 max-w-sm mx-auto text-xs md:text-lg leading-snug">
                        Safe, comfortable rides. Driver always included.
                    </p>
                </div>
            </section>

            {/* TRUST ROW */}
            <section className="py-8 bg-zinc-900 border-y border-white/5">
                <div className="flex flex-col md:flex-row justify-center gap-6 px-6">
                    {[
                        { icon: UserCheck, title: "Driver Mandatory", desc: "Driver with every car" },
                        { icon: ShieldCheck, title: "Safe Travel", desc: "Verified professionals" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="p-2.5 rounded-full bg-primary/10 text-primary">
                                <item.icon className="w-4 h-4" />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium">
                                    <ShinyText text={item.title} speed={3} />
                                </h4>
                                <p className="text-[11px] text-white/45">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* BOOKING */}
            <section className="py-14 px-4">
                <div className="max-w-7xl mx-auto bg-zinc-900 border border-white/10 rounded-xl p-5 md:p-12">
                    <div className="text-center mb-8">
                        <BlurText
                            text="Book Your Transfer"
                            className="font-serif text-xl md:text-3xl mb-2"
                        />
                        <p className="text-white/55 text-xs md:text-sm leading-snug">
                            Select a route or request a custom quote.
                        </p>
                    </div>

                    {/* POPULAR ROUTES */}
                    <h3 className="text-primary text-[10px] uppercase tracking-[0.25em] mb-3">
                        <ShinyText text="Popular Routes" speed={3} />
                    </h3>

                    <div className="
                        flex md:grid
                        md:grid-cols-2
                        gap-3
                        overflow-x-auto md:overflow-visible
                        snap-x snap-mandatory
                        -mx-4 px-4 pb-3
                    ">
                        {routes.map((route, i) => (
                            <SpotlightCard
                                key={i}
                                className="
                                    min-w-[78%] md:min-w-0
                                    snap-center
                                    flex items-center justify-between
                                    p-3 md:p-4
                                    rounded-lg
                                    bg-black/40 border-white/5
                                "
                                spotlightColor="rgba(205, 163, 104, 0.15)"
                            >
                                <div className="flex items-center gap-2.5">
                                    <MapPin className="w-3.5 h-3.5 text-white/40" />
                                    <div>
                                        <div className="text-sm font-medium leading-tight">
                                            {route.from} → {route.to}
                                        </div>
                                        <div className="text-[11px] text-white/45">
                                            {route.time} • Sedan/SUV
                                        </div>
                                    </div>
                                </div>
                                <div className="font-serif text-base">
                                    ₹{route.price}
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>

                    {/* CUSTOM INQUIRY */}
                    <div className="mt-8">
                        <SpotlightCard
                            className="bg-white/5 p-4 md:p-6"
                            spotlightColor="rgba(205, 163, 104, 0.1)"
                        >
                            <h3 className="font-serif text-base mb-4 flex items-center gap-2">
                                <Car className="w-4 h-4 text-primary" />
                                Custom Inquiry
                            </h3>

                            <div className="space-y-3">
                                <input
                                    placeholder="Pickup City"
                                    className="w-full bg-black/50 border border-white/10 rounded px-3 py-2.5 text-sm"
                                />
                                <input
                                    placeholder="Drop City"
                                    className="w-full bg-black/50 border border-white/10 rounded px-3 py-2.5 text-sm"
                                />
                                <input
                                    type="date"
                                    className="w-full bg-black/50 border border-white/10 rounded px-3 py-2.5 text-sm text-white/70"
                                />

                                <InquiryDialog>
                                    <Button className="w-full bg-primary text-black font-semibold h-11 text-sm">
                                        Check Availability & Price
                                    </Button>
                                </InquiryDialog>
                            </div>
                        </SpotlightCard>
                    </div>
                </div>
            </section>

            {/* FLEET SERVICES */}
            <section className="pb-24 px-4">
                <div className="text-center mb-8">
                    <BlurText
                        text="Our Fleet Services"
                        className="font-serif text-xl md:text-3xl mb-2"
                    />
                    <p className="text-white/50 text-xs md:text-sm max-w-xl mx-auto">
                        Long-distance intercity transfers and premium airport services.
                    </p>
                </div>

                <div className="
                    flex md:grid
                    md:grid-cols-2 lg:grid-cols-3
                    gap-4
                    overflow-x-auto md:overflow-visible
                    snap-x snap-mandatory
                    -mx-4 px-4
                ">
                    {transferServices.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="min-w-[78%] md:min-w-0 snap-center"
                        >
                            <SpotlightCard
                                className="p-4 md:p-6 flex flex-col h-full"
                                spotlightColor="rgba(205, 163, 104, 0.2)"
                            >
                                <service.icon className="w-5 h-5 text-primary mb-3" />
                                <h3 className="font-serif text-base md:text-xl mb-1">
                                    {service.title}
                                </h3>
                                <p className="text-white/55 text-xs md:text-sm leading-snug mb-4 flex-grow">
                                    {service.description}
                                </p>
                                <div className="flex justify-between items-center text-[11px] uppercase">
                                    <span>
                                        Starts at <span className="text-white">{service.price}</span>
                                    </span>
                                    <InquiryDialog>
                                        <Button size="sm" variant="outline" className="h-8 text-xs">
                                            Book Now
                                        </Button>
                                    </InquiryDialog>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>
            </section>

            <WhatsAppButton />
            <Footer />
        </div>
    );
}
