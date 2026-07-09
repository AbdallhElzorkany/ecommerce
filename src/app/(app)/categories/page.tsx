import { CategoryCard } from "@/components/cards/category-card";
import { AppPagination } from "@/components/ui/app-pagination";
import { CategoriesResponse, Category } from "@/types/category";
import { XCircle } from "lucide-react";
export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page } = await searchParams;
  const pageNumber = page ? parseInt(page as string) : 1;
  const categories: CategoriesResponse = await (
    await fetch(
      `${process.env.API_URL}/api/v1/categories?limit=24&page=${pageNumber}`,
    )
  ).json();

  return (
    <main className="container p-5 space-y-5 mx-auto min-h-[calc(100vh-65px)] flex justify-between flex-col">
      <section className="space-y-5">
        <section className="py-5 space-y-5">
          <h1 className="text-4xl font-bold">All Categories</h1>
          <p>Discover all categories available in our shop.</p>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.data.length === 0 ? (
            <div className="col-span-full gap-5 h-[50vh] flex flex-col items-center justify-center py-5">
              <XCircle className="w-12 h-12" />
              <p className="text-muted-foreground text-2xl">
                No categories found
              </p>
            </div>
          ) : (
            categories.data.map((category: Category) => (
              <CategoryCard key={category._id} category={category} />
            ))
          )}
        </section>
      </section>

      {categories.metadata.numberOfPages > 1 && (
        <section className="py-8">
          <AppPagination
            metadata={categories.metadata}
            basePath="/categories"
          />
        </section>
      )}
    </main>
  );
}
