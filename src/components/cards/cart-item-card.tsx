"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartProduct } from "@/types/cart";
import Link from "next/link";

interface CartItemCardProps {
  item: CartProduct;
  onRemove: (id: string) => void;
  onUpdateCount: (id: string, count: number) => void;
}

export function CartItemCard({
  item,
  onRemove,
  onUpdateCount,
}: CartItemCardProps) {
  const { product, count, price } = item;

  return (
    <div className="flex items-start gap-4 rounded-3xl bg-card p-4 shadow-sm ring-1 ring-foreground/5 transition-opacity">
      {/* Product image */}
      <Link
        href={`/products/${product.id}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-muted border border-border shadow-xs shadow-border"
      >
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
          className="object-cover"
          loading="lazy"
          sizes="96px"
        />
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link
              href={`/products/${product.id}`}
              className="font-semibold text-sm leading-tight line-clamp-2"
            >
              {product.title}
            </Link>
            {product.category && (
              <Link
                href={`/categories/${product.category._id}`}
                className="text-xs text-muted-foreground mt-0.5"
              >
                {product.category.name}
              </Link>
            )}
          </div>

          {/* Remove button */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer "
            onClick={() => onRemove(product.id)}
            aria-label={`Remove ${product.title} from cart`}
            id={`remove-cart-item-${product.id}`}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>

        {/* Price + Quantity */}
        <div className="flex items-center justify-between gap-4 mt-1">
          <div>
            <p className="text-base font-bold">${(price * count).toFixed(2)}</p>
            {count > 1 && (
              <p className="text-xs text-muted-foreground">
                ${price.toFixed(2)} each
              </p>
            )}
          </div>

          {/* Quantity controls */}
          <div className="flex items-center gap-2 rounded-full border border-border bg-background px-1 py-0.5">
            <Button
              variant="ghost"
              size="icon-xs"
              className="rounded-full cursor-pointer"
              onClick={() => onUpdateCount(product.id, count - 1)}
              disabled={count <= 1}
              aria-label="Decrease quantity"
              id={`decrease-qty-${product.id}`}
            >
              <Minus className="size-3" />
            </Button>

            <span className="w-6 text-center text-sm font-semibold select-none">
              {count}
            </span>

            <Button
              variant="ghost"
              size="icon-xs"
              className="rounded-full cursor-pointer"
              onClick={() => onUpdateCount(product.id, count + 1)}
              disabled={count >= product.quantity}
              aria-label="Increase quantity"
              id={`increase-qty-${product.id}`}
            >
              <Plus className="size-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
