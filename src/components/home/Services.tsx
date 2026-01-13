import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const serviceItems = [
    {
        id: "tours",
        title: "Curated Tours",
        description: "Immersive journeys through the hidden valleys.",
        image: "/images/home/tours.png",
        link: "/tours",
        colSpan: "md:col-span-8",
        height: "h-[500px]",
    },
    {
        id: "sightseeing",
        title: "Sightseeing",
        description: "Witness the timeless beauty of monasteries and mist.",
        image: "/images/home/sightseeing.png",
        link: "/sightseeing",
        colSpan: "md:col-span-4",
        height: "h-[500px]",
    },
    {
        id: "transfers",
        title: "Luxury Transfers",
        description: "Travel in uncompromised comfort.",
        image: "/images/home/transfers.png",
        link: "/transfers",
        colSpan: "md:col-span-5",
        height: "h-[450px]",
    },
    {
        id: "private-duty",
        title: "Private Interaction",
        description: "Dedicated service for the discerning traveler.",
        image: "/images/home/privateduty.png",
        link: "/contact",
        colSpan: "md:col-span-7",
        height: "h-[450px]",
    },
];

export const Services = () => {
    return (
        <section className="py-24 bg-[#0a0a0a] text-white">
            <div className="container mx-auto px-6">
                <div className="mb-20 px-4">
                    <span className="text-primary text-xs uppercase tracking-[0.2em]">Our Services</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-4">
                    {serviceItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`relative group overflow-hidden rounded-sm ${item.colSpan} ${item.height}`}
                        >
                            <Link to={item.link} className="block w-full h-full relative cursor-none md:cursor-pointer">
                                {/* Image */}
                                <div className="absolute inset-0 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-75 group-hover:brightness-90"
                                    />
                                </div>

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="font-serif text-3xl mb-3 text-white">{item.title}</h3>
                                    <p className="text-white/70 font-light text-lg mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-sm">
                                        {item.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-primary text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                        <span>Explore</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
