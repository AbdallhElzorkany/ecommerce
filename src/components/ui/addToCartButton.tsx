"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "./button";
import { addToCart } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

export default function AddToCartButton({Id, quantity}: {Id: string, quantity: number}) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Button
      size="lg"
      className="flex-1 h-14 text-lg font-semibold gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
      disabled={quantity === 0}
      onClick={() => dispatch(addToCart(Id))}
    >
      <ShoppingCart className="w-5 h-5" />
      Add to Cart
    </Button>
  );
}
