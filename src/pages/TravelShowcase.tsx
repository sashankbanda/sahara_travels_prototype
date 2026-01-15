import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import TravelScrollCanvas from '@/components/TravelScrollCanvas';
import TravelExperience from '@/components/TravelExperience';

export default function TravelShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress of the 600vh container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <main className="bg-black text-white relative w-full">
            {/* 
        Scroll Sequence Container 
        Height = 600vh to give plenty of scroll room for the 240 frames 
      */}
            <section ref={containerRef} className="h-[600vh] relative">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    {/* Background Canvas (Frame Sequence) */}
                    <div className="absolute inset-0 z-0">
                        <TravelScrollCanvas scrollYProgress={scrollYProgress} />
                    </div>

                    {/* Foreground Experience (HUD/Text) */}
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        <TravelExperience scrollYProgress={scrollYProgress} />
                    </div>

                    {/* Vignette Overlay for cinematic feel */}
                    <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
                </div>
            </section>

            {/* Rest of the site connects here */}
            <section className="relative z-20 bg-black min-h-screen py-24 px-8 md:px-20 text-center">
                <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">
                    The Journey Continues
                </h2>
                <p className="text-white/60 max-w-2xl mx-auto mb-12">
                    Scroll down to explore our exclusive packages and membership tiers.
                    The adventure is just beginning.
                </p>
                <div className="h-96 w-full max-w-4xl mx-auto bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                    <span className="text-white/20 uppercase tracking-widest font-mono">Content Placeholder</span>
                </div>
            </section>
        </main>
    );
}
