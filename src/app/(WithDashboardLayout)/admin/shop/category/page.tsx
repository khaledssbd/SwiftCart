import ManageCategories from '@/components/modules/dashboard/AdminDashboard/ManageCategories';
import { getAllCategories } from '@/services/Category';

const ProductCategoryPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data: categories, meta } = await getAllCategories(page, '10');
  return (
    <div>
      <ManageCategories categories={categories} meta={meta} page={page} />
    </div>
  );
};

export default ProductCategoryPage;
