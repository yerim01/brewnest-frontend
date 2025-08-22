"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCategoriesByGroupSlug, Product } from "@/lib/api/products";
import { Skeleton } from "@/components/ui/skeleton";
import CategoryHeader from "@/app/(store)/_components/category-header";
import { Lora } from "next/font/google";

const lora = Lora({
  weight: "400",
  subsets: ["latin"],
});

export default function CategoryPage() {
  const { categoryId } = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    const fetchProducts = async () => {
      try {
        const data = await getCategoriesByGroupSlug(categoryId as string);
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div className="bg-white">
      {/* Header */}
      <CategoryHeader categoryId={categoryId as string} />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-medium tracking-tight text-gray-900 capitalize">
          {categoryId}
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="group relative">
                  <Skeleton className="aspect-square w-full rounded-md lg:aspect-auto lg:h-80" />
                  <div className="mt-4 flex justify-between">
                    <div className="w-full">
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
              ))
            : products.map((product) => (
                <div key={product.id} className="group relative">
                  <img
                    alt="product_img"
                    src={product.image}
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                  />
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700 font-bold">
                        <a href="#">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.variants[0].weight_grams}g
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${product.variants[0].price}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
