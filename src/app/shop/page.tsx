import ProductCard from "@/components/shop/ProductCard";
import { getProducts } from "@/lib/product";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#f7f5f0] px-6 py-12 text-[#25241f] md:px-12 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 border-b border-black/10 pb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
            The ATELIER collection
          </p>

          <h1 className="mt-4 font-serif text-4xl md:text-6xl">Shop all</h1>

          <p className="mt-4 max-w-lg leading-7 text-stone-600">
            Thoughtful essentials, timeless pieces, and objects designed to
            become part of everyday life.
          </p>

          <p className="mt-6 text-sm text-stone-500">
            {products.length} products
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
