import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS, type Category } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";

export default function Shop() {
  const [active, setActive] = useState<Category | "All">("All");

  const filtered = useMemo(
    () => (active === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active)),
    [active],
  );

  return (
    <div className="container py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Shop</h1>
          <p className="text-sm text-muted-foreground">Sustainable essentials for everyday life</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant={active === "All" ? "default" : "secondary"} onClick={() => setActive("All")}>All</Button>
          {CATEGORIES.map((c) => (
            <Button key={c} variant={active === c ? "default" : "secondary"} onClick={() => setActive(c)}>
              {c}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
