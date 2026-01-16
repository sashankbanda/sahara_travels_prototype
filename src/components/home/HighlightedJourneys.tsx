import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import BlurText from "@/components/animate-ui/BlurText";

export const HighlightedJourneys = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Reduced parallax
    const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

    return (
        <section ref={ref} className="py-12 md:py-32 text-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Image Side - Reduced Height (~60% of viewport) */}
                    <div className="w-full lg:w-[55%] relative h-[40vh] md:h-[60vh] overflow-hidden rounded-[2px] mb-8 lg:mb-0">
                        <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                            <img
                                src="/images/home/hero.png"
                                alt="Signature Journey"
                                className="w-full h-full object-cover filter grayscale-[10%] opacity-80"
                            />
                            <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                        </motion.div>
                    </div>

                    {/* Text Side */}
                    <div className="w-full lg:w-[45%] px-4 lg:pl-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 1 }}
                        >

                            <BlurText
                                text="Signature Experience"
                                className="text-primary/70 text-[10px] uppercase tracking-[0.4em] mb-8 block"
                                delay={50}
                                animateBy="words"
                            />

                            <BlurText
                                text="The Mist & The Monastery"
                                className="font-serif text-4xl lg:text-5xl text-white mb-8 leading-[1.1] block"
                                delay={50}
                                animateBy="words"
                            />

                            <div className="w-8 h-px bg-white/20 mb-8" />

                            <p className="text-white/50 text-base leading-loose mb-12 max-w-sm font-light">
                                A 7-day immersive journey through the sacred valleys of Tawang.
                                Where the clouds descend to meet the prayers.
                            </p>

                            <button className="group relative flex items-center gap-6 text-white uppercase tracking-[0.2em] text-[10px] font-medium opacity-80 hover:opacity-100 transition-opacity">
                                <span>View Itinerary</span>
                                <ArrowRight className="w-4 h-4 text-white/50 transition-transform duration-500 group-hover:translate-x-2" />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
