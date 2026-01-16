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
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        rating: 5,
    },
    {
        quote:
            "I was worried about the long drive, but the comfort of the Innova and the expertise of the driver made it a breeze. Highly recommend their taxi services!",
        name: "Rajesh Kumar",
        title: "Hyderabad to Vijayawada Transfer",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        rating: 5,
    },
    {
        quote:
            "Seeing the untouched landscapes of the North East was a dream come true. The team at Sahara took care of everything, from permits to hotels. exceptional service.",
        name: "Elena Rodriguez",
        title: "Adventure Tour Package",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        rating: 5,
    },
    {
        quote:
            "Professional, punctual, and polite. Simplest way to book a reliable cab for ongoing outstation trips. Will definitely use them again.",
        name: "Suresh Reddy",
        title: "Corporate Client",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        rating: 4,
    },
    {
        quote:
            "The customized tour they planned for our family was spot on. We saw everything we wanted without feeling rushed. A solid 10/10 experience.",
        name: "The Mehta Family",
        title: "Family Vacation",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        rating: 5,
    },
];
