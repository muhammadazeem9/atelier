import Link from "next/link";

export default function Header() {
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

        <Link href="/wishlist" className="transition-opacity hover:opacity-60">
          Wishlist
        </Link>
      </nav>
    </header>
  );
}
