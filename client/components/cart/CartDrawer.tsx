import { useCart } from "./CartContext";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<Props> = ({ open, onClose }) => {
  const { items, remove, update, total, clear } = useCart();

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button aria-label="Close cart" onClick={onClose} className="p-2 rounded-md hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex h-[calc(100%-9rem)] flex-col overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-muted-foreground">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-3 border-b pb-4 last:border-none">
                  <img src={product.image} alt={product.name} className="h-16 w-16 rounded object-cover" />
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => update(product.id, quantity - 1)}>-</Button>
                      <span className="w-8 text-center">{quantity}</span>
                      <Button variant="outline" size="sm" onClick={() => update(product.id, quantity + 1)}>+</Button>
                      <Button variant="ghost" size="sm" onClick={() => remove(product.id)}>Remove</Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t p-4 space-y-3">
          <div className="flex items-center justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1" onClick={onClose} asChild>
              <a href="/checkout">Checkout</a>
            </Button>
            <Button variant="secondary" onClick={clear} className="flex-1">Clear</Button>
          </div>
          <p className="text-xs text-muted-foreground">Free delivery on your first order.</p>
        </div>
      </aside>
    </div>
  );
};
