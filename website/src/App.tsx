import React from "react";
import { AppProvider } from "./context/AppContext";
import { Background3DParticles } from "./components/3d/Background3DParticles";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Categories } from "./components/Categories";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { BrandStory } from "./components/BrandStory";
import { Footer } from "./components/Footer";

// Modals & Drawers
import { ProductDetailModal } from "./components/ProductDetailModal";
import { CartDrawer } from "./components/CartDrawer";
import { CheckoutModal } from "./components/CheckoutModal";
import { AIConcierge } from "./components/AIConcierge";
import { AccountModal } from "./components/AccountModal";
import { AdminDashboard } from "./components/AdminDashboard";

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#F5F2ED] dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-[#F5F2ED] transition-colors duration-300 relative selection:bg-[#D4AF37] selection:text-[#0A0A0A] font-sans">
        {/* Subtle WebGL 3D Floating Particle Canvas */}
        <Background3DParticles />

        {/* Sticky Glass Navbar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="relative z-10 space-y-8">
          <Hero />
          <Categories />
          <FeaturedProducts />
          <BrandStory />
        </main>

        {/* Footer */}
        <Footer />

        {/* Global Modals & Drawers */}
        <ProductDetailModal />
        <CartDrawer />
        <CheckoutModal />
        <AIConcierge />
        <AccountModal />
        <AdminDashboard />
      </div>
    </AppProvider>
  );
}
