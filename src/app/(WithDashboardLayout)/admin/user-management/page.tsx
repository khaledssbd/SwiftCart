/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getAllUsers, updateUserStatus } from '@/services/User';
import UserTable from '@/components/modules/dashboard/AdminDashboard/UserTable';

type User = {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  isActive: boolean;
};

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await getAllUsers();
        setUsers(data);
      } catch (error) {
        toast.error('Failed to fetch users!');
      }
    };

    fetchUsers();
  }, []);

  const handleStatusUpdate = async (userId: string, isActive: boolean) => {
    try {
      await updateUserStatus(userId, isActive ? 'active' : 'inactive');
      setUsers(
        users.map(user => (user._id === userId ? { ...user, isActive } : user))
      );
      toast.success(`User ${isActive ? 'activated' : 'deactivated'}`);
    } catch (error) {
      toast.error('Failed to update user status!');
    }
  };

  return (
    <div className="space-y-6 ">
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Manage Users</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <UserTable
              users={users}
              // loading={loading}
              onStatusUpdate={handleStatusUpdate}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersPage;
