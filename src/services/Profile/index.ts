'use server';

import { getValidToken } from '@/lib/verifyToken';
import { revalidateTag } from 'next/cache';

// getProfile
export const getProfile = async (): Promise<any> => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/me`, {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['USERS'],
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// updateProfile
export const updateProfile = async (formData: FormData): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/update-profile`,
      {
        method: 'PATCH',
        headers: {
          Authorization: token,
        },
        body: formData,
      }
    );

    revalidateTag('USERS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
