'use client';

import { Button, Card } from 'antd';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth.store';

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const handleLogin = () => {
    login();
    document.cookie = 'isAuth=true; path=/';
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card title="Login" className="w-90">
        <Button type="primary" block onClick={handleLogin}>
          Mock Login
        </Button>
      </Card>
    </div>
  );
}
