"use client";
import { useEffect, useRef, useState } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';

interface TravelScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
}

const FRAME_COUNT = 192;
const IMAGES_FOLDER = '/travel_sequence_webp';

export default function TravelScrollCanvas({ scrollYProgress }: TravelScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
    const [isReady, setIsReady] = useState(false);

    // Optimized Image Loading
    useEffect(() => {
        let isMounted = true;

        const loadFrame = (index: number): Promise<HTMLImageElement> => {
            return new Promise((resolve) => {
                const img = new Image();
                const frameIndex = (index + 1).toString().padStart(3, '0');
                img.src = `${IMAGES_FOLDER}/frame-${frameIndex}.webp`;
                img.decoding = 'async'; // Non-blocking decoding

                img.onload = () => resolve(img);
                img.onerror = () => {
                    console.error(`Failed to load frame ${frameIndex}`);
                    resolve(new Image()); // Empty fallback
                };
            });
        };

        const loadChunk = async (start: number, count: number) => {
            if (!isMounted) return;
            const end = Math.min(start + count, FRAME_COUNT);
            const promises: Promise<{ index: number, img: HTMLImageElement }>[] = [];

            for (let i = start; i < end; i++) {
                promises.push(loadFrame(i).then(img => ({ index: i, img })));
            }

            const results = await Promise.all(promises);

            if (isMounted) {
                setImages(prev => {
                    const newImages = [...prev];
                    results.forEach(({ index, img }) => {
                        newImages[index] = img;
                    });
                    return newImages;
                });
            }
        };

        const initLoad = async () => {
            // 1. Priority Load: First 30 frames (enough for initial scroll)
            await loadChunk(0, 30);
            if (isMounted) setIsReady(true); // Enable rendering quickly

            // 2. Background Load: Rest of the frames in chunks
            // Use slightly delayed chunks to not freeze the thread immediately after initial load
            for (let i = 30; i < FRAME_COUNT; i += 50) {
                if (!isMounted) break;
                // Small delay between chunks to yield to main thread
                await new Promise(r => setTimeout(r, 100));
                await loadChunk(i, 50);
            }
        };

        initLoad();

        return () => {
            isMounted = false;
        };
    }, []);

    // Draw a specific frame
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const img = images[index];

        if (!canvas || !img) return; // Skip if frame not loaded yet

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Skip if image isn't fully loaded or is a fallback empty image with no width
        if (!img.complete || img.naturalWidth === 0) return;

        const canvasWidth = canvas.width / window.devicePixelRatio;
        const canvasHeight = canvas.height / window.devicePixelRatio;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Aspect ratios
        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgRatio;
            offsetX = 0;
            offsetY = (canvasHeight - drawHeight) / 2;
        } else {
            drawWidth = canvasHeight * imgRatio;
            drawHeight = canvasHeight;
            offsetX = (canvasWidth - drawWidth) / 2;
            offsetY = 0;
        }

        ctx.filter = 'brightness(0.9) contrast(1.1)';
        ctx.drawImage(
            img,
            0, 0, img.width, img.height,
            offsetX, offsetY, drawWidth, drawHeight
        );
    };

    const rafId = useRef<number | null>(null);

    // Update canvas on scroll
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isReady) return;

        if (rafId.current !== null) return;

        rafId.current = requestAnimationFrame(() => {
            const frameIndex = Math.min(
                FRAME_COUNT - 1,
                Math.floor(latest * FRAME_COUNT)
            );
            renderFrame(frameIndex);
            rafId.current = null;
        });
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (!canvasRef.current) return;
            const canvas = canvasRef.current;
            const dpr = window.devicePixelRatio || 1;

            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;

            const ctx = canvas.getContext('2d');
            if (ctx) ctx.scale(dpr, dpr);

            // Redraw current frame
            if (isReady) {
                const currentProgress = scrollYProgress.get();
                const frameIndex = Math.min(
                    FRAME_COUNT - 1,
                    Math.floor(currentProgress * FRAME_COUNT)
                );
                renderFrame(frameIndex);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [isReady, images, scrollYProgress]);

    // Initial Render when ready
    useEffect(() => {
        if (isReady && images[0]) {
            renderFrame(0);
        }
    }, [isReady]);

    return (
        <canvas
            ref={canvasRef}
            className="block w-full h-full object-cover"
            style={{ width: '100%', height: '100%' }}
        />
    );
}
