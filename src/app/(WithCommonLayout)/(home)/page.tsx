import FeaturedProducts from '@/components/modules/home/FeaturedProducts';
import FlashSale from '@/components/modules/home/FlashSale';
import { HeroSection } from '@/components/modules/home/HeroSection';
import { Subscribe } from '@/components/modules/Newsletter';
import Testimonials from '@/components/modules/Testimonials';
import { getAllCategories } from '@/services/Category';
import { getAllProducts, getTrendingProducts } from '@/services/Product';
import { getFlashSaleProducts } from '@/services/FlashSale';
import { getAllBrands } from '@/services/Brand';
import TopBrands from '@/components/modules/home/TopBrands';
import Category from '@/components/modules/home/Category';
import Trending from '@/components/modules/home/Trending';
import Tawk from '@/components/modules/home/Tawk';

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
