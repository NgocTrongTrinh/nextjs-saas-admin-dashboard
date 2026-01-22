'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Permission } from '@/libs/auth/permissions';
import { hasPermission } from '@/libs/auth/hasPermission';

type Props = {
  permission: Permission;
  children: ReactNode;
};

export default function PermissionGuard({ permission, children }: Props) {
  const { role } = useAuth();

  if (!hasPermission(role, permission)) return null;

  return <>{children}</>;
}
