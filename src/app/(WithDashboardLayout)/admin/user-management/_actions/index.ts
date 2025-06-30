'use server';

import { getValidToken } from '@/lib/verifyToken';

// getAllUsers
export const getAllUsers = async (): Promise<any> => {
  try {
    const token = await getValidToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
      next: {
        tags: ['USERS'],
      },
      headers: {
        Authorization: token,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.statusText}`);
    }

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error('Error fetching users:', error.message);
    throw error; // Re-throw to let calling code handle it
  }
};

// updateUserStatus
export const updateUserStatus = async (
  userId: string,
  status: string
): Promise<any> => {
  try {
    const token = await getValidToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/${userId}/status`,
      {
        method: 'PATCH',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to update user status: ${res.statusText}`);
    }

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error('Error updating user status:', error.message);
    throw error;
  }
};
