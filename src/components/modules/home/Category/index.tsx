import { Button } from '@/components/ui/button';
import { ICategory } from '@/types';
import Link from 'next/link';
import CategoryCard from './CategoryCard';
import SCContainer from '@/components/ui/core/SCContainer';

const Category = async ({ categories = [] }: { categories: ICategory[] }) => {
  return (
    <SCContainer className="my-8 md:my-16 lg:my-24 px-4 sm:px-6">
      {' '}
      {/* Added horizontal padding */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex-1 min-w-0">
          {' '}
          {/* Added min-width constraint */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 break-words">
            {' '}
            {/* Added word break */}
            Browse Categories
          </h2>
          <p className="text-gray-500 mt-2 break-words">
            {' '}
            {/* Added word break */}
            Explore our wide range of product categories
          </p>
        </div>
        <Link href="/products" className="flex-shrink-0 mt-4 md:mt-0">
          {' '}
          {/* Prevent shrinking */}
          <Button
            variant="outline"
            className="rounded-full border-primary bg-primary text-secondary hover:bg-secondary/10 hover:text-primary w-full md:w-auto"
          >
            View All Categories →
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {' '}
        {/* Reduced gaps on mobile */}
        {categories?.slice(0, 6).map((category: ICategory, idx: number) => (
          <CategoryCard key={idx} category={category} />
        ))}
      </div>
    </SCContainer>
  );
};

export default Category;
