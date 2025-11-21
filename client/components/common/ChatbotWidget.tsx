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

// Intent mapping with keywords
const INTENT_MAP = {
  shipping: {
    keywords: ["shipping", "delivery", "ship", "deliver", "cost", "how long", "days", "delivery time", "freight", "package"],
    response: "We offer shipping across India. Standard delivery takes 5-7 business days. Shipping costs are calculated at checkout. Free shipping on orders over ₹999!",
    followUp: "Options: Track My Order | Back to Main Menu",
  },
  products: {
    keywords: ["product", "products", "categories", "shop", "buy", "browse", "show", "all products", "what do you sell", "eco-friendly"],
    response: "Great! What kind of eco-friendly products are you looking for?",
    followUp: "Options: Personal Care | Kitchen & Home | View All Products | Back to Main Menu",
  },
  personalcare: {
    keywords: ["personal care", "care", "toothbrush", "shampoo", "skincare", "skin", "bath", "hygiene"],
    response: "We offer eco-friendly personal care products including bamboo toothbrushes, shampoo bars, and skincare sets. Would you like to explore them?",
    followUp: "Options: View Products | Back to Main Menu",
  },
  kitchenhome: {
    keywords: ["kitchen", "home", "bottle", "bottles", "storage", "bag", "bags", "lunch", "thermos", "water bottle"],
    response: "Our Kitchen & Home collection includes reusable bottles, storage solutions, and eco-friendly kitchenware. What interests you?",
    followUp: "Options: View Products | Back to Main Menu",
  },
  returns: {
    keywords: ["return", "refund", "exchange", "returns", "refunds", "policy", "return policy", "damaged", "defective", "broken"],
    response: "Our return policy allows returns within 7 days of delivery for unused products. Please visit our dedicated page for full details.",
    followUp: "Options: Need to Initiate a Return | Back to Main Menu",
  },
  initiate_return: {
    keywords: ["initiate", "return", "start return", "begin return", "how to return", "process return"],
    response: "To start a return, please contact us directly. You can reach our support team at mcad240014@gmail.com or visit our contact page.",
    followUp: "Options: Go to Contact | Back to Main Menu",
  },
  human: {
    keywords: ["speak to a human", "talk to someone", "agent", "customer service", "help", "support", "customer support", "assistance", "live chat"],
    response: "Connecting you to our team now. Please provide your name and email so we can assist you better.",
    followUp: "What's your name?",
    inputMode: "name",
  },
  track_order: {
    keywords: ["track", "order", "where is", "status", "tracking", "order id", "order number"],
    response: "To track your order, please provide your Order ID. You can find it in your confirmation email.",
    followUp: "Please enter your Order ID:",
    inputMode: "orderId",
  },
  promotions: {
    keywords: ["promotion", "offer", "discount", "sale", "deals", "promo", "coupon", "special"],
    response: "Yes! We often have exciting offers on our eco-friendly range. Check out our 'Deals' page or sign up for our newsletter to stay updated on special promotions!",
    followUp: "Options: View Current Deals | Sign Up for Newsletter | Back to Main Menu",
  },
  newsletter: {
    keywords: ["newsletter", "sign up", "subscribe", "email updates", "news", "offers"],
    response: "Great! Drop your email below, and we'll send you updates on new products, exclusive offers, and sustainable living tips.",
    followUp: "Please enter your email address:",
    inputMode: "email",
  },
  mainmenu: {
    keywords: ["main menu", "menu", "back", "back to main", "start over", "reset"],
    response: "Back to main menu. How can I help you?",
    followUp: `Options: ${MAIN_MENU.join(" | ")}`,
  },
};

function extractIntent(input: string): { intent: string; confidence: number } {
  const cleanInput = input.toLowerCase().trim();

  // Direct button match (exact match with menu items)
  for (const item of MAIN_MENU) {
    if (cleanInput === item.toLowerCase()) {
      if (item.toLowerCase().includes("shipping")) return { intent: "shipping", confidence: 1 };
      if (item.toLowerCase().includes("product")) return { intent: "products", confidence: 1 };
      if (item.toLowerCase().includes("return")) return { intent: "returns", confidence: 1 };
      if (item.toLowerCase().includes("speak")) return { intent: "human", confidence: 1 };
    }
  }

  // Keyword-based matching
  let bestMatch = { intent: "unknown", confidence: 0 };

  for (const [intent, data] of Object.entries(INTENT_MAP)) {
    let matchCount = 0;
    for (const keyword of data.keywords) {
      if (cleanInput.includes(keyword)) {
        matchCount++;
      }
    }
    const confidence = matchCount / data.keywords.length;
    if (confidence > bestMatch.confidence) {
      bestMatch = { intent, confidence };
    }
  }

  // Return match if confidence is reasonable (at least 1 keyword matched or partial match)
  if (bestMatch.confidence > 0) {
    return bestMatch;
  }

  return { intent: "unknown", confidence: 0 };
}

