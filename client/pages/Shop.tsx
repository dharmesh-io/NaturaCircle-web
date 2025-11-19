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
    <div className="container px-4 py-8 sm:py-12">
      <div className="mb-6 sm:mb-8 flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Shop</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">Sustainable essentials for everyday life</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={active === "All" ? "default" : "secondary"}
            onClick={() => setActive("All")}
            className="text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4"
          >
            All
          </Button>
          {CATEGORIES.map((c) => (
            <Button
              key={c}
              variant={active === c ? "default" : "secondary"}
              onClick={() => setActive(c)}
              className="text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4"
            >
              {c}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
