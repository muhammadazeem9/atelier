export default function ShopLoading() {
  return (
    <main className="px-6 py-12 md:px-12 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 h-24 w-1/2 animate-pulse bg-clay/60" />
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[4/5] animate-pulse bg-clay/60" />
              <div className="mt-4 h-4 w-2/3 animate-pulse bg-clay/60" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
