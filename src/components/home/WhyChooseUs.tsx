import MagicBento from "@/components/animate-ui/MagicBento";
import BlurText from "@/components/animate-ui/BlurText";

const features = [
    {
        color: '#0a0a0a',
        title: 'Verified Drivers',
        description: 'Locals who know every turn.',
        label: 'Safety'
    },
    {
        color: '#0a0a0a',
        title: 'Luxury Fleet',
        description: 'Premium SUVs for comfort.',
        label: 'Comfort'
    },
    {
        color: '#0a0a0a',
        title: '24/7 Support',
        description: 'We are always a call away.',
        label: 'Reliability'
    },
    {
        color: '#0a0a0a',
        title: 'Local Experts',
        description: 'Authentic cultural insights.',
        label: 'Knowledge'
    },
    {
        color: '#0a0a0a',
        title: 'Secure Payments',
        description: '100% transparent billing.',
        label: 'Trust'
    },
    {
        color: '#0a0a0a',
        title: 'Custom Plans',
        description: 'Itineraries made for you.',
        label: 'Flexibility'
    }
];

export const WhyChooseUs = () => {
    return (
        <section className="py-12 md:py-24 bg-black relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <BlurText
                        text="The Sahara Advantage"
                        className="text-primary text-[10px] uppercase tracking-[0.4em] block mb-4 opacity-70"
                        delay={50}
                        animateBy="words"
                    />
                    <BlurText
                        text="Why Travel With Us?"
                        className="font-serif text-3xl md:text-5xl text-white/90"
                        delay={50}
                        animateBy="words"
                    />
                </div>

                <div className="flex justify-center -mx-4 md:mx-0">
                    <MagicBento
                        cards={features}
                        enableStars={true}
                        enableSpotlight={true}
                        enableBorderGlow={true}
                        spotlightRadius={300}
                        glowColor="205, 163, 104" // Gold
                        particleCount={15}
                    />
                </div>
            </div>
        </section>
    );
};
