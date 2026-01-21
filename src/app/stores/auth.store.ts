import { create } from 'zustand';

type User = {
  id: string;
  name: string;
  role: 'admin' | 'manager' | 'staff';
};

type AuthState = {
  user: User | null;
  login: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
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
