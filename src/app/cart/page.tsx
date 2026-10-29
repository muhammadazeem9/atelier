"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, cartCount, updateQuantity, removeFromCart } = useCart();

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-20 text-center">
        <h1 className="text-3xl font-light tracking-wide">Your Bag</h1>

        <p className="mt-5 text-neutral-500">Your bag is currently empty.</p>

        <Link
          href="/shop"
          className="mt-8 inline-block bg-neutral-950 px-8 py-4 text-sm uppercase tracking-widest text-white transition hover:bg-neutral-800"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 md:px-12">
      <h1 className="text-3xl font-light tracking-wide">
        Your Bag ({cartCount})
      </h1>

      <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
        {items.map((item) => (
          <div key={item.product.id} className="flex gap-5 py-6 sm:gap-8">
            <div className="relative h-32 w-24 shrink-0 bg-neutral-100 sm:h-40 sm:w-32">
              <Image
                src={item.product.image}
                alt={item.product.name}
                fill
                sizes="(max-width: 640px) 96px, 128px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-center">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-medium">{item.product.name}</h2>

                  <p className="mt-2 text-sm text-neutral-500">
                    {item.product.category}
                  </p>

                  <p className="mt-2 text-sm">
                    ${item.product.price.toFixed(2)} each
                  </p>
                </div>

                <p className="font-medium">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="flex h-9 items-center border border-neutral-300">
                  <button
                    type="button"
                    aria-label={`Decrease ${item.product.name} quantity`}
                    disabled={item.quantity <= 1}
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    className="h-full px-3 transition hover:bg-neutral-100 disabled:opacity-30"
                  >
                    <Minus size={14} />
                  </button>

                  <span
                    className="min-w-8 text-center text-sm"
                    aria-live="polite"
                  >
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    aria-label={`Increase ${item.product.name} quantity`}
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    className="h-full px-3 transition hover:bg-neutral-100"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.product.id)}
                  className="flex items-center gap-2 text-sm text-neutral-500 transition hover:text-red-600"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="ml-auto mt-8 max-w-sm">
        <div className="flex justify-between text-lg">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <p className="mt-3 text-sm leading-6 text-neutral-500">
          Shipping and taxes are calculated at checkout.
        </p>

        <button
          type="button"
          onClick={() => alert("Checkout is not implemented yet.")}
          className="mt-6 w-full bg-neutral-950 px-6 py-4 text-sm uppercase tracking-widest text-white transition hover:bg-neutral-800"
        >
          Continue to Checkout
        </button>

        <Link
          href="/shop"
          className="mt-5 block text-center text-sm underline underline-offset-4 hover:text-neutral-500"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
