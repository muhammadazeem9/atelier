"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAddToBag() {
    if (!product.inStock) return;

    addToCart(product, quantity);
    setAdded(true);
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-16">
      <nav className="mb-8 text-sm text-neutral-500">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-black">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-900">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
            {product.category}
          </p>

          <h1 className="mt-4 text-3xl font-light tracking-tight sm:text-4xl lg:text-5xl">
            {product.name}
          </h1>

          <p className="mt-5 text-xl">${product.price.toFixed(2)}</p>

          <div className="my-8 border-t border-neutral-200" />

          <p className="text-sm leading-7 text-neutral-600">
            {product.description}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-6 w-6 rounded-full border border-neutral-300"
              style={{ backgroundColor: product.color }}
            />
            <span className="text-sm text-neutral-600">Signature color</span>
          </div>

          <p
            className={`mt-6 text-sm ${
              product.inStock ? "text-green-700" : "text-red-600"
            }`}
          >
            {product.inStock ? "In stock" : "Currently unavailable"}
          </p>

          <div className="mt-8">
            <label
              htmlFor="quantity"
              className="mb-3 block text-sm font-medium"
            >
              Quantity
            </label>

            <div className="flex h-12 w-36 items-center justify-between border border-neutral-300">
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
                onClick={() => {
                  setQuantity((current) => Math.max(1, current - 1));
                  setAdded(false);
                }}
                className="h-full px-4 disabled:cursor-not-allowed disabled:opacity-30"
              >
                −
              </button>

              <span id="quantity" aria-live="polite">
                {quantity}
              </span>

              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => {
                  setQuantity((current) => current + 1);
                  setAdded(false);
                }}
                className="h-full px-4"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            disabled={!product.inStock}
            onClick={handleAddToBag}
            className="mt-6 w-full bg-neutral-950 px-6 py-4 text-sm uppercase tracking-widest text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
          >
            {!product.inStock
              ? "Out of stock"
              : added
                ? `${quantity} item(s) selected`
                : "Add to bag"}
          </button>

          {added && (
            <p role="status" className="mt-3 text-sm text-green-700">
              {quantity} item(s) added to your bag.
            </p>
          )}

          <p className="mt-5 text-xs leading-6 text-neutral-500">
            Thoughtfully selected essentials. Simple design, made for everyday
            living.
          </p>

          <Link
            href="/shop"
            className="mt-8 w-fit border-b border-neutral-900 pb-1 text-sm hover:text-neutral-500"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </section>
  );
}
