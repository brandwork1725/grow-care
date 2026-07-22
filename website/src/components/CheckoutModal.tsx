import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  X,
  Check,
  CreditCard,
  Lock,
  Truck,
  ShieldCheck,
  Printer,
  Sparkles,
  ArrowRight,
  PackageCheck
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { Order } from "../types";

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    cartSubtotal,
    formatPrice,
    createOrder,
    user,
    setIsAccountOpen,
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Form Fields
  const [email, setEmail] = useState(user.email);
  const [fullName, setFullName] = useState(user.name);
  const [street, setStreet] = useState(user.addresses[0]?.street || "740 Park Avenue");
  const [city, setCity] = useState(user.addresses[0]?.city || "New York");
  const [state, setState] = useState(user.addresses[0]?.state || "NY");
  const [postalCode, setPostalCode] = useState(user.addresses[0]?.postalCode || "10021");
  const [country, setCountry] = useState(user.addresses[0]?.country || "United States");

  const [paymentMethod, setPaymentMethod] = useState<"card" | "applepay" | "wire">("card");
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 8888");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("777");

  if (!isCheckoutOpen) return null;

  const estimatedTax = cartSubtotal * 0.08;
  const shippingFee = cartSubtotal >= 1500 || cartSubtotal === 0 ? 0 : 50;
  const totalAmount = cartSubtotal + estimatedTax + shippingFee;

  const handleCompleteOrder = () => {
    const newOrder = createOrder({
      items: [...cart],
      subtotal: cartSubtotal,
      discountAmount: 0,
      shippingFee,
      taxAmount: estimatedTax,
      total: totalAmount,
      currency: "USD",
      status: "Processing",
      shippingAddress: {
        id: `addr_${Date.now()}`,
        fullName,
        street,
        city,
        state,
        postalCode,
        country,
      },
      paymentMethod: paymentMethod === "card" ? "Credit Card (Visa Black Card)" : paymentMethod === "applepay" ? "Apple Pay Luxury" : "Bank Wire Transfer",
    });

    setConfirmedOrder(newOrder);
    setStep(4);
    clearCart();

    // Trigger celebratory confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#FDFBF7", "#000000", "#004B23"],
    });
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-none shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between bg-[#EBE8E3] dark:bg-neutral-950">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#D4AF37]" />
            <h2 className="text-lg font-serif font-medium italic text-[#0A0A0A] dark:text-[#F5F2ED]">
              GROW CARE Secure Checkout
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-neutral-500 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Tracker */}
        {step < 4 && (
          <div className="px-6 py-3 bg-[#FAF8F5] dark:bg-neutral-950 border-b border-black/10 dark:border-white/10 flex items-center justify-between text-xs font-sans">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? "text-[#D4AF37] font-bold" : "text-neutral-400"}`}>
              <span className="w-5 h-5 bg-[#D4AF37]/20 flex items-center justify-center text-[10px]">1</span>
              <span className="uppercase tracking-wider">Account</span>
            </div>
            <div className="h-px w-8 bg-black/10 dark:bg-white/10" />
            <div className={`flex items-center gap-1.5 ${step >= 2 ? "text-[#D4AF37] font-bold" : "text-neutral-400"}`}>
              <span className="w-5 h-5 bg-[#D4AF37]/20 flex items-center justify-center text-[10px]">2</span>
              <span className="uppercase tracking-wider">Address</span>
            </div>
            <div className="h-px w-8 bg-black/10 dark:bg-white/10" />
            <div className={`flex items-center gap-1.5 ${step >= 3 ? "text-[#D4AF37] font-bold" : "text-neutral-400"}`}>
              <span className="w-5 h-5 bg-[#D4AF37]/20 flex items-center justify-center text-[10px]">3</span>
              <span className="uppercase tracking-wider">Payment</span>
            </div>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* STEP 1: Account / Contact */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-lg font-serif font-bold text-neutral-900 dark:text-white">
                Contact & VIP Membership
              </h3>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-500 uppercase">{user.vipTier}</span>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white">{user.name}</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">{user.email}</div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-amber-500 text-black font-semibold">
                  Logged In
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Email Address for Invoice & Live Tracking</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3.5 rounded-full bg-neutral-900 dark:bg-amber-500 text-white dark:text-black font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                <span>Continue to Shipping Address</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Address */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-lg font-serif font-bold text-neutral-900 dark:text-white">
                White-Glove Delivery Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">Full Recipient Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">Street Address</label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">Postal Code</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 rounded-full bg-neutral-900 dark:bg-amber-500 text-white dark:text-black font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition flex items-center justify-center gap-2"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-lg font-serif font-bold text-neutral-900 dark:text-white">
                Payment Option
              </h3>

              {/* Payment Selectors */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3 rounded-2xl border text-center transition ${
                    paymentMethod === "card"
                      ? "border-amber-500 bg-amber-500/10 text-amber-500 font-bold"
                      : "border-neutral-200 dark:border-neutral-800 text-neutral-500"
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-[11px]">Credit Card</span>
                </button>

                <button
                  onClick={() => setPaymentMethod("applepay")}
                  className={`p-3 rounded-2xl border text-center transition ${
                    paymentMethod === "applepay"
                      ? "border-amber-500 bg-amber-500/10 text-amber-500 font-bold"
                      : "border-neutral-200 dark:border-neutral-800 text-neutral-500"
                  }`}
                >
                  <Sparkles className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-[11px]">Apple Pay</span>
                </button>

                <button
                  onClick={() => setPaymentMethod("wire")}
                  className={`p-3 rounded-2xl border text-center transition ${
                    paymentMethod === "wire"
                      ? "border-amber-500 bg-amber-500/10 text-amber-500 font-bold"
                      : "border-neutral-200 dark:border-neutral-800 text-neutral-500"
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-[11px]">Direct Wire</span>
                </button>
              </div>

              {/* Card Form */}
              {paymentMethod === "card" && (
                <div className="space-y-3 p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-neutral-500">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-neutral-500">Expiry</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-neutral-500">CVC</label>
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Total Calculation */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs font-sans">
                <span className="font-bold text-neutral-900 dark:text-white">Total Charge</span>
                <span className="text-lg font-serif font-bold text-amber-500">{formatPrice(totalAmount)}</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={handleCompleteOrder}
                  className="flex-1 py-3.5 rounded-full bg-amber-500 text-black font-semibold text-xs uppercase tracking-widest hover:opacity-90 transition flex items-center justify-center gap-2 shadow-xl"
                >
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Complete Purchase</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Confirmation & Receipt */}
          {step === 4 && confirmedOrder && (
            <div className="text-center space-y-6 py-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-500 text-amber-500 flex items-center justify-center mx-auto">
                <PackageCheck className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase font-sans tracking-widest text-amber-500 font-bold">Order Confirmed</span>
                <h3 className="text-2xl font-serif font-bold text-neutral-900 dark:text-white mt-1">
                  Thank You for Choosing GROW CARE
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans max-w-md mx-auto mt-1">
                  Your luxury creation has entered white-glove artisan preparation. An official receipt has been dispatched to <strong className="text-amber-500">{confirmedOrder.shippingAddress.fullName}</strong>.
                </p>
              </div>

              {/* Order Receipt Details */}
              <div className="p-5 rounded-2xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-left text-xs font-sans space-y-3">
                <div className="flex justify-between border-b pb-2 border-neutral-200 dark:border-neutral-800">
                  <span className="text-neutral-400">Order Reference</span>
                  <span className="font-bold text-amber-500">{confirmedOrder.id}</span>
                </div>
                <div className="flex justify-between border-b pb-2 border-neutral-200 dark:border-neutral-800">
                  <span className="text-neutral-400">Express Tracking Number</span>
                  <span className="font-bold text-neutral-800 dark:text-neutral-200">{confirmedOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between border-b pb-2 border-neutral-200 dark:border-neutral-800">
                  <span className="text-neutral-400">Total Paid</span>
                  <span className="font-serif font-bold text-neutral-900 dark:text-white">{formatPrice(confirmedOrder.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Estimated Delivery</span>
                  <span className="font-bold text-emerald-500">2-3 Business Days (Express Air)</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrintReceipt}
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt / PDF</span>
                </button>

                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setIsAccountOpen(true);
                  }}
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-amber-500 text-black font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition"
                >
                  Track Order in Portal
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
