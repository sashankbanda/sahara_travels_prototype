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

    // Update canvas on scroll
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!canvasRef.current || !isLoaded || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Calculate current frame index (0 to 239)
        // Clamp to ensure we don't exceed bounds
        const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(latest * FRAME_COUNT)
        );

        const img = images[frameIndex];
        if (!img) return;

        // Canvas sizing logic to cover the screen while maintaining aspect ratio
        // We want the image to behave like 'object-fit: cover'
        const canvasWidth = canvas.width / window.devicePixelRatio;
        const canvasHeight = canvas.height / window.devicePixelRatio;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate aspect ratios
        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            // Canvas is wider than image (crop top/bottom)
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgRatio;
            offsetX = 0;
            offsetY = (canvasHeight - drawHeight) / 2;
        } else {
            // Canvas is taller than image (crop sides)
            drawWidth = canvasHeight * imgRatio;
            drawHeight = canvasHeight;
            offsetX = (canvasWidth - drawWidth) / 2;
            offsetY = 0;
        }

        // Draw image with high DPI support
        // The context is already scaled by devicePixelRatio in the resize handler/init
        ctx.filter = 'brightness(0.9) contrast(1.1)'; // Slight cinematic touch
        ctx.drawImage(
            img,
            0, 0, img.width, img.height, // Source rectangle
            offsetX, offsetY, drawWidth, drawHeight // Destination rectangle
        );
    });

    // Handle Resize & Retina Displays
    useEffect(() => {
        const handleResize = () => {
            if (!canvasRef.current) return;
            const canvas = canvasRef.current;
            const dpr = window.devicePixelRatio || 1;

            // Set actual size in memory (scaled to account for extra pixel density)
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;

            // Normalize coordinate system to use css pixels
            const ctx = canvas.getContext('2d');
            if (ctx) ctx.scale(dpr, dpr);

            // Force a redraw of the current frame if we have progress
            // We can't easily access the *current* MotionValue here without reading it, 
            // but the next scroll event will fix it instantly. 
            // For initial load, we might want to draw frame 0.
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Init

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="block w-full h-full object-cover"
            style={{ width: '100%', height: '100%' }}
        />
    );
}
