import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStore } from "@/lib/store";
import { MapPin, Clock, IndianRupee, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import BlurText from "@/components/animate-ui/BlurText";
import { MovingBorder } from "@/components/animate-ui/MovingBorder";

export default function Tours() {
    const { packages } = useStore();
    const tours = packages.filter((pkg) => pkg.category === "tours" && pkg.status === "active");

    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />

            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/home/tours.png"
                        alt="Tours Hero"
                        className="w-full h-full object-cover opacity-60"
                        onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&h=900&fit=crop")}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
                </div>

                <div className="relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <BlurText
                            text="Our Experiences"
                            className="text-primary text-xs uppercase tracking-[0.4em] mb-4 block"
                            delay={50}
                            animateBy="words"
                        />
                        <BlurText
                            text="Best Tour Packages"
                            className="font-serif text-3xl md:text-5xl lg:text-7xl mb-6"
                            delay={50}
                            animateBy="words"
                        />
                        <p className="text-white/70 max-w-xl mx-auto font-light text-lg">
                            Enjoy amazing trips to the beautiful valleys of Arunachal Pradesh.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Tours Grid */}
            <section className="py-12 md:py-24 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {tours.map((pkg, index) => (
                            <motion.div
                                key={pkg.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="group relative p-[1.5px] overflow-hidden rounded-sm">
                                    <div className="absolute inset-0">
                                        <MovingBorder duration={10000} rx="5px" ry="5px">
                                            <div className="h-20 w-20 opacity-[0.8] bg-[radial-gradient(hsl(var(--primary))_40%,transparent_60%)] blur-[8px]" />
                                        </MovingBorder>
                                    </div>
                                    <Link to={`/packages/${pkg.id}`} className="relative block bg-zinc-900 overflow-hidden border border-transparent hover:border-transparent transition-colors duration-500 rounded-[2px] h-full w-full">
                                        <div className="relative h-[300px] overflow-hidden">
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500 z-10" />
                                            <img
                                                src={pkg.image}
                                                alt={pkg.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
                                                <h3 className="font-serif text-2xl text-white mb-2">{pkg.title}</h3>
                                                <div className="flex items-center gap-4 text-sm text-white/70">
                                                    <span className="flex items-center gap-1.5">
                                                        <MapPin className="w-3.5 h-3.5 text-primary" />
                                                        {pkg.destination}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Clock className="w-3.5 h-3.5 text-primary" />
                                                        {pkg.duration}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 flex justify-between items-center border-t border-white/5 bg-zinc-900 group-hover:bg-zinc-800/50 transition-colors">
                                            <div className="text-lg font-medium text-primary flex items-center gap-1">
                                                <span className="text-xs text-white/40 font-normal uppercase tracking-wider mr-2">Starting from</span>
                                                <IndianRupee className="w-4 h-4" />
                                                {pkg.price.toLocaleString()}
                                            </div>
                                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-300">
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {tours.length === 0 && (
                        <div className="text-center py-20 text-white/40">
                            <p>No tours available at the moment.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
