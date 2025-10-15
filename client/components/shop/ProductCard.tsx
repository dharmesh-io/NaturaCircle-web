import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";
import { Star } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { add } = useCart();

  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-md">
      <div className="relative aspect-square overflow-hidden">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {product.badge && (
          <div className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
            {product.badge}
          </div>
        )}
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-medium leading-tight">{product.name}</h4>
          <span className="font-semibold">₹{product.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-muted-foreground">{product.description}</p>
        <div className="flex items-center gap-1 text-amber-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < product.rating ? "fill-current" : "opacity-30"}`} />
          ))}
        </div>
        <Button className="w-full" onClick={() => add(product)}>Add to cart</Button>
      </div>
    </div>
  );
};
