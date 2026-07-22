import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, Truck, Clock } from "lucide-react";
import { Interactive3DStage } from "./3d/Interactive3DStage";
import { useApp } from "../context/AppContext";

export const Hero: React.FC = () => {
  const { setIsAIConciergeOpen, setFilterState } = useApp();

  const handleExploreClick = () => {
    const section = document.getElementById("featured-collections");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-8 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-sans font-semibold tracking-[0.3em] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>HAUTE COUTURE • 2026 EDITION</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-light italic tracking-tight text-[#0A0A0A] dark:text-[#F5F2ED] leading-[1.02]">
              EMPOWER <br />
              <span className="not-italic font-normal text-[#0A0A0A] dark:text-[#F5F2ED]">
                ELEGANCE.
              </span>
            </h1>

            {/* Narrative Paragraph */}
            <p className="text-base text-[#0A0A0A]/70 dark:text-[#F5F2ED]/70 font-sans leading-relaxed max-w-lg mx-auto lg:mx-0 font-light">
              GROW CARE unites Parisian haute couture, Italian artisan craftsmanship, and real-time 3D innovation. Discover hand-sculpted obsidian handbags, 18K gold chandelier drops, crystal floral blooms, and fine silk creations.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-3">
              <button
                onClick={handleExploreClick}
                className="editorial-btn-primary w-full sm:w-auto px-8 py-4 shadow-lg flex items-center justify-center gap-3 group cursor-pointer"
              >
                <span>Explore Flagship Collections</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsAIConciergeOpen(true)}
                className="editorial-btn-secondary flex items-center justify-center gap-2 text-[#0A0A0A] dark:text-[#F5F2ED] cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Consult AI Stylist</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-black/10 dark:border-white/10 text-left">
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-serif font-semibold text-[#0A0A0A] dark:text-[#F5F2ED]">White-Glove</div>
                  <div className="text-[11px] text-neutral-500 font-sans font-light">Complimentary Global</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-serif font-semibold text-[#0A0A0A] dark:text-[#F5F2ED]">Authentic</div>
                  <div className="text-[11px] text-neutral-500 font-sans font-light">Certified 18K Gold</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-serif font-semibold text-[#0A0A0A] dark:text-[#F5F2ED]">Lifetime</div>
                  <div className="text-[11px] text-neutral-500 font-sans font-light">Artisan Guarantee</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Real-Time Stage */}
          <div className="lg:col-span-6 z-10">
            <Interactive3DStage onExploreClick={handleExploreClick} />
          </div>

        </div>
      </div>
    </section>
  );
};
