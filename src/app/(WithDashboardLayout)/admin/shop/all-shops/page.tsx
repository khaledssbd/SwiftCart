import ShopTable from '@/components/modules/dashboard/AdminDashboard/ShopTable';
import { getAllShops } from '@/services/Shop';

export default async function ShopsPage() {
  const { data: shops } = await getAllShops();

  return (
    <div className="space-y-6  bg-white min- rounded-xl min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl p-4 font-bold">Shops Management</h1>
      </div>

      <ShopTable shops={shops} />
    </div>
  );
}

export const dynamic = 'force-dynamic';
