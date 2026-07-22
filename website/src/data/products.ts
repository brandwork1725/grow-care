import { Product } from "../types";

// Generated image assets
import handbagMain from "../assets/images/handbag_luxury_3d_1784659439495.jpg";
import earringsMain from "../assets/images/earrings_luxury_gold_1784659452849.jpg";
import flowersMain from "../assets/images/artificial_flowers_emerald_1784659467381.jpg";
import heroBanner from "../assets/images/hero_luxury_banner_1784659428889.jpg";
import showroomMain from "../assets/images/brand_story_showroom_1784659479509.jpg";

export const BRAND_ASSETS = {
  heroBanner,
  showroomMain,
};

export const INITIAL_PRODUCTS: Product[] = [
  // WOMEN'S HANDBAGS
  {
    id: "1",
    name: "Aurelia Obsidian Gold Satchel",
    category: "Women's Handbags",
    price: 3450,
    originalPrice: 3800,
    rating: 4.95,
    reviewsCount: 128,
    image: handbagMain,
    images: [
      handbagMain,
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Handcrafted in Florence from full-grain obsidian leather, adorned with polished 18K champagne gold hardware and an ergonomic signature top handle.",
    specs: {
      "Material": "Calfskin Leather & 18K Gold Plated Brass",
      "Dimensions": "28cm x 20cm x 12cm",
      "Origin": "Florence, Italy",
      "Lining": "Micro-Suede Velvet",
      "Closure": "Magnetic Twist Clasp"
    },
    details: [
      "Signature GROW CARE engraved lock emblem",
      "Includes detachable leather shoulder strap",
      "Dual interior zip compartments",
      "Comes with velvet dust bag & certificate of authenticity"
    ],
    colors: [
      { name: "Obsidian Black", hex: "#121212" },
      { name: "Champagne Gold", hex: "#D4AF37" },
      { name: "Royal Emerald", hex: "#004B23" }
    ],
    modelType: "handbag",
    isBestSeller: true,
    isTrending: true,
    stock: 14,
    discount: 10,
    tags: ["luxury", "handbag", "gold", "best-seller", "leather"]
  },
  {
    id: "2",
    name: "Elysian Quilted Ivory Clutch",
    category: "Women's Handbags",
    price: 2100,
    rating: 4.88,
    reviewsCount: 84,
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "A geometric diamond-quilted evening clutch in pristine ivory lambskin with woven champagne gold chain strap.",
    specs: {
      "Material": "French Lambskin & Gold Metal",
      "Dimensions": "22cm x 14cm x 6cm",
      "Origin": "Paris, France",
      "Lining": "Silk Satin",
      "Strap Drop": "55cm"
    },
    details: [
      "Ultra-lightweight luxury frame",
      "Card slots for 6 credit cards",
      "Discreet exterior mirror pocket"
    ],
    colors: [
      { name: "Ivory White", hex: "#FDFBF7" },
      { name: "Midnight Navy", hex: "#001A33" }
    ],
    modelType: "handbag",
    isNew: true,
    stock: 8,
    tags: ["clutch", "ivory", "evening", "quilted"]
  },

  // EARRINGS
  {
    id: "3",
    name: "Celestia 18K Diamond Drop Earrings",
    category: "Earrings",
    price: 4800,
    originalPrice: 5200,
    rating: 5.0,
    reviewsCount: 96,
    image: earringsMain,
    images: [
      earringsMain,
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Cascading 18K solid yellow gold chandelier earrings featuring ethically sourced brilliant-cut diamonds, inspired by celestial constellations.",
    specs: {
      "Gold Purity": "18K Solid Yellow Gold (750)",
      "Gemstone": "Natural Diamonds (VVS1 Clarity, E Color)",
      "Carat Weight": "2.40 ctw",
      "Length": "62mm",
      "Weight": "14.2 grams pair"
    },
    details: [
      "Hand-set precision pavé settings",
      "Secure double-notch push back locks",
      "Certified by the International Gemological Institute (IGI)"
    ],
    colors: [
      { name: "Yellow Gold", hex: "#E5C158" },
      { name: "Rose Gold", hex: "#B76E79" },
      { name: "Platinum White", hex: "#E5E4E2" }
    ],
    modelType: "earrings",
    isBestSeller: true,
    isTrending: true,
    stock: 6,
    discount: 8,
    tags: ["earrings", "diamond", "gold", "fine-jewelry"]
  },
  {
    id: "4",
    name: "Royal Emerald Luminary Drop Earrings",
    category: "Earrings",
    price: 3950,
    rating: 4.92,
    reviewsCount: 62,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Deep Colombian emerald cut gemstones encased in brushed metallic gold geometric crowns.",
    specs: {
      "Main Stone": "Natural Colombian Emerald (3.8 ctw)",
      "Metal": "18K Gold Plated Recycled Silver",
      "Length": "45mm"
    },
    details: [
      "Vibrant verdant green hue",
      "Limited edition creation of 50 pairs worldwide"
    ],
    colors: [
      { name: "Emerald Gold", hex: "#004B23" }
    ],
    modelType: "earrings",
    isNew: true,
    stock: 5,
    tags: ["emerald", "earrings", "green", "limited-edition"]
  },

  // ARTIFICIAL FLOWERS
  {
    id: "5",
    name: "Crystal Orchid & Emerald Bloom Vase",
    category: "Artificial Flowers",
    price: 1850,
    rating: 4.96,
    reviewsCount: 110,
    image: flowersMain,
    images: [
      flowersMain,
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Masterpiece artificial floral sculpture crafted from frosted crystal petals, hand-blown amber glass vase, and 24K gold-leafed stems.",
    specs: {
      "Height": "65cm",
      "Vase Material": "Hand-Blown Crystal Glass",
      "Petal Composition": "High-Density Silk & Resin Crystal Finish",
      "Maintenance": "Dust-resistant permanent coating, lifetime durability"
    },
    details: [
      "Never fades or wilts, keeping permanent elegance",
      "Weighted bronze-infused base for total stability",
      "Each branch artfully poseable to match any luxury interior space"
    ],
    colors: [
      { name: "Frosted Emerald", hex: "#0B6623" },
      { name: "Ivory Pearl", hex: "#F5F5DC" }
    ],
    modelType: "flower",
    isBestSeller: true,
    stock: 10,
    tags: ["artificial-flowers", "decor", "sculpture", "crystal"]
  },
  {
    id: "6",
    name: "Eternity Velvet Rose & Gold Bouquet",
    category: "Artificial Flowers",
    price: 1250,
    rating: 4.89,
    reviewsCount: 75,
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Deep burgundy velvet roses infused with subtle gold shimmer edges, set in a metallic brass cylinder pedestal.",
    specs: {
      "Height": "50cm",
      "Rose Count": "18 stems",
      "Material": "Imperial Micro-Velvet & Brass"
    },
    details: [
      "Scent-infused with signature GROW CARE rose perfume",
      "Hand-assembled by master floral artisans"
    ],
    colors: [
      { name: "Burgundy Velvet", hex: "#800020" },
      { name: "Pure Gold", hex: "#FFD700" }
    ],
    modelType: "flower",
    isTrending: true,
    stock: 12,
    tags: ["roses", "decor", "artificial-flowers", "velvet"]
  },

  // FASHION ACCESSORIES
  {
    id: "7",
    name: "Imperial Silk Scarf with Gold Filigree",
    category: "Fashion Accessories",
    price: 920,
    rating: 4.91,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "100% Mulberry silk square scarf woven with golden filigree patterns inspired by Greco-Roman architecture.",
    specs: {
      "Fabric": "100% Grade 6A Organic Mulberry Silk",
      "Dimensions": "90cm x 90cm",
      "Edges": "Hand-rolled and hand-stitched hem",
      "Origin": "Como, Italy"
    },
    details: [
      "Reversible contrast weave design",
      "Hypoallergenic and breathable ultra-smooth texture",
      "Packaged in custom hard-shell gold magnetic box"
    ],
    colors: [
      { name: "Royal Gold & Black", hex: "#121212" },
      { name: "Champagne Cream", hex: "#FFFDD0" }
    ],
    modelType: "accessory",
    isBestSeller: true,
    stock: 20,
    tags: ["scarf", "silk", "accessories", "italy"]
  },
  {
    id: "8",
    name: "Sovereign Gold Emblem Leather Belt",
    category: "Fashion Accessories",
    price: 1150,
    rating: 4.87,
    reviewsCount: 53,
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Reversible black and saddle brown Italian leather belt featuring 3D sculpted GROW CARE monogram buckle.",
    specs: {
      "Width": "3.5cm",
      "Buckle": "Solid Brass with 18K Gold Finish",
      "Sizes": "80cm - 110cm"
    },
    details: [
      "Dual-sided reversible mechanism",
      "Scratch-resistant gold coating"
    ],
    colors: [
      { name: "Obsidian / Tan", hex: "#3E2723" }
    ],
    modelType: "accessory",
    isTrending: true,
    stock: 15,
    tags: ["belt", "leather", "accessories", "gold-buckle"]
  }
];

export const CURRENCIES = [
  { code: "USD", symbol: "$", rate: 1.0, label: "USD - US Dollar" },
  { code: "EUR", symbol: "€", rate: 0.92, label: "EUR - Euro" },
  { code: "GBP", symbol: "£", rate: 0.78, label: "GBP - British Pound" },
  { code: "AED", symbol: "AED ", rate: 3.67, label: "AED - UAE Dirham" },
  { code: "JPY", symbol: "¥", rate: 155.0, label: "JPY - Japanese Yen" },
];

export const LANGUAGES = [
  { code: "en", name: "English", direction: "ltr" },
  { code: "fr", name: "Français", direction: "ltr" },
  { code: "ar", name: "العربية", direction: "rtl" },
  { code: "zh", name: "中文 (繁體)", direction: "ltr" },
  { code: "ja", name: "日本語", direction: "ltr" },
];
