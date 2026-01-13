import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export const HighlightedJourneys = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <section ref={ref} className="py-32 bg-[#0e0e0e] text-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">

                    {/* Image Side */}
                    <div className="w-full lg:w-1/2 relative h-[600px] md:h-[800px] overflow-hidden">
                        <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%]">
                            <img
                                src="/images/home/hero.png" // Using hero image again for context, or could define a new one later. Best to reuse high quality asset for now.
                                alt="Signature Journey"
                                className="w-full h-full object-cover filter grayscale-[30%] contrast-125"
                            />
                        </motion.div>
                    </div>

                    {/* Text Side */}
                    <div className="w-full lg:w-1/2 px-4 md:px-12">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-primary text-xs uppercase tracking-[0.2em] block mb-8"
                        >
                            Signature Experience
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="font-serif text-5xl md:text-6xl text-white mb-8 leading-tight"
                        >
                            The Mist <br /> & The Monastery
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-white/60 text-lg leading-relaxed mb-12 max-w-md"
                        >
                            A 7-day immersive journey through the sacred valleys of Tawang.
                            Witness the morning prayers, walk the ancient paths, and find
                            solace in the clouds.
                        </motion.p>

                        <motion.button
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="group flex items-center gap-4 text-white hover:text-primary transition-colors uppercase tracking-[0.2em] text-sm"
                        >
                            View Itinerary
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
};
