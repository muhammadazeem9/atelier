"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items } = useCart();

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
        Your Bag ({items.reduce((total, item) => total + item.quantity, 0)})
      </h1>

      <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
        {items.map((item) => (
          <div key={item.product.id} className="flex gap-5 py-6">
            <div className="relative h-32 w-24 shrink-0 bg-neutral-100">
              <Image
                src={item.product.image}
                alt={item.product.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-center">
              <h2 className="font-medium">{item.product.name}</h2>

              <p className="mt-2 text-sm text-neutral-500">
                {item.product.category}
              </p>

              <p className="mt-3 text-sm">Quantity: {item.quantity}</p>

              <p className="mt-2 font-medium">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="ml-auto mt-8 max-w-sm">
        <div className="flex justify-between text-lg">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <p className="mt-3 text-sm text-neutral-500">
          Shipping and taxes are calculated at checkout.
        </p>

        <button
          type="button"
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
