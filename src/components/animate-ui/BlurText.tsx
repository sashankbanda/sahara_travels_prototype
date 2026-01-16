import { motion, Transition, Easing, useScroll } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';

type BlurTextProps = {
    text?: string;
    delay?: number;
    className?: string;
    animateBy?: 'words' | 'letters';
    direction?: 'top' | 'bottom';
    threshold?: number;
    rootMargin?: string;
    animationFrom?: Record<string, string | number>;
    animationTo?: Array<Record<string, string | number>>;
    easing?: Easing | Easing[];
    onAnimationComplete?: () => void;
    stepDuration?: number;
    autoDirection?: boolean; // New prop for auto direction
};

const buildKeyframes = (
    from: Record<string, string | number>,
    steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
    const keys = new Set<string>([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

    const keyframes: Record<string, Array<string | number>> = {};
    keys.forEach(k => {
        keyframes[k] = [from[k], ...steps.map(s => s[k])];
    });
    return keyframes;
};

const BlurText: React.FC<BlurTextProps> = ({
    text = '',
    delay = 200,
    className = '',
    animateBy = 'words',
    direction = 'top',
    threshold = 0.1,
    rootMargin = '0px',
    animationFrom,
    animationTo,
    easing = (t: number) => t,
    onAnimationComplete,
    stepDuration = 0.35,
    autoDirection = true // Default to true as requested
}) => {
    const elements = animateBy === 'words' ? text.split(' ') : text.split('');
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLParagraphElement>(null);

    // Auto-direction logic
    const [computedDirection, setComputedDirection] = useState<'top' | 'bottom'>(direction);
    const { scrollY } = useScroll();
    const lastScrollY = useRef(0);

    useEffect(() => {
        // track scroll direction
        const unsubscribe = scrollY.on("change", (latest) => {
            const diff = latest - lastScrollY.current;
            if (autoDirection && !inView) {
                // If scrolling DOWN (positive diff), content enters from bottom, so we want it to move 'top' (fade up)
                // Default 'top' in this component means y: -50 -> 0 (fade down?) based on user code provided.
                // Let's re-verify user code logic in a second.
                // User code: direction === 'top' ? y: -50 (starts above) -> y: 5 (overshoot) -> y: 0. This is "fade down".
                // User code: direction === 'bottom' ? y: 50 (starts below) -> y: -5 -> y: 0. This is "fade up".

                // So:
                // Scrolling DOWN -> New content appears at BOTTOM. It should rise UP. So we need 'bottom' logic (start y=50).
                // Scrolling UP -> New content appears at TOP. It should drop DOWN. So we need 'top' logic (start y=-50).

                if (diff > 0) {
                    setComputedDirection('bottom');
                } else if (diff < 0) {
                    setComputedDirection('top');
                }
            }
            lastScrollY.current = latest;
        });
        return () => unsubscribe();
    }, [scrollY, autoDirection, inView]);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            { threshold, rootMargin }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    const defaultFrom = useMemo(
        () =>
            computedDirection === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
        [computedDirection]
    );

    const defaultTo = useMemo(
        () => [
            {
                filter: 'blur(5px)',
                opacity: 0.5,
                y: computedDirection === 'top' ? 5 : -5
            },
            { filter: 'blur(0px)', opacity: 1, y: 0 }
        ],
        [computedDirection]
    );

    const fromSnapshot = animationFrom ?? defaultFrom;
    const toSnapshots = animationTo ?? defaultTo;

    const stepCount = toSnapshots.length + 1;
    const totalDuration = stepDuration * (stepCount - 1);
    const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

    return (
        <p ref={ref} className={`blur-text ${className} flex flex-wrap`}>
            {elements.map((segment, index) => {
                const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

                const spanTransition: Transition = {
                    duration: totalDuration,
                    times,
                    delay: (index * delay) / 1000,
                    ease: easing
                };

                return (
                    <motion.span
                        key={index}
                        initial={fromSnapshot}
                        animate={inView ? animateKeyframes : fromSnapshot}
                        transition={spanTransition}
                        onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
                        style={{
                            display: 'inline-block',
                            willChange: 'transform, filter, opacity'
                        }}
                    >
                        {segment === ' ' ? '\u00A0' : segment}
                        {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
                    </motion.span>
                );
            })}
        </p>
    );
};

export default BlurText;
