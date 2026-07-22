import React, { useState } from "react";
import { Filter, RotateCcw, Search, Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";
import { ProductCard } from "./ProductCard";

export const FeaturedProducts: React.FC = () => {
  const { products, filterState, setFilterState, resetFilters } = useApp();
  const [activeTab, setActiveTab] = useState<"all" | "bestseller" | "trending" | "new">("all");

  // Filtering products
  const filteredProducts = products.filter((p) => {
    // Category check
    if (filterState.category !== "All" && p.category !== filterState.category) {
      return false;
    }
    // Tab check
    if (activeTab === "bestseller" && !p.isBestSeller) return false;
    if (activeTab === "trending" && !p.isTrending) return false;
    if (activeTab === "new" && !p.isNew) return false;

    // Search query check
    if (filterState.searchQuery) {
      const q = filterState.searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchCat && !matchDesc && !matchTags) return false;
    }

    // Price range
    if (p.price < filterState.minPrice || p.price > filterState.maxPrice) {
      return false;
    }

    // Stock check
    if (filterState.inStockOnly && p.stock <= 0) {
      return false;
    }

    return true;
  });

  return (
    <section id="featured-collections" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-black/10 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-sans font-semibold uppercase tracking-[0.3em] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Haute Couture Masterpieces</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-light italic text-[#0A0A0A] dark:text-[#F5F2ED]">
              {filterState.category === "All" ? "Featured Creations" : filterState.category}
            </h2>
          </div>

          {/* Category Filter Pills & Reset */}
          <div className="flex items-center gap-2 mt-4 md:mt-0 flex-wrap">
            {filterState.category !== "All" && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37]/10 text-[#0A0A0A] dark:text-[#D4AF37] border border-[#D4AF37]/30 text-xs uppercase tracking-[0.15em] font-sans font-semibold"
              >
                <span>Category: {filterState.category}</span>
                <RotateCcw className="w-3 h-3" />
              </button>
            )}

            {filterState.searchQuery && (
              <button
                onClick={() => setFilterState((prev) => ({ ...prev, searchQuery: "" }))}
                className="px-3 py-1.5 bg-black/5 dark:bg-white/10 text-xs font-sans uppercase tracking-[0.15em] font-semibold"
              >
                Query: "{filterState.searchQuery}" ✕
              </button>
            )}
          </div>
        </div>

        {/* Tab Selection Row */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2 gap-4 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2 text-xs font-sans uppercase tracking-[0.2em] font-semibold transition cursor-pointer ${
                activeTab === "all"
                  ? "bg-[#0A0A0A] dark:bg-[#F5F2ED] text-white dark:text-[#0A0A0A] border border-[#0A0A0A] dark:border-[#F5F2ED]"
                  : "text-neutral-500 hover:text-[#0A0A0A] dark:hover:text-white"
              }`}
            >
              All Creations
            </button>
            <button
              onClick={() => setActiveTab("bestseller")}
              className={`px-5 py-2 text-xs font-sans uppercase tracking-[0.2em] font-semibold transition cursor-pointer ${
                activeTab === "bestseller"
                  ? "bg-[#0A0A0A] dark:bg-[#F5F2ED] text-white dark:text-[#0A0A0A] border border-[#0A0A0A] dark:border-[#F5F2ED]"
                  : "text-neutral-500 hover:text-[#0A0A0A] dark:hover:text-white"
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setActiveTab("trending")}
              className={`px-5 py-2 text-xs font-sans uppercase tracking-[0.2em] font-semibold transition cursor-pointer ${
                activeTab === "trending"
                  ? "bg-[#0A0A0A] dark:bg-[#F5F2ED] text-white dark:text-[#0A0A0A] border border-[#0A0A0A] dark:border-[#F5F2ED]"
                  : "text-neutral-500 hover:text-[#0A0A0A] dark:hover:text-white"
              }`}
            >
              Trending Now
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`px-5 py-2 text-xs font-sans uppercase tracking-[0.2em] font-semibold transition cursor-pointer ${
                activeTab === "new"
                  ? "bg-[#0A0A0A] dark:bg-[#F5F2ED] text-white dark:text-[#0A0A0A] border border-[#0A0A0A] dark:border-[#F5F2ED]"
                  : "text-neutral-500 hover:text-[#0A0A0A] dark:hover:text-white"
              }`}
            >
              New Arrivals
            </button>
          </div>

          <div className="text-xs text-neutral-500 font-sans tracking-wider uppercase whitespace-nowrap">
            Showing <span className="font-bold text-[#D4AF37]">{filteredProducts.length}</span> luxury items
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#EBE8E3] dark:bg-neutral-900/50 border border-dashed border-black/10 dark:border-white/10 space-y-4">
            <Search className="w-12 h-12 text-[#D4AF37] mx-auto" />
            <h3 className="text-lg font-serif font-medium text-[#0A0A0A] dark:text-[#F5F2ED]">
              No matching luxury creations found
            </h3>
            <p className="text-xs text-neutral-500 font-sans max-w-sm mx-auto font-light leading-relaxed">
              Try adjusting your search parameters, category filters, or explore our flagship best-sellers.
            </p>
            <button
              onClick={resetFilters}
              className="editorial-btn-primary px-6 py-2.5 cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
