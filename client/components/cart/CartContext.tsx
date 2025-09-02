import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  remove: (id: string) => void;
  update: (id: string, qty: number) => void;
  clear: () => void;
  total: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

const STORAGE_KEY = "natura_cart_v1";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add: CartContextValue["add"] = (product, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
        return next;
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const remove: CartContextValue["remove"] = (id) =>
    setItems((prev) => prev.filter((i) => i.product.id !== id));

  const update: CartContextValue["update"] = (id, qty) =>
    setItems((prev) => prev.map((i) => (i.product.id === id ? { ...i, quantity: Math.max(1, qty) } : i)));

  const clear = () => setItems([]);

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items],
  );

  const value = useMemo(() => ({ items, add, remove, update, clear, total }), [items, total]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
