"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import BlurText from "@/components/animate-ui/BlurText";

export function Testimonials() {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-6 mb-12 text-center">
                <BlurText
                    text="What Travelers Say"
                    className="font-serif text-3xl md:text-5xl text-white mb-4"
                    delay={50}
                    animateBy="words"
                />
                <p className="text-white/60 max-w-2xl mx-auto">
                    Stories from those who have experienced the magic of Sahara Journeys.
                </p>
            </div>

            <div className="h-[20rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
                <InfiniteMovingCards
                    items={testimonials}
                    direction="right"
                    speed="slow"
                />
            </div>
        </section>
    );
}

const testimonials = [
    {
        quote:
            "The trip to Tawang was absolutely magical. Our driver was so professional and the itinerary was perfect. Sahara Journeys truly knows how to showcase the beauty of Arunachal.",
        name: "Aisha Verma",
        title: "Traveled to Tawang",
    },
    {
        quote:
            "I was worried about the long drive, but the comfort of the Innova and the expertise of the driver made it a breeze. Highly recommend their taxi services!",
        name: "Rajesh Kumar",
        title: "Hyderabad to Vijayawada Transfer",
    },
    {
        quote:
            "Seeing the untouched landscapes of the North East was a dream come true. The team at Sahara took care of everything, from permits to hotels. exceptional service.",
        name: "Elena Rodriguez",
        title: "Adventure Tour Package",
    },
    {
        quote:
            "Professional, punctual, and polite. Simplest way to book a reliable cab for ongoing outstation trips. Will definitely use them again.",
        name: "Suresh Reddy",
        title: "Corporate Client",
    },
    {
        quote:
            "The customized tour they planned for our family was spot on. We saw everything we wanted without feeling rushed. A solid 10/10 experience.",
        name: "The Mehta Family",
        title: "Family Vacation",
    },
];
