import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

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
  "Contact Support",
];

const BROWSE_CATEGORIES = [
  "Paan & Accessories",
  "Eco-Friendly Home",
  "Personal Care",
  "Snacks & Drinks",
];

function intentReply(payload: string): { reply: string; options?: string[]; links?: { label: string; href: string }[] } {
  const p = payload.toLowerCase();
  switch (p) {
    case "browse products":
      return { reply: "Great! What type of products are you interested in?", options: BROWSE_CATEGORIES };
    case "paan & accessories":
      return {
        reply: "We have traditional & flavored paan, biodegradable wraps, and more! Would you like to see our menu or bestsellers?",
        options: ["View Menu", "Bestsellers", "Return to Main Menu"],
      };
    case "view menu":
    case "bestsellers":
      return { reply: "Opening our shop...", links: [{ label: "Open Shop", href: "/shop" }] };
    case "order help":
      return {
        reply: "You can order online or via WhatsApp. Would you like the link or our WhatsApp number?",
        options: ["Online Order Link", "WhatsApp Number", "Return to Main Menu"],
      };
    case "online order link":
      return { reply: "Here’s the online order page:", links: [{ label: "Order Online", href: "/shop" }] };
    case "whatsapp number":
      return { reply: `Chat with us on WhatsApp: ${CONTACT.whatsapp}`, links: [{ label: "Open WhatsApp", href: CONTACT.whatsapp }] };
    case "shipping info":
      return {
        reply: "We offer eco-friendly packaging and delivery within Ahmedabad. Shipping charges apply for orders below ₹500.",
        options: ["More Details", "Return to Main Menu"],
      };
    case "more details":
      return { reply: "Local delivery: 1-2 days. Standard: 3-7 days. Free delivery for orders above ₹500." };
    case "sustainability tips":
      return {
        reply: "Here’s a quick tip: Switch to reusable beeswax wraps instead of plastic wrap! Want more tips or product suggestions?",
        options: ["More Tips", "Product Suggestions", "Return to Main Menu"],
      };
    case "more tips":
      return { reply: "Try swapping single-use items for reusable alternatives: beeswax wraps, refillable bottles, and jute bags." };
    case "product suggestions":
      return {
        reply: "Based on your interest, I recommend: Bamboo Toothbrush - Soft Bristles, Jute Tote Bag, Stainless Reusable Bottle 750ml. Would you like to add any to cart?",
        options: ["Add to Cart", "More Suggestions", "Return to Main Menu"],
      };
    case "add to cart":
      return { reply: "I can’t add items directly here, but you can add them from the product page. Open the Shop to add items.", links: [{ label: "Open Shop", href: "/shop" }] };
    case "proceed to checkout":
      return { reply: "Proceed to checkout here:", links: [{ label: "Checkout", href: "/checkout" }] };
    case "payment info":
      return { reply: "We accept major credit/debit cards and digital wallets like Paytm and Google Pay." };
    case "contact support":
      return { reply: `You can reach us at ${CONTACT.phone} or ${CONTACT.email}. Would you like me to open the Contact page?`, options: ["Open Contact Page", "Return to Main Menu"], links: [{ label: "Contact Page", href: CONTACT.contactPage }] };
    case "open contact page":
      return { reply: "Opening contact page...", links: [{ label: "Contact", href: CONTACT.contactPage }] };
    case "thank you":
    case "end chat":
      return { reply: "Thanks for visiting Natura Circle! If you need any help, just type here. Have a great day! 🌿" };
    default:
      return {
        reply: "Sorry, I didn’t quite get that. Can I help you browse products, answer questions, or connect you with support?",
        options: ["Browse Products", "Order Help", "Contact Support"],
      };
  }
}

export const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi there! 🌿 Welcome to Natura Circle — your eco-friendly store. How can I assist you today?" },
  ]);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
      }, 50);
    }
  }, [open, messages.length]);

  const pushBot = (text: string) => setMessages((m) => [...m, { from: "bot", text }]);
  const pushUser = (text: string) => setMessages((m) => [...m, { from: "user", text }]);

  const handleIntent = (payload: string) => {
    pushUser(payload);
    const res = intentReply(payload);
    setTimeout(() => {
      if (res.reply) pushBot(res.reply);
      if (res.links) {
        res.links.forEach((l) => pushBot(`${l.label}: ${l.href}`));
      }
      if (res.options) {
        setTimeout(() => pushBot(`Options: ${res.options.join(" | ")}`), 100);
      }
    }, 300);
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
