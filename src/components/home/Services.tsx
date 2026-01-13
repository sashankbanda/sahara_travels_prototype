import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-media-query"; // We'll need to double check if this hook exists or create it

const serviceItems = [
    {
        id: "tours",
        title: "Curated Tours",
        description: "Immersive journeys through the hidden valleys.",
        image: "/images/home/tours.png",
        link: "/tours",
    },
    {
        id: "sightseeing",
        title: "Sightseeing",
        description: "Witness the timeless beauty of monasteries.",
        image: "/images/home/sightseeing.png",
        link: "/sightseeing",
    },
    {
        id: "transfers",
        title: "Luxury Transfers",
        description: "Travel in uncompromised comfort.",
        image: "/images/home/transfers.png",
        link: "/transfers",
    },
    {
        id: "private-duty",
        title: "Private Interaction",
        description: "Dedicated service for the discerning traveler.",
        image: "/images/home/privateduty.png",
        link: "/contact",
    },
];

export const Services = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    // Scroll Progress for the pinned section
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    // Transform scroll progress to horizontal movement
    // We want the cards to scroll fully across.
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    // Smooth out the motion
    const smoothX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.5 });

    if (!isDesktop) {
        return (
            <section className="py-20 bg-[#0a0a0a] text-white">
                <div className="container mx-auto px-6 mb-12">
                    <span className="text-primary text-xs uppercase tracking-[0.2em] block mb-4">Our Services</span>
                    <h2 className="font-serif text-3xl">Expect the Exceptional</h2>
                </div>
                <div className="flex overflow-x-auto gap-4 px-6 pb-8 snap-x snap-mandatory no-scrollbar">
                    {serviceItems.map((item) => (
                        <div key={item.id} className="min-w-[85vw] snap-center">
                            <ServiceCard item={item} />
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section ref={targetRef} className="relative h-[250vh] bg-[#0a0a0a] text-white">
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

                {/* Header */}
                <div className="container mx-auto px-12 mb-12 absolute top-24 left-0 right-0 z-10">
                    <div className="flex items-end justify-between border-b border-white/10 pb-6">
                        <div>
                            <span className="text-primary text-xs uppercase tracking-[0.2em] block mb-2">Our Services</span>
                            <h2 className="font-serif text-4xl">Curated for You</h2>
                        </div>
                        <div className="hidden md:block text-xs uppercase tracking-widest text-white/40">
                            Scroll to Explore
                        </div>
                    </div>
                </div>

                {/* Carousel Track */}
                <motion.div style={{ x: smoothX }} className="flex gap-12 pl-[10%] pr-[10%] items-center">
                    {serviceItems.map((item) => (
                        <div key={item.id} className="flex-shrink-0 w-[400px] lg:w-[450px]">
                            <ServiceCard item={item} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const ServiceCard = ({ item }: { item: any }) => {
    return (
        <Link to={item.link} className="block group relative w-full aspect-[9/13] overflow-hidden rounded-[2rem] bg-zinc-900 border border-white/5 mx-auto">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 filter brightness-[0.7] group-hover:brightness-[0.85]"
                />
                {/* Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                <h3 className="font-serif text-3xl text-white mb-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {item.title}
                </h3>
                <p className="text-white/70 font-light text-sm leading-relaxed mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-500 max-w-xs">
                    {item.description}
                </p>

                <div className="flex items-center gap-3 text-primary text-xs uppercase tracking-widest opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                </div>
            </div>
        </Link>
    );
};
