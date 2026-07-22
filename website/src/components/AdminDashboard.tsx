import React, { useState } from "react";
import {
  X,
  Plus,
  Trash2,
  Edit2,
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  Package,
  AlertTriangle,
  Sparkles,
  Check,
  Search
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { Product, CategoryType } from "../types";

export const AdminDashboard: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    formatPrice,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"products" | "orders" | "analytics" | "ai">("products");

  // New Product Modal Form State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newPName, setNewPName] = useState("");
  const [newPCategory, setNewPCategory] = useState<CategoryType>("Women's Handbags");
  const [newPPrice, setNewPPrice] = useState(2500);
  const [newPStock, setNewPStock] = useState(10);
  const [newPImage, setNewPImage] = useState("https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop");
  const [newPDesc, setNewPDesc] = useState("Handcrafted luxury masterpiece with gold accents.");

  if (!isAdminOpen) return null;

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 148250); // initial base + live orders
  const totalOrdersCount = orders.length + 84;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: newPName,
      category: newPCategory,
      price: newPPrice,
      rating: 5.0,
      reviewsCount: 1,
      image: newPImage,
      images: [newPImage],
      description: newPDesc,
      specs: { "Material": "Italian Leather & 18K Gold" },
      details: ["Handcrafted by master artisans"],
      colors: [{ name: "Champagne Gold", hex: "#D4AF37" }],
      modelType: "handbag",
      stock: newPStock,
      tags: ["admin-added"],
    });
    setIsAddProductOpen(false);
    setNewPName("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-black flex items-center justify-center font-bold">
              GC
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-white">GROW CARE Owner & Admin Portal</h2>
              <p className="text-xs text-neutral-400 font-sans">Real-Time Inventory, Order Fulfillment & Analytics</p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* KPI Summary Cards */}
        <div className="p-6 grid grid-cols-2 lg:grid-cols-4 gap-4 bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 font-sans">
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Gross Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-xl font-serif font-bold text-neutral-900 dark:text-amber-300">
              {formatPrice(totalRevenue)}
            </div>
            <div className="text-[10px] text-emerald-500 font-semibold">+18.4% vs last month</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Total Orders</span>
              <ShoppingBag className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-xl font-serif font-bold text-neutral-900 dark:text-white">
              {totalOrdersCount}
            </div>
            <div className="text-[10px] text-emerald-500 font-semibold">100% White-Glove Fulfilled</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Active Products</span>
              <Package className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-xl font-serif font-bold text-neutral-900 dark:text-white">
              {products.length} Items
            </div>
            <div className="text-[10px] text-amber-500 font-semibold">4 Flagship Categories</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Conversion Rate</span>
              <TrendingUp className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-xl font-serif font-bold text-neutral-900 dark:text-white">
              4.2%
            </div>
            <div className="text-[10px] text-emerald-500 font-semibold">+0.6% Haute Couture benchmark</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-3 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-sans">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("products")}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                activeTab === "products" ? "bg-amber-500 text-black shadow-md" : "text-neutral-500 hover:text-white"
              }`}
            >
              Product Inventory ({products.length})
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                activeTab === "orders" ? "bg-amber-500 text-black shadow-md" : "text-neutral-500 hover:text-white"
              }`}
            >
              Order Management ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab("ai")}
              className={`px-4 py-2 rounded-full font-semibold transition flex items-center gap-1 ${
                activeTab === "ai" ? "bg-amber-500 text-black shadow-md" : "text-neutral-500 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Insights</span>
            </button>
          </div>

          {activeTab === "products" && (
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="px-4 py-2 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black font-bold text-xs flex items-center gap-1 hover:opacity-90 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          )}
        </div>

        {/* Body Area */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 font-sans">
          
          {/* PRODUCT INVENTORY TAB */}
          {activeTab === "products" && (
            <div className="space-y-3">
              <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-100 dark:bg-neutral-950 text-neutral-400 uppercase font-bold text-[10px]">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Stock</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition">
                        <td className="p-3 flex items-center gap-3">
                          <img src={p.image} alt={p.name} referrerPolicy="no-referrer" className="w-10 h-10 rounded-xl object-cover" />
                          <span className="font-serif font-bold text-neutral-900 dark:text-white">{p.name}</span>
                        </td>
                        <td className="p-3 font-semibold text-amber-500">{p.category}</td>
                        <td className="p-3 font-bold">{formatPrice(p.price)}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            p.stock < 8 ? "bg-rose-500/10 text-rose-500" : "bg-emerald-500/10 text-emerald-500"
                          }`}>
                            {p.stock} in stock
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 text-neutral-400 hover:text-rose-500 transition"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ORDERS MANAGEMENT TAB */}
          {activeTab === "orders" && (
            <div className="space-y-3">
              {orders.length === 0 ? (
                <div className="text-center py-12 text-neutral-400 text-xs">
                  No pending customer orders placed in this session yet.
                </div>
              ) : (
                orders.map((ord) => (
                  <div key={ord.id} className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-amber-500">{ord.id} • {ord.shippingAddress.fullName}</div>
                      <div className="text-neutral-500">{ord.items.length} items • Total: {formatPrice(ord.total)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                        className="px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 font-bold"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* AI INSIGHTS TAB */}
          {activeTab === "ai" && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-500 uppercase">
                  <Sparkles className="w-4 h-4" />
                  <span>Gemini Store Optimization Intelligence</span>
                </div>
                <p className="text-neutral-700 dark:text-neutral-300">
                  Analysis detects high demand for <strong>Earrings</strong> (+34% searches this week) and <strong>Obsidian Handbags</strong>. Stock for Celestia 18K Diamond Earrings is low (6 pairs remaining). Consider triggering restock alert.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Add Product Modal Overlay */}
        {isAddProductOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <form onSubmit={handleCreateProduct} className="w-full max-w-md bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-amber-500/30 space-y-4 text-xs font-sans">
              <div className="flex justify-between items-center font-serif font-bold text-base text-neutral-900 dark:text-white">
                <span>Add New Luxury Product</span>
                <button type="button" onClick={() => setIsAddProductOpen(false)} className="text-neutral-400">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="font-semibold block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newPName}
                  onChange={(e) => setNewPName(e.target.value)}
                  placeholder="e.g. Royal Sovereign Clutch"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Category</label>
                  <select
                    value={newPCategory}
                    onChange={(e) => setNewPCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800"
                  >
                    <option value="Women's Handbags">Women's Handbags</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Artificial Flowers">Artificial Flowers</option>
                    <option value="Fashion Accessories">Fashion Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Price ($ USD)</label>
                  <input
                    type="number"
                    value={newPPrice}
                    onChange={(e) => setNewPPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Image URL</label>
                <input
                  type="text"
                  value={newPImage}
                  onChange={(e) => setNewPImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Description</label>
                <textarea
                  value={newPDesc}
                  onChange={(e) => setNewPDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-amber-500 text-black font-bold uppercase tracking-wider"
              >
                Create Product
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
