import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { PRODUCTS } from "@/data/products";

type Message = { from: "bot" | "user"; text: string };
type InputMode = null | "name" | "email" | "orderId" | "message";

const CONTACT = {
  email: "mcad240014@gmail.com",
  phone: "+91 95100 88267",
  contactPage: "/contact",
  instagram: "https://instagram.com/naturacircle",
};

const MAIN_MENU = [
  "Shipping & Delivery",
  "Product Categories",
  "Returns & Refunds",
  "Speak to a Human",
];

const CATEGORIES = [
  "Personal Care",
  "Kitchen & Home",
  "View All Products",
  "Back to Main Menu",
];

function findProductByName(name: string) {
  return PRODUCTS.find((p) => p.name.toLowerCase() === name.toLowerCase());
}

export const ChatbotWidget: React.FC = () => {
  const { add } = useCart();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi there! Welcome to NaturaCircle. Sustainable Living Made Simple. 🌱 How can I help you today?" },
  ]);
  const [lastSuggestions, setLastSuggestions] = useState<string[] | null>(null);
  const [inputMode, setInputMode] = useState<InputMode>(null);
  const [unrecognizedCount, setUnrecognizedCount] = useState(0);
  const [tempUserData, setTempUserData] = useState<{ name?: string; email?: string; message?: string }>({});
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) setTimeout(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }), 50);
  }, [open, messages.length]);

  const pushBot = (text: string) => setMessages((m) => [...m, { from: "bot", text }]);
  const pushUser = (text: string) => setMessages((m) => [...m, { from: "user", text }]);

  const handleAddToCart = (productName?: string) => {
    const name = productName || (lastSuggestions && lastSuggestions.length === 1 ? lastSuggestions[0] : undefined);
    if (!name) {
      pushBot("Which product would you like to add? Please type the product name or choose from the suggestions.");
      return;
    }
    const product = findProductByName(name);
    if (!product) {
      pushBot("Sorry, I couldn't find that product. Try opening the Shop to add items.");
      return;
    }
    add(product, 1);
    pushBot(`${product.name} added to your cart! Would you like to keep shopping or proceed to checkout?`);
    pushBot("Options: Continue Shopping | Proceed to Checkout");
  };

  const handleIntent = (payload: string) => {
    const p = payload.trim();

    // Handle input modes for collecting specific information
    if (inputMode === "name") {
      pushUser(p);
      setTempUserData((prev) => ({ ...prev, name: p }));
      setTimeout(() => pushBot("Great! Now, could you please share your email address?"), 300);
      setInputMode("email");
      return;
    }

    if (inputMode === "email") {
      pushUser(p);
      setTempUserData((prev) => ({ ...prev, email: p }));
      setTimeout(() => pushBot(`Perfect! Our team will get back to you shortly at ${p}. For immediate assistance, you can also reach us at ${CONTACT.email} or call ${CONTACT.phone}.`), 300);
      setTimeout(() => pushBot("Options: Back to Main Menu | View Products"), 400);
      setInputMode(null);
      return;
    }

    if (inputMode === "orderId") {
      pushUser(p);
      setTimeout(() => pushBot(`You can track your order (${p}) directly on our tracking page: /track-order`), 300);
      setTimeout(() => pushBot("Options: Back to Main Menu | Continue Shopping"), 400);
      setInputMode(null);
      return;
    }

    if (inputMode === "message") {
      pushUser(p);
      setTempUserData((prev) => ({ ...prev, message: p }));
      setTimeout(() => pushBot(`Thank you for your message. Our team is offline right now, but we'll get back to you within 24 hours at ${tempUserData.email || "your email"}.`), 300);
      setTimeout(() => pushBot("Options: Back to Main Menu | View Products"), 400);
      setInputMode(null);
      return;
    }

    pushUser(p);
    const lowerP = p.toLowerCase();

    // Check for specific product queries with keyword matching
    const productKeywords = {
      "bamboo toothbrush": "Bamboo Toothbrush - Soft Bristles",
      "toothbrush": "Bamboo Toothbrush - Soft Bristles",
      "shampoo bar": "Solid Shampoo Bar - Herbal",
      "shampoo": "Solid Shampoo Bar - Herbal",
      "skincare": "Organic Aloe Skincare Set",
      "aloe": "Organic Aloe Skincare Set",
      "bottle": "Stainless Reusable Bottle 750ml",
      "thermos": "Sleek Thermos Flask 600ml",
      "tote bag": "Jute Tote Bag",
      "lunch carrier": "Jute Lunch Carrier",
      "storage": "Burlap Storage Pouch",
    };

    let matchedProduct = null;
    for (const [keyword, productName] of Object.entries(productKeywords)) {
      if (lowerP.includes(keyword)) {
        matchedProduct = productName;
        break;
      }
    }

    if (matchedProduct) {
      const product = findProductByName(matchedProduct);
      if (product) {
        const categoryMap: { [key: string]: string } = {
          "Bamboo Toothbrushes": "Personal Care",
          "Organic Skincare": "Personal Care",
          "Reusable Bottles": "Kitchen & Home",
          "Jute Bags": "Kitchen & Home",
        };
        const category = categoryMap[product.category] || product.category;
        setTimeout(() => pushBot(`Looking for ${product.name}? Excellent choice for sustainable living! You can explore our range here: /shop#${product.category.replace(/\s/g, "%20")}`), 300);
        setTimeout(() => pushBot(`Options: View other ${category} | Back to Main Menu`), 400);
        setUnrecognizedCount(0);
        return;
      }
    }

    // Handle intent matching with main menu options
    switch (lowerP) {
      case "shipping & delivery":
      case "shipping":
      case "delivery":
      case "shipping cost":
      case "how long to deliver":
        setTimeout(() => pushBot("We offer shipping across India. Standard delivery takes 5-7 business days. Shipping costs are calculated at checkout. Free shipping on orders over ₹999!"), 300);
        setTimeout(() => pushBot("Options: Track My Order | Back to Main Menu"), 400);
        setUnrecognizedCount(0);
        break;

      case "product categories":
      case "products":
      case "what do you sell":
      case "show products":
        setTimeout(() => pushBot("Great! What kind of eco-friendly products are you looking for?"), 300);
        setTimeout(() => pushBot(`Options: ${CATEGORIES.join(" | ")}`), 400);
        setUnrecognizedCount(0);
        break;

      case "personal care":
        setTimeout(() => pushBot("We offer eco-friendly personal care products including bamboo toothbrushes, shampoo bars, and skincare sets. Would you like to explore them?"), 300);
        setTimeout(() => pushBot("Options: View Products | Back to Main Menu"), 400);
        setLastSuggestions(["Bamboo Toothbrush", "Shampoo Bar", "Skincare"]);
        setUnrecognizedCount(0);
        break;

      case "kitchen & home":
        setTimeout(() => pushBot("Our Kitchen & Home collection includes reusable bottles, storage solutions, and eco-friendly kitchenware. What interests you?"), 300);
        setTimeout(() => pushBot("Options: View Products | Back to Main Menu"), 400);
        setLastSuggestions(["Bottles", "Storage", "Kitchenware"]);
        setUnrecognizedCount(0);
        break;

      case "view all products":
      case "view products":
      case "shop":
        setTimeout(() => pushBot("Opening our product catalog. Visit /shop to browse all our products!"), 300);
        setUnrecognizedCount(0);
        break;

      case "back to main menu":
      case "menu":
        setTimeout(() => pushBot("Back to main menu. How can I help you?"), 300);
        setTimeout(() => pushBot(`Options: ${MAIN_MENU.join(" | ")}`), 400);
        setLastSuggestions(null);
        setUnrecognizedCount(0);
        break;

      case "returns & refunds":
      case "return":
      case "refund":
      case "exchange":
        setTimeout(() => pushBot("Our return policy allows returns within 7 days of delivery for unused products. Please visit our dedicated page for full details."), 300);
        setTimeout(() => pushBot("Options: Need to Initiate a Return | Back to Main Menu"), 400);
        setUnrecognizedCount(0);
        break;

      case "need to initiate a return":
        setTimeout(() => pushBot("To start a return, please contact us directly. You can reach our support team at mcad240014@gmail.com or visit our contact page."), 300);
        setTimeout(() => pushBot("Options: Go to Contact | Back to Main Menu"), 400);
        setUnrecognizedCount(0);
        break;

      case "go to contact":
      case "contact":
        setTimeout(() => pushBot("Opening contact page. Visit /contact to reach our team!"), 300);
        setUnrecognizedCount(0);
        break;

      case "speak to a human":
      case "help":
      case "agent":
      case "talk to someone":
      case "customer service":
        setTimeout(() => pushBot("Connecting you to our team now. Please provide your name and email so we can assist you better."), 300);
        setTimeout(() => pushBot("What's your name?"), 400);
        setInputMode("name");
        setUnrecognizedCount(0);
        break;

      case "track my order":
      case "where is my order":
      case "order status":
        setTimeout(() => pushBot("To track your order, please provide your Order ID. You can find it in your confirmation email."), 300);
        setTimeout(() => pushBot("Please enter your Order ID:"), 400);
        setInputMode("orderId");
        setUnrecognizedCount(0);
        break;

      case "promotions":
      case "offers":
      case "discount":
      case "sale":
      case "deals":
        setTimeout(() => pushBot("Yes! We often have exciting offers on our eco-friendly range. Check out our 'Deals' page or sign up for our newsletter to stay updated on special promotions!"), 300);
        setTimeout(() => pushBot("Options: View Current Deals | Sign Up for Newsletter | Back to Main Menu"), 400);
        setUnrecognizedCount(0);
        break;

      case "view current deals":
        setTimeout(() => pushBot("Opening deals page. Visit /deals to see our current offers!"), 300);
        setUnrecognizedCount(0);
        break;

      case "sign up for newsletter":
        setTimeout(() => pushBot("Great! Drop your email below, and we'll send you updates on new products, exclusive offers, and sustainable living tips."), 300);
        setTimeout(() => pushBot("Please enter your email address:"), 400);
        setInputMode("email");
        setUnrecognizedCount(0);
        break;

      case "continue shopping":
        setTimeout(() => pushBot("Visit /shop to continue browsing our eco-friendly products!"), 300);
        setUnrecognizedCount(0);
        break;

      case "proceed to checkout":
        setTimeout(() => pushBot("Proceeding to checkout. Visit /checkout to complete your purchase!"), 300);
        setUnrecognizedCount(0);
        break;

      default:
        setUnrecognizedCount((c) => c + 1);
        if (unrecognizedCount < 1) {
          setTimeout(() => pushBot("I'm sorry, I didn't quite understand that. Could you please rephrase your question, or choose from the options below?"), 300);
          setTimeout(() => pushBot(`Options: Back to Main Menu | Speak to a Human`), 400);
        } else {
          setTimeout(() => pushBot("It seems like I'm having trouble understanding. Let me connect you with our team."), 300);
          setTimeout(() => pushBot("Connecting you to our team. Please provide your name and email so we can assist you better."), 400);
          setTimeout(() => pushBot("What's your name?"), 500);
          setInputMode("name");
          setUnrecognizedCount(0);
        }
        break;
    }
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    handleIntent(text.trim());
    setInput("");
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend(input);
  };

  const handleButtonClick = (text: string) => {
    handleSend(text);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {open && (
        <div className="mb-3 w-80 overflow-hidden rounded-xl border bg-card shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <p className="font-medium">NaturaCircle Assistant</p>
            <button aria-label="Close chatbot" onClick={() => setOpen(false)} className="rounded p-1 hover:bg-muted">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="divide-y">
            <div className="max-h-60 overflow-y-auto p-4 text-sm space-y-3" ref={listRef}>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "bot" ? "justify-start" : "justify-end"}`}>
                  <div className={`${m.from === "bot" ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"} max-w-[85%] rounded-lg px-3 py-2 text-sm`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 space-y-3">
              {/* Input Mode Label */}
              {inputMode && (
                <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                  {inputMode === "name" && "📝 Please type your name"}
                  {inputMode === "email" && "📧 Please type your email"}
                  {inputMode === "orderId" && "📦 Please type your Order ID"}
                  {inputMode === "message" && "💬 Please type your message"}
                </div>
              )}

              {/* Quick Action Buttons - Show main menu when no input mode */}
              {!inputMode && MAIN_MENU.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {MAIN_MENU.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleButtonClick(s)}
                      className="rounded-full border px-3 py-1 text-xs hover:bg-muted transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Field */}
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder={
                    inputMode
                      ? inputMode === "name"
                        ? "Your name..."
                        : inputMode === "email"
                          ? "Your email..."
                          : inputMode === "orderId"
                            ? "Your Order ID..."
                            : "Your message..."
                      : "Type a question or choose an option..."
                  }
                  className="flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
                <button onClick={() => handleSend(input)} aria-label="Send message" className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-primary-foreground hover:opacity-90 transition">
                  <Send className="h-4 w-4" />
                </button>
              </div>

              {/* Contact Information Footer */}
              <div className="border-t pt-3 text-xs text-muted-foreground space-y-1">
                <div>
                  Contact:{" "}
                  <a className="text-primary hover:underline" href={`mailto:${CONTACT.email}`}>
                    {CONTACT.email}
                  </a>{" "}
                  ·{" "}
                  <a className="text-primary hover:underline" href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>
                    {CONTACT.phone}
                  </a>
                </div>
                <div>
                  Instagram:{" "}
                  <a className="text-primary hover:underline" href={CONTACT.instagram} target="_blank" rel="noreferrer">
                    DM @naturacircle
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105"
        aria-label="Open chatbot"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
};