export const ChatbotWidget: React.FC = () => {
  const { add } = useCart();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi there! Welcome to NaturaCircle. Sustainable Living Made Simple. 🌱 How can I help you today?" },
  ]);
  const [inputMode, setInputMode] = useState<InputMode>(null);
  const [unrecognizedCount, setUnrecognizedCount] = useState(0);
  const [tempUserData, setTempUserData] = useState<{ name?: string; email?: string; message?: string }>({});
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (listRef.current) {
          listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
        }
      }, 50);
    }
  }, [open, messages.length]);

  const pushBot = (text: string) => setMessages((m) => [...m, { from: "bot", text }]);
  const pushUser = (text: string) => setMessages((m) => [...m, { from: "user", text }]);

  const handleIntent = (payload: string) => {
    const p = payload.trim();

    // Handle input collection modes
    if (inputMode === "name") {
      pushUser(p);
      setTempUserData((prev) => ({ ...prev, name: p }));
      setTimeout(() => pushBot("Great! Now, could you please share your email address?"), 300);
      setTimeout(() => pushBot("Please enter your email:"), 400);
      setInputMode("email");
      setInput("");
      return;
    }

    if (inputMode === "email") {
      pushUser(p);
      setTempUserData((prev) => ({ ...prev, email: p }));
      setTimeout(() => pushBot(`Perfect! Our team will get back to you shortly at ${p}. For immediate assistance, you can also reach us at ${CONTACT.email} or call ${CONTACT.phone}.`), 300);
      setTimeout(() => pushBot("Options: Back to Main Menu | View Products"), 400);
      setInputMode(null);
      setInput("");
      return;
    }

    if (inputMode === "orderId") {
      pushUser(p);
      setTimeout(() => pushBot(`You can track your order (${p}) directly on our tracking page: /track-order`), 300);
      setTimeout(() => pushBot("Options: Back to Main Menu | Continue Shopping"), 400);
      setInputMode(null);
      setInput("");
      return;
    }

    if (inputMode === "message") {
      pushUser(p);
      setTempUserData((prev) => ({ ...prev, message: p }));
      setTimeout(() => pushBot(`Thank you for your message. Our team is offline right now, but we'll get back to you within 24 hours at ${tempUserData.email || "your email"}.`), 300);
      setTimeout(() => pushBot("Options: Back to Main Menu | View Products"), 400);
      setInputMode(null);
      setInput("");
      return;
    }

    // Normal message handling
    pushUser(p);
    const { intent, confidence } = extractIntent(p);

    if (intent !== "unknown" && confidence > 0) {
      const intentData = INTENT_MAP[intent as keyof typeof INTENT_MAP];
      
      setTimeout(() => pushBot(intentData.response), 300);
      setTimeout(() => pushBot(intentData.followUp), 400);
      
      if (intentData.inputMode) {
        setInputMode(intentData.inputMode as InputMode);
      }
      
      setUnrecognizedCount(0);
    } else {
      // Unrecognized input - suggest options
      setUnrecognizedCount((c) => c + 1);
      
      if (unrecognizedCount < 1) {
        setTimeout(() => pushBot("I'm sorry, I didn't quite understand that. Could you please rephrase your question, or choose from the options below?"), 300);
        setTimeout(() => pushBot(`Options: ${MAIN_MENU.join(" | ")}`), 400);
      } else {
        setTimeout(() => pushBot("It seems like I'm having trouble understanding. Let me connect you with our team for better assistance."), 300);
        setTimeout(() => pushBot("Please provide your name and email so we can assist you better."), 400);
        setTimeout(() => pushBot("What's your name?"), 500);
        setInputMode("name");
        setUnrecognizedCount(0);
      }
    }

    setInput("");
  };

  const handleSend = () => {
    if (!input.trim()) return;
    handleIntent(input);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleQuickButton = (text: string) => {
    handleIntent(text);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {open && (
        <div className="mb-3 w-80 max-h-[600px] overflow-hidden rounded-xl border bg-card shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4 flex-shrink-0">
            <p className="font-semibold text-sm">NaturaCircle Assistant</p>
            <button aria-label="Close chatbot" onClick={() => setOpen(false)} className="rounded p-1 hover:bg-muted transition">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "bot" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm break-words ${
                    m.from === "bot"
                      ? "bg-muted text-muted-foreground rounded-bl-none"
                      : "bg-primary text-primary-foreground rounded-br-none"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area - Fixed at bottom */}
          <div className="border-t p-4 space-y-3 flex-shrink-0 bg-background">
            {/* Input Mode Indicator */}
            {inputMode && (
              <div className="text-xs bg-blue-50 text-blue-900 p-2 rounded border border-blue-200">
                {inputMode === "name" && "📝 Please type your name"}
                {inputMode === "email" && "📧 Please type your email address"}
                {inputMode === "orderId" && "📦 Please type your Order ID"}
                {inputMode === "message" && "💬 Please type your message"}
              </div>
            )}

            {/* Quick Action Buttons - Only when not in input mode */}
            {!inputMode && (
              <div className="flex flex-wrap gap-2">
                {MAIN_MENU.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleQuickButton(item)}
                    className="px-3 py-1.5 text-xs rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition font-medium"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}

            {/* Text Input */}
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={
                  inputMode
                    ? inputMode === "name"
                      ? "Enter your name..."
                      : inputMode === "email"
                        ? "Enter your email..."
                        : inputMode === "orderId"
                          ? "Enter your Order ID..."
                          : "Type your message..."
                    : "Type a question or choose an option..."
                }
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                onClick={handleSend}
                aria-label="Send message"
                className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            {/* Contact Footer */}
            <div className="border-t pt-3 space-y-1 text-xs text-muted-foreground">
              <div>
                <span className="font-medium">Contact: </span>
                <a href={`mailto:${CONTACT.email}`} className="text-primary hover:underline">
                  {CONTACT.email}
                </a>
                {" · "}
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="text-primary hover:underline">
                  {CONTACT.phone}
                </a>
              </div>
              <div>
                <span className="font-medium">Instagram: </span>
                <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                  DM @naturacircle
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-110 transition flex items-center justify-center"
        aria-label="Open chatbot"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
};
