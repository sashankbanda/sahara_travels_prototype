import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MobileMenu } from "./MobileMenu";

export const Navbar = () => {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
    const isLaptop = useMediaQuery("(min-width: 1025px) and (max-width: 1440px)");

    // Premium cinematic scroll effects
    const targetWidth = isMobile ? "92%" : (isTablet ? "85%" : (isLaptop ? "75%" : "60%"));
    const width = useTransform(scrollY, [0, 150], ["100%", targetWidth]);
    const y = useTransform(scrollY, [0, 150], [0, 24]);
    const borderRadius = useTransform(scrollY, [0, 150], ["0px", "9999px"]);
    const backgroundColor = useTransform(scrollY, [0, 150], ["rgba(0, 0, 0, 0)", "rgba(255, 255, 255, 0.05)"]);
    const backdropBlur = useTransform(scrollY, [0, 150], ["0px", "16px"]);
    const borderColor = useTransform(scrollY, [0, 150], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]);
    const shadow = useTransform(scrollY, [0, 150], ["none", "0 10px 40px -10px rgba(0, 0, 0, 0.3)"]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50 && !isScrolled) setIsScrolled(true);
        if (latest <= 50 && isScrolled) setIsScrolled(false);
    });

    return (
        <>
            <motion.header
                className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
            >
                <motion.div
                    style={{
                        width,
                        y,
                        borderRadius,
                        backgroundColor,
                        backdropFilter: useTransform(backdropBlur, b => `blur(${b})`),
                        borderColor,
                        boxShadow: shadow,
                    }}
                    className="pointer-events-auto px-6 md:px-10 py-2 flex items-center justify-between border transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group hover:bg-white/10"
                >
                    {/* Brand */}
                    <Link
                        to="/"
                        className="text-2xl font-serif text-white tracking-[0.1em] uppercase font-bold relative z-10 flex items-center gap-3"
                    >
                        <img
                            src="/images/home/header_logo.png"
                            alt="Sahara Logo"
                            className="h-8 w-auto object-contain"
                        />
                        <span>
                            Sahara<span className="text-primary opacity-80 group-hover:opacity-100 transition-opacity">.</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-10">
                        {["Home", "Tours", "Sightseeing", "Transfers"].map((item) => (
                            <Link
                                key={item}
                                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                className="text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-white transition-all duration-500 font-medium relative overflow-hidden group/link"
                            >
                                <span className="relative z-10">{item}</span>
                                <motion.span
                                    className="absolute bottom-0 left-0 w-full h-[1px] bg-primary origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500 ease-out"
                                />
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        {/* Mobile/Tablet Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden text-white hover:text-primary transition-colors p-1"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* CTA */}
                        <button className="hidden lg:block text-white hover:text-black hover:bg-white px-7 py-2.5 rounded-full border border-white/20 transition-all duration-500 text-[10px] uppercase tracking-[0.25em] font-semibold hover:border-white shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                            Enquire
                        </button>
                    </div>
                </motion.div>
            </motion.header>

            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
};
