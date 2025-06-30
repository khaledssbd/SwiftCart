'use server';

import { revalidateTag } from 'next/cache';
import { getValidToken } from '@/lib/verifyToken';

// getAllPayments for Admin
export const getAllPaymentsForAdmin = async (
  page?: string,
  limit?: string
): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment?limit=${limit}&page=${page}`,
      {
        method: 'GET',
        headers: {
          Authorization: token,
        },
        next: {
          tags: ['PAYMENTS'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// getUserPayments for User
export const getUserPaymentsForUser = async (
  page?: string,
  limit?: string
): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment/user?limit=${limit}&page=${page}`,
      {
        method: 'GET',
        headers: {
          Authorization: token,
        },
        next: {
          tags: ['PAYMENTS'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// validate Payment
export const validatePayment = async (tran_id: string): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment/validate?tran_id=${tran_id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: token,
        },
      }
    );

    revalidateTag('PAYMENTS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// updatePaymentStatus
export const updatePaymentStatus = async (
  paymentId: string,
  status: string
): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment/${paymentId}/status`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ status }),
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
