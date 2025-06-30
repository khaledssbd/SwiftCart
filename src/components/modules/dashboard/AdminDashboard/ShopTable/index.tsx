'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { SCTable } from '@/components/ui/core/SCTable';
import Image from 'next/image';
import { deleteShop } from '@/services/Shop';

export type TShop = {
  _id: string;
  shopName: string;
  businessLicenseNumber: string;
  address: string;
  contactNumber: string;
  website: string;
  user: {
    name: string;
    email: string;
  };
  ratings: number;
  establishedYear: number;
  taxIdentificationNumber: string;
  logo: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

const ShopTable = ({ shops }: { shops: TShop[] }) => {
  const handleDelete = async (shopId: string) => {
    try {
      await deleteShop(shopId);
    } catch (error) {
      console.error('Failed to delete shop:', error);
    }
  };

  const columns: ColumnDef<TShop>[] = [
    {
      accessorKey: 'shopName',
      header: 'Shop',
      cell: ({ row }) => (
        <div className="flex items-center gap-3 ">
          {row.original.logo ? (
            <Image
              height={40}
              width={40}
              src={row.original.logo}
              alt={row.original.shopName}
              className="rounded-full w-10 h-10 object-cover"
            />
          ) : (
            <div className="rounded-full w-10 h-10 bg-gray-200 flex items-center justify-center">
              {row.original.shopName.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-medium">{row.original.shopName}</p>
            <p className="text-sm text-gray-500">
              {row.original.address.split(' ').slice(0, 2).join(' ')}
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'user',
      header: 'Owner',
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.user?.name || 'N/A'}</p>
          <p className="text-sm text-gray-500">
            {row.original.user?.email || 'N/A'}
          </p>
        </div>
      ),
    },
    {
      accessorKey: 'contactNumber',
      header: 'Contact',
      cell: ({ row }) => (
        <p className="text-sm">{row.original.contactNumber}</p>
      ),
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={row.original.isActive ? 'default' : 'destructive'}>
          {row.original.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const shop = row.original;

        return (
          <div className="flex gap-2 ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 ">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleDelete(shop._id)}
                  className="text-red-600 focus:text-red-600"
                >
                  Delete Shop
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return <SCTable columns={columns} data={shops} />;
};

export default ShopTable;
