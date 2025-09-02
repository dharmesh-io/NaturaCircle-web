import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = useState(false);

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
          <div className="max-h-80 space-y-3 overflow-y-auto p-3 text-sm">
            <details className="rounded-md border p-2">
              <summary className="cursor-pointer">What makes products eco-certified?</summary>
              <p className="mt-2 text-muted-foreground">Our products meet third-party certifications and avoid harmful chemicals, plastics, and wasteful packaging.</p>
            </details>
            <details className="rounded-md border p-2">
              <summary className="cursor-pointer">Do you offer free delivery?</summary>
              <p className="mt-2 text-muted-foreground">Yes, your first order ships free. Subscribe to our newsletter for more perks.</p>
            </details>
            <details className="rounded-md border p-2">
              <summary className="cursor-pointer">How do I return an item?</summary>
              <p className="mt-2 text-muted-foreground">Returns are accepted within 30 days in original condition. Contact support via our Contact page.</p>
            </details>
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
