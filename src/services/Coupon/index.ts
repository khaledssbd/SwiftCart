'use server';

import { getValidToken } from '@/lib/verifyToken';
import { revalidateTag } from 'next/cache';
import { FieldValues } from 'react-hook-form';

// create Coupon
export const createCoupon = async (data: FieldValues): Promise<any> => {
  try {
    const token = await getValidToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/coupon`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    revalidateTag('COUPONS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

//get All Coupons
export const getAllCoupons = async (): Promise<any> => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/coupon`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['COUPONS'],
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// delete Coupon
export const deleteCoupon = async (couponId: string): Promise<any> => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/coupon/${couponId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      }
    );

    revalidateTag('COUPONS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// update Coupon
export const updateCoupon = async (
  couponId: string,
  data: FieldValues
): Promise<any> => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/coupon/${couponId}/update-coupon`,
      {
        method: 'PATCH',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    revalidateTag('COUPON');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
