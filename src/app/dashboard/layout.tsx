'use client';

import { Layout } from 'antd';
import Sidebar from '@/components/layout/Sidebar';
import HeaderBar from '@/components/layout/HeaderBar';

const { Content } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout className="min-h-screen!">
      <Sidebar />
      <Layout>
        <HeaderBar />
        <Content className="m-4 p-4 bg-white rounded-lg">{children}</Content>
      </Layout>
    </Layout>
  );
}
