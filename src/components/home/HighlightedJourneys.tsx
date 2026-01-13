import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export const HighlightedJourneys = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Heavier, slower parallax
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <section ref={ref} className="py-32 lg:py-48 bg-[#0e0e0e] text-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">

                    {/* Image Side - Larger domination */}
                    <div className="w-full lg:w-[55%] relative h-[600px] lg:h-[900px] overflow-hidden rounded-[4px]">
                        <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                            <img
                                src="/images/home/hero.png" // Reusing hero for refined look
                                alt="Signature Journey"
                                className="w-full h-full object-cover filter grayscale-[20%] contrast-110"
                            />
                            <div className="absolute inset-0 bg-black/10" />
                        </motion.div>
                    </div>

                    {/* Text Side - More white space */}
                    <div className="w-full lg:w-[45%] px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            <span className="text-primary text-xs uppercase tracking-[0.3em] block mb-10">
                                Signature Experience
                            </span>

                            <h2 className="font-serif text-5xl lg:text-7xl text-white mb-10 leading-[1.1]">
                                The Mist <br /> & The Monastery
                            </h2>

                            <p className="text-white/60 text-lg lg:text-xl leading-relaxed mb-16 max-w-md font-light">
                                A 7-day immersive journey through the sacred valleys of Tawang.
                                Witness the morning prayers, walk the ancient paths, and find
                                solace in the clouds.
                            </p>

                            <button className="group flex items-center gap-4 text-white hover:text-primary transition-colors uppercase tracking-[0.2em] text-xs font-medium">
                                View Itinerary
                                <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-2" />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
