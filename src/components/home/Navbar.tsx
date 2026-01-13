import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
                scrolled ? "py-4" : "py-8"
            )}
        >
            <div className="container mx-auto px-6 flex justify-center">
                <div
                    className={cn(
                        "flex items-center justify-between px-8 py-4 rounded-full transition-all duration-500 border",
                        scrolled
                            ? "bg-black/60 backdrop-blur-2xl border-white/10 w-full max-w-5xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]"
                            : "bg-transparent w-full border-transparent"
                    )}
                >
                    {/* Brand */}
                    <Link
                        to="/"
                        className="text-2xl font-serif text-white tracking-widest uppercase font-bold relative group z-10"
                    >
                        Sahara<span className="text-primary transition-opacity group-hover:opacity-50">.</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-10">
                        {["Home", "Tours", "Sightseeing", "Transfers"].map((item) => (
                            <Link
                                key={item}
                                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                className="text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-white transition-all duration-300 hover:tracking-[0.25em]"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA */}
                    <button className="bg-white text-black hover:bg-primary hover:text-black px-8 py-3 rounded-full border border-transparent transition-all duration-500 text-[10px] uppercase tracking-[0.2em] font-medium z-10">
                        Enquire
                    </button>
                </div>
            </div>
        </motion.header>
    );
};
