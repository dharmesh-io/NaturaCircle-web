import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Leaf, Recycle, Droplets, Sprout } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { NewsletterModal } from "@/components/common/NewsletterModal";

export default function Index() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary to-accent/40">
        <div className="container px-4 grid items-center gap-8 py-12 sm:py-16 md:gap-10 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-2 sm:px-3 py-1 text-xs font-medium">
              <Sprout className="h-3.5 w-3.5 text-primary" /> 100% Eco-Certified
            </span>
            <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Eco-friendly Living, Made Easy
            </h1>
            <p className="mt-3 max-w-prose text-xs sm:text-sm text-muted-foreground">
              Thoughtfully designed essentials for a greener lifestyle. Reusable, recyclable, and responsibly sourced.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3">
              <Button asChild className="w-full sm:w-auto">
                <a href="/shop">Shop Now</a>
              </Button>
              <span className="text-xs sm:text-sm text-muted-foreground">Free delivery on your first order</span>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="aspect-square w-full rounded-3xl bg-[url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center shadow-xl" />
            <div className="absolute -left-6 -top-6 rounded-full bg-primary/10 p-10 blur-2xl" />
            <div className="absolute -right-6 -bottom-6 rounded-full bg-primary/10 p-10 blur-2xl" />
          </div>
        </div>
      </section>

      {/* Sustainability banners */}
      <section className="container px-4 relative z-10 -mt-8 sm:-mt-10 grid gap-3 sm:gap-4 md:grid-cols-3">
        <a href="/shop#Bamboo%20Toothbrushes" className="group flex items-start sm:items-center gap-3 rounded-xl border bg-card p-3 sm:p-4 shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label="Browse plant-based materials">
          <Leaf className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
          <div>
            <p className="font-semibold text-xs sm:text-sm">Plant-based Materials</p>
            <p className="text-xs text-muted-foreground">Bamboo, jute, and organic fibers</p>
          </div>
        </a>
        <a href="/shop" className="group flex items-start sm:items-center gap-3 rounded-xl border bg-card p-3 sm:p-4 shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label="Shop plastic-free packaging products">
          <Recycle className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
          <div>
            <p className="font-semibold text-xs sm:text-sm">Plastic-free Packaging</p>
            <p className="text-xs text-muted-foreground">100% recyclable & compostable</p>
          </div>
        </a>
        <a href="/shop#Organic%20Skincare" className="group flex items-start sm:items-center gap-3 rounded-xl border bg-card p-3 sm:p-4 shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label="Browse low water footprint products">
          <Droplets className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
          <div>
            <p className="font-semibold text-xs sm:text-sm">Low Water Footprint</p>
            <p className="text-xs text-muted-foreground">Sustainably produced</p>
          </div>
        </a>
      </section>

      {/* Featured products */}
      <section className="container px-4 py-12 sm:py-16">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Featured Products</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Curated best-sellers loved by our community</p>
          </div>
          <a href="/shop" className="text-xs sm:text-sm text-primary underline underline-offset-4 self-start sm:self-auto">View all</a>
        </div>
        <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/30 py-12 sm:py-16">
        <div className="container px-4">
          <h3 className="text-center text-xl sm:text-2xl font-bold">What our customers say</h3>
          <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 md:grid-cols-3">
            <blockquote className="rounded-xl border bg-card p-4 sm:p-6 shadow-sm">
              <p className="text-xs sm:text-sm">"Beautiful, thoughtfully made products. I love the jute bag!"</p>
              <footer className="mt-3 text-xs text-muted-foreground">— Priya S.</footer>
            </blockquote>
            <blockquote className="rounded-xl border bg-card p-4 sm:p-6 shadow-sm">
              <p className="text-xs sm:text-sm">"My bottle keeps water cold all day. Zero plastic guilt."</p>
              <footer className="mt-3 text-xs text-muted-foreground">— Daniel R.</footer>
            </blockquote>
            <blockquote className="rounded-xl border bg-card p-4 sm:p-6 shadow-sm">
              <p className="text-xs sm:text-sm">"The bamboo toothbrush is a game-changer. Will reorder."</p>
              <footer className="mt-3 text-xs text-muted-foreground">— Aisha K.</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Newsletter modal */}
      {mounted && <NewsletterModal />}
    </div>
  );
}
