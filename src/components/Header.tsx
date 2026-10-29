"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className="flex items-center justify-between border-b border-black/10 px-6 py-5 md:px-12">
      <Link href="/" className="text-xl font-semibold tracking-[0.2em]">
        ATELIER
      </Link>

      <nav
        aria-label="Main navigation"
        className="flex items-center gap-6 text-sm"
      >
        <Link href="/shop" className="transition-opacity hover:opacity-60">
          Shop
        </Link>

        <Link
          href="/wishlist"
          aria-label="Wishlist"
          className="transition-opacity hover:opacity-60"
        >
          <Heart size={20} />
        </Link>

        <Link
          href="/cart"
          aria-label={`Shopping bag, ${cartCount} items`}
          className="transition-opacity hover:opacity-60"
        >
          <span className="relative inline-flex">
            <ShoppingBag size={22} />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-700 px-1 text-[10px] font-medium text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </span>
        </Link>
      </nav>
    </header>
  );
}
