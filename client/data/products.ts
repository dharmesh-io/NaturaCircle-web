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
  // Bamboo Toothbrushes
  {
    id: "btb-001",
    name: "Bamboo Toothbrush - Soft Bristles",
    price: 3.99,
    image:
      "https://images.pexels.com/photos/4202894/pexels-photo-4202894.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Bamboo Toothbrushes",
    rating: 5,
    description:
      "Eco-friendly bamboo handle with biodegradable packaging and plant-based bristles.",
    badge: "100% Eco-Certified",
  },
  {
    id: "btb-002",
    name: "Bamboo Toothbrush - Charcoal",
    price: 4.5,
    image:
      "https://images.pexels.com/photos/7814562/pexels-photo-7814562.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Bamboo Toothbrushes",
    rating: 5,
    description:
      "Infused charcoal bristles for a deeper clean. Compostable handle and kraft box.",
  },
  {
    id: "btb-003",
    name: "Travel Bamboo Toothbrush + Case",
    price: 7.9,
    image:
      "https://images.pexels.com/photos/7814562/pexels-photo-7814562.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Bamboo Toothbrushes",
    rating: 4,
    description:
      "Compact travel case with breathable cap. Perfect for eco trips and daily carry.",
  },

  // Reusable Bottles
  {
    id: "bot-201",
    name: "Stainless Reusable Bottle 750ml",
    price: 21.5,
    image:
      "https://images.pexels.com/photos/7880026/pexels-photo-7880026.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Reusable Bottles",
    rating: 4,
    description:
      "Insulated bottle keeps drinks cold for 24h. BPA-free, leak-proof, lifetime use.",
  },
  {
    id: "bot-202",
    name: "Sleek Thermos Flask 600ml",
    price: 24.0,
    image:
      "https://images.pexels.com/photos/30469934/pexels-photo-30469934.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Reusable Bottles",
    rating: 5,
    description:
      "Double-wall stainless steel with matte finish. Hot for 12h, cold for 24h.",
  },
  {
    id: "bot-203",
    name: "Minimal Glass Bottle 500ml",
    price: 15.9,
    image:
      "https://images.pexels.com/photos/6858669/pexels-photo-6858669.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Reusable Bottles",
    rating: 4,
    description:
      "Crystal-clear glass with leak-proof cap. Dishwasher safe and plastic-free.",
  },

  // Jute Bags
  {
    id: "jbg-301",
    name: "Jute Tote Bag",
    price: 9.5,
    image:
      "https://images.pexels.com/photos/15601758/pexels-photo-15601758.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Jute Bags",
    rating: 5,
    description:
      "Durable, reusable, and compostable. Perfect for daily shopping and beach days.",
    badge: "Free Delivery First Order",
  },
  {
    id: "jbg-302",
    name: "Jute Lunch Carrier",
    price: 12.0,
    image:
      "https://images.pexels.com/photos/5094489/pexels-photo-5094489.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Jute Bags",
    rating: 4,
    description:
      "Compact insulated jute lunch bag for work or school. Reinforced stitching.",
  },
  {
    id: "jbg-303",
    name: "Burlap Storage Pouch",
    price: 6.9,
    image:
      "https://images.pexels.com/photos/15601758/pexels-photo-15601758.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Jute Bags",
    rating: 4,
    description:
      "Natural jute pouch for produce or accessories. Breathable and reusable.",
  },

  // Organic Skincare
  {
    id: "osk-401",
    name: "Organic Aloe Skincare Set",
    price: 34.9,
    image:
      "https://images.pexels.com/photos/8467963/pexels-photo-8467963.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Organic Skincare",
    rating: 4,
    description:
      "Natural ingredients for gentle hydration. No parabens, sulfates, or microplastics.",
  },
  {
    id: "osk-402",
    name: "Aloe Vera Gel 200ml",
    price: 10.9,
    image:
      "https://images.pexels.com/photos/14798571/pexels-photo-14798571.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Organic Skincare",
    rating: 5,
    description:
      "Soothing organic aloe for face and body. Ideal after-sun hydration.",
  },
  {
    id: "osk-403",
    name: "Solid Shampoo Bar - Herbal",
    price: 8.9,
    image:
      "https://images.pexels.com/photos/7262414/pexels-photo-7262414.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Organic Skincare",
    rating: 4,
    description:
      "Plastic-free shampoo bar with botanicals. Lasts up to 60 washes.",
  },
];
