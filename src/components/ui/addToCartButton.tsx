"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "./button";
import { addToCart } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function AddToCartButton({
  Id,
  quantity,
  size,
  textSize,
  height,
}: {
  Id: string;
  quantity: number;
  size: "sm" | "lg" | "xs";
  textSize?: string;
  height?: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const session = useSession();
  return (
    <Button
      size={size}
      className={`flex-1 font-semibold gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer ${textSize} ${height}`}
      disabled={quantity === 0}
      onClick={() => {
        if (session.status === "unauthenticated") {
          router.push("/signin");
        } else {
          dispatch(addToCart(Id));
        }
      }}
    >
      <ShoppingCart className="size-5" />
      Add to Cart
    </Button>
  );
}
