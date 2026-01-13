import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { BrandLegacy } from "@/components/home/BrandLegacy";
import { Services } from "@/components/home/Services";
import { HighlightedJourneys } from "@/components/home/HighlightedJourneys";
import { TrustSignals } from "@/components/home/TrustSignals";
import { Footer } from "@/components/home/Footer";
import { motion } from "framer-motion";

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-black min-h-screen relative selection:bg-primary selection:text-black"
        >
            {/* Global Grain Overlay */}
            <div className="grain-overlay" />

            <Navbar />

            <main>
                <Hero />
                <BrandLegacy />
                <Services />
                <HighlightedJourneys />
                <TrustSignals />
            </main>

            <Footer />
        </motion.div>
    );
};

export default Home;
