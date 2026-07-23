import { ProductResponse, ReviewsResponse } from "@/types/product";
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
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import Image from "next/image";
import AddToCartButton from "@/components/addToCartButton";
import AddToWishlistButton from "@/components/addToWishlistButton";
import ReviewCard from "@/components/cards/review-card";
import AddReviewForm from "@/components/reviews/addReviewForm";
import { auth } from "@/lib/auth";

export const revalidate = 60;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [productReq, reviewsReq, session] = await Promise.all([
    fetch(`${process.env.API_URL}/api/v1/products/${id}`),
    fetch(`${process.env.API_URL}/api/v1/products/${id}/reviews`),
    auth(),
  ]);

  if (!productReq.ok) {
    return (
      <div className="min-h-[calc(100vh-65px)] flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-2">
          The product you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  const productResponse = (await productReq.json()) as ProductResponse;
  const reviewsResponse = (await reviewsReq.json()) as ReviewsResponse;
  const product = productResponse.data;
  const reviews = reviewsResponse.data;

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
        <div className="w-full flex justify-center h-fit relative">
          {images.length > 0 ? (
            <Carousel opts={{ loop: true, }} className="w-full max-w-lg ">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square relative overflow-hidden rounded-2xl bg-primary shadow-sm cursor-grab">
                      <Image
                        src={image}
                        alt={`${product.title} - Image ${index + 1}`}
                        fill
                        sizes=""
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {images.length > 1 && (
                <>
                  <CarouselPrevious
                    className="left-4 cursor-pointer"
                    variant="destructive"
                    size="lg"
                  />
                  <CarouselNext
                    className="right-2 cursor-pointer"
                    variant="destructive"
                    size="lg"
                  />
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
                <Star className="size-5 fill-yellow-500 text-yellow-500" />
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
              <AddToCartButton
                Id={product.id}
                quantity={product.quantity}
                height="h-14"
                size="lg"
                textSize="text-lg"
              />
            )}
            <AddToWishlistButton product={product} />
          </div>
        </div>
      </div>

      {/* Reviews Section */}

      <div className="pt-24">
        <Separator className="mb-12" />
        <h2 className="text-3xl font-bold tracking-tight mb-8">
          Customer Reviews{" "}
          <span className="text-muted-foreground">
            ({reviewsResponse?.results})
          </span>
        </h2>
        <Separator className="mb-12" />
        <AddReviewForm productId={product.id} token={session?.accessToken} />
        <Separator className="my-12" />
        {reviews && reviews.length > 0 ? (
          <div className="space-y-8">
            {reviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                token={session?.accessToken}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground bg-primary/5 ring-1 ring-border py-8 rounded-2xl flex items-center justify-center flex-col gap-2">
            <Star className="text-muted-foreground size-10" />
            No reviews yet.
            <span className="text-sm text-muted-foreground">
              Be the first to review this product!
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
