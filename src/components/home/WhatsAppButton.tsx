
import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

export const WhatsAppButton = () => {
    const location = useLocation();
    const isDashboard = location.pathname.includes("/dashboard");

    // Don't show on dashboard pages
    if (isDashboard) return null;

    return (
        <a
            href="https://wa.me/910000000000" // Replace with actual number
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:bg-[#20bd5a] hover:scale-110 hover:shadow-[0_6px_16px_rgba(0,0,0,0.4)] transition-all duration-300 group"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="w-8 h-8 fill-current" />
            <span className="absolute right-full mr-3 bg-white text-black px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg pointer-events-none">
                Chat with us
            </span>
        </a>
    );
};
