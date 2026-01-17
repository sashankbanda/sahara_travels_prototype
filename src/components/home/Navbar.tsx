import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MobileMenu } from "./MobileMenu";
import { InquiryDialog } from "@/components/shared/InquiryDialog";

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
                        href="/"
                        className="text-lg md:text-xl font-serif text-white tracking-widest uppercase relative z-10 flex items-center gap-3"
                    >
                        <img
                            src="/images/home/header_logo.png"
                            alt="Sahara Logo"
                            className="h-7 w-auto object-contain"
                        />
                        <span>
                            <span className="font-bold">Sahara</span> <span className="font-light opacity-90">Journeys</span><span className="text-primary opacity-80 group-hover:opacity-100 transition-opacity">.</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {[
                            { label: "Home", path: "/" },
                            { label: "Tours", path: "/tours" },
                            { label: "Sightseeing", path: "/sightseeing" },
                            { label: "Taxi", path: "/transfers" }
                        ].map((item) => (
                            <Link
                                key={item.label}
                                href={item.path}
                                className="text-[10px] uppercase tracking-[0.2em] text-white/90 hover:text-white transition-all duration-500 font-medium relative overflow-hidden group/link"
                            >
                                <span className="relative z-10">{item.label}</span>
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

                        {/* Desktop Call Icon */}
                        <a href="tel:+910000000000" className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 group/phone">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover/phone:opacity-100"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        </a>

                        {/* CTA */}
                        <InquiryDialog>
                            <button className="hidden lg:block bg-white text-black hover:bg-primary transition-all duration-500 px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(253,186,49,0.4)]">
                                Plan Trip
                            </button>
                        </InquiryDialog>
                    </div>
                </motion.div>
            </motion.header>

            {/* Fixed Mobile WhatsApp Text/Button if needed, though usually handled by floating widget or similar. 
                For now, we'll keep the design clean and rely on the Mobile Menu or a separate floating FAB if requested. 
                The user asked for "Add fixed WhatsApp button on mobile", which suggests a FAB. */}


            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
};
