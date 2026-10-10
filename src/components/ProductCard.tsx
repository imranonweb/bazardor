import Link from "next/link";
import { formatPrice, toBengaliNumber, getUnitBn, type Product } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="card bg-white border border-gray-200 hover:border-green-500 hover:shadow-md transition duration-200 rounded-2xl cursor-pointer group"
    >
      <div className="card-body p-4 gap-3">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="grid size-12 shrink-0 place-items-center rounded-xl bg-gray-100 text-2xl group-hover:scale-105 transition-transform"
          >
            {product.image}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
              {product.nameBn}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{getUnitBn(product.unit)}</p>
          </div>
        </div>

        <div className="flex items-end justify-between gap-2 mt-auto pt-2 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400">আজকের দাম</p>
            <p className="text-xl font-bold text-gray-900">
              {formatPrice(product.today)} <span className="text-sm font-medium text-gray-600">টাকা</span>
            </p>
          </div>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
              product.change.dir === "up"
                ? "bg-red-50 text-red-600 border border-red-200"
                : product.change.dir === "down"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-gray-100 text-gray-600 border border-gray-200"
            }`}
          >
            {product.change.dir === "up"
              ? `▲ ${toBengaliNumber(Math.abs(product.change.pct).toFixed(1))}%`
              : product.change.dir === "down"
              ? `▼ ${toBengaliNumber(Math.abs(product.change.pct).toFixed(1))}%`
              : `— ${toBengaliNumber("0.0")}%`}
          </span>
        </div>
      </div>
    </Link>
  );
}
