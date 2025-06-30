import { getAllBrands } from '@/services/Brand';
import { getAllCategories } from '@/services/Category';
import { LayersIcon, StoreIcon, TagsIcon, UsersIcon } from 'lucide-react';
import { IBrand, ICategory, IShop, IUser } from '@/types';
import DashboardPage from '@/components/modules/dashboard/AdminDashboard';
import { getAllShops } from '@/services/Shop';
import { getAllUsers } from '@/services/User';

export default async function Dashboard() {
  const [usersRes, shopsRes, brandsRes, categoriesRes] = await Promise.all([
    getAllUsers(),
    getAllShops(),
    getAllBrands(),
    getAllCategories(),
  ]);

  const users: IUser[] = usersRes?.data || [];
  const shops: IShop[] = shopsRes?.data || [];
  const brands: IBrand[] = brandsRes?.data || [];
  const categories: ICategory[] = categoriesRes?.data || [];

  const stats = [
    {
      title: 'Users',
      value: users.length,
      change: '+5%',
      icon: <UsersIcon className="h-6 w-6 text-primary" />,
    },
    {
      title: 'Shops',
      value: shops.length,
      change: '+2%',
      icon: <StoreIcon className="h-6 w-6 text-primary" />,
    },
    {
      title: 'Brands',
      value: brands.length,
      change: '+3%',
      icon: <TagsIcon className="h-6 w-6 text-primary" />,
    },
    {
      title: 'Categories',
      value: categories.length,
      change: '+1%',
      icon: <LayersIcon className="h-6 w-6 text-primary" />,
    },
  ];

  const userGrowthData = [
    { month: 'Jan', users: 120 },
    { month: 'Feb', users: 200 },
    { month: 'Mar', users: 150 },
    { month: 'Apr', users: 300 },
    { month: 'May', users: 250 },
  ];

  const shopDistributionData = categories.map((category: ICategory) => ({
    name: category.name,
    value: shops.filter((shop: IShop) => shop.category === category._id).length,
  }));

  const brandPopularityData = brands.map((brand: IBrand) => ({
    name: brand.name,
    shops: shops.filter((shop: IShop) => shop.brand === brand._id).length,
  }));

  return (
    <div>
      <DashboardPage
        users={users}
        shops={shops}
        brands={brands}
        categories={categories}
        stats={stats}
        userGrowthData={userGrowthData}
        shopDistributionData={shopDistributionData}
        brandPopularityData={brandPopularityData}
      />
    </div>
  );
}
