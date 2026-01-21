'use client';

import { Layout, Dropdown, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth.store';

const { Header } = Layout;

export default function HeaderBar() {
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'isAuth=; Max-Age=0; path=/';
    logout();
    router.push('/login');
  };
  return (
    <Header className="bg-white px-4 flex justify-end items-center">
      <Dropdown
        menu={{
          items: [
            { key: 'profile', label: 'Profile' },
            { key: 'logout', label: 'Logout', onClick: handleLogout },
          ],
        }}
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar icon={<UserOutlined />} />
          <span className="text-sm">Admin</span>
        </div>
      </Dropdown>
    </Header>
  );
}
