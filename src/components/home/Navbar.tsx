import { useState } from "react";
import { Link } from "react-router-dom";
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
                        to="/"
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
                                to={item.path}
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
            {isMobile && (
                <a
                    href="https://wa.me/910000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-6 right-6 z-[60] bg-[#25D366] text-white w-12 h-12 flex items-center justify-center rounded-full shadow-2xl hover:bg-[#20bd5a] transition-colors"
                >
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                </a>
            )}

            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
};
