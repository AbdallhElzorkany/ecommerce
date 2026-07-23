"use client";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AlertCircle, Heart } from "lucide-react";

import { AppDispatch, RootState } from "@/redux/store";
import { removeWishlistItem, clearError } from "@/redux/slices/wishlistSlice";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { WishlistItemCard } from "@/components/cards/wishlist-item-card";

export default function WishlistPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { wishlist, count, loading, error } = useSelector(
    (state: RootState) => state.wishlist,
  );

  const handleRemove = useCallback(
    (productId: string) => {
      dispatch(removeWishlistItem(productId));
    },
    [dispatch],
  );



  useEffect(() => {
    if (error) {
      const t = setTimeout(() => dispatch(clearError()), 4000);
      return () => clearTimeout(t);
    }
  }, [error, dispatch]);

  return (
    <main className="container mx-auto max-w-6xl min-h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Heart className="size-7" />
          <h1 className="text-3xl font-bold">
            Your Wishlist
            {count > 0 && (
              <span className="ml-2 text-base font-medium text-muted-foreground">
                ({count} {count === 1 ? "product" : "products"})
              </span>
            )}
          </h1>
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive ring-1 ring-destructive/20">
          <AlertCircle className="size-4 shrink-0" />
          {error}
        </div>
      )}

        {/* ── Wishlist items ── */}
        <div className="space-y-5">
          {loading && count === 0 ? (
            <div className="flex justify-center items-center py-20">
              <Spinner className="size-8" />
            </div>
          ) : !loading && count === 0 ? (
            <section className="flex flex-col items-center justify-center gap-6 min-h-full max-w-4xl py-16 mx-auto px-4">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="rounded-full bg-muted p-6">
                  <Heart className="size-12 text-muted-foreground" />
                </div>
                <h1 className="text-3xl font-bold">Your wishlist is empty</h1>
                <p className="text-muted-foreground max-w-xs">
                  Looks like you haven&apos;t added anything yet. Start shopping
                  to fill it up!
                </p>
                <Button
                  size="lg"
                  className="mt-4 cursor-pointer"
                  onClick={() => router.push("/products")}
                  id="browse-products-btn"
                >
                  Browse Products
                </Button>
              </div>
            </section>
          ) : (
            wishlist.map((product) => (
              <WishlistItemCard
                key={product.id}
                product={product}
                onRemove={handleRemove}
              />
            ))
          )}
        </div>
    </main>
  );
}
