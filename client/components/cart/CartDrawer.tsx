import { useCart } from "./CartContext";
import { Button } from "@/components/ui/button";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";

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
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-xl transition-transform duration-300 flex flex-col ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Header - Fixed */}
        <div className="flex items-center justify-between border-b p-3 sm:p-4 flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="text-base sm:text-lg font-semibold">Your Cart</h2>
            {items.length > 0 && (
              <span className="ml-auto bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
                {items.length}
              </span>
            )}
          </div>
          <button aria-label="Close cart" onClick={onClose} className="p-2 rounded-md hover:bg-muted flex-shrink-0">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items - Scrollable */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-3 opacity-50" />
              <p className="font-medium text-muted-foreground text-sm">Your cart is empty</p>
              <p className="text-xs text-muted-foreground mt-1">Add products to get started!</p>
            </div>
          ) : (
            <ul className="space-y-3 sm:space-y-4">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-3 pb-3 sm:pb-4 border-b last:border-none hover:bg-muted/50 -mx-1 sm:-mx-2 px-2 py-1 sm:py-2 rounded transition">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-16 w-16 sm:h-20 sm:w-20 rounded object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-xs sm:text-sm leading-tight line-clamp-2">{product.name}</p>
                    <p className="text-xs sm:text-sm font-semibold text-primary mt-1">₹{(product.price * quantity).toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">₹{product.price.toFixed(2)} each</p>
                    <div className="mt-2 sm:mt-3 flex items-center gap-1 sm:gap-2">
                      <div className="flex items-center gap-1 border rounded bg-muted">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => update(product.id, quantity - 1)}
                          className="p-1 hover:bg-background transition text-xs sm:text-sm"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-5 sm:w-6 text-center text-xs sm:text-sm font-medium">{quantity}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => update(product.id, quantity + 1)}
                          className="p-1 hover:bg-background transition text-xs sm:text-sm"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        aria-label="Remove product"
                        onClick={() => remove(product.id)}
                        className="p-1 text-destructive hover:bg-destructive/10 rounded transition ml-auto flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer - Fixed */}
        {items.length > 0 && (
          <div className="border-t p-3 sm:p-4 space-y-2 sm:space-y-3 bg-muted/30 flex-shrink-0">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="border-t pt-2 flex items-center justify-between font-bold text-sm sm:text-lg">
                <span>Total</span>
                <span className="text-primary">₹{total.toFixed(2)}</span>
              </div>
            </div>
            <Button
              className="w-full text-sm sm:text-base py-2 sm:py-3"
              onClick={() => {
                onClose();
                window.location.href = "/checkout";
              }}
            >
              Proceed to Checkout
            </Button>
            <Button variant="ghost" onClick={clear} className="w-full text-xs sm:text-sm text-destructive hover:bg-destructive/10">
              Clear Cart
            </Button>
            <p className="text-xs text-center text-muted-foreground">Free delivery on all orders!</p>
          </div>
        )}
      </aside>
    </div>
  );
};
