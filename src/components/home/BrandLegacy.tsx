import { motion } from "framer-motion";

export const BrandLegacy = () => {
    return (
        <section className="py-32 bg-[#0a0a0a] text-white relative">
            <div className="container mx-auto px-6 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row gap-16 items-start"
                >
                    <div className="w-full md:w-1/3">
                        <span className="text-primary text-xs uppercase tracking-[0.2em] block mb-6">Our Legacy</span>
                        <h2 className="font-serif text-4xl md:text-5xl leading-tight text-white/90">
                            Born from the silence of the mountains.
                        </h2>
                    </div>

                    <div className="w-full md:w-2/3 md:pt-16">
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-white/70">
                            Sahara Journeys is not just a travel company. It is a gateway to the unseen.
                            We curate experiences that linger in the soul long after the journey ends.
                            With deep roots in Arunachal Pradesh, we offer more than paths; we offer
                            connection—to the land, to its people, and to yourself.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
