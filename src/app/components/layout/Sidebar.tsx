'use client';

import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

const { Sider } = Layout;

export default function Sidebar() {
  return (
    <Sider width={220} className="bg-slate-900!">
      <div className="h-16 flex items-center justify-center text-white font-semibold">
        Admin Dashboard
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['dashboard']}
        items={[
          {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: <Link href="/dashboard">Dashboard</Link>,
          },
          {
            key: 'users',
            icon: <UserOutlined />,
            label: <Link href="/dashboard/users">Users</Link>,
          },
          {
            key: 'roles',
            icon: <TeamOutlined />,
            label: <Link href="/dashboard/roles">Roles</Link>,
          },
          {
            key: 'requests',
            icon: <FileTextOutlined />,
            label: <Link href="/dashboard/requests">Requests</Link>,
          },
        ]}
      />
    </Sider>
  );
}
