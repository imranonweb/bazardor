import ProductCard from "./ProductCard";
import { type Product } from "@/lib/utils";

export default function PriceFallers({ products }: { products?: Product[] }) {
  const fallers = (products || [])
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => (a.change?.pct || 0) - (b.change?.pct || 0))
    .slice(0, 6);

  if (fallers.length === 0) return null;

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-4 flex items-center gap-2">
          <span aria-hidden="true" className="text-green-600 font-bold text-lg">▼</span>
          <h2 className="text-2xl font-bold text-gray-900">আজ দাম কমেছে</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fallers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
