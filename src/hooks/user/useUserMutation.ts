import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

import { API_KEY } from '@/settings/apiKeys';
import { createUser, updateUser } from '@/services/api/user';
import { UserFormValues } from '@/modules/users/users.schema';

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation<unknown, any, UserFormValues>({
    mutationFn: createUser,

    onSuccess: () => {
      message.success('User created successfully');
      queryClient.invalidateQueries({
        queryKey: [API_KEY.USER_LIST],
      });
    },

    onError: (error: any) => {
      message.error(error.message || 'Create user failed');
    },
  });
}

export function useUpdateUser(userId?: string) {
  const queryClient = useQueryClient();

  return useMutation<unknown, any, UserFormValues>({
    mutationFn: (payload) => updateUser(userId as string, payload),

    onSuccess: () => {
      message.success('User updated successfully');
      queryClient.invalidateQueries({
        queryKey: [API_KEY.USER_LIST],
      });
    },

    onError: (error: any) => {
      message.error(error.message || 'Update user failed');
    },
  });
}
