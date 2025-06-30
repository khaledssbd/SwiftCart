'use client';

import { ICategory, IMeta } from '@/types';
import CreateCategoryModal from './CreateCategoryModal';
import { SCTable } from '@/components/ui/core/SCTable';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import DeleteConfirmationModal from '@/components/ui/core/SCModal/DeleteConfirmationModal';
import { toast } from 'sonner';
import { deleteCategory } from '@/services/Category';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import TablePagination from '@/components/ui/core/SCTable/TablePagination';

type TCategoriesProps = {
  categories: ICategory[];
  meta: IMeta;
  page: string;
};

const ManageCategories = ({ categories, meta, page }: TCategoriesProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: ICategory) => {
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteCategory(selectedId);
        if (res.success) {
          toast.success(res.message);
          setModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const columns: ColumnDef<ICategory>[] = [
    {
      accessorKey: 'name',
      header: () => <div className="font-semibold">Category Name</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 overflow-hidden rounded-full bg-gray-100 border">
            <Image
              src={row.original.icon}
              alt={row.original.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="font-medium text-gray-800">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: 'isActive',
      header: () => <div className="font-semibold">Status</div>,
      cell: ({ row }) => (
        <div>
          <Badge
            variant={row.original.isActive ? 'default' : 'destructive'}
            className="px-3 py-1 rounded-full"
          >
            {row.original.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: 'action',
      header: () => <div className="font-semibold">Actions</div>,
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full"
          title="Delete"
          onClick={() => handleDelete(row.original)}
        >
          <Trash className="w-4 h-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Manage Categories ({meta?.total})
            </CardTitle>
            <CreateCategoryModal />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <SCTable columns={columns} data={categories || []} />
            <TablePagination page={Number(page)} totalPage={meta?.totalPage} />
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ManageCategories;
