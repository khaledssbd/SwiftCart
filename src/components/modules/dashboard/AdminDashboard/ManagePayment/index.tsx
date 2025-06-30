'use client';

import { SCTable } from '@/components/ui/core/SCTable';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { IPayment, IMeta } from '@/types';
import TablePagination from '@/components/ui/core/SCTable/TablePagination';

import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { updatePaymentStatus } from '@/services/Payment';

const ManagePayments = ({
  payments,
  meta,
  page,
}: {
  payments: IPayment[];
  meta: IMeta;
  page: string;
}) => {
  const router = useRouter();

  const handleStatusChange = async (paymentId: string, newStatus: string) => {
    try {
      const res = await updatePaymentStatus(paymentId, newStatus);
      if (res.success) {
        toast.success('Payment status updated successfully');
        router.refresh(); // Refresh the data
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update payment status');
    }
  };

  const columns: ColumnDef<IPayment>[] = [
    {
      accessorKey: 'user',
      header: () => <div className="font-semibold">Customer</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 overflow-hidden rounded-full bg-gray-100 border">
            {row.original.user?.profilePhoto && (
              <Image
                src={row.original.user.profilePhoto}
                alt={row.original.user.name}
                height={30}
                width={30}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div>
            <p className="font-medium text-gray-800">
              {row.original.user?.name}
            </p>
            <p className="text-sm text-gray-500">{row.original.user?.email}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'order',
      header: () => <div className="font-semibold">Order Details</div>,
      cell: ({ row }) => (
        <div>
          <p className="font-medium">
            {row.original.order?.products?.length} items
          </p>
          <p className="text-sm text-gray-500">
            Order ID: {row.original.order?._id.substring(0, 8)}...
          </p>
        </div>
      ),
    },
    {
      accessorKey: 'shop',
      header: () => <div className="font-semibold">Shop</div>,
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.shop?.shopName}</p>
          <p className="text-sm text-gray-500">
            {row.original.shop?.contactNumber}
          </p>
        </div>
      ),
    },
    {
      accessorKey: 'amount',
      header: () => <div className="font-semibold">Amount</div>,
      cell: ({ row }) => (
        <div className="font-medium">
          {row.original.amount?.toLocaleString()} BDT
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: () => <div className="font-semibold">Status</div>,
      cell: ({ row }) => {
        const currentStatus = row.original.status;

        return (
          <Select
            value={currentStatus}
            onValueChange={value => handleStatusChange(row.original._id, value)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {/* Current status always shown */}
              <SelectItem value={currentStatus}>
                <Badge
                  variant={
                    currentStatus === 'Paid'
                      ? 'default'
                      : currentStatus === 'Failed'
                      ? 'destructive'
                      : 'secondary'
                  }
                >
                  {currentStatus}
                </Badge>
              </SelectItem>

              {/* Conditional options */}
              {currentStatus === 'Pending' && (
                <>
                  <SelectItem value="Paid">
                    <Badge variant="default">Paid</Badge>
                  </SelectItem>
                  <SelectItem value="Failed">
                    <Badge variant="destructive">Failed</Badge>
                  </SelectItem>
                </>
              )}

              {currentStatus === 'Paid' && (
                <SelectItem value="Failed">
                  <Badge variant="destructive">Failed</Badge>
                </SelectItem>
              )}

              {currentStatus === 'Failed' && (
                <SelectItem value="Paid">
                  <Badge variant="default">Paid</Badge>
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: () => <div className="font-semibold">Date</div>,
      cell: ({ row }) => (
        <div className="text-sm text-gray-500">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Payment History ({meta?.total})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <SCTable columns={columns} data={payments || []} />
            <TablePagination page={Number(page)} totalPage={meta?.totalPage} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagePayments;
