import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-taupe">404</p>
      <h1 className="mt-4 font-serif text-4xl md:text-5xl">Page not found</h1>
      <p className="mt-4 text-muted">
        The piece you’re looking for may have moved or no longer exists.
      </p>
      <Link
        href="/shop"
        className="mt-8 inline-block bg-charcoal px-8 py-4 text-sm uppercase tracking-widest text-white transition hover:opacity-80"
      >
        Back to shop
      </Link>
    </main>
  );
}
