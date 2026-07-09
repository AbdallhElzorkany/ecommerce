import { BrandCard } from "@/components/cards/brand-card";
import { Brand, BrandsResponse } from "@/types/brand";
import { AppPagination } from "@/components/ui/app-pagination";

export default async function BrandsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page } = await searchParams;
  const pageNumber = page ? parseInt(page as string) : 1;
  const brands: BrandsResponse = await (
    await fetch(
      `${process.env.API_URL}/api/v1/brands?limit=24&page=${pageNumber}`,
    )
  ).json();

  return (
    <main className="container p-5 space-y-5 mx-auto min-h-[calc(100vh-65px)] flex justify-between flex-col">
      <section className="space-y-5">
        <section className="py-5 space-y-5">
          <h1 className="text-4xl font-bold">All Brands</h1>
          <p>Discover all brands available in our shop.</p>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {brands.data.map((brand: Brand) => (
            <BrandCard key={brand._id} brand={brand} />
          ))}
        </section>
      </section>
      {brands.metadata.numberOfPages > 1 && (
        <section className="py-8">
          <AppPagination metadata={brands.metadata} basePath="/brands" />
        </section>
      )}
    </main>
  );
}
