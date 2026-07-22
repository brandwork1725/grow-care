import React, { useState } from "react";
import {
  X,
  User as UserIcon,
  Package,
  Heart,
  MapPin,
  Award,
  Clock,
  Truck,
  CheckCircle2,
  Trash2,
  ShoppingBag
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const AccountModal: React.FC = () => {
  const {
    isAccountOpen,
    setIsAccountOpen,
    user,
    wishlist,
    toggleWishlist,
    addToCart,
    formatPrice,
    orders,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "addresses">("orders");

  if (!isAccountOpen) return null;

  const allOrders = [...user.orders, ...orders];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header Profile Summary */}
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-700 p-0.5 shadow-xl">
              <div className="w-full h-full rounded-full bg-neutral-950 flex items-center justify-center text-amber-400 font-serif font-bold text-xl">
                {user.name.charAt(0)}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-serif font-bold">{user.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-sans uppercase font-bold">
                  {user.vipTier}
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-sans">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-2xl bg-neutral-800/80 border border-neutral-700 text-right">
              <div className="text-[10px] text-neutral-400 uppercase tracking-widest font-sans">VIP Points</div>
              <div className="text-sm font-serif font-bold text-amber-400">{user.points.toLocaleString()} PTS</div>
            </div>

            <button
              onClick={() => setIsAccountOpen(false)}
              className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection Row */}
        <div className="px-6 py-3 bg-neutral-100 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2 text-xs font-sans">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold transition ${
              activeTab === "orders" ? "bg-amber-500 text-black shadow-md" : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Orders ({allOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("wishlist")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold transition ${
              activeTab === "wishlist" ? "bg-amber-500 text-black shadow-md" : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Saved Wishlist ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold transition ${
              activeTab === "addresses" ? "bg-amber-500 text-black shadow-md" : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Saved Addresses ({user.addresses.length})</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 font-sans">
          
          {/* ORDERS TAB */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              {allOrders.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <Package className="w-12 h-12 text-neutral-400 mx-auto" />
                  <div className="text-base font-serif font-bold text-neutral-800 dark:text-neutral-200">
                    No Order History Yet
                  </div>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    When you place an order, live tracking and white-glove delivery notifications will appear here.
                  </p>
                </div>
              ) : (
                allOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 gap-2">
                      <div>
                        <span className="font-serif font-bold text-sm text-neutral-900 dark:text-amber-300">{ord.id}</span>
                        <div className="text-[11px] text-neutral-500">Placed on {ord.date}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{ord.status}</span>
                        </span>
                        <span className="text-xs font-serif font-bold text-neutral-900 dark:text-white">{formatPrice(ord.total)}</span>
                      </div>
                    </div>

                    <div className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                      <div className="font-semibold text-neutral-800 dark:text-neutral-200">Items:</div>
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>{item.quantity}x {item.product.name} ({item.selectedColor})</span>
                          <span>{formatPrice(item.product.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-neutral-500">
                      <span>Tracking: <strong className="text-neutral-800 dark:text-neutral-200">{ord.trackingNumber}</strong></span>
                      <span className="text-amber-500 font-semibold">+ {Math.floor(ord.total * 2)} VIP Points Earned</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* WISHLIST TAB */}
          {activeTab === "wishlist" && (
            <div>
              {wishlist.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <Heart className="w-12 h-12 text-neutral-400 mx-auto" />
                  <div className="text-base font-serif font-bold text-neutral-800 dark:text-neutral-200">
                    Your Wishlist is Empty
                  </div>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    Click the heart icon on any handbag, earring, or floral sculpture to save items here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlist.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center gap-4"
                    >
                      <img src={p.image} alt={p.name} referrerPolicy="no-referrer" className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1 text-xs">
                        <div className="font-serif font-bold text-neutral-900 dark:text-white line-clamp-1">{p.name}</div>
                        <div className="text-amber-500 font-bold mt-0.5">{formatPrice(p.price)}</div>
                        <button
                          onClick={() => addToCart(p, p.colors[0]?.name, 1)}
                          className="mt-2 px-3 py-1 rounded-full bg-amber-500 text-black font-bold text-[10px] uppercase flex items-center gap-1 hover:opacity-90"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Bag</span>
                        </button>
                      </div>
                      <button
                        onClick={() => toggleWishlist(p)}
                        className="p-2 text-neutral-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ADDRESSES TAB */}
          {activeTab === "addresses" && (
            <div className="space-y-4">
              {user.addresses.map((a) => (
                <div key={a.id} className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-neutral-900 dark:text-white">{a.fullName}</span>
                    {a.isDefault && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-bold">
                        Default Delivery
                      </span>
                    )}
                  </div>
                  <div className="text-neutral-500">{a.street}</div>
                  <div className="text-neutral-500">{a.city}, {a.state} {a.postalCode}, {a.country}</div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
