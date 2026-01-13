import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="bg-black text-white pt-24 pb-12 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">

                    {/* CTA */}
                    <div className="max-w-xl">
                        <h2 className="font-serif text-5xl md:text-6xl text-white mb-8">
                            Ready to begin your journey?
                        </h2>
                        <button className="bg-white text-black px-8 py-3 rounded-full uppercase tracking-widest hover:bg-primary transition-colors">
                            Start Enquiry
                        </button>
                    </div>

                    {/* Links */}
                    <div className="flex gap-16">
                        <div className="space-y-6">
                            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-6">Explore</h4>
                            <Link to="/tours" className="block text-white/70 hover:text-white transition-colors">Tours</Link>
                            <Link to="/sightseeing" className="block text-white/70 hover:text-white transition-colors">Sightseeing</Link>
                            <Link to="/transfers" className="block text-white/70 hover:text-white transition-colors">Transfers</Link>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-6">Company</h4>
                            <Link to="/about" className="block text-white/70 hover:text-white transition-colors">About Us</Link>
                            <Link to="/contact" className="block text-white/70 hover:text-white transition-colors">Contact</Link>
                            <Link to="/privacy" className="block text-white/70 hover:text-white transition-colors">Privacy</Link>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/30 pt-12 border-t border-white/5">
                    <p>&copy; {new Date().getFullYear()} Sahara Journeys. All rights reserved.</p>
                    <p className="mt-4 md:mt-0">Designed for excellence.</p>
                </div>
            </div>
        </footer>
    );
};
