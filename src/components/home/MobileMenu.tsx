import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";
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
                                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                    onClick={onClose}
                                    className="text-4xl md:text-5xl font-serif text-white/80 hover:text-white transition-colors tracking-wide flex items-center gap-4 group"
                                >
                                    {item}
                                    <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    <motion.div
                        variants={linkVariants}
                        className="mt-16"
                    >
                        <button className="text-black bg-white hover:bg-white/90 px-10 py-4 rounded-full transition-all duration-500 text-sm uppercase tracking-[0.25em] font-bold hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            Enquire Now
                        </button>
                    </motion.div>

                    <div className="absolute bottom-12 text-white/20 text-xs tracking-[0.3em] font-mono">
                        SAHARA TRAVELS © 2026
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
