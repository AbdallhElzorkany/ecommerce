"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "./button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { useEffect } from "react";
import { retrieveCart } from "@/redux/slices/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
export default function CartButton() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(retrieveCart());
  }, [dispatch]);
  const {cart} = useSelector((state: RootState) => state.cart);
    const totalProducts = cart.products.reduce(
      (acc, item) => acc + item.count,
      0,
    );
  return (
    <Button variant="ghost" size="icon" asChild>
      <Link href="/account/cart" title="Cart" className="relative">
        <ShoppingCart className="size-5" />
        {totalProducts > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
            {totalProducts}
          </span>
        )}
        <span className="sr-only">Cart</span>
      </Link>
    </Button>
  );
}