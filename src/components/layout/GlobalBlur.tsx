"use client";

import { usePathname } from "next/navigation";
import GradualBlur from "@/components/GradualBlur";

export function GlobalBlur() {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    if (isAdmin) return null;

    return (
        <GradualBlur
            target="page"
            position="top"
            zIndex={-60}
            responsive={true}
            mobileHeight="5rem"
            tabletHeight="6rem"
            desktopHeight="8rem"
            strength={1}
            divCount={10}
            curve="bezier"
            exponential={true}
            opacity={1}
        />
    );
}
