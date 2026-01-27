import { create } from 'zustand';

export type Role = 'admin' | 'manager' | 'staff';

type User = {
  id: string;
  name: string;
  role: Role;
};

type AuthState = {
  user: User | null;
  isAuth: boolean;
  role: Role;
  setRole: (role: Role) => void;
  login: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuth: true,
  role: 'admin',
  setRole: (role) => set({ role }),
  login: () =>
    set({
      user: {
        id: '1',
        name: 'Admin User',
        role: 'admin',
      },
    }),
  logout: () => set({ user: null }),
}));
