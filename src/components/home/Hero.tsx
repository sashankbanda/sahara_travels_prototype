import { Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { FogScene } from "./FogScene";
import BlurText from "@/components/animate-ui/BlurText";

export const Hero = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-black text-white">
            {/* Background with Slow Parallax - MOVES SLOWEST */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                <img
                    src="/images/home/hero.png"
                    alt="Sahara Journeys Hero"
                    className="h-full w-full object-cover opacity-60"
                />
                {/* Reduces contrast naturally */}
                <div className="absolute inset-0 bg-black/40" />
            </motion.div>

            {/* 3D Fog Environment - React Three Fiber */}
            <Suspense fallback={null}>
                <FogScene />
            </Suspense>

            {/* Content - NO PARALLAX on Text, Pure Fade + Rise */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                <div className="max-w-4xl space-y-12">



                    // ...
                    {/* 1. Headline (First) */}
                    {/* 1. Headline (First) */}
                    <BlurText
                        text="Journey Beyond the Ordinary"
                        className="font-serif text-5xl md:text-7xl lg:text-9xl tracking-tight leading-[1.1] text-white/90 drop-shadow-2xl max-w-5xl mx-auto"
                        delay={60}
                        animateBy="words"
                    />

                    {/* 2. Subtext (Second) */}
                    {/* 2. Subtext (Second) */}
                    <BlurText
                        text="Discover the Undiscovered in the heart of Arunachal Pradesh"
                        className="max-w-md mx-auto text-white/70 text-sm md:text-base uppercase tracking-[0.3em] font-medium leading-loose"
                        delay={30}
                        animateBy="words"
                    />

                    {/* 3. CTA (Last) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
                        className="pt-8"
                    >
                        <button className="group relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-4 rounded-full font-medium tracking-[0.2em] uppercase text-[11px] transition-all hover:bg-white hover:text-black hover:border-transparent">
                            Start Your Journey
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Passive Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 2 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="flex flex-col items-center gap-2 text-white/20">
                    <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
                    <ArrowDown className="w-3 h-3 opacity-40 animate-pulse" />
                </div>
            </motion.div>
        </section>
    );
};
