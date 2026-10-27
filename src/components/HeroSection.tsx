import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:px-12 md:py-28"
    >
      <div>
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-stone-500">
          The art of everyday living
        </p>

        <h1
          id="hero-heading"
          className="max-w-xl text-5xl font-light leading-[1.1] tracking-tight md:text-7xl"
        >
          Designed to be
          <span className="block font-serif italic">treasured.</span>
        </h1>

        <p className="mt-6 max-w-md leading-7 text-stone-600">
          Thoughtfully selected fashion and timeless essentials for a more
          considered way of living.
        </p>

        <Link
          href="/shop"
          className="mt-9 inline-flex border border-[#25241f] bg-[#25241f] px-7 py-4 text-sm text-white transition-colors hover:bg-transparent hover:text-[#25241f]"
        >
          Explore the collection
        </Link>
      </div>

      <div
        role="img"
        aria-label="Editorial placeholder representing the ATELIER essentials collection"
        className="flex min-h-[350px] items-center justify-center bg-[#e8e0d4] p-8 md:min-h-[500px]"
      >
        <div className="text-center">
          <p className="font-serif text-5xl italic text-[#756554] md:text-7xl">
            Less, but
            <br />
            better.
          </p>

          <p className="mt-6 text-xs uppercase tracking-[0.25em] text-stone-600">
            The essentials collection
          </p>
        </div>
      </div>
    </section>
  );
}
