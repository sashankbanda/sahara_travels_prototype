
import React from 'react';

/**
 * FocusViewingZone Component
 * 
 * Creates a "focused viewing zone" in the center of the viewport by applying 
 * a graduated blur and dimming effect to the top and bottom of the screen.
 * 
 * Features:
 * - Glassmorphism blur (backdrop-filter)
 * - Gradient darkening (bg-gradient)
 * - Gradient mask to fade the effect smoothly into the clear zone
 * - Responsive heights (smaller on mobile to clear more viewing functionality)
 * 
 * Usage: Add to the root layout to apply globally.
 */
export const FocusViewingZone = () => {
    return (
        <>
            {/* Top Blur Overlay */}
            <div
                className="fixed top-0 left-0 w-full z-40 pointer-events-none
                   h-[20vh] md:h-[25vh]
                   backdrop-blur-sm md:backdrop-blur-md
                   bg-gradient-to-b from-black/40 via-black/20 to-transparent
                   [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)]
                   [-webkit-mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)]
                   motion-reduce:hidden"
                aria-hidden="true"
                style={{
                    WebkitBackdropFilter: "blur(12px)",
                }}
            />

        </>
    );
};
