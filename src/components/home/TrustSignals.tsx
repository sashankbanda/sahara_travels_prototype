import { motion } from "framer-motion";

export const TrustSignals = () => {
    return (
        <section className="py-32 bg-[#0a0a0a] text-white border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="font-serif text-3xl md:text-4xl leading-relaxed text-white/80"
                    >
                        "With over a decade of local expertise, we don't just guide you; we welcome you home.
                        Every journey consists of human-led confirmations, verified paths, and
                        unwavering attention to detail."
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="mt-12 flex justify-center gap-12"
                    >
                        <div className="text-center">
                            <span className="block text-3xl font-light text-primary mb-2">12+</span>
                            <span className="text-xs uppercase tracking-widest text-white/40">Years Experience</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-3xl font-light text-primary mb-2">100%</span>
                            <span className="text-xs uppercase tracking-widest text-white/40">Local Team</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
