import { motion } from "framer-motion";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { ShieldCheck, UserCheck, MapPin, Car, IndianRupee } from "lucide-react";
import { InquiryDialog } from "@/components/shared/InquiryDialog";
import { Button } from "@/components/ui/button";

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
                        <span className="text-primary text-xs uppercase tracking-[0.4em] mb-4 block">
                            Comfort Travel
                        </span>
                        <h1 className="font-serif text-5xl md:text-7xl mb-6">Taxi & Transfers</h1>
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
                                <h4 className="font-medium text-lg">Driver Mandatory</h4>
                                <p className="text-sm text-white/50">Driver comes with every car</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-white/80">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-medium text-lg">Safe Travel</h4>
                                <p className="text-sm text-white/50">Trusted professional drivers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl mb-6">Our Fleet Services</h2>
                        <p className="text-white/50 max-w-2xl mx-auto">
                            We specialize in long-distance intercity transfers and premium airport pickup/drops.
                            Note: We do not provide local point-to-point taxi services like Uber/Ola.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {transferServices.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-zinc-900/50 border border-white/5 p-8 hover:border-primary/30 transition-colors group"
                            >
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
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
