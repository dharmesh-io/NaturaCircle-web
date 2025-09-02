import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Shop from "./pages/Shop";
import { Placeholder } from "./pages/Placeholders";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CartProvider } from "@/components/cart/CartContext";
import { useState } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ChatbotWidget } from "@/components/common/ChatbotWidget";

const queryClient = new QueryClient();

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader onCartOpen={() => setCartOpen(true)} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <ChatbotWidget />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<Placeholder title="About NaturaCircle" />} />
              <Route path="/blog" element={<Placeholder title="NaturaCircle Blog" />} />
              <Route path="/contact" element={<Placeholder title="Contact Us" />} />
              <Route path="/cart" element={<Placeholder title="Your Cart" />} />
              <Route path="/checkout" element={<Placeholder title="Checkout" />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
