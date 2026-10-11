import Hero from "@/components/Hero";
import PriceRisers from "@/components/PriceRisers";
import PriceFallers from "@/components/PriceFallers";
import AllProducts from "@/components/AllProducts";
import { fetchApi, type Product } from "@/lib/utils";

async function getProducts(): Promise<Product[]> {
  try {
    return await fetchApi<Product[]>("/products", { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Failed to fetch products for Home page:", error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <Hero />
      <PriceRisers products={products} />
      <PriceFallers products={products} />
      <AllProducts products={products} />
    </>
  );
}
