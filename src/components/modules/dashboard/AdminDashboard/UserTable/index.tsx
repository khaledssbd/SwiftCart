// app/dashboard/users/UserTable.tsx
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

type User = {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  isActive: boolean;
};

interface UserTableProps {
  users: User[];
  // loading: boolean;
  onStatusUpdate: (userId: string, isActive: boolean) => void;
}

const UserTable = ({ users, onStatusUpdate }: UserTableProps) => {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: 'User',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="rounded-full w-10 h-10 bg-gray-200 flex items-center justify-center">
            {row.original.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-sm text-gray-500">{row.original.email}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <Badge
          variant={row.original.role === 'admin' ? 'default' : 'outline'}
          className="capitalize"
        >
          {row.original.role}
        </Badge>
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
        const user = row.original;

        // Don't show actions for admin users
        if (user.role === 'admin') {
          return null;
        }

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => onStatusUpdate(user._id, true)}
                disabled={user.isActive}
              >
                Activate
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onStatusUpdate(user._id, false)}
                disabled={!user.isActive}
              >
                Deactivate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return <SCTable columns={columns} data={users} />;
};

export default UserTable;
