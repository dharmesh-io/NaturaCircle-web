import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Leaf, Menu } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";

interface Props {
  onCartOpen: () => void;
}

export const SiteHeader: React.FC<Props> = ({ onCartOpen }) => {
  const [open, setOpen] = useState(false);
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-extrabold tracking-tight">
          <Leaf className="h-6 w-6 text-primary" />
          <span>NaturaCircle</span>
        </a>
        <nav className="hidden gap-6 md:flex">
          <a className="text-sm hover:text-primary" href="/shop">Shop</a>
          <a className="text-sm hover:text-primary" href="/about">About</a>
          <a className="text-sm hover:text-primary" href="/blog">Blog</a>
          <a className="text-sm hover:text-primary" href="/contact">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="relative" aria-label="Open cart" onClick={onCartOpen}>
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 h-5 min-w-[1.25rem] rounded-full bg-primary px-1 text-[10px] leading-5 text-primary-foreground">
                {count}
              </span>
            )}
          </Button>
          <Button className="md:hidden" variant="outline" size="icon" aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t">
          <div className="container py-3 flex flex-col gap-2">
            <a className="py-2" href="/shop">Shop</a>
            <a className="py-2" href="/about">About</a>
            <a className="py-2" href="/blog">Blog</a>
            <a className="py-2" href="/contact">Contact</a>
          </div>
        </div>
      )}
    </header>
  );
};
