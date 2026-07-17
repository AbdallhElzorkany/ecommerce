"use client";
import { Product } from "@/types/product";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { addToCart } from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { Heart, ShoppingCart } from "lucide-react";
import {
  addToWishlist,
  removeWishlistItem,
} from "@/redux/slices/wishlistSlice";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { wishlist } = useSelector((state: RootState) => state.wishlist);
  const router = useRouter();
  const session = useSession();
  return (
    <Card className="flex flex-col h-full overflow-hidden pt-0">
      <Link
        href={`/products/${product.id}`}
        className="relative aspect-square overflow-hidden bg-muted"
      >
        <Image
          src={product.imageCover}
          alt={product.title}
          className="object-cover w-full h-full transition-transform hover:scale-105"
          loading="lazy"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          fill
        />
      </Link>
      <CardHeader className="flex-1">
        <Link href={`/products/${product.id}`}>
          <CardTitle className="line-clamp-2 text-lg">
            {product.title}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <p className="font-semibold text-lg">${product.price.toFixed(2)}</p>

        {wishlist.find((item) => item.id === product.id) ? (
          <Button
            variant="destructive"
            className="transition-all cursor-pointer"
            onClick={() => dispatch(removeWishlistItem(product.id))}
          >
            <Heart className="size-5 fill-red-700 text-red-700" />
          </Button>
        ) : (
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => {
              if (session.status === "unauthenticated") {
                router.push("/signin");
              } else {
                dispatch(addToWishlist(product));
              }
            }}
          >
            <Heart className="size-5 text-red-700" />
          </Button>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full cursor-pointer"
          size="lg"
          onClick={() => {
            if (session.status === "unauthenticated") {
              router.push("/signin");
            } else {
              dispatch(addToCart(product.id));
            }
          }}
        >
          <ShoppingCart className="size-5" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
