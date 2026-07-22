import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini lazily
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// Health check route
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", brand: "GROW CARE", tagline: "EMPOWER ELEGANCE" });
});

// AI Concierge Chat Route
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, history, userPreferences } = req.body;
    const ai = getGenAI();

    if (!ai) {
      // Fallback elegant response if API key is not configured
      return res.json({
        response: "Welcome to GROW CARE. As your personal luxury concierge, I recommend exploring our Aurelia Obsidian Tote or 18K Celestia Earrings to elevate your style. How may I assist your selection today?",
        suggestedProductIds: ["1", "4"]
      });
    }

    const systemInstruction = `You are Madame Valérie, the elite luxury fashion concierge and personal shopper for GROW CARE (Tagline: "EMPOWER ELEGANCE").
Your tone is remarkably sophisticated, polite, helpful, and exclusive—like a senior director at a Haute Couture salon on Place Vendôme in Paris.
Suggest products from GROW CARE's four signature categories: Fashion Accessories, Women's Handbags, Artificial Flowers, and Earrings.
Keep responses concise (2-4 sentences max), highly tailored, and expressive of timeless luxury.`;

    const prompt = `User query: "${message}". ${userPreferences ? `User context: ${JSON.stringify(userPreferences)}` : ""}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ response: response.text || "Allow me to assist you in discovering our finest handcrafted collections." });
  } catch (error: any) {
    console.error("AI Chat Error:", error);
    res.status(500).json({
      response: "At GROW CARE, perfection takes a moment. Allow me to guide you through our flagship collections.",
      error: error.message
    });
  }
});

// AI Recommendation Engine Route
app.post("/api/ai/recommendations", async (req, res) => {
  try {
    const { query, category, priceRange } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        advice: "Based on your exquisite taste, we curated our top luxury best-sellers.",
        recommendedIds: ["1", "2", "3", "4"]
      });
    }

    const prompt = `Act as GROW CARE AI Personal Stylist.
Analyze this request: "${query || "Luxury style recommendations"}"
Category filter: ${category || "All"}
Price range: ${priceRange || "Any"}

Return a short 2-sentence advice paragraph explaining why these items suit the request, and list recommended search terms.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({
      advice: response.text || "Selected with utmost precision for your sophisticated wardrobe.",
      recommendedIds: ["1", "2", "3", "4", "5"]
    });
  } catch (error: any) {
    res.status(500).json({ advice: "Curated with distinction for GROW CARE connoisseurs.", recommendedIds: ["1", "2"] });
  }
});

// Start server with Vite middleware in dev mode
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GROW CARE luxury platform running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
