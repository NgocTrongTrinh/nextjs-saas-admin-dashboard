'use client';

import { Table, Button, Select } from 'antd';
import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { fetchRequests } from '@/services/api/requests';
import { API_KEY } from '@/settings/apiKeys';
import { useAuth } from '@/contexts/AuthContext';

export default function RequestsPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string | undefined>();

  const { role } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.REQUEST_LIST, page, status],
    queryFn: () => fetchRequests(page, 10, status),
    placeholderData: keepPreviousData,
  });

  const columns = [
    { title: 'Title', dataIndex: 'title' },
    { title: 'Priority', dataIndex: 'priority' },
    { title: 'Status', dataIndex: 'status' },
    { title: 'Created At', dataIndex: 'createdAt' },
  ];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Select
          allowClear
          placeholder="Filter by status"
          className="w-48"
          onChange={setStatus}
          options={[
            { label: 'Pending', value: 'pending' },
            { label: 'Approved', value: 'approved' },
            { label: 'Completed', value: 'completed' },
          ]}
        />

        {role === 'staff' && <Button type="primary">Create Request</Button>}
      </div>

      <Table
        rowKey="id"
        loading={isLoading}
        dataSource={data?.data}
        columns={columns}
        pagination={{
          current: page,
          pageSize: 10,
          total: data?.total,
          onChange: setPage,
        }}
      />
    </div>
  );
}
