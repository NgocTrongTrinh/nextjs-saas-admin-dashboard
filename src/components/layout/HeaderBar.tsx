'use client';

import { Layout, Dropdown, Avatar } from 'antd';
import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth.store';

const { Header } = Layout;

export default function HeaderBar() {
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const role = useAuthStore((s) => s.role);
  const setRole = useAuthStore((s) => s.setRole);

  const handleLogout = () => {
    document.cookie = 'isAuth=; Max-Age=0; path=/';
    logout();
    router.push('/login');
  };
  return (
    <Header className="bg-white px-4 flex justify-end items-center gap-6">
      <Dropdown
        menu={{
          items: [
            { key: 'admin', label: 'Admin' },
            { key: 'manager', label: 'Manager' },
            { key: 'staff', label: 'Staff' },
          ],
          onClick: ({ key }) => setRole(key as any),
        }}
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar icon={<UserSwitchOutlined />} />
          <span className="text-sm text-white">Select Role</span>
        </div>
      </Dropdown>

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
          <span className="text-sm capitalize text-white">{role}</span>
        </div>
      </Dropdown>
    </Header>
  );
}
