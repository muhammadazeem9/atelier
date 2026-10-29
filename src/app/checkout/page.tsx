"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { CheckoutOrder, PaymentMethod } from "@/types/order";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [error, setError] = useState("");

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const shipping = subtotal >= 100 ? 0 : 5;
  const total = subtotal + shipping;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your bag is empty. Add a product before checkout.");
      return;
    }

    const formData = new FormData(event.currentTarget);

    const customer = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      address: String(formData.get("address") ?? "").trim(),
      city: String(formData.get("city") ?? "").trim(),
      postalCode: String(formData.get("postalCode") ?? "").trim(),
    };

    const order: CheckoutOrder = {
      orderNumber: `ATL-${Date.now().toString().slice(-8)}`,
      customer,
      paymentMethod,
      items: items.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      })),
      subtotal,
      shipping,
      total,
      createdAt: new Date().toISOString(),
    };

    try {
      sessionStorage.setItem("atelier-last-order", JSON.stringify(order));
    } catch {
      setError(
        "Unable to save your demo order in this browser. Please check your browser storage settings.",
      );
      return;
    }

    clearCart();
    router.push("/order-confirmation");
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-3xl font-light">Your bag is empty</h1>
        <p className="mt-4 text-neutral-500">
          Add something to your bag before checking out.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block bg-neutral-950 px-8 py-4 text-sm uppercase tracking-widest text-white"
        >
          Explore the shop
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12 md:px-12">
      <nav className="mb-8 text-sm text-neutral-500">
        <Link href="/cart" className="hover:text-black">
          Bag
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-950">Checkout</span>
      </nav>

      <h1 className="text-3xl font-light tracking-wide">Checkout</h1>

      <p className="mt-3 text-sm text-neutral-500">
        Complete your delivery details and review your order.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]"
      >
        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-medium">1. Contact information</h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" required />
              <Field label="Email address" name="email" type="email" required />
              <Field label="Phone number" name="phone" type="tel" required />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium">2. Shipping address</h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Street address" name="address" required />
              </div>
              <Field label="City" name="city" required />
              <Field label="Postal code" name="postalCode" required />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium">3. Payment method</h2>

            <div className="mt-5 space-y-3">
              <label className="flex cursor-pointer items-start gap-3 border border-neutral-300 p-4">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="mt-1 accent-black"
                />
                <span>
                  <span className="block text-sm font-medium">
                    Cash on Delivery
                  </span>
                  <span className="mt-1 block text-sm text-neutral-500">
                    Pay when your order arrives.
                  </span>
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-3 border border-neutral-300 p-4">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                  className="mt-1 accent-black"
                />
                <span>
                  <span className="block text-sm font-medium">
                    Online payment
                  </span>
                  <span className="mt-1 block text-sm text-neutral-500">
                    Payment gateway integration is not connected yet. This demo
                    will not charge you.
                  </span>
                </span>
              </label>
            </div>
          </section>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-neutral-950 px-6 py-4 text-sm uppercase tracking-widest text-white transition hover:bg-neutral-800"
          >
            {paymentMethod === "cod"
              ? "Place demo order"
              : "Continue with demo payment"}
          </button>

          <p className="text-xs leading-6 text-neutral-500">
            Demo checkout only. This does not create a server-side order or
            process a real payment.
          </p>
        </div>

        <aside className="h-fit border border-neutral-200 p-6">
          <h2 className="text-lg font-medium">Order summary</h2>

          <div className="mt-5 space-y-5">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between gap-4 text-sm"
              >
                <div>
                  <p>{item.product.name}</p>
                  <p className="mt-1 text-neutral-500">Qty: {item.quantity}</p>
                </div>
                <p className="shrink-0">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 border-t border-neutral-200 pt-5 text-sm">
            <SummaryRow label="Subtotal" value={subtotal} />
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between border-t border-neutral-200 pt-4 text-base font-medium">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Link
            href="/cart"
            className="mt-6 block text-sm underline underline-offset-4 hover:text-neutral-500"
          >
            Return to bag
          </Link>
        </aside>
      </form>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-2 block">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={name === "postalCode" ? "postal-code" : name}
        className="w-full border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-neutral-950"
      />
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span>${value.toFixed(2)}</span>
    </div>
  );
}
