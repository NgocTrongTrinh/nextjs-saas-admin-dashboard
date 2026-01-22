import http from '@/libs/http/http';
import { UserFormValues } from '@/modules/users/users.schema';

export const fetchUsers = (page: number, limit: number, role?: string) =>
  http.get<{
    data: UserFormValues[];
    total: number;
  }>('/users', { page, limit, role });

export const createUser = (payload: UserFormValues) =>
  http.post<UserFormValues>('/users', payload);

export const updateUser = (id: string, payload: UserFormValues) =>
  http.put<UserFormValues>(`/users/${id}`, payload);
