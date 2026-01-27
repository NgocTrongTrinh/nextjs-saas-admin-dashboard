export type RequestStatus = 'pending' | 'approved' | 'completed';
export type RequestPriority = 'low' | 'medium' | 'high';

export type TaskRequest = {
  id: string;
  title: string;
  description: string;
  priority: RequestPriority;
  status: RequestStatus;
  createdBy: string;
  createdAt: string;
};
