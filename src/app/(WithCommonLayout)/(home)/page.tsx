import FeaturedProducts from '@/components/modules/home/FeaturedProducts';
import FlashSale from '@/components/modules/home/FlashSale';
import Category from './_components/_category/CategoryModule';
import TopBrands from './_components/_brand/BrandModule';
import { HeroSection } from '@/components/modules/home/HeroSection';
import { Subscribe } from '@/components/modules/Newsletter';
import Tawk from './_components/_Tawk/Tawk';
import Testimonials from '@/components/modules/Testimonials';
import Trending from './_components/_Trending/Trending';
import { getAllCategories } from '@/services/Category';
import { getAllProducts, getTrendingProducts } from '@/services/Product';
import { getFlashSaleProducts } from '@/services/FlashSale';
import { getAllBrands } from '@/services/Brand';

const HomePage = async () => {
  // const { data: categories } = await getAllCategories();
  // const { data: products } = await getAllProducts();
  // const { data: trendingProducts } = await getTrendingProducts(8);
  // const { data: flashSaleProducts } = await getFlashSaleProducts();
  // const { data: brands } = await getAllBrands();

  const [
    { data: categories },
    { data: products },
    { data: trendingProducts },
    { data: flashSaleProducts },
    { data: brands },
  ] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
    getTrendingProducts(8),
    getFlashSaleProducts(),
    getAllBrands(),
  ]);

  return (
    <div>
      <HeroSection />
      <Category categories={categories} />
      <FeaturedProducts products={products} />
      {trendingProducts.length > 0 && (
        <Trending trendingProducts={trendingProducts} />
      )}
      <FlashSale flashSaleProducts={flashSaleProducts} />
      <TopBrands brands={brands} />
      <Testimonials />
      <Subscribe />
      <Tawk />
    </div>
  );
};

export default HomePage;
