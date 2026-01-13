import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Smartphone, Key, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Settings saved successfully");
    }, 1000);
  };

  const tabs = [
    { id: "profile", icon: User, label: "Profile" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "security", icon: Shield, label: "Security" },
    { id: "appearance", icon: Palette, label: "Appearance" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <motion.div
            key="profile"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="premium-card p-6 space-y-6"
          >
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Profile Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="Admin" className="input-dark" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="User" className="input-dark" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="admin@saharajourneys.com" className="input-dark" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+91 98765 43210" className="input-dark" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  className="flex min-h-[100px] w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Tell us a little about yourself"
                />
              </div>
            </div>
            <div className="pt-4 flex justify-end">
              <Button onClick={handleSave} disabled={isLoading} className="bg-gradient-gold text-primary-foreground">
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </motion.div>
        );
      case "notifications":
        return (
          <motion.div
            key="notifications"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="premium-card p-6 space-y-6"
          >
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notification Preferences
            </h2>
            <div className="space-y-4">
              {[
                { label: "New Enquiry Alerts", description: "Get notified when a new enquiry is received", checked: true },
                { label: "Payment Notifications", description: "Receive alerts for payment updates", checked: true },
                { label: "Daily Summary", description: "Receive a daily summary email of stats", checked: false },
                { label: "Marketing Updates", description: "Receive updates about new features and offers", checked: false },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5"
                >
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch defaultChecked={item.checked} />
                </div>
              ))}
            </div>
            <div className="pt-4 flex justify-end">
              <Button onClick={handleSave} disabled={isLoading} className="bg-gradient-gold text-primary-foreground">
                {isLoading ? "Saving..." : "Save Preferences"}
              </Button>
            </div>
          </motion.div>
        );
      case "security":
        return (
          <motion.div
            key="security"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="premium-card p-6 space-y-6">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Key className="w-5 h-5 text-primary" />
                Change Password
              </h2>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current">Current Password</Label>
                  <Input id="current" type="password" className="input-dark" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new">New Password</Label>
                  <Input id="new" type="password" className="input-dark" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm Password</Label>
                  <Input id="confirm" type="password" className="input-dark" />
                </div>
              </div>
              <div className="pt-2 flex justify-end">
                <Button onClick={handleSave} disabled={isLoading} className="bg-gradient-gold text-primary-foreground">
                  Update Password
                </Button>
              </div>
            </div>

            <div className="premium-card p-6 space-y-6">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-primary" />
                Two-Factor Authentication
              </h2>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <p className="font-medium text-foreground">Enable 2FA</p>
                  <p className="text-sm text-muted-foreground">Secure your account with 2FA</p>
                </div>
                <Switch />
              </div>
            </div>
          </motion.div>
        );
      case "appearance":
        return (
          <motion.div
            key="appearance"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="premium-card p-6 space-y-6"
          >
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              Appearance Settings
            </h2>

            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Theme Preference</Label>
                <div className="grid grid-cols-3 gap-4">
                  <button className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-primary bg-primary/10 transition-all hover:bg-primary/20">
                    <Moon className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium">Dark</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-transparent bg-white/5 opacity-50 cursor-not-allowed">
                    <Sun className="w-6 h-6" />
                    <span className="text-sm font-medium">Light</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-transparent bg-white/5 opacity-50 cursor-not-allowed">
                    <Smartphone className="w-6 h-6" />
                    <span className="text-sm font-medium">System</span>
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">
                  * Light mode is currently disabled to maintain brand aesthetic.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <Label>Interface Density</Label>
                <Select defaultValue="comfortable">
                  <SelectTrigger className="input-dark">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="spacious">Spacious</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 flex justify-end">
                <Button onClick={handleSave} disabled={isLoading} className="bg-gradient-gold text-primary-foreground">
                  Save Preferences
                </Button>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 sm:mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">Settings</h1>
        <p className="text-muted-foreground hidden sm:block">
          Manage your account and application preferences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Sidebar / Tabs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-3"
        >
          <nav className="premium-card p-2 flex lg:flex-col overflow-x-auto space-x-2 lg:space-x-0 lg:space-y-1 scrollbar-none snap-x">
            {tabs.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 whitespace-nowrap snap-start ${activeTab === item.id
                  ? "bg-primary/10 text-primary shadow-[0_0_10px_-5px_hsl(var(--primary)/0.3)] font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? "text-primary" : ""}`} />
                {item.label}
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Content */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
}
