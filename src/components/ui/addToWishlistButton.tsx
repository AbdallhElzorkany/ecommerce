"use client";
import { Heart } from "lucide-react";
import { Button } from "./button";
import {
  addToWishlist,
  removeWishlistItem,
} from "@/redux/slices/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Product } from "@/types/product";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddToWishlistButton({ product }: { product: Product }) {
  const dispatch = useDispatch<AppDispatch>();
  const { wishlist } = useSelector((state: RootState) => state.wishlist);
  const session = useSession();
  const router = useRouter();
  
  return (
    <>
      {wishlist.find((item) => item.id === product.id) ? (
        <Button
          size="lg"
          variant="destructive"
          className="flex-1 h-14 text-lg font-semibold gap-2 text-destructive-foreground  transition-all cursor-pointer"
          onClick={() => dispatch(removeWishlistItem(product.id))}
        >
          <Heart className="size-5 fill-red-700 text-red-700" />
          Remove from Wishlist
        </Button>
      ) : (
        <Button
          size="lg"
          variant="outline"
          className="flex-1 h-14 text-lg font-semibold gap-2  transition-all cursor-pointer"
          onClick={() => {              if (session.status === "unauthenticated") {
                router.push("/signin");
              } else {dispatch(addToWishlist(product))}}}
        >
          <Heart className="size-5 text-red-700" />
          Add to Wishlist
        </Button>
      )}
    </>
  );
}
