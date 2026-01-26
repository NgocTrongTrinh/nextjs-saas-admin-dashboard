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
  search?: string,
) => {
  await new Promise((r) => setTimeout(r, 400));

  let data = [...mockUsers];

  if (role) {
    data = data.filter((u) => u.role === role);
  }

  if (search?.trim()) {
    const keyword = search.trim().toLowerCase();

    data = data.filter(
      (u) =>
        u.name.toLowerCase().includes(keyword) ||
        u.email.toLowerCase().includes(keyword),
    );
  }

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    data: data.slice(start, end),
    total: data.length,
  };
};
