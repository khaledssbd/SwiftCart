'use client';

import ProductCard from '@/components/ui/core/ProductCard';
import FilterSidebar from './filterSidebar';
import { IProduct } from '@/types';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

export const AllProducts = ({ products }: { products: IProduct[] }) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="relative">
      {/* Mobile Filter Toggle Button - Only shows on tablet/mobile */}
      {!isDesktop && (
        <div className="sticky top-20 z-10 my-4 flex justify-end lg:hidden">
          <Button
            variant="outline"
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-10">
        {/* Desktop Sidebar - Always visible on desktop */}
        {isDesktop && (
          <div className="lg:col-span-3 xl:col-span-2">
            <FilterSidebar />
          </div>
        )}

        {/* Mobile Filter Sidebar - Sheet component */}
        <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
          <SheetContent side="left" className="w-[300px] sm:w-[350px]">
            <SheetHeader>
              <SheetTitle className="flex justify-between items-center">
                {/* Filters
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button> */}
              </SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <FilterSidebar />
            </div>
          </SheetContent>
        </Sheet>

        {/* Products Grid - Adjusts based on sidebar visibility */}
        <div
          className={`${
            isDesktop ? 'lg:col-span-9 xl:col-span-10' : 'col-span-12'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products?.map((product: IProduct, idx: number) => (
              <ProductCard key={idx} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
