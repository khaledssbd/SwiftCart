'use server';

import { getValidToken } from '@/lib/verifyToken';
import { revalidateTag } from 'next/cache';
export type DiscountType = 'percentage' | 'flat';

// create category
export const createCategory = async (data: FormData): Promise<any> => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: data,
    });

    revalidateTag('CATEGORIES');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// get all categories
export const getAllCategories = async (
  page?: string,
  limit?: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/category?limit=${limit}&page=${page}`,
      {
        next: {
          tags: ['CATEGORIES'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// delete category
export const deleteCategory = async (categoryId: string): Promise<any> => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/category/${categoryId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      }
    );

    revalidateTag('CATEGORIES');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
