import { MotionValue, motion, useTransform, useScroll } from 'framer-motion';
import { ArrowRight, MapPin, Compass, PlayCircle, Plane } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
            {/* --- Global HUD Elements (Always visible or persistent) --- */}
            {/* Logo removed to prevent conflict with Home Navbar */}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="fixed bottom-12 right-12 z-50 flex flex-col items-end gap-2 mix-blend-difference"
            >
                <div className="flex items-center gap-2 text-white/80 font-mono text-xs">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    LIVE SEQUENCE
                </div>
            </motion.div>


            {/* --- PHASE 1: HERO / DISCOVER --- */}
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
                        Immersive Expedition
                    </motion.div>

                    <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold font-serif tracking-tighter text-white drop-shadow-2xl leading-[0.9]">
                        <motion.span
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="block text-white/90"
                        >
                            Explore the
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                            className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FDCC5C] to-[#FFD700] bg-[length:200%_auto] animate-gradient-x pb-4"
                        >
                            Unseen
                        </motion.span>
                    </h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed tracking-wide"
                    >
                        Journey beyond the ordinary. Experience the world's most breathtaking landscapes in 8K resolution.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                        className="pt-4 pointer-events-auto"
                    >
                        <Button size="lg" className="rounded-full px-10 py-7 text-lg bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white gap-3 group transition-all duration-500 ease-out shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:scale-105">
                            Start Journey
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 text-primary" />
                        </Button>
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
                            <span className="text-sm font-bold tracking-widest uppercase">Exotic Locations</span>
                        </div>
                        <h3 className="text-4xl md:text-6xl font-serif text-white">
                            Curated <br /> Experiences
                        </h3>
                    </div>

                    <div className="space-y-6 text-white/80 font-light leading-relaxed">
                        <p>
                            From the golden dunes of the Sahara to the icy peaks of the Alps, our destinations are hand-picked for the discerning traveler.
                        </p>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="space-y-1">
                                <h4 className="text-2xl font-bold text-white">50+</h4>
                                <p className="text-xs text-white/60 uppercase tracking-wider">Countries</p>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-2xl font-bold text-white">5★</h4>
                                <p className="text-xs text-white/60 uppercase tracking-wider">Luxury Rating</p>
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
                            Your Adventure <br />
                            <span className="text-primary italic">Awaits</span>
                        </h3>
                        <p className="text-xl text-white/70 font-light">
                            The world is vast. Don't keep it waiting.
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-4 pointer-events-auto">
                        <div className="premium-panel p-6 rounded-xl border border-primary/30 bg-black/60 backdrop-blur-xl w-full max-w-md">
                            <div className="flex justify-between items-center mb-6">
                                <div className="text-left">
                                    <p className="text-xs text-white/50 uppercase tracking-widest">Next Expedition</p>
                                    <p className="text-lg font-bold text-white">March 15, 2026</p>
                                </div>
                                <Plane className="w-8 h-8 text-primary/80 rotate-45" />
                            </div>

                            <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-black font-bold text-lg h-14 rounded-lg shadow-[0_0_20px_-5px_hsl(41_52%_60%/_0.5)] hover:shadow-[0_0_30px_-5px_hsl(41_52%_60%/_0.7)] transition-all">
                                Book Your Seat
                            </Button>
                        </div>

                        <p className="text-xs text-white/40 font-mono mt-4">
                            LIMITED AVAILABILITY • GENESIS COLLECTION
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
