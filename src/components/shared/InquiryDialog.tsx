import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MessageCircle, MapPin, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function InquiryDialog({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [locating, setLocating] = useState(false);
    const locationRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        setOpen(false);
        toast({
            title: "Inquiry Sent",
            description: "We will get back to you shortly.",
        });
    };

    const handleWhatsApp = () => {
        window.open("https://wa.me/919876543210?text=Hi, I am interested in Sahara Journeys...", "_blank");
    };

    const handleCall = () => {
        window.location.href = "tel:+919876543210";
    };

    const handleLocation = () => {
        if (!navigator.geolocation) {
            toast({
                title: "Error",
                description: "Geolocation is not supported by your browser",
                variant: "destructive"
            });
            return;
        }

        setLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
                if (locationRef.current) {
                    locationRef.current.value = mapsLink;
                }
                setLocating(false);
                toast({
                    title: "Location Fetched",
                    description: "Coordinates added to the form.",
                });
            },
            (error) => {
                setLocating(false);
                toast({
                    title: "Location Failed",
                    description: "Could not fetch your location. Please enter manually.",
                    variant: "destructive"
                });
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-zinc-950 text-white border-white/10">
                <DialogHeader>
                    <DialogTitle className="font-serif text-2xl text-center">Start Your Journey</DialogTitle>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Direct Contact Options */}
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="border-white/10 hover:bg-white/5 hover:text-primary gap-2 h-14" onClick={handleWhatsApp}>
                            <MessageCircle className="w-5 h-5 text-green-500" />
                            WhatsApp
                        </Button>
                        <Button variant="outline" className="border-white/10 hover:bg-white/5 hover:text-primary gap-2 h-14" onClick={handleCall}>
                            <Phone className="w-5 h-5 text-blue-500" />
                            Call Now
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-zinc-950 px-2 text-muted-foreground">Or send an email</span>
                        </div>
                    </div>

                    {/* Inquiry Form */}
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Your name" className="bg-zinc-900 border-white/10" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" type="tel" placeholder="+91..." className="bg-zinc-900 border-white/10" required />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="location">Exact Location (Optional)</Label>
                            <div className="relative">
                                <Input
                                    ref={locationRef}
                                    id="location"
                                    placeholder="Paste Google Maps link or Address"
                                    className="bg-zinc-900 border-white/10 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={handleLocation}
                                    disabled={locating}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-primary transition-colors disabled:opacity-50"
                                    title="Connect to GPS"
                                >
                                    {locating ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Tell us about your travel plans..." className="bg-zinc-900 border-white/10" />
                        </div>
                        <Button type="submit" className="w-full bg-primary text-black hover:bg-primary/90 mt-2" disabled={loading}>
                            {loading ? "Sending..." : "Send Inquiry"}
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
