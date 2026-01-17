import { motion } from "framer-motion";
import BlurText from "@/components/animate-ui/BlurText";
import CircularText from "@/components/CircularText";
import { useMediaQuery } from "@/hooks/use-media-query";

export const BrandLegacy = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isTablet = useMediaQuery("(max-width: 1024px)");

    // Radius values: Mobile ~50px, Tablet ~60px, Desktop ~70px
    const radius = isMobile ? 50 : (isTablet ? 60 : 70);

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
                        className="md:w-1/4 pt-4 flex justify-center md:justify-start"
                    >
                        <CircularText
                            text="SINCE 1998 * SAHARA JOURNEYS *"
                            spinDuration={20}
                            radius={radius}
                            onHover="speedUp"
                            className="text-[10px] md:text-xs text-primary/80"
                        />
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
