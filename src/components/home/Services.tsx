import { motion } from "framer-motion";
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
    // Duplicate items for seamless loop
    const marqueeItems = [...serviceItems, ...serviceItems, ...serviceItems];

    return (
        <section className="relative py-32 bg-[#050505] text-white overflow-hidden">

            {/* Header */}
            <div className="container mx-auto px-6 mb-20 text-center">
                <span className="text-primary text-[10px] uppercase tracking-[0.4em] block mb-4 opacity-60">Services</span>
                <h2 className="font-serif text-4xl md:text-5xl text-white/90">Curated for You</h2>
            </div>

            {/* Infinite Marquee Track */}
            <div className="relative w-full overflow-hidden">
                {/* Gradient Masks for smooth fade edges */}
                <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-8 w-max px-8"
                    animate={{ x: "-33.33%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30, // Adjust speed here
                        repeatType: "loop"
                    }}
                >
                    {marqueeItems.map((item, index) => (
                        <ServiceCard key={`${item.id}-${index}`} item={item} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const ServiceCard = ({ item }: { item: typeof serviceItems[0] }) => {
    return (
        <Link
            to={item.link}
            className="group relative block w-[400px] md:w-[500px] aspect-[16/10] overflow-hidden rounded-[2px] bg-zinc-900 border border-white/5"
        >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10" />

            <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale-[20%] group-hover:grayscale-0"
            />

            <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-primary text-[9px] uppercase tracking-[0.3em] mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        Explore
                    </span>
                    <h3 className="font-serif text-3xl text-white mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm font-light max-w-[280px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {item.description}
                    </p>
                </div>
            </div>
        </Link>
    );
};
