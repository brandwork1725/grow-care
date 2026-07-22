import React, { useState } from "react";
import { Heart, Eye, ShoppingBag, Star, Sparkles, Check } from "lucide-react";
import { Product } from "../types";
import { useApp } from "../context/AppContext";
import { Card3DTilt } from "./3d/Card3DTilt";

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    formatPrice,
    addToCart,
    isInWishlist,
    toggleWishlist,
    setSelectedProductForDetail,
  } = useApp();

  const [selectedColorHex, setSelectedColorHex] = useState(
    product.colors[0]?.hex || "#D4AF37"
  );
  const [selectedColorName, setSelectedColorName] = useState(
    product.colors[0]?.name || "Standard"
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColorName, 1, false);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <Card3DTilt className="h-full">
      <div className="group relative bg-[#FAF8F5] dark:bg-neutral-900 rounded-none overflow-hidden border border-black/10 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
        {/* Top Image Container */}
        <div
          onClick={() => setSelectedProductForDetail(product)}
          className="relative h-72 w-full bg-[#EBE8E3] dark:bg-neutral-950 overflow-hidden cursor-pointer"
        >
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
          />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isBestSeller && (
              <span className="px-3 py-1 bg-[#D4AF37] text-black font-sans font-semibold text-[10px] uppercase tracking-[0.15em]">
                Best Seller
              </span>
            )}
            {product.isNew && (
              <span className="px-3 py-1 bg-[#0A0A0A] text-white font-sans font-semibold text-[10px] uppercase tracking-[0.15em]">
                New Arrival
              </span>
            )}
            {product.discount && (
              <span className="px-3 py-1 bg-[#064E3B] text-white font-sans font-semibold text-[10px] uppercase tracking-[0.15em]">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Action Hover Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product);
              }}
              className={`p-2.5 rounded-none backdrop-blur-md border transition-all ${
                isLiked
                  ? "bg-rose-600 text-white border-rose-500"
                  : "bg-[#0A0A0A]/60 text-white border-white/20 hover:bg-[#0A0A0A]"
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-white" : ""}`} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProductForDetail(product);
              }}
              className="p-2.5 rounded-none bg-[#0A0A0A]/60 text-white border border-white/20 backdrop-blur-md hover:bg-[#0A0A0A] transition-all"
              title="3D Quick View & Specs"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* 3D Indicator Badge on Image */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 bg-[#0A0A0A]/80 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-sans tracking-[0.15em] uppercase backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>3D View</span>
          </div>
        </div>

        {/* Product Information Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-[10px] text-[#D4AF37] font-sans font-semibold uppercase tracking-[0.2em] mb-1">
              <span>{product.category}</span>
              <div className="flex items-center gap-1 text-[#D4AF37] font-bold">
                <Star className="w-3 h-3 fill-[#D4AF37]" />
                <span>{product.rating}</span>
                <span className="text-neutral-400 font-normal">({product.reviewsCount})</span>
              </div>
            </div>

            <h3
              onClick={() => setSelectedProductForDetail(product)}
              className="font-serif font-medium text-lg text-[#0A0A0A] dark:text-[#F5F2ED] line-clamp-1 hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              {product.name}
            </h3>

            <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 mt-1 font-light leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Color Swatches */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 font-sans">Shade:</span>
            <div className="flex items-center gap-1.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    setSelectedColorHex(c.hex);
                    setSelectedColorName(c.name);
                  }}
                  style={{ backgroundColor: c.hex }}
                  className={`w-3.5 h-3.5 rounded-full border border-black/20 dark:border-white/20 transition-all ${
                    selectedColorHex === c.hex
                      ? "ring-2 ring-[#D4AF37] scale-110"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Price & Add To Cart Button */}
          <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
            <div>
              <div className="text-xl font-serif font-semibold text-[#064E3B] dark:text-emerald-400">
                {formatPrice(product.price)}
              </div>
              {product.originalPrice && (
                <div className="text-xs text-neutral-400 line-through font-sans">
                  {formatPrice(product.originalPrice)}
                </div>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className={`editorial-btn-primary px-4 py-2.5 flex items-center gap-2 cursor-pointer ${
                addedAnimation ? "!bg-[#064E3B] !border-[#064E3B] text-white" : ""
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Card3DTilt>
  );
};
