"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type SavedOrder = {
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: "cod" | "online";
  items: {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
};

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<SavedOrder | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedOrder = sessionStorage.getItem("atelier-last-order");

      if (savedOrder) {
        setOrder(JSON.parse(savedOrder) as SavedOrder);
      }
    } catch {
      setOrder(null);
    } finally {
      setLoaded(true);
    }
  }, []);

  if (!loaded) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-neutral-500">Loading order summary...</p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-3xl font-light">No order found</h1>
        <p className="mt-4 text-neutral-500">
          Complete checkout to see your order confirmation.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block bg-neutral-950 px-8 py-4 text-sm uppercase tracking-widest text-white"
        >
          Return to shop
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:px-10">
      <div className="border border-neutral-200 p-6 sm:p-10">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
          ATELIER
        </p>

        <h1 className="mt-5 text-3xl font-light tracking-wide">
          Thank you, {order.customer.name}
        </h1>

        <p className="mt-4 leading-7 text-neutral-600">
          Your demo checkout has been completed. This is a frontend
          confirmation, not a real submitted order.
        </p>

        <div className="mt-8 border-y border-neutral-200 py-5">
          <div className="flex flex-wrap justify-between gap-2 text-sm">
            <span className="text-neutral-500">Demo order number</span>
            <span className="font-medium">{order.orderNumber}</span>
          </div>

          <div className="mt-4 flex justify-between gap-4 text-sm">
            <span className="text-neutral-500">Payment method</span>
            <span>
              {order.paymentMethod === "cod"
                ? "Cash on Delivery"
                : "Online payment (demo)"}
            </span>
          </div>

          {order.paymentMethod === "online" && (
            <p className="mt-4 text-sm text-amber-700">
              No payment was processed. A payment provider must be integrated
              before online payments can be accepted.
            </p>
          )}
        </div>

        <section className="mt-8">
          <h2 className="font-medium">Delivery details</h2>
          <p className="mt-3 text-sm leading-6 text-neutral-600">
            {order.customer.name}
            <br />
            {order.customer.address}
            <br />
            {order.customer.city}, {order.customer.postalCode}
            <br />
            {order.customer.phone}
            <br />
            {order.customer.email}
          </p>
        </section>

        <section className="mt-8">
          <h2 className="font-medium">Order summary</h2>

          <div className="mt-4 divide-y divide-neutral-200 border-y border-neutral-200">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between gap-4 py-4 text-sm"
              >
                <div>
                  <p>{item.name}</p>
                  <p className="mt-1 text-neutral-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {order.shipping === 0
                  ? "Free"
                  : `$${order.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between border-t border-neutral-200 pt-4 text-base font-medium">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </section>

        <Link
          href="/shop"
          className="mt-10 block bg-neutral-950 px-6 py-4 text-center text-sm uppercase tracking-widest text-white transition hover:bg-neutral-800"
        >
          Continue shopping
        </Link>
      </div>
    </main>
  );
}
