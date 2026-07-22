import React, { useState } from "react";
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  Gift,
  ArrowRight,
  ShieldCheck,
  Tag
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    toggleGiftWrap,
    cartSubtotal,
    formatPrice,
    setIsCheckoutOpen,
  } = useApp();

  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscountRate, setAppliedDiscountRate] = useState(0); // 0.2 for 20%
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 1500;
  const shippingProgress = Math.min((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const discountAmount = cartSubtotal * appliedDiscountRate;
  const estimatedTax = (cartSubtotal - discountAmount) * 0.08;
  const estimatedShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0 ? 0 : 50;
  const finalTotal = cartSubtotal - discountAmount + estimatedTax + estimatedShipping;

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "LUXURY20") {
      setAppliedDiscountRate(0.2);
      setCouponSuccess("20% VIP Coupon Applied!");
      setCouponError("");
    } else {
      setCouponError("Invalid code. Try 'LUXURY20' for 20% off.");
      setCouponSuccess("");
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-[#FAF8F5] dark:bg-neutral-900 h-full shadow-2xl flex flex-col border-l border-black/10 dark:border-white/10">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-black/10 dark:border-white/10 flex items-center justify-between bg-[#EBE8E3] dark:bg-neutral-950">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-xl font-serif font-medium italic text-[#0A0A0A] dark:text-[#F5F2ED]">
              Shopping Bag ({cart.length})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-neutral-500 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="px-6 py-3 bg-[#D4AF37]/10 border-b border-[#D4AF37]/20 text-xs font-sans">
          {remainingForFreeShipping > 0 ? (
            <div className="space-y-1.5">
              <div className="flex justify-between text-[#0A0A0A] dark:text-[#F5F2ED]">
                <span>Add <strong className="text-[#D4AF37] font-semibold">{formatPrice(remainingForFreeShipping)}</strong> for Free Express Shipping</span>
                <span className="font-semibold">{Math.round(shippingProgress)}%</span>
              </div>
              <div className="w-full h-1 bg-black/10 dark:bg-white/10 overflow-hidden">
                <div
                  style={{ width: `${shippingProgress}%` }}
                  className="h-full bg-[#D4AF37] transition-all duration-500"
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-[#064E3B] dark:text-emerald-400 font-semibold uppercase tracking-wider text-[11px]">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Complimentary White-Glove Express Delivery Unlocked</span>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <ShoppingBag className="w-12 h-12 text-[#D4AF37] mx-auto" />
              <div className="text-lg font-serif font-medium text-[#0A0A0A] dark:text-[#F5F2ED]">
                Your Shopping Bag is empty
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto font-light leading-relaxed">
                Discover our signature obsidian handbags, 18K gold drop earrings, and crystal floral arrangements.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="editorial-btn-primary px-6 py-3 cursor-pointer"
              >
                Explore Collections
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor}`}
                className="p-4 bg-[#FAF8F5] dark:bg-neutral-950 border border-black/10 dark:border-white/10 flex gap-4"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 object-cover border border-black/10"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="font-serif font-medium text-sm text-[#0A0A0A] dark:text-[#F5F2ED] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                        className="text-neutral-400 hover:text-rose-600 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-neutral-500 font-sans mt-0.5">
                      Shade: <span className="font-semibold text-[#D4AF37]">{item.selectedColor}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 p-1 bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-xs">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor, item.quantity - 1)}
                        className="p-1 hover:text-[#D4AF37] transition cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold px-1.5">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor, item.quantity + 1)}
                        className="p-1 hover:text-[#D4AF37] transition cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="font-serif font-semibold text-sm text-[#064E3B] dark:text-emerald-400">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>

                  {/* Gift Wrap Toggle */}
                  <button
                    onClick={() => toggleGiftWrap(item.product.id, item.selectedColor)}
                    className={`mt-2 text-[10px] flex items-center gap-1 font-sans transition uppercase tracking-wider ${
                      item.giftWrap ? "text-[#D4AF37] font-semibold" : "text-neutral-400 hover:text-neutral-200"
                    }`}
                  >
                    <Gift className="w-3 h-3" />
                    <span>{item.giftWrap ? "Signature Gift Box Included (+Free)" : "Add Gift Box (+Free)"}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Calculation */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-black/10 dark:border-white/10 bg-[#EBE8E3] dark:bg-neutral-950 space-y-4">
            
            {/* Promo Code Input */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Promo Code (e.g. LUXURY20)"
                  className="flex-1 px-3 py-2 text-xs bg-white dark:bg-black border border-black/20 dark:border-white/20 text-[#0A0A0A] dark:text-white uppercase font-sans focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="editorial-btn-secondary px-4 py-2 cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {couponSuccess && <div className="text-[10px] text-[#064E3B] font-semibold">{couponSuccess}</div>}
              {couponError && <div className="text-[10px] text-rose-500">{couponError}</div>}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs font-sans text-neutral-600 dark:text-neutral-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              {appliedDiscountRate > 0 && (
                <div className="flex justify-between text-[#064E3B] dark:text-emerald-400 font-semibold">
                  <span>VIP Discount (20%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span>{formatPrice(estimatedTax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Express White-Glove Shipping</span>
                <span>{estimatedShipping === 0 ? "FREE" : formatPrice(estimatedShipping)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-black/10 dark:border-white/10 text-base font-serif font-semibold text-[#0A0A0A] dark:text-[#F5F2ED]">
                <span>Total</span>
                <span className="text-[#064E3B] dark:text-emerald-400">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleProceedCheckout}
              className="editorial-btn-primary w-full py-4 text-xs font-sans tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
