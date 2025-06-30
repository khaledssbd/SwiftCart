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

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
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

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
