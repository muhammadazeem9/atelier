export default function ProductLoading() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-16">
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div className="aspect-[4/5] animate-pulse bg-clay/60" />
        <div className="space-y-4">
          <div className="h-4 w-24 animate-pulse bg-clay/60" />
          <div className="h-10 w-3/4 animate-pulse bg-clay/60" />
          <div className="h-6 w-20 animate-pulse bg-clay/60" />
        </div>
      </div>
    </section>
  );
}
