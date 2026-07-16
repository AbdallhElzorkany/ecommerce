import { ProductResponse } from "@/types/product";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import AddToCartButton from "@/components/ui/addToCartButton";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`${process.env.API_URL}/api/v1/products/${id}`);

  if (!res.ok) {
    return (
      <div className="min-h-[calc(100vh-65px)] flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-2">
          The product you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  const productResponse = (await res.json()) as ProductResponse;
  const product = productResponse.data;

  const images =
    product.images?.length > 0
      ? product.images
      : product.imageCover
        ? [product.imageCover]
        : [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
          </BreadcrumbItem>
          {product.category && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/categories/${product.category._id}`}>
                  {product.category.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium text-primary">
              {product.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images section */}
        <div className="w-full flex justify-center">
          {images.length > 0 ? (
            <Carousel className="w-full max-w-lg">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square relative overflow-hidden rounded-2xl bg-primary shadow-sm">
                      <Image
                        src={image}
                        alt={`${product.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {images.length > 1 && (
                <>
                  <CarouselPrevious className="left-4 cursor-pointer" variant="secondary" size="lg"/>
                  <CarouselNext className="right-2 cursor-pointer" variant="secondary" size="lg"/>
                </>
              )}
            </Carousel>
          ) : (
            <div className="w-full max-w-md aspect-square rounded-2xl bg-gray-100 flex items-center justify-center border border-gray-200">
              <span className="text-gray-400 font-medium">
                No Image Available
              </span>
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
              {product.title}
            </h1>
            {product.brand && (
              <p className="text-lg mt-3 font-medium">
                Brand:{" "}
                <span className="font-semibold">{product.brand.name}</span>
              </p>
            )}

            <div className="flex items-center mt-5 space-x-4">
              <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                <span className="ml-1.5 font-bold text-yellow-700">
                  {product.ratingsAverage}
                </span>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <span className="text-sm font-medium cursor-pointer transition-colors">
                {product.ratingsQuantity} reviews
              </span>
              <Separator orientation="vertical" className="h-6" />
              <span className="text-sm font-medium">{product.sold} sold</span>
            </div>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-5xl font-black">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <p className="leading-relaxed text-lg">{product.description}</p>

          <Separator />

          <div className="pt-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold tracking-wide ${
                product.quantity > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.quantity > 0
                ? `${product.quantity} IN STOCK`
                : "OUT OF STOCK"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {product.quantity > 0 && (
              <AddToCartButton Id={product.id} quantity={product.quantity} />
            )}
            <Button
              size="lg"
              variant="secondary"
              className="flex-1 h-14 text-lg font-semibold gap-2 border-2 border-gray-200 hover:border-gray-300 transition-all cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-24 max-w-4xl">
          <Separator className="mb-12" />
          <h2 className="text-3xl font-bold tracking-tight mb-8">
            Customer Reviews
          </h2>
          <div className="space-y-8">
            {product.reviews.toReversed().map((review) => (
              <Card
                key={review._id}
                className=" p-6 rounded-2xl shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center font-bold mr-4">
                      {(review.user?.name || "A")[0].toUpperCase()}
                    </div>
                    <div>
                      <span className="font-semibold block">
                        {review.user?.name || "Anonymous User"}
                      </span>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="leading-relaxed ml-14">
                  {review.review}
                </p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
