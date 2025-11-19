import { Leaf, Recycle, Droplets } from "lucide-react";

export const SiteFooter: React.FC = () => {
  return (
    <footer className="mt-16 sm:mt-20 border-t bg-muted/30">
      <div className="container px-4 grid gap-6 sm:gap-8 md:gap-10 py-8 sm:py-10 grid-cols-2 md:grid-cols-4">
        <div className="space-y-3 col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 font-extrabold text-sm sm:text-base">
            <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-primary" /> NaturaCircle
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Sustainable essentials for everyday life. Eco-certified products, minimal footprint.
          </p>
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <Recycle className="h-3 w-3 sm:h-4 sm:w-4" /> Zero plastic packaging
          </div>
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <Droplets className="h-3 w-3 sm:h-4 sm:w-4" /> Water-safe supply chain
          </div>
        </div>
        <div>
          <p className="font-semibold text-xs sm:text-sm mb-2 sm:mb-3">Shop</p>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <li><a href="/shop" className="text-muted-foreground hover:text-primary">All Products</a></li>
            <li><a href="/shop#Bamboo%20Toothbrushes" className="text-muted-foreground hover:text-primary">Bamboo Toothbrushes</a></li>
            <li><a href="/shop#Reusable%20Bottles" className="text-muted-foreground hover:text-primary">Reusable Bottles</a></li>
            <li><a href="/shop#Jute%20Bags" className="text-muted-foreground hover:text-primary">Jute Bags</a></li>
            <li><a href="/shop#Organic%20Skincare" className="text-muted-foreground hover:text-primary">Organic Skincare</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-xs sm:text-sm mb-2 sm:mb-3">Company</p>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <li><a href="/about" className="text-muted-foreground hover:text-primary">About us</a></li>
            <li><a href="/blog" className="text-muted-foreground hover:text-primary">Blog</a></li>
            <li><a href="/contact" className="text-muted-foreground hover:text-primary">Contact</a></li>
            <li><a href="https://instagram.com/naturacircle" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">Instagram @naturacircle</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-xs sm:text-sm mb-2 sm:mb-3">Legal</p>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <li><a href="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</a></li>
            <li><a href="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-3 sm:py-4 px-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NaturaCircle. All rights reserved.
      </div>
    </footer>
  );
};
