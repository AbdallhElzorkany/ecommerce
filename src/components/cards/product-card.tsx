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
interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
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
      <CardContent>
        <p className="font-semibold text-lg">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full cursor-pointer">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
