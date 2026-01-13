import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

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

            {/* Atmospheric Fog Layers - MOVE SLIGHTLY FASTER */}
            <div className="absolute inset-0 z-[1] opacity-60 pointer-events-none mix-blend-screen">
                <div className="absolute -bottom-1/2 -left-1/4 w-[150%] h-full bg-gradient-to-t from-zinc-800/30 via-zinc-600/10 to-transparent blur-3xl animate-fog-1" />
                <div className="absolute -bottom-1/3 -right-1/4 w-[150%] h-full bg-gradient-to-t from-zinc-800/30 via-zinc-600/10 to-transparent blur-3xl animate-fog-2" />
            </div>

            {/* Content - NO PARALLAX on Text, Pure Fade + Rise */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                <div className="max-w-4xl space-y-12">

                    {/* 1. Headline (First) */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="font-serif text-5xl md:text-7xl lg:text-9xl tracking-tight leading-[1.1] text-white/90 drop-shadow-2xl"
                    >
                        Journey Beyond <br /> the <span className="italic font-light text-white/80">Ordinary</span>
                    </motion.h1>

                    {/* 2. Subtext (Second) */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 1.0, ease: "easeOut" }}
                        className="max-w-md mx-auto text-white/70 text-sm md:text-base uppercase tracking-[0.3em] font-medium leading-loose"
                    >
                        Discover the Undiscovered in <br /> the heart of Arunachal Pradesh
                    </motion.p>

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
