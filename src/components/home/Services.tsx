import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-media-query";

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
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (!isDesktop) return <ServicesMobile />;
    return <ServicesDesktop />;
};

const ServicesMobile = () => {
    return (
        <section className="py-24 bg-[#0a0a0a] text-white overflow-hidden">
            <div className="container mx-auto px-6 mb-12">
                <span className="text-primary text-[10px] uppercase tracking-[0.3em] block mb-4 opacity-50">Our Services</span>
                <h2 className="font-serif text-3xl text-white/90">Curated for You</h2>
            </div>
            <div className="flex overflow-x-auto gap-4 px-6 pb-8 snap-x snap-mandatory no-scrollbar">
                {serviceItems.map((item) => (
                    <div key={item.id} className="min-w-[85vw] snap-center">
                        <Link to={item.link} className="block relative w-full aspect-[3/4] overflow-hidden rounded-[20px] bg-zinc-900">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="absolute bottom-0 left-0 p-8">
                                <h3 className="font-serif text-2xl text-white mb-2">{item.title}</h3>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

const ServicesDesktop = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    // Short deliberate scroll range
    const x = useTransform(scrollYProgress, [0, 1], ["25%", "-75%"]);
    const smoothX = useSpring(x, { stiffness: 40, damping: 20, mass: 0.8 });

    return (
        <section ref={targetRef} className="relative h-[200vh] bg-[#050505] text-white perspective-[1000px]">
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

                {/* Header */}
                <div className="container mx-auto px-20 absolute top-24 left-0 right-0 z-10 pointer-events-none">
                    <div className="flex items-end justify-between">
                        <div>
                            <span className="text-primary text-[10px] uppercase tracking-[0.4em] block mb-4 opacity-60">Services</span>
                            <h2 className="font-serif text-4xl text-white/90">Curated for You</h2>
                        </div>
                    </div>
                </div>

                {/* 3D Carousel Track */}
                <div className="w-full pl-[50vw] flex items-center perspective-[2000px]">
                    <motion.div style={{ x: smoothX }} className="flex gap-24 items-center preserve-3d">
                        {serviceItems.map((item, index) => (
                            <ServiceCard3D key={item.id} item={item} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const ServiceCard3D = ({ item }: { item: any }) => {
    return (
        <div className="relative group w-[340px] md:w-[400px] shrink-0 transition-transform duration-500">
            <Link to={item.link} className="block relative w-full aspect-[9/13] overflow-hidden bg-zinc-900 rounded-[4px] shadow-2xl">
                {/* Image */}
                <div className="absolute inset-0 transition-all duration-700 ease-out group-hover:scale-105">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700 grayscale-[0.2] group-hover:grayscale-0"
                    />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-60" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-center items-center">
                    <h3 className="font-serif text-3xl text-white mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {item.title}
                    </h3>
                    <div className="w-8 h-[1px] bg-white/30 mb-4 group-hover:w-16 transition-all duration-500" />
                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        Explore
                    </span>
                </div>
            </Link>
        </div>
    );
};
