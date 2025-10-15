import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { PRODUCTS } from "@/data/products";

type Message = { from: "bot" | "user"; text: string };

const CONTACT = {
  email: "hello@naturacircle.com",
  phone: "+91 00000 00000",
  contactPage: "/contact",
  whatsapp: "https://wa.me/910000000000",
};

const MAIN_MENU = [
  "Browse Products",
  "Order Help",
  "Shipping Info",
  "Sustainability Tips",
  "Customer Support",
];

const CATEGORIES = [
  "Oral Care",
  "Reusable Bottles & Flasks",
  "Bags & Storage",
  "Skincare & Haircare",
];

function findProductByName(name: string) {
  return PRODUCTS.find((p) => p.name.toLowerCase() === name.toLowerCase());
}

export const ChatbotWidget: React.FC = () => {
  const { add } = useCart();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi there! 🌿 Welcome to Natura Circle — your eco-friendly store. How can I assist you today?" },
  ]);
  const [lastSuggestions, setLastSuggestions] = useState<string[] | null>(null);
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
      pushBot("Open Shop: /shop");
      return;
    }
    add(product, 1);
    pushBot(`${product.name} added to your cart! Would you like to keep shopping or proceed to checkout?`);
    pushBot("Options: Continue Shopping | Proceed to Checkout");
  };

  const handleIntent = (payload: string) => {
    const p = payload.trim();
    pushUser(p);

    // direct product name match
    const prod = findProductByName(p);
    if (prod) {
      setTimeout(() => {
        pushBot(`We found ${prod.name}. Would you like to add it to your cart or view details?`);
        pushBot("Options: Add to Cart | View Details | Return to Categories");
        setLastSuggestions([prod.name]);
      }, 300);
      return;
    }

    switch (p.toLowerCase()) {
      case "browse products":
        setTimeout(() => pushBot("Awesome! Which category are you interested in?"), 300);
        setTimeout(() => pushBot(`Options: ${CATEGORIES.join(" | ")}`), 400);
        setLastSuggestions(null);
        break;

      case "oral care":
        setTimeout(() => pushBot("We offer Bamboo Toothbrushes with Soft Bristles, Charcoal variant, and Travel Bamboo Toothbrush with Case. Would you like to see more details or add any to your cart?"), 300);
        setTimeout(() => pushBot("Options: View Details | Add to Cart | Return to Categories"), 400);
        setLastSuggestions(["Bamboo Toothbrush - Soft Bristles", "Bamboo Toothbrush - Charcoal", "Travel Bamboo Toothbrush + Case"]);
        break;

      case "reusable bottles & flasks":
        setTimeout(() => pushBot("Choose from Stainless Reusable Bottle 750ml, Sleek Thermos Flask 600ml, or Minimal Glass Bottle 500ml. Interested in any?"), 300);
        setTimeout(() => pushBot("Options: View Details | Add to Cart | Return to Categories"), 400);
        setLastSuggestions(["Stainless Reusable Bottle 750ml", "Sleek Thermos Flask 600ml", "Minimal Glass Bottle 500ml"]);
        break;

      case "bags & storage":
        setTimeout(() => pushBot("We have eco-friendly Jute Tote Bag, Jute Lunch Carrier, and Burlap Storage Pouch. Want product info or pricing?"), 300);
        setTimeout(() => pushBot("Options: View Details | Add to Cart | Return to Categories"), 400);
        setLastSuggestions(["Jute Tote Bag", "Jute Lunch Carrier", "Burlap Storage Pouch"]);
        break;

      case "skincare & haircare":
        setTimeout(() => pushBot("Check out our Organic Aloe Skincare Set, Aloe Vera Gel 200ml, and Solid Shampoo Bar - Herbal. Would you like to explore them?"), 300);
        setTimeout(() => pushBot("Options: View Details | Add to Cart | Return to Categories"), 400);
        setLastSuggestions(["Organic Aloe Skincare Set", "Aloe Vera Gel 200ml", "Solid Shampoo Bar - Herbal"]);
        break;

      case "view details":
        if (lastSuggestions && lastSuggestions.length > 0) {
          pushBot(`Open the product page for more details: ${lastSuggestions.map((n) => `${n} -> /shop`).join(' | ')}`);
          pushBot("Or type the exact product name to add it to your cart.");
        } else {
          pushBot("Which product would you like details for? Type the product name or pick a category first.");
        }
        break;

      case "add to cart":
        if (lastSuggestions && lastSuggestions.length === 1) handleAddToCart(lastSuggestions[0]);
        else if (lastSuggestions && lastSuggestions.length > 1) pushBot(`Which of these would you like to add? ${lastSuggestions.join(' | ')}`);
        else pushBot("Please tell me the product name or browse categories to add items.");
        break;

      case "return to categories":
        pushBot("Returning to categories...");
        setTimeout(() => pushBot(`Options: ${CATEGORIES.join(" | ")}`), 200);
        setLastSuggestions(null);
        break;

      case "order help":
        pushBot("You can order online or via WhatsApp. Would you like the online shop link or our WhatsApp number?");
        pushBot("Options: Online Order Link | WhatsApp Number | Return to Main Menu");
        break;

      case "online order link":
        pushBot("Here’s the online order page: /shop");
        break;

      case "whatsapp number":
        pushBot(`Chat with us on WhatsApp: ${CONTACT.whatsapp}`);
        break;

      case "shipping info":
        pushBot("We offer eco-friendly packaging and deliver within Ahmedabad. Shipping fees apply for orders below ₹500.");
        pushBot("Options: More Details | Return to Main Menu");
        break;

      case "more details":
        pushBot("Local delivery: 1-2 days. Standard: 3-7 days. Free delivery for orders above ₹500.");
        break;

      case "sustainability tips":
        pushBot("Here’s a tip: Use bamboo toothbrushes to reduce plastic waste! Want more eco tips or product suggestions?");
        pushBot("Options: More Tips | Product Suggestions | Return to Main Menu");
        break;

      case "product suggestions":
        pushBot("Based on your interest, I recommend: Bamboo Toothbrush - Charcoal, Stainless Reusable Bottle 750ml, and Organic Aloe Skincare Set. Want to add any to your cart?");
        pushBot("Options: Add to Cart | More Suggestions | Return to Main Menu");
        setLastSuggestions(["Bamboo Toothbrush - Charcoal", "Stainless Reusable Bottle 750ml", "Organic Aloe Skincare Set"]);
        break;

      case "more suggestions":
        pushBot("Try: Jute Tote Bag, Minimal Glass Bottle 500ml, Solid Shampoo Bar - Herbal.");
        setLastSuggestions(["Jute Tote Bag", "Minimal Glass Bottle 500ml", "Solid Shampoo Bar - Herbal"]);
        break;

      case "proceed to checkout":
        pushBot("You can complete your purchase here: /checkout");
        pushBot("Options: Payment Info | Return to Main Menu");
        break;

      case "payment info":
        pushBot("We accept all major credit/debit cards and digital wallets like Paytm and Google Pay.");
        pushBot("Options: Place Order | Return to Main Menu");
        break;

      case "customer support":
      case "contact support":
        pushBot(`Reach us at ${CONTACT.phone} or WhatsApp ${CONTACT.whatsapp}. Would you like me to connect you now?`);
        pushBot("Options: Connect Now | Return to Main Menu");
        break;

      case "connect now":
        pushBot(`Opening contact page: ${CONTACT.contactPage}`);
        break;

      case "thank you":
      case "end chat":
        pushBot("Thanks for visiting Natura Circle! If you need anything else, just ask. Have a great day! 🌿");
        break;

      default:
        pushBot("Sorry, I didn’t catch that. Can I help you browse products, answer questions, or connect you with support?");
        pushBot("Options: Browse Products | Order Help | Contact Support");
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

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {open && (
        <div className="mb-3 w-80 overflow-hidden rounded-xl border bg-card shadow-2xl">
          <div className="flex items-center justify-between border-b p-3">
            <p className="font-medium">NaturaCircle Assistant</p>
            <button aria-label="Close chatbot" onClick={() => setOpen(false)} className="rounded p-1 hover:bg-muted">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="divide-y">
            <div className="max-h-60 overflow-y-auto p-3 text-sm" ref={listRef}>
              {messages.map((m, i) => (
                <div key={i} className={`mb-3 flex ${m.from === "bot" ? "justify-start" : "justify-end"}`}>
                  <div className={`${m.from === "bot" ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"} max-w-[85%] rounded-lg px-3 py-2 text-sm`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3">
              <div className="mb-2 flex flex-wrap gap-2">
                {MAIN_MENU.map((s) => (
                  <button key={s} onClick={() => handleIntent(s)} className="rounded-full border px-3 py-1 text-xs hover:bg-muted">
                    {s}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Type a question or choose an option..."
                  className="flex-1 rounded-md border px-3 py-2 text-sm"
                />
                <button onClick={() => handleSend(input)} aria-label="Send message" className="inline-flex items-center rounded-md bg-primary px-3 text-primary-foreground">
                  <Send className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 text-xs text-muted-foreground">
                <div>Contact: <a className="text-primary underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> · <a className="text-primary underline" href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a></div>
                <div className="mt-1">WhatsApp: <a className="text-primary underline" href={CONTACT.whatsapp} target="_blank" rel="noreferrer">Chat on WhatsApp</a></div>
                <div className="mt-1">For press or partnerships, <a className="text-primary underline" href={CONTACT.contactPage}>visit our contact page</a>.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setOpen((o) => !o)} className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105" aria-label="Open chatbot">
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
};
