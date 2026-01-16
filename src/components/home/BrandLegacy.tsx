import { motion } from "framer-motion";
import BlurText from "@/components/animate-ui/BlurText";

export const BrandLegacy = () => {
    return (
        <section className="py-20 md:py-40 text-white overflow-hidden relative">
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
                        <BlurText
                            text="&quot;We don't just guide you; we welcome you home.&quot;"
                            className="font-serif text-3xl md:text-5xl lg:text-6xl text-white/90 leading-[1.2] mb-8 md:mb-12 block"
                            delay={40}
                            animateBy="words"
                        />

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-12"
                        >
                            <p className="text-white/60 text-sm leading-[2.5] font-light tracking-wide">
                                For over two decades, we have walked the paths of Arunachal Pradesh not as guides, but as neighbors, friends, and custodians of a timeless heritage.
                            </p>
                            <p className="text-white/60 text-sm leading-[2.5] font-light tracking-wide">
                                Every journey with Sahara is verified by locals and touched by silence. It is an invitation to slow down and listen to the mountains.
                            </p>
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
};
