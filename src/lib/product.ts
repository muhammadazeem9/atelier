import { prisma } from "@/lib/prisma";
import type { Product } from "@/types/product";
import { cacheLife, cacheTag } from "next/cache";

function toProduct(product: {
  id: string;
  slug: string;
  name: string;
  category: string;
  image: string;
  description: string;
  price: { toNumber(): number };
  color: string;
  inStock: boolean;
}): Product {
  return {
    ...product,
    price: product.price.toNumber(),
  };
}

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const products = await prisma.product.findMany({ orderBy: { name: "asc" } });
  return products.map(toProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const products = await prisma.product.findMany({
    where: { inStock: true },
    orderBy: { name: "asc" },
  });
  return products.map(toProduct);
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `product:${slug}`);

  const product = await prisma.product.findUnique({ where: { slug } });
  return product ? toProduct(product) : undefined;
}

export async function getProductSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const products = await prisma.product.findMany({
    select: { slug: true },
    orderBy: { slug: "asc" },
  });
  return products.map((p) => p.slug);
}
