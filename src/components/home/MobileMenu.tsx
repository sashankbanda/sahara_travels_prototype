import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ArrowRight, ChevronDown } from "lucide-react";
import { useEffect } from "react";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const menuVariants = {
        closed: {
            opacity: 0,
            y: "-100%",
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] as any,
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] as any,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const linkVariants = {
        closed: { opacity: 0, y: 30 },
        open: { opacity: 1, y: 0 }
    };

    const links = ["Home", "Tours", "Sightseeing", "Transfers"];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={menuVariants}
                    className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <nav className="flex flex-col items-center gap-8">
                        {links.map((item) => (
                            <motion.div key={item} variants={linkVariants}>
                                <Link
                                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                    onClick={onClose}
                                    className="relative text-4xl md:text-5xl font-serif text-white/80 hover:text-white transition-colors tracking-wide group"
                                >
                                    {item}
                                    <span className="absolute left-full top-1/2 -translate-y-1/2 ml-4">
                                        <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    <motion.div
                        variants={linkVariants}
                        className="mt-16 flex flex-col items-center gap-6"
                    >
                        {/* Language Dropdown */}
                        <div className="flex items-center gap-2 text-white/70 hover:text-white cursor-pointer transition-colors text-sm uppercase font-medium tracking-widest">
                            <span>EN</span>
                            <ChevronDown className="w-3 h-3" />
                        </div>

                        <button className="text-black bg-white hover:bg-primary transition-all duration-500 px-10 py-3 rounded-full text-xs uppercase tracking-[0.25em] font-bold shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(253,186,49,0.4)]">
                            Plan Trip
                        </button>
                    </motion.div>

                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 text-xs tracking-[0.3em] font-mono whitespace-nowrap">
                        SAHARA TRAVELS © 2026
                    </div>
                </motion.div >
            )}
        </AnimatePresence >
    );
};
