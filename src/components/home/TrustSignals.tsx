import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const TrustSignals = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
    const y = useTransform(scrollYProgress, [0.2, 0.4], [30, 0]);

    return (
        <section ref={ref} className="py-40 bg-[#0a0a0a] text-white border-t border-white/5 relative overflow-hidden">
            {/* Subtle background light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div style={{ opacity, y }}>
                        <p className="font-serif text-3xl md:text-5xl leading-[1.6] text-white/80 font-normal">
                            "We don't just guide you; we welcome you home.
                            <span className="text-white/40 block mt-4">
                                Every journey is verified by our locals<br />and touched by silence.
                            </span>"
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="mt-16"
                    >
                        <span className="text-primary text-xs uppercase tracking-[0.3em] opacity-60">
                            Est. 2012 &nbsp;&nbsp;&bull;&nbsp;&nbsp; Arunachal Pradesh
                        </span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
