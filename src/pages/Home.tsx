import { useRef } from "react";
import { Navbar } from "@/components/home/Navbar";
import { BrandLegacy } from "@/components/home/BrandLegacy";
import { Services } from "@/components/home/Services";
import { HighlightedJourneys } from "@/components/home/HighlightedJourneys";
import { Footer } from "@/components/home/Footer";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { motion, useScroll } from "framer-motion";
import TravelScrollCanvas from "@/components/TravelScrollCanvas";
import TravelExperience from "@/components/TravelExperience";

const Home = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-black min-h-screen relative selection:bg-primary selection:text-black"
        >
            {/* Global Grain Overlay */}
            <div className="grain-overlay" />



            <Navbar />

            <main>
                {/* Scrollytelling Hero Section */}
                <section ref={containerRef} className="h-[600vh] relative">
                    <div className="sticky top-0 h-screen w-full overflow-hidden">
                        <div className="absolute inset-0 z-0">
                            <TravelScrollCanvas scrollYProgress={scrollYProgress} />
                        </div>
                        <div className="absolute inset-0 z-10 pointer-events-none">
                            <TravelExperience scrollYProgress={scrollYProgress} />
                        </div>
                        {/* Vignette Overlay */}
                        <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
                    </div>
                </section>

                <BrandLegacy />
                <ProcessSteps />
                <Services />
                <HighlightedJourneys />
            </main>

            <Footer />
        </motion.div>
    );
};

export default Home;
