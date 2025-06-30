'use server';

import { getValidToken } from '@/lib/verifyToken';
import { FieldValues } from 'react-hook-form';

// addSubscriber
export const addSubscriber = async (data: FieldValues): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subscriber`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// getAllSubscribers
export const getAllSubscribers = async (
  page?: string,
  limit?: string
): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/subscriber?limit=${limit}&page=${page}`,
      {
        method: 'GET',
        headers: {
          Authorization: token,
        },
        next: {
          tags: ['SUBSCRIBERS'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
