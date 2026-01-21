export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
};

const mockUsers: User[] = Array.from({ length: 42 }).map((_, i) => ({
  id: String(i + 1),
  name: `User ${i + 1}`,
  email: `user${i + 1}@company.com`,
  role: i % 3 === 0 ? 'admin' : i % 3 === 1 ? 'manager' : 'staff',
}));

export const fetchUsers = async (
  page: number,
  pageSize: number,
  role?: string,
) => {
  await new Promise((r) => setTimeout(r, 400));

  let data = mockUsers;
  if (role) {
    data = data.filter((u) => u.role === role);
  }

  return {
    data: data.slice((page - 1) * pageSize, page * pageSize),
    total: data.length,
  };
};
