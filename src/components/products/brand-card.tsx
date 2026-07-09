import Image from "next/image";
import Link from "next/link";
import { Brand } from "@/types/brand";
import { Card } from "@/components/ui/card";

interface BrandCardProps {
  brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link href={`/brands/${brand._id}`}>
      <Card className="group relative flex flex-col items-center justify-center overflow-hidden transition-all hover:shadow-md hover:border-primary h-32 md:h-40 bg-white dark:bg-card">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <span className="sr-only">{brand.name}</span>
      </Card>
    </Link>
  );
}
