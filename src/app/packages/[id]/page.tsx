"use client";

import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { motion } from "framer-motion";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { MapPin, Clock, IndianRupee, Check, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { InquiryDialog } from "@/components/shared/InquiryDialog";

export default function PublicPackageDetails() {
    const params = useParams();
    const id = params.id;
    const router = useRouter();
    const { packages } = useStore();
    const pkg = packages.find((p) => p.id === Number(id));
    const [paymentMode, setPaymentMode] = useState<"advance" | "full" | "offline">("advance");

    if (!pkg) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl mb-4">Package not found</h2>
                    <Button onClick={() => router.push("/")} variant="outline">Back to Home</Button>
                </div>
            </div>
        );
    }

    const whatsappMessage = `Hi Sahara Journeys, I am interested in the ${pkg.title} package. Please share more details.`;
    const whatsappLink = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`;

    const handlePayment = () => {
        // Simulation of payment process
        toast.info("Redirecting to secure payment gateway...");
        setTimeout(() => {
            toast.success("This is a demo. In production, this would open Razorpay/Stripe.");
        }, 1500);
    };

    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />

            {/* Hero Image */}
            <div className="relative h-[60vh] md:h-[70vh]">
                <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                    <div className="container mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Button
                                variant="link"
                                onClick={() => router.back()}
                                className="text-white/60 hover:text-white p-0 mb-6 gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back
                            </Button>
                            <span className="text-primary text-xs uppercase tracking-[0.3em] mb-4 block">
                                {pkg.category} Package
                            </span>
                            <h1 className="font-serif text-4xl md:text-6xl mb-6 max-w-4xl leading-tight">
                                {pkg.title}
                            </h1>
                            <div className="flex flex-wrap gap-6 text-lg text-white/80">
                                <span className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    {pkg.destination}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-primary" />
                                    {pkg.duration}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                    {/* Left: Details */}
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <h2 className="font-serif text-3xl mb-6 text-white/90">Overview</h2>
                            <p className="text-white/60 leading-relaxed text-lg font-light">
                                {pkg.description || "Embark on a journey like no other. This carefully curated package offers an immersive experience into the heart of the region's culture and landscapes. From guided tours to comfortable stays, every detail is managed to ensure you have a seamless and memorable trip."}
                            </p>
                        </div>

                        {/* Inclusions (Static for prototype, usually dynamic) */}
                        <div>
                            <h2 className="font-serif text-3xl mb-6 text-white/90">What's Included</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {["Premium Accommodation", "Breakfast & Dinner", "Dedicated Driver & Vehicle", "Inner Line Permits", "Airport Transfers", "24/7 Support"].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-white/70">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Check className="w-3 H-3 text-primary" />
                                        </div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Itinerary Mock */}
                        <div>
                            <h2 className="font-serif text-3xl mb-6 text-white/90">Itinerary Highlights</h2>
                            <div className="space-y-8 border-l border-white/10 ml-3 pl-8 relative">
                                {[1, 2, 3].map((day) => (
                                    <div key={day} className="relative">
                                        <div className="absolute -left-[39px] top-0 w-5 h-5 rounded-full bg-black border border-primary/50" />
                                        <h3 className="text-xl font-medium mb-2">Day {day}: Exploration & Culture</h3>
                                        <p className="text-white/50 font-light">
                                            A full day of sightseeing visiting local monasteries and enjoying traditional cuisine. Evening leisure time at the resort.
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-zinc-900 border border-white/5 p-8 rounded-sm">
                            <div className="mb-8">
                                <span className="text-sm text-white/40 uppercase tracking-widest">Total Price</span>
                                <div className="flex items-center gap-1 text-3xl font-serif text-primary mt-2">
                                    <IndianRupee className="w-6 h-6" />
                                    {pkg.price.toLocaleString()}
                                    <span className="text-sm text-white/40 ml-2 font-sans font-normal">per person</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-sm text-white/60 mb-3 block">Payment Option</label>
                                    <div className="grid grid-cols-1 gap-3">
                                        <button
                                            onClick={() => setPaymentMode("advance")}
                                            className={`p-4 border rounded-sm text-left transition-all ${paymentMode === 'advance' ? 'border-primary bg-primary/5' : 'border-white/10 hover:border-white/20'}`}
                                        >
                                            <div className="font-medium">Pay Advance (30%)</div>
                                            <div className="text-sm text-white/50 mt-1">
                                                <IndianRupee className="w-3 h-3 inline" />
                                                {(pkg.price * 0.3).toLocaleString()} now to confirm
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => setPaymentMode("full")}
                                            className={`p-4 border rounded-sm text-left transition-all ${paymentMode === 'full' ? 'border-primary bg-primary/5' : 'border-white/10 hover:border-white/20'}`}
                                        >
                                            <div className="font-medium">Pay Full Amount</div>
                                            <div className="text-sm text-white/50 mt-1">Complete payment securely</div>
                                        </button>
                                        <button
                                            onClick={() => setPaymentMode("offline")}
                                            className={`p-4 border rounded-sm text-left transition-all ${paymentMode === 'offline' ? 'border-primary bg-primary/5' : 'border-white/10 hover:border-white/20'}`}
                                        >
                                            <div className="font-medium">Pay In-Hand</div>
                                            <div className="text-sm text-white/50 mt-1">Pay cash upon arrival</div>
                                        </button>
                                    </div>
                                </div>

                                <Button className="w-full py-6 text-base bg-primary text-black hover:bg-primary/90" onClick={handlePayment}>
                                    {paymentMode === 'offline' ? 'Confirm Booking' : 'Proceed to Pay'}
                                </Button>

                                <div className="relative py-4">
                                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-zinc-900 px-2 text-white/40">Or Enquire</span></div>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <InquiryDialog>
                                        <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 gap-2">
                                            <MessageCircle className="w-4 h-4 text-green-500" />
                                            Customize / Enquire
                                        </Button>
                                    </InquiryDialog>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />

            {/* Sticky Mobile Booking Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-900 border-t border-white/10 lg:hidden flex items-center justify-between z-50 pb-8">
                <div>
                    <p className="text-xs text-white/50 uppercase tracking-widest">Starting from</p>
                    <div className="flex items-center gap-1 text-xl font-serif text-primary">
                        <IndianRupee className="w-4 h-4" />
                        {pkg.price.toLocaleString()}
                    </div>
                </div>
                <Button size="lg" className="px-8 bg-primary text-black font-bold" onClick={handlePayment}>
                    Book Now
                </Button>
            </div>
        </div>
    );
}
