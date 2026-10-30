"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-serif text-4xl">Something went wrong</h1>
      <p className="mt-4 text-muted">Please try again in a moment.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 bg-charcoal px-8 py-4 text-sm uppercase tracking-widest text-white transition hover:opacity-80"
      >
        Try again
      </button>
    </main>
  );
}
