import { Button } from '@/components/ui/button';
import SCContainer from '@/components/ui/core/SCContainer';
import ProductCard from '@/components/ui/core/ProductCard';
import { IProduct } from '@/types';
import Link from 'next/link';

const FeaturedProducts = async ({
  products = [],
}: {
  products: IProduct[];
}) => {
  return (
    <div className=" bg-white bg-opacity-50 pt-6 pb-8">
      <SCContainer className="my-16">
        <div className="flex items-center justify-between ">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Featured Products
          </h2>
          <Link href="/products">
            <Button
              variant="outline"
              className="rounded-full border-primary bg-primary text-secondary hover:bg-secondary/10 hover:text-primary"
            >
              All Collections
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
          {products?.slice(0, 5).map((product: IProduct, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </SCContainer>
    </div>
  );
};

export default FeaturedProducts;
