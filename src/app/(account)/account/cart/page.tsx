"use client";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Trash2,
  ChevronRight,
  PackageOpen,
  AlertCircle,
} from "lucide-react";

import { AppDispatch, RootState } from "@/redux/store";
import {
  removeCartItem,
  updateCartItemCount,
  clearCart,
  clearError,
} from "@/redux/slices/cartSlice";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { CartItemCard } from "@/components/cards/cart-item-card";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { cart, loading, error } = useSelector(
    (state: RootState) => state.cart,
  );
  const [clearConfirm, setClearConfirm] = useState(false);

  const handleRemove = useCallback(
    (productId: string) => {
      dispatch(removeCartItem(productId));
    },
    [dispatch],
  );

  const handleUpdateCount = useCallback(
    (productId: string, count: number) => {
      if (count < 1) return;
      dispatch(updateCartItemCount({ productId, count }));
    },
    [dispatch],
  );

  const handleClearCart = useCallback(() => {
    if (!clearConfirm) {
      setClearConfirm(true);
      setTimeout(() => setClearConfirm(false), 3000);
      return;
    }
    dispatch(clearCart());
    setClearConfirm(false);
  }, [clearConfirm, dispatch]);

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => dispatch(clearError()), 4000);
      return () => clearTimeout(t);
    }
  }, [error, dispatch]);

  const handleCheckout = useCallback(() => {
    router.push("/account/checkout");
  }, [router]);
  const totalProducts = cart.products.reduce(
    (acc, item) => acc + item.count,
    0,
  );
  return (
    <main className="container mx-auto max-w-6xl min-h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <ShoppingCart className="size-7" />
          <h1 className="text-3xl font-bold">
            Your Cart
            {cart.products.length > 0 && (
              <span className="ml-2 text-base font-medium text-muted-foreground">
                ({totalProducts} {totalProducts === 1 ? "product" : "products"})
              </span>
            )}
          </h1>
        </div>

        {cart.products.length > 0 && (
          <Button
            variant={clearConfirm ? "destructive" : "outline"}
            size="sm"
            className="gap-2 cursor-pointer transition-all"
            onClick={handleClearCart}
            disabled={loading}
            id="clear-cart-btn"
          >
            <Trash2 className="size-4" />
            {clearConfirm ? "Confirm Clear?" : "Clear Cart"}
          </Button>
        )}
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive ring-1 ring-destructive/20">
          <AlertCircle className="size-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Cart items ── */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {loading && cart.products.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <Spinner className="size-8" />
            </div>
          ) : !loading && cart.products.length === 0 ? (
            <section className="flex flex-col items-center justify-center gap-6 min-h-full max-w-4xl py-16 mx-auto px-4">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="rounded-full bg-muted p-6">
                  <PackageOpen className="size-12 text-muted-foreground" />
                </div>
                <h1 className="text-3xl font-bold">Your cart is empty</h1>
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
            cart.products.map((item) => (
              <CartItemCard
                key={item.product.id}
                item={item}
                onRemove={handleRemove}
                onUpdateCount={handleUpdateCount}
              />
            ))
          )}
        </div>

        {/* ── Order summary ── */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              {/* Price rows */}
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">
                    ${cart.totalCartPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    Free
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span>${cart.totalCartPrice.toFixed(2)}</span>
              </div>

              {/* Coupon section */}
              <Separator />
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pt-0">
              <Button
                size="lg"
                className="w-full gap-2 cursor-pointer text-base font-semibold disabled:cursor-not-allowed"
                onClick={handleCheckout}
                disabled={loading || cart.products.length === 0}
                id="checkout-btn"
              >
                Proceed to Checkout
                <ChevronRight className="size-5" />
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="w-full cursor-pointer text-muted-foreground"
                onClick={() => router.push("/products")}
                id="continue-shopping-btn"
              >
                Continue Shopping
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
