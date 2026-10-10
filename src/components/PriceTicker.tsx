"use client";

import { useEffect, useState } from "react";
import { formatPrice, toBengaliNumber, fetchApi, type Product } from "@/lib/utils";

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchApi<Product[]>("/products")
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  if (products.length === 0) {
    return (
      <div className="bg-white border-t border-b border-gray-200 overflow-hidden py-2.5 px-4" role="marquee" aria-label="আজকের দাম পরিবর্তনের তালিকা">
        <div className="flex items-center gap-8 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-48"></div>
          <div className="h-4 bg-gray-200 rounded w-40"></div>
          <div className="h-4 bg-gray-200 rounded w-52"></div>
          <div className="h-4 bg-gray-200 rounded w-44"></div>
        </div>
      </div>
    );
  }

  const unitMap: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  const tickerItems = [...products, ...products];

  return (
    <div className="bg-white border-t border-b border-gray-200 overflow-hidden" role="marquee" aria-label="আজকের দাম পরিবর্তনের তালিকা">
      <div className="animate-marquee whitespace-nowrap py-2 flex">
        {tickerItems.map((product, index) => (
          <span
            key={`${index}`}
            className="inline-flex items-center gap-1.5 border-e border-gray-200 px-4 text-sm"
          >
            <span>{product.image}</span>
            <span className="font-medium text-gray-800">{product.nameBn}</span>
            <span className="text-gray-500">
              {formatPrice(product.today)} টাকা/{unitMap[product.unit] || product.unit}
            </span>
            <span
              className={`font-semibold ${
                product.change.dir === "up"
                  ? "text-red-500"
                  : product.change.dir === "down"
                  ? "text-green-600"
                  : "text-gray-400"
              }`}
            >
              {product.change.dir === "up"
                ? `▲ ${toBengaliNumber(Math.abs(product.change.pct).toFixed(1))}%`
                : product.change.dir === "down"
                ? `▼ ${toBengaliNumber(Math.abs(product.change.pct).toFixed(1))}%`
                : `— ${toBengaliNumber("0.0")}%`}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
