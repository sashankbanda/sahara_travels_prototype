import { MotionValue, motion, useTransform, useScroll } from 'framer-motion';
import { ArrowRight, MapPin, Compass, PlayCircle, Plane, Phone, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { InquiryDialog } from '@/components/shared/InquiryDialog';

interface TravelExperienceProps {
    scrollYProgress: MotionValue<number>;
    className?: string;
}

export default function TravelExperience({ scrollYProgress, className }: TravelExperienceProps) {
    // --- Phase 1: Discover (0% - 30%) ---
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

    // --- Phase 2: Destinations (30% - 60%) ---
    const designOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], [0, 1, 1, 0]);
    const designY = useTransform(scrollYProgress, [0.25, 0.35, 0.65], [50, 0, -50]);

    // --- Phase 3: The Future / Book (60% - 100%) ---
    const engineOpacity = useTransform(scrollYProgress, [0.6, 0.7, 1], [0, 1, 1]);
    const engineY = useTransform(scrollYProgress, [0.6, 0.7], [50, 0]);

    return (
        <div className={cn("absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-8 md:p-12 lg:p-20 overflow-hidden text-white", className)}>
            {/* --- Global HUD Elements (Always visible or persistent) --- */}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="fixed bottom-12 right-12 z-50 flex flex-col items-end gap-2 mix-blend-difference"
            >
                <div className="flex items-center gap-2 text-white/80 font-mono text-xs">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    SCROLL TO EXPLORE
                </div>
            </motion.div>


            {/* --- PHASE 1: HERO / DISCOVER --- */}
            <motion.div
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                className="absolute inset-0 flex items-center justify-center text-center perspective-1000"
            >
                {/* Atmospheric Overlay behind text */}
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-black/20 to-transparent pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 max-w-5xl mx-auto p-12 space-y-8"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="inline-block px-5 py-2 rounded-full border border-white/10 bg-black/20 backdrop-blur-md text-[10px] font-bold tracking-[0.2em] text-primary uppercase shadow-[0_0_15px_rgba(255,165,0,0.2)]"
                    >
                        Since 1998
                    </motion.div>

                    <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold font-serif tracking-tighter text-white drop-shadow-2xl leading-[0.9]">
                        <motion.span
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="block text-white/90"
                        >
                            Experience
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                            className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FDCC5C] to-[#FFD700] bg-[length:200%_auto] animate-gradient-x pb-4"
                        >
                            Northeast India
                        </motion.span>
                    </h2>

                    {/* Service Clarifier */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
                        className="text-white/80 text-lg md:text-xl font-medium tracking-wide"
                    >
                        Your Trusted Partner for Tours & Transfers in Arunachal Pradesh
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        className="text-base md:text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed tracking-wide"
                    >
                        Over 25 years of local expertise. Verified drivers, premium fleet, and unforgettable journeys.
                    </motion.p>

                    {/* Trust Strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
                        className="flex flex-wrap justify-center gap-4 text-xs md:text-sm text-white/50 font-mono uppercase tracking-wider"
                    >
                        <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary/70" /> 25+ Years Legacy</span>
                        <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary/70" /> 10k+ Happy Travelers</span>
                        <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary/70" /> Safe & Verified</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                        className="pt-4 pointer-events-auto"
                    >
                        <InquiryDialog>
                            <Button size="lg" className="rounded-full px-10 py-7 text-lg bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white gap-3 group transition-all duration-500 ease-out shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:scale-105">
                                Plan Your Trip
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 text-primary" />
                            </Button>
                        </InquiryDialog>
                    </motion.div>
                </motion.div>
            </motion.div>


            {/* --- PHASE 2: DESTINATIONS --- */}
            <motion.div
                style={{ opacity: designOpacity, y: designY }}
                className="absolute inset-0 flex items-center justify-start pl-8 md:pl-20 lg:pl-40"
            >
                <div className="max-w-xl space-y-8 glass-card p-8 md:p-12 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-primary mb-2">
                            <MapPin className="w-5 h-5" />
                            <span className="text-sm font-bold tracking-widest uppercase">Destinations</span>
                        </div>
                        <h3 className="text-4xl md:text-6xl font-serif text-white">
                            Beyond <br /> The Map
                        </h3>
                    </div>

                    <div className="space-y-6 text-white/80 font-light leading-relaxed">
                        <ul className="space-y-3 list-none">
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-xs">●</span>
                                <span>Tawang, Mechuka, Ziro, & More.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-xs">●</span>
                                <span>Custom Itineraries for Families & Solo Travelers.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-1.5 text-xs">●</span>
                                <span>Permit Assistance Included.</span>
                            </li>
                        </ul>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="space-y-1">
                                <h4 className="text-2xl font-bold text-white">100%</h4>
                                <p className="text-xs text-white/60 uppercase tracking-wider">Safety Record</p>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-2xl font-bold text-white">4.9/5</h4>
                                <p className="text-xs text-white/60 uppercase tracking-wider">Customer Rating</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* --- PHASE 3: BOOK NOW --- */}
            <motion.div
                style={{ opacity: engineOpacity, y: engineY }}
                className="absolute inset-0 flex items-center justify-end pr-8 md:pr-20 lg:pr-40"
            >
                <div className="max-w-lg space-y-8 text-right">
                    <div className="space-y-4">
                        <h3 className="text-5xl md:text-7xl font-serif text-white leading-none">
                            Start Your <br />
                            <span className="text-primary italic">Journey</span>
                        </h3>
                        <p className="text-xl text-white/70 font-light">
                            Reliable transfers. Unforgettable tours.
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-4 pointer-events-auto">
                        <div className="premium-panel p-6 rounded-xl border border-primary/30 bg-black/60 backdrop-blur-xl w-full max-w-md">
                            <div className="flex justify-between items-center mb-6">
                                <div className="text-left">
                                    <p className="text-xs text-white/50 uppercase tracking-widest">Sahara Journeys</p>
                                    <p className="text-sm font-bold text-white mt-1">Ready when you are</p>
                                </div>
                                <Calendar className="w-8 h-8 text-primary/80" />
                            </div>

                            <InquiryDialog>
                                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-black font-bold text-lg h-14 rounded-lg shadow-[0_0_20px_-5px_hsl(41_52%_60%/_0.5)] hover:shadow-[0_0_30px_-5px_hsl(41_52%_60%/_0.7)] transition-all">
                                    Book Now
                                </Button>
                            </InquiryDialog>
                        </div>

                        <p className="text-xs text-white/40 font-mono mt-4">
                            ADVANCE PAYMENT AVAILABLE • INSTANT CONFIRMATION
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
