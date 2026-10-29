import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "prod_001",
    slug: "essential-linen-shirt",
    name: "Essential Linen Shirt",
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=85",
    description: "A relaxed linen shirt designed for everyday wear.",
    price: 89,
    color: "#d9cbb8",
    inStock: true,
  },
  {
    id: "prod_002",
    slug: "everyday-leather-tote",
    name: "Everyday Leather Tote",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85",
    description: "A timeless tote with a clean, structured silhouette.",
    price: 145,
    color: "#aa8064",
    inStock: true,
  },
  {
    id: "prod_003",
    slug: "minimalist-ceramic-vase",
    name: "Minimalist Ceramic Vase",
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=1200&q=85",
    description: "A sculptural ceramic accent for considered interiors.",
    price: 62,
    color: "#d8d2c8",
    inStock: true,
  },
  {
    id: "prod_004",
    slug: "relaxed-cotton-trousers",
    name: "Relaxed Cotton Trousers",
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=85",
    description: "Versatile cotton trousers with an effortless fit.",
    price: 110,
    color: "#b8b5a8",
    inStock: true,
  },
];
