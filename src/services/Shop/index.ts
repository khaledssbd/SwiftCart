'use server';

import { getValidToken } from '@/lib/verifyToken';
import { revalidateTag } from 'next/cache';

// createShop
export const createShop = async (data: FormData): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/shop`, {
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: data,
    });

    revalidateTag('USERS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
