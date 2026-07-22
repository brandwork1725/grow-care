import React, { useState } from "react";
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Sparkles,
  ShieldAlert,
  Sun,
  Moon,
  Globe,
  DollarSign,
  ChevronDown,
  Menu,
  X,
  Mic,
  SlidersHorizontal
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { CURRENCIES, LANGUAGES } from "../data/products";
import { CategoryType, CurrencyCode, LanguageCode } from "../types";

export const Navbar: React.FC = () => {
  const {
    cartCount,
    wishlist,
    currency,
    setCurrencyCode,
    language,
    setLanguageCode,
    theme,
    toggleTheme,
    setIsCartOpen,
    setIsAIConciergeOpen,
    setIsAdminOpen,
    setIsAccountOpen,
    filterState,
    setFilterState,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isVoiceListening, setIsVoiceListening] = useState(false);

  const categories: { name: CategoryType; desc: string; icon: string }[] = [
    {
      name: "Fashion Accessories",
      desc: "Silk scarves, gold-buckle belts & filigree craft",
      icon: "✨",
    },
    {
      name: "Women's Handbags",
      desc: "Obsidian calfskin, quilted clutches & tote satchels",
      icon: "👜",
    },
    {
      name: "Artificial Flowers",
      desc: "Crystal petal orchid blooms & eternity velvet roses",
      icon: "🌸",
    },
    {
      name: "Earrings",
      desc: "18K solid gold chandeliers & emerald drop luminaries",
      icon: "💎",
    },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterState((prev) => ({ ...prev, searchQuery: e.target.value }));
  };

  const handleVoiceSearch = () => {
    setIsVoiceListening(true);
    setTimeout(() => {
      setIsVoiceListening(false);
      setFilterState((prev) => ({ ...prev, searchQuery: "Gold handbag" }));
    }, 2000);
  };

  const handleCategoryClick = (cat: CategoryType | "All") => {
    setFilterState((prev) => ({ ...prev, category: cat }));
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#F5F2ED]/85 dark:bg-[#0A0A0A]/85 border-b border-black/5 dark:border-white/10 transition-colors duration-300">
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#0A0A0A] text-[#D4AF37] text-[11px] py-2 px-4 text-center font-sans tracking-[0.2em] uppercase flex items-center justify-between border-b border-white/5">
        <div className="hidden sm:flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          <span>GROW CARE • EMPOWER ELEGANCE</span>
        </div>
        <div className="mx-auto sm:mx-0 font-medium">
          COMPLIMENTARY WHITE-GLOVE EXPRESS SHIPPING ON ORDERS OVER $1,500
        </div>
        <div className="hidden md:flex items-center gap-4 text-neutral-400 text-[10px] tracking-[0.15em]">
          <span>PARIS</span>
          <span>•</span>
          <span>NEW YORK</span>
          <span>•</span>
          <span>TOKYO</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => handleCategoryClick("All")}
            className="group flex flex-col text-left focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif font-medium tracking-[0.2em] text-[#0A0A0A] dark:text-[#F5F2ED] group-hover:text-[#D4AF37] transition-colors uppercase">
                GROW CARE
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#0A0A0A] dark:text-[#D4AF37] border border-[#D4AF37]/30 font-sans tracking-widest uppercase font-semibold">
                Haute Couture
              </span>
            </div>
            <span className="text-[9px] font-sans tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
              EMPOWER ELEGANCE
            </span>
          </button>

          {/* Desktop Category Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <div
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button
                onClick={() => handleCategoryClick("All")}
                className="flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] font-sans font-semibold text-[#0A0A0A] dark:text-[#F5F2ED] hover:text-[#D4AF37] py-2 transition"
              >
                <span>Collections</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              {/* Mega Menu Dropdown */}
              {isMegaMenuOpen && (
                <div className="absolute top-full left-0 w-96 p-5 rounded-none bg-[#F5F2ED] dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 shadow-2xl grid grid-cols-1 gap-2 z-50 animate-fadeIn">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold px-2 pb-2 border-b border-black/5 dark:border-white/10">
                    Signature Luxury Collections
                  </div>
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => handleCategoryClick(cat.name)}
                      className="group flex items-start gap-3 p-3 rounded-none hover:bg-[#EBE8E3] dark:hover:bg-neutral-900 text-left transition-all"
                    >
                      <span className="text-xl p-2 rounded-none bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                        {cat.icon}
                      </span>
                      <div>
                        <div className="text-xs font-serif font-semibold text-[#0A0A0A] dark:text-[#F5F2ED] group-hover:text-[#D4AF37] transition">
                          {cat.name}
                        </div>
                        <div className="text-[11px] text-neutral-600 dark:text-neutral-400 font-sans">
                          {cat.desc}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsAIConciergeOpen(true)}
              className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-none border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#0A0A0A] dark:text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#D4AF37]/20 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>AI Concierge</span>
            </button>
          </nav>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-sm relative">
          <Search className="w-4 h-4 absolute left-3.5 text-neutral-400" />
          <input
            type="text"
            value={filterState.searchQuery}
            onChange={handleSearchChange}
            placeholder="Search handbags, earrings, flowers..."
            className="w-full pl-10 pr-10 py-2 rounded-none text-xs bg-white/60 dark:bg-neutral-900/60 border border-black/10 dark:border-white/10 text-[#0A0A0A] dark:text-[#F5F2ED] placeholder-neutral-400 focus:outline-none focus:border-[#D4AF37] transition"
          />
          <button
            onClick={handleVoiceSearch}
            className={`absolute right-3 p-1 text-neutral-400 hover:text-[#D4AF37] transition ${
              isVoiceListening ? "text-[#D4AF37] animate-ping" : ""
            }`}
            title="Voice Search"
          >
            <Mic className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Controls: Preferences, Cart, Account, Admin */}
        <div className="flex items-center gap-3">
          {/* Currency Selector */}
          <div className="relative hidden xl:block">
            <button
              onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-sans font-semibold uppercase tracking-wider text-[#0A0A0A] dark:text-[#F5F2ED] hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              <span>{currency.code} ({currency.symbol})</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {isCurrencyDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-36 bg-[#F5F2ED] dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 shadow-xl py-1 z-50 text-xs">
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCurrencyCode(c.code as CurrencyCode);
                      setIsCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#D4AF37]/15 transition ${
                      currency.code === c.code ? "text-[#D4AF37] font-semibold" : "text-[#0A0A0A] dark:text-[#F5F2ED]"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 text-[#0A0A0A] dark:text-[#F5F2ED] hover:bg-black/5 dark:hover:bg-white/5 transition"
            title="Toggle Light/Dark Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-[#D4AF37]" /> : <Moon className="w-4 h-4 text-[#0A0A0A]" />}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsAccountOpen(true)}
            className="relative p-2 text-[#0A0A0A] dark:text-[#F5F2ED] hover:bg-black/5 dark:hover:bg-white/5 transition"
            title="View Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#D4AF37] text-black text-[10px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Drawer Toggle Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2 bg-[#0A0A0A] dark:bg-[#F5F2ED] text-white dark:text-[#0A0A0A] font-sans text-xs font-semibold uppercase tracking-[0.15em] border border-[#0A0A0A] dark:border-[#F5F2ED] hover:opacity-90 transition shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#D4AF37] text-black text-[10px] font-bold">
              {cartCount}
            </span>
          </button>

          {/* Account Portal Button */}
          <button
            onClick={() => setIsAccountOpen(true)}
            className="hidden sm:flex items-center gap-1.5 p-2 text-[#0A0A0A] dark:text-[#F5F2ED] hover:bg-black/5 dark:hover:bg-white/5 transition"
            title="Customer VIP Account"
          >
            <UserIcon className="w-4 h-4" />
          </button>

          {/* Admin Dashboard Toggle */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="p-2 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition"
            title="Owner / Admin Portal"
          >
            <ShieldAlert className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#0A0A0A] dark:text-[#F5F2ED]"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
            <input
              type="text"
              value={filterState.searchQuery}
              onChange={handleSearchChange}
              placeholder="Search luxury products..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <div className="text-[10px] uppercase tracking-widest text-neutral-400 px-2 py-1">
              Categories
            </div>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-neutral-800 dark:text-neutral-200 hover:bg-amber-500/10 flex items-center gap-2"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => {
                setIsAIConciergeOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-medium"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Concierge</span>
            </button>
            <div className="flex items-center gap-2 text-xs font-sans text-neutral-600 dark:text-neutral-400">
              <span>{currency.code}</span>
              <span>•</span>
              <span>{language.name}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
