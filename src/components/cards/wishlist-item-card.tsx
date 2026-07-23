"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddToCartButton from "@/components/addToCartButton";
import { Product } from "@/types/product";
import Link from "next/link";

interface WishlistItemCardProps {
  product: Product;
  onRemove: (id: string) => void;
}

export function WishlistItemCard({ product, onRemove }: WishlistItemCardProps) {
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
          sizes="96px"
          loading="lazy"
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
            aria-label={`Remove ${product.title} from wishlist`}
            id={`remove-wishlist-item-${product.id}`}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>

        {/* Price + add to cart button */}
        <div className="flex items-center justify-between gap-4 mt-1">
          <div>
            <p className="text-base font-bold">${product.price.toFixed(2)}</p>
          </div>

          {/* Add to cart button */}
          <div>
            <AddToCartButton
              Id={product.id}
              quantity={product.quantity}
              size="sm"
              textSize="text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
