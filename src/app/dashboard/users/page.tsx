'use client';

import { Table, Select, Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../../services/api/users';
import { API_KEY } from '@/settings/apiKeys';
import CreateEditUserModal from '@/modules/users/CreateUserModal';
import { UserRoleOptions } from '@/libs/data/user-management';
import { UserFormValues } from '@/modules/users/users.schema';
import { EditOutlined, UserAddOutlined } from '@ant-design/icons';
import PermissionGuard from '@/components/auth/PermissionGuard';
import { PERMISSIONS } from '@/libs/auth/permissions';
import { useAuth } from '@/contexts/AuthContext';
import { hasPermission } from '@/libs/auth/hasPermission';
import { useDebounce } from '@/hooks/useDebounce';
import { useRouter, useSearchParams } from 'next/navigation';

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [role, setRole] = useState<string | undefined>();
  const [search, setSearch] = useState('');
  const [modalState, setModalState] = useState<{
    data: UserFormValues | null;
    mode: 'Create' | 'Edit';
  } | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const params = new URLSearchParams();

    if (page) params.set('page', String(page));
    if (role) params.set('role', role);
    if (debouncedSearch) params.set('search', debouncedSearch);

    router.replace(`?${params.toString()}`);
  }, [page, role, debouncedSearch]);

  useEffect(() => {
    const pageParam = searchParams.get('page');
    const roleParam = searchParams.get('role');
    const searchParam = searchParams.get('search');

    if (pageParam) setPage(Number(pageParam));
    if (roleParam) setRole(roleParam);
    if (searchParam) setSearch(searchParam);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, role]);

  const { role: currentRole } = useAuth();
  const canEditUser = hasPermission(currentRole, PERMISSIONS.USER_EDIT);

  const { data, isLoading, isError } = useQuery({
    queryKey: [API_KEY.USER_LIST, page, role, debouncedSearch],
    queryFn: () => fetchUsers(page, 10, role, debouncedSearch),
    placeholderData: keepPreviousData,
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 480,
      render: (value: string) => <span>{value}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 480,
      render: (value: string) => <span>{value}</span>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render: (value: string) => <span>{value}</span>,
    },
    ...(canEditUser
      ? [
          {
            title: 'Action',
            align: 'center' as const,
            width: 124,
            render: (_: any, record: UserFormValues) => (
              <Button
                onClick={() =>
                  setModalState({
                    data: record,
                    mode: 'Edit',
                  })
                }
                icon={<EditOutlined />}
              >
                Edit
              </Button>
            ),
          },
        ]
      : []),
  ];

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Users</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-row items-center gap-2">
          <Input.Search
            placeholder="Search by name or email"
            className="w-72"
            allowClear
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            allowClear
            placeholder="Filter by role"
            className="w-48"
            onChange={setRole}
            options={UserRoleOptions}
          />
        </div>

        <PermissionGuard permission={PERMISSIONS.USER_CREATE}>
          <Button
            type="primary"
            onClick={() =>
              setModalState({
                data: null,
                mode: 'Create',
              })
            }
            icon={<UserAddOutlined className="text-lg" />}
          >
            Add User
          </Button>
        </PermissionGuard>
      </div>

      <Table
        rowKey="id"
        loading={{
          spinning: isLoading,
          tip: 'Loading users...',
        }}
        dataSource={data?.data}
        pagination={{
          current: page,
          pageSize: 10,
          total: data?.total,
          onChange: setPage,
        }}
        locale={{
          emptyText: (
            <div className="py-10 text-center text-gray-500">
              No users found
            </div>
          ),
        }}
        columns={columns}
      />
      <CreateEditUserModal
        open={!!modalState}
        onClose={() => setModalState(null)}
        initialValues={modalState?.data as UserFormValues}
        isEditing={modalState?.mode === 'Edit'}
      />
    </div>
  );
}
