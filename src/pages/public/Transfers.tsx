import { motion } from "framer-motion";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { ShieldCheck, UserCheck, MapPin, Car, IndianRupee, ArrowRight } from "lucide-react";
import { InquiryDialog } from "@/components/shared/InquiryDialog";
import { Button } from "@/components/ui/button";
import SpotlightCard from "@/components/animate-ui/SpotlightCard";
import BlurText from "@/components/animate-ui/BlurText";
import ShinyText from "@/components/animate-ui/ShinyText";

export default function Transfers() {
    const transferServices = [
        {
            title: "Airport Pickup/Drop",
            description: "Pickup and drop at Vijayawada and Hyderabad airports.",
            icon: Car,
            price: "Custom"
        },
        {
            title: "City to City Drops",
            description: "One-way drops to cities like Kakinada, Gudivada, and others.",
            icon: MapPin,
            price: "Per Trip"
        },
        {
            title: "Driver Service",
            description: "Hire a driver for your daily travel needs.",
            icon: UserCheck,
            price: "Per Day"
        }
    ];

    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/home/transfers.png"
                        alt="Transfers Hero"
                        className="w-full h-full object-cover opacity-50"
                        onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&h=900&fit=crop")}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                </div>

                <div className="relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <BlurText
                            text="Comfort Travel"
                            className="text-primary text-xs uppercase tracking-[0.4em] mb-4 block"
                            delay={50}
                            animateBy="words"
                        />
                        <BlurText
                            text="Taxi & Transfers"
                            className="font-serif text-3xl md:text-5xl lg:text-7xl mb-6"
                            delay={50}
                            animateBy="words"
                        />
                        <p className="text-white/70 max-w-xl mx-auto font-light text-lg">
                            Safe and comfortable rides. Driver always included.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Important Notice Section */}
            <section className="py-12 bg-zinc-900 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        <div className="flex items-center gap-4 text-white/80">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <UserCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-medium text-lg">
                                    <ShinyText text="Driver Mandatory" disabled={false} speed={3} className="" />
                                </h4>
                                <p className="text-sm text-white/50">Driver comes with every car</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-white/80">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-medium text-lg">
                                    <ShinyText text="Safe Travel" disabled={false} speed={3} className="" />
                                </h4>
                                <p className="text-sm text-white/50">Trusted professional drivers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Route Selector & Booking Section */}
            <section className="py-24 px-6 relative z-20 -mt-20">
                <div className="container mx-auto">
                    <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 md:p-12 shadow-2xl">
                        <div className="text-center mb-10">
                            <BlurText
                                text="Book Your Transfer"
                                className="font-serif text-2xl md:text-3xl mb-4"
                                delay={50}
                                animateBy="words"
                            />
                            <p className="text-white/60">Select a popular route or request a custom quote.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            {/* Popular Routes */}
                            <div>
                                <h3 className="text-primary text-xs uppercase tracking-[0.2em] mb-6">
                                    <ShinyText text="Popular Routes" disabled={false} speed={3} className="" />
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { from: "Vijayawada", to: "Hyderabad Airport", price: "5,500", time: "5-6 hrs" },
                                        { from: "Kakinada", to: "Vijayawada Airport", price: "3,200", time: "3-4 hrs" },
                                        { from: "Rajahmundry", to: "Visakhapatnam", price: "4,000", time: "4-5 hrs" }
                                    ].map((route, i) => (
                                        <SpotlightCard
                                            key={i}
                                            className="flex items-center justify-between p-4 rounded-lg bg-black/40 border-white/5 hover:border-primary/30 transition-all cursor-pointer group"
                                            spotlightColor="rgba(205, 163, 104, 0.15)"
                                        >
                                            <div className="flex items-center gap-4 relative z-10">
                                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:text-primary transition-colors">
                                                    <MapPin className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-white/90">
                                                        {route.from} <ArrowRight className="w-3 h-3 text-white/30" /> {route.to}
                                                    </div>
                                                    <div className="text-xs text-white/50 mt-1">{route.time} • Sedan/SUV</div>
                                                </div>
                                            </div>
                                            <div className="text-right relative z-10">
                                                <div className="text-lg font-serif text-white group-hover:text-primary transition-colors">₹{route.price}</div>
                                                <InquiryDialog>
                                                    <button className="text-[10px] uppercase tracking-wider text-white/40 hover:text-white underline decoration-white/20">
                                                        Book
                                                    </button>
                                                </InquiryDialog>
                                            </div>
                                        </SpotlightCard>
                                    ))}
                                </div>
                            </div>

                            {/* Custom Booking */}
                            <SpotlightCard
                                className="bg-white/5 rounded-lg p-6 border-white/5"
                                spotlightColor="rgba(205, 163, 104, 0.1)"
                            >
                                <h3 className="text-white text-lg font-serif mb-6 flex items-center gap-2 relative z-10">
                                    <Car className="w-5 h-5 text-primary" />
                                    Custom Inquiry
                                </h3>
                                <div className="space-y-4 relative z-10">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <span className="text-xs text-white/50 uppercase">Pickup City</span>
                                            <input type="text" placeholder="e.g. Guntur" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-sm focus:border-primary focus:outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-xs text-white/50 uppercase">Drop City</span>
                                            <input type="text" placeholder="e.g. Bangalore" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-sm focus:border-primary focus:outline-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-xs text-white/50 uppercase">Travel Date</span>
                                        <input type="date" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-sm text-white/70 focus:border-primary focus:outline-none" />
                                    </div>

                                    <InquiryDialog>
                                        <Button className="w-full bg-primary text-black hover:bg-primary/90 h-12 mt-2 font-bold">
                                            Check Availability & Price
                                        </Button>
                                    </InquiryDialog>

                                    <p className="text-[10px] text-white/30 text-center leading-relaxed">
                                        *Prices depend on vehicle type and fuel rates. <br />
                                        We do not provide local point-to-point taxi services (e.g. within same city).
                                    </p>
                                </div>
                            </SpotlightCard>
                        </div>
                    </div>

                    {/* Fleet Services Grid (Moved down) */}
                    <div className="mt-24 text-center mb-16">
                        <BlurText
                            text="Our Fleet Services"
                            className="font-serif text-3xl md:text-4xl mb-6"
                            delay={50}
                            animateBy="words"
                        />
                        <p className="text-white/50 max-w-2xl mx-auto">
                            We specialize in long-distance intercity transfers and premium airport pickup/drops.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-24">
                        {transferServices.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <SpotlightCard className="bg-zinc-900/50 border-white/5 hover:border-primary/30 h-full" spotlightColor="rgba(205, 163, 104, 0.2)">
                                    <div className="mb-6 inline-block p-4 rounded-full bg-zinc-800 text-white group-hover:bg-primary group-hover:text-black transition-colors">
                                        <service.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-serif text-2xl mb-4">{service.title}</h3>
                                    <p className="text-white/60 mb-8 leading-relaxed">
                                        {service.description}
                                    </p>
                                    <div className="text-primary text-sm font-medium uppercase tracking-wider flex items-center justify-between gap-2">
                                        <span>Starts at <span className="text-white">{service.price}</span></span>
                                        <InquiryDialog>
                                            <Button variant="outline" size="sm" className="border-white/20 hover:bg-white hover:text-black">
                                                Book Now
                                            </Button>
                                        </InquiryDialog>
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
