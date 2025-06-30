import CouponTable from '@/components/modules/shop/manage-coupon/CouponTable';
import CreateCouponModal from '@/components/modules/shop/manage-coupon/CreateCouponModal';
import { getAllCoupons } from '@/services/Coupon';
import { ICoupon } from '@/types';

export default async function ManageCouponPage() {
  const result = await getAllCoupons();
  const coupons = result?.data?.result as ICoupon[];
  const meta = result?.data?.meta || {
    page: 1,
    limit: 10,
    total: 100,
    totalPage: 10,
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">Manage Coupon</h1>
        <CreateCouponModal />
      </div>
      <div>
        <CouponTable coupons={coupons || []} meta={meta} />
      </div>
    </div>
  );
}
