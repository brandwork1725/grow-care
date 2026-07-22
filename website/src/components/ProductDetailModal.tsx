import React, { useState } from "react";
import {
  X,
  Star,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  Plus,
  Minus,
  Check,
  Sparkles,
  Share2
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { Product3DViewer } from "./3d/Product3DViewer";

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForDetail,
    setSelectedProductForDetail,
    formatPrice,
    addToCart,
    isInWishlist,
    toggleWishlist,
    products,
    setIsCheckoutOpen,
  } = useApp();

  if (!selectedProductForDetail) return null;

  const product = selectedProductForDetail;
  const isLiked = isInWishlist(product.id);

  const [activeTab, setActiveTab] = useState<"3d" | "gallery">("3d");
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "Standard");
  const [quantity, setQuantity] = useState(1);
  const [giftWrap, setGiftWrap] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Frequently bought together item
  const fbtProduct = products.find((p) => p.id !== product.id && p.category !== product.category) || products[0];

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity, giftWrap);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, quantity, giftWrap);
    setSelectedProductForDetail(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#FAF8F5] dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-none shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header bar */}
        <div className="px-6 py-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between bg-[#EBE8E3] dark:bg-neutral-950">
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF37] font-sans text-xs font-semibold uppercase tracking-[0.2em]">
              {product.category}
            </span>
            <span className="text-neutral-400">•</span>
            <span className="text-xs font-sans text-neutral-500 dark:text-neutral-400">
              ID: {product.id}
            </span>
          </div>

          <button
            onClick={() => setSelectedProductForDetail(null)}
            className="p-2 border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-neutral-500 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
          
          {/* Left Column: 3D Stage / Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 p-1 bg-[#EBE8E3] dark:bg-neutral-950 border border-black/10 dark:border-white/10 w-fit">
              <button
                onClick={() => setActiveTab("3d")}
                className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-sans uppercase tracking-[0.15em] font-semibold transition cursor-pointer ${
                  activeTab === "3d"
                    ? "bg-[#0A0A0A] text-white dark:bg-[#F5F2ED] dark:text-[#0A0A0A]"
                    : "text-neutral-500 hover:text-[#0A0A0A] dark:hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>3D Interactive View</span>
              </button>
              <button
                onClick={() => setActiveTab("gallery")}
                className={`px-4 py-1.5 text-xs font-sans uppercase tracking-[0.15em] font-semibold transition cursor-pointer ${
                  activeTab === "gallery"
                    ? "bg-[#0A0A0A] text-white dark:bg-[#F5F2ED] dark:text-[#0A0A0A]"
                    : "text-neutral-500 hover:text-[#0A0A0A] dark:hover:text-white"
                }`}
              >
                Photography Gallery
              </button>
            </div>

            {/* Display Stage */}
            {activeTab === "3d" ? (
              <Product3DViewer product={product} />
            ) : (
              <div className="space-y-3">
                <div className="relative h-[360px] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                  <img
                    src={selectedImage}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                        selectedImage === img
                          ? "border-amber-500 scale-105"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="thumb" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications Breakdown */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
              <h4 className="text-xs uppercase font-sans font-bold tracking-widest text-neutral-900 dark:text-neutral-100">
                Craftsmanship & Specs
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800/80">
                    <span className="text-neutral-400 block text-[10px] uppercase">{key}</span>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">{val}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Pricing & Purchase Options */}
          <div className="lg:col-span-5 space-y-6">
            
            <div>
              <h2 className="text-2xl font-serif font-bold text-neutral-900 dark:text-white">
                {product.name}
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span>{product.rating}</span>
                  <span className="text-neutral-400 font-normal">({product.reviewsCount} reviews)</span>
                </div>
                <span className="text-neutral-400">•</span>
                <span className="text-xs text-emerald-500 font-semibold">In Stock ({product.stock} available)</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-amber-500/20 flex items-center justify-between">
              <div>
                <div className="text-2xl font-serif font-bold text-neutral-900 dark:text-amber-300">
                  {formatPrice(product.price * quantity)}
                </div>
                {product.originalPrice && (
                  <div className="text-xs text-neutral-400 line-through">
                    {formatPrice(product.originalPrice * quantity)}
                  </div>
                )}
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-sans font-semibold">
                Complimentary Duty-Free
              </span>
            </div>

            {/* Color Swatch Picker */}
            <div className="space-y-2">
              <label className="text-xs font-sans font-semibold text-neutral-700 dark:text-neutral-300">
                Selected Shade: <span className="text-amber-500">{selectedColor}</span>
              </label>
              <div className="flex items-center gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-7 h-7 rounded-full border-2 transition ${
                      selectedColor === c.name ? "border-amber-400 scale-110 ring-2 ring-amber-400/50" : "border-neutral-300 dark:border-neutral-700 opacity-70"
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-sans font-semibold text-neutral-700 dark:text-neutral-300">Quantity</span>
              <div className="flex items-center gap-3 p-1 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1.5 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold font-sans px-2">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="p-1.5 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Gift Wrap Checkbox */}
            <label className="flex items-center gap-3 p-3 rounded-2xl bg-amber-500/5 border border-amber-500/20 cursor-pointer">
              <input
                type="checkbox"
                checked={giftWrap}
                onChange={(e) => setGiftWrap(e.target.checked)}
                className="rounded accent-amber-500"
              />
              <div className="text-xs font-sans">
                <span className="font-bold text-neutral-900 dark:text-amber-300">GROW CARE Signature Gift Packaging (+ Free)</span>
                <p className="text-neutral-500 dark:text-neutral-400 text-[11px]">Includes gold wax seal, hand-written calligraphy card, and satin ribbon.</p>
              </div>
            </label>

            {/* Main Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleAddToCart}
                className={`w-full py-3.5 rounded-full font-sans font-semibold text-xs tracking-widest uppercase transition flex items-center justify-center gap-2 ${
                  isAdded
                    ? "bg-emerald-600 text-white"
                    : "bg-neutral-900 dark:bg-amber-500 text-white dark:text-black hover:opacity-90"
                }`}
              >
                {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                <span>{isAdded ? "Added to Bag" : "Add to Shopping Bag"}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded-full font-sans font-semibold text-xs tracking-widest uppercase border border-neutral-300 dark:border-neutral-700 hover:border-amber-500 text-neutral-900 dark:text-white transition"
              >
                Express Checkout
              </button>
            </div>

            {/* Wishlist & Share Row */}
            <div className="flex items-center justify-between pt-2 text-xs text-neutral-500 dark:text-neutral-400 font-sans">
              <button
                onClick={() => toggleWishlist(product)}
                className="flex items-center gap-1.5 hover:text-amber-500 transition"
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
                <span>{isLiked ? "Saved in Wishlist" : "Save to Wishlist"}</span>
              </button>

              <button
                onClick={() => alert("Link copied to clipboard!")}
                className="flex items-center gap-1.5 hover:text-amber-500 transition"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Creation</span>
              </button>
            </div>

            {/* Frequently Bought Together Box */}
            {fbtProduct && (
              <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-3">
                <div className="text-[10px] uppercase tracking-widest font-bold text-amber-500">
                  Frequently Bought Together
                </div>
                <div className="flex items-center gap-3">
                  <img src={fbtProduct.image} alt={fbtProduct.name} referrerPolicy="no-referrer" className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1 text-xs">
                    <div className="font-semibold text-neutral-900 dark:text-white line-clamp-1">{fbtProduct.name}</div>
                    <div className="text-amber-500 font-bold">{formatPrice(fbtProduct.price)}</div>
                  </div>
                  <button
                    onClick={() => addToCart(fbtProduct, fbtProduct.colors[0]?.name, 1)}
                    className="px-3 py-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-[11px] font-semibold hover:bg-amber-500 hover:text-black transition"
                  >
                    + Add Pair
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
