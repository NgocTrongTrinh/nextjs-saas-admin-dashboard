'use client';

import { Table, Select, Button } from 'antd';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../../services/api/users';
import { API_KEY } from '@/settings/apiKeys';
import CreateEditUserModal from '@/modules/users/CreateUserModal';
import { UserRoleOptions } from '@/libs/data/user-management';
import { UserFormValues } from '@/modules/users/users.schema';
import { EditOutlined, UserAddOutlined } from '@ant-design/icons';

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [role, setRole] = useState<string | undefined>();
  const [modalState, setModalState] = useState<{
    data: UserFormValues | null;
    mode: 'Create' | 'Edit';
  } | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.USER_LIST, page, role],
    queryFn: () => fetchUsers(page, 10, role),
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
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center' as const,
      with: 124,
      render: (_: any, record: UserFormValues) => (
        <div className="flex justify-center">
          <Button
            className="rounded w-25.25 h-10.5"
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
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-row items-center gap-12">
          <h1 className="text-xl font-semibold">Users</h1>
          <Select
            allowClear
            placeholder="Filter by role"
            className="w-48"
            onChange={setRole}
            options={UserRoleOptions}
          />
        </div>

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
      </div>

      <Table
        rowKey="id"
        loading={isLoading}
        dataSource={data?.data}
        pagination={{
          current: page,
          pageSize: 10,
          total: data?.total,
          onChange: setPage,
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
