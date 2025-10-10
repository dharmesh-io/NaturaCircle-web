import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Message = { from: "bot" | "user"; text: string };

const SUGGESTED = [
  "Shipping & delivery",
  "Returns & refunds",
  "Eco certifications",
  "Product materials",
  "Refill & packaging",
  "Contact support",
  "Shop bestsellers",
];

const CONTACT = {
  email: "hello@naturacircle.example",
  phone: "+1 (555) 123-4567",
  contactPage: "/contact",
};

function getBotReply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("ship") || q.includes("delivery") || q.includes("shipping")) {
    return "Standard shipping takes 3-7 business days. Free shipping on your first order. Expedited options are available at checkout.";
  }
  if (q.includes("return") || q.includes("refund")) {
    return "We accept returns within 30 days of receipt for items in original condition. Visit our Contact page for return authorization and instructions.";
  }
  if (q.includes("eco") || q.includes("cert")) {
    return "Our products meet third-party eco certifications and avoid harmful chemicals, single-use plastics, and excessive packaging. Check each product card for specific certifications.";
  }
  if (q.includes("material") || q.includes("what is") || q.includes("made of")) {
    return "We list materials and care instructions on every product page. If you need more details, tell us the product name or ask us to connect you with the maker.";
  }
  if (q.includes("refill") || q.includes("packag")) {
    return "We prioritize refillable and compostable packaging. Look for the 'refillable' badge on eligible products and sign up for restock notifications for refill kits.";
  }
  if (q.includes("contact") || q.includes("support") || q.includes("help")) {
    return `You can reach us at ${CONTACT.email} or ${CONTACT.phone}. For press or partnerships, use the Contact page.`;
  }
  if (q.includes("shop") || q.includes("best") || q.includes("popular")) {
    return "Browse our Shop for curated essentials. Check product detail pages for materials, care instructions, and impact notes.";
  }
  return "I can help with shipping, returns, product materials, eco certifications, refill options, and contact details. Try: 'Shipping', 'Returns', 'Eco certifications', or 'Contact support'.";
}

export const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi — I’m the NaturaCircle Assistant. Ask me about shipping, returns, materials, or type 'contact' to get our email and phone." },
  ]);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      // small delay so UI finishes opening before scrolling
      setTimeout(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
      }, 50);
    }
  }, [open, messages.length]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { from: "user", text: text.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    // simulate bot reply
    setTimeout(() => {
      const reply = getBotReply(text);
      setMessages((m) => [...m, { from: "bot", text: reply }]);
    }, 400);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") send(input);
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
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border px-3 py-1 text-xs hover:bg-muted"
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask about shipping, returns, or contact..."
                  className="flex-1 rounded-md border px-3 py-2 text-sm"
                />
                <button onClick={() => send(input)} aria-label="Send message" className="inline-flex items-center rounded-md bg-primary px-3 text-primary-foreground">
                  <Send className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 text-xs text-muted-foreground">
                <div>Contact: <a className="text-primary underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> · <a className="text-primary underline" href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a></div>
                <div className="mt-1">For detailed requests or press inquiries, <a className="text-primary underline" href={CONTACT.contactPage}>visit our contact page</a>.</div>
              </div>
            </div>
          </div>
        </div>
      )}

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
