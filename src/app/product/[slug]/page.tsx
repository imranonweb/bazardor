import { formatPrice, toBengaliNumber, getUnitBn, fetchApi, type Product } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const products = await fetchApi<Product[]>("/products", { next: { revalidate: 60 } });
    return (
      products.find(
        (p) =>
          p.slug === slug ||
          String(p.id) === slug ||
          encodeURIComponent(p.slug) === slug
      ) || null
    );
  } catch {
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const marketsByDivision = product.markets.reduce(
    (acc, market) => {
      if (!acc[market.division]) {
        acc[market.division] = [];
      }
      acc[market.division].push(market);
      return acc;
    },
    {} as Record<string, typeof product.markets>
  );

  const allMins = product.markets.map((m) => m.min);
  const allMaxs = product.markets.map((m) => m.max);
  const minPrice = Math.min(...allMins);
  const maxPrice = Math.max(...allMaxs);
  const avgPrice = Math.round(
    product.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
      product.markets.length
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-5 sm:py-8">
      <div className="breadcrumbs text-xs sm:text-sm mb-4 sm:mb-6 overflow-x-auto whitespace-nowrap no-scrollbar">
        <ul>
          <li>
            <Link href="/">হোম</Link>
          </li>
          <li>
            <Link href={`/category/${product.category}`}>
              {product.categoryNameBn}
            </Link>
          </li>
          <li className="font-semibold text-gray-800">{product.nameBn}</li>
        </ul>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-5 sm:p-7 mb-6 sm:mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6">
          <span className="text-5xl sm:text-6xl p-3 bg-gray-50 rounded-2xl shrink-0">
            {product.image}
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {product.nameBn}
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              আজকের বাজারের সর্বশেষ দাম ও বিস্তারিত
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
              <span className="badge badge-outline text-xs">
                {product.categoryIcon} {product.categoryNameBn}
              </span>
              <span className="badge badge-outline text-xs">
                {getUnitBn(product.unit)}
              </span>
              <span
                className={`badge text-xs font-semibold ${
                  product.change.dir === "up"
                    ? "badge-error text-white"
                    : product.change.dir === "down"
                    ? "badge-success text-white"
                    : "badge-ghost"
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
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-green-50/80 border border-green-200/60 rounded-xl sm:rounded-2xl p-3.5 sm:p-5">
          <p className="text-xs sm:text-sm text-gray-500">সর্বনিম্ন দাম</p>
          <p className="text-lg sm:text-2xl font-bold text-green-700 mt-1">
            {formatPrice(minPrice)} <span className="text-xs sm:text-sm font-normal text-gray-600">টাকা</span>
          </p>
        </div>
        <div className="bg-red-50/80 border border-red-200/60 rounded-xl sm:rounded-2xl p-3.5 sm:p-5">
          <p className="text-xs sm:text-sm text-gray-500">সর্বোচ্চ দাম</p>
          <p className="text-lg sm:text-2xl font-bold text-red-600 mt-1">
            {formatPrice(maxPrice)} <span className="text-xs sm:text-sm font-normal text-gray-600">টাকা</span>
          </p>
        </div>
        <div className="bg-blue-50/80 border border-blue-200/60 rounded-xl sm:rounded-2xl p-3.5 sm:p-5">
          <p className="text-xs sm:text-sm text-gray-500">গড় দাম</p>
          <p className="text-lg sm:text-2xl font-bold text-blue-600 mt-1">
            {formatPrice(avgPrice)} <span className="text-xs sm:text-sm font-normal text-gray-600">টাকা</span>
          </p>
        </div>
        <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl sm:rounded-2xl p-3.5 sm:p-5">
          <p className="text-xs sm:text-sm text-gray-500">আজকের দাম</p>
          <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">
            {formatPrice(product.today)} <span className="text-xs sm:text-sm font-normal text-gray-600">টাকা</span>
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🏪 বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="space-y-6">
          {Object.entries(marketsByDivision).map(([division, markets]) => (
            <div key={division}>
              <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                📍 {division}
              </h3>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-gray-600">বাজার</th>
                      <th className="text-gray-600">সর্বনিম্ন</th>
                      <th className="text-gray-600">সর্বোচ্চ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {markets.map((market) => (
                      <tr key={market.market} className="hover">
                        <td className="font-medium">{market.market}</td>
                        <td className="text-green-600 font-semibold">
                          {formatPrice(market.min)} টাকা
                        </td>
                        <td className="text-red-500 font-semibold">
                          {formatPrice(market.max)} টাকা
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📊 দামের তুলনা</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">আজ</p>
            <p className="text-lg font-bold">{formatPrice(product.today)} টাকা</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">গতকাল</p>
            <p className="text-lg font-bold">{formatPrice(product.yesterday)} টাকা</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">গত সপ্তাহ</p>
            <p className="text-lg font-bold">{formatPrice(product.lastWeek)} টাকা</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">গত মাস</p>
            <p className="text-lg font-bold">{formatPrice(product.lastMonth)} টাকা</p>
          </div>
        </div>
      </div>
    </div>
  );
}
