import React from "react";
import { Quote, Award, ShieldCheck, Sparkles, Star } from "lucide-react";
import showroomImg from "../assets/images/brand_story_showroom_1784659479509.jpg";

export const BrandStory: React.FC = () => {
  const reviews = [
    {
      author: "Countess Vivienne de Saint-Germain",
      role: "Parisian Fashion Critic",
      quote: "The Aurelia Obsidian Satchel redefines modern luxury. The craftsmanship in the 18K gold clasp rivals Place Vendôme standards.",
      rating: 5,
    },
    {
      author: "Soren Lindqvist",
      role: "Interior Designer & Architect, Zurich",
      quote: "GROW CARE's crystal orchid floral arrangement brings permanent, ethereal elegance to my private penthouse projects.",
      rating: 5,
    },
    {
      author: "Lady Amara Kensington",
      role: "Art Collector, London",
      quote: "The 18K Celestia diamond drop earrings possess unparalleled radiance. Truly a timeless treasure.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 relative bg-[#0A0A0A] text-[#F5F2ED] overflow-hidden border-t border-b border-black/10 dark:border-white/10">
      {/* Showroom Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-sans font-semibold uppercase tracking-[0.3em]">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Heritage & Vision</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-light italic leading-tight">
              Crafted For Connoisseurs of <br />
              <span className="text-[#D4AF37] not-italic font-normal">Timeless Perfection</span>
            </h2>

            <p className="text-sm font-sans text-neutral-300 font-light leading-relaxed">
              Founded under the ethos of <strong className="font-semibold text-white">EMPOWER ELEGANCE</strong>, GROW CARE bridges classical Italian leatherwork, Parisian haute couture, and real-time 3D innovation. Every handbag, piece of fine jewelry, crystal floral bloom, and silk accessory represents hundreds of hours of artisan devotion.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 text-xs font-sans">
              <div className="p-5 border border-white/10 bg-white/5">
                <div className="text-3xl font-serif font-light text-[#D4AF37]">100%</div>
                <div className="text-neutral-400 text-[11px] uppercase tracking-wider mt-1">Ethically Sourced Gold & Leather</div>
              </div>
              <div className="p-5 border border-white/10 bg-white/5">
                <div className="text-3xl font-serif font-light text-[#D4AF37]">Lifetime</div>
                <div className="text-neutral-400 text-[11px] uppercase tracking-wider mt-1">Certificate of Authenticity</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative border border-[#D4AF37]/30 shadow-2xl">
              <img
                src={showroomImg}
                alt="GROW CARE Flagship Showroom"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-sans">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#D4AF37]" />
                  <span className="font-serif font-medium text-[#F5F2ED]">Flagship Boutique, Place Vendôme</span>
                </div>
                <span className="px-3 py-1 bg-black/70 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-sans tracking-widest uppercase">
                  Paris • France
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Verified Reviews Section */}
        <div className="pt-10 border-t border-white/10">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-[#D4AF37] text-xs font-sans font-semibold uppercase tracking-[0.3em]">
              Connoisseur Endorsements
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-light italic">
              Trusted By Global Connoisseurs
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="p-6 bg-white/5 border border-white/10 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#D4AF37]/40" />
                  <p className="text-xs font-sans text-neutral-300 leading-relaxed italic font-light">
                    "{rev.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 text-xs">
                  <div className="font-serif font-semibold text-[#F5F2ED]">{rev.author}</div>
                  <div className="text-[11px] text-[#D4AF37] font-sans uppercase tracking-wider">{rev.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
