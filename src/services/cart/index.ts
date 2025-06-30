'use server';

import { getValidToken } from '@/lib/verifyToken';
import { IOrder } from '@/types/cart';

// createOrder
export const createOrder = async (order: IOrder): Promise<any> => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// addCoupon
export const addCoupon = async (
  couponCode: string,
  subTotal: number,
  shopId: string
): Promise<any> => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/coupon/${couponCode}`,
      {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderAmount: subTotal, shopId }),
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
