import React, { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, Instagram, Facebook, Twitter, Check, Lock } from "lucide-react";
import { useApp } from "../context/AppContext";

export const Footer: React.FC = () => {
  const { setFilterState, setIsAdminOpen } = useApp();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#0A0A0A] text-neutral-400 font-sans border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Newsletter & Brand Banner */}
        <div className="p-8 sm:p-12 bg-white/5 border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-2">
            <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.3em]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Privé VIP Membership</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-light italic text-[#F5F2ED]">
              Subscribe For Exclusive Private Previews & $200 Welcome Reward
            </h3>
            <p className="text-xs text-neutral-400 max-w-lg font-light leading-relaxed">
              Receive bespoke invitations to limited-edition drop reveals, private trunk shows, and direct styling sessions with Madame Valérie.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="p-4 bg-[#064E3B]/20 border border-[#064E3B] text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Welcome to GROW CARE Privé. Use promo code <strong className="text-white">LUXURY20</strong> for 20% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your private email..."
                  className="flex-1 px-4 py-3.5 text-xs bg-black/60 border border-white/20 text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="editorial-btn-primary px-6 py-3.5 shrink-0 cursor-pointer flex items-center gap-1"
                >
                  <span>Join Privé</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          
          <div className="space-y-4">
            <div>
              <span className="text-xl font-serif font-medium text-white tracking-[0.2em] uppercase block">
                GROW CARE
              </span>
              <span className="text-[10px] text-[#D4AF37] tracking-[0.25em] uppercase font-semibold">
                EMPOWER ELEGANCE
              </span>
            </div>
            <p className="text-neutral-500 leading-relaxed font-light">
              World-class 3D luxury e-commerce uniting fine leatherwork, 18K solid gold jewelry, crystal floral sculptures, and silk craft.
            </p>
            <div className="flex items-center gap-3 text-neutral-400">
              <a href="#" className="p-2.5 bg-white/5 border border-white/10 hover:text-[#D4AF37] hover:border-[#D4AF37] transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-white/5 border border-white/10 hover:text-[#D4AF37] hover:border-[#D4AF37] transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-white/5 border border-white/10 hover:text-[#D4AF37] hover:border-[#D4AF37] transition">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-white font-serif font-semibold uppercase tracking-[0.2em] text-xs">
              Flagship Categories
            </div>
            <ul className="space-y-2 text-neutral-400 font-light">
              <li>
                <button onClick={() => setFilterState((prev) => ({ ...prev, category: "Women's Handbags" }))} className="hover:text-[#D4AF37] transition">
                  Women's Handbags
                </button>
              </li>
              <li>
                <button onClick={() => setFilterState((prev) => ({ ...prev, category: "Earrings" }))} className="hover:text-[#D4AF37] transition">
                  18K Gold Earrings
                </button>
              </li>
              <li>
                <button onClick={() => setFilterState((prev) => ({ ...prev, category: "Artificial Flowers" }))} className="hover:text-[#D4AF37] transition">
                  Crystal Artificial Flowers
                </button>
              </li>
              <li>
                <button onClick={() => setFilterState((prev) => ({ ...prev, category: "Fashion Accessories" }))} className="hover:text-[#D4AF37] transition">
                  Mulberry Silk Accessories
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-white font-serif font-semibold uppercase tracking-[0.2em] text-xs">
              Client Concierge
            </div>
            <ul className="space-y-2 text-neutral-400 font-light">
              <li><a href="#" className="hover:text-[#D4AF37] transition">White-Glove Express Shipping</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition">Complimentary 30-Day Returns</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition">Certificate of Authenticity</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition">Book Personal Atelier Appointment</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition">Care & Cleaning Guide</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-white font-serif font-semibold uppercase tracking-[0.2em] text-xs">
              Legal & Privacy
            </div>
            <ul className="space-y-2 text-neutral-400 font-light">
              <li><a href="#" className="hover:text-[#D4AF37] transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition">Cookie Preferences</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition">Anti-Counterfeiting Statement</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & Staff Access */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <div>
            © {new Date().getFullYear()} GROW CARE. All rights reserved. EMPOWER ELEGANCE.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>256-Bit SSL Encrypted Luxury Checkout</span>
            </div>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-[#D4AF37] transition cursor-pointer font-medium"
              title="Restricted Staff Portal"
            >
              <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Staff & Owner Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
