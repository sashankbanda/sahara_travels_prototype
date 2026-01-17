"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login
        setTimeout(() => {
            login();
            setIsLoading(false);
            router.push("/admin");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-black flex text-white font-sans selection:bg-primary/30">
            {/* Left side - Branding */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="hidden lg:flex lg:w-1/2 bg-zinc-900 relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
                <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
                    {/* Logo Placeholder - using text/colors since asset import might vary */}
                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-8"
                    >
                        <img
                            src="/logo.jpeg"
                            alt="Sahara Journeys Logo"
                            className="w-48 h-48 rounded-2xl object-cover shadow-2xl shadow-primary/5"
                        />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-4xl font-serif font-bold text-white mb-4 text-center"
                    >
                        Sahara Journeys
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-lg text-white/50 text-center max-w-md"
                    >
                        Premium travel experiences curated for the discerning explorer.
                        Manage your tours, bookings, and customers with ease.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-12 grid grid-cols-3 gap-8 text-center"
                    >
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
                    </motion.div>
                </div>
            </motion.div>

            {/* Right side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex flex-col items-center mb-8">
                        <img
                            src="/logo.jpeg"
                            alt="Sahara Journeys Logo"
                            className="w-24 h-24 rounded-xl object-cover mb-4 shadow-lg shadow-primary/10"
                        />
                        <h1 className="text-2xl font-serif font-bold text-white">Sahara Journeys</h1>
                    </div>

                    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Welcome Back
                            </h2>
                            <p className="text-white/50">
                                Sign in to access your dashboard
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@saharajourneys.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-black/50 border-white/10 h-12 focus:border-primary/50 text-white placeholder:text-white/20"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="bg-black/50 border-white/10 h-12 pr-12 focus:border-primary/50 text-white placeholder:text-white/20"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
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
                                className="w-full h-12 bg-primary text-black font-bold hover:bg-primary/90 transition-all font-serif tracking-wider"
                                disabled={isLoading}
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

                        <p className="mt-6 text-center text-xs text-white/30 uppercase tracking-widest">
                            Protected admin area
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
