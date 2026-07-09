import { ProductCard } from "@/components/cards/product-card";
import { AppPagination } from "@/components/ui/app-pagination";
import { BrandResponse } from "@/types/brand";
import { Product, ProductsResponse } from "@/types/product";
import { XCircle } from "lucide-react";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const { page } = await searchParams;
  const pageNumber = page ? parseInt(page as string) : 1;

  const [brand, products]: [BrandResponse, ProductsResponse] =
    await Promise.all([
      (await fetch(`${process.env.API_URL}/api/v1/brands/${id}`)).json(),
      (
        await fetch(`${process.env.API_URL}/api/v1/products?brand=${id}&page=${pageNumber}`)
      ).json(),
    ]);
  return (
    <main className="container p-5 space-y-5 mx-auto min-h-[calc(100vh-65px)] flex justify-between flex-col">
      <section className="space-y-5">
        <section className="py-5 space-y-5">
          <h1 className="text-4xl font-bold">{brand.data.name}</h1>
          <p>Discover all {brand.data.name} products available in our shop.</p>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.data.length === 0 ? (
            <div className="col-span-full gap-5 h-[50vh] flex flex-col items-center justify-center py-5">
              <XCircle className="w-12 h-12" />
              <p className="text-muted-foreground text-2xl">No products found under {brand.data.name} yet</p>
            </div>
          ) : (
            products.data.map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </section>
      </section>
      {products.metadata.numberOfPages > 1 && (
        <section className="py-8">
          <AppPagination metadata={products.metadata} basePath={`/brands/${id}`} />
        </section>
      )}
    </main>
  );
}
