import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "natura_newsletter_dismissed";

export const NewsletterModal: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      const t = setTimeout(() => setOpen(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-xl">
        <h3 className="text-lg font-semibold">Join the NaturaCircle newsletter</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Get eco-living tips, new product drops, and 10% off your first order.
        </p>
        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            dismiss();
          }}
        >
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <Button type="submit">Subscribe</Button>
        </form>
        <button
          onClick={dismiss}
          className="mt-3 text-xs text-muted-foreground underline underline-offset-4"
        >
          No thanks
        </button>
      </div>
    </div>
  );
};
