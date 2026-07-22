import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Product,
  CartItem,
  Order,
  User,
  Currency,
  Language,
  FilterState,
  CurrencyCode,
  LanguageCode,
  Address
} from "../types";
import { INITIAL_PRODUCTS, CURRENCIES, LANGUAGES } from "../data/products";

interface AppContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, selectedColor?: string, quantity?: number, giftWrap?: boolean) => void;
  removeFromCart: (productId: string, selectedColor: string) => void;
  updateQuantity: (productId: string, selectedColor: string, newQty: number) => void;
  toggleGiftWrap: (productId: string, selectedColor: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Currency & Language & Theme
  currency: Currency;
  setCurrencyCode: (code: CurrencyCode) => void;
  formatPrice: (priceUSD: number) => string;
  language: Language;
  setLanguageCode: (code: LanguageCode) => void;
  theme: "dark" | "light";
  toggleTheme: () => void;

  // Filter & Search
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAIConciergeOpen: boolean;
  setIsAIConciergeOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (product: Product | null) => void;

  // Orders & Admin
  orders: Order[];
  createOrder: (orderData: Omit<Order, "id" | "date" | "trackingNumber">) => Order;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;

  // User
  user: User;
  updateUserAddress: (address: Address) => void;
}

const defaultUser: User = {
  id: "usr_001",
  name: "Duchess Eleanor Vance",
  email: "eleanor.vance@luxurymember.com",
  vipTier: "Black Card Connoisseur",
  points: 14800,
  addresses: [
    {
      id: "addr_1",
      fullName: "Duchess Eleanor Vance",
      street: "740 Park Avenue, Apt 14A",
      city: "New York",
      state: "NY",
      postalCode: "10021",
      country: "United States",
      isDefault: true,
    },
  ],
  orders: [],
};

const initialFilterState: FilterState = {
  category: "All",
  minPrice: 0,
  maxPrice: 10000,
  sort: "featured",
  searchQuery: "",
  inStockOnly: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);
  const [language, setLanguage] = useState<Language>(LANGUAGES[0]);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [filterState, setFilterState] = useState<FilterState>(initialFilterState);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAIConciergeOpen, setIsAIConciergeOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  // Orders
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User>(defaultUser);

  // Apply dark mode class to html document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Set document direction for RTL support (e.g., Arabic)
  useEffect(() => {
    document.documentElement.dir = language.direction;
  }, [language]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const setCurrencyCode = (code: CurrencyCode) => {
    const found = CURRENCIES.find((c) => c.code === code);
    if (found) setCurrency(found);
  };

  const setLanguageCode = (code: LanguageCode) => {
    const found = LANGUAGES.find((l) => l.code === code);
    if (found) setLanguage(found);
  };

  const formatPrice = (priceUSD: number) => {
    const converted = priceUSD * currency.rate;
    if (currency.code === "JPY") {
      return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${currency.symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  // Cart operations
  const addToCart = (
    product: Product,
    selectedColor?: string,
    quantity = 1,
    giftWrap = false
  ) => {
    const color = selectedColor || product.colors[0]?.name || "Standard";
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        return copy;
      }
      return [...prev, { product, quantity, selectedColor: color, giftWrap }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedColor: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedColor === selectedColor)
      )
    );
  };

  const updateQuantity = (productId: string, selectedColor: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedColor === selectedColor) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const toggleGiftWrap = (productId: string, selectedColor: string) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedColor === selectedColor) {
          return { ...item, giftWrap: !item.giftWrap };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) =>
    wishlist.some((p) => p.id === productId);

  // Filter resetting
  const resetFilters = () => setFilterState(initialFilterState);

  // Product Admin operations
  const addProduct = (newP: Omit<Product, "id">) => {
    const created: Product = {
      ...newP,
      id: `prod_${Date.now()}`,
    };
    setProducts((prev) => [created, ...prev]);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Orders
  const createOrder = (orderData: Omit<Order, "id" | "date" | "trackingNumber">): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `GC-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      trackingNumber: `GC-EXP-${Math.floor(10000000 + Math.random() * 90000000)}`,
    };
    setOrders((prev) => [newOrder, ...prev]);
    setUser((prev) => ({
      ...prev,
      orders: [newOrder, ...prev.orders],
      points: prev.points + Math.floor(newOrder.total * 2),
    }));
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const updateUserAddress = (newAddr: Address) => {
    setUser((prev) => ({
      ...prev,
      addresses: [newAddr, ...prev.addresses.filter((a) => a.id !== newAddr.id)],
    }));
  };

  return (
    <AppContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleGiftWrap,
        clearCart,
        cartCount,
        cartSubtotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        currency,
        setCurrencyCode,
        formatPrice,
        language,
        setLanguageCode,
        theme,
        toggleTheme,
        filterState,
        setFilterState,
        resetFilters,
        isCartOpen,
        setIsCartOpen,
        isAIConciergeOpen,
        setIsAIConciergeOpen,
        isAdminOpen,
        setIsAdminOpen,
        isAccountOpen,
        setIsAccountOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProductForDetail,
        setSelectedProductForDetail,
        orders,
        createOrder,
        updateOrderStatus,
        user,
        updateUserAddress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
