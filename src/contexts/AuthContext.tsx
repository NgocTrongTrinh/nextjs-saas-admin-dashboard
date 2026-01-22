'use client';

import { createContext, useContext } from 'react';
import { Role } from '@/libs/auth/roles';

type AuthContextType = {
  role: Role;
};

const AuthContext = createContext<AuthContextType>({
  role: 'staff',
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // NOTE: mock role
  const role: Role = 'admin';

  return (
    <AuthContext.Provider value={{ role }}>{children}</AuthContext.Provider>
  );
}
