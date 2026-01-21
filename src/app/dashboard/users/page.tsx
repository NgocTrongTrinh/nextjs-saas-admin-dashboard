'use client';

import { Table, Select } from 'antd';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../../services/api/users';
import { API_KEY } from '@/settings/apiKeys';

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [role, setRole] = useState<string | undefined>();

  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.USER_LIST, page, role],
    queryFn: () => fetchUsers(page, 10, role),
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Users</h1>

        <Select
          allowClear
          placeholder="Filter by role"
          className="w-48"
          onChange={setRole}
          options={[
            { label: 'Admin', value: 'admin' },
            { label: 'Manager', value: 'manager' },
            { label: 'Staff', value: 'staff' },
          ]}
        />
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
        columns={[
          { title: 'Name', dataIndex: 'name' },
          { title: 'Email', dataIndex: 'email' },
          { title: 'Role', dataIndex: 'role' },
        ]}
      />
    </div>
  );
}
