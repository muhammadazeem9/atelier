import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/shop/ProductCard";
import { products } from "@/data/products";

export default function Home() {
  const featuredProducts = products.filter((product) => product.inStock);

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#25241F]">
      <HeroSection />

      <section
        id="shop"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#8A7967]">
              Curated for everyday living
            </p>

            <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
              Shop the collection
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-[#77736C]">
              Timeless essentials, thoughtful details, and understated design
              for modern living.
            </p>
          </div>

          <p className="text-sm text-[#77736C]">
            {featuredProducts.length} products
          </p>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-sm text-[#77736C]">
            New pieces are coming soon. Please check back later.
          </p>
        )}
      </section>
    </main>
  );
}
