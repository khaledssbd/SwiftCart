'use server';

import { getValidToken } from '@/lib/verifyToken';
import { revalidateTag } from 'next/cache';

// get all products
export const getAllProducts = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
): Promise<any> => {
  const params = new URLSearchParams();
  if (query?.searchTerm) {
    params.append('searchTerm', query.searchTerm.toString());
  }
  if (query?.price) {
    params.append('minPrice', '0');
    params.append('maxPrice', query?.price.toString());
  }
  if (query?.category) {
    params.append('categories', query?.category.toString());
  }
  if (query?.brand) {
    params.append('brands', query?.brand.toString());
  }
  if (query?.rating) {
    params.append('ratings', query?.rating.toString());
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product?limit=${limit}&page=${page}&${params}`,
      {
        next: {
          tags: ['PRODUCTS'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// get single product
export const getSingleProduct = async (productId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
      {
        next: {
          tags: ['PRODUCTS'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// add product
export const addProduct = async (productData: FormData): Promise<any> => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product`, {
      method: 'POST',
      body: productData,
      headers: {
        Authorization: token,
      },
    });

    revalidateTag('PRODUCTS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// update Product
export const updateProduct = async (
  productData: FormData,
  productId: string
): Promise<any> => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
      {
        method: 'PATCH',
        body: productData,
        headers: {
          Authorization: token,
        },
      }
    );

    revalidateTag('PRODUCTS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// delete Product
export const deleteProduct = async (productId: string): Promise<any> => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      }
    );

    revalidateTag('PRODUCTS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// get Trending Products
export const getTrendingProducts = async (limit: number): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/trending?limit=${limit}`,
      {
        next: {
          tags: ['PRODUCTS'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
