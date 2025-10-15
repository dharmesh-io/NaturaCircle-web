import { Leaf, Recycle, Droplets } from "lucide-react";

export const SiteFooter: React.FC = () => {
  return (
    <footer className="mt-20 border-t bg-muted/30">
      <div className="container grid gap-10 py-10 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-extrabold">
            <Leaf className="h-5 w-5 text-primary" /> NaturaCircle
          </div>
          <p className="text-sm text-muted-foreground">
            Sustainable essentials for everyday life. Eco-certified products, minimal footprint.
          </p>
          <div className="flex items-center gap-3 text-sm">
            <Recycle className="h-4 w-4" /> Zero plastic packaging
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Droplets className="h-4 w-4" /> Water-safe supply chain
          </div>
        </div>
        <div>
          <p className="font-semibold mb-3">Shop</p>
          <ul className="space-y-2 text-sm">
            <li><a href="/shop">All Products</a></li>
            <li><a href="/shop#Bamboo%20Toothbrushes">Bamboo Toothbrushes</a></li>
            <li><a href="/shop#Reusable%20Bottles">Reusable Bottles</a></li>
            <li><a href="/shop#Jute%20Bags">Jute Bags</a></li>
            <li><a href="/shop#Organic%20Skincare">Organic Skincare</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-3">Company</p>
          <ul className="space-y-2 text-sm">
            <li><a href="/about">About us</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="https://instagram.com/naturacircle" target="_blank" rel="noreferrer">Instagram @naturacircle</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-3">Legal</p>
          <ul className="space-y-2 text-sm">
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NaturaCircle. All rights reserved.
      </div>
    </footer>
  );
};
