import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="relative bg-black text-white pt-40 pb-12 border-t border-white/5 overflow-hidden">
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-black pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">

                {/* Main CTA */}
                <div className="mb-40">
                    <h2 className="font-serif text-5xl md:text-7xl text-white mb-6 tracking-tight">
                        Ready to begin?
                    </h2>
                    <p className="text-white/40 text-sm font-light tracking-wide mb-12">
                        Your journey into the extraordinary awaits.
                    </p>

                    <button className="bg-white text-black px-12 py-4 rounded-full uppercase tracking-[0.2em] text-[10px] font-medium hover:bg-neutral-200 transition-colors duration-500">
                        Start Enquiry
                    </button>
                </div>

                {/* Minimal Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.2em] text-white/20 pt-12 border-t border-white/5 gap-6">
                    <p>&copy; 2026 Sahara Journeys</p>
                    <div className="flex gap-12">
                        <Link to="#" className="hover:text-white transition-colors">Instagram</Link>
                        <Link to="#" className="hover:text-white transition-colors">Email</Link>
                    </div>
                    <p>Arunachal Pradesh</p>
                </div>
            </div>
        </footer>
    );
};
