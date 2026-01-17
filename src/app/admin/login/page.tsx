"use client";

import { useRef, useState, memo, useCallback } from "react";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* -------------------------------------------------------------------------- */
/*                                  Branding                                  */
/* -------------------------------------------------------------------------- */

const LoginBranding = memo(() => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:flex lg:w-1/2 bg-zinc-900 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

            <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
                <img
                    src="/logo.jpeg"
                    alt="Sahara Journeys Logo"
                    className="w-48 h-48 rounded-2xl object-cover shadow-2xl shadow-primary/10 mb-8"
                />

                <h1 className="text-4xl font-serif font-bold text-white mb-4">
                    Sahara Journeys
                </h1>

                <p className="text-lg text-white/50 text-center max-w-md">
                    Premium travel experiences curated for the discerning explorer.
                    Manage your tours, bookings, and customers with ease.
                </p>

                <div className="mt-12 grid grid-cols-3 gap-8 text-center">
                    <div>
                        <p className="text-3xl font-bold text-primary">500+</p>
                        <p className="text-sm text-white/40">Tours Completed</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-primary">10K+</p>
                        <p className="text-sm text-white/40">Happy Travelers</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-primary">50+</p>
                        <p className="text-sm text-white/40">Destinations</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

LoginBranding.displayName = "LoginBranding";

/* -------------------------------------------------------------------------- */
/*                                   Form                                     */
/* -------------------------------------------------------------------------- */

const LoginForm = memo(() => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();

            const email = emailRef.current?.value ?? "";
            const password = passwordRef.current?.value ?? "";

            if (!email || !password) return;

            setIsLoading(true);

            setTimeout(() => {
                login();
                router.push("/admin");
            }, 1200);
        },
        [login, router]
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label>Email</Label>
                <Input
                    ref={emailRef}
                    type="email"
                    placeholder="admin@saharajourneys.com"
                    required
                    className="
                        bg-black/60
                        border-white/10
                        h-12
                        text-white
                        placeholder:text-white/20
                        focus:border-primary/60
                        focus:ring-0
                        will-change-transform
                    "
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label>Password</Label>
                    <a
                        href="#"
                        className="text-sm text-primary hover:text-primary/80"
                    >
                        Forgot password?
                    </a>
                </div>

                <div className="relative">
                    <Input
                        ref={passwordRef}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        required
                        className="
                            bg-black/60
                            border-white/10
                            h-12
                            pr-12
                            text-white
                            placeholder:text-white/20
                            focus:border-primary/60
                            focus:ring-0
                            will-change-transform
                        "
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(v => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                    >
                        {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                        ) : (
                            <Eye className="w-4 h-4" />
                        )}
                    </button>
                </div>
            </div>

            <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-primary text-black font-serif font-bold tracking-wider hover:bg-primary/90"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Signing in...
                    </>
                ) : (
                    "Sign In"
                )}
            </Button>
        </form>
    );
});

LoginForm.displayName = "LoginForm";

/* -------------------------------------------------------------------------- */
/*                                   Page                                     */
/* -------------------------------------------------------------------------- */

export default function AdminLogin() {
    return (
        <LazyMotion features={domAnimation}>
            <div className="min-h-screen bg-black flex text-white">
                <LoginBranding />

                <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-md"
                    >
                        <div className="lg:hidden flex flex-col items-center mb-8">
                            <img
                                src="/logo.jpeg"
                                alt="Sahara Logo"
                                className="w-24 h-24 rounded-xl object-cover mb-4"
                            />
                            <h1 className="text-2xl font-serif font-bold">
                                Sahara Journeys
                            </h1>
                        </div>

                        {/* Card without backdrop-blur */}
                        <div className="relative rounded-2xl border border-white/10 overflow-hidden">
                            <div className="absolute inset-0 bg-zinc-900/70 pointer-events-none" />

                            <div className="relative p-8">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold mb-2">
                                        Welcome Back
                                    </h2>
                                    <p className="text-white/50">
                                        Sign in to access your dashboard
                                    </p>
                                </div>

                                <LoginForm />

                                <p className="mt-6 text-center text-xs text-white/30 uppercase tracking-widest">
                                    Protected admin area
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </LazyMotion>
    );
}
