'use client';

import { Table, Select, Button, Input } from 'antd';
import { useEffect, useRef, useState } from 'react';
import CreateEditUserModal from '@/modules/users/CreateUserModal';
import { UserRoleOptions } from '@/libs/data/user-management';
import { UserFormValues } from '@/modules/users/users.schema';
import { EditOutlined, UserAddOutlined } from '@ant-design/icons';
import PermissionGuard from '@/components/auth/PermissionGuard';
import { Permission, PERMISSIONS } from '@/libs/auth/permissions';
import { useAuth } from '@/contexts/AuthContext';
import { hasPermission } from '@/libs/auth/hasPermission';
import { useDebounce } from '@/hooks/useDebounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUsersQuery } from '@/hooks/user/useUsersQuery';
import { USER_COLUMNS } from '@/modules/users/users.columns';

export default function UsersPage() {
  const [modalState, setModalState] = useState<{
    data: UserFormValues | null;
    mode: 'Create' | 'Edit';
  } | null>(null);

  const isMounted = useRef(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    data,
    isLoading,
    page,
    setPage,
    role,
    setRole,
    search,
    setSearch,
    setSortBy,
    setSortOrder,
  } = useUsersQuery();

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const params = new URLSearchParams();
    if (page !== 1) params.set('page', String(page));
    if (role) params.set('role', role);
    if (debouncedSearch) params.set('search', debouncedSearch);

    router.replace(`?${params.toString()}`);
  }, [page, role, debouncedSearch]);

  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1);
    setRole(searchParams.get('role') || undefined);
    setSearch(searchParams.get('search') || '');
  }, []);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, role]);

  const { role: currentRole } = useAuth();

  const columns = USER_COLUMNS.filter(
    (col) =>
      !col.permission ||
      hasPermission(currentRole, col.permission as Permission),
  ).map((col) => {
    if (col.key === 'action') {
      return {
        title: col.title,
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
      };
    }

    return {
      title: col.title,
      dataIndex: col.dataIndex,
      width: col.width,
      sorter: col.sortable,
      render: (value: any) => <span>{value}</span>,
    };
  });

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
        onChange={(_, __, sorter: any) => {
          if (!sorter.order) {
            setSortBy(undefined);
            setSortOrder(undefined);
            return;
          }

          setSortBy(sorter.field);
          setSortOrder(sorter.order === 'ascend' ? 'asc' : 'desc');
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
