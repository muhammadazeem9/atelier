import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group">
      <Link href={`/shop/${product.slug}`} className="block">
        <div
          className="relative aspect-[4/5] overflow-hidden"
          style={{ backgroundColor: product.color }}
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="font-serif text-3xl italic text-black/50">
                ATELIER
              </span>
            </div>
          )}
        </div>

        <div className="mt-4">
          <p className="text-xs uppercase tracking-widest text-stone-500">
            {product.category}
          </p>

          <h2 className="mt-2 font-medium transition-opacity group-hover:opacity-60">
            {product.name}
          </h2>

          <p className="mt-2 text-sm text-stone-600">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </article>
  );
}
