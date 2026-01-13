import { motion } from "framer-motion";

export const BrandLegacy = () => {
    return (
        <section className="py-40 bg-[#080808] text-white overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl relative">

                <div className="flex flex-col md:flex-row gap-16 md:gap-32 items-start">
                    {/* Asymmetric Left: Date */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                        className="md:w-1/4 pt-4"
                    >
                        <span className="block text-primary/40 text-[9px] uppercase tracking-[0.4em] mb-4">
                            Since 1998
                        </span>
                        <div className="h-[1px] w-12 bg-white/10" />
                    </motion.div>

                    {/* Asymmetric Right: Content */}
                    <div className="md:w-3/4">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.2 }}
                            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white/90 leading-[1.2] mb-12"
                        >
                            "We don't just guide you; <br /> we welcome you home."
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-12"
                        >
                            <p className="text-white/60 text-sm leading-loose font-light">
                                For over two decades, we have walked the paths of Arunachal Pradesh not as guides, but as neighbors, friends, and custodians of a timeless heritage.
                            </p>
                            <p className="text-white/60 text-sm leading-loose font-light">
                                Every journey with Sahara is verified by locals and touched by silence. It is an invitation to slow down and listen to the mountains.
                            </p>
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
};
