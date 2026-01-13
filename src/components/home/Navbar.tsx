import { useState, useEffect } from "react";
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
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled ? "py-4" : "py-6"
            )}
        >
            <div className="container mx-auto px-6 flex justify-center">
                <div
                    className={cn(
                        "flex items-center justify-between px-8 py-3 rounded-2xl transition-all duration-500",
                        scrolled
                            ? "bg-black/40 backdrop-blur-xl border border-white/10 w-full max-w-5xl shadow-2xl"
                            : "bg-transparent w-full border border-transparent"
                    )}
                >
                    {/* Brand */}
                    <Link
                        to="/"
                        className="text-2xl font-serif text-white tracking-widest uppercase font-bold"
                    >
                        Sahara<span className="text-primary">.</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-sm uppercase tracking-widest text-white/80 hover:text-primary transition-colors">Home</Link>
                        <Link to="/tours" className="text-sm uppercase tracking-widest text-white/80 hover:text-primary transition-colors">Tours</Link>
                        <Link to="/sightseeing" className="text-sm uppercase tracking-widest text-white/80 hover:text-primary transition-colors">Sightseeing</Link>
                        <Link to="/transfers" className="text-sm uppercase tracking-widest text-white/80 hover:text-primary transition-colors">Transfers</Link>
                    </nav>

                    {/* CTA */}
                    <button className="bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 text-white backdrop-blur-md px-6 py-2 rounded-full border border-white/10 transition-all duration-300 text-sm tracking-widest uppercase">
                        Enquire
                    </button>
                </div>
            </div>
        </motion.header>
    );
};
