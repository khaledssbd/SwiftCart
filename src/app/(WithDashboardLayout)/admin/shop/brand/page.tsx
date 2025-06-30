import ManageBrands from '@/components/modules/dashboard/AdminDashboard/ManageBrands';
import { getAllBrands } from '@/services/Brand';

const ProductBrandPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data: brands, meta } = await getAllBrands(page, '10');

  return (
    <div>
      <ManageBrands brands={brands} meta={meta} page={page} />
    </div>
  );
};

export default ProductBrandPage;
