'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SCContainer from '@/components/ui/core/SCContainer';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface Product {
  imageUrls: string[];
  name: string;
  orderCount: number;
  price: number;
  productId: string;
}

const Trending = ({
  trendingProducts = [],
}: {
  trendingProducts: Product[];
}) => {
  return (
    <SCContainer className="my-8 md:my-16 lg:my-24 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex-1 min-w-0">
          {' '}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 break-words">
            {' '}
            Trendings Products
          </h2>
          <p className="text-gray-500 mt-2 break-words">
            {' '}
            Explore our wide range of trending products
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
        {trendingProducts.map((product: Product) => (
          <Card
            key={product.productId}
            className="overflow-hidden rounded-lg  shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative  aspect-square">
              <Image
                src={product.imageUrls[0]}
                alt={product.name}
                fill
                className="object-cover p-3 rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div className="p-4 space-y-2">
              <div>
                <h3 className="text-lg font-semibold tracking-tight line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-2xl font-bold">
                    $ {product.price.toLocaleString()}
                  </p>
                  <span className="text-sm text-muted-foreground">
                    {product.orderCount} orders
                  </span>
                </div>
              </div>

              <div>
                <Link href={`/products/${product.productId}`}>
                  <Button className="w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </SCContainer>
  );
};

export default Trending;
