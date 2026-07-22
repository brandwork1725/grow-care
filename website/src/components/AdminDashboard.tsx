import React, { useState } from "react";
import {
  X,
  Plus,
  Trash2,
  Edit3,
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  Package,
  AlertTriangle,
  Sparkles,
  Check,
  Search,
  Tag,
  ShieldCheck,
  Percent,
  Truck,
  ArrowUpRight,
  Eye,
  Star
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { Product, CategoryType, Order } from "../types";

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
    createOrder,
    formatPrice,
    setIsAIConciergeOpen,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"products" | "orders" | "promos" | "analytics">("products");

  // Search filter inside admin
  const [adminSearch, setAdminSearch] = useState("");

  // Add Product Modal Form State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newPName, setNewPName] = useState("");
  const [newPCategory, setNewPCategory] = useState<CategoryType>("Women's Handbags");
  const [newPPrice, setNewPPrice] = useState(2800);
  const [newPStock, setNewPStock] = useState(12);
  const [newPImage, setNewPImage] = useState("https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop");
  const [newPDesc, setNewPDesc] = useState("Handcrafted luxury masterpiece with 18K solid gold hardware and grain leather finish.");

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Promo Codes State
  const [promoCodes, setPromoCodes] = useState([
    { code: "LUXURY20", discount: "20% OFF", type: "Percentage", active: true, uses: 142 },
    { code: "WELCOME200", discount: "$200 OFF", type: "Fixed Amount", active: true, uses: 89 },
    { code: "VIPBLACK", discount: "30% OFF", type: "Exclusive VIP", active: true, uses: 34 },
  ]);
  const [newCodeName, setNewCodeName] = useState("");
  const [newCodeDiscount, setNewCodeDiscount] = useState("15% OFF");

  if (!isAdminOpen) return null;

  // Analytics calculation
  const totalLiveOrderRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const baseRevenue = 148250;
  const totalRevenue = baseRevenue + totalLiveOrderRevenue;
  const totalOrdersCount = orders.length + 84;
  const lowStockProducts = products.filter((p) => p.stock < 8);

  // Filtered products list inside admin
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(adminSearch.toLowerCase())
  );

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPName.trim()) return;
    addProduct({
      name: newPName,
      category: newPCategory,
      price: newPPrice,
      rating: 5.0,
      reviewsCount: 1,
      image: newPImage,
      images: [newPImage],
      description: newPDesc,
      specs: { "Craftsmanship": "Artisanal Handmade", "Material": "Italian Calfskin & 18K Gold Hardware" },
      details: ["Handcrafted by master artisans in Paris", "Includes Certificate of Authenticity"],
      colors: [{ name: "Imperial Gold", hex: "#D4AF37" }],
      modelType: "handbag",
      stock: newPStock,
      tags: ["Admin Featured", "Haute Couture"],
      isNew: true,
    });
    setIsAddProductOpen(false);
    setNewPName("");
  };

  const handleSaveEditedProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct);
    setEditingProduct(null);
  };

  const handleAddPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCodeName.trim()) return;
    setPromoCodes((prev) => [
      { code: newCodeName.toUpperCase(), discount: newCodeDiscount, type: "Custom Promo", active: true, uses: 0 },
      ...prev,
    ]);
    setNewCodeName("");
  };

  const handleCreateMockOrder = () => {
    createOrder({
      items: [
        {
          product: products[0] || { id: "p1", name: "Imperial Gold Satchel", price: 3400, image: "", category: "Women's Handbags", colors: [] },
          quantity: 1,
          selectedColor: "Champagne Gold",
        },
      ],
      total: 3400,
      status: "Processing",
      shippingAddress: {
        fullName: "Lady Genevieve Sterling",
        street: "12 Mayfair Square",
        city: "London",
        state: "Greater London",
        postalCode: "W1J 8AJ",
        country: "United Kingdom",
      },
      paymentMethod: "Visa VIP Black (*4921)",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#FAF8F5] dark:bg-neutral-900 border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-black/10 dark:border-white/10 bg-[#0A0A0A] text-[#F5F2ED] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-[#D4AF37]/40 bg-[#0A0A0A] flex items-center justify-center font-serif text-[#D4AF37] font-semibold text-lg">
              GC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-medium text-lg text-[#F5F2ED]">
                  GROW CARE Owner & Admin Suite
                </h2>
                <span className="px-2.5 py-0.5 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[9px] font-sans font-semibold uppercase tracking-[0.2em]">
                  Master Portal
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-sans font-light">
                Real-Time Inventory Control, Order Fulfillment, Promo Management & Gemini Analytics
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 border border-white/10 hover:bg-white/10 text-neutral-400 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top KPI Metrics Bar */}
        <div className="p-6 grid grid-cols-2 lg:grid-cols-4 gap-4 bg-[#EBE8E3] dark:bg-neutral-950 border-b border-black/10 dark:border-white/10 font-sans">
          <div className="p-4 bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 space-y-1">
            <div className="flex items-center justify-between text-neutral-500 text-[11px] uppercase tracking-wider font-semibold">
              <span>Gross Revenue</span>
              <DollarSign className="w-4 h-4 text-[#064E3B] dark:text-emerald-400" />
            </div>
            <div className="text-xl font-serif font-semibold text-[#064E3B] dark:text-emerald-400">
              {formatPrice(totalRevenue)}
            </div>
            <div className="text-[10px] text-[#064E3B] dark:text-emerald-400 font-semibold uppercase tracking-wider">
              +18.4% Month-Over-Month
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 space-y-1">
            <div className="flex items-center justify-between text-neutral-500 text-[11px] uppercase tracking-wider font-semibold">
              <span>Total Orders</span>
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="text-xl font-serif font-semibold text-[#0A0A0A] dark:text-[#F5F2ED]">
              {totalOrdersCount} Orders
            </div>
            <div className="text-[10px] text-[#064E3B] dark:text-emerald-400 font-semibold uppercase tracking-wider">
              100% White-Glove Fulfilled
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 space-y-1">
            <div className="flex items-center justify-between text-neutral-500 text-[11px] uppercase tracking-wider font-semibold">
              <span>Inventory</span>
              <Package className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="text-xl font-serif font-semibold text-[#0A0A0A] dark:text-[#F5F2ED]">
              {products.length} Products
            </div>
            <div className="text-[10px] text-[#D4AF37] font-semibold uppercase tracking-wider">
              {lowStockProducts.length} Items Require Restock
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 space-y-1">
            <div className="flex items-center justify-between text-neutral-500 text-[11px] uppercase tracking-wider font-semibold">
              <span>VIP Conversion</span>
              <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-xl font-serif font-semibold text-[#0A0A0A] dark:text-[#F5F2ED]">
              4.8% Rate
            </div>
            <div className="text-[10px] text-[#064E3B] dark:text-emerald-400 font-semibold uppercase tracking-wider">
              High Connoisseur Retention
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-3 bg-[#FAF8F5] dark:bg-neutral-900 border-b border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab("products")}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-semibold transition cursor-pointer ${
                activeTab === "products"
                  ? "bg-[#0A0A0A] dark:bg-[#F5F2ED] text-white dark:text-[#0A0A0A]"
                  : "text-neutral-500 hover:text-[#0A0A0A] dark:hover:text-white"
              }`}
            >
              Inventory ({products.length})
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-semibold transition cursor-pointer ${
                activeTab === "orders"
                  ? "bg-[#0A0A0A] dark:bg-[#F5F2ED] text-white dark:text-[#0A0A0A]"
                  : "text-neutral-500 hover:text-[#0A0A0A] dark:hover:text-white"
              }`}
            >
              Orders & Fulfillment ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab("promos")}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-semibold transition cursor-pointer ${
                activeTab === "promos"
                  ? "bg-[#0A0A0A] dark:bg-[#F5F2ED] text-white dark:text-[#0A0A0A]"
                  : "text-neutral-500 hover:text-[#0A0A0A] dark:hover:text-white"
              }`}
            >
              Promo Codes ({promoCodes.length})
            </button>

            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === "analytics"
                  ? "bg-[#0A0A0A] dark:bg-[#F5F2ED] text-white dark:text-[#0A0A0A]"
                  : "text-neutral-500 hover:text-[#0A0A0A] dark:hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>AI Analytics</span>
            </button>
          </div>

          {activeTab === "products" && (
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="editorial-btn-primary px-4 py-2 text-xs flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Product</span>
            </button>
          )}

          {activeTab === "orders" && (
            <button
              onClick={handleCreateMockOrder}
              className="editorial-btn-secondary px-4 py-2 text-xs flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Test Order</span>
            </button>
          )}
        </div>

        {/* Main Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 font-sans">
          
          {/* TAB 1: PRODUCT INVENTORY */}
          {activeTab === "products" && (
            <div className="space-y-4">
              {/* Filter / Search inside Inventory */}
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                  <input
                    type="text"
                    value={adminSearch}
                    onChange={(e) => setAdminSearch(e.target.value)}
                    placeholder="Search inventory by title or category..."
                    className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-black border border-black/20 dark:border-white/20 text-[#0A0A0A] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">
                  Showing {filteredProducts.length} of {products.length} Products
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EBE8E3] dark:bg-neutral-950 text-[#0A0A0A] dark:text-[#F5F2ED] uppercase font-semibold text-[10px] tracking-[0.15em]">
                    <tr>
                      <th className="p-3.5">Product Item</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Price</th>
                      <th className="p-3.5">Stock</th>
                      <th className="p-3.5">Badges</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10 dark:divide-white/10">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition">
                        <td className="p-3.5 flex items-center gap-3">
                          <img src={p.image} alt={p.name} referrerPolicy="no-referrer" className="w-12 h-12 object-cover border border-black/10" />
                          <div>
                            <div className="font-serif font-medium text-sm text-[#0A0A0A] dark:text-[#F5F2ED]">{p.name}</div>
                            <div className="text-[10px] text-neutral-500 font-sans">ID: {p.id}</div>
                          </div>
                        </td>
                        <td className="p-3.5 font-semibold text-[#D4AF37] uppercase tracking-wider text-[11px]">{p.category}</td>
                        <td className="p-3.5 font-serif font-semibold text-[#064E3B] dark:text-emerald-400 text-sm">{formatPrice(p.price)}</td>
                        <td className="p-3.5">
                          <span className={`px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                            p.stock < 8 ? "bg-rose-500/15 text-rose-600 border border-rose-500/30" : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                          }`}>
                            {p.stock} units
                          </span>
                        </td>
                        <td className="p-3.5">
                          <div className="flex flex-wrap gap-1">
                            {p.isBestSeller && (
                              <span className="px-2 py-0.5 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[9px] font-semibold uppercase tracking-widest">
                                Best Seller
                              </span>
                            )}
                            {p.isNew && (
                              <span className="px-2 py-0.5 bg-black dark:bg-white text-white dark:text-black text-[9px] font-semibold uppercase tracking-widest">
                                New
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => setEditingProduct(p)}
                            className="p-2 border border-black/10 dark:border-white/10 hover:border-[#D4AF37] text-neutral-600 dark:text-neutral-300 transition cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-2 border border-black/10 dark:border-white/10 hover:border-rose-500 text-neutral-600 dark:text-neutral-300 hover:text-rose-500 transition cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: ORDER FULFILLMENT */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-medium text-lg text-[#0A0A0A] dark:text-[#F5F2ED]">
                  Client Orders & White-Glove Shipping
                </h3>
                <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">
                  {orders.length} Active Session Orders
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="p-12 text-center bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 space-y-3">
                  <ShoppingBag className="w-10 h-10 text-[#D4AF37] mx-auto" />
                  <div className="font-serif text-base text-[#0A0A0A] dark:text-[#F5F2ED]">
                    No placed orders in this session yet
                  </div>
                  <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto">
                    Orders placed via Checkout or the Add Test Order button will display here for instant status tracking and white-glove fulfillment.
                  </p>
                  <button
                    onClick={handleCreateMockOrder}
                    className="editorial-btn-primary px-5 py-2.5 text-xs cursor-pointer"
                  >
                    Generate Sample Order
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-5 bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 space-y-3 font-sans"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-black/10 dark:border-white/10 pb-3 gap-2">
                        <div>
                          <div className="font-serif font-semibold text-base text-[#0A0A0A] dark:text-[#F5F2ED]">
                            Order {ord.id}
                          </div>
                          <div className="text-xs text-neutral-500">
                            Placed on {ord.date} • Client: <strong className="text-[#0A0A0A] dark:text-white">{ord.shippingAddress.fullName}</strong>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-base font-serif font-semibold text-[#064E3B] dark:text-emerald-400">
                            {formatPrice(ord.total)}
                          </span>
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                            className="px-3 py-1.5 bg-[#FAF8F5] dark:bg-black border border-black/20 dark:border-white/20 text-xs font-semibold uppercase tracking-wider text-[#0A0A0A] dark:text-white"
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        {/* Purchased Items */}
                        <div className="space-y-2">
                          <div className="text-[10px] uppercase font-semibold text-[#D4AF37] tracking-widest">
                            Items ({ord.items.length}):
                          </div>
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-2 bg-[#FAF8F5] dark:bg-neutral-950 border border-black/5 dark:border-white/5">
                              <img src={it.product.image} alt={it.product.name} referrerPolicy="no-referrer" className="w-10 h-10 object-cover" />
                              <div className="flex-1">
                                <div className="font-serif font-medium text-xs text-[#0A0A0A] dark:text-[#F5F2ED]">{it.product.name}</div>
                                <div className="text-[10px] text-neutral-500">
                                  Qty: {it.quantity} • Shade: {it.selectedColor}
                                </div>
                              </div>
                              <div className="font-serif font-semibold">{formatPrice(it.product.price * it.quantity)}</div>
                            </div>
                          ))}
                        </div>

                        {/* Shipping Details */}
                        <div className="space-y-1.5 p-3 bg-[#EBE8E3] dark:bg-neutral-950 border border-black/5 dark:border-white/5">
                          <div className="text-[10px] uppercase font-semibold text-[#D4AF37] tracking-widest flex items-center gap-1">
                            <Truck className="w-3.5 h-3.5" />
                            <span>Destination & Tracking</span>
                          </div>
                          <div className="text-neutral-700 dark:text-neutral-300 font-light">
                            {ord.shippingAddress.street}, {ord.shippingAddress.city}, {ord.shippingAddress.state} {ord.shippingAddress.postalCode}, {ord.shippingAddress.country}
                          </div>
                          <div className="pt-1 text-[11px] text-neutral-500">
                            Tracking Code: <strong className="font-mono text-[#0A0A0A] dark:text-white">{ord.trackingNumber}</strong>
                          </div>
                          <div className="text-[11px] text-neutral-500">
                            Payment: {ord.paymentMethod}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROMO CODES */}
          {activeTab === "promos" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif font-medium text-lg text-[#0A0A0A] dark:text-[#F5F2ED]">
                    Store Promotions & VIP Vouchers
                  </h3>
                  <p className="text-xs text-neutral-500 font-light">
                    Active discount vouchers applied by clients during bag checkout.
                  </p>
                </div>
              </div>

              {/* Add New Promo Code Form */}
              <form onSubmit={handleAddPromoCode} className="p-4 bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 flex flex-col sm:flex-row gap-3 items-end">
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold block">
                    New Promo Code
                  </label>
                  <input
                    type="text"
                    required
                    value={newCodeName}
                    onChange={(e) => setNewCodeName(e.target.value)}
                    placeholder="e.g. EMPOWER30"
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-black border border-black/20 dark:border-white/20 text-[#0A0A0A] dark:text-white uppercase font-sans focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold block">
                    Discount Amount / Rate
                  </label>
                  <input
                    type="text"
                    required
                    value={newCodeDiscount}
                    onChange={(e) => setNewCodeDiscount(e.target.value)}
                    placeholder="e.g. 15% OFF or $150 OFF"
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-black border border-black/20 dark:border-white/20 text-[#0A0A0A] dark:text-white font-sans focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="editorial-btn-primary px-5 py-2.5 text-xs cursor-pointer shrink-0"
                >
                  Create Promo Code
                </button>
              </form>

              {/* Promo List */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {promoCodes.map((pc, idx) => (
                  <div key={idx} className="p-5 bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-base text-[#D4AF37] uppercase">{pc.code}</span>
                      <span className="px-2 py-0.5 bg-[#064E3B]/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold uppercase tracking-wider">
                        Active
                      </span>
                    </div>
                    <div className="text-xl font-serif font-semibold text-[#0A0A0A] dark:text-[#F5F2ED]">
                      {pc.discount}
                    </div>
                    <div className="text-xs text-neutral-500 flex justify-between pt-2 border-t border-black/5 dark:border-white/5">
                      <span>{pc.type}</span>
                      <span>{pc.uses} Redeemed</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: AI ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              {/* Gemini AI Intelligence Banner */}
              <div className="p-6 bg-[#0A0A0A] text-[#F5F2ED] border border-[#D4AF37]/30 space-y-3">
                <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.2em]">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Gemini Executive Store Intelligence</span>
                </div>
                <h4 className="text-xl font-serif italic text-[#F5F2ED]">
                  Optimization Briefing for GROW CARE Flagship
                </h4>
                <p className="text-xs text-neutral-300 font-light leading-relaxed max-w-3xl">
                  Client telemetry shows high surge interest in 18K solid gold chandeliers (+42% views this week) and the Imperial Gold Obsidian Clutch. Recommended actions: increase safety inventory for <strong>Women's Handbags</strong> and run a targeted private VIP preview for the autumn silk collection.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => {
                      setIsAdminOpen(false);
                      setIsAIConciergeOpen(true);
                    }}
                    className="editorial-btn-primary px-5 py-2 text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span>Consult Madame Valérie AI</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Revenue by Category Breakdown */}
              <div className="p-6 bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 space-y-4">
                <h4 className="font-serif font-medium text-base text-[#0A0A0A] dark:text-[#F5F2ED]">
                  Sales Share by Category
                </h4>

                <div className="space-y-3 text-xs font-sans">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Women's Handbags</span>
                      <span className="font-serif font-semibold">48% ($71,160)</span>
                    </div>
                    <div className="w-full h-2 bg-black/5 dark:bg-white/10">
                      <div className="h-full bg-[#D4AF37] w-[48%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>18K Gold Earrings</span>
                      <span className="font-serif font-semibold">27% ($40,027)</span>
                    </div>
                    <div className="w-full h-2 bg-black/5 dark:bg-white/10">
                      <div className="h-full bg-[#064E3B] dark:bg-emerald-500 w-[27%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Crystal Artificial Flowers</span>
                      <span className="font-serif font-semibold">15% ($22,237)</span>
                    </div>
                    <div className="w-full h-2 bg-black/5 dark:bg-white/10">
                      <div className="h-full bg-purple-600 w-[15%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Mulberry Silk Accessories</span>
                      <span className="font-serif font-semibold">10% ($14,825)</span>
                    </div>
                    <div className="w-full h-2 bg-black/5 dark:bg-white/10">
                      <div className="h-full bg-rose-600 w-[10%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* MODAL: ADD PRODUCT OVERLAY */}
        {isAddProductOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <form
              onSubmit={handleCreateProduct}
              className="w-full max-w-lg bg-[#FAF8F5] dark:bg-neutral-900 p-6 border border-black/20 dark:border-white/20 shadow-2xl space-y-4 text-xs font-sans"
            >
              <div className="flex justify-between items-center pb-3 border-b border-black/10 dark:border-white/10">
                <h3 className="font-serif font-medium text-lg text-[#0A0A0A] dark:text-[#F5F2ED]">
                  Add New Luxury Creation
                </h3>
                <button type="button" onClick={() => setIsAddProductOpen(false)} className="p-1 hover:text-[#D4AF37]">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="font-semibold uppercase tracking-wider text-[10px] text-neutral-600 block mb-1">
                  Product Title
                </label>
                <input
                  type="text"
                  required
                  value={newPName}
                  onChange={(e) => setNewPName(e.target.value)}
                  placeholder="e.g. Sovereign Imperial Gold Clutch"
                  className="w-full px-3 py-2 bg-white dark:bg-black border border-black/20 dark:border-white/20 text-[#0A0A0A] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold uppercase tracking-wider text-[10px] text-neutral-600 block mb-1">
                    Category
                  </label>
                  <select
                    value={newPCategory}
                    onChange={(e) => setNewPCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white dark:bg-black border border-black/20 dark:border-white/20 text-[#0A0A0A] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Women's Handbags">Women's Handbags</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Artificial Flowers">Artificial Flowers</option>
                    <option value="Fashion Accessories">Fashion Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold uppercase tracking-wider text-[10px] text-neutral-600 block mb-1">
                    Price ($ USD)
                  </label>
                  <input
                    type="number"
                    value={newPPrice}
                    onChange={(e) => setNewPPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white dark:bg-black border border-black/20 dark:border-white/20 text-[#0A0A0A] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold uppercase tracking-wider text-[10px] text-neutral-600 block mb-1">
                    Initial Stock
                  </label>
                  <input
                    type="number"
                    value={newPStock}
                    onChange={(e) => setNewPStock(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white dark:bg-black border border-black/20 dark:border-white/20 text-[#0A0A0A] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="font-semibold uppercase tracking-wider text-[10px] text-neutral-600 block mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={newPImage}
                    onChange={(e) => setNewPImage(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-black border border-black/20 dark:border-white/20 text-[#0A0A0A] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold uppercase tracking-wider text-[10px] text-neutral-600 block mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newPDesc}
                  onChange={(e) => setNewPDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-black border border-black/20 dark:border-white/20 text-[#0A0A0A] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                className="editorial-btn-primary w-full py-3.5 text-xs uppercase tracking-[0.2em] font-semibold cursor-pointer"
              >
                Publish to Storefront
              </button>
            </form>
          </div>
        )}

        {/* MODAL: EDIT PRODUCT OVERLAY */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <form
              onSubmit={handleSaveEditedProduct}
              className="w-full max-w-lg bg-[#FAF8F5] dark:bg-neutral-900 p-6 border border-black/20 dark:border-white/20 shadow-2xl space-y-4 text-xs font-sans"
            >
              <div className="flex justify-between items-center pb-3 border-b border-black/10 dark:border-white/10">
                <h3 className="font-serif font-medium text-lg text-[#0A0A0A] dark:text-[#F5F2ED]">
                  Edit Product #{editingProduct.id}
                </h3>
                <button type="button" onClick={() => setEditingProduct(null)} className="p-1 hover:text-[#D4AF37]">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="font-semibold uppercase tracking-wider text-[10px] text-neutral-600 block mb-1">
                  Product Title
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-black border border-black/20 dark:border-white/20 text-[#0A0A0A] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold uppercase tracking-wider text-[10px] text-neutral-600 block mb-1">
                    Price ($ USD)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white dark:bg-black border border-black/20 dark:border-white/20 text-[#0A0A0A] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="font-semibold uppercase tracking-wider text-[10px] text-neutral-600 block mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white dark:bg-black border border-black/20 dark:border-white/20 text-[#0A0A0A] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isBestSeller || false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isBestSeller: e.target.checked })}
                    className="accent-[#D4AF37]"
                  />
                  <span>Mark as Best Seller</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isNew || false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isNew: e.target.checked })}
                    className="accent-[#D4AF37]"
                  />
                  <span>Mark as New Arrival</span>
                </label>
              </div>

              <button
                type="submit"
                className="editorial-btn-primary w-full py-3.5 text-xs uppercase tracking-[0.2em] font-semibold cursor-pointer"
              >
                Save Product Changes
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

