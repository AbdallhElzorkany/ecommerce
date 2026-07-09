import { BrandCard } from "@/components/cards/brand-card";
import { CategoryCard } from "@/components/cards/category-card";
import { ProductCard } from "@/components/cards/product-card";
import { Brand, BrandsResponse } from "@/types/brand";
import { Category, CategoriesResponse } from "@/types/category";
import { Product, ProductsResponse } from "@/types/product";
import Link from "next/link";
export default async function Home() {
  const [categories, brands, products]: [
    CategoriesResponse,
    BrandsResponse,
    ProductsResponse,
  ] = await Promise.all([
    (await fetch(`${process.env.API_URL}/api/v1/categories?limit=6`)).json(),
    (await fetch(`${process.env.API_URL}/api/v1/brands?limit=6`)).json(),
    (
      await fetch(
        `${process.env.API_URL}/api/v1/products?limit=5&category=6439d5b90049ad0b52b90048`,
      )
    ).json(),
  ]);
  console.log(categories, brands, products);
  return (
    <main className="container p-5 mx-auto space-y-4">
      <section className="py-5 space-y-5">
        <h1 className="text-4xl font-bold">Welcome to our shop</h1>
        <p>Discover the best products at the best prices.</p>
      </section>
      <section className="py-5 space-y-5">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Categories</h2>
          <Link
            href="/categories"
            className="text-gray-600 hover:text-black transition-colors"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {categories.data?.map((category: Category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </section>
      <section className="py-5 space-y-5">
        <div className="flex justify-between items-center ">
          <h2 className="text-2xl font-bold">Brands</h2>
          <Link
            href="/brands"
            className="text-gray-600 hover:text-black transition-colors"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {brands.data?.map((brand: Brand) => (
            <BrandCard key={brand._id} brand={brand} />
          ))}
        </div>
      </section>
      <section className="py-5 space-y-5">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Products</h2>
          <Link
            href="/products"
            className="text-gray-600 hover:text-black transition-colors"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {products.data?.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
