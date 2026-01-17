"use client";
import { useEffect, useRef, useState, useMemo } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';

interface TravelScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
}

const FRAME_COUNT = 240;
const IMAGES_FOLDER = '/travel_sequence';

export default function TravelScrollCanvas({ scrollYProgress }: TravelScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        const loadImages = async () => {
            // Create array of promises for image loading
            const loadPromises = Array.from({ length: FRAME_COUNT }, (_, i) => {
                return new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    // Filename format: ezgif-frame-001.jpg
                    const frameIndex = (i + 1).toString().padStart(3, '0');
                    img.src = `${IMAGES_FOLDER}/ezgif-frame-${frameIndex}.jpg`;

                    img.onload = () => {
                        loadedCount++;
                        resolve(img);
                    };
                    img.onerror = () => {
                        console.error(`Failed to load frame ${frameIndex}`);
                        // Resolve with a placeholder or empty image to prevent crashing
                        resolve(new Image());
                    };
                });
            });

            try {
                const results = await Promise.all(loadPromises);
                setImages(results);
                setIsLoaded(true);
            } catch (error) {
                console.error("Error loading sequence images", error);
            }
        };

        loadImages();
    }, []);

    // Draw a specific frame
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = images[index];

        // Canvas sizing logic (same as before)
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

    // Update canvas on scroll
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded || images.length === 0) return;
        const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(latest * FRAME_COUNT)
        );
        renderFrame(frameIndex);
    });

    // Draw initial frame when loaded
    useEffect(() => {
        if (isLoaded && images.length > 0) {
            const currentProgress = scrollYProgress.get();
            const frameIndex = Math.min(
                FRAME_COUNT - 1,
                Math.floor(currentProgress * FRAME_COUNT)
            );
            renderFrame(frameIndex);
        }
    }, [isLoaded, images, scrollYProgress]);

    // Handle Resize & Retina Displays
    useEffect(() => {
        const handleResize = () => {
            if (!canvasRef.current) return;
            const canvas = canvasRef.current;
            const dpr = window.devicePixelRatio || 1;

            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;

            const ctx = canvas.getContext('2d');
            if (ctx) ctx.scale(dpr, dpr);

            // Redraw current frame after resize
            if (isLoaded && images.length > 0) {
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
    }, [isLoaded, images, scrollYProgress]);

    return (
        <canvas
            ref={canvasRef}
            className="block w-full h-full object-cover"
            style={{ width: '100%', height: '100%' }}
        />
    );
}
