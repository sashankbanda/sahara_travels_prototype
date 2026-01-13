import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

export const Hero = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 400]); // Parallax effect
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black text-white">
            {/* Parallax Background */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 z-10" />
                <img
                    src="/images/home/hero.png"
                    alt="Sahara Journeys Hero"
                    className="h-full w-full object-cover scale-110" // Initial scale for gentle movement
                />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl space-y-8"
                >
                    <p className="text-primary text-sm md:text-base uppercase tracking-[0.3em] font-medium">
                        Discover the Undiscovered
                    </p>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl tracking-tight leading-tight">
                        Journey Beyond <br /> the <span className="italic text-white/90">Ordinary</span>
                    </h1>
                    <p className="max-w-xl mx-auto text-white/70 text-lg md:text-xl font-light leading-relaxed">
                        Curated experiences in the heart of Arunachal Pradesh.
                        Where silence speaks and nature leads.
                    </p>

                    <div className="pt-8">
                        <button className="group relative overflow-hidden bg-primary text-black px-10 py-4 rounded-full font-medium tracking-wider uppercase transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 text-sm">
                            Explore Journeys
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="flex flex-col items-center gap-2 text-white/50">
                    <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                    <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>
            </motion.div>
        </section>
    );
};
