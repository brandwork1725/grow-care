import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { CategoryType } from "../types";
import { Card3DTilt } from "./3d/Card3DTilt";

// Images
import handbagImg from "../assets/images/handbag_luxury_3d_1784659439495.jpg";
import earringsImg from "../assets/images/earrings_luxury_gold_1784659452849.jpg";
import flowersImg from "../assets/images/artificial_flowers_emerald_1784659467381.jpg";

export const Categories: React.FC = () => {
  const { setFilterState, products } = useApp();

  const categoryCards: {
    name: CategoryType;
    subtitle: string;
    image: string;
    count: number;
  }[] = [
    {
      name: "Women's Handbags",
      subtitle: "Full-grain calfskin satchels, clutches & shoulder totes",
      image: handbagImg,
      count: products.filter((p) => p.category === "Women's Handbags").length,
    },
    {
      name: "Earrings",
      subtitle: "18K solid yellow gold chandelier drops & emerald crowns",
      image: earringsImg,
      count: products.filter((p) => p.category === "Earrings").length,
    },
    {
      name: "Artificial Flowers",
      subtitle: "Crystal petal orchid arrangements & velvet rose centerpieces",
      image: flowersImg,
      count: products.filter((p) => p.category === "Artificial Flowers").length,
    },
    {
      name: "Fashion Accessories",
      subtitle: "Mulberry silk scarves, gold filigree belts & leather craft",
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1000&auto=format&fit=crop",
      count: products.filter((p) => p.category === "Fashion Accessories").length,
    },
  ];

  const handleSelectCategory = (cat: CategoryType) => {
    setFilterState((prev) => ({ ...prev, category: cat }));
    const section = document.getElementById("featured-collections");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-black/10 dark:border-white/10">
          <div>
            <div className="text-[#D4AF37] text-xs font-sans font-semibold uppercase tracking-[0.3em] mb-1">
              Curated Collections
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-light italic text-[#0A0A0A] dark:text-[#F5F2ED]">
              Explore By Category
            </h2>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sans max-w-md mt-2 md:mt-0 font-light leading-relaxed">
            Handcrafted for distinguished connoisseurs who value heritage craftsmanship and futuristic luxury design.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryCards.map((cat) => (
            <Card3DTilt key={cat.name} className="h-full">
              <div
                onClick={() => handleSelectCategory(cat.name)}
                className="group relative h-96 rounded-none overflow-hidden cursor-pointer border border-black/10 dark:border-white/10 shadow-lg bg-[#EBE8E3] dark:bg-neutral-900 flex flex-col justify-between p-6 transition-all duration-300 hover:shadow-2xl hover:border-[#D4AF37]/50"
              >
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 opacity-80 group-hover:opacity-90"
                />

                {/* Gradient Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/95 via-[#0A0A0A]/40 to-transparent" />

                {/* Top Item Count Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 bg-[#0A0A0A]/80 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-sans tracking-[0.15em] uppercase backdrop-blur-md">
                    {cat.count} Creations
                  </span>
                  <div className="w-8 h-8 rounded-none bg-white/10 dark:bg-black/60 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#D4AF37] group-hover:text-black group-hover:border-[#D4AF37] transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Title & Subtitle */}
                <div className="relative z-10 space-y-2">
                  <h3 className="text-xl font-serif font-medium text-white group-hover:text-[#D4AF37] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-neutral-300 font-sans font-light line-clamp-2">
                    {cat.subtitle}
                  </p>
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>
      </div>
    </section>
  );
};
