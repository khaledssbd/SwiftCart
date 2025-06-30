import { getAllPaymentsForAdmin } from '@/services/Payment';
import ManagePayments from '@/components/modules/dashboard/AdminDashboard/ManagePayment';

const PaymentPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data: payments, meta } = await getAllPaymentsForAdmin(page, '10');

  return (
    <div>
      <ManagePayments payments={payments} meta={meta} page={page} />
    </div>
  );
};

export default PaymentPage;
