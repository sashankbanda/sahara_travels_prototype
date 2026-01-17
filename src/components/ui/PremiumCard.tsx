"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { HoverBorderGradient } from "./hover-border-gradient";

interface PremiumCardProps {
    id: string | number;
    title: string;
    image: string;
    destination: string;
    duration: string;
    price: number;
}

export function PremiumCard({
    id,
    title,
    image,
    destination,
    duration,
    price,
}: PremiumCardProps) {
    return (
        <HoverBorderGradient
            containerClassName="rounded-xl md:rounded-2xl w-full h-full p-[1px] border-0"
            className="w-full h-full p-0 bg-transparent rounded-[inherit]"
            as="div"
            duration={2}
        >
            <Link href={`/packages/${id}`} className="block group w-full h-full relative overflow-hidden rounded-[inherit]">
                <div className="relative h-[220px] md:h-[400px] w-full overflow-hidden rounded-[inherit] shadow-lg transition-all duration-500 ease-out">
                    {/* Hero Image */}
                    <div className="absolute inset-0 w-full h-full">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>

                    {/* Enhanced Glassmorphic Gradient Overlay */}
                    {/* Glassy blur layer - Bottom to Top Fade */}
                    <div
                        className="absolute inset-0 backdrop-blur-[12px] md:backdrop-blur-[16px] z-0"
                        style={{
                            maskImage: "linear-gradient(to top, black 0%, black 35%, transparent 80%)",
                            WebkitMaskImage: "linear-gradient(to top, black 0%, black 35%, transparent 80%)"
                        }}
                    />

                    {/* Dark gradient for text readability - Bottom to Top */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 z-0 pointer-events-none" />

                    {/* Frosted Sheen - catches the 'light' on the glass surface */}
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-white/10 via-white/5 to-transparent opacity-20 z-0 pointer-events-none"
                        style={{
                            maskImage: "linear-gradient(to top, black 0%, transparent 60%)",
                            WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 60%)"
                        }}
                    />

                    {/* Content Container */}
                    <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-6 z-10">
                        <div className="translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                            {/* Title - Elegant & Spaced */}
                            <h3 className="font-serif text-sm md:text-3xl text-white mb-1.5 md:mb-2 leading-tight drop-shadow-xl line-clamp-2 mix-blend-plus-lighter">
                                {title}
                            </h3>

                            {/* Metadata - Compact */}
                            <div className="flex flex-wrap items-center gap-1.5 md:gap-3 text-white/90 text-[10px] md:text-xs font-light mb-2 md:mb-4">
                                <span className="flex items-center gap-1 bg-white/5 backdrop-blur-md py-0.5 px-1.5 md:px-2 rounded-full border border-white/10 shadow-sm">
                                    <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary drop-shadow" />
                                    <span className="tracking-wide truncate max-w-[80px] md:max-w-none shadow-black drop-shadow-sm">{destination}</span>
                                </span>
                                <span className="flex items-center gap-1 bg-white/5 backdrop-blur-md py-0.5 px-1.5 md:px-2 rounded-full border border-white/10 shadow-sm">
                                    <Clock className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary drop-shadow" />
                                    <span className="tracking-wide shadow-black drop-shadow-sm">{duration}</span>
                                </span>
                            </div>

                            {/* Price & Action */}
                            <div className="flex items-center justify-between border-t border-white/10 pt-2 md:pt-3 mt-1 bg-gradient-to-r from-transparent via-white/5 to-transparent">
                                <div className="flex flex-col">
                                    <span className="text-white/60 text-[9px] md:text-[10px] uppercase tracking-widest font-medium mb-0.5">
                                        Starting From
                                    </span>
                                    <span className="text-sm md:text-xl font-medium text-primary tracking-tight shadow-black drop-shadow-sm">
                                        ₹{price.toLocaleString()}
                                    </span>
                                </div>

                                <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-300 shadow-lg">
                                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </HoverBorderGradient>
    );
}
