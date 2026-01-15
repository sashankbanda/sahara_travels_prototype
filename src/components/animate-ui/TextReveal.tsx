"use client";
import { motion, useInView, useAnimation, Variant } from "framer-motion";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

type TextRevealProps = {
    text: string;
    className?: string;
    tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
    staggerDelay?: number;
    duration?: number;
    once?: boolean;
};

export const TextReveal = ({
    text,
    className,
    tag = "h2",
    staggerDelay = 0.02,
    duration = 0.5,
    once = true,
}: TextRevealProps) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once });

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [isInView, controls]);

    const words = text.split(" ");

    const container: Variant = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
            },
        },
    };

    const child: Variant = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: "blur(10px)",
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: duration,
                ease: [0.2, 0.65, 0.3, 0.9],
            },
        },
    };

    const Component = motion[tag] as any; // Safe cast for dynamic motion component

    return (
        <Component
            ref={ref}
            variants={container}
            initial="hidden"
            animate={controls}
            className={cn("inline-block", className)}
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    variants={child}
                    className="inline-block mr-[0.2em]"
                >
                    {word}
                </motion.span>
            ))}
        </Component>
    );
};
