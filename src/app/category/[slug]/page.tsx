"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import SortDropdown from "@/components/SortDropdown";
import { fetchApi, toBengaliNumber, type Product, type Category } from "@/lib/utils";
import Link from "next/link";

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(false);

    Promise.allSettled([
      fetchApi<Product[]>(`/products?category=${slug}`),
      fetchApi<Category>(`/categories/${slug}`),
    ])
      .then(([productsResult, categoryResult]) => {
        const productsData =
          productsResult.status === "fulfilled" ? productsResult.value : [];
        const categoryData =
          categoryResult.status === "fulfilled" ? categoryResult.value : null;

        if (!productsData || productsData.length === 0) {
          setError(true);
        } else {
          setProducts(productsData);
          setCategory(
            categoryData || {
              id: slug,
              slug,
              nameBn: productsData[0]?.categoryNameBn || slug,
              icon: productsData[0]?.categoryIcon || "🏷️",
            }
          );
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") return a.today - b.today;
    if (sortBy === "price-desc") return b.today - a.today;
    return 0;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="skeleton h-8 w-48 mb-2"></div>
        <div className="skeleton h-4 w-32 mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card bg-white border p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="skeleton w-12 h-12 rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="skeleton h-4 w-24"></div>
                  <div className="skeleton h-3 w-16"></div>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <div className="skeleton h-3 w-16"></div>
                  <div className="skeleton h-6 w-20"></div>
                </div>
                <div className="skeleton h-5 w-14"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || products.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">😢</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          কোনো পণ্য পাওয়া যায়নি
        </h2>
        <p className="text-gray-500 mb-6">
          এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ক্যাটাগরিটি সঠিক নয়।
        </p>
        <Link href="/" className="btn btn-success text-white">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span>{category?.icon}</span>
            {category?.nameBn}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
