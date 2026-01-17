import Link from "next/link";
import BlurText from "@/components/animate-ui/BlurText";
import { MagneticButton } from "@/components/animate-ui/MagneticButton";

export const Footer = () => {
    return (
        <footer className="relative text-white pt-24 pb-12 overflow-hidden">
            {/* Background Texture/Gradient */}
            {/* Background Texture/Gradient Removed for cleaner look */}

            <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">

                {/* Main CTA */}
                <div className="mb-40">
                    <BlurText
                        text="Ready to begin?"
                        className="font-serif text-5xl md:text-7xl text-white mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] block justify-center"
                        delay={50}
                        animateBy="words"
                    />
                    <p className="text-white/40 text-sm font-light tracking-wide mb-8">
                        Your journey into the extraordinary awaits.
                    </p>
                    <p className="text-primary/60 text-[10px] uppercase tracking-widest mb-12 animate-pulse">
                        Replies usually within 15–30 minutes
                    </p>

                    <MagneticButton>
                        <button className="group bg-primary text-black px-12 py-4 rounded-full uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-white hover:text-black transition-all duration-500 flex items-center gap-3 mx-auto shadow-[0_0_20px_-5px_hsl(41_52%_60%/_0.5)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                            <span>Chat on WhatsApp</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-black transition-colors"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        </button>
                    </MagneticButton>

                    {/* Address / Trust */}
                    <div className="mt-16 text-white/30 text-[10px] font-light tracking-wide max-w-md mx-auto">
                        <p>Based in Arunachal Pradesh, India.</p>
                        <p>Registered Office: Naharlagun, Itanagar Region.</p>
                        <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="block mt-2 underline hover:text-white transition-colors">View on Google Maps</a>
                    </div>
                </div>

                {/* Minimal Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.2em] text-white/20 pt-12 border-t border-white/5 gap-6">
                    <p>&copy; 2026 Sahara Journeys</p>
                    <div className="flex gap-12">
                        <Link href="#" className="hover:text-white transition-colors">WhatsApp</Link>
                        <Link href="#" className="hover:text-white transition-colors">Phone</Link>
                        <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
                        <Link href="#" className="hover:text-white transition-colors">Email</Link>
                    </div>
                    <p>Arunachal Pradesh</p>
                </div>
            </div>
        </footer>
    );
};
