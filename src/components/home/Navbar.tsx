import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

export const Navbar = () => {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    // Smooth interpolations
    const height = useTransform(scrollY, [0, 200], ["7rem", "5rem"]);
    const backgroundColor = useTransform(scrollY, [0, 200], ["rgba(0,0,0,0)", "rgba(0,0,0,0.4)"]);
    const backdropBlur = useTransform(scrollY, [0, 200], ["0px", "12px"]);
    const borderOpacity = useTransform(scrollY, [0, 200], [0, 0.1]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        // Logic for changing logo or text colors if needed, but keeping it smooth
        if (latest > 100 && !isScrolled) setIsScrolled(true);
        if (latest <= 100 && isScrolled) setIsScrolled(false);
    });

    return (
        <motion.header
            style={{
                backgroundColor,
                backdropFilter: useTransform(backdropBlur, b => `blur(${b})`),
                borderBottomColor: useTransform(borderOpacity, o => `rgba(255,255,255,${o})`)
            }}
            className="fixed top-0 left-0 right-0 z-50 border-b border-white/0 flex flex-col justify-center transition-colors duration-0"
        >
            <motion.div style={{ height }} className="container mx-auto px-6 flex items-center justify-between">
                {/* Brand */}
                <Link
                    to="/"
                    className="text-2xl font-serif text-white tracking-widest uppercase font-bold relative group z-10"
                >
                    Sahara<span className="text-primary transition-opacity group-hover:opacity-50">.</span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-12">
                    {["Home", "Tours", "Sightseeing", "Transfers"].map((item) => (
                        <Link
                            key={item}
                            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                            className="text-[10px] uppercase tracking-[0.2em] text-white/70 hover:text-white transition-all duration-500"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                {/* CTA */}
                <button className="text-white hover:text-white/70 px-6 py-2 rounded-full border border-white/20 transition-all duration-500 text-[9px] uppercase tracking-[0.25em] font-medium hover:border-white/50">
                    Enquire
                </button>
            </motion.div>
        </motion.header>
    );
};
