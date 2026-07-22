import React, { useState } from "react";
import {
  X,
  Sparkles,
  Send,
  ShoppingBag,
  Bot,
  User as UserIcon,
  Star,
  Check
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { Product } from "../types";

interface Message {
  id: string;
  sender: "concierge" | "user";
  text: string;
  suggestedProducts?: Product[];
}

export const AIConcierge: React.FC = () => {
  const {
    isAIConciergeOpen,
    setIsAIConciergeOpen,
    products,
    formatPrice,
    addToCart,
  } = useApp();

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "concierge",
      text: "Bonjour! I am Madame Valérie, your personal luxury style director at GROW CARE. How may I assist your style selection today?",
      suggestedProducts: [products[0], products[2]],
    },
  ]);

  if (!isAIConciergeOpen) return null;

  const handleSend = async (customPrompt?: string) => {
    const promptText = customPrompt || input;
    if (!promptText.trim()) return;

    const userMsg: Message = {
      id: `msg_${Date.now()}`,
      sender: "user",
      text: promptText,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: promptText }),
      });
      const data = await res.json();

      // Find matching products based on keywords in prompt
      const lower = promptText.toLowerCase();
      let matched = products.filter((p) => {
        if (lower.includes("handbag") || lower.includes("bag")) return p.category === "Women's Handbags";
        if (lower.includes("earring") || lower.includes("gold") || lower.includes("diamond")) return p.category === "Earrings";
        if (lower.includes("flower") || lower.includes("orchid") || lower.includes("rose")) return p.category === "Artificial Flowers";
        if (lower.includes("scarf") || lower.includes("accessory") || lower.includes("belt")) return p.category === "Fashion Accessories";
        return false;
      });

      if (matched.length === 0) {
        matched = [products[0], products[4]];
      }

      const botMsg: Message = {
        id: `msg_${Date.now() + 1}`,
        sender: "concierge",
        text: data.response || "Allow me to introduce our signature creations handcrafted with gold, calfskin, and crystal precision.",
        suggestedProducts: matched.slice(0, 2),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const fallbackMsg: Message = {
        id: `msg_${Date.now() + 1}`,
        sender: "concierge",
        text: "Based on your refined preference, I recommend exploring our Aurelia Obsidian Satchel and Celestia 18K Diamond Drop Earrings.",
        suggestedProducts: [products[0], products[2]],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "18K Gold Gift under $5,000",
    "Obsidian Bag for Evening Gala",
    "Crystal Floral Centerpiece for Penthouse",
    "Silk Scarf & Earrings Styling Pair",
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-[#FAF8F5] dark:bg-neutral-900 h-full shadow-2xl flex flex-col border-l border-black/10 dark:border-white/10">
        
        {/* Header */}
        <div className="p-5 border-b border-black/10 dark:border-white/10 flex items-center justify-between bg-[#0A0A0A] text-[#F5F2ED]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-[#D4AF37]/40 bg-[#0A0A0A] flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="font-serif font-medium text-base text-white">Madame Valérie</h3>
              <div className="text-[10px] text-[#D4AF37] font-sans tracking-[0.2em] uppercase font-semibold">
                AI Haute Couture Director
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsAIConciergeOpen(false)}
            className="p-2 border border-white/10 hover:bg-white/10 text-neutral-400 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Style Prompts Row */}
        <div className="px-4 py-2.5 bg-[#D4AF37]/10 border-b border-[#D4AF37]/20 overflow-x-auto flex items-center gap-2 text-xs font-sans">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp)}
              className="px-3 py-1 bg-white dark:bg-neutral-800 border border-[#D4AF37]/30 text-[#0A0A0A] dark:text-[#F5F2ED] hover:border-[#D4AF37] whitespace-nowrap text-[11px] uppercase tracking-wider font-semibold transition cursor-pointer"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 font-sans">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[85%] p-4 text-xs leading-relaxed ${
                  m.sender === "user"
                    ? "bg-[#0A0A0A] text-white font-medium border border-black"
                    : "bg-[#EBE8E3] dark:bg-neutral-950 text-[#0A0A0A] dark:text-[#F5F2ED] border border-black/10 dark:border-white/10"
                }`}
              >
                {m.text}
              </div>

              {/* Product Recommendations inside Chat */}
              {m.suggestedProducts && m.suggestedProducts.length > 0 && (
                <div className="mt-3 space-y-2 w-full max-w-[85%]">
                  <div className="text-[10px] uppercase font-semibold text-[#D4AF37] tracking-[0.2em]">
                    Recommended Selections:
                  </div>
                  {m.suggestedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 bg-white dark:bg-neutral-950 border border-black/10 dark:border-white/10 flex items-center justify-between gap-3 shadow-sm hover:border-[#D4AF37]/50 transition"
                    >
                      <img src={p.image} alt={p.name} referrerPolicy="no-referrer" className="w-12 h-12 object-cover border border-black/10" />
                      <div className="flex-1 text-xs">
                        <div className="font-serif font-medium text-[#0A0A0A] dark:text-[#F5F2ED] line-clamp-1">{p.name}</div>
                        <div className="text-[#064E3B] dark:text-emerald-400 font-semibold">{formatPrice(p.price)}</div>
                      </div>
                      <button
                        onClick={() => addToCart(p, p.colors[0]?.name, 1)}
                        className="editorial-btn-primary px-3 py-1.5 text-[10px] uppercase cursor-pointer flex items-center gap-1"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#D4AF37] italic font-sans animate-pulse">
              <Bot className="w-4 h-4" />
              <span>Madame Valérie is curating recommendations...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-black/10 dark:border-white/10 bg-[#EBE8E3] dark:bg-neutral-950 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask Madame Valérie (e.g., 'Gift for gala tonight')..."
            className="flex-1 px-4 py-3 text-xs bg-white dark:bg-black border border-black/20 dark:border-white/20 text-[#0A0A0A] dark:text-white font-sans focus:outline-none focus:border-[#D4AF37]"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading}
            className="editorial-btn-primary p-3 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
