import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types/category";
import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category._id}`}>
      <Card className="group relative overflow-hidden h-40 md:h-48 border-none transition-all hover:shadow-lg p-0">
        <Image
          src={category.image}
          alt={category.name}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <h3 className="text-xl md:text-2xl font-bold text-white text-center drop-shadow-md">
            {category.name}
          </h3>
        </div>
      </Card>
    </Link>
  );
}
