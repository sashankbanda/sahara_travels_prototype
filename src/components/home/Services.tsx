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

    // Map scroll progress (0..1) to index (0..total-1)
    const total = serviceItems.length;
    const rawIndex = useTransform(scrollYProgress, [0, 1], [0, total - 1]);

    // Spring physics for smooth scroll
    const currentIndex = useSpring(rawIndex, {
        stiffness: 40,
        damping: 15,
        mass: 1.2
    });

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-[#050505] text-white">
            <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden perspective-[1000px]">

                {/* Header */}
                <div className="absolute top-24 z-10 text-center pointer-events-none">
                    <span className="text-primary text-[10px] uppercase tracking-[0.4em] block mb-4 opacity-60">Services</span>
                    <h2 className="font-serif text-4xl text-white/90">Curated for You</h2>
                </div>

                {/* 3D Carousel Container */}
                <div className="relative w-full h-[600px] flex justify-center items-center perspective-[1500px] transform-style-3d">
                    {serviceItems.map((item, i) => (
                        <CoverflowCard
                            key={item.id}
                            item={item}
                            index={i}
                            currentIndex={currentIndex}
                            total={total}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const CoverflowCard = ({ item, index, currentIndex, total }: { item: any, index: number, currentIndex: MotionValue<number>, total: number }) => {

    // 3D Rotation: Subtle rotation for depth, but clean
    const rotateY = useTransform(currentIndex, (v) => {
        const diff = index - v;
        if (Math.abs(diff) < 0.1) return 0;
        if (diff < 0) return 30; // Reduce excessive rotation
        return -30;
    });

    // Spacing: NO OVERLAP constraint
    // Card width is 500px.
    // To avoid overlap, we need at least 500px spacing + margin.
    // Let's use 550px stride.
    const x = useTransform(currentIndex, (v) => {
        const diff = index - v;
        return diff * 550;
    });

    // Depth: reduced pushback
    const z = useTransform(currentIndex, (v) => {
        const diff = Math.abs(index - v);
        return -diff * 100; // Minimal Z depth to keep them sized similarly
    });

    // Scale: "Make bigger ... dont compress ... fix shrinking"
    // We keep scale almost constant, just a tiny bit smaller for side focus
    const scale = useTransform(currentIndex, (v) => {
        const diff = Math.abs(index - v);
        return 1 - Math.min(diff * 0.05, 0.05); // Min scale 0.95 (barely shrinks)
    });

    const opacity = useTransform(currentIndex, (v) => {
        const diff = Math.abs(index - v);
        if (diff < 0.5) return 1;
        return 1 - Math.min(diff * 0.5, 0.8); // Fast fade for distant cards to focus attention
    });

    return (
        <motion.div
            style={{
                x,
                z,
                rotateY,
                scale,
                opacity,
                zIndex: useTransform(currentIndex, v => 100 - Math.round(Math.abs(index - v)))
            }}
            // Aspect ratio changed to [16/10] (Landscape) for "shorter" images
            className="absolute w-[500px] aspect-[16/10] bg-zinc-900 rounded-[32px] shadow-2xl origin-center border border-white/5"
        >
            <Link to={item.link} className="block w-full h-full relative overflow-hidden group rounded-[32px]">
                <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/0" />
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex flex-col justify-end p-8 text-center items-center backdrop-blur-[0px]">
                    <h3 className="font-serif text-3xl text-white mb-3 drop-shadow-md tracking-tight">{item.title}</h3>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/90 font-medium">Explore</span>
                </div>
            </Link>
        </motion.div>
    );
};
