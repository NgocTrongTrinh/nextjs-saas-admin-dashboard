import { TaskRequest } from '@/modules/requests/requests.types';

const mockRequests: TaskRequest[] = Array.from({ length: 24 }).map((_, i) => ({
  id: String(i + 1),
  title: `Request ${i + 1}`,
  description: 'Need support for internal task',
  priority: i % 3 === 0 ? 'high' : i % 3 === 1 ? 'medium' : 'low',
  status: i % 3 === 0 ? 'pending' : i % 3 === 1 ? 'approved' : 'completed',
  createdBy: i % 2 === 0 ? 'staff' : 'manager',
  createdAt: new Date().toISOString(),
}));

export async function fetchRequests(
  page: number,
  pageSize: number,
  status?: string,
) {
  await new Promise((r) => setTimeout(r, 400));

  let data = mockRequests;
  if (status) {
    data = data.filter((r) => r.status === status);
  }

  return {
    data: data.slice((page - 1) * pageSize, page * pageSize),
    total: data.length,
  };
}
