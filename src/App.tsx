import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Packages from "./pages/Packages";
import AddPackage from "./pages/packages/AddPackage";
import EditPackage from "./pages/packages/EditPackage";
import PackageDetails from "./pages/packages/PackageDetails";
import Enquiries from "./pages/Enquiries";
import Payments from "./pages/Payments";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

import Home from "./pages/Home";
import TravelShowcase from "./pages/TravelShowcase";
import Tours from "./pages/public/Tours";
import Sightseeing from "./pages/public/Sightseeing";
import Transfers from "./pages/public/Transfers";
import PublicPackageDetails from "./pages/public/PublicPackageDetails";
import { WhatsAppButton } from "./components/home/WhatsAppButton";

import { BackgroundBeams } from "@/components/ui/background-beams";

import ScrollToTop from "@/components/shared/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="relative min-h-screen w-full">
            <BackgroundBeams className="fixed inset-0 z-0 pointer-events-none" />
            <div className="relative z-10">
              <ScrollToTop />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/sightseeing" element={<Sightseeing />} />
                <Route path="/transfers" element={<Transfers />} />
                <Route path="/packages/:id" element={<PublicPackageDetails />} />
                <Route path="/showcase" element={<TravelShowcase />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/packages" element={<Packages />} />
                  <Route path="/packages/new" element={<AddPackage />} />
                  <Route path="/packages/:id" element={<PackageDetails />} />
                  <Route path="/packages/:id/edit" element={<EditPackage />} />
                  <Route path="/enquiries" element={<Enquiries />} />
                  <Route path="/payments" element={<Payments />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
              <WhatsAppButton />
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
