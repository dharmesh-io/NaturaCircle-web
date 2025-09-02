export type Category =
  | "Bamboo Toothbrushes"
  | "Reusable Bottles"
  | "Jute Bags"
  | "Organic Skincare";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: Category;
  rating: number; // 0-5
  description: string;
  modelUrl?: string; // optional 3D model
  badge?: string;
}

export const CATEGORIES: Category[] = [
  "Bamboo Toothbrushes",
  "Reusable Bottles",
  "Jute Bags",
  "Organic Skincare",
];

export const PRODUCTS: Product[] = [
  {
    id: "btb-001",
    name: "Bamboo Toothbrush - Soft Bristles",
    price: 3.99,
    image:
      "https://images.unsplash.com/photo-1561009517-13b18323aded?q=80&w=1200&auto=format&fit=crop",
    category: "Bamboo Toothbrushes",
    rating: 5,
    description:
      "Eco-friendly bamboo handle with biodegradable packaging and plant-based bristles.",
    badge: "100% Eco-Certified",
  },
  {
    id: "bot-201",
    name: "Stainless Reusable Bottle 750ml",
    price: 21.5,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
    category: "Reusable Bottles",
    rating: 4,
    description:
      "Insulated bottle keeps drinks cold for 24h. BPA-free, leak-proof, lifetime use.",
  },
  {
    id: "jbg-301",
    name: "Jute Tote Bag",
    price: 9.5,
    image:
      "https://images.unsplash.com/photo-1590845947685-909f3cda5b5b?q=80&w=1200&auto=format&fit=crop",
    category: "Jute Bags",
    rating: 5,
    description:
      "Durable, reusable, and compostable. Perfect for daily shopping and beach days.",
    badge: "Free Delivery First Order",
  },
  {
    id: "osk-401",
    name: "Organic Aloe Skincare Set",
    price: 34.9,
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8c3d?q=80&w=1200&auto=format&fit=crop",
    category: "Organic Skincare",
    rating: 4,
    description:
      "Natural ingredients for gentle hydration. No parabens, sulfates, or microplastics.",
  },
];
