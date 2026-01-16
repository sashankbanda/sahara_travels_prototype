import { motion } from "framer-motion";
import { MessageCircle, CheckCircle2, Map } from "lucide-react";
import BlurText from "@/components/animate-ui/BlurText";

const steps = [
    {
        id: 1,
        title: "Enquire",
        description: "Send us your dates & preferences on WhatsApp.",
        icon: MessageCircle
    },
    {
        id: 2,
        title: "Confirm",
        description: "Receive a custom plan & pay 30% advance.",
        icon: CheckCircle2
    },
    {
        id: 3,
        title: "Travel",
        description: "Meet your driver & explore the unseen.",
        icon: Map
    }
];

export const ProcessSteps = () => {
    return (
        <section className="py-12 md:py-24 bg-black text-white relative border-t border-white/5">
            <div className="container mx-auto px-6 relative z-10">
                {/* Heading */}
                <div className="text-center mb-16">
                    <BlurText
                        text="How it Works"
                        className="text-primary text-[10px] uppercase tracking-[0.4em] block mb-4 opacity-70"
                        animateBy="words"
                        delay={50}
                    />
                    <BlurText
                        text="Your Journey, Simplified"
                        className="font-serif text-3xl md:text-5xl text-white/90"
                        animateBy="words"
                        delay={50}
                    />
                </div>

                {/* Steps wrapper */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Connecting Line – Desktop */}
                    <div className="hidden md:block absolute top-[3rem] left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />

                    {/* Connecting Line – Mobile */}
                    <div className="md:hidden absolute top-[3rem] left-0 w-[1000px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />

                    {/* Steps */}
                    <div
                        className="
              flex md:grid
              md:grid-cols-3
              gap-4 md:gap-12
              overflow-x-auto md:overflow-visible
              snap-x snap-mandatory
              scrollbar-none
              px-6 md:px-0
              -mx-6 md:mx-0
              pb-8 md:pb-0
            "
                    >
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                className="relative z-10 flex flex-col items-center text-center group min-w-[280px] md:min-w-0 snap-center"
                            >
                                <div className="w-24 h-24 rounded-full bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/50 transition-colors duration-500 shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)]">
                                    <step.icon className="w-8 h-8 text-white/80 group-hover:text-primary transition-colors duration-500" />
                                </div>

                                <h3 className="text-xl font-serif text-white mb-3">
                                    {step.title}
                                </h3>

                                <p className="text-white/50 text-sm font-light leading-relaxed max-w-[200px]">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
