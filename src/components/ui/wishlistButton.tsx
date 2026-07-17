"use client";
import { Heart } from "lucide-react";
import { Button } from "./button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { useEffect } from "react";
import { retrieveWishlist } from "@/redux/slices/wishlistSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
export default function WishlistButton() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(retrieveWishlist());
  }, [dispatch]);
  const { count } = useSelector((state: RootState) => state.wishlist);
  return (
    <Button variant="ghost" size="icon" asChild>
      <Link href="/account/wishlist" title="Wishlist" className="relative">
        <Heart className="size-5" />
        {count > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
            {count}
          </span>
        )}
        <span className="sr-only">Wishlist</span>
      </Link>
    </Button>
  );
}
